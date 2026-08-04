import { defineConfig } from 'vitepress'

// 中文侧边栏（精简、短小、专业、清晰的扁平化 2 级导航）
const zhSidebar = {
  '/': [
    {
      text: '📖 平台简介',
      collapsed: false,
      items: [
        { text: '产品简介', link: '/guide/introduction' },
        { text: '更新日志', link: '/guide/changelog' },
      ],
    },
    {
      text: '🚀 部署运维',
      collapsed: false,
      items: [
        { text: '系统部署与激活', link: '/deploy/overview' },
        { text: '系统升级维护', link: '/deploy/upgrade' },
        { text: '数据备份与恢复', link: '/deploy/backup' },
      ],
    },
    {
      text: '⚡ 快速上手',
      collapsed: false,
      items: [
        { text: '快速开始', link: '/guide/quickstart' },
        { text: '界面概览', link: '/guide/overview' },
        { text: '控制台', link: '/guide/dashboard' },
        { text: '常见问题', link: '/guide/faq' },
      ],
    },
    {
      text: '📁 项目管理',
      collapsed: true,
      items: [{ text: '项目与部门', link: '/project/overview' }],
    },
    {
      text: '🏢 资产管理',
      collapsed: true,
      items: [
        { text: '资产概述', link: '/assets/overview' },
        { text: '资产图谱', link: '/assets/graph' },
        { text: '资产模型', link: '/assets/models' },
        { text: '资产操作', link: '/assets/operations' },
        { text: '资产配置与规则', link: '/assets/rules' },
      ],
    },
    {
      text: '🔄 工作流',
      collapsed: true,
      items: [
        { text: '工作流概述', link: '/workflow/overview' },
        { text: '编辑与运行', link: '/workflow/studio' },
        { text: '触发与记录', link: '/workflow/triggers' },
        { text: 'DSL 参考', link: '/workflow/dsl-reference' },
        { text: '自定义 DSL', link: '/workflow/dsl-custom' },
      ],
    },
    {
      text: '🛠️ 工具中心',
      collapsed: true,
      items: [
        { text: '工具概述', link: '/tool/overview' },
        { text: '配置与同步', link: '/tool/management' },
        { text: '内置工具', link: '/tool/builtin' },
      ],
    },
    {
      text: '📋 任务管理',
      collapsed: true,
      items: [
        { text: '任务概述', link: '/task/overview' },
        { text: '监控与解析', link: '/task/execution' },
      ],
    },
    {
      text: '🔍 空间测绘',
      collapsed: true,
      items: [{ text: '测绘集成', link: '/search/overview' }],
    },
    {
      text: '💻 扫描节点',
      collapsed: true,
      items: [
        { text: '节点池管理', link: '/client/overview' },
        { text: '安全与沙箱', link: '/client/security' },
      ],
    },
    {
      text: '🔔 通知中心',
      collapsed: true,
      items: [{ text: '告警配置', link: '/notification/overview' }],
    },
    {
      text: '🛡️ 系统管理',
      collapsed: true,
      items: [
        { text: '系统概述', link: '/system/overview' },
        { text: 'RBAC 与权限', link: '/system/rbac' },
        { text: '系统配置', link: '/system/config' },
        { text: '授权管理', link: '/system/license' },
      ],
    },
    {
      text: '🤖 MCP 集成',
      collapsed: true,
      items: [
        { text: 'MCP 概述', link: '/mcp/overview' },
        { text: '工具指令', link: '/mcp/tools' },
        { text: '实时资源', link: '/mcp/resources' },
        { text: '提示词模板', link: '/mcp/prompts' },
        { text: 'Claude 集成', link: '/mcp/claude' },
        { text: 'Cursor 集成', link: '/mcp/cursor' },
      ],
    },
    {
      text: '🧑‍💻 开发者参考',
      collapsed: true,
      items: [
        { text: '开发者文档', link: '/dev/index' },
        { text: 'API 接口参考', link: '/dev/api-reference' },
        { text: 'API 端点索引', link: '/dev/api-index' },
        { text: '客户端架构', link: '/dev/architecture' },
        { text: '前端开发指南', link: '/dev/frontend-guide' },
        { text: 'E2E 测试指南', link: '/dev/testing-guide' },
        { text: 'Mock 测试指南', link: '/dev/mock-guide' },
        { text: 'DSL 验证工具', link: '/dev/verify-guide' },
      ],
    },

  ],
}

