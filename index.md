---
layout: home

hero:
  name: "TestNet"
  text: "分布式资产管理\n与自动化扫描平台"
  tagline: 统一管理您的网络资产，通过智能工作流编排自动化安全扫描任务
  image:
    src: /hero-image.svg
    alt: TestNet
  actions:
    - theme: brand
      text: 一键部署
      link: /deploy/overview
    - theme: alt
      text: 快速开始
      link: /guide/quickstart

features:
  - icon: 🏢
    title: 立体资产图谱中台
    details: 内置 8 大核心资产级联图谱模型，自动解析上下游层级拓扑关系，支持多维度高级过滤、标签分组与全量 Excel 导入导出。
    link: /assets/models
    linkText: 探索图谱模型

  - icon: 🔄
    title: 可视化工作流编排
    details: 在线 YAML 工作流编辑器，支持手动触发、定时触发、资产联动自动触发，轻松编排复杂扫描流水线。
    link: /workflow/overview
    linkText: 了解工作流

  - icon: 🌐
    title: 分布式扫描节点
    details: Go 轻量级扫描客户端，支持跨平台部署，通过 Docker/Shell/HTTP/DNS/TCP 执行各类扫描工具，自动注册与心跳管理。
    link: /client/overview
    linkText: 了解扫描节点

  - icon: 🛠️
    title: 丰富的工具生态
    details: 内置 22 个安全工具（Subfinder、Httpx、Nmap、Nuclei 等）与 8 个预置工作流，支持通过工具商店一键安装更新。
    link: /tool/overview
    linkText: 浏览工具列表

  - icon: 🔍
    title: 多引擎空间测绘
    details: 集成 FOFA、Hunter、Quake、Shodan、ZoomEye 等主流网络空间测绘引擎，快速发现暴露的网络资产。
    link: /search/overview
    linkText: 配置空间测绘

  - icon: 🤖
    title: AI Agent 集成 (MCP)
    details: 支持 Model Context Protocol 规范，Claude Code 等 AI 助手可直接调用 TestNet 执行资产查询与工作流，实现智能自动化。
    link: /mcp/overview
    linkText: 了解 MCP 集成

  - icon: 🔐
    title: 企业级权限管理
    details: 完整的 RBAC 权限模型，支持多项目隔离、部门层级数据隔离、细粒度菜单/按钮权限管控。
    link: /system/overview
    linkText: 了解系统管理

  - icon: 📊
    title: 实时任务监控
    details: 实时查看任务执行状态、日志流，WebSocket 推送任务结果，支持任务重试与结果一键导入资产库。
    link: /task/overview
    linkText: 了解任务管理
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
