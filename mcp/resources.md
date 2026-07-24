---
title: MCP 资源
description: MCP 资源
---

# MCP 资源

TestNet 提供 3 个 MCP 资源，AI 助手可以通过这些资源获取平台数据。

## testnet://projects

**说明**：获取所有可访问的项目列表

**访问方式**：

```http
GET /mcp/v1/resources/read?uri=testnet://projects
Authorization: Bearer <token>
```

**响应示例**：

```json
[
  {
    "id": "proj_001",
    "name": "Production Assets",
    "description": "生产环境资产管理",
    "createTime": "2026-01-01T00:00:00Z"
  },
  {
    "id": "proj_002",
    "name": "Testing Environment",
    "description": "测试环境资产",
    "createTime": "2026-02-01T00:00:00Z"
  }
]
```

---

## testnet://workflows

**说明**：获取所有已安装的工作流列表

**响应示例**：

```json
[
  {
    "id": "domain-recon-pipeline",
    "name": "Domain Recon Pipeline",
    "description": "域名侦察流水线",
    "triggerType": "MANUAL",
    "status": "ACTIVE"
  }
]
```

---

## testnet://tools

**说明**：获取所有已安装的工具列表

**响应示例**：

```json
[
  {
    "id": "subfinder",
    "name": "Subfinder",
    "version": "1.0.0",
    "category": "recon",
    "description": "被动子域名发现工具"
  }
]
```

---

## 获取资源列表

获取所有可用资源的定义：

```http
GET /mcp/v1/resources
Authorization: Bearer <token>
```

响应：

```json
[
  {
    "uri": "testnet://projects",
    "name": "TestNet 项目列表",
    "description": "所有可访问的项目",
    "mimeType": "application/json"
  },
  {
    "uri": "testnet://workflows",
    "name": "TestNet 工作流列表",
    "description": "所有已安装的工作流",
    "mimeType": "application/json"
  },
  {
    "uri": "testnet://tools",
    "name": "TestNet 工具列表",
    "description": "所有已安装的工具",
    "mimeType": "application/json"
  }
]
```
