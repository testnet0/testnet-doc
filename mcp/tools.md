---
title: MCP 工具参考
description: MCP 工具参考
---

# MCP 工具参考

## 认证与响应格式

所有 MCP API 调用需要在 HTTP 头部携带 JWT Token：

```http
Authorization: Bearer <your-jwt-token>
```

所有工具调用均使用端点 `POST /mcp/v1/tools/call`。
服务端返回的 HTTP 响应主体遵循平台统一格式包装：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "content": [
      {
        "type": "text",
        "text": "..." // 工具执行的 JSON 数据字符串
      }
    ]
  },
  "timestamp": 1717507200000
}
```
为了简洁，下文各工具的**响应示例**仅展示 `data.content[0].text` 字段反序列化后的实际业务 JSON 数据。

---

## testnet_query_assets

查询指定项目中的资产列表。

**参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `projectId` | string | ✅ | 项目 ID |
| `assetType` | string | | 资产类型：`company`, `domain`, `sub_domain`, `ip`, `port`, `web`, `api`, `vul`（默认 `ip`） |
| `limit` | integer | | 返回数量限制，默认 20，最大 500 |

**请求示例**：

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

**响应示例**：

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

获取单个资产的完整详情。

**参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `assetType` | string | ✅ | 资产类型：`company`, `domain`, `sub_domain`, `ip`, `port`, `web`, `api`, `vul` |
| `assetId` | string | ✅ | 资产 ID |

**请求示例**：

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

执行指定工作流。

**参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `workflowId` | string | ✅ | 工作流 ID |
| `target` | string | ✅ | 扫描目标（域名、IP等） |
| `assetType` | string | | 资产类型：`IP` 或 `DOMAIN`（默认 `DOMAIN`） |

**请求示例**：

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

**响应示例**：

```json
{
  "status": "triggered",
  "workflowId": "domain-recon-pipeline"
}
```

---

## testnet_list_workflows

列出可用的工作流。

**参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `enabled` | boolean | | 是否只返回已启用的工作流，为 `true` 则只返回启用状态的工作流 |

**请求示例**：

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

列出已安装的扫描工具列表。

**参数**：无参数

**请求示例**：

```json
{
  "name": "testnet_list_tools",
  "arguments": {}
}
```

---

## testnet_run_tool

执行单个工具（不通过工作流）。

**参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `toolName` | string | ✅ | 工具名称，例如 `subfinder` |
| `target` | string | ✅ | 扫描目标（必须在资产库中存在对应 IP 或 DOMAIN 资产） |

**请求示例**：

```json
{
  "name": "testnet_run_tool",
  "arguments": {
    "toolName": "subfinder",
    "target": "example.com"
  }
}
```

**响应示例**：

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

查询任务执行状态。

**参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `taskId` | string | ✅ | 任务 ID |

**请求示例**：

```json
{
  "name": "testnet_get_task_status",
  "arguments": {
    "taskId": "task_xyz789"
  }
}
```

**响应示例**：

```json
{
  "taskId": "task_xyz789",
  "status": "COMPLETED"
}
```

---

## testnet_list_projects

列出当前用户可访问的项目列表。

**参数**：无参数

**请求示例**：

```json
{
  "name": "testnet_list_projects",
  "arguments": {}
}
```
