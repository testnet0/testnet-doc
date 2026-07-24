---
title: Changelog
description: Changelog
---

# Changelog

This document records the major version evolution, new features, and bug fixes of the TestNet platform.

> [!NOTE]
> Features from v2.x, including AI Applications, AI Models, AI Knowledge Base, AI Agent Orchestration, Ollama/DeepSeek integration, gRPC, and Elasticsearch, have been **removed in the v3.0 architectural refactoring**. Please refer to v3.0 and later versions for current features.

---

## [3.0.0] 2025-07-01

::: danger Critical Upgrade Notice
This version contains breaking changes. Please make a full backup of your data before upgrading. The database has been migrated from MySQL to **PostgreSQL 16**. **Direct upgrade from v2.x is not supported**. Please perform a fresh installation and migrate asset data using Excel export/import.
:::

### 🚀 New Features
- **MCP Integration**: Fully supports Model Context Protocol. AI Agents like Claude Code and Cursor can directly execute asset queries and trigger workflows (e.g., `testnet_query_assets`, `testnet_run_workflow`).
- **vNext DSL Engine**: Upgraded tool and workflow DSL specifications (`kind: Tool/Workflow`). The DAG control and data flows are defined via `dependsOn` and `inputs.*.from`, featuring real-time JSON Schema validation.
- **Asset Graph Chart**: Added a cross-type asset topology mapping page (powered by ECharts force-directed layout). View asset relationships in a clean, visual graph. Endpoint: `GET /api/v1/asset/graph`.
- **Tool Store (Registry)**: One-click installation and updates of scanning tools and workflows from a remote DSL repository. Includes 22 built-in tools and 8 pre-configured workflows.
- **Resilience & Circuit Breaking**: Integrated Resilience4j 2.2.0. Workflows and tasks now feature automatic circuit breaking and exponential backoff retry policies. System alerts are broadcasted via WebSocket at `/topic/system-alert`.
- **Remote Config Synchronization**: Scan nodes automatically synchronize configuration files from the server with SHA-256 integrity checks and symlink version management.

### ⚡ Architecture Upgrades
- **Database Upgrade**: Fully migrated the primary database to PostgreSQL 16, significantly boosting data processing performance and concurrent execution stability.
- **API Port Adjustment**: The backend API port has been changed from `:8080` to `:8081` (clients must update their configurations accordingly).
- **Communication Architecture Refactor**: The scan client now uses a highly reliable HTTP long-polling architecture, solving task loss and reconnection issues under unstable networks.
- **Frontend Refactor**: Enjoy faster page loading speeds, a brand new user interface, and real-time syntax checking/code highlighting for DSL rules using CodeMirror 6.

### 🐞 Bug Fixes
- Fixed the issue where workflow DAGs entered an infinite wait state in circular dependency scenarios.
- Fixed race conditions in task state updates during concurrent multi-node execution.
- Fixed URL deduplication logic errors during Web asset bulk imports.
- Fixed timezone offset issues that caused incorrect Cron-based automatic workflow triggers.

### ⚠️ Migration Guide
- The database is now PostgreSQL 16. In `docker-compose.yml`, the database service is named `testnet-db` (instead of `testnet-mysql`), and the volume name is `testnet-db-data`.
- The backend API port is now **8081**. Update `TESTNET_SERVER_URL` on scan clients to use port 8081.
- The client environment variable `TESTNET_SERVER` has been renamed to `TESTNET_SERVER_URL`.
- The backup command is now `pg_dump` (instead of `mysqldump`), and the restore command is `pg_restore` (instead of `mysql`).

---

## [2.2] 2025-04-21
### 🚀 New Features
- **AI Application Management**: Added configuration for standard applications and advanced workflow applications
- **AI Model Management**: Unified management of integrated large model API endpoints
- **AI Knowledge Base**: Support uploading local asset background and knowledge entries to build a local knowledge graph
- **AI Workflow Orchestration**: Support graphical drag-and-drop AI Agent task orchestration
- **AI Vector Database**: Provides vector database local storage and retrieval interfaces for intelligent Agent semantic asset search

### 🐞 Bug Fixes
- Fixed a memory leak bug that occasionally occurred during large file bulk asset import
- Fixed the issue where Web assets were not automatically imported to API, and API asset entry threw errors
- Fixed the bug where Web assets were not properly deduplicated during import
- Fixed the issue where Httpx scanned Web assets had misaligned parsing under concurrency
- Fixed the issue where Httpx scans did not return status codes and response sizes
- Fixed the issue where certain specific Linux kernel incompatibilities caused scanning node crashes

---

## [2.1] 2025-04-11
::: warning Redeployment Notice
This update refactored the distributed communication mechanism. Deployed distributed scanning nodes (Client) need to pull the latest code and recompile for redeployment.
:::

