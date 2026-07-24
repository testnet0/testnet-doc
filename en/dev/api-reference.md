---
title: API Reference
description: API Reference
---

# TestNet API Reference

> Base URL: `http://localhost:8081/api/v1`

## 1. API Conventions

### 1.1 Chinese REST Style

TestNet APIs follow the Chinese REST convention:

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| List | GET | `/{resource}/list` | Paginated query |
| Create | POST | `/{resource}/add` | Create resource |
| Update | PUT | `/{resource}/edit` | Update resource |
| Delete | DELETE | `/{resource}/delete?id=` | Delete single |
| Batch Delete | DELETE | `/{resource}/deleteBatch` | Batch delete |
| Query | GET | `/{resource}/queryById?id=` | Query by ID |

### 1.2 Response Format

All responses are wrapped in a unified `Result` envelope:

```json
{
  "code": 200,
  "message": "success",
  "data": { ... },
  "timestamp": 1717507200000
}
```

**Status Codes**:

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Parameter error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource not found |
| 500 | Server error |

### 1.3 Pagination Parameters

List endpoints support pagination:

```
GET /{resource}/list?pageNo=1&pageSize=20
```

Paginated response:
```json
{
  "records": [...],
  "total": 100,
  "size": 20,
  "current": 1,
  "pages": 5
}
```

## 2. Authentication Endpoints

### 2.1 Login

**Request**:
```
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}
```

**Response**:
```json
{
  "code": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_001",
      "username": "admin",
      "email": "admin@example.com",
      "roles": ["ADMIN"]
    },
    "permissions": [
      "asset:domain:view",
      "workflow:execute"
    ]
  }
}
```

::: tip JWT Expiration
JWT Tokens are valid for 24 hours. After expiration, you must log in again or use the refreshToken endpoint.
:::

## 3. Asset Management Endpoints

### 3.1 Domain

#### List
```
GET /asset/domain/list?pageNo=1&pageSize=20&domain=example.com
```

#### Create
```
POST /asset/domain/add
Content-Type: application/json

{
  "name": "example.com",
  "companyId": "company_001",
  "registrar": "GoDaddy",
  "expireTime": "2027-12-31",
  "projectId": "proj_001"
}
```

#### Update
```
PUT /asset/domain/edit
Content-Type: application/json

{
  "id": "domain_001",
  "name": "example.com",
  "status": "ACTIVE"
}
```

#### Delete
```
DELETE /asset/domain/delete?id=domain_001
```

#### Batch Delete
```
DELETE /asset/domain/deleteBatch?ids=domain_001,domain_002
```

### 3.2 Subdomain

#### List
```
GET /asset/subdomain/list?pageNo=1&pageSize=20&domainId=domain_001
```

#### Create
```
POST /asset/subdomain/add
Content-Type: application/json

{
  "subdomain": "api.example.com",
  "domainId": "domain_001",
  "ip": "1.2.3.4",
  "projectId": "proj_001"
}
```

### 3.3 IP

#### List
```
GET /asset/ip/list?pageNo=1&pageSize=20&country=CN
```

#### Create
```
POST /asset/ip/add
Content-Type: application/json

{
  "ip": "1.2.3.4",
  "country": "CN",
  "city": "Beijing",
  "isp": "Alibaba",
  "projectId": "proj_001"
}
```

### 3.4 Port

#### List
```
GET /asset/port/list?pageNo=1&pageSize=20&ipId=ip_001
```

#### Create
```
POST /asset/port/add
Content-Type: application/json

{
  "ip": "1.2.3.4",
  "port": 443,
  "protocol": "tcp",
  "service": "https",
  "projectId": "proj_001"
}
```

### 3.5 Web

#### List
```
GET /asset/web/list?pageNo=1&pageSize=20&subdomainId=sub_001
```

#### Create
```
POST /asset/web/add
Content-Type: application/json

{
  "url": "https://api.example.com",
  "title": "API Gateway",
  "httpStatus": 200,
  "projectId": "proj_001"
}
```

### 3.6 API

#### List
```
GET /asset/api/list?pageNo=1&pageSize=20&webId=web_001
```

