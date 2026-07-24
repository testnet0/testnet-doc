---
title: Interface Overview
description: Interface Overview
---

# Interface Overview

This page describes the main interface regions and core interactions of TestNet to help you quickly familiarize yourself with the operating environment.

## General Layout

TestNet uses a classic administrative dashboard layout:

- **Top Navigation Bar**: Project switcher, notifications, and user information.
- **Left Sidebar**: Navigation menus for key functional modules.
- **Main Content Area**: Active module display and operational controls.

## Top Navigation Bar

### Project Switcher

Located on the top left, it displays the name of the active project. Click it to switch to another project.

::: tip
Switching projects automatically filters the asset lists, workflows, and task logs to only display data belonging to the selected project.
:::

### Notification Bell 🔔

Displays the count of unread notifications. Click it to view:
- Task completion notifications.
- Workflow execution updates.
- System warning alerts.

### User Menu 👤

Click the profile avatar in the top right corner to access:
- **Profile Settings**: Edit personal info and change your password.
- **Log Out**

## Dashboard (Home Console)

After logging in, you will land on the Dashboard (Home Console), which provides real-time visibility into your total asset footprint, recent task execution metrics, and live probe heartbeats.

> [!TIP] 💡 Detailed Dashboard Guide
> For detailed explanations of the 8 asset metric cards, task status breakdowns, and active node stats, please see our dedicated guide: **[Dashboard Console](/en/guide/dashboard)**.

## Common List Page Actions

All asset tables and lists share a unified operational structure:

### Search & Filter

```
[Search Input]  [Advanced Filters▼]  [Status Selector▼]  [Tag Selector▼]
```

- **Keyword Search**: Type keywords in the search bar to filter instantly.
- **Advanced Filters**: Expand a multi-criteria query builder for precise filtering.
- **Status Selector**: Filter assets by their operational state.
- **Tag Selector**: Filter assets by assigned business tags.

### Action Buttons

```
[Store]  [Import]  [Export]  [Add New]
```

| Button | Description |
|--------|-------------|
| **Store** | Open the Tool/Workflow Store (only on Tool/Workflow pages). |
| **Import** | Import assets in bulk from an Excel file. |
| **Export** | Export the current list data to an Excel spreadsheet. |
| **Add New** | Manually create a new record. |

### Table Interactions

| Interaction | Description |
|-------------|-------------|
| Checkbox | Select records to perform batch operations. |
| Click Column Header | Sort the list by the selected column (click again to toggle asc/desc). |
| Action Column Icons | Edit, delete, or view detailed records. |
| Pagination Controls | Adjust the number of records per page and navigate through pages. |

### Batch Operations

Selecting one or more checkboxes displays the batch actions bar at the top of the table:

```
Selected 3 items  [Select Page]  [Select All Query Results]  |  [Batch Delete]  [Batch Tag]  [Assign Project]
```

::: warning Caution
"Select All Query Results" will select **all** matching records across all pages that satisfy the active filters, not just the visible items on the current page. Confirm before performing destructive batch operations.
:::

## Details Panels

Clicking an asset opens a drawer or navigates to a details page, which typically contains:

- **Basic Information**: Structured key-value details of the asset.
- **Related Assets**: Discovered relationships (e.g., ports under an IP, subdomain mapping).
- **Change History**: Audit logs showing changes and who made them.
- **Tags**: Manage the tags associated with the asset.

## Hotkeys

| Key | Function |
|-----|----------|
| `/` or `Ctrl+K` | Focus the primary search input |
| `Esc` | Close the active modal, drawer, or dialog |

## Theme Switcher

Click the 🌙/☀️ icon in the top right corner to toggle between Dark Mode and Light Mode.
