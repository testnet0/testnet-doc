---
title: Asset Operations & Management
description: Batch import/export, batch actions and change history
---

# Asset Operations & Management

TestNet asset management supports batch import/export, batch operations, and change history auditing.

---

## 1. Batch Import & Export

### Import

At the top of any asset list, click **"Import Excel"** to download the template and upload data:
- **Required Fields**: Primary domain, subdomain, and other key fields are required;
- **Tag Format**: Multiple tags can be separated by commas `,` or semicolons `;` (e.g., `Core,High-Def CDN`);
- **Deduplication**: Existing assets are automatically merged and updated.

### Export

Click **"Export Excel"** to export the current filtered results (including search criteria, tags, and status) as an `.xlsx` file.

---

## 2. Batch Actions

When you need to modify many assets at once (e.g., adjust tags, change status, or migrate ownership), use batch operations:

### Selection Scope

- **Current Page**: Operate on checked items only;
- **Entire Result Set**: Apply to all items matching the current filter.

### Progress Tracking

After submitting a batch operation, the interface displays real-time progress including total, succeeded, and skipped counts. After batch additions, the system automatically applies [Asset Rules](/en/assets/rules) for tagging.

---

## 3. Change History

The system tracks all asset modifications — whether manual or from scanning tasks — recording a complete change log.

### Inspecting Change Logs

Click **"History"** on any asset row to open the change log drawer:
1. **Timestamp & Actor**: Records the user or task ID that made the change;
2. **Before/After Diff**: Shows field changes (e.g., `status: PENDING -> ACTIVE`);
3. **Version Rollback**: Select a target version and click **"Rollback"** to restore the asset to that state.

---

## Related Documentation

- [Asset Overview](/en/assets/overview) — Common operations and tag management
- [Asset Models](/en/assets/models) — 8 core asset types and topology relationships
- [Asset Config & Rules](/en/assets/rules) — Auto-tagging, blocklists, and vulnerability dictionaries
- [Topology Graph](/en/assets/graph) — Visual asset relationship exploration
