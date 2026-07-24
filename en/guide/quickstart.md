---
title: Quick Start
description: Quick Start
---

# Quick Start

This guide helps you log in and start using the TestNet platform in 5 minutes.

## Step 1: Log In to the System

Access the TestNet URL (default `https://your-server:3100`) and log in with the credentials provided by the administrator.

::: info [Image Placeholder: Login Page]
:::

::: info Default Credentials
- **Username**: `admin`
- **Password**: Automatically generated during deployment (check the deployment log or `ADMIN_INIT_PASSWORD` in the `.env` file).

After Docker deployment, you can reset the password to `Admin@123456` using `./testnet.sh reset-password`.
:::

### Change Initial Password

For security reasons, it is highly recommended to change your password immediately after the first login:

1. Click on the user profile icon in the top right corner.
2. Select **Profile Settings**.
3. Switch to the **Security** tab.
4. Enter your current password and the new password.
5. Click **Save**.

---

## Step 2: Interface Layout

Once logged in, you will see the following structure:

```
┌─────────────────────────────────────────────────────┐
│  🔷 TestNet   [Project Switcher]    🔔 👤            │ ← Top Nav
├──────────┬──────────────────────────────────────────┤
│ Overview │                                          │
│ 📊 Dash  │            Main Content Area             │
│ 📁 Proj  │                                          │
│ Assets   │  ┌─────────────────────────────────┐    │
│ 🏢 Asset │  │      Metrics & Quick Actions    │    │
│ ⚙️ Config│  └─────────────────────────────────┘    │
│ Security │                                          │
│ 🔍 Search│                                          │
│ 🔄 Auto  │                                          │
│ 💻 Node  │                                          │
│ System   │                                          │
│ 🔔 Msg   │                                          │
│ ⚙️ Admin │                                          │
└──────────┴──────────────────────────────────────────┘
```

### Main Modules

| Group | Module | Description |
|------|------|------|
| **Overview (CORE)** | **Dashboard** | Asset statistics, recent tasks status, and system overview. |
| | **Projects** | Project-level logical data isolation and member management. |
| **Assets (ASSETS)** | **Asset Graph & Lists** | Lifecycle management, topology visualization, and filtering across the 8 core asset models. |
| | **Asset Config** | Configure tags, auto tagging, ownership mappings, access rules, notification linkages, and custom fields. |
| **Security (SECURITY)** | **Cyberspace Search** | Search and configuration of cyberspace engines like FOFA, Shodan, Hunter, etc. |
| | **Automation** | Design and run workflows, manage tool library, distribute config files, and audit task execution records. |
| | **Scan Nodes** | Node heartbeat, registration status, and health management. |
| **System (SYSTEM)** | **Message Center** | System notifications, alert rules, and notification history. |
| | **System Admin** | User, role, department, menu permissions, and RSA license management. |

---

## Step 3: Create Your First Project

A project serves as the logical scope for isolating assets and workflows:

1. Click **Project Management** on the left menu.
2. Click **New Project**.
3. Fill in the project name and description.
4. Click **Save**.

Once created, use the **Project Switcher** in the top navigation bar to select the active project context.

---

## Step 4: Add Your First Asset

### Add Manually

1. Click **Asset Management** → **Domain** on the left sidebar.
2. Click the **Add** button.
3. Enter the top-level domain (e.g., `example.com`).
4. Click **OK** to save.

### Import in Bulk

1. Click the **Import** button.
2. Download the Excel template.
3. Fill in the domains according to the template.
4. Upload the file to complete the import.

---

## Step 5: Install Tools and Run Scans

### Install a Tool from the Store

1. Go to **Tool Management** → **Tool List**.
2. Click the **Store** button to open the Tool Store.
3. Find the tool you need (e.g., `Subfinder`).
4. Click **Install**.

### Install a Pre-configured Workflow

1. Go to **Workflows** → **Workflow List**.
2. Click the **Store** button.
3. Choose a template (e.g., **Domain Recon Pipeline**).
4. Click **Install**.

### Run the Workflow

1. Find the installed workflow in your list.
2. Click the **Run** button.
3. Select the input asset (the domain you added in Step 4).
4. Click **Confirm Run**.

---

## Step 6: View Scan Results

1. Click **Task Management** to monitor running tasks.
2. Once complete, click **Logs** to view the task execution details.
3. Click **Results** to view discovered subdomains, ports, or web pages.
4. Click **Import Assets** to save the discovered items into the Asset Hub.

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
