---
title: 扫描节点安全防护与加固
description: TestNet 扫描节点安全沙箱配置与加固指南
---

# 扫描节点安全防护与加固

扫描节点（`testnet-client`）作为执行外部扫描脚本和容器的主体，经常需要直接与网络和本地资源交互。为了防止恶意扫描任务导致本地主机被入侵或作为内网跳板，TestNet 扫描节点在底层构建了完备的 **安全策略沙箱 (Security Policy Sandbox)**。

本指南介绍扫描节点的安全特性、默认防护规则，以及作为节点管理员如何进行安全加固与自定义配置。

---

## 一、 核心安全防御机制

扫描节点通过 `internal/security/policy.go` 实现了五层安全防护体系：

### 1.1 二进制可执行文件白名单 (Allowed Binaries)

当任务类型为 `PROCESS` 或 `SHELL` 时，客户端只允许执行白名单中预设的可执行文件。
- **默认白名单**：内置 80+ 个系统常用安全工具和基本命令（如 `nmap`, `masscan`, `nuclei`, `httpx`, `curl`, `dig`, `grep`, `tar`, `python3` 等）。此白名单与平台上 22 个内置工具不同，它包含更多系统级二进制文件。
- **拦截逻辑**：任何不在白名单中的命令（如尝试运行自定义恶意二进制或 `nc` 等高危网络工具）都将被节点直接拦截，任务状态置为 `FAILED`，并记录安全审计日志。

### 1.2 环境变量屏蔽 (Blocked Environment Variables)

为了防止扫描任务通过环境变量窃取主机凭证或劫持共享库，节点在执行命令前会强制过滤敏感环境变量。
- **屏蔽字段**：
  - 系统关键变量：`PATH`, `HOME`, `USER`
  - 动态链接劫持防范：`LD_PRELOAD`, `LD_LIBRARY_PATH`, `LD_DEBUG`
  - 云商凭证与访问密钥：`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `GOOGLE_APPLICATION_CREDENTIALS`, `AZURE_CLIENT_ID`
  - Docker/K8s 管理套接字：`DOCKER_HOST`, `KUBERNETES_SERVICE_HOST`

### 1.3 容器卷挂载限制 (Allowed Volume Paths)

Docker 执行器在挂载宿主机目录到容器内部时，有严格的物理路径和权限审查：
- **允许的挂载前缀**：仅允许挂载 `/tmp/`、`/private/tmp/`、`/var/tmp/` 和 `/opt/testnet/` 目录。
- **拦截挂载**：尝试挂载 `/etc/`、`/var/run/docker.sock`、`/root/` 等敏感路径的行为会被即时阻断。
- **容量防御**：限制挂载卷最大可用容量（默认最大 `100MB`），避免写满宿主机磁盘导致拒绝服务。

### 1.4 SSRF 内网阻断与 DNS 防劫持 (SSRF Protection)

当执行 `HTTP`、`DNS` 或 `TCP` 探测任务时，为防止节点扫描内网敏感服务（如云主机 Metadata 169.254.169.254 或本地 Redis 127.0.0.1），节点会开启严格的 SSRF 校验：
- **CIDR 黑名单**：拦截所有私有网段（`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`）、本地回环（`127.0.0.0/8`, `::1/128`）和本地链路（`169.254.0.0/16`）等。
- **DNS 双重解析校验**：对域名探测时，不仅校验域名字符串是否命中黑名单，还会在 DNS 解析出具体 IP 后，对 IP 地址进行二次 CIDR 比对，防御 DNS Rebinding 重绑定绕过。

### 1.5 容器特权与提权阻断 (No Privileged)

所有 Docker 类型的扫描任务，严禁开启 `--privileged` 特权模式，以防止容器逃逸获取宿主机 Root 权限。

---

## 二、 节点安全加固配置

通过配置客户端的 `config.yaml`（或设置环境变量 `TESTNET_` 前缀），您可以对上述安全参数进行自定义和加固。

### 2.1 配置文件安全示例

```yaml
# testnet-client config.yaml
server: "http://localhost:8081"
secret: "your-node-secret"
name: "hardened-node-01"

security:
  # 是否允许 SSRF 探测（默认 false，开启后可扫描内网，但有极高安全风险）
  allow_ssrf: false
  
  # 是否允许容器特权执行（默认 false）
  allow_privileged: false
  
  # 自定义允许挂载的物理目录
  allowed_volume_paths:
    - "/tmp/"
    - "/opt/testnet/"
    
  # 追加自定义的命令到二进制白名单
  additional_allowed_binaries:
    - "custom-scanner"
    - "jq"
```

---

## 三、 自定义工具校验与 Dry-Run

在将新的工具 DSL 部署到生产环境之前，管理员可以使用扫描客户端的 `validate` 命令对 ExecutionSpec 进行**本地安全规范校验**：

```bash
# 验证 spec 的安全规范和格式
./testnet-client validate --spec my-tool-spec.yaml
```

如果 DSL 中配置了未授权的挂载路径、非白名单的二进制或试图以特权执行，`validate` 阶段便会抛出明确的安全异常并终止。
