---
title: Tool Management Overview
description: Tool Management Overview
---

# Tool Management Overview

Tools are the smallest execution units in TestNet for performing specific scanning tasks. Each tool encapsulates the invocation logic of a security tool.

## Tool List

Go to "**Tool Management**" → "**Tool List**" to view all installed tools:

| Field | Description |
|-------|-------------|
| **Tool Name** | Display name of the tool |
| **Tool ID** | Unique identifier (e.g., `subfinder`) |
| **Version** | Currently installed version |
| **Category** | recon / scan / vuln / utility |
| **Status** | Available / Disabled |
| **Last Updated** | Version update time |

---

## Tool Categories

### Recon Tools

| Tool | Description |
|------|-------------|
| **Subfinder** | Passive subdomain discovery, does not directly contact the target |
| **Amass** | Active and passive combined subdomain enumeration |
| **DNS-Lookup** | DNS record query (A/AAAA/MX/TXT etc.) |
| **Dnsx** | High-speed DNS batch resolution |
| **Gau** | Fetch historical URLs from multiple sources |
| **Waybackurls** | Wayback Machine historical URL extraction |

### Scan Tools

| Tool | Description |
|------|-------------|
| **Httpx** | HTTP probing and information gathering (title, status code, tech stack) |
| **Naabu** | High-speed port scanning |
| **Masscan** | Ultra-fast large-scale port scanning |
| **Nmap (Service)** | Port service version identification |
| **Katana** | Web crawler, discovers links and APIs |
| **Dirsearch** | Web directory scanning |
| **Ffuf** | Web fuzzing testing |
| **TCP-Check** | TCP port probing and banner grabbing |
| **Httpx-Screenshot** | Web page screenshot |

### Vulnerability Detection (Vuln)

| Tool | Description |
|------|-------------|
| **Nuclei** | Template-based vulnerability scanning, covers multiple vulnerability types |
| **SQLMap** | SQL injection vulnerability detection |
| **Subzy** | Subdomain takeover vulnerability detection |
| **TruffleHog** | Sensitive information leakage detection (Git, code, etc.) |

### Fingerprint Identification (Utility)

| Tool | Description |
|------|-------------|
| **Wappalyzer** | Web technology fingerprint identification |
| **WhatWeb** | Web application identification |

---

## Tool Details

Click a tool name to view tool details:

- **Basic Information**: Name, version, description, category
- **Input/Output**: What input types the tool accepts and what output types it produces
- **Parameter List**: Supported parameters with descriptions and default values
- **DSL Definition**: Raw YAML definition file

---

## Related Documentation

- [Store & Config File Sync](/en/tool/management) — Store installation, defaults, and remote config file sync
- [22 Built-in Tools List](/en/tool/builtin) — Detailed descriptions of all tools