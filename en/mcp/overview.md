---
title: MCP Integration Overview
description: MCP Integration Overview
---

# MCP Integration Overview

TestNet implements the **MCP (Model Context Protocol)** standard, allowing AI assistants like Claude Code, Cursor, Codex, etc. to directly invoke TestNet platform capabilities.

## What is MCP?

MCP is an open standard protocol published by Anthropic for integrating AI assistants with external systems. Through MCP, AI assistants can:

- **Call Tools**: Execute asset queries, workflow execution, and other operations
- **Access Resources**: Read project lists, workflow lists, and other data
- **Use Prompts**: Use predefined Prompt templates

---

## MCP Capabilities Provided by TestNet

### 8 MCP Tools

| Tool Name | Function |
|-----------|----------|
| `testnet_query_assets` | Query asset list |
| `testnet_get_asset_detail` | Get asset details |
| `testnet_run_workflow` | Execute a workflow |
| `testnet_list_workflows` | List available workflows |
| `testnet_list_tools` | List available tools |
| `testnet_run_tool` | Execute a single tool |
| `testnet_get_task_status` | Query task status |
| `testnet_list_projects` | List all projects |

### 3 MCP Resources

| Resource URI | Content |
|-------------|---------|
| `testnet://projects` | Project list |
| `testnet://workflows` | Workflow list |
| `testnet://tools` | Tool list |

### 5 MCP Prompt Templates

| Prompt Name | Function |
|-------------|----------|
| `asset_inventory_summary` | Asset inventory summary |
| `workflow_selector` | Workflow recommendation selector |
| `vul_triage` | Vulnerability triage & remediation |
| `recon_plan` | Asset reconnaissance plan generation |
| `mock_test_guide` | Mock test authoring guide |

> See [MCP Prompt Templates](/en/mcp/prompts) for details.

---

## Usage Scenario Examples

**Scenario 1: AI Assistant Helps with Asset Inventory**

```
User: Help me query subdomains under project proj_001

Claude: I'll call TestNet to query...
[Calling testnet_query_assets(projectId="proj_001", assetType="sub_domain")]

Found 15 subdomains:
- api.example.com
- www.example.com
...
```

**Scenario 2: AI Assistant Triggers Security Scan**

```
User: Execute the domain recon workflow on example.com

Claude: OK, I'll execute the workflow...
[Calling testnet_run_workflow(workflowId="domain-recon-pipeline", target="example.com", assetType="DOMAIN")]

Workflow started
```

---

## MCP Endpoints

TestNet MCP service endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/mcp/v1/tools` | GET | Get tool definition list |
| `/mcp/v1/tools/call` | POST | Call a tool |
| `/mcp/v1/resources` | GET | Get resource list |
| `/mcp/v1/resources/read` | GET | Read resource content |
| `/mcp/v1/prompts` | GET | Get prompt list |
| `/mcp/v1/prompts/get` | POST | Get rendered prompt content |

---

## Related Documentation

- [MCP Tool Reference](/en/mcp/tools) — Parameters and examples for each tool
- [MCP Resources](/en/mcp/resources) — Resource URIs and content descriptions
- [MCP Prompt Templates](/en/mcp/prompts) — Prompt template parameters and examples
- [Integration with Claude](/en/mcp/claude) — Configure Claude Code to use TestNet MCP
- [Integration with Cursor](/en/mcp/cursor) — Configure Cursor to use TestNet MCP