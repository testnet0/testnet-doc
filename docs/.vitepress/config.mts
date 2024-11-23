import { defineConfig } from "vitepress";

import lightbox from "vitepress-plugin-lightbox";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TestNet",
  lastUpdated: true,
  description: "资产管理系统",
  base: '/testnet-doc/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "文档", link: "/guide/产品介绍" },
      { text: "V1.8", link: "/guide/更新日志" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "首页",
          items: [
            { text: "产品介绍", link: "/guide/产品介绍" },
            { text: "更新日志", link: "/guide/更新日志" },
            {
              text: "常见问题",
              link: "/guide/FAQ",
            },
          ],
        },
        {
          text: "上手指南",
          items: [
            { text: "安装", link: "/guide/安装指南" },
            { text: "快速入门", link: "/guide/快速入门" },
            { text: "安装报错解决", link: "/guide/安装报错" },
          ],
          collapsed: false,
        },
        {
          text: "进阶使用",
          items: [
            { text: "资产管理", link: "/guide/资产管理" },
            { text: "空间引擎", link: "/guide/空间引擎使用教程" },
            { text: "AI助手", link: "/guide/AI助手使用教程" },
            { text: "节点分布式部署", link: "/guide/节点分布式部署" },
            { text: "消息推送", link: "/guide/消息推送" },
          ],
          collapsed: false,
        },
        {
          text: "脚本教程",
          items: [
            { text: "脚本使用", link: "/guide/脚本使用" },
            { text: "脚本配置", link: "/script/脚本配置" },
            { text: "自定义脚本", link: "/diy/基本概念" },
          ],
          collapsed: false,
        },
        {
          text: "接口文档",
          link: "/guide/API接口文档",
        },
      ],
      "/script/": [
        {
          text: "首页",
          items: [
            { text: "产品介绍", link: "/guide/产品介绍" },
            { text: "更新日志", link: "/guide/更新日志" },
            {
              text: "常见问题",
              link: "/guide/FAQ",
            },
          ],
          collapsed: true,
        },
        {
          text: "上手指南",
          items: [
            { text: "安装", link: "/guide/安装指南" },
            { text: "快速入门", link: "/guide/快速入门" },
            { text: "安装报错解决", link: "/guide/安装报错" },
          ],
          collapsed: true,
        },
        {
          text: "进阶使用",
          items: [
            { text: "资产管理", link: "/guide/资产管理" },
            { text: "空间引擎", link: "/guide/空间引擎使用教程" },
            { text: "AI助手", link: "/guide/AI助手使用教程" },
            { text: "节点分布式部署", link: "/guide/节点分布式部署" },
            { text: "消息推送", link: "/guide/消息推送" },
          ],
          collapsed: true,
        },
        {
          text: "脚本教程",
          items: [
            { text: "脚本使用", link: "/guide/脚本使用" },
            { text: "脚本配置", link: "/script/脚本配置" },
            { text: "自定义脚本", link: "/diy/基本概念" },
          ],
          collapsed: false,
        },
        {
          text: "各脚本配置",
          items: [
            { text: "subfinder", link: "/script/subfinder" },
            { text: "OneforAll", link: "/script/oneforall" },
            { text: "Naabu", link: "/script/naabu" },
            { text: "masscan", link: "/script/masscan" },
            { text: "Nmap", link: "/script/nmap" },
            { text: "RustScan", link: "/script/rustscan" },
            { text: "检测IP是否存在防火墙", link: "/script/firewall" },
            { text: "afrog", link: "/script/afrog" },
            { text: "xpoc", link: "/script/xpoc" },
            { text: "nuclei", link: "/script/nuclei" },
            {
              text: "0.zone 公司名收集根域名（需配置）",
              link: "/script/0zone",
            },
            { text: "ICP备案查询（需配置）", link: "/script/icp备案查询" },
            { text: "TideFinger_Go", link: "/script/tidefinger" },
            { text: "xapp", link: "/script/xapp" },
            { text: "httpx(可选配置)", link: "/script/httpx" },
            { text: "DNS解析", link: "/script/dns" },
            { text: "katana", link: "/script/katana" },
            { text: "ffuf(需配置)", link: "/script/ffuf" },
            { text: "dirsearch", link: "/script/dirsearch" },
          ],
        },
      ],
      "/diy/": [
        {
          text: "首页",
          items: [
            { text: "产品介绍", link: "/guide/产品介绍" },
            { text: "更新日志", link: "/guide/更新日志" },
            {
              text: "常见问题",
              link: "/guide/FAQ",
            },
          ],
          collapsed: true,
        },
        {
          text: "上手指南",
          items: [
            { text: "安装", link: "/guide/安装指南" },
            { text: "快速入门", link: "/guide/快速入门" },
            { text: "安装报错解决", link: "/guide/安装报错" },
          ],
          collapsed: true,
        },
        {
          text: "进阶使用",
          items: [
            { text: "资产管理", link: "/guide/资产管理" },
            { text: "空间引擎", link: "/guide/空间引擎使用教程" },
            { text: "AI助手", link: "/guide/AI助手使用教程" },
            { text: "节点分布式部署", link: "/guide/节点分布式部署" },
            { text: "消息推送", link: "/guide/消息推送" },
          ],
          collapsed: true,
        },
        {
          text: "脚本教程",
          items: [
            { text: "脚本使用", link: "/guide/脚本使用" },
            { text: "脚本配置", link: "/script/脚本配置" },
            { text: "自定义脚本", link: "/diy/基本概念" },
          ],
          collapsed: true,
        },
        {
          text: "自定义脚本",
          items: [
            { text: "基本概念", link: "/diy/基本概念" },
            { text: "第一个脚本", link: "/diy/第一个脚本" },
            { text: "进阶设置", link: "/diy/进阶设置" },
          ],
          collapsed: false,
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/testnet0/testnet" },
    ],
    search: {
      provider: "algolia",
      options: {
        appId: "CFMQMLCISS",
        apiKey: "a3c31a9c0f1b7de1e1fc9475efb0ce52",
        indexName: "TestNet",
      },
    },
    footer: {
      message: "",
      copyright: "Copyright © 2024- TestNet",
    },
  },
  markdown: {
    config: (md) => {
      // Use lightbox plugin
      md.use(lightbox, {});
    },
  },
});
