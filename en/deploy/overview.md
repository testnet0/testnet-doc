---
title: System Setup & Activation Guide
description: All-in-one deployment guide covering hardware requirements, server & client installation
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
> All commands below must be run from the `testnet-deploy` directory:
> - Start / Stop / Restart stack: `./testnet.sh start` / `./testnet.sh stop` / `./testnet.sh restart`
> - View real-time logs: `./testnet.sh logs` or `docker compose logs -f testnet-server`
> - Check service status: `./testnet.sh status`
> - Reset admin password: `./testnet.sh reset-password`
> - Upgrade to latest version: `./testnet.sh update`

---

## Distributed Deployment

The server host runs an embedded client by default. To run distributed scanning tasks across multiple remote servers, connect additional client nodes to the master server:

### 1. Retrieve Secret Key

Inspect and copy your cluster's communication secret (`TESTNET_CLIENT_SECRET`) from the deploy directory on the master node:

```bash
cd testnet-deploy
grep TESTNET_CLIENT_SECRET .env
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

> [!TIP] Client Environment Variables Reference
> Client nodes support overriding `config.yaml` settings via `TESTNET_` prefixed environment variables. For the complete variable list, see [Scanning Node Pool Management](/en/client/overview#client-environment-variables-reference).

---

## Related Documentation

- [Upgrades & Maintenance](/en/deploy/upgrade) — Version upgrades, backup & recovery, and server migration
- [FAQ](/en/guide/faq) — Deployment troubleshooting
