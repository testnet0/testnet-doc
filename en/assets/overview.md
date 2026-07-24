---
title: Asset Management Overview
description: Asset Management Overview
---

# Asset Management Overview

Asset management is TestNet's core module, supporting systematic entry, discovery, classification, and management of enterprise network assets.

## Asset System & Graph Architecture

TestNet's asset repository is built upon **8 core asset models**. By dynamically linking hierarchical relationships across "Company -> Domain -> Subdomain -> IP -> Port -> Web -> API/Vulnerability", the platform automatically generates a comprehensive topology map of your network footprint.

> [!TIP] 📐 Detailed Asset Models & Linkage Rules
> For exact entity field definitions, unique fingerprint identifiers, and automated cascading resolution rules, please see our dedicated guide: **[Asset Graph Models](/en/assets/models)**.

---

## Common Operations

All asset types support the following operations:

### List Operations

| Operation | Description |
|------|------|
| **Search** | Keyword fuzzy search |
| **Advanced Filter** | Multi-condition composite filter (tags, status, time, etc.) |
| **Sort** | Click column headers to sort |
| **Pagination** | Adjust items per page (10/20/50/100) |
| **Export** | Export to Excel file |
| **Import** | Batch import from Excel |
| **Add** | Manually add a single record |

### Batch Operations

Select multiple records to execute:

| Operation | Description |
|------|------|
| **Batch Delete** | Delete selected assets |
| **Batch Tag** | Add/remove tags for selected assets |
| **Batch Assign** | Assign assets to a specified project |
| **Batch Execute** | Execute a workflow on selected assets |

### Single Record Operations

| Operation | Description |
|------|------|
| **Edit** | Modify asset fields |
| **Delete** | Delete a single asset |
| **View Details** | View complete fields and associated assets |
| **Change History** | View the asset's historical modification records |

---

## Asset Rules

The asset rule engine executes automatically when assets are saved, supporting the following rule types:

### Validation Rules (BLOCK)

Reject assets that do not meet conditions:

**Example**: Only allow public IP entries
```
Condition: asset.isPublic == false
Action: BLOCK (reject save)
```

### Tag Rules (TAG)

Automatically add tags to assets:

**Example**: Subdomains containing `api` are automatically tagged
```
Condition: subdomain contains "api"
Action: Add tag "API Asset"
```

### Ownership Rules (OWNER)

Automatically assign asset owners:

**Example**: Finance subdomains assigned to the security team
```
Condition: domain endsWith ".finance.example.com"
Action: Assign owner "security-team"
```

---

## Asset Tags

Tags are a flexible classification method that can be used for filtering and batch operations.

### Adding Tags

- **Manual addition**: Click "**+ Tag**" in asset details
- **Batch addition**: Select multiple records and execute "**Batch Tag**"
- **Auto-tagging**: Configure asset tag rules for automatic matching

### Using Tags to Filter

Select tags from the tag filter dropdown at the top of the list page to quickly filter assets.

---

## Import & Export

### Excel Import

1. Click "**Import**" → "**Download Template**"
2. Fill in data according to the template format (required fields marked with *)
3. Upload the Excel file
4. View import preview and result statistics

**Import Result Descriptions**:

| Status | Description |
|------|------|
| ✅ Saved | Successfully created new asset |
| ⏭️ Skipped | Asset already exists (deduplicated) |
| 🚫 Blocked | Rejected by asset rules |

### Excel Export

Click the "**Export**" button to export the current filtered results as an Excel file (up to 10,000 records).

---

## Change History

Every add, edit, or delete operation on assets is automatically recorded in the change history:

1. Open asset details
2. Click the "**Change History**" drawer
3. View operation time, operator, and change content

---

## Related Documentation

- [8 Core Asset Models](/en/assets/models) — Complete definitions of Company, Domain, IP, Port, Web, API, and Vulnerabilities
- [Batch Operations & Audit Trail](/en/assets/operations) — Excel import/export, batch actions, and history log
- [Asset Tagging & Smart Rules](/en/assets/rules)
