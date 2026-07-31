---
title: Scanning Node Pool Management
description: Console management for scanning probe pools, monitoring, and maintenance
---

# Scanning Node Pool Management

Scanning probes (`testnet-client`) form the execution layer of TestNet's distributed engine. This page explains how to monitor live status, temporarily disable probes for maintenance, and clean up offline nodes from the web dashboard.

> [!TIP] 🚀 Deploying & Scaling Scanning Probes
> If you need to install new probe instances, set up multi-container clusters using Docker Compose, or review sizing recommendations for specialized workloads, refer to: **[Distributed Deployment](/en/deploy/overview#distributed-deployment)**.

---

## Node Pool Overview & Real-Time Status

Navigate to **Scanning Nodes -> Node Management** in the left sidebar to view active worker probes:

| Field | Description | Example |
| :--- | :--- | :--- |
| **Node Name** | Friendly name configured via `TESTNET_NODE_NAME` | `node-general-01` |
| **Node ID** | Unique system-assigned ID generated upon registration | `client_8f92a0e1` |
| **Status** | Current working state indicating readiness for task dispatch | 🟢 Online / 🔴 Offline / ⚫ Disabled |
| **Last Heartbeat** | Relative timestamp of the latest polling heartbeat | `12 seconds ago` |
| **Active Tasks** | Number of tasks currently running on this probe | `3 / 5` |
| **System Info** | Host OS, kernel architecture, and available RAM | `Linux x86_64 / 16GB` |

---

## Node Status

| Status | Icon | Description |
|--------|------|-------------|
| **Online** | 🟢 | Node running normally, accepting tasks |
| **Offline** | 🔴 | Node has not reported a heartbeat for 5+ minutes |
| **Disabled** | ⚫ | Manually disabled by admin, no new tasks accepted |

---

## Node Operations

### Enable / Disable Node

- When disabled, the node won't receive new tasks (ongoing tasks continue)
- Useful when a node needs maintenance

Steps:
1. Find the target node
2. Click **"Disable"** / **"Enable"** in the action column

### View Node Details

Click the node name to view:
- System specs (CPU, RAM, disk)
- Execution stats (total tasks, success/failure rate)
- Recent task list

### Delete a Node

Offline nodes can be deleted (existing task records are preserved):

1. Ensure node is offline
2. Click **"Delete"**
3. Confirm

::: tip
After deletion, restarting the client will auto-register as a new node.
:::

---

## Execution Capabilities

| Method | Requirements | Description |
|--------|-------------|-------------|
| **Docker** | Docker socket mounted | Execute containerized tools (Subfinder, Nuclei, etc.) |
| **Shell** | Binary installed | Execute local CLI tools (PROCESS type) |
| **HTTP** | Network accessible | Send HTTP requests |
| **DNS** | Network accessible | DNS queries |
| **TCP** | Network accessible | TCP port probing |

---

## Troubleshooting

### Node shows offline after registration

- Check network connectivity (can node reach server on port **3100** (unified Nginx entry) or **8081** (direct backend)?)
- Verify `TESTNET_CLIENT_SECRET` is correct
- View logs: `docker logs testnet-client`

### Tasks stuck in PENDING

- Check if any nodes are **online**
- Check if nodes are disabled
- Check server logs to confirm task dispatch is working

### Docker tools fail to run

```bash
# Verify Docker socket is accessible
docker exec testnet-client docker ps
```

- **Image pull timeouts on restricted networks**: You can configure fallback mirrors in the client config file `config.yaml` or via environment variables. When the default image pull fails, the probe automatically retries from fallback mirrors and re-tags the image:
  ```yaml
  docker:
    enabled: true
    socket: "/var/run/docker.sock"
    pull_timeout: 10m
    fallback_mirrors:
      - "docker.m.daocloud.io"
      - "huecker.io"
  ```
  Or via environment variable:
  ```bash
  export TESTNET_DOCKER_FALLBACK_MIRRORS="docker.m.daocloud.io,huecker.io"
  ```

---

## Related Documentation

- [Distributed Deployment](/en/deploy/overview#distributed-deployment) — Detailed container deployment, multi-node scaling, and hardware sizing
- [Node Sandbox & Security Policies](/en/client/security) — Process isolation and binary whitelist configuration
