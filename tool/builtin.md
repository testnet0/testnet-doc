---
title: 内置工具列表
description: 内置工具列表
---

# 内置工具列表

TestNet 内置 22 个安全工具，覆盖侦察、扫描、漏洞检测各阶段。

## 子域名发现

### Subfinder

- **分类**：recon
- **说明**：被动子域名枚举工具，从多个开源情报来源（DNS、证书、搜索引擎等）收集子域名，不直接与目标交互，隐蔽性强
- **输入**：主域名（DOMAIN）
- **输出**：子域名（SUBDOMAIN）
- **Docker 镜像**：`projectdiscovery/subfinder`

### Amass

- **分类**：recon
- **说明**：功能强大的子域名枚举工具，支持主被动多种模式，数据来源丰富
- **输入**：主域名（DOMAIN）
- **输出**：子域名（SUBDOMAIN）
- **Docker 镜像**：`caffix/amass`

### OneForAll

- **分类**：recon
- **说明**：国产全能子域名收集工具，集成多种子域名收集方式，支持爆破、证书透明度等
- **输入**：主域名（DOMAIN）
- **输出**：子域名（SUBDOMAIN）

---

## DNS 解析

### DNS-Lookup

- **分类**：recon
- **说明**：DNS 记录查询工具，支持 A/AAAA/CNAME/MX/TXT/NS 等记录类型
- **输入**：子域名（SUBDOMAIN）
- **输出**：IP（IP）

### Dnsx

- **分类**：recon
- **说明**：高速 DNS 批量解析工具，支持多种 DNS 记录类型查询
- **输入**：子域名（SUBDOMAIN）
- **输出**：IP（IP）
- **Docker 镜像**：`projectdiscovery/dnsx`

---

## URL 收集

### Gau (GetAllUrls)

- **分类**：recon
- **说明**：从 Wayback Machine、Common Crawl 等多个来源收集历史 URL
- **输入**：主域名（DOMAIN）
- **输出**：API 接口（API）

### Waybackurls

- **分类**：recon
- **说明**：从 Wayback Machine 提取历史 URL，发现已下线但可能存在的接口
- **输入**：主域名（DOMAIN）
- **输出**：API 接口（API）

---

## HTTP 探测

### Httpx

- **分类**：scan
- **说明**：高速 HTTP 探活工具，可采集标题、状态码、Web 服务器、技术栈等信息
- **输入**：子域名（SUBDOMAIN）/ IP（IP）/ 端口（PORT）
- **输出**：Web 应用（WEB）
- **Docker 镜像**：`registry.cn-hangzhou.aliyuncs.com/testnet-tools/httpx`

### Httpx-Screenshot

- **分类**：scan
- **说明**：基于 Httpx 的 Web 页面截图工具，可批量截图 Web 应用界面
- **输入**：Web 应用（WEB）
- **输出**：截图文件

---

## 端口扫描

### Naabu

- **分类**：scan
- **说明**：快速端口扫描器，支持 SYN/CONNECT 模式，精度高
- **输入**：IP 地址（IP）
- **输出**：端口服务（PORT）
- **Docker 镜像**：`projectdiscovery/naabu`

### Masscan

- **分类**：scan
- **说明**：极速端口扫描工具，采用异步发包机制，可以每秒扫描数百万个端口
- **输入**：IP 地址（IP）
- **输出**：端口服务（PORT）
- **Docker 镜像**：`instrumentisto/masscan`

### Nmap (Service)

- **分类**：scan
- **说明**：网络扫描工具，专注于服务版本识别，识别端口上运行的具体服务和版本
- **输入**：IP（IP）/ 端口（PORT）
- **输出**：端口服务（PORT）
- **Docker 镜像**：`instrumentisto/nmap`

### TCP-Check

- **分类**：scan
- **说明**：轻量级 TCP 端口探测工具，支持 Banner 抓取，内置执行器无需 Docker
- **输入**：IP（IP）/ 端口（PORT）
- **输出**：端口服务（PORT）

---

## Web 爬虫

### Katana

- **分类**：recon
- **说明**：高速 Web 爬虫，发现 Web 应用中的链接、表单、API 端点
- **输入**：Web 应用（WEB）
- **输出**：API 接口（API）
- **Docker 镜像**：`projectdiscovery/katana`

### Dirsearch

- **分类**：scan
- **说明**：Web 目录和文件扫描工具，使用字典枚举 Web 路径
- **输入**：Web 应用（WEB）
- **输出**：API 接口（API）
- **Docker 镜像**：`ghcr.io/maurosoria/dirsearch`

### Ffuf

- **分类**：scan
- **说明**：多功能 Web Fuzzing 工具，支持目录发现、参数爆破等多种用法
- **输入**：Web 应用（WEB）
- **输出**：API 接口（API）
- **Docker 镜像**：`ghcr.io/ffuf/ffuf`

---

## 指纹识别

### Wappalyzer

- **分类**：recon
- **说明**：Web 技术指纹识别工具，识别网站使用的框架、CMS、JavaScript 库等
- **输入**：Web 应用（WEB）
- **输出**：更新 WEB 的技术栈字段

### WhatWeb

- **分类**：recon
- **说明**：Web 应用识别工具，支持识别多种 CMS 和 Web 服务器
- **输入**：Web 应用（WEB）
- **输出**：更新 WEB 的技术栈字段

---

## 漏洞扫描

### Nuclei

- **分类**：vuln
- **说明**：基于 YAML 模板的快速漏洞扫描工具，内置数千个漏洞检测模板，支持自定义模板
- **输入**：Web 应用（WEB）/ API（API）
- **输出**：漏洞（VUL）
- **Docker 镜像**：`projectdiscovery/nuclei`

### SQLMap

- **分类**：vuln
- **说明**：专业的 SQL 注入漏洞检测工具，支持多种数据库和注入技术
- **输入**：API 接口（API）
- **输出**：漏洞（VUL）
- **Docker 镜像**：`paoloo/sqlmap`

### Subzy

- **分类**：vuln
- **说明**：子域名接管漏洞检测工具，检测 CNAME 指向的服务是否已被注销
- **输入**：子域名（SUBDOMAIN）
- **输出**：漏洞（VUL）
- **Docker 镜像**：`ghcr.io/lukasikic/subzy`

### TruffleHog

- **分类**：vuln
- **说明**：敏感信息泄露检测工具，扫描 Git 仓库、代码文件中的 API Key、密码等
- **输入**：Web 应用（WEB）
- **输出**：漏洞（VUL）
- **Docker 镜像**：`trufflesecurity/trufflehog`
