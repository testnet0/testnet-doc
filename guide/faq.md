---
title: 常见问题
description: 常见问题
---

# 常见问题

## 账号与登录

### 忘记密码怎么办？

**方法一**：联系管理员重置密码

管理员进入「**系统管理**」→「**用户管理**」，找到用户点击「**重置密码**」。

**方法二**：使用部署脚本重置管理员密码

```bash
cd deploy
./testnet.sh reset-password
# 重置后密码为 Admin@123456
```

### 账号被禁用了怎么办？

联系系统管理员在「**用户管理**」中重新启用您的账号。

---

## 工作流与任务

### 工作流执行后任务一直是 PENDING 状态

**可能原因 1**：没有在线的扫描节点

- 检查「**扫描节点**」列表，确认有 🟢 在线节点
- 如果没有节点，需要先[部署扫描探针](/deploy/overview#扫描探针-集群节点-部署)

**可能原因 2**：节点被禁用

- 在「**扫描节点**」中检查节点状态
- 重新启用被禁用的节点

### 工作流执行失败怎么排查？

1. 进入「**任务管理**」找到失败任务
2. 点击「**日志**」查看详细错误信息
3. 常见错误：
   - `Docker image not found`：工具 Docker 镜像未拉取，检查节点网络
   - `Input asset is empty`：输入资产为空，检查上游节点是否有输出
   - `Timeout`：执行超时，可在工作流节点配置中增大超时时间

### 如何重试失败的任务？

在「**任务管理**」找到失败任务，点击「**重试**」按钮即可重新执行。

---

## 资产管理

### 导入 Excel 失败怎么处理？

1. 下载最新导入模板（列表页「**导入**」→「**下载模板**」）
2. 检查必填字段是否已填写（标有 * 的字段）
3. 检查数据格式是否符合规范（如 IP 地址格式）
4. 文件大小不超过 10MB

### 资产被规则拦截了怎么回事？

资产规则可以配置验证规则，不符合条件的资产会被拒绝导入（BLOCKED）。

- 查看导入结果中的被拦截记录
- 进入「**资产配置**」→「**资产规则**」检查当前生效的规则
- 修改规则或调整数据后重新导入

### 批量操作时选中了太多数据怎么办？

在批量操作栏点击「**取消选择**」清除当前选中，或刷新页面重置状态。

---

## 搜索引擎

### API Key 配置后测试失败

- 检查 Key 是否正确（有无多余空格）
- 检查 Key 是否已过期或被封禁
- 检查主服务器是否能正常访问对应搜索引擎的接口（网络连接是否正常）

### 搜索结果为空

- 尝试简化搜索语法，排除语法错误
- 部分引擎免费账户有查询限制，尝试降低结果数量
- 检查 API 配额是否已耗尽

---

## 系统与权限

### 点击菜单显示"无权限"

联系管理员检查您的角色权限配置：

1. 进入「**角色管理**」
2. 找到您的角色
3. 确认对应模块的查看权限已开启

### WebSocket 连接断开，通知无法实时接收

- 检查网络连接是否稳定
- 刷新页面重新建立 WebSocket 连接
- 如使用了反向代理，检查代理配置是否支持 WebSocket 长连接

---

## 性能与稳定性

### 系统响应很慢

- 检查服务端 CPU/内存使用情况
- 检查 PostgreSQL 连接数是否达到上限
- 大量任务并发时可能出现临时性卡顿，稍等片刻

### 任务日志无法加载

- 日志通过 WebSocket 实时推送，检查 WebSocket 连接状态
- 任务已完成时日志会从数据库加载，确认任务确实已执行

---

## 部署与环境排查

### Docker 句柄数限制导致报错 (out of memory / ulimit)

**现象描述**：

在部分 Linux 发行版（如 Kali Linux、Debian 或低版本 CentOS）中启动 Docker 镜像或执行高并发任务时提示：
```text
library initialization failed - unable to allocate file descriptor table - out of memory
```

**原因分析**：

由于 Docker 默认的 `ulimit` 文件描述符上限配置较低或系统分配机制限制，高并发扫描时句柄数耗尽。

**解决方案**：

1. 编辑系统的 `docker.service` 配置文件：
   ```bash
   # 通常位于 /etc/systemd/system/ 或 /usr/lib/systemd/system/
   sudo vim /usr/lib/systemd/system/docker.service
   ```
2. 在 `ExecStart=/usr/bin/dockerd` 启动命令参数末尾追加：
   ```text
   --default-ulimit nofile=65536:65536
   ```
3. 重新加载并重启 Docker 服务：
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```

### Docker 容器内无法解析域名 (DNS 解析失败)

**现象描述**：

探针节点在执行扫描任务或拉取依赖时报：
```text
Temporary failure resolving 'mirrors.aliyun.com'
```
或各种网络域名无法解析异常。

**解决方案**：

1. 显式指定 Docker 的全局 DNS 配置文件：
   ```bash
   sudo mkdir -p /etc/docker
   sudo vim /etc/docker/daemon.json
   ```
2. 写入可靠的公共 DNS 服务器：
   ```json
   {
     "dns": ["223.5.5.5", "114.114.114.114", "8.8.8.8"]
   }
   ```
3. 重启 Docker 服务使配置生效：
   ```bash
   sudo systemctl restart docker
   ```

### 挂载 Docker 卷或 Socket 时提示 Permission Denied

**现象描述**：

探针节点挂载 `/var/run/docker.sock` 或本地数据卷时报 `Permission denied`，导致无法调用 Docker 启动扫描工具容器。

**原因分析**：

CentOS / RHEL 默认开启了 SELinux 安全策略限制。

**解决方案**：

- **临时关闭**：执行 `sudo setenforce 0`
- **永久关闭**：编辑 `/etc/selinux/config` 将 `SELINUX=enforcing` 修改为 `SELINUX=disabled` 并重启服务器。
- **配置策略 (推荐)**：在 Docker 挂载路径后追加 `:z` 或 `:Z` 选项（例如 `-v /var/run/docker.sock:/var/run/docker.sock:z`）。

### 国内网络环境依赖拉取缓慢或失败

**现象描述**：

在线拉取工具依赖（如 Python `pip` 或 GitHub 工具包）时连接超时。

**解决方案**：

1. **Python 依赖源**：在节点配置或镜像拉取中追加国内 PyPI 镜像源：
   ```bash
   pip3 install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/
   ```
2. **GitHub 镜像加速**：在扫描节点的配置或环境变量中使用 GitHub 加速代理前缀（例如 `https://gh-proxy.com/`）。

### 扫描任务执行报错的手动调试与排查步骤

当探针节点上的扫描脚本报错，且前端界面无法直接看清命令错误细节时，请按以下 5 步进行手动排查：

1. **获取运行命令**：在前端「**任务管理**」中找到失败任务，展开日志，复制探针实际调用的完整 Shell 命令行。
2. **进入探针容器**：在探针宿主机上进入运行中的客户端容器：
   ```bash
   docker exec -it testnet-client /bin/bash
   ```
3. **手动模拟运行**：粘贴刚才复制的工具命令直接在容器内运行，观察真实的 `stdout` / `stderr` 输出。
4. **定位并解决依赖**：
   - 若提示二进制执行权限不足，补全 `chmod +x <tool>`。
   - 若提示 Python / Go 环境缺失依赖，手动补全 `pip install` 或环境配置。
5. **验证复测**：在容器内验证命令成功返回结果（退出码 0）后，回到系统界面重新点击「**重试**」任务。

---


## 联系支持

如以上内容无法解决您的问题，请：

1. 查看[部署指南](/deploy/overview)确认安装配置正确
2. 收集服务端日志（`docker logs testnet-server`）
3. 联系平台管理员或提交 Issue
