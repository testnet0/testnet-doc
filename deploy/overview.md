---
title: 系统部署与激活指南
description: 包含配置要求、服务端与节点安装、机器码授权激活的一体化部署指引
---

# 系统部署与激活指南



## 硬件配置与系统要求

### 1. 服务器硬件配置建议

根据您需要管理的网络资产数量和并发扫描任务量，平台推荐以下服务器配置：

| 部署角色 | 最低配置 (小型团队测试) | 推荐配置 (生产环境 / 万级资产) | 大型集群 (大型企业 / 持续扫描) |
| :--- | :--- | :--- | :--- |
| **服务端主节点** *(Web、主程序与数据库)* | **2 核 CPU** / **4 GB 内存**<br>50 GB SSD 存储 | **4 核 CPU** / **8 GB 内存**<br>100 GB SSD 存储 | **8 核以上 CPU** / **16 GB 以上 内存**<br>500 GB 以上 NVMe SSD 存储 |
| **扫描探针节点** *(Client 客户端)* | **1 核 CPU** / **2 GB 内存**<br>20 GB 剩余磁盘 | **2 核 CPU** / **4 GB 内存**<br>50 GB 剩余磁盘 | 根据任务量按需增加分布式主机数量 |

> [!TIP] 💡 扫描探针配置建议与系统句柄调优
> - **资源分配**：如果需要运行 `Subfinder`、`Amass` 等信息收集工具，它们对 **CPU 与内存** 消耗较大，建议为其分配较多资源。
> - **网络与并发**：如果主要运行 `Masscan`、`Nmap` 等高并发全端口扫描工具，建议将探针部署在**网络带宽大**且**放开了连接数限制**的主机上。
> - **句柄调优 (ulimit)**：在高并发探测场景下，请调高系统与 Docker 句柄数限制：
>   ```bash
>   # 在宿主机上提高当前会话与系统的最大文件句柄数
>   ulimit -n 65535
>   echo "* soft nofile 65535" | sudo tee -a /etc/security/limits.conf
>   echo "* hard nofile 65535" | sudo tee -a /etc/security/limits.conf
>   ```

### 2. 软件运行环境要求

* **操作系统**：支持主流 Linux 发行版（推荐使用 **Ubuntu 22.04 LTS**、**Rocky Linux 8+** 或 **Debian 11+**）。
* **软件依赖**：系统需要预先安装好 `Docker 20.10+` 和 `Docker Compose v2.0+`。
* **环境调优建议**：
  * **Docker 局域网 DNS 解析**：若探针容器内无法正常解析外网或阿里云镜像，建议在 `/etc/docker/daemon.json` 中添加 `"dns": ["223.5.5.5", "114.114.114.114", "8.8.8.8"]`。
  * **SELinux 策略**：CentOS / RHEL 系统请确认 SELinux 状态，挂载 `/var/run/docker.sock` 时避免因为 SELinux 导致 `Permission denied` 报错。
* **网络与防火墙**：
  * 服务端所在的主机需要开放 HTTPS `3100` 端口，供浏览器访问管理后台。
  * 如果要在其他独立服务器上部署扫描探针，需要确保这些探针机器能访问到服务端主机的 `8081` 端口。


---

## 服务端一键安装 (Docker Compose)

### 1. 第一步：下载部署包并运行安装

在您的目标服务器上执行以下命令来获取项目并运行安装脚本：

```bash
git clone https://github.com/testnet-project/testnet.git
cd testnet/deploy

# 赋予脚本执行权限并启动自动化安装
chmod +x testnet.sh
./testnet.sh install
```

安装脚本会自动帮您完成以下准备工作：
1. 生成随机且高强度的数据库密码、加密密钥等，并写入到 `.env` 配置文件中；
2. 自动在 `certs/` 目录下创建自签名 SSL 证书（生产环境建议后续替换为您自己的正式证书）；
3. 从官方镜像仓库拉取各模块所需的 Docker 镜像；
4. 依次启动数据库、Redis 以及主程序服务，并自动导入初始数据表结构。

### 2. 第二步：首次登录系统

安装完成后，终端会输出管理后台的访问地址和系统为您自动生成的随机初始密码：

