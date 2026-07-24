---
title: Project Management
description: Project management overview and multi-project logical data isolation
---

# Project Management

A project is the **logical data and asset isolation unit** in TestNet. Through projects, you can manage assets and scanning tasks from different business lines, geographical regions, or clients separately, ensuring clear data boundaries.

---

## Concepts

### What Is a Project?

- **Independent Asset Space**: Each project has its own dedicated asset repository; data in different projects is isolated and does not interfere.
- **Task Context Consolidation**: Workflow executions and tool scanning run histories are bound to a project context, making statistical analysis simple.
- **Department Attribute Attribution**: Projects support configuring the **Belonging Department** attribute, integrating with the system's department data permission boundaries.

---

## Create & Edit Projects

1. Click **"Project Management"** in the left menu.
2. Click the **"New"** button to configure project fields in the modal:
   - **Project Name** (required): e.g., "Client A Assets", "Beijing R&D Center".
   - **Belonging Department**: Choose the organizational department the project belongs to, aligning with system-level organizational permission isolation.
   - **Priority**: Set project priority (P1 to P5, with P1 being the highest).
   - **Project Address**: The physical or logical address of the project.
   - **Contact Information**: Supports filling in email, WeChat Official Account, and Weibo link details.
   - **Comments**: Additional notes or project background.
3. Click **"Confirm"** to save.

---

## Switch Projects

Use the **project switcher** (the dropdown displaying the current project name) in the top navigation bar to quickly switch your active project context.

After switching:
- All asset lists under Asset Management (Company, Domain, Port, Vul, etc.) automatically filter to show data belonging only to the selected project.
- Manually created or imported assets are automatically associated with the active project.
- Initiated scanning workflows or tool tasks automatically run under the active project context.

---

## Project & Asset Relationship

When viewing assets under a specific project, only assets belonging to that project are displayed:

```
Project A                Project B
├── domain-a.com        ├── domain-b.com
├── sub.domain-a.com    └── 192.168.1.0/24
└── 10.0.0.1
```

Even if the same asset (such as the same IP address) exists in multiple projects, they are treated as separate, isolated records.

---

## Project Workbench

In the **"Project Management"** list, click a project's **Project Name** link to open its **Project Workbench**. The workbench provides a multi-dimensional dashboard for a single project:
- **Statistics**: Inventory and vulnerability distribution charts across all asset types.
- **Recent Activities**: Recent workflow runs and task logs executed under this project.
- **Trend Analysis**: Timeline charts showing growth trends of assets and vulnerabilities.

---

## Delete Projects

::: danger Warning
Deleting a project will permanently delete all associated assets, task logs, and workflow histories. This operation is **irreversible**.
:::

1. Go to the **"Project Management"** page.
2. Locate the project to delete and click **"Delete"** in the operations column.
3. Confirm in the dialog to execute the deletion.
