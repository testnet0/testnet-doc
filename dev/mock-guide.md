---
title: 模拟测试 (Mock) 使用指南
description: 如何使用 Mock 数据进行 TestNet 开发和测试
---

# 模拟测试 (Mock) 使用指南

在安全扫描场景中，部分工具依赖外部环境、执行周期长、或者需要消耗大量网络和计算资源。为了方便开发调试、演示以及进行 CI/CD 集成测试，TestNet 设计了完备的 **Mock (模拟测试) 机制**。

通过 Mock 机制，您可以在没有安装具体扫描工具（如 Nuclei、Docker、Nmap）的情况下，模拟工具的输入和输出，验证服务端解析、数据入库、工作流控制逻辑的正确性。

---

## 一、 Mock 数据文件规范

Go 扫描客户端（`testnet-client`）支持从外部 YAML 文件加载模拟输出。Mock 文件有两种规范格式。

### 1.1 标准 MockData 格式（推荐）

该格式直接模拟工具的返回结果、退出码和延迟时间，是编写测试数据最直接的方式：

```yaml
version: "1.0"            # Mock 协议版本，当前固定为 "1.0"
toolId: subfinder         # 模拟的目标工具 ID
output: |                 # 模拟工具打印到 stdout/stderr 的标准输出内容
  www.example.com
  api.example.com
  mail.example.com
exitCode: 0               # 模拟执行退出状态码（0 代表成功）
duration: 500             # 模拟的执行耗时（单位：毫秒）
error: ""                 # 模拟错误信息（当 exitCode != 0 时生效）
```

### 1.2 任务信封 (TaskEnvelope) 格式

主要用于模拟服务端下发给节点的原始任务封装：

```yaml
taskId: "task-001"
sourceAssetId: "asset-001"
sourceAssetType: "DOMAIN"
executionSpec:
  type: HTTP
  timeout: 30
outputConfig:
  - channel: "default"
    assetType: "IP"
    parser: "LINE"
```

如果检测到此格式，扫描端将提取 `outputConfig` 中定义的资产类型作为 `toolId`，并默认将退出码设为 `0`，执行时间设为 `500ms`。

---

## 二、 客户端 Mock 测试命令

Go 客户端提供了专门的 `test` 命令，支持加载 ExecutionSpec 和 Mock 文件，直接在本地打印输出结果。

### 2.1 命令语法

```bash
./testnet-client test --spec <execution_spec.yaml> --mock <mock_data.yaml> [options]
```

### 2.2 常用选项

- `--spec string`（必填）：指定下发的 ExecutionSpec YAML/JSON 文件路径。
- `--mock string`（可选）：指定 Mock 模拟数据 YAML/JSON 文件路径。如果不指定，则进行**真实执行**。
- `--output string`（可选）：将执行结果输出保存到指定文件。
- `--verbose`：启用详细日志输出，打印加载细节。
- `--timeout int`：覆盖 ExecutionSpec 中的超时时间（秒）。

### 2.3 执行示例

```bash
$ ./testnet-client test --spec spec.yaml --mock testnet-mocks/subfinder_mock.yaml --verbose

→ Loading ExecutionSpec from: spec.yaml
✓ Loaded ExecutionSpec: type=DOCKER timeout=300s
→ Loading mock data from: testnet-mocks/subfinder_mock.yaml
✓ Mock data loaded: toolId=subfinder exitCode=0 duration=10ms
✓ Execution completed, output size: 68 bytes

www.example.com
api.example.com
mail.example.com
```

---

## 三、 服务端 Mock 接口参考

TestNet 后端管理服务（`testnet-server`）内置了多项 Mock 接口，供前端和测试脚本调用。主要在 `com.testnet.mock` 包下实现。

### 3.1 Mock 运行调试接口

向服务端提交 DSL 并直接获取 Mock 运行结果，用于前台的 Dry-Run（干跑测试）：

*   **工具 Spec 调试（Dry-Run）**
    *   **接口**：`POST /api/v1/mock/execution-spec/dry-run`
    *   **功能**：对单个工具的 ExecutionSpec 进行 Dry-Run，生成模拟输出。

*   **工作流 Dry-Run**
    *   **接口**：`POST /api/v1/mock/workflow/dry-run`
    *   **功能**：在不启动扫描节点的情况下模拟执行整个工作流，验证 DSL 的信封路由（`dependsOn`、`from`）和参数流转。

### 3.2 Mock 文件管理 (Mock Files)

可以通过 REST API 上传和管理存储在服务端的 Mock 数据文件：

| 请求方法 | API 端点 | 说明 |
| :--- | :--- | :--- |
| `GET` | `/api/v1/mock-files` | 分页列出所有 Mock 文件 |
| `POST` | `/api/v1/mock-files` | 新建 Mock 文件记录 |
| `POST` | `/api/v1/mock-files/upload` | 上传 Mock 数据文件（`.yaml` 或 `.json`） |
| `GET` | `/api/v1/mock-files/by-tool/{toolId}` | 根据绑定的工具 ID 获取其默认 Mock 文件 |
| `PUT` | `/api/v1/mock-files/{id}` | 更新 Mock 文件内容与描述 |
| `DELETE` | `/api/v1/mock-files/{id}` | 删除指定的 Mock 文件 |
| `GET` | `/api/v1/mock-files/{id}/download` | 下载 Mock 文件内容 |

---

## 四、 最佳实践：如何为新工具编写 Mock 测试

当您向平台添加了一个自定义扫描工具（例如 `my-scanner`）时，推荐按照以下步骤建立 Mock 测试：

1.  **收集样本输出**：手动执行 `my-scanner`，抓取其成功的命令行标准输出（JSON, JSONL, LINE 或 CSV 等）。
2.  **创建 Mock 文件**：
    创建 `my-scanner_mock.yaml`，填入 `output`：
    ```yaml
    version: "1.0"
    toolId: my-scanner
    exitCode: 0
    duration: 150
    output: |
      {"ip":"1.1.1.1", "port": 80, "service": "http"}
      {"ip":"1.1.1.2", "port": 443, "service": "https"}
    ```
3.  **本地联调**：使用 `./testnet-client test --spec tool-spec.yaml --mock my-scanner_mock.yaml`，验证输出是否被 `tool-spec` 中配置的 `outputs.parser` 和 `map` 成功提取为对应的资产格式。
4.  **服务端上传**：在前端系统「**系统管理**」→「**Mock 数据管理**」中上传该 YAML 文件，并与 `my-scanner` 进行关联。后续在开发/演示模式下，工作流将直接拉取该 Mock 文件运行。