### 3.7 Vulnerability (Vul)

#### List
```
GET /asset/vul/list?pageNo=1&pageSize=20&severity=high
```

## 4. Workflow Endpoints

### 4.1 Workflow List

```
GET /workflow/list?pageNo=1&pageSize=20&projectId=proj_001
```

### 4.2 Workflow Detail

```
GET /workflow/queryById?id=workflow_001
```

### 4.3 Create Workflow

```
POST /workflow/add
Content-Type: application/json

{
  "name": "Domain Recon",
  "description": "Domain reconnaissance workflow",
  "triggerMode": "MANUAL",
  "projectId": "proj_001",
  "configuration": "{ ... }"
}
```

### 4.4 Execute Workflow

```
POST /workflow/runForAsset
Content-Type: application/json

{
  "workflowId": "workflow_001",
  "assetType": "DOMAIN",
  "assetId": "domain_001"
}
```

Batch execution:
```
POST /workflow/batchRunWorkflow
```

### 4.5 Run Records

```
GET /workflow/runs?workflowId=workflow_001&pageNo=1&pageSize=20
```

### 4.6 Run Detail

```
GET /workflow/run/queryById?id=run_001
```

## 5. Tool Endpoints

### 5.1 Tool List

```
GET /tool/list?pageNo=1&pageSize=20&name=subfinder&type=recon
```

### 5.2 Tool Detail

```
GET /tool/queryById?id=subfinder
```

### 5.3 Create/Edit Tool

```
POST /tool/add
Content-Type: application/json

{
  "configuration": "kind: Tool\nmetadata:\n  id: ...\n..."
}
```

```
PUT /tool/edit
```

### 5.4 Import & Validate Tool YAML

```
POST /tool/importYaml
Content-Type: multipart/form-data
```

```
POST /tool/validateYaml
Content-Type: text/plain
```

```
GET /tool/{id}/validate
```

### 5.5 Delete Tool

```
DELETE /tool/delete?id=tool_001
DELETE /tool/deleteBatch?ids=tool_001,tool_002
```

### 5.6 Run Tool

Single asset execution:
```
POST /tool/runForAsset
Content-Type: application/json

{
  "toolId": "subfinder",
  "assetType": "DOMAIN",
  "assetId": "domain_001"
}
```

Batch execution:
```
POST /tool/batchRunTool
Content-Type: application/json

{
  "toolId": "httpx",
  "assetType": "SUBDOMAIN",
  "ids": ["sub_001", "sub_002"]
}
```

### 5.7 Registry Store & Installation

Registry endpoints are located under `/registry` for browsing, installing, and updating remote tools/workflows.

```
GET /registry/config
POST /registry/config
POST /registry/config/test
POST /registry/cache/clear
```

Remote tools:
```
GET /registry/tools/remote?category=recon
GET /registry/tools/remote/{toolId}
POST /registry/tools/install/{toolId}?version=latest
POST /registry/tools/installBatch?version=latest
POST /registry/tools/update/{toolId}
DELETE /registry/tools/uninstall/{toolId}
```

Remote workflows:
```
GET /registry/workflows/remote?category=recon
GET /registry/workflows/remote/{workflowId}
POST /registry/workflows/install/{workflowId}?version=latest
POST /registry/workflows/installBatch?version=latest
POST /registry/workflows/update/{workflowId}
DELETE /registry/workflows/uninstall/{workflowId}
```

Installed packages and update checks:
```
GET /registry/installed/tools
GET /registry/installed/workflows
GET /registry/check-updates
GET /registry/tools/check-updates/{toolId}
GET /registry/workflows/check-updates/{workflowId}
```

## 6. Task Endpoints

### 6.1 Task List

```
GET /task/list?pageNo=1&pageSize=20&taskStatus=COMPLETED
```

### 6.2 Task Detail

```
GET /task/queryById?id=task_001
```

### 6.3 Task Logs

```
GET /task/{id}/logs
```

### 6.4 Task Results

```
GET /task/queryById?id=task_001
```

