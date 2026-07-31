---
title: Custom DSL & Registry Maintenance
description: How to create custom tool/workflow DSLs and maintain the Registry store
---

# Custom DSL & Registry Maintenance

TestNet's "Tool Store" and "Preset Workflows" are built on top of a static **Registry**. Through the Registry, you can centrally host and distribute version-controlled scanning tools and workflows.

If you want to add private security tools or orchestrate customized workflows in TestNet, follow this guide to maintain a local Registry and upload it to the platform.

---

## 1. Registry Directory Structure

The Registry repository is a purely static directory structure that can be hosted on GitHub Pages, AWS S3, Aliyun OSS, CDNs, or a local HTTP server.

```
testnet-registry/
├── index.json                    # Metadata and index of the entire registry (auto-generated)
├── generate_registry.py          # Index and checksum generator script (Python 3)
├── tools/                        # Hosted scanning tool packages
│   └── {tool-id}/
│       └── {version}.yaml        # Spec YAML for a specific version of a tool
└── workflows/                    # Hosted workflow packages
    └── {workflow-id}/
        └── {version}.yaml        # Spec YAML for a specific version of a workflow
```

- **File Naming Rule**: You must name the DSL definition file as the version number (e.g., `1.0.0.yaml`), and store it under a subfolder matching the tool or workflow ID.

---

## 2. Step 1: Writing a Custom DSL

Create a subfolder under `testnet-registry/tools/` or `workflows/` in your local environment, and write a DSL file complying with the TestNet vNext specifications.

### 2.1 Custom Tool DSL Example

Create a custom HTTP header checker `custom-header-check`:

1. Create directory: `testnet-registry/tools/custom-header-check/`
2. Write `1.0.0.yaml`:

```yaml
kind: Tool
metadata:
  id: custom-header-check
  name: Custom Header Check
  version: 1.0.0
  description: Checks if security-related HTTP headers exist on the target website
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

## 3. Step 2: Building and Generating the Registry Index

After writing the DSL files, use the Python script bundled in the repository to generate static metadata and checksums.

### 3.1 Requirements

- Install Python 3.x
- Install the `PyYAML` package:
  ```bash
  pip install pyyaml
  ```

### 3.2 Run the Build

Run the following command in the root of the `testnet-registry` folder:

```bash
python generate_registry.py
```

The script scans DSL files and generates the index.json index and checksums.

---

## 4. Step 3: Deploying and Synchronizing the Registry

### 4.1 Local Verification

You can quickly run a local HTTP server to verify the build:

```bash
# Serve static files on port 8080
python -m http.server 8080

# Verify URLs
curl http://localhost:8080/index.json
curl http://localhost:8080/tools/custom-header-check/1.0.0.yaml
```

### 4.2 Server-side Configuration

To connect your TestNet platform to the custom Registry, modify the environment file (e.g., `deploy/.env`):

```sh
# Point the Registry URL to your private CDN or HTTP address
TESTNET_REGISTRY_URL="http://your-private-registry-server:8080"
```

After updating:
1. Restart the `testnet-server` service.
2. Log in to the platform, navigate to **Tool Management** → **Tool Store**.
3. Click **Sync Store** or **Refresh**. You should now see your newly created `Custom Header Check` tool available for one-click installation.
