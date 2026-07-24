---
title: Integration with Cursor
description: Integration with Cursor
---

# Integration with Cursor

This guide explains how to configure TestNet as an MCP server for Cursor (IDE), enabling Cursor's built-in AI to directly query assets and invoke scan tasks.

## Prerequisites

1. TestNet is deployed and running normally
2. You have a TestNet user account with `mcp:view` and `mcp:execute` permissions
3. Cursor is installed

---

## Get a JWT Token

First, obtain a TestNet JWT Token (valid for 24 hours):

```bash
curl -X POST https://your-testnet-server/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "your-username", "password": "your-password"}'
```

Extract the `data.token` field from the JSON response.

---

## Configure MCP in Cursor

TestNet MCP is based on REST API endpoints (`/mcp/v1/tools`, `/mcp/v1/tools/call`, etc.). Cursor v0.45+ supports MCP servers using HTTP transport:

1. Open Cursor and go to Settings:
   - Shortcut: `Ctrl + ,` (Windows/Linux) or `Cmd + ,` (macOS)
2. In the left menu, select **Features** → scroll down to the **MCP** section.
3. Click **+ Add New MCP Server**.
4. Fill in the configuration:

| Field | Value | Description |
|-------|-------|-------------|
| **Name** | `testnet` | Custom server name |
| **Type** | `url` | Protocol type: `url` |
| **URL** | `https://your-testnet-server/mcp/v1` | Your TestNet MCP endpoint |

5. Add a custom authentication header:
   Click **Headers** or **Edit Headers** to add JWT auth:
   - Key: `Authorization`
   - Value: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (replace with your actual token)

6. Click **Save**.

> [!TIP]
> Cursor's HTTP MCP support varies by version. If you encounter connection issues, we recommend using [Claude Code](/en/mcp/claude) as the primary MCP client for the best compatibility.

---

## Using TestNet in Cursor Chat

Once configured, you can control TestNet directly from Cursor's Chat or Composer panel using natural language:

### Example 1: Inventory Web Assets for a Domain
```
User: @testnet query all Web assets under project proj_01 with domain "example.com"
```

### Example 2: Trigger a Security Scan
```
User: Run the "domain-recon-pipeline" workflow in project proj_01 with input asset "example.com"
```

### Example 3: Check Port Vulnerabilities
```
User: Query the open ports for IP "192.168.1.1" and check if Nuclei detected any critical vulnerabilities
```
