---
title: Node Security & Hardening
description: TestNet scanning node security sandbox configuration and hardening guide
---

# Node Security & Hardening

As the executor of external scanning scripts and containers, the scanning node (`testnet-client`) frequently interacts directly with network and local resources. To prevent malicious scanning tasks from compromising the local host or serving as a pivot for internal network attacks, the TestNet scanning node implements a robust **Security Policy Sandbox**.

This guide details the security features, default protection rules, and how node administrators can perform security hardening and custom configurations.

---

## 1. Core Security Defense Mechanisms

The scanning node implements a five-tier security defense architecture via `internal/security/policy.go`:

### 1.1 Binary Executable Whitelist (Allowed Binaries)

When executing tasks of type `PROCESS` or `SHELL`, the client only allows executables specified in the whitelist.
- **Default Whitelist**: Over 80 commonly used security tools and basic system commands are pre-approved (e.g., `nmap`, `masscan`, `nuclei`, `httpx`, `curl`, `dig`, `grep`, `tar`, and `python3`). This whitelist differs from the 22 built-in tools in the platform — it includes a wider range of system-level binaries.
- **Interception Logic**: Any commands not in the whitelist (e.g., attempting to run custom malicious binaries or high-risk network tools like `nc`) are blocked directly by the node. The task state is set to `FAILED`, and a security audit log is recorded.

### 1.2 Environment Variable Filtering (Blocked Env Keys)

To prevent scanning tasks from stealing host credentials or hijacking shared libraries via environment variables, the node filters out sensitive environment keys before executing commands.
- **Blocked Keys**:
  - Critical system variables: `PATH`, `HOME`, `USER`
  - Dynamic link hijacking prevention: `LD_PRELOAD`, `LD_LIBRARY_PATH`, `LD_DEBUG`
  - Cloud provider credentials and API keys: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `GOOGLE_APPLICATION_CREDENTIALS`, `AZURE_CLIENT_ID`
  - Docker/Kubernetes management sockets: `DOCKER_HOST`, `KUBERNETES_SERVICE_HOST`

### 1.3 Container Volume Mount Restrictions (Allowed Volume Paths)

The Docker executor enforces strict path and permission reviews when mounting host directories inside containers:
- **Allowed Mount Prefixes**: Only paths starting with `/tmp/`, `/private/tmp/`, `/var/tmp/`, and `/opt/testnet/` are permitted.
- **Blocked Mounts**: Attempts to mount sensitive paths like `/etc/`, `/var/run/docker.sock`, or `/root/` are blocked immediately.
- **Capacity Defense**: Restricts the maximum storage capacity of the mount (default limit is `100MB`) to prevent host disk exhaustion.

### 1.4 SSRF Protection and Anti-DNS Rebinding

When executing `HTTP`, `DNS`, or `TCP` probe tasks, the node enforces strict SSRF checks to prevent scanning internal services (such as cloud metadata server `169.254.169.254` or local Redis `127.0.0.1`):
- **CIDR Blacklist**: Blocks all private IP address ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), local loopbacks (`127.0.0.0/8`, `::1/128`), and link-local addresses (`169.254.0.0/16`).
- **Dual-Resolve DNS Verification**: For domain resolution, the node verifies not only the domain name string but also performs a secondary CIDR check on the resolved IP addresses to defend against DNS Rebinding bypasses.

### 1.5 Privileged Container Defense (No Privileged)

For all Docker-type scanning tasks, running containers in `--privileged` mode is strictly prohibited to prevent container escapes that compromise host Root privileges.

---

## 2. Node Security Hardening Configuration

You can customize and harden these security parameters via the client's `config.yaml` (or by setting environment variables prefixed with `TESTNET_`).

### 2.1 Configuration Example

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

## 3. Spec Validation and Dry-Run

Before deploying new tool DSLs to production, administrators can run the scanning client's `validate` command to perform a **local security policy audit** on the ExecutionSpec:

```bash
# Validate format and security policies of the spec
./testnet-client validate --spec my-tool-spec.yaml
```

If the DSL configures unapproved mount paths, non-whitelisted binaries, or attempts privileged execution, the `validate` step throws a security exception and terminates immediately.
