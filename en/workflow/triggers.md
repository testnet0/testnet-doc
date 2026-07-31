---
title: Workflow Triggers & Run History
description: Cron scheduling, event-driven auto-triggers and run tracking
---

# Workflow Triggers & Run History

Beyond manual execution, TestNet supports **Cron Scheduling**, **Asset Event Triggers**, and **Run History Tracking**.

---

## 1. Cron Scheduling

For routine security checks, continuous asset discovery, and periodic vulnerability sweeps, configure standard Linux Cron expressions directly within your workflow definitions:

### Configuration
In the workflow list, click **"Schedule Settings"** on the target row or declare the schedule right at the top of your DSL file:
```yaml
kind: Workflow
metadata:
  id: daily-domain-enum
  name: Daily Domain Enumeration
spec:
  trigger:
    type: CRON
    enabled: true
    cron: "0 0 2 * * ?" # Automatically runs every night at 02:00 AM
    input:
      assetTypes: [DOMAIN]
```
- **Supported Cron Syntax**: Seconds, Minutes, Hours, Day of Month, Month, Day of Week, Year;
- **Concurrency Protection**: If the previous cron iteration is still actively running when the next schedule triggers, the system defaults to skipping the current cycle to prevent task buildup

---

## 2. Event-Driven Auto-Triggers

TestNet supports automatic triggering based on asset events. When the platform detects new high-value asset changes:

### Common Auto-Trigger Use Cases
- **New Subdomain Discovered (`NEW_ASSET`)**: The moment a new subdomain or IP is added to the graph, TestNet instantly triggers Web port scanning and fingerprint identification;
- **New Web Service Exposed**: Automatically launches sensitive directory brute-forcing and weak password checks against newly exposed login panels;
- **Critical Vulnerability Detected (`NEW_VUL`)**: Immediately fires emergency alerts via WeChat/Webhook channels while archiving PoC proof snippets.

### Filter Rules
Set `trigger.type` to `AUTO` in your workflow DSL and configure asset types and filter conditions under `trigger.input` to restrict automated scans to specific priority targets:
```yaml
spec:
  trigger:
    type: AUTO
    enabled: true
    input:
      assetTypes: [SUBDOMAIN]
      filter:
        tagsInclude: ["Production"] # Trigger ONLY for subdomains marked Production
```

---

## 3. Workflow Run History & Execution Traces

Navigate to **"Workflow Management" -> "Run History"** for full visibility across all manual, scheduled, and event-driven pipeline executions:

### Status & Trigger Attribution
- **Execution States**: Clear visual indicators for `RUNNING`, `COMPLETED` (success), `PARTIAL` (partial success), `FAILED`, and `CANCELLED` (aborted by user);
- **Trigger Mode**: Accurately tracks whether an execution originated from `MANUAL` (user click), `CRON` (scheduled timer), `ASSET` (auto-triggered by asset change events), or `AI` (triggered by AI Agent via MCP).

### Step-by-Step Task Breakdown
Clicking any workflow run row expands the complete DAG task tree:
- **Phase Duration**: Pinpoints bottlenecks by displaying exact runtimes per step (e.g., `subdomain-enum` took 45s, `vuln-scan` took 12m);
- **Live Terminal Logs**: For active tasks, click to view real-time colored terminal logs;
- **Step Retry & Intervention**: If a node disconnects due to network jitter, administrators can retry the individual failed step without re-running the entire workflow from scratch.