::: tip Real-time Logs
Raw output and parsed results are included in task detail fields. Real-time execution logs are available via `/task/{id}/logs`.
:::

## 7. System Management Endpoints

### 7.1 User Management

#### List
```
GET /system/user/list?pageNo=1&pageSize=20
```

#### Create
```
POST /system/user/add
Content-Type: application/json

{
  "username": "user001",
  "password": "Password@123",
  "email": "user001@example.com",
  "roleIds": ["role_001"]
}
```

#### Update
```
PUT /system/user/edit
Content-Type: application/json

{
  "id": "user_001",
  "email": "newemail@example.com"
}
```

#### Delete
```
DELETE /system/user/delete?id=user_001
```

### 7.2 Role Management

#### List
```
GET /system/role/list?pageNo=1&pageSize=20
```

#### Create
```
POST /system/role/add
Content-Type: application/json

{
  "name": "Asset Manager",
  "code": "ASSET_MANAGER",
  "permissionIds": ["asset:domain:view", "asset:domain:edit"]
}
```

### 7.3 Permission Management

#### List
```
GET /system/permission/list
```

### 7.4 Department Management

#### List
```
GET /system/department/list
```

#### Create
```
POST /system/department/add
Content-Type: application/json

{
  "name": "Security Team",
  "parentId": "dept_001",
  "leaderId": "user_001"
}
```

## 8. Project Management Endpoints

### 8.1 Project List

```
GET /project/list?pageNo=1&pageSize=20
```

### 8.2 Create Project

```
POST /project/add
Content-Type: application/json

{
  "name": "Production Assets",
  "description": "Production environment asset management",
  "memberIds": ["user_001", "user_002"]
}
```

### 8.3 Project Detail

```
GET /project/queryById?id=proj_001
```

## 9. Client Node Endpoints

### 9.1 Client Registration

```
POST /client/register
Content-Type: application/json

{
  "name": "Scanner-01",
  "secret": "client-secret",
  "labels": {
    "env": "production"
  },
  "systemInfo": {
    "os": "linux",
    "arch": "amd64"
  }
}
```

### 9.2 Client Heartbeat

```
POST /client/heartbeat
Content-Type: application/json

{
  "clientId": "client_001",
  "status": "ONLINE",
  "taskCount": 5
}
```

### 9.3 Task Polling

```
GET /client/task/poll?clientId=client_001&timeout=30
```

### 9.4 Task Result Reporting

```
POST /client/task/{taskId}/report?clientId=client_001
Content-Type: application/json
X-Client-Token: <client-token>

{
  "exitCode": 0,
  "output": "..."
}
```

Client confirms task start:
```
POST /client/task/start?clientId=client_001&taskId=task_001
X-Client-Token: <client-token>
```

Client incremental log reporting:
```
POST /client/task/{taskId}/log?clientId=client_001
X-Client-Token: <client-token>
```

::: warning Client Authentication
Client endpoints require the `X-Client-Token` header for authentication. The token is returned upon successful node registration. The Go scanning client currently uses HTTP long-polling for task fetching; the WebSocket client has not yet been implemented.
:::

## 10. MCP Endpoints

For MCP endpoints, see: [MCP Protocol Overview](/en/mcp/overview)

## 11. WebSocket Endpoints

WebSocket is primarily for browser-based frontend, used for in-app notifications and task status push.

::: info Architecture Note
The Go scanning client currently uses HTTP long-polling to fetch tasks and HTTP endpoints to report logs and results. It does not use WebSocket.
:::

### 11.1 Connection

```
ws://localhost:8081/api/ws
```

### 11.2 Subscription Topics

**User notifications**:
```
/user/topic/notification
```

**Task status**:
```
/topic/task/{taskId}
```

### 11.3 Authentication

STOMP CONNECT frame carries the Authorization header:

```
CONNECT
Authorization: Bearer <token>
```

## Related Documentation

- [API Endpoint Index](/dev/api-index) — Auto-generated endpoint catalog from backend controllers
- [User Guide](/en/guide/introduction) — Platform usage guide
- [MCP Protocol Overview](/en/mcp/overview) — MCP integration details
```
