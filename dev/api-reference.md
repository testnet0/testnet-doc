---
title: API 接口参考
description: TestNet REST API 完整参考
---

# TestNet API 参考

> 基础 URL: `http://localhost:8081/api/v1`

## 一、API 约定

### 1.1 Chinese REST 风格

TestNet API 采用 Chinese REST 风格：

| 操作 | 方法 | 端点 | 说明 |
|------|------|------|------|
| 列表 | GET | `/{resource}/list` | 分页查询 |
| 新增 | POST | `/{resource}/add` | 创建资源 |
| 编辑 | PUT | `/{resource}/edit` | 更新资源 |
| 删除 | DELETE | `/{resource}/delete?id=` | 删除单个 |
| 批量删除 | DELETE | `/{resource}/deleteBatch` | 批量删除 |
| 查询 | GET | `/{resource}/queryById?id=` | 按 ID 查询 |

### 1.2 响应格式

所有响应使用统一的 `Result` 包装：

```json
{
  "code": 200,
  "message": "success",
  "data": { ... },
  "timestamp": 1717507200000
}
```

**状态码**：

| Code | 说明 |
|------|------|
| 200 | 成功 |
| 400 | 参数错误 |
| 401 | 未认证 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

### 1.3 分页参数

列表接口支持分页：

```
GET /{resource}/list?pageNo=1&pageSize=20
```

分页响应：
```json
{
  "records": [...],
  "total": 100,
  "size": 20,
  "current": 1,
  "pages": 5
}
```

## 二、认证接口

### 2.1 登录

**请求**：
```
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}
```

**响应**：
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

::: tip JWT 有效期
JWT Token 有效期为 24 小时，过期后需重新登录或使用 refreshToken 接口刷新。
:::

## 三、资产管理接口

### 3.1 主域名 (Domain)

#### 列表
```
GET /asset/domain/list?pageNo=1&pageSize=20&domain=example.com
```

#### 新增
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

#### 编辑
```
PUT /asset/domain/edit
Content-Type: application/json

{
  "id": "domain_001",
  "name": "example.com",
  "status": "ACTIVE"
}
```

#### 删除
```
DELETE /asset/domain/delete?id=domain_001
```

#### 批量删除
```
DELETE /asset/domain/deleteBatch?ids=domain_001,domain_002
```

### 3.2 子域名 (Subdomain)

#### 列表
```
GET /asset/subdomain/list?pageNo=1&pageSize=20&domainId=domain_001
```

#### 新增
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

#### 列表
```
GET /asset/ip/list?pageNo=1&pageSize=20&country=CN
```

#### 新增
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

### 3.4 端口 (Port)

#### 列表
```
GET /asset/port/list?pageNo=1&pageSize=20&ipId=ip_001
```

#### 新增
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

#### 列表
```
GET /asset/web/list?pageNo=1&pageSize=20&subdomainId=sub_001
```

#### 新增
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

#### 列表
```
GET /asset/api/list?pageNo=1&pageSize=20&webId=web_001
```

### 3.7 漏洞 (Vul)

#### 列表
```
GET /asset/vul/list?pageNo=1&pageSize=20&severity=high
```

## 四、工作流接口

### 4.1 工作流列表

```
GET /workflow/list?pageNo=1&pageSize=20&projectId=proj_001
```

### 4.2 工作流详情

```
GET /workflow/queryById?id=workflow_001
```

### 4.3 创建工作流

```
POST /workflow/add
Content-Type: application/json

{
  "name": "Domain Recon",
  "description": "域名侦察工作流",
  "triggerMode": "MANUAL",
  "projectId": "proj_001",
  "configuration": "{ ... }"
}
```

### 4.4 执行工作流

```
POST /workflow/runForAsset
Content-Type: application/json

{
  "workflowId": "workflow_001",
  "assetType": "DOMAIN",
  "assetId": "domain_001"
}
```

批量执行使用：
```
POST /workflow/batchRunWorkflow
```

### 4.5 运行记录

```
GET /workflow/runs?workflowId=workflow_001&pageNo=1&pageSize=20
```

### 4.6 运行详情

```
GET /workflow/run/queryById?id=run_001
```

## 五、工具接口

### 5.1 工具列表

```
GET /tool/list?pageNo=1&pageSize=20&name=subfinder&type=recon
```

### 5.2 工具详情

```
GET /tool/queryById?id=subfinder
```

### 5.3 新增/编辑工具

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

### 5.4 导入与校验工具 YAML

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

### 5.5 删除工具

```
DELETE /tool/delete?id=tool_001
DELETE /tool/deleteBatch?ids=tool_001,tool_002
```

### 5.6 运行工具

单资产运行：
```
POST /tool/runForAsset
Content-Type: application/json

{
  "toolId": "subfinder",
  "assetType": "DOMAIN",
  "assetId": "domain_001"
}
```

批量运行：
```
POST /tool/batchRunTool
Content-Type: application/json

{
  "toolId": "httpx",
  "assetType": "SUBDOMAIN",
  "ids": ["sub_001", "sub_002"]
}
```

### 5.7 商店配置与安装

