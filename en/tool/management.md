---
title: Tool Management & Configuration Sync
description: Tool installation, default parameters and config file sync
---

# Tool Management & Configuration Sync

TestNet manages scanning tools via the tool store, configures default parameters, and syncs configuration files.

---

## 1. Tool Store & Hot Upgrades

Click **"Store"** in the top right of **"Tool Management" -> "Tool List"**:

![Tool Store](/screenshots/store-drawer.png)

### Steps

1. Navigate to **"Tool Management"** → **"Tool List"**
2. Click **"Store"** in the top right to open the drawer
3. Browse or search for the desired tool (filter by category)
4. Click **"Install"** to add the tool to your local library
5. For installed tools with available updates, an **"Update"** button appears — click to apply instantly without restarting services

::: tip Built-in Tools
The platform ships with 22 pre-configured security tools covering subdomain enumeration, port scanning, vulnerability detection, web fingerprinting, and more. See [Built-in Tools](/en/tool/builtin).
:::

---

## 2. Default Execution Settings

Click **"Config"** on any tool row to set default parameters for your team:
- **Timeouts & Retries**: Set max execution time (e.g., `600s`) and automatic retry count on failure;
- **Environment Shielding**: Mask sensitive environment variables to prevent leakage;
- **Resource Limits**: Set max memory and CPU for Docker-based tools to prevent resource exhaustion.

---

## 3. Remote Config File Sync

For tools requiring external rule libraries or config dictionaries (e.g., Nuclei templates, wordlists, API key files), TestNet provides remote config file sync:

### Steps

1. Navigate to the **"Config File Management"** menu
2. Click **"New"** to upload or edit a configuration file online
3. The system automatically records the version upon saving
4. Reference the config file in the tool's execution settings
5. Scanning nodes automatically verify and sync the latest version on task execution

::: tip Version Consistency
All scanning nodes always use the same config file version — nodes automatically pull the latest version.
:::

---

## Related Documentation

- [Tool Overview](/en/tool/overview) — Tool categories and capabilities
- [Built-in Tools](/en/tool/builtin) — 22 pre-configured security tools
- [Workflow DSL Reference](/en/workflow/dsl-reference) — Referencing tools in workflows
- [Node Sandbox & Security](/en/client/security) — Sandbox and config file mount security policies
