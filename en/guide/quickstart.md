---
title: Quick Start
description: Quick Start
---

# Quick Start

This guide helps you log in and start using the TestNet platform in 5 minutes.

## Step 1: Log In to the System

Access the TestNet URL (default `https://your-server:3100`) and log in with the credentials provided by the administrator.

::: info Default Credentials
- **Username**: `admin`
- **Password**: Automatically generated during deployment (check deployment logs or `ADMIN_INIT_PASSWORD` in `.env`).

After Docker deployment, you can reset the password to `Admin@123456` using `./testnet.sh reset-password`.
:::

### Change Initial Password

1. Click on the user profile icon in the top right corner.
2. Select **Profile Settings**.
3. Switch to the **Security** tab.
4. Fill in your current password and new password.
5. Click **Save**.

---

### Main Modules

| Group | Module | Description |
|------|------|------|
| **Overview (CORE)** | **Dashboard** | Asset statistics, recent task status, and system metrics. |
| | **Projects** | Multi-project management. |
| **Assets (ASSETS)** | **Asset Management & Graph** | Lifecycle management, topology visualization, and filtering across 8 core asset models. |
| | **Asset Config** | Configure tags, auto-tagging, ownership mappings, access rules, notifications, and custom fields. |
| **Security (SECURITY)** | **Cyberspace Search** | Search and configuration for engines like FOFA, Shodan, Hunter, etc. |
| | **Automation** | Workflow design and execution, tool library management, config distribution, and task auditing. |
| | **Scan Nodes** | Client node registration, online status, and health management. |
| **System (SYSTEM)** | **Message Center** | System notifications, alert rules, and notification history. |
| | **System Admin** | User, role, department, menu permissions, and RSA license management. |

---

## Create Your First Project

A project serves as the logical scope for isolating assets and workflows:

1. Click **Project Management** on the left menu.
2. Click **New Project**.
3. Fill in the project name and description.
4. Click **Save**.

Once created, use the **Project Switcher** in the top navigation bar to select the active project context.

---

## Add Your First Asset

### Add Manually

1. Click **Asset Management** → **Domain** on the left sidebar.
2. Click the **Add** button.
3. Enter the domain (e.g., `example.com`).
4. Click **OK** to save.

### Import in Bulk

1. Click the **Import** button.
2. Download the Excel template.
3. Fill in the domains according to the template.
4. Upload the file to complete the import.

---

## Install Tools and Run Scans

### Install a Tool from the Store

1. Go to **Tool Management** → **Tool List**.
2. Click the **Store** button.
3. Find the tool you need (e.g., `Subfinder`).
4. Click **Install**.

### Install a Pre-configured Workflow

1. Go to **Workflows** → **Workflow List**.
2. Click the **Store** button.
3. Find the workflow you need.
4. Click **Install**.

## View Scan Results

1. Click **Task Management** to monitor running tasks.
2. Once complete, click **Logs** to view execution details.
3. Click **Results** to view discovered subdomains, ports, or web assets.

---

## Next Steps

::: tip 🎉 Congratulations!
You have completed the basic workflow. Now you can explore:
:::

- [Asset Graph Models](/en/assets/models) — Core entity definitions and automatic cascading resolution.
- [Common Asset Operations](/en/assets/overview) — Filtering, batch actions, and Excel import/export.
- [Workflow Automation](/en/workflow/overview) — Orchestrate complex automated scanning workflows.
- [Distributed Nodes & Security](/en/client/overview) — Probe pool governance and sandbox policies.
- [Cyberspace Search Integration](/en/search/overview) — Configure credentials for FOFA, Shodan, Hunter, etc.
