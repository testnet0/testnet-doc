---
title: 系统部署与激活指南
description: 包含配置要求、服务端与节点安装、机器码授权激活的一体化部署指引
---

# 系统部署与激活指南

## 硬件配置与系统要求

### 1. 服务器硬件配置建议

根据您需要管理的网络资产数量和并发扫描任务量，平台推荐以下服务器配置：

| 部署角色 | 最低配置 (小型团队) | 推荐配置 (生产环境 / 万级资产) | 大型集群 (大型企业) |
| :--- | :--- | :--- | :--- |
| **服务端主节点** *(Web、主程序与数据库)* | **2 核 CPU** / **4 GB 内存**<br>50 GB SSD 存储 | **4 核 CPU** / **8 GB 内存**<br>100 GB SSD 存储 | **8 核以上 CPU** / **16 GB 以上 内存**<br>500 GB 以上 NVMe SSD 存储 |
| **扫描探针节点** *(Client 客户端)* | **1 核 CPU** / **2 GB 内存**<br>20 GB 剩余磁盘 | **2 核 CPU** / **4 GB 内存**<br>50 GB 剩余磁盘 | 根据任务量按需增加分布式主机数量 |

### 2. 软件运行环境要求

* **操作系统**：支持主流 Linux 发行版（推荐使用 **Ubuntu 22.04 LTS**、**Rocky Linux 8+** 或 **Debian 11+**）。
* **软件依赖**：系统需要预先安装好 `Docker 20.10+` 和 `Docker Compose v2.0+`。
* **Docker 镜像与国内网络环境调优**：
  * **官方镜像拉取与加速**：平台大部分安全工具（如 Subfinder、Naabu、Nuclei 等）以容器方式运行。在特殊网络环境下，标准 Docker Hub 镜像可能拉取缓慢或失败。推荐配置 Docker Daemon 镜像加速器（编辑 `/etc/docker/daemon.json`）：
    ```json
    {
      "registry-mirrors": [
        "https://your-docker-mirror.example.com"
      ]
    }
    ```
    配置后执行 `sudo systemctl daemon-reload && sudo systemctl restart docker` 生效。
## 一键安装 (Docker Compose)

### 1. 第一步：运行安装

在目标服务器上直接执行以下命令，引导脚本 `install.sh` 会自动探测最快镜像源、下载所需组件并完成安装：

```bash
curl -fsSL https://cnb.cool/testnet0/testnet-public/-/git/raw/main/install.sh | bash
```

安装脚本会自动帮您完成以下工作：
1. 生成随机的数据库密码、加密密钥等，并写入到 `.env` 配置文件中；
2. 自动在 `certs/` 目录下创建自签名 SSL 证书（生产环境建议后续替换为您自己的正式证书）；
3. 从官方镜像仓库拉取各模块所需的 Docker 镜像；
4. 依次启动数据库、Redis 以及主程序服务，并自动导入初始数据表结构。

### 2. 第二步：首次登录系统

安装完成后，终端会输出管理后台的访问地址和系统为您自动生成的随机初始密码：

```text
✅ TestNet 安装完成！

访问地址: https://your-server-ip:3100
管理员账号: admin
管理员密码: Abc12345XyZ   ← 请妥善保存生成的随机初始密码！
```

在浏览器中打开该地址，输入上述账号密码即可登录系统后台。

> [!NOTE] 💡 常用控制命令参考
> - **启动/停止/重启服务**：在 `deploy` 目录下运行 `./testnet.sh start` / `./testnet.sh stop` / `./testnet.sh restart`
> - **查看运行日志**：运行 `./testnet.sh logs` 或 `docker compose logs -f testnet-server`
> - **重置管理员密码**：运行 `./testnet.sh reset-password` 可将密码重置为默认的 `Admin@123456`（请在登录后第一时间在个人中心修改它）。

---

## 分布式部署

系统默认会在服务端主机上启动一个内置的客户端。如果您想在多台不同的服务器上分布式运行扫描任务，可以将其他客户端节点连接到主服务器，配置方法如下：