// 英文侧边栏（精简、短小、专业、清晰的扁平化 2 级导航）
const enSidebar = {
  '/en/': [
    {
      text: '📖 About TestNet',
      collapsed: false,
      items: [
        { text: 'Introduction', link: '/en/guide/introduction' },
        { text: 'Changelog', link: '/en/guide/changelog' },
      ],
    },
    {
      text: '🚀 Deployment',
      collapsed: false,
      items: [
        { text: 'Setup & Activation', link: '/en/deploy/overview' },
        { text: 'System Upgrades', link: '/en/deploy/upgrade' },
        { text: 'Backup & Restore', link: '/en/deploy/backup' },
      ],
    },
    {
      text: '⚡ Getting Started',
      collapsed: false,
      items: [
        { text: 'Quick Start', link: '/en/guide/quickstart' },
        { text: 'Overview', link: '/en/guide/overview' },
        { text: 'Dashboard', link: '/en/guide/dashboard' },
        { text: 'FAQ', link: '/en/guide/faq' },
      ],
    },
    {
      text: '📁 Projects',
      collapsed: true,
      items: [{ text: 'Overview & Orgs', link: '/en/project/overview' }],
    },
    {
      text: '🏢 Assets',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/en/assets/overview' },
        { text: 'Topology Graph', link: '/en/assets/graph' },
        { text: 'Asset Models', link: '/en/assets/models' },
        { text: 'Operations', link: '/en/assets/operations' },
        { text: 'Asset Config & Rules', link: '/en/assets/rules' },
      ],
    },
    {
      text: '🔄 Workflows',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/en/workflow/overview' },
        { text: 'Studio & Run', link: '/en/workflow/studio' },
        { text: 'Triggers & Logs', link: '/en/workflow/triggers' },
        { text: 'DSL Reference', link: '/en/workflow/dsl-reference' },
        { text: 'Custom DSL', link: '/en/workflow/dsl-custom' },
      ],
    },
    {
      text: '🛠️ Tools',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/en/tool/overview' },
        { text: 'Configs & Sync', link: '/en/tool/management' },
        { text: 'Built-in Tools', link: '/en/tool/builtin' },
      ],
    },
    {
      text: '📋 Tasks',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/en/task/overview' },
        { text: 'Logs & Parsing', link: '/en/task/execution' },
      ],
    },
    {
      text: '🔍 Cyberspace Search',
      collapsed: true,
      items: [{ text: 'Search Integration', link: '/en/search/overview' }],
    },
    {
      text: '💻 Scanning Nodes',
      collapsed: true,
      items: [
        { text: 'Node Management', link: '/en/client/overview' },
        { text: 'Security & Sandbox', link: '/en/client/security' },
      ],
    },
    {
      text: '🔔 Notifications',
      collapsed: true,
      items: [{ text: 'Alert Settings', link: '/en/notification/overview' }],
    },
    {
      text: '🛡️ System',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/en/system/overview' },
        { text: 'RBAC & Roles', link: '/en/system/rbac' },
        { text: 'System Config', link: '/en/system/config' },
        { text: 'License Management', link: '/en/system/license' },
      ],
    },
    {
      text: '🤖 MCP AI',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/en/mcp/overview' },
        { text: 'Tool Commands', link: '/en/mcp/tools' },
        { text: 'Live Resources', link: '/en/mcp/resources' },
        { text: 'Prompt Templates', link: '/en/mcp/prompts' },
        { text: 'Claude Integration', link: '/en/mcp/claude' },
        { text: 'Cursor Integration', link: '/en/mcp/cursor' },
      ],
    },
    {
      text: '🧑‍💻 Developer Reference',
      collapsed: true,
      items: [
        { text: 'Developer Docs', link: '/en/dev/index' },
        { text: 'API Reference', link: '/en/dev/api-reference' },
        { text: 'API Endpoint Index', link: '/en/dev/api-index' },
        { text: 'Client Architecture', link: '/en/dev/architecture' },
        { text: 'Frontend Guide', link: '/en/dev/frontend-guide' },
        { text: 'E2E Testing Guide', link: '/en/dev/testing-guide' },
        { text: 'Mock Testing Guide', link: '/en/dev/mock-guide' },
        { text: 'DSL Verification Tool', link: '/en/dev/verify-guide' },
      ],
    },

  ],
}

export default defineConfig({
  title: 'TestNet',
  description: 'TestNet 分布式资产管理与自动化扫描平台 — 用户帮助文档',
  lastUpdated: true,
  ignoreDeadLinks: false,

  // 站点头部（增强 SEO 元数据配置）
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'keywords', content: 'TestNet, 资产安全, 空间测绘, DAG工作流, 分布式扫描, MCP智能体, 自动化渗透' }],
    ['meta', { name: 'author', content: 'TestNet Team' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh-CN' }],
    ['meta', { name: 'og:site_name', content: 'TestNet 文档中心' }],
  ],

  // i18n 多语言：根路径 = 中文（现有内容不动），/en/ = 英文
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'TestNet',
      description: 'TestNet — Distributed Asset Management & Automated Scanning Platform',
      themeConfig: {
        nav: [
          { text: 'Docs', link: '/en/guide/introduction' },
          { text: 'Deployment', link: '/en/deploy/overview' },
        ],
        footer: {
          message: 'Released under the MIT License',
          copyright: 'Copyright © 2026 TestNet',
        },
        docFooter: {
          prev: 'Previous',
          next: 'Next',
        },
        outline: {
          label: 'On this page',
          level: [2, 3],
        },
        returnToTopLabel: 'Back to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light mode',
        darkModeSwitchTitle: 'Switch to dark mode',
        editLink: {
          pattern: 'https://github.com/testnet0/testnet/edit/main/testnet-docs/:path',
          text: 'Edit this page on GitHub',
        },
        lastUpdated: {
          text: 'Last updated',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium',
          },
        },
      },
    },
  },

  // 主题配置
  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },
    siteTitle: 'TestNet',

    nav: [
      { text: '使用文档', link: '/guide/introduction' },
      { text: '部署运维', link: '/deploy/overview' },
    ],

    sidebar: {
      ...zhSidebar,
      ...enSidebar,
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/testnet0/testnet' },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
          en: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search documentation',
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear query',
                footer: {
                  selectText: 'select',
                  navigateText: 'navigate',
                  closeText: 'close',
                },
              },
            },
          },
        },
      },
    },

    footer: {
      message: '基于 MIT 协议发布',
      copyright: 'Copyright © 2026 TestNet',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
      level: [2, 3],
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    editLink: {
      pattern: 'https://github.com/testnet0/testnet/edit/main/testnet-docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
  },
})
