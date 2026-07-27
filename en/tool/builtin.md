---
title: Built-in Tool List
description: Built-in Tool List
---

# Built-in Tool List

TestNet includes 22 built-in security tools, covering reconnaissance, scanning, and vulnerability detection phases.

## Subdomain Discovery

### Subfinder

- **Category**: recon
- **Description**: Passive subdomain enumeration tool that collects subdomains from multiple OSINT sources (DNS, certificates, search engines, etc.) without directly interacting with the target, offering strong stealth
- **Input**: Domain (DOMAIN)
- **Output**: Subdomain (SUBDOMAIN)
- **Docker Image**: `projectdiscovery/subfinder`

### Amass

- **Category**: recon
- **Description**: Powerful subdomain enumeration tool supporting multiple active and passive modes with rich data sources
- **Input**: Domain (DOMAIN)
- **Output**: Subdomain (SUBDOMAIN)
- **Docker Image**: `caffix/amass`

### OneForAll

- **Category**: recon
- **Description**: Comprehensive Chinese subdomain collection tool integrating multiple subdomain collection methods, supporting brute force, certificate transparency, etc.
- **Input**: Domain (DOMAIN)
- **Output**: Subdomain (SUBDOMAIN)

---

## DNS Resolution

### DNS-Lookup

- **Category**: recon
- **Description**: DNS record query tool supporting A/AAAA/CNAME/MX/TXT/NS and other record types
- **Input**: Subdomain (SUBDOMAIN)
- **Output**: IP (IP)

### Dnsx

- **Category**: recon
- **Description**: High-speed DNS batch resolution tool supporting multiple DNS record type queries
- **Input**: Subdomain (SUBDOMAIN)
- **Output**: IP (IP)
- **Docker Image**: `projectdiscovery/dnsx`

---

## URL Collection

### Gau (GetAllUrls)

- **Category**: recon
- **Description**: Collects historical URLs from Wayback Machine, Common Crawl, and other sources
- **Input**: Domain (DOMAIN)
- **Output**: API endpoint (API)

### Waybackurls

- **Category**: recon
- **Description**: Extracts historical URLs from Wayback Machine, discovers offline but potentially existing endpoints
- **Input**: Domain (DOMAIN)
- **Output**: API endpoint (API)

---

## HTTP Probing

### Httpx

- **Category**: scan
- **Description**: High-speed HTTP probing tool that can gather title, status code, web server, tech stack, and other information
- **Input**: Subdomain (SUBDOMAIN) / IP (IP) / Port (PORT)
- **Output**: Web application (WEB)
- **Docker Image**: `projectdiscovery/httpx`

### Httpx-Screenshot

- **Category**: scan
- **Description**: Web page screenshot tool based on Httpx, can batch screenshot web application interfaces
- **Input**: Web application (WEB)
- **Output**: Screenshot file

---

## Port Scanning

### Naabu

- **Category**: scan
- **Description**: Fast port scanner supporting SYN/CONNECT modes with high accuracy
- **Input**: IP address (IP)
- **Output**: Port service (PORT)
- **Docker Image**: `projectdiscovery/naabu`

### Masscan

- **Category**: scan
- **Description**: Ultra-fast port scanning tool using asynchronous packet transmission, capable of scanning millions of ports per second
- **Input**: IP address (IP)
- **Output**: Port service (PORT)
- **Docker Image**: `instrumentisto/masscan`

### Nmap (Service)

- **Category**: scan
- **Description**: Network scanning tool focused on service version identification, identifying specific services and versions running on ports
- **Input**: IP (IP) / Port (PORT)
- **Output**: Port service (PORT)
- **Docker Image**: `instrumentisto/nmap`

### TCP-Check

- **Category**: scan
- **Description**: Lightweight TCP port probing tool supporting banner grabbing, built-in executor requiring no Docker
- **Input**: IP (IP) / Port (PORT)
- **Output**: Port service (PORT)

---

## Web Crawling

### Katana

- **Category**: recon
- **Description**: High-speed web crawler that discovers links, forms, and API endpoints in web applications
- **Input**: Web application (WEB)
- **Output**: API endpoint (API)
- **Docker Image**: `projectdiscovery/katana`

### Dirsearch

- **Category**: scan
- **Description**: Web directory and file scanning tool that uses wordlists to enumerate web paths
- **Input**: Web application (WEB)
- **Output**: API endpoint (API)
- **Docker Image**: `ghcr.io/maurosoria/dirsearch`

### Ffuf

- **Category**: scan
- **Description**: Multi-purpose web fuzzing tool supporting directory discovery, parameter brute-forcing, and other use cases
- **Input**: Web application (WEB)
- **Output**: API endpoint (API)
- **Docker Image**: `ghcr.io/ffuf/ffuf`

---

## Fingerprint Identification

### Wappalyzer

- **Category**: recon
- **Description**: Web technology fingerprint identification tool that identifies frameworks, CMS, JavaScript libraries, etc. used by websites
- **Input**: Web application (WEB)
- **Output**: Updates WEB tech stack field

### WhatWeb

- **Category**: recon
- **Description**: Web application identification tool supporting identification of various CMS and web servers
- **Input**: Web application (WEB)
- **Output**: Updates WEB tech stack field

---

## Vulnerability Scanning

### Nuclei

- **Category**: vuln
- **Description**: Fast vulnerability scanning tool based on YAML templates, with thousands of built-in vulnerability detection templates and support for custom templates
- **Input**: Web application (WEB) / API (API)
- **Output**: Vulnerability (VUL)
- **Docker Image**: `projectdiscovery/nuclei`

### SQLMap

- **Category**: vuln
- **Description**: Professional SQL injection vulnerability detection tool supporting multiple databases and injection techniques
- **Input**: API endpoint (API)
- **Output**: Vulnerability (VUL)
- **Docker Image**: `paoloo/sqlmap`

### Subzy

- **Category**: vuln
- **Description**: Subdomain takeover vulnerability detection tool that checks whether services pointed to by CNAME records have been deregistered
- **Input**: Subdomain (SUBDOMAIN)
- **Output**: Vulnerability (VUL)
- **Docker Image**: `ghcr.io/lukasikic/subzy`

### TruffleHog

- **Category**: vuln
- **Description**: Sensitive information leakage detection tool that scans Git repositories and code files for API Keys, passwords, etc.
- **Input**: Web application (WEB)
- **Output**: Vulnerability (VUL)
- **Docker Image**: `trufflesecurity/trufflehog`