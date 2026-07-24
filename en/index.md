---
layout: home

hero:
  name: "TestNet"
  text: "Distributed Asset Management\n& Automated Scanning Platform"
  tagline: Unify management of your network assets, automate security scanning tasks through intelligent workflow orchestration
  image:
    src: /hero-image.svg
    alt: TestNet
  actions:
    - theme: brand
      text: One-click Deploy
      link: /en/deploy/overview
    - theme: alt
      text: Quick Start
      link: /en/guide/quickstart

features:
  - icon: 🏢
    title: Cascading Asset Graph Hub
    details: Built-in 8 core asset models with automated cascading relationship resolution, topology mapping, advanced multi-dimensional filtering, and Excel import/export.
    link: /en/assets/models
    linkText: Explore Asset Models

  - icon: 🔄
    title: Visual Workflow Orchestration
    details: Online YAML workflow editor supporting manual, cron, and asset-linked auto triggers. Easily orchestrate complex scanning pipelines.
    link: /en/workflow/overview
    linkText: Learn About Workflows

  - icon: 🌐
    title: Distributed Scanning Nodes
    details: Lightweight Go-based scanning client supporting cross-platform deployment. Execute tools via Docker/Shell/HTTP/DNS/TCP with auto-registration and heartbeat management.
    link: /en/client/overview
    linkText: Learn About Scanning Nodes

  - icon: 🛠️
    title: Rich Tool Ecosystem
    details: 22 built-in security tools (Subfinder, Httpx, Nmap, Nuclei, etc.) and 8 preset workflows. One-click install and update via the Tool Store.
    link: /en/tool/overview
    linkText: Browse Tool List

  - icon: 🔍
    title: Multi-Engine Cyberspace Search
    details: Integrates FOFA, Hunter, Quake, Shodan, ZoomEye, and other major internet space mapping engines for rapid exposed asset discovery.
    link: /en/search/overview
    linkText: Configure Cyberspace Search

  - icon: 🤖
    title: AI Agent Integration (MCP)
    details: Supports Model Context Protocol. AI assistants like Claude Code can directly invoke TestNet for asset queries and workflow execution, enabling intelligent automation.
    link: /en/mcp/overview
    linkText: Learn About MCP Integration

  - icon: 🔐
    title: Enterprise Permission Management
    details: Complete RBAC permission model with multi-project isolation, department-level data isolation, and fine-grained menu/button permission control.
    link: /en/system/overview
    linkText: Learn About System Management

  - icon: 📊
    title: Real-time Task Monitoring
    details: View task execution status and log streams in real time. WebSocket pushes task results. Supports task retry and one-click result import into the asset library.
    link: /en/task/overview
    linkText: Learn About Task Management
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #6366f1 30%, #06b6d4);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #6366f1 50%, #06b6d4 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
