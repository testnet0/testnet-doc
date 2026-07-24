---
title: DSL Validation & Verification Tool
description: How to use testnet-client to validate, test, and verify scanning tool and workflow DSLs locally
---

# DSL Validation & Verification Tool

The TestNet client (`testnet-client`) provides built-in subcommands to validate, test, and verify scanning tool specs and workflow DSLs locally. This enables developers to complete the development loop of tool adaptations and automated workflows without connecting to a remote server or installing them into production.

The scanning probe client provides 3 core CLI subcommands:
1. `validate`: Static syntax and structure validation.
2. `test`: Local task execution (mock or real mode).
3. `verify`: Integrated automated testing with assertions, yielding a Markdown report.

---

## 1. Static Syntax Validation (`validate`)

The `validate` subcommand validates whether an ExecutionSpec YAML or JSON file complies with the system specifications.

### CLI Syntax
```bash
./testnet-client validate --spec <spec_file_path> [options]
```

### Options
- `--spec` (string, required): Path to the ExecutionSpec file.
- `--strict` (bool, optional): Enable strict validation, warning about missing defaults like cleanup files or workdir.

### Validation Scope
- Mandatory fields existence (e.g., `type`, `timeout`).
- Engine type support (one of `DOCKER`, `HTTP`, `DNS`, `TCP`).
- Engine-specific configuration checks (e.g., Docker image definitions, HTTP URLs).
- Timeout duration range checks (must be between 1 and 7200 seconds).
- Temporary file paths, permissions (must be octal format like `0777`), and Base64 content checks.

---

## 2. Local Execution Testing (`test`)

The `test` subcommand runs the scanning task locally using the specified ExecutionSpec, in either **Mock** or **Real** execution mode.

### CLI Syntax
```bash
./testnet-client test --spec <spec_file_path> [--mock <mock_file_path>] [--output <output_file_path>] [options]
```

### Options
- `--spec` (string, required): Execution specification file.
- `--mock` (string, optional): Path to mock data YAML. If omitted, the client runs **Real** execution using local Docker or network requests.
- `--output` (string, optional): Save execution stdout to the specified file.
- `--timeout` (int, optional): Override the timeout configured in the spec.
- `--verbose` (bool, optional): Enable verbose logging.

---

## 3. Integrated Assertions Verification (`verify`)

The `verify` subcommand runs tools or workflows under different modes and verifies outputs against configured assertions, generating a Markdown report.

### CLI Syntax
```bash
# Option 1: Verify using a verification config file
./testnet-client verify --config <verify_config_yaml>

# Option 2: Quick verification via command line flags
./testnet-client verify --spec <spec_yaml> --mock <mock_yaml> --mode <mode> [--output <report_md>]
```

### Options
- `--config` (string): Path to the verification YAML config file.
- `--spec` (string): Path to the tool/workflow DSL file.
- `--mode` (string, default `offline`): Verification mode:
  - `offline`: Static check + mock execution. No Docker pulls or actual network calls.
  - `local-first`: Use local Docker images if available, otherwise fall back to mock.
  - `full`: Pull Docker images and run the task realistically.
- `--mock` (string): Path to the mock data file.
- `--output` (string): Path to save the Markdown report (defaults to stdout).
- `--verbose`: Enable detailed log output.

### 1. Verification Config Format (verify-config.yaml)
A verification config groups the target DSL, mock data, execution mode, and one or more **assertions**:

```yaml
# Tool or workflow DSL path to verify (required)
spec: ./testnet-registry/tools/httpx/1.0.0.yaml

# Verification mode (optional, default: offline)
mode: offline  # offline / local-first / full

# Mock data file path (optional)
mock: ./testnet-mocks/httpx_mock.yaml

# Test target (optional)
target:
  domain: "example.com"

# Assertion list
assertions:
  # Check exit code
  - type: EXIT_CODE
    value: 0
    operator: EQ # Operators: EQ (default), NEQ, GT, GTE, LT, LTE
    
  # Check if standard output contains a string
  - type: OUTPUT_CONTAINS
    value: "http://"
    
  # Check count of parsed assets
  - type: PARSED_COUNT
    value: 1
    operator: GTE
    
  # Check specific field in parsed asset
  - type: PARSED_FIELD
    value:
      field: severity
      value: info
      
# Output report file path
output: ./verify-report.md
verbose: true
```

### 2. Assertion Types

| Assertion Type | Value Type | Description |
| :--- | :--- | :--- |
| `EXIT_CODE` | `integer` | Validates the process/container exit code (usually `0` for success). |
| `OUTPUT_CONTAINS` | `string` | Validates if stdout/stderr logs contain the keyword. |
| `PARSED_COUNT` | `integer` | Validates the number of asset records parsed via output configs. |
| `PARSED_FIELD` | `object` | Validates a parsed field's value. Format: `{ field: "name", value: "expected" }`. |

---

## 4. Verification Report Example

Below is an example of the Markdown report generated by the verify command:

```markdown
# Tool Verification Report - httpx

**Time**: 2026-07-20 10:55:00
**Mode**: offline

---

## 1. Static Validation

| Item | Status | Details |
|------|--------|---------|
| Required Fields | ✅ PASS | All required fields present |
| Execution Type  | ✅ PASS | Type: DOCKER |
| Images Defined  | ✅ PASS | Image configuration correct |

---

## 2. Execution Results

**Status**: Executed (Mock)
**Duration**: 10ms
**Exit Code**: 0

### Raw Output
```
http://example.com [200 OK] [nginx]
```

---

## 3. Parsing Results

**Parser**: LINE
**Status**: Success
**Parsed Records**: 1

---

## 4. Assertions Verification

| Assertion Type | Expected | Actual | Result |
|----------------|----------|--------|--------|
| EXIT_CODE | 0 | 0 | ✅ PASS |
| OUTPUT_CONTAINS | http:// | Matched | ✅ PASS |
| PARSED_COUNT | >= 1 | 1 | ✅ PASS |

---

## 5. Verification Summary

🟢 **Verification PASSED**

- Static Validation: Pass
- Mock Execution: Success
- Output Parsing: Success
- Assertions: 3/3 Passed
```
