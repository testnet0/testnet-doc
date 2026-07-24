---
title: MCP 提示词模板
description: TestNet 平台提供的 MCP 提示词模板 (Prompt Templates) 参考
---

# MCP 提示词模板 (Prompt Templates)

TestNet 提供了 5 个内置的 MCP 提示词模板。AI 客户端（如 Claude Code、Cursor）在调用时可以通过提示词模板获取特定任务的上下文指导与推荐配置。

所有提示词相关的接口定义如下：
- 获取提示词列表：`GET /mcp/v1/prompts`
- 获取提示词详情/使用提示词：可以使用标准 MCP 协议方式调用

---

## 1. asset_inventory_summary (资产盘点摘要)

**说明**：根据指定的项目 ID，生成资产盘点摘要的提示词。指导 AI 汇总分析该项目下域名、子域名、IP、端口、Web、API、漏洞等资产的总体概况，并生成可视化结构报告。

**参数**：

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `projectId` | string | ✅ | 项目 ID |

**使用示例**：
```json
{
  "name": "asset_inventory_summary",
  "arguments": {
    "projectId": "proj_001"
  }
}
```

---

## 2. workflow_selector (工作流推荐选择器)

**说明**：根据用户输入的采集目标（目标域名、IP 段）以及扫描意图，向 AI 助手推荐最合适的扫描工作流，并产出对应的工作流选择建议与参数配置说明。

**参数**：

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `goal` | string | ✅ | 采集目标或意图，例如：对 `example.com` 做完整资产发现 |
| `projectId` | string | | 项目 ID（可选） |

**使用示例**：
```json
{
  "name": "workflow_selector",
  "arguments": {
    "goal": "获取 example.com 的子域名并扫描常见 Web 漏洞",
    "projectId": "proj_001"
  }
}
```

---

## 3. vul_triage (漏洞分级与处置建议)

**说明**：针对指定项目下发现的漏洞资产，向 AI 助手提供漏洞分级和应急处置建议生成的提示词模板，辅助安全分析人员进行漏洞研判（Triage）。

**参数**：

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `projectId` | string | ✅ | 项目 ID |

**使用示例**：
```json
{
  "name": "vul_triage",
  "arguments": {
    "projectId": "proj_001"
  }
}
```

---

## 4. recon_plan (资产侦察计划生成)

**说明**：根据指定的侦察目标（域名或 IP），生成对应的资产信息收集与侦察步骤建议，包含推荐执行的子域名发现、端口扫描、Web 探测、指纹识别等工作流路径。

**参数**：

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `target` | string | ✅ | 侦察目标，例如域名或 IP |
| `projectId` | string | | 项目 ID（可选） |

**使用示例**：
```json
{
  "name": "recon_plan",
  "arguments": {
    "target": "example.com"
  }
}
```

---

## 5. mock_test_guide (Mock 测试编写指导)

**说明**：为指导开发人员/安全人员为某个特定的扫描工具编写 Mock 模拟数据或 Verify 验证配置生成提示词，提供对应的 YAML 格式模板与断言指南。

**参数**：

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `toolId` | string | ✅ | 工具 ID |

**使用示例**：
```json
{
  "name": "mock_test_guide",
  "arguments": {
    "toolId": "subfinder"
  }
}
```
