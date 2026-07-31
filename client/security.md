---
title: 扫描节点安全防护与加固
description: 扫描节点安全沙箱配置与加固指南
---

# 扫描节点安全防护与加固

扫描节点执行外部扫描脚本和容器，为防止恶意任务入侵主机或作为内网跳板，节点内置了五层安全防护。

---

## 一、 核心安全防御机制

### 1.1 二进制白名单

当任务类型为 `PROCESS` 或 `SHELL` 时，只允许执行白名单中的可执行文件。
- **默认白名单**：内置 80+ 个常用安全工具和系统命令（如 `nmap`、`nuclei`、`httpx`、`curl`、`python3` 等）。
- **拦截**：非白名单命令会被直接拦截，任务标记为 `FAILED`。

### 1.2 环境变量屏蔽

节点执行命令前会自动屏蔽敏感环境变量，包括系统变量、动态链接劫持变量、云商凭证及容器管理套接字等，防止凭证泄露或共享库劫持。

### 1.3 容器卷挂载限制

Docker 执行器挂载宿主机目录时有严格限制：
- **允许路径**：仅允许 `/tmp/`、`/private/tmp/`、`/var/tmp/` 和 `/opt/testnet/`。
- **拦截路径**：`/etc/`、`/var/run/docker.sock`、`/root/` 等敏感路径会被阻断。
- **容量限制**：挂载卷默认最大 `100MB`。

### 1.4 SSRF 内网阻断

执行 `HTTP`、`DNS` 或 `TCP` 任务时，拦截所有私有网段、本地回环和链路本地地址，防止扫描内网服务。对域名探测会进行双重校验，防止 DNS 重绑定绕过。

### 1.5 容器特权阻断

所有 Docker 扫描任务严禁开启 `--privileged` 特权模式，防止容器逃逸。

---

## 二、 节点安全加固配置

通过客户端的 `config.yaml`（或 `TESTNET_` 前缀环境变量）可自定义安全参数：

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
    
  # 追加自定义命令到二进制白名单
  additional_allowed_binaries:
    - "custom-scanner"
    - "jq"
```

---

## 三、 工具校验

部署新工具 DSL 前，可使用客户端的 `validate` 命令进行本地安全校验：

```bash
# 校验 spec 的安全规范和格式
./testnet-client validate --spec my-tool-spec.yaml
```

如果 DSL 配置了未授权的挂载路径、非白名单二进制或特权执行，`validate` 会报错并终止。
