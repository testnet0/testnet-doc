---
title: vNext DSL Reference Specification
description: TestNet vNext DSL tool and workflow standardized syntax reference
---

# vNext DSL Reference Specification

TestNet standardizes all security tools and automated pipelines using **vNext DSL (Domain Specific Language)**. Built around YAML, vNext eliminates legacy boilerplate edge definitions and separates definitions into two concise types: `kind: Tool` (atomic tool specification) and `kind: Workflow` (multi-step DAG pipeline).

---

## 1. Core Architectural Principles

1. **Type Isolation & Unified Registry**: Every DSL file must explicitly declare `kind: Tool` or `kind: Workflow` at the root;
2. **No Explicit Edges**: DAG topology is determined naturally via `dependsOn` declarations and data-flow parameter mapping (`inputs.*.from`);
3. **Dynamic Expression Engine**: Supports real-time Aviator expression evaluation in step parameters or conditional branches (`condition`) (e.g., `size(outputs) > 0`).

---

## 2. Tool Specification (`ToolSpec`)

`kind: Tool` defines how a security utility or Docker container executes on remote Go nodes and how its raw output is parsed into structured data.

### Complete ToolSpec Example

```yaml
kind: Tool
metadata:
  id: subfinder
  name: Subfinder
  version: 1.0.0
  description: Passive subdomain discovery engine
  category: recon
  tags:
    - subdomain
    - dns
spec:
  inputs:
    target:
      required: true
      accepts: [DOMAIN]
      resolve:
        DOMAIN: '{{asset.domain}}'
      batch:
        enabled: true
        mode: FILE
        argName: -dL
        size: 50
  params:
    threads:
      type: INTEGER
      defaultValue: 10
      min: 1
      max: 100
    recursive:
      type: BOOLEAN
      defaultValue: false
  runtime:
    type: DOCKER
    timeoutSeconds: 300
    docker:
      image:
        default: projectdiscovery/subfinder:latest
      network: host
      args:
        - -silent
        - -t
        - '{{params.threads}}'
        - -d
        - '{{inputs.target}}'
        - -o
        - /tmp/output.json
        - -json
  outputs:
    subdomain:
      assetType: SUBDOMAIN
      parser:
        type: JSONL
      map:
        subdomain: $.host
        source: $.source
      identity:
        field: subdomain
```

### Core Structure Reference

| Level | Field | Description |
|-------|-------|-------------|
| Top | `kind: Tool` | Fixed type identifier |
| Top | `metadata` | Metadata: `id`, `name`, `version` (semver) |
| Top | `spec` | Tool specification (see below) |

| Spec Field | Description |
|-----------|-------------|
| `spec.inputs` | **Input channels**: defines accepted asset types and data resolution rules, supports `batch` mode |
| `spec.params` | **Runtime parameters**: supports `STRING/INTEGER/BOOLEAN/ARRAY/OBJECT` types with defaults and validation |
| `spec.runtime` | **Execution engine**: defines `type` (DOCKER/HTTP/DNS/TCP/SHELL) and engine-specific config |
| `spec.outputs` | **Output channels**: defines asset type mapping and parser (LINE/JSON/JSONL/REGEX/FILE/CSV/XML) |

### Engine Types (`runtime.type`)

| Type | Description | Config Fields |
|------|-------------|---------------|
| `DOCKER` | Docker container execution | `docker.image`, `docker.args`, `docker.network` |
| `HTTP` | HTTP probe | `http.url`, `http.method`, `http.headers` |
| `DNS` | DNS query probe | `dns.domain`, `dns.recordType` |
| `TCP` | TCP port probe | `tcp.host`, `tcp.port`, `tcp.data` |
| `SHELL` | Shell command execution | `shell.command`, `shell.allowUnsafeShell` |

---

## 3. Workflow Specification (`WorkflowSpec`)

`kind: Workflow` chains multiple independent tools into an enterprise-grade Directed Acyclic Graph (DAG).

### Complete WorkflowSpec Example

```yaml
kind: Workflow
metadata:
  id: domain-recon-pipeline
  name: Domain Recon Pipeline
  version: 1.0.0
  description: Domain reconnaissance pipeline: discover subdomains and probe web services
  tags:
    - recon
    - subdomain
    - web
spec:
  trigger:
    type: MANUAL
    enabled: true
    input:
      assetTypes: [DOMAIN]
  nodes:
    subfinder:
      tool: subfinder
      inputs:
        target:
          from:
            - trigger.asset
      params:
        threads: 20
        recursive: true
      timeoutSeconds: 600
      skipOnNoInput: true
    httpx_probe:
      tool: httpx
      inputs:
        target:
          from:
            - subfinder.outputs.subdomain
      dependsOn:
        nodes: [subfinder]
        policy: ALL_SUCCESS
      params:
        followRedirects: true
        threads: 50
      timeoutSeconds: 900
      skipOnNoInput: true
  outputs:
    subdomain:
      from: [subfinder.outputs.subdomain]
    web:
      from: [httpx_probe.outputs.web]
  policy:
    errorStrategy: CONTINUE
    maxConcurrency: 5
    timeoutSeconds: 1800
    maxRetries: 2
```

### Core Structure

| Field | Description |
|-------|-------------|
| `metadata` | Metadata: `id`, `name`, `version`, `description`, `tags` |
| `spec.trigger` | Trigger config: `type` supports `MANUAL`/`CRON`/`AUTO`; `AUTO` means asset-event-linked auto-trigger (executes when new assets are discovered) |
| `spec.nodes` | **DAG nodes**: each node declares its `tool`, `inputs.*.from` bindings, and `dependsOn` dependencies |
| `spec.outputs` | Workflow output declarations: aggregates node output channels |
| `spec.policy` | Execution policy: `errorStrategy`, `maxConcurrency`, `timeoutSeconds`, `maxRetries` |

### Node Dependency (`dependsOn`)

| Field | Description |
|-------|-------------|
| `dependsOn.nodes` | List of upstream node IDs |
| `dependsOn.policy` | Strategy: `ALL_SUCCESS` (execute only if all succeeded), `ANY_SUCCESS` (execute if any succeeded) |

### Input Binding (`inputs.*.from`)

| Source | Syntax | Description |
|--------|--------|-------------|
| Trigger input | `trigger.asset` | References the asset passed to the workflow trigger |
| Node output | `{nodeId}.outputs.{channel}` | References an output channel of an upstream node |

### Conditional Execution (`condition`)

Nodes support Aviator expressions for conditional execution:

```yaml
nodes:
  nuclei_scan:
    tool: nuclei
    dependsOn:
      nodes: [httpx_probe]
      policy: ALL_SUCCESS
    condition: 'size(httpx_probe.outputs.web) > 0'
```

> [!TIP]
> To learn how to maintain versioned DSL files inside your local `testnet-registry` store and publish custom tools, refer to the [Custom DSL & Registry Maintenance Guide](/en/workflow/dsl-custom).