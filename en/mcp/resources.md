---
title: MCP Resources
description: MCP Resources
---

# MCP Resources

TestNet provides 3 MCP resources through which AI assistants can obtain platform data.

## testnet://projects

**Description**: Get all accessible project lists

**Access Method**:

```http
GET /mcp/v1/resources/read?uri=testnet://projects
Authorization: Bearer <token>
```

**Response Example**:

```json
[
  {
    "id": "proj_001",
    "name": "Production Assets",
    "description": "Production environment asset management",
    "createTime": "2026-01-01T00:00:00Z"
  },
  {
    "id": "proj_002",
    "name": "Testing Environment",
    "description": "Testing environment assets",
    "createTime": "2026-02-01T00:00:00Z"
  }
]
```

---

## testnet://workflows

**Description**: Get all installed workflow lists

**Response Example**:

```json
[
  {
    "id": "domain-recon-pipeline",
    "name": "Domain Recon Pipeline",
    "description": "Domain reconnaissance pipeline",
    "triggerType": "MANUAL",
    "status": "ACTIVE"
  }
]
```

---

## testnet://tools

**Description**: Get all installed tool lists

**Response Example**:

```json
[
  {
    "id": "subfinder",
    "name": "Subfinder",
    "version": "1.0.0",
    "category": "recon",
    "description": "Passive subdomain discovery tool"
  }
]
```

---

## Getting Resource List

Get definitions of all available resources:

```http
GET /mcp/v1/resources
Authorization: Bearer <token>
```

Response:

```json
[
  {
    "uri": "testnet://projects",
    "name": "TestNet Project List",
    "description": "All accessible projects",
    "mimeType": "application/json"
  },
  {
    "uri": "testnet://workflows",
    "name": "TestNet Workflow List",
    "description": "All installed workflows",
    "mimeType": "application/json"
  },
  {
    "uri": "testnet://tools",
    "name": "TestNet Tool List",
    "description": "All installed tools",
    "mimeType": "application/json"
  }
]
```