### 🚀 New Features
- **Multi-Port Input**: Port list supports entering/importing multiple ports at once (separated by commas)
- **Multi-Project Context**: Added a project switcher in the top navigation bar, supporting quick filtering and switching of project context
- **Optimized Page Navigation**: Optimized asset click-to-navigate logic to prevent accidental navigation away from the current editing page
- **Enhanced Log Search**: Task log real-time monitoring viewer added global keyword filtering and highlighting
- **Web Asset Path Support**: Web asset URLs support non-root path recognition
- **Data Ownership**: Assets now support assigning ownership to users and departments, enabling data permission control

### 🐞 Bug Fixes
- Fixed the bug where subdomain import incorrectly extracted top-level domain rules
- Fixed the bug where node custom tools failed to reload after a loading failure
- Fixed the bug where "batch delete" on the asset list page did not work under certain conditions
- Fixed the bug where scanning task result reporting threw errors when importing to the asset hub

### ⚡ Performance Optimizations
- Optimized million-level asset Excel import/export speed, reducing memory consumption by 40%
- Major refactoring of the server-side underlying architecture, upgrading Fastjson to v2.0.43
- Upgraded runtime environment to JDK 17 (compatible with JDK 8 and JDK 21)
- Upgraded Knife4j to springdoc-openapi based on the openapi3 standard
- Replaced built-in container from tomcat to the lighter and higher-concurrency undertow
- Upgraded Spring Cloud to 2021.0.8 and Spring Cloud Alibaba to 2021.0.6.2
- Upgraded reporting component Jimureport to the latest v1.9.5

---

## [2.0] 2025-02-07
::: danger Fresh Install Notice
This version removes the external Elasticsearch dependency and refactors the database model. Before upgrading, please export and back up your asset data, and perform a fresh database initialization.
:::

### 🚀 New Features
- **AI Assistant Upgrade**: Officially integrated DeepSeek API and Ollama local private deployment (such as DeepSeek-R1 distilled model)
- **Cyberspace Engine Enhancement**: Supports 0.zone (Lingling Xin'an) cyberspace search engine data fetching and import
- **System Security**: Admin initial password is now randomly generated at container startup (can be viewed via `docker logs testnet-server | grep 'Random password:'`)
- **Asset Hub Optimization**: Port services support manual marking as OPEN or CLOSED status

### ⚡ Performance Optimizations
- **Removed Elasticsearch**: Optimized native SQL queries, removed ES component, overall system memory usage reduced by over 30%
- **Underlying Communication Upgrade**: Replaced Redis publish/subscribe with gRPC high-performance RPC framework for fast synchronization between server and distributed clients
- **Asset Search Performance**: Advanced query and list search response speed improved by 50%
- **Result Reporting Retry**: When scanning nodes cannot report results due to network fluctuations, supports local queue temporary storage and automatic exponential backoff retry
- **High Availability Improvement**: Resolved the issue where Go client hangs or goes offline due to Docker container execution exceptions
- **API Asset Deduplication**: Added API URL and Methods composite unique index to automatically filter duplicate data

### 🐞 Bug Fixes
- Fixed the bug where the project selection dialog was misaligned during cyberspace mapping engine result import
- Fixed the issue where individual technology stack JSON displayed abnormally during Web asset export
- Fixed the timestamp parsing logic error in advanced query for asset time filtering
- Fixed the issue where pagination count jump did not work in the task list

---

## [1.9] 2024-12-05
### 🚀 New Features
- Added built-in **URLFinder** path scanning tool, supporting extracting APIs from Web frontend JS
- Added built-in **wih** sensitive information scanning tool, scanning sensitive credentials and emails in Web responses and source code

### ⚡ Performance Optimizations
- **Image Pre-bundled Tools**: To solve the issue of slow Go binary tool pulling and compilation on node machines, scanning node images now default to integrating Naabu, Subfinder, Nuclei and over 10 security tools, eliminating first-run installation wait time (image increased by 1GB, but experience significantly improved)
- Support custom `timeout` parameter in tool global configuration and node configuration (unit: minutes), default script timeout is 2 hours
- Optimized the issue where temporarily installed external tools were lost after node container restart
- Display specific stderr prompts in task details when task execution fails, reducing troubleshooting difficulty

---

## [1.8] 2024-10-11
### 🚀 New Features
- **Asset Blacklist**: Supports configuring regex-based blacklist filtering rules to automatically block unwanted internal network or specific assets
- **Port Scan Optimization**: Naabu and Nmap scanning nodes added firewall (WAF/IDS) recognition anti-blocking filters
- **Multi-channel Notification**: System notifications added WeCom, DingTalk, and Feishu group robot Webhook push support

### 🐞 Bug Fixes
- Fixed the issue where concurrent task execution caused some client node long connections to be disconnected by the server
- Fixed the bug where automatic tool installation failed to work in offline/no-public-network environments
