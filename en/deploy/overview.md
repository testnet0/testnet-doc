---
title: System Setup & Activation Guide
description: All-in-one deployment guide covering hardware requirements, server & client installation, and official license activation
---

# System Setup & Activation Guide

## Hardware & OS Requirements

### 1. Recommended Hardware Specifications

Depending on the volume of network assets and concurrent scanning tasks, we recommend the following sizing configurations:

| Role | Minimum (Small Teams) | Recommended (Production / 10k+ Assets) | Large Clusters (Large Enterprise) |
| :--- | :--- | :--- | :--- |
| **Server Master Node** *(server + web + db + redis)* | **2 Core CPU** / **4 GB RAM**<br>50 GB SSD storage | **4 Core CPU** / **8 GB RAM**<br>100 GB SSD storage | **8 Core+ CPU** / **16 GB+ RAM**<br>500 GB+ NVMe SSD storage |
| **Scanning Probe Node** *(client container / process)* | **1 Core CPU** / **2 GB RAM**<br>20 GB free disk | **2 Core CPU** / **4 GB RAM**<br>50 GB free disk | Horizontally scaled across multiple dedicated hosts |

### 2. Software Dependencies

* **Operating System**: Supported Linux distributions (**Ubuntu 22.04 LTS**, **CentOS / Rocky Linux 8+**, **Debian 11+** recommended).
* **Docker Environment**: Requires `Docker 20.10+` and `Docker Compose v2.0+`.
* **Docker Image & Mirror Optimization**:
  * **Registry Mirrors**: Security tools (e.g., Subfinder, Naabu, Nuclei) run as Docker containers. In restricted network environments, pull speed can be improved by configuring Docker Daemon registry mirrors in `/etc/docker/daemon.json`:
    ```json
    {
      "registry-mirrors": [
        "https://your-docker-mirror.example.com"
      ]
    }
    ```
    Apply with `sudo systemctl daemon-reload && sudo systemctl restart docker`.

---

## Server One-Click Installation (Docker Compose)

### 1. Run Installation

Run the following command on your target server to automatically detect the fastest mirror source, download deployment scripts, and execute installation:

```bash
curl -fsSL https://cnb.cool/testnet0/testnet-public/-/git/raw/main/install.sh | bash
```

The installation script automatically generates random passwords, creates self-signed certificates, pulls images, and starts services.

### 2. Accessing the Dashboard

Once initialized, terminal output will display your default admin credentials:

```text
✅ TestNet Installation Complete!

Access URL: https://your-server-ip:3100
Admin Username: admin
Admin Password: Abc12345XyZ   ← Please save this random password safely!
```

Open `https://your-server-ip:3100` in your web browser and sign in.

> [!NOTE] Essential Server Operations
> - Start / Stop / Restart stack: `./testnet.sh start` / `./testnet.sh stop` / `./testnet.sh restart`
> - View real-time logs: `./testnet.sh logs` or `docker compose logs -f testnet-server`
> - Reset admin password: `./testnet.sh reset-password`

---

## Distributed Deployment

The server host runs an embedded client by default. To run distributed scanning tasks across multiple remote servers, connect additional client nodes to the master server:

### 1. Retrieve Secret Key

Inspect and copy your cluster's communication secret (`TESTNET_CLIENT_SECRET`) from `deploy/.env` on the master node:
```bash
grep TESTNET_CLIENT_SECRET deploy/.env
```

### 2. Select Deployment Method

#### Containerized Deployment (Recommended)

Run the client container on any Docker-ready host, mounting `docker.sock` so the client can spawn containerized scanning tools:

```bash
docker run -d \
  --name testnet-client \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v ./client-data:/opt/testnet/client-data \
  -e TESTNET_SERVER_URL=https://your-server-ip:3100 \
  -e TESTNET_SERVER_TLS_ENABLED=true \
  -e TESTNET_SERVER_TLS_INSECURE_SKIP_VERIFY=true \
  -e TESTNET_CLIENT_SECRET=<CLIENT_SECRET_FROM_SERVER> \
  -e TESTNET_NODE_NAME=node-guangzhou-01 \
  testnet/client:latest
```

#### Native Binary Deployment

Alternatively, configure via `config.yaml` or environment variables and run the standalone binary directly:

```bash
export TESTNET_SERVER_URL=https://your-server-ip:3100
export TESTNET_SERVER_TLS_ENABLED=true
export TESTNET_SERVER_TLS_INSECURE_SKIP_VERIFY=true
export TESTNET_CLIENT_SECRET=<CLIENT_SECRET_FROM_SERVER>
export TESTNET_NODE_NAME=node-shanghai-native

chmod +x testnet-client
./testnet-client -concurrency 8
```

After deployment, check **"Scanning Nodes" → "Node Pool Management"** in the management dashboard to view newly joined nodes and their status.

---

## Client Node Environment Variables Reference

Client nodes support overriding `config.yaml` settings via `TESTNET_` prefixed environment variables:

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
| `TESTNET_DOCKER_FALLBACK_MIRRORS` | string | Fallback Docker registry mirror list (comma-separated, e.g., `docker.m.daocloud.io,huecker.io`) |
| `TESTNET_SERVER_TIMEOUT` | duration | Server request timeout (e.g., `30s`) |
| `TESTNET_WORK_DIR` | string | Task working directory |
| `TESTNET_CACHE_DIR` | string | Cache directory |
| `TESTNET_ALLOW_PRIVILEGED` | bool | Allow privileged container execution (default `false`, high risk) |
| `TESTNET_ALLOW_SSRF` | bool | Allow SSRF probing internal networks (default `false`, high risk) |
| `TESTNET_ALLOWED_VOLUME_PATHS` | string | Allowed mount paths (comma-separated, e.g., `/tmp/,/opt/testnet/`) |

> [!WARNING]
> `TESTNET_ALLOW_PRIVILEGED` and `TESTNET_ALLOW_SSRF` pose security risks. Only enable them in controlled internal network debugging. Keep them at default `false` in production. See [Scanning Node Security & Hardening](/en/client/security).
