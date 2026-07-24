# Tool Management & Configuration Sync

TestNet decouples underlying security engines (e.g., Nuclei, Nmap, Subfinder) into modular Tool specs. Administrators govern these tools globally via **Store Installation (`StoreDrawer`)**, **Default Execution Templates**, and **Remote Config File Distribution (`configfile`)**.

---

## 1. Tool Store & Hot Upgrades (`StoreDrawer`)

Click **"Store (StoreDrawer)"** in the top right of **"Tool Management" -> "Tool List"**:
- **Versioned Specs**: Tool packages are loaded directly from your remote or builtin `testnet-registry`, stored as versioned YAML specs (e.g., `1.0.0.yaml`);
- **One-Click Hot Reload**: When updated templates or parameter flags are released, administrators can click **"Update"** to reload definitions instantly without restarting Java or Go processes.

---

## 2. Default Execution Settings & Parameter Tuning

Click **"Config"** on any tool row to standardize default execution behavior across all workflows:
- **Timeouts & Retries**: Set maximum execution caps (`600s`) and automatic backoff/retry policies for transient network failures;
- **Environment Shielding**: Safely mask system variables so container commands never leak sensitive server environment strings (`TESTNET_PREFIX_`);
- **Resource Limits**: Define default Docker CPU and memory boundaries to prevent intensive brute-force scans from exhausting remote node hardware.

---

## 3. Remote Config File Distribution

Certain security utilities require extensive external asset libraries or custom dictionaries—such as **Nuclei Templates (`nuclei-templates`)**, **Brute-force Wordlists (`wordlists.txt`)**, or **Provider Credentials (`provider-config.yaml`)**. TestNet solves this via its **Remote Config File Distribution Module**:

### SHA-256 Versioning & Verification
- Upload or edit configuration payloads directly via **"Config File Management"**;
- Every modification generates an exact `SHA-256` hash and maintains historical revisions via atomic symbolic links (`symlink`).

### Automated Node Synchronization
- When a Go scanning node (`testnet-client`) receives a task dispatch, the execution envelope (`Envelope`) includes required `configfile` IDs and their expected `SHA-256` signatures;
- If the local cache misses or hashes differ, the Go agent securely downloads the payload via HTTPS, verifies its integrity, and mounts it into the containerized execution environment as read-only volumes (e.g., `/root/.config/nuclei/`). This guarantees absolute consistency across thousands of distributed scanning probes!
