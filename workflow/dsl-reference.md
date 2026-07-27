---
title: vNext DSL 核心语法规范
description: TestNet vNext DSL 工具与工作流标准化语法参考
---

# vNext DSL 核心语法规范 (DSL Reference)

TestNet 统一采用 **vNext DSL (Domain Specific Language)** 作为安全工具箱与自动化工作流的标准化表达格式。vNext 精简为两大核心类型：`kind: Tool` (单体工具规范) 与 `kind: Workflow` (多工具 DAG 编排规范)。

---

## 一、 DSL 总体设计理念

1. **类型隔离与统一注册**：所有 DSL 文件必须在顶层声明 `kind: Tool` 或 `kind: Workflow`；
2. **零显式节点连线 (No explicit edges)**：通过 `dependsOn` 控制执行顺序，通过 `inputs.*.from` 自动建立任务间参数传递的数据流；
3. **动态表达式引擎**：内置 Aviator 表达式引擎，在步骤参数或条件判断（`condition`）中支持如 `size(outputs) > 0` 等灵活的高级表达式。

---

## 二、 工具规范语法 (Tool Spec)

`kind: Tool` 描述了一个安全扫描或数据处理工具在分布式节点上的运行方式与输入输出映射。

### 完整 Tool Spec 示例

```yaml
kind: Tool
metadata:
  id: subfinder
  name: Subfinder
  version: 1.0.0
  description: 被动子域名发现工具
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

### 核心结构说明

| 层级 | 字段 | 说明 |
|------|------|------|
| 顶层 | `kind: Tool` | 固定标识为工具类型 |
| 顶层 | `metadata` | 元数据：`id`(唯一标识)、`name`、`version`(语义化版本) |
| 顶层 | `spec` | 工具规格定义（见下表） |

| Spec 字段 | 说明 |
|-----------|------|
| `spec.inputs` | **输入通道**：定义工具接收的资产类型及数据解析规则，支持 `batch` 批量处理模式 |
| `spec.params` | **运行时参数**：支持 `STRING/INTEGER/BOOLEAN/ARRAY/OBJECT` 类型，可设置默认值和校验范围 |
| `spec.runtime` | **执行引擎**：定义 `type`（DOCKER/HTTP/DNS/TCP/SHELL）及各引擎特有配置 |
| `spec.outputs` | **输出通道**：定义资产类型映射与解析器，支持 LINE/JSON/JSONL/REGEX/FILE/CSV/XML 7 种解析器 |

### 执行引擎类型 (`runtime.type`)

| 类型 | 说明 | 配置字段 |
|------|------|----------|
| `DOCKER` | Docker 容器执行 | `docker.image`、`docker.args`、`docker.network` 等 |
| `HTTP` | HTTP 探针 | `http.url`、`http.method`、`http.headers` |
| `DNS` | DNS 查询探针 | `dns.domain`、`dns.recordType` |
| `TCP` | TCP 端口探测 | `tcp.host`、`tcp.port`、`tcp.data` |
| `SHELL` | Shell 命令执行 | `shell.command`、`shell.allowUnsafeShell` |

---

## 三、 工作流编排规范 (Workflow Spec)

`kind: Workflow` 将多个独立工具通过依赖关系组合为一个高可靠的 DAG 工作流。

### 完整 Workflow Spec 示例

```yaml
kind: Workflow
metadata:
  id: domain-recon-pipeline
  name: Domain Recon Pipeline
  version: 1.0.0
  description: 域名侦察流水线，发现子域名并探测 Web 服务
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

### 核心结构说明

| 字段 | 说明 |
|------|------|
| `metadata` | 元数据：`id`、`name`、`version`、`description` |
| `spec.trigger` | 触发配置：`type` 支持 `MANUAL`/`CRON`/`AUTO`，`cron` 表达式（CRON 类型时）；`AUTO` 表示资产事件联动自动触发（新资产发现时自动执行） |
| `spec.nodes` | **DAG 节点集合**：每个节点声明调用的 `tool`、输入绑定 `inputs.*.from`、依赖关系 `dependsOn` |
| `spec.outputs` | 工作流输出声明：汇总各节点的输出通道 |
| `spec.policy` | 执行策略：`errorStrategy`（CONTINUE/FAIL_FAST）、`maxConcurrency`、`timeoutSeconds`、`maxRetries` |

### 节点依赖 (`dependsOn`)

| 字段 | 说明 |
|------|------|
| `dependsOn.nodes` | 依赖的前置节点 ID 列表 |
| `dependsOn.policy` | 依赖策略：`ALL_SUCCESS`（全部成功才执行）、`ANY_SUCCESS`（任一成功即执行） |

### 输入绑定 (`inputs.*.from`)

| 来源 | 语法 | 说明 |
|------|------|------|
| 触发输入 | `trigger.asset` | 引用工作流触发时传入的资产 |
| 节点输出 | `{nodeId}.outputs.{channel}` | 引用上游节点的输出通道 |

### 条件执行 (`condition`)

节点支持通过 Aviator 表达式进行条件执行：

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
> 欲学习如何在本地 `testnet-registry` 仓库中进行多版本化 DSL 存储与自定义 Registry 商店发布，请参考：[自定义 DSL 与 Registry 商店维护](/workflow/dsl-custom)。