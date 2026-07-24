---
title: 与 Cursor 集成
description: 与 Cursor 集成
---

# 与 Cursor 集成

本文介绍如何将 TestNet 配置为 Cursor (IDE) 的 MCP 服务器，使 Cursor 内置的 AI 能够直接查询资产和调用扫描任务。

## 前提条件

1. TestNet 已部署并正常运行
2. 已有 TestNet 用户账号，且账号拥有 `mcp:view` 和 `mcp:execute` 权限
3. 已安装 Cursor

---

## 获取 JWT Token

首先需要获取 TestNet 的 JWT Token（有效期为 24 小时）：

```bash
curl -X POST https://your-testnet-server/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "your-username", "password": "your-password"}'
```

从响应 JSON 结果中提取 `data.token` 字段。

---

## 在 Cursor 中配置 MCP

TestNet MCP 服务基于 REST API（`/mcp/v1/tools`、`/mcp/v1/tools/call` 等端点）。Cursor 从 v0.45 起支持 HTTP 传输模式的 MCP 服务：

1. 打开 Cursor，进入设置：
   - 快捷键：`Ctrl + ,` (Windows/Linux) 或 `Cmd + ,` (macOS)
2. 在左侧菜单中选择「**Features**」➔ 下拉找到「**MCP**」设置区。
3. 点击「**+ Add New MCP Server**」按钮。
4. 填写配置项：

| 字段 | 值 | 说明 |
|------|----|------|
| **Name** | `testnet` | 自定义服务名称 |
| **Type** | `url` | 选择 `url` 协议类型 |
| **URL** | `https://your-testnet-server/mcp/v1` | TestNet 服务端 MCP 端点 |

5. 添加自定义 Headers 鉴权（如支持）：
   点击「**Headers**」或「**Edit Headers**」添加 JWT 认证：
   - Key: `Authorization`
   - Value: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (替换为您的实际 Token)

6. 点击「**Save**」保存。

> [!TIP]
> Cursor 对 HTTP 传输模式的 MCP 支持可能因版本而异。如果遇到连接问题，建议优先使用 [Claude Code](/mcp/claude) 作为 MCP 客户端，其兼容性最佳。

---

## 在 Cursor Chat 中使用

配置完成后，您可以在 Cursor 右侧聊天框 (Chat) 或 Composer 中通过自然语言直接操控 TestNet：

### 示例 1：盘点某域名的 Web 资产
```
用户：@testnet 查询项目 proj_01 下 domain 为 "example.com" 的所有 Web 资产
```

### 示例 2：触发安全扫描任务
```
用户：帮我执行项目 proj_01 的 "domain-recon-pipeline" 工作流，输入资产为 "example.com"
```

### 示例 3：检查端口漏洞
```
用户：查询 IP "192.168.1.1" 的端口开放情况，并确认 Nuclei 是否扫出了严重漏洞
```