---
title: Task Execution Monitoring & Result Parsing
description: Task status, real-time logs and result parsing
---

# Task Execution Monitoring & Result Parsing

After a workflow dispatches tasks to scanning nodes, you can monitor them via task details, real-time logs, and result parsing.

---

## 1. Task Details & Status

Click **"Detail"** on any row in **"Task Management" -> "Task List"** to inspect task status:

### Task Status

| Status | Icon | Description |
|--------|------|-------------|
| **PENDING** | ⏳ | Task queued, waiting for an online scanning node |
| **ASSIGNED** | 📌 | Task picked up by a scanning node |
| **RUNNING** | 🔄 | Node is executing the task, streaming logs |
| **COMPLETED** | ✅ | Command exited successfully, output parsed and saved |
| **FAILED** | ❌ | Non-zero exit code, timeout, or parsing error |
| **SKIPPED** | ⏭️ | Skipped due to empty upstream output or unmet condition |

### Heartbeats & Auto-Retries

- **Heartbeat Tracking**: The system continuously monitors node health. Disconnected or crashed nodes trigger automatic task handling.
- **Automated Retries**: If the workflow specifies `maxRetries`, transient failures automatically re-queue the task.

### Manual Interventions

- **Force Kill**: Click **"Kill"** on a stuck `RUNNING` task to immediately stop and clean up the container.
- **Single Task Retry**: Click **"Retry"** on a failed task to re-dispatch execution.

---

## 2. Real-Time Logs

Without SSH access to nodes, you can view real-time colored terminal logs directly in the console:

- **Real-Time Streaming**: Task output is displayed live in the log panel;
- **Colored Rendering**: Terminal color codes are automatically rendered as highlighted text;
- **Search & Filter**: Keyword search and `Error/Warning` level filters help quickly locate errors.

---

## 3. Result Parsing

The system supports automatic parsing of multiple result formats including JSON, JSONL, CSV, REGEX, XML, and LINE, converting raw scanner output into structured assets. Parsers are configured by tool DSL — no manual selection required.

Parsed assets and vulnerabilities are saved automatically: new subdomains, IPs, and web apps go to the asset library, while vulnerability findings generate vulnerability records and trigger notifications.
