---
title: 与 Claude 集成
description: 与 Claude 集成
---

# 与 Claude 集成

本文介绍如何将 TestNet 配置为 Claude Code 或 Claude Desktop 的 MCP 服务器。

## 前提条件

1. TestNet 已部署并正常运行
2. 已有 TestNet 用户账号，且账号拥有 `mcp:view` 和 `mcp:execute` 权限
3. 已安装 Claude Code 或 Claude Desktop

---

## 获取 JWT Token

首先需要获取 TestNet 的 JWT Token：

```bash
curl -X POST https://your-testnet-server/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "your-username", "password": "your-password"}'
```

响应中获取 `data.token` 字段即为 JWT Token。

---

## 配置 Claude Code

在 Claude Code 的 MCP 配置文件中添加 TestNet：

### 找到配置文件位置

- **macOS**: `~/.claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

### 添加 TestNet MCP 服务器

```json
{
  "mcpServers": {
    "testnet": {
      "url": "https://your-testnet-server/mcp/v1",
      "headers": {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  }
}
```

将 `your-testnet-server` 替换为实际的服务地址，`Bearer` 后面替换为实际的 JWT Token。

### 重启 Claude

修改配置文件后，重启 Claude Code 使配置生效。

---

## 验证集成

在 Claude Code 中输入以下提示验证集成是否成功：

```
请列出 TestNet 中的所有工作流
```

如果配置正确，Claude 会调用 `testnet_list_workflows` 工具并返回工作流列表。

---

## 使用示例

### 查询资产

```
请查询 TestNet 中项目 proj_001 下的子域名列表
```

Claude 会调用：`testnet_query_assets(projectId="proj_001", assetType="sub_domain")`

### 执行工作流

```
对 example.com 执行域名侦察工作流，工作流名称是 domain-recon-pipeline
```

Claude 会调用：`testnet_run_workflow(workflowId="domain-recon-pipeline", target="example.com", assetType="DOMAIN")`

### 查询任务状态

```
查询任务 task_abc123 的执行状态和结果
```

Claude 会调用 `testnet_get_task_status(taskId="task_abc123")` 并解释结果。

---

## 安全建议

::: warning 安全注意事项

1. **JWT Token 保护**：不要将包含 Token 的配置文件提交到代码仓库
2. **Token 过期**：JWT Token 有效期为 24 小时，过期后需要重新获取
3. **最小权限**：为 AI 助手专门创建一个账号，只分配 `mcp:view` 和 `mcp:execute` 权限
4. **操作审计**：所有 MCP 调用都会记录在 TestNet 的审计日志中
:::

---

## 常见问题

### Claude 提示"工具未找到"

- 检查 TestNet 服务地址是否正确
- 确认 JWT Token 未过期
- 检查用户账号是否有 `mcp:view` 权限

### 执行工作流返回错误

- 确认账号有 `mcp:execute` 权限
- 确认工作流 ID 正确（可通过 `testnet_list_workflows` 查看）
- 确认输入资产 ID 存在
