---
title: 自定义 DSL 与 Registry 维护
description: 如何创建自定义扫描工具/工作流 DSL，并维护 Registry 商店
---

# 自定义 DSL 与 Registry 维护

TestNet 的“工具商店”和“预置工作流”是基于静态的 **Registry（资源仓库）** 构建的。通过 Registry，您可以集中托管、版本化分发扫描工具与工作流。

如果您想向 TestNet 中加入私有的安全工具或编排定制的工作流，可以参考本指南，在本地维护一个自定义的 Registry 并上传到平台。

---

## 一、 Registry 目录结构

Registry 资源仓库是一个纯静态的目录结构，可以直接部署在 GitHub Pages、阿里云 OSS、腾讯云 COS、CDN 或本地 HTTP 服务器上。

```
testnet-registry/
├── index.json                    # 整个仓库的元信息和索引（自动生成）
├── generate_registry.py          # 索引与校验和生成脚本（Python 3）
├── tools/                        # 托管的所有工具包
│   └── {tool-id}/
│       └── {version}.yaml        # 指定版本的工具 Spec YAML
└── workflows/                    # 托管的所有工作流包
    └── {workflow-id}/
        └── {version}.yaml        # 指定版本的工作流 Spec YAML
```

- 文件命名规则：必须将 DSL 定义文件命名为版本号（如 `1.0.0.yaml`），存放在以工具/工作流 ID 命名的子目录下。

---

## 二、 步骤一：编写自定义 DSL

在本地 `testnet-registry/tools/` 或 `workflows/` 目录下创建子文件夹，然后编写符合 TestNet vNext 规范的 DSL。

### 2.1 编写自定义工具 DSL 示例

创建一个自定义 HTTP 头部检查工具 `custom-header-check`：

新建目录：`testnet-registry/tools/custom-header-check/`
编写 `1.0.0.yaml`：

```yaml
kind: Tool
metadata:
  id: custom-header-check
  name: Custom Header Check
  version: 1.0.0
  description: 检查目标 Web 站点是否存在安全相关的 HTTP 响应头
  category: scan
  tags:
    - web
    - headers
spec:
  inputs:
    target:
      required: true
      accepts: [WEB]
      resolve:
        WEB: '{{asset.url}}'
  runtime:
    type: DOCKER
    timeoutSeconds: 120
    docker:
      image:
        default: alpine:latest
      args:
        - sh
        - -c
        - 'curl -I -s -k "{{input.target}}" | grep -i -E "x-frame-options|content-security-policy"'
  outputs:
    header_vul:
      assetType: VUL
      parser:
        type: REGEX
      map:
        vulName: '$.title'
        description: '$.body'
```

---

## 三、 步骤二：构建与生成 Registry 索引

编写完 DSL 之后，需要使用仓库中自带的 Python 脚本生成静态元数据和校验和：

### 3.1 环境要求

- 安装 Python 3.x
- 安装 `PyYAML` 依赖包：
  ```bash
  pip install pyyaml
  ```

### 3.2 运行构建

在 `testnet-registry` 根目录下执行：

```bash
python generate_registry.py
```

该脚本将自动执行以下操作：
1. **语法扫描**：递归扫描 `tools/` 和 `workflows/` 下的所有 `.yaml` 文件。
2. **校验和计算**：计算每个 YAML 文件的 SHA-256 校验和，用于客户端完整性校验。
3. **生成 `index.json`**：将所有工具和工作流的元数据（ID、名称、版本、描述、更新时间）汇聚到全局的 `index.json` 和子目录索引中。

---

## 四、 步骤三：发布与同步 Registry

### 4.1 本地测试

您可以在本地快速运行一个 HTTP 服务器进行测试：

```bash
# 启动本地端口 8080 托管静态文件
python -m http.server 8080

# 访问验证
curl http://localhost:8080/index.json
curl http://localhost:8080/tools/custom-header-check/1.0.0.yaml
```

### 4.2 配置服务端

要将 TestNet 系统连接到您自定义的 Registry，请在服务端的配置文件（如 `deploy/.env`）中修改 Registry 路由：

```sh
# 将 Registry 地址指向您私有的 CDN 或 HTTP 地址
TESTNET_REGISTRY_URL="http://your-private-registry-server:8080"
```

修改完成后：
1. 重启 `testnet-server` 服务。
2. 登录平台，进入「**工具管理**」→「**工具商店**」。
3. 点击「**同步商店**」或「**刷新**」，即可看到刚刚编写并发布的 `Custom Header Check` 工具，点击一键安装到本地。
