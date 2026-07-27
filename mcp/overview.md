---
title: MCP 集成概述
description: MCP 集成概述
---

# MCP 集成概述

TestNet 实现了 **MCP（Model Context Protocol）** 协议，允许 Claude Code、Cursor、Codex 等 AI 助手直接调用 TestNet 平台的能力。

## MCP 是什么？

MCP 是 Anthropic 发布的开放标准协议，用于 AI 助手与外部系统的集成。通过 MCP，AI 助手可以：

- **调用工具（Tools）**：执行资产查询、工作流执行等操作
- **访问资源（Resources）**：读取项目列表、工作流列表等数据
- **使用提示词（Prompts）**：使用预定义的 Prompt 模板

---

## TestNet 提供的 MCP 能力

### 8 个 MCP 工具

| 工具名称 | 功能 |
|---------|------|
| `testnet_query_assets` | 查询资产列表 |
| `testnet_get_asset_detail` | 获取资产详情 |
| `testnet_run_workflow` | 执行工作流 |
| `testnet_list_workflows` | 列出可用工作流 |
| `testnet_list_tools` | 列出可用工具 |
| `testnet_run_tool` | 执行单个工具 |
| `testnet_get_task_status` | 查询任务状态 |
| `testnet_list_projects` | 列出所有项目 |

### 3 个 MCP 资源

| 资源 URI | 内容 |
|---------|------|
| `testnet://projects` | 项目列表 |
| `testnet://workflows` | 工作流列表 |
| `testnet://tools` | 工具列表 |

### 5 个 MCP 提示词模板

| 提示词名称 | 功能 |
|-----------|------|
| `asset_inventory_summary` | 资产盘点摘要 |
| `workflow_selector` | 工作流推荐选择器 |
| `vul_triage` | 漏洞分级与处置建议 |
| `recon_plan` | 资产侦察计划生成 |
| `mock_test_guide` | Mock 测试编写指导 |

> 详见 [MCP 提示词模板](/mcp/prompts)。

---

## 使用场景示例

**场景 1：AI 助手辅助资产盘点**

```
用户: 帮我查询项目 proj_001 下的子域名

Claude: 我来调用 TestNet 查询...
[调用 testnet_query_assets(projectId="proj_001", assetType="sub_domain")]

找到 15 个子域名：
- api.example.com
- www.example.com
...
```

**场景 2：AI 助手触发安全扫描**

```
用户: 对 example.com 执行域名侦察工作流

Claude: 好的，我来执行工作流...
[调用 testnet_run_workflow(workflowId="domain-recon-pipeline", target="example.com", assetType="DOMAIN")]

工作流已启动
```

---

## MCP 端点

TestNet MCP 服务端点：

| 端点 | 方法 | 说明 |
|------|------|------|
| `/mcp/v1/tools` | GET | 获取工具定义列表 |
| `/mcp/v1/tools/call` | POST | 调用工具 |
| `/mcp/v1/resources` | GET | 获取资源列表 |
| `/mcp/v1/resources/read` | GET | 读取资源内容 |
| `/mcp/v1/prompts` | GET | 获取提示词列表 |
| `/mcp/v1/prompts/get` | POST | 获取提示词渲染内容 |

---

## 相关文档

- [MCP 工具参考](/mcp/tools) — 每个工具的参数和示例
- [MCP 资源](/mcp/resources) — 资源 URI 和内容说明
- [MCP 提示词模板](/mcp/prompts) — 提示词模板参数和示例
- [与 Claude 集成](/mcp/claude) — 配置 Claude Code 使用 TestNet MCP
- [与 Cursor 集成](/mcp/cursor) — 配置 Cursor 使用 TestNet MCP
