---
layout: home

hero:
  name: "TestNet"
  text: "Distributed Asset Management\n& Automated Scanning Platform"
  tagline: Unify management of your network assets, automate security scanning tasks through intelligent workflow orchestration
  image:
    src: /screenshots/dashboard.png
    alt: TestNet Dashboard
---

<InstallTerminal
  command="curl -fsSL https://cnb.cool/testnet0/testnet-public/-/git/raw/main/install.sh | bash"
  hint="One command, deploy instantly"
  copyLabel="Copy"
  copiedLabel="Copied"
/>

<HomeFeatures :groups="groups" />

<script setup>
const groups = [
  {
    title: 'Core Capabilities',
    items: [
      {
        icon: '🏢',
        title: 'Cascading Asset Graph Hub',
        desc: '8 core asset models with automated cascading relationship resolution, topology mapping, advanced filtering, and Excel import/export.',
        link: '/en/assets/models',
        tag: 'Core',
      },
      {
        icon: '🔄',
        title: 'Visual Workflow Orchestration',
        desc: 'Online YAML workflow editor with manual, cron, and asset-linked auto triggers. Easily orchestrate complex scanning pipelines.',
        link: '/en/workflow/overview',
      },
      {
        icon: '🌐',
        title: 'Distributed Scanning Nodes',
        desc: 'Lightweight Go-based client, cross-platform deployment. Execute tools via Docker/Shell/HTTP/DNS/TCP with auto-registration.',
        link: '/en/client/overview',
      },
      {
        icon: '🤖',
        title: 'AI Agent Integration (MCP)',
        desc: 'Supports Model Context Protocol. AI assistants like Claude Code can directly invoke TestNet for asset queries and workflows.',
        link: '/en/mcp/overview',
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

/* spacing between hero and terminal */
.VPHome {
  .VPHero {
    padding-bottom: 0;
  }
}
</style>