商店接口独立位于 `/registry`，用于浏览、安装和更新远程工具/工作流。

```
GET /registry/config
POST /registry/config
POST /registry/config/test
POST /registry/cache/clear
```

远程工具：
```
GET /registry/tools/remote?category=recon
GET /registry/tools/remote/{toolId}
POST /registry/tools/install/{toolId}?version=latest
POST /registry/tools/installBatch?version=latest
POST /registry/tools/update/{toolId}
DELETE /registry/tools/uninstall/{toolId}
```

远程工作流：
```
GET /registry/workflows/remote?category=recon
GET /registry/workflows/remote/{workflowId}
POST /registry/workflows/install/{workflowId}?version=latest
POST /registry/workflows/installBatch?version=latest
POST /registry/workflows/update/{workflowId}
DELETE /registry/workflows/uninstall/{workflowId}
```

已安装包和更新检查：
```
GET /registry/installed/tools
GET /registry/installed/workflows
GET /registry/check-updates
GET /registry/tools/check-updates/{toolId}
GET /registry/workflows/check-updates/{workflowId}
```

## 六、任务接口

### 6.1 任务列表

```
GET /task/list?pageNo=1&pageSize=20&taskStatus=COMPLETED
```

### 6.2 任务详情

```
GET /task/queryById?id=task_001
```

### 6.3 任务日志

```
GET /task/{id}/logs
```

### 6.4 任务结果

```
GET /task/queryById?id=task_001
```

::: tip 实时日志
任务原始输出和解析结果包含在任务详情字段中，实时执行日志通过 `/task/{id}/logs` 查询。
:::

## 七、系统管理接口

### 7.1 用户管理

#### 列表
```
GET /system/user/list?pageNo=1&pageSize=20
```

#### 新增
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

#### 编辑
```
PUT /system/user/edit
Content-Type: application/json

{
  "id": "user_001",
  "email": "newemail@example.com"
}
```

#### 删除
```
DELETE /system/user/delete?id=user_001
```

### 7.2 角色管理

#### 列表
```
GET /system/role/list?pageNo=1&pageSize=20
```

#### 新增
```
POST /system/role/add
Content-Type: application/json

{
  "name": "Asset Manager",
  "code": "ASSET_MANAGER",
  "permissionIds": ["asset:domain:view", "asset:domain:edit"]
}
```

### 7.3 权限管理

#### 列表
```
GET /system/permission/list
```

### 7.4 部门管理

#### 列表
```
GET /system/department/list
```

#### 新增
```
POST /system/department/add
Content-Type: application/json

{
  "name": "Security Team",
  "parentId": "dept_001",
  "leaderId": "user_001"
}
```

## 八、项目管理接口

### 8.1 项目列表

```
GET /project/list?pageNo=1&pageSize=20
```

### 8.2 创建项目

```
POST /project/add
Content-Type: application/json

{
  "name": "Production Assets",
  "description": "生产环境资产管理",
  "memberIds": ["user_001", "user_002"]
}
```

### 8.3 项目详情

```
GET /project/queryById?id=proj_001
```

## 九、客户端接口

### 9.1 客户端注册

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

### 9.2 客户端心跳

```
POST /client/heartbeat
Content-Type: application/json

{
  "clientId": "client_001",
  "status": "ONLINE",
  "taskCount": 5
}
```

### 9.3 任务轮询

```
GET /client/task/poll?clientId=client_001&timeout=30
```

### 9.4 任务完成上报

```
POST /client/task/{taskId}/report?clientId=client_001
Content-Type: application/json
X-Client-Token: <client-token>

{
  "exitCode": 0,
  "output": "..."
}
```

客户端确认任务开始执行：
```
POST /client/task/start?clientId=client_001&taskId=task_001
X-Client-Token: <client-token>
```

客户端分段上报日志：
```
POST /client/task/{taskId}/log?clientId=client_001
X-Client-Token: <client-token>
```

::: warning 客户端认证
客户端接口需要 `X-Client-Token` 头进行认证，该 Token 在节点注册成功后返回。Go 扫描客户端当前使用 HTTP 长轮询拉取任务，WebSocket 客户端尚未实现。
:::

## 十、MCP 接口

MCP 接口详见：[MCP 协议概述](/mcp/overview)

## 十一、WebSocket 接口

WebSocket 主要面向前端浏览器，用于站内通知和任务状态推送。

::: info 架构说明
Go 扫描客户端当前通过 HTTP 长轮询拉取任务，并通过 HTTP 接口上报日志与结果，不使用 WebSocket。
:::

### 11.1 连接

```
ws://localhost:8081/api/ws
```

### 11.2 订阅主题

**用户通知**：
```
/user/topic/notification
```

**任务状态**：
```
/topic/task/{taskId}
```

### 11.3 认证

STOMP CONNECT 帧携带 Authorization 头：

```
CONNECT
Authorization: Bearer <token>
```

## 相关文档

- [API 端点索引](/dev/api-index) — 从后端 Controller 自动生成的接口索引
- [用户手册](/guide/introduction) — 平台使用指南
- [MCP 协议概述](/mcp/overview) — MCP 集成说明
