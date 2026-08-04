---
title: Scanning Node Pool Management
description: Console management for scanning probe pools, monitoring, and maintenance
---

# Scanning Node Pool Management

Scanning nodes execute scanning tasks. This page covers daily operations and status monitoring from the console.

> [!TIP] 🚀 Deploying & Scaling Scanning Probes
> If you need to install new probe instances, set up multi-container clusters using Docker Compose, or review sizing recommendations for specialized workloads, refer to: **[Distributed Deployment](/en/deploy/overview#distributed-deployment)**.

---

## Node Pool Overview & Real-Time Status

Navigate to **Scanning Nodes -> Node Management** in the left sidebar to view active worker probes:

| Field | Description | Example |
| :--- | :--- | :--- |
| **Node Name** | Friendly name configured via `TESTNET_NODE_NAME` | `node-general-01` |
| **Node ID** | Unique identifier generated upon registration | `client_8f92a0e1` |
| **Status** | Whether the node can receive tasks | 🟢 Online / 🔴 Offline / ⚫ Disabled |
| **Last Heartbeat** | Time of the last heartbeat | `12 seconds ago` |
| **Active Tasks** | Number of tasks currently running | `3 / 5` |
| **System Info** | Node OS, kernel, and memory info | `Linux x86_64 / 16GB` |

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

- **Image pull timeouts on restricted networks**: You can configure fallback mirrors in the client config file `config.yaml` or via environment variables. When the default image pull fails, the probe automatically retries from fallback mirrors:
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

## Client Environment Variables Reference

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
> `TESTNET_ALLOW_PRIVILEGED` and `TESTNET_ALLOW_SSRF` pose security risks. Only enable them in controlled internal network debugging. Keep them at default `false` in production. See [Node Sandbox & Security Policies](/en/client/security).

---

## Related Documentation

- [Distributed Deployment](/en/deploy/overview#distributed-deployment) — Detailed container deployment, multi-node scaling, and hardware sizing
- [Node Sandbox & Security Policies](/en/client/security) — Process isolation and binary whitelist configuration
