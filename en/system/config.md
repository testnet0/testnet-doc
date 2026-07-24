---
title: System Configuration
description: System Configuration
---

# System Configuration

System configuration is used to set global platform parameters, including email service, notification settings, etc.

## Email Service Configuration

Configure the SMTP mail server for:
- Sending notification emails
- User password reset (if supported)

### Configuration Steps

1. Go to "**System Management**" → "**System Configuration**" → "**Email Settings**"
2. Fill in the SMTP configuration:

| Configuration Item | Description | Example |
|-------------------|-------------|---------|
| **SMTP Server** | Mail server address | `smtp.gmail.com` |
| **SMTP Port** | Service port | `465` (SSL) / `587` (TLS) |
| **Encryption** | SSL / TLS / None | `SSL` |
| **Sender Email** | Email address for sending notifications | `testnet@yourcompany.com` |
| **Sender Name** | Displayed sender name | `TestNet Notifications` |
| **Account** | SMTP authentication account | Usually the same as the sender email |
| **Password** | SMTP authentication password | SMTP authorization code |

3. Click "**Send Test Email**" to verify the configuration is correct
4. Save configuration

### Common Email Provider Configurations

::: code-group

```text [Gmail]
SMTP Server: smtp.gmail.com
Port: 465 (SSL) or 587 (TLS)
Account: Your Gmail address
Password: App-specific password (generate after enabling 2-step verification)
```

```text [Tencent Enterprise Email]
SMTP Server: smtp.exmail.qq.com
Port: 465 (SSL)
Account: Enterprise email address
Password: Email password
```

```text [Alibaba Cloud Enterprise Email]
SMTP Server: smtp.mxhichina.com
Port: 465 (SSL)
Account: Enterprise email address
Password: Email password
```

:::

---

## System Parameters

Go to "**System Parameters**" to configure:

| Parameter | Description |
|-----------|-------------|
| **Task Timeout** | Global default task timeout |
| **Max Concurrent Tasks** | Maximum concurrent tasks per node |
| **Log Retention Days** | Task log retention period |