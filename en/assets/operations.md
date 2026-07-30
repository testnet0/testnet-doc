# Asset Operations & Management Practices

TestNet's asset management module provides high-efficiency operational tools designed for massive asset inventories, including **Batch Import/Export (Excel/CSV)**, **Multi-scope Batch Actions & Tagging**, and **Full Lifecycle Audit Tracking (History AOP)**.

---

## 1. Batch Import & Export

TestNet provides a high-performance streaming import/export feature that efficiently handles massive asset records with minimal memory consumption.

### Import Workflow & Templates
At the top right of any asset list, click **"Import Excel"** to download the template and upload CSV/XLSX data:
- **Required Fields**: Entity identifiers such as Primary Domain (`domainName`) or Subdomain (`subdomain`) must be populated;
- **Smart Tag Parsing**: Multiple tags can be separated by commas `,` or semicolons `;` (e.g., `Core,High-Def CDN`), which the server automatically parses into JSON arrays;
- **Deduplication & Merge**: If an asset key (e.g., IP:Port pair or Domain) already exists within the current `projectId`, the system automatically updates and merges the metadata.

### Filtered Export
Clicking **"Export Excel"** exports the exact subset matching your active search terms, tag filters, and status criteria into an `.xlsx` file for offline auditing and compliance reviews.

---

## 2. Batch Actions & Progress Tracking

When modifying hundreds or thousands of assets simultaneously (e.g., adjusting tags, changing states, or migrating project ownership), use the **Batch Actions Toolbar (BatchActions)**:

### Selection Scopes
Using the table checkboxes, administrators can target:
- **Current Page**: Modify only the currently visible items;
- **Entire Query Result**: Apply changes to all items matching the active query (e.g., all 5,000 assets carrying a specific tag across all pages).

### Real-Time Progress Monitoring
Upon submitting batch tagging or ownership migrations, a **Batch Progress Modal (BatchActionModal)** appears. The system processes the batch asynchronously while updating progress in real time:
- **Metrics Display**: Tracks `Total / Succeeded / Skipped` items in real time;
- **Rule Triggering**: After batch creation, background tasks automatically re-evaluate [Asset Rules](/en/assets/rules) to apply automated tags.

---

## 3. Change History & Audit Trail

Every modification to an asset is tracked. Whether updated manually via the console or reported by a scanning node, the system automatically records the event log, creating a complete audit trail.

### Inspecting Change Logs (AssetHistoryDrawer)
Clicking the **"History"** action on any asset table row slides out a detailed audit drawer:
1. **Timestamp & Actor**: Records the user ID or the specific Task ID (`Task #XXXX`) responsible for the change;
2. **Field Snapshot Diff**: Shows fine-grained before/after values (e.g., `status: PENDING -> ACTIVE`, or `tags: ["discovered"] -> ["discovered", "confirmed"]`);
3. **Version Rollback**: When an accidental change overwrites important asset attributes, operators can select a target version in the history and click **"Rollback"** to restore the asset to that historical snapshot (tags, ownership, status, etc.).
