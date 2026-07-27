---
title: Product Introduction
description: Product Introduction
---

# Product Introduction

TestNet is a **distributed asset management and automated security scanning platform** designed for enterprise security teams. It helps you systematically discover, manage, and monitor network assets, while continuously tracking changes and security risks through automated workflows.

## Core Capabilities

### 🏢 Cascading Asset Graph Engine

TestNet incorporates **8 core asset models** spanning organizational entities (Companies, Domains), network infrastructure (Subdomains, IPs, Ports), and application/risk surfaces (Web Sites, API Endpoints, Vulnerabilities). Our automated resolution engine builds a unified attack surface topology from root targets down to high-risk CVEs. For schema details, see: **[Asset Graph Models](/en/assets/models)**.

### 🔄 Visual Workflow Orchestration

Create automated scan workflows via a **Visual DAG Editor**:

- **Manual Trigger**: Run scan tasks on-demand
- **Scheduled Trigger**: Periodically execute scans based on Cron expressions
- **Asset Linkage**: Automatically trigger scans when new assets are discovered

### 🌐 Distributed Scanning Architecture

- **Lightweight Client**: Single binary without external dependencies, supporting Linux/macOS/Windows
- **Flexible Execution**: Supports Docker containers, Shell commands, HTTP requests, DNS queries, and TCP probing
- **Elastic Scaling**: Supports parallel execution across multiple nodes, adding or removing nodes as needed

### 🛠️ Rich Tool Ecosystem

**22 built-in security tools** covering reconnaissance, scanning, and vulnerability detection stages:

::: details Reconnaissance Tools (Recon)
- **Subfinder** — Passive subdomain discovery
- **Amass** — Active subdomain enumeration
- **OneForAll** — Comprehensive subdomain collection
- **DNS-Lookup** — Query DNS records
- **Dnsx** — High-performance bulk DNS resolver
- **Gau** — Retrieve historic URLs
- **Waybackurls** — Extract URLs from Wayback Machine
- **Katana** — Web crawler and link extraction
- **Wappalyzer** — Web technology fingerprinting
- **Whatweb** — Web application identifier
:::

::: details Scanning Tools (Scan)
- **Httpx** — HTTP probing and info gathering
- **Httpx-Screenshot** — Web page screenshots
- **Naabu** — Port scanning
- **Masscan** — High-speed port scanning
- **Nmap** — Service and version identification
- **TCP-Check** — TCP port probing
- **Dirsearch** — Directory brute-forcing
- **Ffuf** — Web fuzzing tool
:::

::: details Vulnerability Detection (Vulnerability)
- **Nuclei** — Template-based vulnerability scanning
- **Sqlmap** — SQL injection detection
- **Subzy** — Subdomain takeover detection
- **Trufflehog** — Sensitive information leak scanner
:::

## System Architecture

```
┌─────────────────────┐
│   Web Admin Interface  │
│   Vue 3 + Naive UI    │ :3100
└──────────┬──────────┘
           │ HTTPS / WebSocket
┌──────────▼──────────┐
│   Backend API           │
│   Spring Boot 3.4     │ :8081
└──┬──────┬──────┬────┘
   │      │      │
┌──────┐ ┌─▼──┐ ┌─▼──────────┐
│  PG  │ │Redis│ │ Go Scan Nodes │
│  16  │ │  7  │ │  (Multi-node) │
└──────┘ └─────┘ └──────────────┘
```

## Use Cases

- **Asset Discovery**: Regularly scan to automatically find new subdomains, IPs, ports, and Web applications.
- **Continuous Monitoring**: Track asset changes and trigger scan workflows on new findings.
- **Vulnerability Management**: Automatically archive vulnerability scan results and track fix statuses.
- **Security Inspection**: Run regular compliance scan workflows to assess security state.
- **Cyberspace Search Integration**: Consolidate data from FOFA, Shodan, etc., to enrich asset sources.

## Next Steps

- [Quick Start](/en/guide/quickstart) — Perform your first login and scan in 5 minutes
- [Asset Management](/en/assets/overview) — Learn how to manage enterprise assets
- [Workflows](/en/workflow/overview) — Create your first scanning workflow
- [Deployment Guide](/en/deploy/overview) — Deploy production environment with Docker compose
