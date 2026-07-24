---
title: MCP Tool Reference
description: MCP Tool Reference
---

# MCP Tool Reference

## Authentication & Response Format

All MCP API calls require a JWT Token in the HTTP header:

```http
Authorization: Bearer <your-jwt-token>
```

All tool executions use the endpoint `POST /mcp/v1/tools/call`.
The HTTP response body returned by the server follows the standard platform wrapper format:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "content": [
      {
        "type": "text",
        "text": "..." // JSON data string returned by the tool
      }
    ]
  },
  "timestamp": 1717507200000
}
```
For brevity, the **Response Examples** of each tool below show only the actual deserialized business JSON data from the `data.content[0].text` field.

---

## testnet_query_assets

Query the asset list of a specified project.

**Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string | ✅ | Project ID |
| `assetType` | string | | Asset type: `company`, `domain`, `sub_domain`, `ip`, `port`, `web`, `api`, `vul` (defaults to `ip`) |
| `limit` | integer | | Limit of returned count, default 20, max 500 |

**Request Example**:

```json
{
  "name": "testnet_query_assets",
  "arguments": {
    "projectId": "proj_001",
    "assetType": "sub_domain",
    "limit": 50
  }
}
```

**Response Example**:

```json
[
  {
    "id": "sub_001",
    "subdomain": "api.example.com",
    "domain": "example.com",
    "ip": "192.168.1.1",
    "status": "ACTIVE",
    "projectId": "proj_001"
  }
]
```

---

## testnet_get_asset_detail

Get complete details of a single asset.

**Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `assetType` | string | ✅ | Asset type: `company`, `domain`, `sub_domain`, `ip`, `port`, `web`, `api`, `vul` |
| `assetId` | string | ✅ | Asset ID |

**Request Example**:

```json
{
  "name": "testnet_get_asset_detail",
  "arguments": {
    "assetType": "sub_domain",
    "assetId": "sub_001"
  }
}
```

---

## testnet_run_workflow

Execute a specified workflow.

**Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflowId` | string | ✅ | Workflow ID |
| `target` | string | ✅ | Scan target (domain name, IP, etc.) |
| `assetType` | string | | Asset type: `IP` or `DOMAIN` (defaults to `DOMAIN`) |

**Request Example**:

```json
{
  "name": "testnet_run_workflow",
  "arguments": {
    "workflowId": "domain-recon-pipeline",
    "target": "example.com",
    "assetType": "DOMAIN"
  }
}
```

**Response Example**:

```json
{
  "status": "triggered",
  "workflowId": "domain-recon-pipeline"
}
```

---

## testnet_list_workflows

List available workflows.

**Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `enabled` | boolean | | Whether to return only enabled workflows; if `true`, only returns enabled workflows |

**Request Example**:

```json
{
  "name": "testnet_list_workflows",
  "arguments": {
    "enabled": true
  }
}
```

---

## testnet_list_tools

List all available scanning tools in the system.

**Parameters**: None

**Request Example**:

```json
{
  "name": "testnet_list_tools",
  "arguments": {}
}
```

---

## testnet_run_tool

Execute a single tool (not through a workflow).

**Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `toolName` | string | ✅ | Tool name, e.g. `subfinder` |
| `target` | string | ✅ | Scan target (must have a corresponding IP or DOMAIN asset in the database) |

**Request Example**:

```json
{
  "name": "testnet_run_tool",
  "arguments": {
    "toolName": "subfinder",
    "target": "example.com"
  }
}
```

**Response Example**:

```json
{
  "status": "task_created",
  "tool": "subfinder",
  "target": "example.com",
  "assetType": "DOMAIN",
  "assetId": "domain_001",
  "runId": "run_abc123",
  "taskIds": ["task_xyz789"],
  "createdCount": 1
}
```

---

## testnet_get_task_status

Query task execution status.

**Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `taskId` | string | ✅ | Task ID |

**Request Example**:

```json
{
  "name": "testnet_get_task_status",
  "arguments": {
    "taskId": "task_xyz789"
  }
}
```

**Response Example**:

```json
{
  "taskId": "task_xyz789",
  "status": "COMPLETED"
}
```

---

## testnet_list_projects

List all accessible projects for the current user.

**Parameters**: None

**Request Example**:

```json
{
  "name": "testnet_list_projects",
  "arguments": {}
}
```