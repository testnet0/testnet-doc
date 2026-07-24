---
title: DSL 验证与测试工具
description: 如何使用 testnet-client 对扫描工具及工作流 DSL 进行本地校验、模拟执行和断言验证
---

# DSL 验证与测试工具

TestNet 客户端 (`testnet-client`) 提供了内置的子命令工具，用于在本地验证、测试和验收工具 spec 以及工作流 DSL。这使得开发者可以在无需连接服务端或将工具安装到生产环境的情况下，完成工具适配与自动化流程的完整闭环开发。

扫描探针客户端提供了以下 3 个核心命令行指令：
1. `validate`：静态语法和结构校验
2. `test`：本地模拟/真实执行任务
3. `verify`：集成式自动化测试与断言校验（生成 Markdown 格式的验证报告）

---

## 一、 静态语法校验 (`validate`)

`validate` 子命令用于校验下发的 ExecutionSpec YAML 或 JSON 文件是否符合系统要求的规范。

### 命令语法
```bash
./testnet-client validate --spec <spec_file_path> [options]
```

### 选项说明
- `--spec` (string, 必填)：要校验的 ExecutionSpec 配置文件路径。
- `--strict` (bool, 可选)：启用严格模式校验，对清理设置、工作目录等缺省值进行警告提示。

### 校验内容
- 必填字段存在性检查（如 `type`, `timeout` 等）
- 引擎类型支持验证（`DOCKER`, `HTTP`, `DNS`, `TCP`）
- 各引擎类型特有字段校验（如 Docker 类型的镜像定义、HTTP 类型的 URL 等）
- 超时时长的范围校验（必须在 1 秒到 7200 秒之间）
- 临时生成文件的路径、权限（须为 `0777` 等八进制格式）、Base64 内容合法性校验

---

## 二、 本地执行测试 (`test`)

`test` 子命令支持加载本地 ExecutionSpec，在本地执行扫描任务。支持通过 **Mock (模拟)** 模式和 **Real (真实)** 模式执行。

### 命令语法
```bash
./testnet-client test --spec <spec_file_path> [--mock <mock_file_path>] [--output <output_file_path>] [options]
```

### 选项说明
- `--spec` (string, 必填)：执行规范文件。
- `--mock` (string, 可选)：Mock 数据文件路径。如果不提供此参数，则调用本地 Docker 守护进程或网络发送真实请求进行**真实执行**。
- `--output` (string, 可选)：将执行输出结果（如 stdout）保存到指定文件。
- `--timeout` (int, 可选)：覆盖 Spec 中配置的超时时间。
- `--verbose` (bool, 可选)：打印详细执行日志。

---

## 三、 集成式断言验证 (`verify`)

`verify` 子命令支持对工具或工作流进行多模式运行，并根据预设的断言规则自动验证输出内容，最终生成可视化的 Markdown 格式验证报告。

### 命令语法
```bash
# 方式 1：使用 verify 配置文件进行验证
./testnet-client verify --config <verify_config_yaml>

# 方式 2：使用命令行快速指定参数验证
./testnet-client verify --spec <spec_yaml> --mock <mock_yaml> --mode <mode> [--output <report_md>]
```

### 选项说明
- `--config` (string)：指定 verify 验证配置文件（YAML）路径。
- `--spec` (string)：指定要验证的工具或工作流 DSL 路径。
- `--mode` (string, 默认 `offline`)：验证模式，支持：
  - `offline`：离线验证。仅进行静态校验与 Mock 执行，不拉取 Docker，不产生真实网络交互。
  - `local-first`：本地优先。检查本地 Docker 镜像是否存在，存在则真实执行，不存在则回退至 Mock。
  - `full`：完整真实执行。拉取所需镜像并完整真实执行任务。
- `--mock` (string)：指定 Mock 数据文件。
- `--output` (string)：生成的 Markdown 验证报告保存路径（不指定则默认输出至 stdout）。
- `--verbose`：输出详细信息。

### 1. 验证配置文件格式 (verify-config.yaml)
验证配置文件集成了待验证的 DSL、使用的 Mock 数据、执行模式以及多个**断言校验规则**：

```yaml
# 待验证的工具/工作流 DSL 文件路径（必须）
spec: ./testnet-registry/tools/httpx/1.0.0.yaml

# 验证模式（可选，默认为 offline）
mode: offline  # 可选：offline / local-first / full

# 用于模拟运行的 Mock 数据路径（可选）
mock: ./testnet-mocks/httpx_mock.yaml

# 测试目标（可选）
target:
  domain: "example.com"

# 断言列表
assertions:
  # 验证退出码是否为 0
  - type: EXIT_CODE
    value: 0
    operator: EQ # 比较操作符，默认 EQ (等于)。支持 EQ, NEQ, GT, GTE, LT, LTE
    
  # 验证标准输出是否包含特定字符串
  - type: OUTPUT_CONTAINS
    value: "http://"
    
  # 验证解析出入库的资产记录数量
  - type: PARSED_COUNT
    value: 1
    operator: GTE # 验证解析结果大于或等于 1 条
    
  # 验证解析出来的具体资产字段值
  - type: PARSED_FIELD
    value:
      field: severity
      value: info
      
# 验证报告输出保存的路径
output: ./verify-report.md
verbose: true
```

### 2. 断言类型说明

| 断言类型 | 对应 value | 说明 |
| :--- | :--- | :--- |
| `EXIT_CODE` | `integer` | 校验工具进程或容器的退出状态码（通常 `0` 代表成功） |
| `OUTPUT_CONTAINS` | `string` | 校验输出的 stdout/stderr 日志中是否包含指定的关键字 |
| `PARSED_COUNT` | `integer` | 校验经由 outputs parser 解析出的资产条数 |
| `PARSED_FIELD` | `object` | 校验解析后的资产字段值。结构为：`{ field: "字段名", value: "期望值" }` |

---

## 四、 验证报告示例

验证工具生成的 Markdown 报告能够直观展示静态校验、执行指标、结果解析及断言状态，格式如下：

```markdown
# 工具验证报告 - httpx

**验证时间**: 2026-07-20 10:55:00
**验证模式**: offline

---

## 1. 静态校验

| 检查项 | 状态 | 详情 |
|--------|------|------|
| Required Fields | ✅ PASS | 所有必填字段均已配置 |
| Execution Type  | ✅ PASS | 执行类型: DOCKER |
| Images Defined  | ✅ PASS | 镜像配置正确 |

---

## 2. 执行结果

**执行状态**: 已执行 (Mock)
**执行时长**: 10ms
**退出码**: 0

### 原始输出
```
http://example.com [200 OK] [nginx]
```

---

## 3. 结果解析

**解析器类型**: LINE
**解析状态**: 成功
**解析记录数**: 1 条

---

## 4. 断言验证

| 断言类型 | 期望值 | 实际值 | 结果 |
|----------|--------|--------|------|
| EXIT_CODE | 0 | 0 | ✅ PASS |
| OUTPUT_CONTAINS | http:// | 已包含 | ✅ PASS |
| PARSED_COUNT | >= 1 | 1 | ✅ PASS |

---

## 5. 验证总结

🟢 **验证通过**

- 静态校验: 通过
- Mock 执行: 成功
- 结果解析: 成功
- 断言验证: 3/3 全部通过
```
