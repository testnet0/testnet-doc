---
title: Node Security & Hardening
description: Scanning node security sandbox configuration and hardening guide
---

# Node Security & Hardening

Scanning nodes execute external scripts and containers. To prevent malicious tasks from compromising the host or pivoting into internal networks, nodes implement a five-tier security defense.

---

## 1. Core Security Defense Mechanisms

### 1.1 Binary Whitelist

For `PROCESS` or `SHELL` type tasks, only whitelisted executables are allowed.
- **Default Whitelist**: 80+ commonly used security tools and system commands (e.g., `nmap`, `nuclei`, `httpx`, `curl`, `python3`).
- **Interception**: Non-whitelisted commands are blocked, and the task is marked `FAILED`.

### 1.2 Environment Variable Filtering

Before executing commands, the node automatically filters sensitive environment variables, including system variables, dynamic link hijacking variables, cloud provider credentials, and container management sockets, preventing credential leakage or shared library hijacking.

### 1.3 Container Volume Mount Restrictions

The Docker executor enforces strict mount limits:
- **Allowed Paths**: Only `/tmp/`, `/private/tmp/`, `/var/tmp/`, and `/opt/testnet/`.
- **Blocked Paths**: `/etc/`, `/var/run/docker.sock`, `/root/` and other sensitive paths are blocked.
- **Capacity Limit**: Mount volume max is `100MB` by default.

### 1.4 SSRF Protection

For `HTTP`, `DNS`, or `TCP` tasks, all private IP ranges, loopback addresses, and link-local addresses are blocked to prevent scanning internal services. Domain probes use dual verification to prevent DNS rebinding bypasses.

### 1.5 Privileged Container Defense

All Docker scanning tasks strictly prohibit `--privileged` mode to prevent container escapes.

---

## 2. Node Security Hardening Configuration

Customize security parameters via the client's `config.yaml` (or `TESTNET_` prefixed environment variables):

```yaml
# testnet-client config.yaml
server: "http://localhost:8081"
secret: "your-node-secret"
name: "hardened-node-01"

security:
  # Allow SSRF probes (Default: false. Enabling this risks internal network exposure)
  allow_ssrf: false
  
  # Allow privileged containers (Default: false)
  allow_privileged: false
  
  # Custom allowed mount directories
  allowed_volume_paths:
    - "/tmp/"
    - "/opt/testnet/"
    
  # Append custom commands to the binary whitelist
  additional_allowed_binaries:
    - "custom-scanner"
    - "jq"
```

---

## 3. Spec Validation

Before deploying new tool DSLs, run the client's `validate` command for a local security check:

```bash
# Validate format and security policies of the spec
./testnet-client validate --spec my-tool-spec.yaml
```

If the DSL configures unapproved mount paths, non-whitelisted binaries, or privileged execution, `validate` throws an error and terminates.
