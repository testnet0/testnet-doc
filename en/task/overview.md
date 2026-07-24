---
title: Task Management Overview
description: Task Management Overview
---

# Task Management Overview

A Task is the smallest execution unit of each node in a workflow, representing a single invocation of a tool.

## Relationship Between Tasks and Workflows

```
Workflow Execution #001
  ├── Node: subfinder (3 input domains → 3 tasks)
  │     ├── Task #001: subfinder(example.com)  ✅
  │     ├── Task #002: subfinder(test.com)     ✅
  │     └── Task #003: subfinder(demo.com)     🔄
  └── Node: httpx (from subfinder output → N tasks)
        └── Task #004: httpx(...)              ⏳
```

---

## Task List

Go to "**Task Management**" to view all tasks:

### Task Status

| Status | Icon | Description |
|--------|------|-------------|
| **PENDING** | ⏳ | Waiting for execution, awaiting node assignment or upstream completion |
| **ASSIGNED** | 📌 | Assigned to a scanning node, waiting for execution |
| **RUNNING** | 🔄 | Currently executing |
| **COMPLETED** | ✅ | Execution succeeded |
| **FAILED** | ❌ | Execution failed |
| **SKIPPED** | ⏭️ | Skipped due to conditions not met or no input |

### Filtering Tasks

| Filter Dimension | Description |
|-----------------|-------------|
| **Status** | Filter by task status |
| **Tool** | Filter by tool name |
| **Time Range** | Filter by creation or completion time |
| **Project** | Filter by associated project |
| **Node** | Filter by execution node |

---

## Task Information

### Basic Information

| Field | Description |
|-------|-------------|
| **Task ID** | Globally unique identifier |
| **Tool Name** | The tool being executed |
| **Associated Workflow** | Source workflow (manual execution tasks have no this field) |
| **Execution Node** | Which scanning node executed this task |
| **Created Time** | Task creation time |
| **Start Time** | Actual execution start time |
| **Completion Time** | Task completion time |
| **Execution Duration** | Total time spent |

### Input Parameters

View the actual input assets and parameters received by the tool (rendered ExecutionSpec).

### Output Results

View after task completion:
- **Raw Output**: Tool's raw standard output
- **Parsed Results**: Structured data processed by parsers
- **Saved Assets**: List of assets successfully saved to the database

---

## Related Documentation

- [Live Logs & Result Parsing](/en/task/execution) — Lifecycle monitoring, live logs, and the 7 parsing pipelines