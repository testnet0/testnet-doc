---
title: Notifications
description: Notification center configuration and management
---

# Notification Center

TestNet provides three notification channels: in-app notifications, email, and Webhook, helping you stay informed about task execution status and system events.

## In-App Notifications

Click the 🔔 bell icon in the top navigation bar:

- **Unread badge**: Shows the current unread notification count
- **Notification list**: Displays recent notification records
- **Mark as read**: Click a single notification or "Mark All Read"
- **View all**: Navigate to the notification management page for the full history

### Notification Types

| Type | Event | Description |
|------|-------|-------------|
| ✅ **New Asset** | `NEW_ASSET` | Workflow discovers a new asset |
| ⚠️ **New Vulnerability** | `NEW_VUL` | Scan discovers a new vulnerability |
| 🔴 **Node Offline** | `NODE_OFFLINE` | Scanning node heartbeat timeout |
| ❌ **Task Failed** | `TASK_FAILED` | Task execution failure (includes circuit breaker trips) |
| ❌ **Workflow Failed** | `WORKFLOW_FAILED` | Workflow run failure |

### System Alerts (Real-time WebSocket Push)

High-priority alerts (node offline, task circuit breaker, etc.) are pushed in real time via WebSocket and appear as pop-up notices in the top-right corner.

---

## Configure Email Notifications

### Set Up Email Server

1. Go to **"System Management"** → **"System Settings"** → **"Email Settings"**
2. Fill in the SMTP configuration:
   - **SMTP Server**: e.g., `smtp.gmail.com`
   - **Port**: `465` (SSL) or `587` (TLS)
   - **Sender Email**: Email address for sending notifications
   - **Username/Password**: SMTP authentication credentials
3. Click **"Test Send"** to verify configuration
4. Save

### Configure Notification Rules

1. Go to **"Notifications"** → **"Notification Config"**
2. Click **"New Notification Rule"**
3. Configure:
   - **Trigger Events**: Workflow complete, task failed, node offline, etc.
   - **Channel**: Email
   - **Recipients**: Select users or enter email addresses manually
4. Save

---

## Configure Webhook Notifications

Webhooks can push notifications to DingTalk, Lark, custom systems, and more.

### Set Up Webhook

1. Go to **"Notifications"** → **"Notification Config"**
2. Click **"New Notification Rule"**
3. Select **"Webhook"** as the notification channel
4. Enter the Webhook URL
5. (Optional) Configure custom HTTP headers
6. Select trigger events
7. Save

### Common Webhook Examples

::: code-group

```text [DingTalk]
https://oapi.dingtalk.com/robot/send?access_token=YOUR_TOKEN
```

```text [Lark (Feishu)]
https://open.feishu.cn/open-apis/bot/v2/hook/YOUR_TOKEN
```

```text [WeCom]
https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=YOUR_KEY
```

:::

---

## Notification History

Go to **"Notifications"** to view all historical notifications:

- Filter by type (new asset, new vulnerability, node offline, etc.)
- Filter by date range
- View notification details and delivery status (success/failed)
- Bulk delete historical notifications
