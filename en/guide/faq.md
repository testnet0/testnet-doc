---
title: FAQ
description: FAQ
---

# FAQ

## Account & Login

### Forgot Password?

**Method 1**: Contact admin to reset password

Admin goes to "**System Management**" → "**User Management**", finds the user and clicks "**Reset Password**".

**Method 2**: Use deployment script to reset admin password

```bash
cd deploy
./testnet.sh reset-password
# Password after reset is Admin@123456
```

### Account Disabled?

Contact the system admin to re-enable your account in "**User Management**".

---

## Workflows & Tasks

### Task remains in PENDING state after workflow execution

**Possible Cause 1**: No online scanning nodes

- Check the "**Scanning Nodes**" list to confirm there are 🟢 online nodes
- If there are no nodes, you need to [deploy a scanning probe](/en/deploy/overview#probe-setup-horizontal-scaling) first

**Possible Cause 2**: Node is disabled

- Check node status in "**Scanning Nodes**"
- Re-enable the disabled node

### How to troubleshoot workflow execution failures?

1. Go to "**Task Management**" and find the failed task
2. Click "**Logs**" to view detailed error information
3. Common errors:
   - `Docker image not found`: Tool Docker image not pulled, check node network
   - `Input asset is empty`: Input asset is empty, check if upstream nodes have output
   - `Timeout`: Execution timeout, increase timeout in workflow node configuration

### How to retry a failed task?

Find the failed task in "**Task Management**" and click the "**Retry**" button to re-execute.

---

## Asset Management

### Excel import failed?

1. Download the latest import template (list page "**Import**" → "**Download Template**")
2. Check if required fields are filled (fields marked with *)
3. Check if data format meets specifications (e.g., IP address format)
4. File size must not exceed 10MB

### Assets blocked by rules?

Asset rules can configure validation rules. Assets that do not meet the conditions will be rejected (BLOCKED).

- View blocked records in the import results
- Go to "**Asset Configuration**" → "**Asset Rules**" to check currently active rules
- Modify rules or adjust data and re-import

### Too many items selected during batch operation?

Click "**Clear Selection**" in the batch operation bar to clear current selection, or refresh the page to reset state.

---

## Search Engine

### API Key test failed after configuration

- Check if the Key is correct (no extra spaces)
- Check if the Key has expired or been banned
- Check if the server can access the corresponding engine's API (network connectivity)

### Search results are empty

- Try simplifying the search syntax to rule out syntax errors
- Some engine free accounts have query limits, try reducing the result count
- Check if API quota has been exhausted

---

## System & Permissions

### Menu shows "No Permission"

Contact admin to check your role permission configuration:

1. Go to "**Role Management**"
2. Find your role
3. Confirm that the view permission for the corresponding module is enabled

### WebSocket connection disconnected, notifications cannot be received in real-time

- Check if network connection is stable
- Refresh the page to re-establish WebSocket connection
- If using a reverse proxy, check if the proxy configuration supports WebSocket long connections

---

## Performance & Stability

### System response is slow

- Check server CPU/memory usage
- Check if PostgreSQL connection count has reached the limit
- Temporary slowdown may occur during high concurrent task execution, wait a moment

### Task logs cannot load

- Logs are pushed in real-time via WebSocket, check WebSocket connection status
- When tasks are completed, logs are loaded from the database, confirm the task was actually executed

---

## Deployment & Environment Troubleshooting

### Docker File Descriptor Limit Error (out of memory / ulimit)

**Symptom**:

When running high-concurrency scan tasks or starting Docker containers on Linux distributions (such as Kali Linux, Debian, or older CentOS releases), you encounter:
```text
library initialization failed - unable to allocate file descriptor table - out of memory
```

**Root Cause**:

The default `ulimit` file descriptor ceiling in Docker is low or system allocation limits restrict descriptor table expansion during concurrent port scanning.

**Solution**:

1. Edit the system's `docker.service` configuration file:
   ```bash
   sudo vim /usr/lib/systemd/system/docker.service
   ```
2. Append `--default-ulimit nofile=65536:65536` to the `ExecStart=/usr/bin/dockerd` line:
   ```text
   ExecStart=/usr/bin/dockerd --default-ulimit nofile=65536:65536
   ```
3. Reload systemd daemon and restart Docker:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```

### DNS Resolution Failure Inside Docker Containers

**Symptom**:

Scan probe nodes report network errors when pulling dependencies or resolving target domains:
```text
Temporary failure resolving 'mirrors.aliyun.com'
```

**Solution**:

1. Configure global DNS resolvers in Docker's daemon configuration:
   ```bash
   sudo mkdir -p /etc/docker
   sudo vim /etc/docker/daemon.json
   ```
2. Add reliable public DNS servers:
   ```json
   {
     "dns": ["223.5.5.5", "114.114.114.114", "8.8.8.8"]
   }
   ```
3. Restart Docker service:
   ```bash
   sudo systemctl restart docker
   ```

### Permission Denied When Mounting Docker Sock or Volumes

**Symptom**:

Probe nodes fail to launch scanner containers when mounting `/var/run/docker.sock` or local data volumes, throwing `Permission denied`.

**Root Cause**:

SELinux security enforcement is enabled on CentOS / RHEL hosts.

**Solution**:

- **Temporary disable**: Run `sudo setenforce 0`
- **Permanent disable**: Edit `/etc/selinux/config` and set `SELINUX=disabled`, then reboot the host.
- **Volume Policy (Recommended)**: Append `:z` or `:Z` flags to the volume mount path (e.g., `-v /var/run/docker.sock:/var/run/docker.sock:z`).

### Slow Dependency Downloads in Restricted Networks

**Symptom**:

Dependencies (e.g., Python `pip` packages or GitHub repository artifacts) time out during online probe setup.

**Solution**:

1. **PyPI Mirror**: Add domestic mirror flags to your Python dependency installation:
   ```bash
   pip3 install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/
   ```
2. **GitHub Acceleration**: Prepend acceleration proxy URLs (e.g., `https://gh-proxy.com/`) in node tool configurations or environment variables.

### Manual Debugging & Diagnostic Steps for Failed Scan Tasks

If a scan task fails on a probe node and UI logs are insufficient, follow these 5 diagnostic steps:

1. **Extract Command**: Go to "**Task Management**", view task logs, and copy the exact executed command.
2. **Access Probe Container**: Access the probe client container on the host server:
   ```bash
   docker exec -it testnet-client /bin/bash
   ```
3. **Execute Manually**: Paste and execute the copied tool command directly inside the container to inspect raw `stdout` and `stderr` output.
4. **Fix Dependencies**:
   - For binary permission errors, execute `chmod +x <tool>`.
   - For missing Python / Go dependencies, run `pip install` or adjust environment variables.
5. **Re-verify**: Ensure the command exits with code 0 inside the container, then click "**Retry**" in the web console.

---


## Contact Support

If the above content cannot resolve your issue, please:

1. Check the [Deployment Guide](/en/deploy/overview) to confirm correct installation configuration
2. Collect server logs (`docker logs testnet-server`)
3. Contact platform admin or submit an Issue
