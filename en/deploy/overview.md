---
title: System Setup & Activation Guide
description: All-in-one deployment guide covering hardware requirements, server & client installation, and official license activation
---

# System Setup & Activation Guide

## Hardware & OS Requirements

### 1. Recommended Hardware Specifications

Depending on the volume of network assets and concurrent scanning tasks, we recommend the following sizing configurations:

| Role | Minimum (Small Teams / POC) | Recommended (Production / 10k+ Assets) | High-Performance Cluster (Large Enterprise) |
| :--- | :--- | :--- | :--- |
| **Server Master Node** *(server + web + db + redis)* | **2 Core CPU** / **4 GB RAM**<br>50 GB SSD storage | **4 Core CPU** / **8 GB RAM**<br>100 GB SSD storage | **8 Core+ CPU** / **16 GB+ RAM**<br>500 GB+ NVMe SSD storage |
| **Scanning Probe Node** *(client container / process)* | **1 Core CPU** / **2 GB RAM**<br>20 GB free disk | **2 Core CPU** / **4 GB RAM**<br>50 GB free disk | Horizontally scaled across multiple dedicated hosts |

> [!TIP] 💡 Probe Resource Allocation & File Descriptor Tuning
> - **Resource Allocation**: Tools like `Subfinder` and `Amass` are **CPU & memory intensive**. Allocate sufficient RAM and CPU cores.
> - **High-Speed Scanners**: For high-speed SYN port scanners like `Masscan` and `Nmap`, ensure the probe host has **high network bandwidth and elevated file descriptor limits (`ulimit -n 65535`)**:
>   ```bash
>   ulimit -n 65535
>   echo "* soft nofile 65535" | sudo tee -a /etc/security/limits.conf
>   echo "* hard nofile 65535" | sudo tee -a /etc/security/limits.conf
>   ```

### 2. Software Dependencies

* **Operating System**: Supported Linux distributions (**Ubuntu 22.04 LTS**, **CentOS / Rocky Linux 8+**, **Debian 11+** recommended).
* **Docker Environment**: Requires `Docker 20.10+` and `Docker Compose v2.0+` (`docker-compose-plugin`).
* **Environment Tuning**:
  * **Docker Global DNS**: If probe containers fail to resolve external dependencies, add `"dns": ["223.5.5.5", "114.114.114.114", "8.8.8.8"]` to `/etc/docker/daemon.json`.
  * **SELinux Enforcement**: On CentOS / RHEL hosts, ensure SELinux permissions allow mounting `/var/run/docker.sock` without throwing `Permission denied`.
* **Network & Firewall**: Ensure **HTTPS port `3100`** is open for users; if distributed probes run on external hosts, ensure they can reach **HTTP port `8081`** on the server node.

---

## Server One-Click Installation (Docker Compose)

### 1. Run Installation

Run the following command on your target server to automatically detect the fastest mirror source, download deployment scripts, and execute installation:

```bash
curl -fsSL https://raw.githubusercontent.com/testnet0/testnet-public/main/install.sh | bash
```

The `install` command automatically executes the following setup steps:
1. Generates the `.env` configuration file with randomized, high-entropy database passwords, Redis credentials, and `JWT_SECRET`;
2. Generates self-signed SSL certificates inside `certs/` (for production, replace these with your official `server.crt` and `server.key`);
3. Pulls official containers (`testnet-web`, `testnet-server`, `testnet-client`, `postgres:16`, `redis:7`);
4. Launches the stack and initializes database schemas automatically.

### 2. Accessing the Dashboard

Once initialized, terminal output will display your default admin credentials:

```text
✅ TestNet Installation Complete!

Access URL: https://your-server-ip:3100
Admin Username: admin
Admin Password: Abc12345XyZ   ← Please screenshot and save this random password immediately!
```

Open `https://your-server-ip:3100` in your web browser and sign in.

> [!NOTE] Essential Server Operations
> - Start / Stop / Restart stack: `./testnet.sh start` / `./testnet.sh stop` / `./testnet.sh restart`
> - View real-time logs: `./testnet.sh logs` or `docker compose logs -f testnet-server`
> - Reset admin password to `Admin@123456`: `./testnet.sh reset-password`

---

## Probe Setup & Horizontal Scaling

The server node comes with an embedded or co-located `testnet-client` probe by default. To deploy additional distributed scanning probes across multiple hosts or availability zones, follow either option below:

### 1. Retrieve Secret Key
First, inspect and copy your cluster's communication secret from `deploy/.env` on the master node:
```bash
grep TESTNET_CLIENT_SECRET deploy/.env
```

### 2. Containerized Probe Deployment (Recommended)

Run the containerized probe on any Docker-ready host, mounting `docker.sock` so the probe can spawn security tool containers:

