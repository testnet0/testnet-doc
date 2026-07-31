---
layout: home

hero:
  name: "TestNet"
  text: "分布式资产管理\n与自动化扫描平台"
  tagline: 统一管理您的网络资产，通过智能工作流编排自动化安全扫描任务
  image:
    src: /screenshots/dashboard.png
    alt: TestNet Dashboard
---

<InstallTerminal />

<HomeFeatures :groups="groups" />

<script setup>
const groups = [
  {
    title: '核心能力',
    items: [
      {
        icon: '🏢',
        title: '立体资产图谱中台',
        desc: '8 大核心资产级联图谱模型，自动解析上下游层级拓扑，支持多维度高级过滤与 Excel 批量导入导出。',
        link: '/assets/models',
        tag: '核心',
      },
      {
        icon: '🔄',
        title: '可视化工作流编排',
        desc: '在线 YAML 工作流编辑器，支持手动触发、Cron 定时、资产联动自动触发，轻松编排复杂扫描流水线。',
        link: '/workflow/overview',
      },
      {
        icon: '🌐',
        title: '分布式扫描节点',
        desc: 'Go 轻量级扫描客户端，跨平台部署，通过 Docker/Shell/HTTP/DNS/TCP 执行各类扫描工具，自动注册与心跳管理。',
        link: '/client/overview',
      },
      {
        icon: '🤖',
        title: 'AI Agent 集成 (MCP)',
        desc: '支持 Model Context Protocol，Claude Code 等 AI 助手可直接调用 TestNet 执行资产查询与工作流。',
        link: '/mcp/overview',
        tag: 'AI',
      },
    ],
  },
]
</script>

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

/* hero 与终端命令的间距 */
.VPHome {
  .VPHero {
    padding-bottom: 0;
  }
}
</style>
