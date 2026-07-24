---
title: Integration with Claude
description: Integration with Claude
---

# Integration with Claude

This guide explains how to configure TestNet as an MCP server for Claude Code or Claude Desktop.

## Prerequisites

1. TestNet is deployed and running properly
2. You have a TestNet user account with `mcp:view` and `mcp:execute` permissions
3. Claude Code or Claude Desktop is installed

---

## Obtaining JWT Token

First, obtain a TestNet JWT Token:

```bash
curl -X POST https://your-testnet-server/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "your-username", "password": "your-password"}'
```

Get the `data.token` field from the response as the JWT Token.

---

## Configuring Claude Code

Add TestNet to Claude Code's MCP configuration file:

### Find Configuration File Location

- **macOS**: `~/.claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

### Add TestNet MCP Server

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

Replace `your-testnet-server` with the actual server address, and replace the `Bearer` value with the actual JWT Token.

### Restart Claude

After modifying the configuration file, restart Claude Code for the configuration to take effect.

---

## Verifying Integration

Enter the following prompt in Claude Code to verify the integration is successful:

```
List all workflows in TestNet
```

If the configuration is correct, Claude will call the `testnet_list_workflows` tool and return the workflow list.

---

## Usage Examples

### Querying Assets

```
Query the subdomains under project proj_001 in TestNet
```

Claude will call: `testnet_query_assets(projectId="proj_001", assetType="sub_domain")`

### Executing a Workflow

```
Execute the domain recon workflow on example.com, workflow name is domain-recon-pipeline
```

Claude will call: `testnet_run_workflow(workflowId="domain-recon-pipeline", target="example.com", assetType="DOMAIN")`

### Querying Task Status

```
Query the execution status and results of task task_abc123
```

Claude will call `testnet_get_task_status(taskId="task_abc123")` and explain the results.

---

## Security Recommendations

::: warning Security Notes

1. **JWT Token Protection**: Do not commit configuration files containing Tokens to code repositories
2. **Token Expiration**: JWT Tokens are valid for 24 hours; you need to obtain a new one after expiration
3. **Least Privilege**: Create a dedicated account for the AI assistant with only `mcp:view` and `mcp:execute` permissions
4. **Operation Auditing**: All MCP calls are recorded in TestNet's audit logs
:::

---

## Common Issues

### Claude Shows "Tool Not Found"

- Check if the TestNet server address is correct
- Confirm the JWT Token has not expired
- Check if the user account has `mcp:view` permission

### Workflow Execution Returns Error

- Confirm the account has `mcp:execute` permission
- Confirm the workflow ID is correct (view via `testnet_list_workflows`)
- Confirm the input asset ID exists