### 1. 第一步：获取连接密码
其他探针节点连接主服务器时需要密码。请在主服务器的 `deploy/.env` 文件中找到并复制连接密码（CLIENT_SECRET）：
```bash
grep TESTNET_CLIENT_SECRET deploy/.env
```

### 2. 第二步：选择部署方式

#### 部署方式一：通过 Docker 运行 (推荐)
在任意已安装 Docker 的独立主机上执行以下命令。这需要挂载 `docker.sock`，以便探针程序能够调用 Docker 来运行各种容器化的扫描工具：

如果服务端使用的是自签名证书，请添加 TLS 忽略证书校验的环境变量：
```bash
docker run -d \
  --name testnet-client \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v ./client-data:/opt/testnet/client-data \
  -e TESTNET_SERVER_URL=https://your-server-ip:3100 \
  -e TESTNET_SERVER_TLS_ENABLED=true \
  -e TESTNET_SERVER_TLS_INSECURE_SKIP_VERIFY=true \
  -e TESTNET_CLIENT_SECRET=<从服务端获取的密码> \
  -e TESTNET_NODE_NAME=node-guangzhou-01 \
  testnet/client:latest
```

#### 部署方式二：直接运行二进制程序

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

部署完成后，登录管理后台，在 **「扫描节点」->「节点池管理」** 中就能实时查看到新加入的节点，并能查看其在线状态、并发数限制等信息。

---

## 客户端节点环境变量参考

客户端节点支持通过 `TESTNET_` 前缀的环境变量覆盖 `config.yaml` 配置。完整变量列表如下：

| 环境变量 | 类型 | 说明 |
|---------|------|------|
| `TESTNET_SERVER_URL` | string | 服务端地址（如 `http://host:8081` 或 `https://host:3100`） |
| `TESTNET_SERVER_TLS_ENABLED` | bool | 是否启用 TLS（`true`/`1`） |
| `TESTNET_SERVER_TLS_INSECURE_SKIP_VERIFY` | bool | 是否跳过 TLS 证书校验（自签名证书时设为 `true`） |
| `TESTNET_CLIENT_SECRET` | string | 节点连接密码（从服务端 `.env` 中获取） |
| `TESTNET_NODE_NAME` | string | 节点名称 |
| `TESTNET_LOG_LEVEL` | string | 日志级别（`debug`/`info`/`warn`/`error`） |
| `TESTNET_MAX_CONCURRENT` | int | 最大并发任务数（默认 10） |
| `TESTNET_POLL_TIMEOUT` | duration | 长轮询超时时间（如 `30s`） |
| `TESTNET_POLL_INTERVAL` | duration | 长轮询间隔（如 `5s`） |
| `TESTNET_HEARTBEAT_INTERVAL` | duration | 心跳上报间隔（如 `15s`） |
| `TESTNET_DOCKER_ENABLED` | bool | 是否启用 Docker 执行器（`true`/`1`） |
| `TESTNET_DOCKER_FALLBACK_MIRRORS` | string | 备用 Docker 镜像源列表（逗号分隔，如 `docker.m.daocloud.io,huecker.io`） |
| `TESTNET_SERVER_TIMEOUT` | duration | 服务端请求超时（如 `30s`） |
| `TESTNET_WORK_DIR` | string | 任务工作目录 |
| `TESTNET_CACHE_DIR` | string | 缓存目录 |
| `TESTNET_ALLOW_PRIVILEGED` | bool | 是否允许容器特权执行（默认 `false`，高危） |
| `TESTNET_ALLOW_SSRF` | bool | 是否允许 SSRF 探测内网（默认 `false`，高危） |
| `TESTNET_ALLOWED_VOLUME_PATHS` | string | 允许挂载的目录列表（逗号分隔，如 `/tmp/,/opt/testnet/`） |

> [!WARNING]
> `TESTNET_ALLOW_PRIVILEGED` 和 `TESTNET_ALLOW_SSRF` 涉及安全风险，仅在内网受控环境中调试时开启，生产环境务必保持默认 `false`。详见 [扫描节点安全防护](/client/security)。
