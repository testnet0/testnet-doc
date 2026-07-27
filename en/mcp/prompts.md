---
title: MCP Prompt Templates
description: Reference for MCP Prompt Templates provided by the TestNet platform
---

# MCP Prompt Templates

TestNet provides 5 built-in MCP prompt templates. AI clients (such as Claude Code, Cursor) can obtain context guidance and recommended configurations for specific tasks via these prompt templates.

The API endpoints for prompts are defined as follows:
- List prompts: `GET /mcp/v1/prompts`
- Get rendered prompt content: `POST /mcp/v1/prompts/get`

**Get rendered prompt content** request body example:
```json
{
  "name": "asset_inventory_summary",
  "arguments": {
    "projectId": "proj_001"
  }
}
```

The response returns the rendered prompt text (`messages[0].content.text`), which can be used directly as context input for AI conversations.

---

## 1. asset_inventory_summary

**Description**: Generates a prompt for summarizing the asset inventory based on a project ID. It guides the AI to analyze the overall status of domains, subdomains, IPs, ports, Web services, APIs, and vulnerabilities under the project and generates a structured visualization report.

**Parameters**:

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `projectId` | string | ✅ | Project ID |

**Example**:
```json
{
  "name": "asset_inventory_summary",
  "arguments": {
    "projectId": "proj_001"
  }
}
```

---

## 2. workflow_selector

**Description**: Recommends the most suitable scanning workflows based on the target (domain or IP range) and intent, producing suggestions and parameter configurations.

**Parameters**:

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `goal` | string | ✅ | Scanning goal or intent, e.g., "Full asset discovery for example.com" |
| `projectId` | string | | Project ID (optional) |

**Example**:
```json
{
  "name": "workflow_selector",
  "arguments": {
    "goal": "Get subdomains of example.com and scan for common web vulnerabilities",
    "projectId": "proj_001"
  }
}
```

---

## 3. vul_triage

**Description**: Provides vulnerability triage prompts to help the AI perform severity classification and mitigation suggestion generation for vulnerabilities found under a project.

**Parameters**:

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `projectId` | string | ✅ | Project ID |

**Example**:
```json
{
  "name": "vul_triage",
  "arguments": {
    "projectId": "proj_001"
  }
}
```

---

## 4. recon_plan

**Description**: Generates an information-gathering and asset-reconnaissance plan based on a target (domain or IP), outlining recommended steps for subdomain discovery, port scanning, Web probing, fingerprinting, etc.

**Parameters**:

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `target` | string | ✅ | Recon target, e.g., domain or IP |
| `projectId` | string | | Project ID (optional) |

**Example**:
```json
{
  "name": "recon_plan",
  "arguments": {
    "target": "example.com"
  }
}
```

---

## 5. mock_test_guide

**Description**: Generates prompts to guide developers/security engineers in writing mock data or verify configurations for a specific tool, providing YAML templates and assertions guides.

**Parameters**:

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `toolId` | string | ✅ | Tool ID |

**Example**:
```json
{
  "name": "mock_test_guide",
  "arguments": {
    "toolId": "subfinder"
  }
}
```
