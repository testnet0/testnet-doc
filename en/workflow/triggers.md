# Workflow Triggers & Run History

Beyond manual execution inside FlowEditor, TestNet provides automated **Cron Scheduling**, **Event-Driven Asset Auto-Triggers**, and comprehensive **Run History Tracking** for 24/7 autonomous security posture management.

---

## 1. Cron Scheduling

For routine security checks, continuous asset discovery, and periodic vulnerability sweeps, configure standard Linux Cron expressions directly within your workflow definitions:

### Configuration
In the workflow list, click **"Schedule Settings"** on the target row or declare the schedule right at the top of your DSL file:
```yaml
kind: Workflow
id: daily-domain-enum
name: Daily Domain Enumeration
schedule: "0 0 2 * * ?" # Automatically runs every night at 02:00 AM
```
- **Supported Cron Syntax**: Seconds, Minutes, Hours, Day of Month, Month, Day of Week, Year;
- **Concurrency Protection**: If the previous cron iteration is still actively running when the next schedule triggers, TestNet defaults to a `SKIP` policy to prevent worker exhaustion and infinite task queuing.

---

## 2. Event-Driven Auto-Triggers (`WorkflowAutoTriggerListener`)

TestNet's event-driven architecture automatically triggers downstream scanning pipelines whenever high-value changes occur inside the asset graph:

### Common Auto-Trigger Use Cases
- **New Subdomain Discovered (`NEW_ASSET`)**: The moment a new subdomain or IP is added to the graph, TestNet instantly triggers Web port scanning and fingerprint identification;
- **New Web Service Exposed**: Automatically launches sensitive directory brute-forcing and weak password checks against newly exposed login panels;
- **Critical Vulnerability Detected (`NEW_VUL`)**: Immediately fires emergency alerts via WeChat/Webhook channels while archiving PoC proof snippets.

### Filter Rules
Using `AssetFilter` rules inside your DSL, you can restrict automated scans to specific priority targets:
```yaml
autoTrigger:
  enabled: true
  events: ["NEW_ASSET"]
  filters:
    assetType: "SUBDOMAIN"
    tagsInclude: ["Production"] # Trigger ONLY for subdomains marked Production
```

---

## 3. Workflow Run History & Execution Traces

Navigate to **"Workflow Management" -> "Run History"** for full visibility across all manual, scheduled, and event-driven pipeline executions:

### Status & Trigger Attribution
- **Execution States**: Clear visual indicators for `PENDING` (queued), `RUNNING`, `SUCCESS`, `FAILED`, and `CANCELLED` (aborted by user);
- **Trigger Source**: Accurately tracks whether an execution originated from `MANUAL` (user click), `CRON` (scheduled timer), or `EVENT` (auto-triggered by asset `subdomain-xxxx`).

### Step-by-Step Task Breakdown
Clicking any workflow run row expands the complete DAG task tree:
- **Phase Duration**: Pinpoints bottlenecks by displaying exact runtimes per step (e.g., `subdomain-enum` took 45s, `vuln-scan` took 12m);
- **Live Terminal Logs**: For active tasks, one click opens the `LogViewer` to display real-time ANSI-colored streaming logs straight from the remote Go scanning node;
- **Step Retry & Intervention**: If a node disconnects due to network jitter, administrators can retry the individual failed step without re-running the entire workflow from scratch.
