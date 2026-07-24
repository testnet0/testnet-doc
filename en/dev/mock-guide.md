---
title: Mock Testing Guide
description: How to use mock data for TestNet development and testing
---

# Mock Testing Guide

In security scanning scenarios, some tools rely on external environments, have long execution cycles, or consume substantial network and computing resources. To facilitate development, debugging, demonstration, and CI/CD integration testing, TestNet features a complete **Mock Testing Mechanism**.

Through the mock mechanism, you can simulate tool inputs and outputs without installing the actual scanning tools (such as Nuclei, Docker, or Nmap), allowing you to verify the correctness of backend parsing, asset storage, and workflow control logic.

---

## 1. Mock Data File Specifications

The Go scanning client (`testnet-client`) supports loading mock outputs from external YAML files. There are two standard formats for mock files.

### 1.1 Standard MockData Format (Recommended)

This format directly simulates the tool's execution result, exit code, and duration, making it the most straightforward way to write test data:

```yaml
version: "1.0"            # Mock protocol version, currently fixed at "1.0"
toolId: subfinder         # Target tool ID to simulate
output: |                 # Simulated stdout/stderr printed by the tool
  www.example.com
  api.example.com
  mail.example.com
exitCode: 0               # Simulated exit status code (0 for success)
duration: 500             # Simulated execution time (in milliseconds)
error: ""                 # Simulated error message (effective when exitCode != 0)
```

### 1.2 TaskEnvelope Format

Mainly used to simulate the raw task encapsulation dispatched from the server to client nodes:

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

If this format is detected, the scanning client will extract the asset type defined in `outputConfig` as the `toolId`, and default the exit code to `0` and execution time to `500ms`.

---

## 2. Client Mock Test Commands

The Go client provides a dedicated `test` command that supports loading an ExecutionSpec and a mock file, printing execution results locally.

### 2.1 Command Syntax

```bash
./testnet-client test --spec <execution_spec.yaml> --mock <mock_data.yaml> [options]
```

### 2.2 Common Options

- `--spec string` (Required): Path to the ExecutionSpec YAML/JSON file.
- `--mock string` (Optional): Path to the mock data YAML/JSON file. If omitted, **real execution** is performed.
- `--output string` (Optional): Path to write the execution result.
- `--verbose`: Enable detailed logging, printing loading details.
- `--timeout int`: Override the timeout (seconds) specified in the ExecutionSpec.

### 2.3 Execution Example

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

## 3. Server Mock API Reference

The TestNet backend management service (`testnet-server`) includes built-in mock interfaces for frontend and testing script invocations. These are primarily implemented in the `com.testnet.mock` package.

### 3.1 Mock Running & Debugging APIs

Submit a DSL directly to the server to get simulated execution results, used for frontend dry-runs:

*   **Tool Spec Dry-Run**
    *   **Endpoint**: `POST /api/v1/mock/execution-spec/dry-run`
    *   **Function**: Dry-run a single tool's ExecutionSpec to generate simulated output.

*   **Workflow Dry-Run**
    *   **Endpoint**: `POST /api/v1/mock/workflow/dry-run`
    *   **Function**: Simulate the execution of an entire workflow without starting scanning nodes, verifying DSL logic such as dependencies (`dependsOn`, `from`) and parameter flows.

### 3.2 Mock File Management

Manage mock data files stored on the server via REST APIs:

| HTTP Method | API Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/mock-files` | List all mock files with pagination |
| `POST` | `/api/v1/mock-files` | Create a new mock file record |
| `POST` | `/api/v1/mock-files/upload` | Upload mock data file (`.yaml` or `.json`) |
| `GET` | `/api/v1/mock-files/by-tool/{toolId}` | Retrieve the default mock file for a specific tool ID |
| `PUT` | `/api/v1/mock-files/{id}` | Update mock file content and description |
| `DELETE` | `/api/v1/mock-files/{id}` | Delete a specific mock file |
| `GET` | `/api/v1/mock-files/{id}/download` | Download mock file content |

---

## 4. Best Practices: Writing Mock Data for New Tools

When adding a custom scanning tool (e.g., `my-scanner`) to the platform, it is recommended to set up mock testing as follows:

1.  **Collect Sample Output**: Run `my-scanner` manually and capture its successful standard output (JSON, JSONL, LINE, CSV, etc.).
2.  **Create a Mock File**:
    Create `my-scanner_mock.yaml` and fill in the `output`:
    ```yaml
    version: "1.0"
    toolId: my-scanner
    exitCode: 0
    duration: 150
    output: |
      {"ip":"1.1.1.1", "port": 80, "service": "http"}
      {"ip":"1.1.1.2", "port": 443, "service": "https"}
    ```
3.  **Local Testing**: Run `./testnet-client test --spec tool-spec.yaml --mock my-scanner_mock.yaml` to verify if the output is correctly parsed into the corresponding asset format configured in `outputs.parser` and `map` of your `tool-spec`.
4.  **Upload to Server**: Upload this YAML file in the Web UI under **System** → **Mock Management**, and link it to `my-scanner`. In development or demo mode, the workflow engine will automatically pull and execute this mock file.