```text
✅ TestNet 安装完成！

访问地址: https://your-server-ip:3100
管理员账号: admin
管理员密码: Abc12345XyZ   ← 请及时截屏并妥善保存此系统生成的随机初始密码！
```

在浏览器中打开该地址，输入上述账号密码即可登录系统后台。

> [!NOTE] 💡 常用控制命令参考
> - **启动/停止/重启服务**：在 `deploy` 目录下运行 `./testnet.sh start` / `./testnet.sh stop` / `./testnet.sh restart`
> - **查看运行日志**：运行 `./testnet.sh logs` 或 `docker compose logs -f testnet-server`
> - **重置管理员密码**：运行 `./testnet.sh reset-password` 可将密码重置为默认的 `Admin@123456`（请在登录后第一时间在个人中心修改它）。

---

## 扫描探针 (集群节点) 部署

系统默认会在服务端主机上启动一个内置的扫描探针。如果您想在多台不同的服务器上分布式运行扫描任务，可以将其他探针节点连接到主服务器，配置方法如下：

### 1. 第一步：获取连接密码
其他探针节点连接主服务器时需要密码。请在主服务器的 `deploy/.env` 文件中找到并复制连接密码（CLIENT_SECRET）：
```bash
grep TESTNET_CLIENT_SECRET deploy/.env
```

### 2. 第二步：选择部署方式

#### 部署方式一：通过 Docker 运行 (推荐)
在任意已安装 Docker 的独立主机上执行以下命令。这需要挂载 `docker.sock`，以便探针程序能够调用 Docker 来运行各种容器化的扫描工具：

**选择 A：走统一的 3100 端口（HTTPS，推荐，只需暴露一个端口）**
如果服务端使用的是自签名证书，请添加 TLS 忽略证书校验的环境变量：
```bash
docker run -d \
  --name testnet-client \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /opt/testnet/client-data:/opt/testnet/client-data \
  -e TESTNET_SERVER_URL=https://your-server-ip:3100 \
  -e TESTNET_SERVER_TLS_ENABLED=true \
  -e TESTNET_SERVER_TLS_INSECURE_SKIP_VERIFY=true \
  -e TESTNET_CLIENT_SECRET=<从服务端获取的密码> \
  -e TESTNET_NODE_NAME=node-guangzhou-01 \
  testnet/client:latest
```

**选择 B：直接连接后端 8081 端口（HTTP，需要对外开放 8081 端口）**
```bash
docker run -d \
  --name testnet-client \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /opt/testnet/client-data:/opt/testnet/client-data \
  -e TESTNET_SERVER_URL=http://your-server-ip:8081 \
  -e TESTNET_CLIENT_SECRET=<从服务端获取的密码> \
  -e TESTNET_NODE_NAME=node-guangzhou-01 \
  testnet/client:latest
```

#### 部署方式二：直接运行二进制程序
如果目标服务器没有安装 Docker，也可以在目标主机下载并直接运行单文件客户端程序（此模式只能执行原生系统命令或进行常规的网络端口探测）：

**选择 A：走统一的 3100 端口（HTTPS，需在配置文件中配置忽略证书，或启动时覆盖）**
可以先生成配置文件 `config.yaml` 或直接通过环境配置：
```bash
export TESTNET_SERVER_URL=https://your-server-ip:3100
export TESTNET_SERVER_TLS_ENABLED=true
export TESTNET_SERVER_TLS_INSECURE_SKIP_VERIFY=true
export TESTNET_CLIENT_SECRET=<从服务端获取的密码>
export TESTNET_NODE_NAME=node-shanghai-native

chmod +x testnet-client
./testnet-client -concurrency 8
```

**选择 B：直接连接后端 8081 端口（HTTP）**
```bash
chmod +x testnet-client
./testnet-client \
  -server http://your-server-ip:8081 \
  -secret <从服务端获取的密码> \
  -name node-shanghai-native \
  -concurrency 8
```

部署完成后，登录管理后台，在 **「扫描节点」->「节点池管理」** 中就能实时查看到新加入的节点，并能查看其在线状态、并发数限制等信息。
