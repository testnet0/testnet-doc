---
title: 扫描节点池管理
description: 控制台扫描节点状态查询、维护停用与离线清理
---

# 扫描节点池管理

扫描节点负责执行扫描任务。本页介绍如何在控制台对节点池进行日常运维与状态监控。

> [!TIP] 🚀 探针的部署与集群水平扩展
> 如果您想在新机器上部署探针、运行多个节点，或查询不同类型节点的硬件配置建议，请参阅部署指南：**[分布式部署](/deploy/overview#分布式部署)**。

---

## 节点池概览与实时心跳

在左侧导航栏进入「**扫描节点**」->「**节点池管理**」，系统将呈现全局所有已注册探针的运行卡片与统计报表：

| 字段栏目 | 作用解释 | 状态示例 |
| :--- | :--- | :--- |
| **节点名称** | 客户端通过 `TESTNET_NODE_NAME` 环境变量设定的业务别名 | `node-beijing-01` |
| **节点 ID** | 节点注册后自动生成的唯一标识 | `client_8f92a0e1` |
| **工作状态** | 实时反映节点是否能正常接收任务 | 🟢 在线 / 🔴 离线 / ⚫ 禁用 |
| **最后心跳** | 上一次心跳的时间 | `12 秒前` |
| **并发任务数** | 当前正在执行的任务数 | `3 / 5` |
| **系统信息** | 节点的操作系统、内核与内存信息 | `Linux x86_64 / 16GB` |

---

## 节点状态说明

| 状态 | 图标 | 说明 |
|------|------|------|
| **在线** | 🟢 | 节点正常运行，可接收任务 |
| **离线** | 🔴 | 节点超过 5 分钟未上报心跳 |
| **禁用** | ⚫ | 管理员手动禁用，不接收新任务 |

---

## 节点管理操作

### 启用/禁用节点

- 禁用后，节点不再接收新任务（已执行中的任务继续完成）
- 适用场景：节点维护期间临时禁用，避免任务分配到不可用节点

操作步骤：
1. 找到目标节点
2. 点击操作列的「**禁用**」/「**启用**」按钮
3. 确认操作

### 查看节点详情

点击节点名称或「**详情**」按钮可查看：
- 系统配置（CPU、内存、磁盘）
- 运行统计（总任务数、成功/失败率）
- 已执行任务列表

### 删除节点

离线节点可删除（不影响已执行的任务记录）：

1. 确保节点已停止（状态为离线）
2. 点击「**删除**」按钮
3. 确认删除

::: tip
删除后如需重新使用该节点，客户端重新启动时会自动重新注册为新节点。
:::

---

## 节点执行能力

| 执行方式 | 所需条件 | 说明 |
|---------|---------|------|
| **Docker** | 挂载 Docker Socket | 执行容器化工具（如 Subfinder、Nuclei） |
| **Shell** | 安装对应二进制 | 执行本地命令行工具（PROCESS 类型） |
| **HTTP** | 网络可达 | 发送 HTTP 请求 |
| **DNS** | 网络可达 | DNS 查询解析 |
| **TCP** | 网络可达 | TCP 端口探测 |

---

## 常见问题

### 节点注册后显示离线

- 检查网络连接（探针能否访问服务端的 **3100** 端口（走 Nginx 统一入口）或 **8081** 端口（直接连后端））
- 检查 `TESTNET_CLIENT_SECRET` 是否正确
- 查看客户端日志：`docker logs testnet-client`

### 任务一直处于 PENDING 状态

- 检查是否有**在线**节点
- 检查节点是否被禁用
- 查看服务端日志确认任务分发是否正常

### Docker 工具无法执行或镜像拉取失败

```bash
# 检查 Docker Socket 是否挂载
docker exec testnet-client docker ps
```

- **国内网络镜像拉取超时**：可以在客户端配置文件 `config.yaml` 或环境变量中设置备用镜像源。默认镜像拉取失败后，探针会自动尝试从备用镜像源拉取：
  ```yaml
  docker:
    enabled: true
    socket: "/var/run/docker.sock"
    pull_timeout: 10m
    fallback_mirrors:
      - "docker.m.daocloud.io"
      - "huecker.io"
  ```
  或者通过环境变量设置：
  ```bash
  export TESTNET_DOCKER_FALLBACK_MIRRORS="docker.m.daocloud.io,huecker.io"
  ```

---

## 客户端环境变量参考

客户端节点支持通过 `TESTNET_` 前缀的环境变量覆盖 `config.yaml` 配置：

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
> `TESTNET_ALLOW_PRIVILEGED` 和 `TESTNET_ALLOW_SSRF` 涉及安全风险，仅在内网受控环境中调试时开启，生产环境务必保持默认 `false`。详见 [探针沙箱与安全机制](/client/security)。

---

## 相关文档

- [分布式部署](/deploy/overview#分布式部署) — 单机/集群容器部署与硬件配置建议
- [探针沙箱与安全机制](/client/security) — 进程隔离、网络防护与 90 白名单二进制配置