**Option A: Connect via Unified Port 3100 (HTTPS, Recommended - Only exposes one port)**
If the server is using a self-signed certificate, pass TLS config environment variables to skip verification:
```bash
docker run -d \
  --name testnet-client \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /opt/testnet/client-data:/opt/testnet/client-data \
  -e TESTNET_SERVER_URL=https://your-server-ip:3100 \
  -e TESTNET_SERVER_TLS_ENABLED=true \
  -e TESTNET_SERVER_TLS_INSECURE_SKIP_VERIFY=true \
  -e TESTNET_CLIENT_SECRET=<Your CLIENT_SECRET from step 1> \
  -e TESTNET_NODE_NAME=node-guangzhou-01 \
  testnet/client:latest
```

**Option B: Connect directly to Backend Port 8081 (HTTP - requires exposing port 8081)**
```bash
docker run -d \
  --name testnet-client \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /opt/testnet/client-data:/opt/testnet/client-data \
  -e TESTNET_SERVER_URL=http://your-server-ip:8081 \
  -e TESTNET_CLIENT_SECRET=<Your CLIENT_SECRET from step 1> \
  -e TESTNET_NODE_NAME=node-guangzhou-01 \
  testnet/client:latest
```

### 3. Native Binary Probe Deployment

If Docker is not installed on the remote host, you can run the standalone Go binary probe directly:

**Option A: Connect via Unified Port 3100 (HTTPS, configure via environment variables)**
```bash
export TESTNET_SERVER_URL=https://your-server-ip:3100
export TESTNET_SERVER_TLS_ENABLED=true
export TESTNET_SERVER_TLS_INSECURE_SKIP_VERIFY=true
export TESTNET_CLIENT_SECRET=<Your CLIENT_SECRET from step 1>
export TESTNET_NODE_NAME=node-shanghai-native

chmod +x testnet-client
./testnet-client -concurrency 8
```

**Option B: Connect directly to Backend Port 8081 (HTTP)**
```bash
chmod +x testnet-client
./testnet-client \
  -server http://your-server-ip:8081 \
  -secret <Your CLIENT_SECRET from step 1> \
  -name node-shanghai-native \
  -concurrency 8
```

After deployment, log in to the management dashboard and navigate to **"Scanning Nodes" → "Node Pool Management"** to view the newly joined node, its online status, and concurrency limits.

---

## Scanning Node Environment Variables Reference

The scanning node supports overriding `config.yaml` settings via `TESTNET_` prefixed environment variables. The complete list:

| Environment Variable | Type | Description |
|---------------------|------|-------------|
| `TESTNET_SERVER_URL` | string | Server URL (e.g., `http://host:8081` or `https://host:3100`) |
| `TESTNET_SERVER_TLS_ENABLED` | bool | Enable TLS (`true`/`1`) |
| `TESTNET_SERVER_TLS_INSECURE_SKIP_VERIFY` | bool | Skip TLS certificate verification (set `true` for self-signed certs) |
| `TESTNET_CLIENT_SECRET` | string | Node connection secret (from server `.env`) |
| `TESTNET_NODE_NAME` | string | Node name |
| `TESTNET_LOG_LEVEL` | string | Log level (`debug`/`info`/`warn`/`error`) |
| `TESTNET_MAX_CONCURRENT` | int | Max concurrent tasks (default 10) |
| `TESTNET_POLL_TIMEOUT` | duration | Long-poll timeout (e.g., `30s`) |
| `TESTNET_POLL_INTERVAL` | duration | Long-poll interval (e.g., `5s`) |
| `TESTNET_HEARTBEAT_INTERVAL` | duration | Heartbeat interval (e.g., `15s`) |
| `TESTNET_DOCKER_ENABLED` | bool | Enable Docker executor (`true`/`1`) |
| `TESTNET_SERVER_TIMEOUT` | duration | Server request timeout (e.g., `30s`) |
| `TESTNET_WORK_DIR` | string | Task working directory |
| `TESTNET_CACHE_DIR` | string | Cache directory |
| `TESTNET_ALLOW_PRIVILEGED` | bool | Allow privileged container execution (default `false`, high risk) |
| `TESTNET_ALLOW_SSRF` | bool | Allow SSRF probing internal networks (default `false`, high risk) |
| `TESTNET_ALLOWED_VOLUME_PATHS` | string | Allowed mount paths (comma-separated, e.g., `/tmp/,/opt/testnet/`) |

> [!WARNING]
> `TESTNET_ALLOW_PRIVILEGED` and `TESTNET_ALLOW_SSRF` pose security risks. Only enable them in controlled internal network debugging. Keep them at default `false` in production. See [Scanning Node Security & Hardening](/en/client/security).

