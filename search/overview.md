---
title: 空间测绘
description: 空间测绘集成与配置
---

# 空间测绘

TestNet 集成了主流网络空间搜索引擎，可直接在平台内查询资产信息并导入到资产库。

## 支持的搜索引擎

| 引擎 | 特点 | 官网 |
|------|------|------|
| **FOFA** | 中文网络空间测绘，语法丰富 | [fofa.info](https://fofa.info) |
| **Hunter** | 奇安信鹰图平台，数据全面 | [hunter.qianxin.com](https://hunter.qianxin.com) |
| **Quake** | 360 全球网络空间测绘 | [quake.360.net](https://quake.360.net) |
| **Shodan** | 国际主流，覆盖全球 | [shodan.io](https://www.shodan.io) |
| **ZoomEye** | 知道创宇网络空间雷达 | [zoomeye.org](https://www.zoomeye.org) |
| **Zone** | 零零信安资产测绘平台 | [0.zone](https://0.zone) |

---

## 配置 API Key

使用搜索引擎功能前，需要先配置各引擎的 API Key。

1. 进入「**空间测绘**」→「**测绘配置**」
2. 选择要配置的搜索引擎
3. 输入您的 **API Key**（从各引擎官网获取）
4. 点击「**测试连接**」验证 Key 是否有效
5. 点击「**保存**」

::: tip 获取 API Key
- **FOFA**：注册账号后在个人中心获取 API Key
- **Shodan**：注册账号后在账户页面获取 API Key
- **Hunter**：注册账号后在个人中心获取 API 积分 Key
- **Quake**：360 网络空间测绘账号，个人中心申请
:::

---

## 配置搜索语法

不同引擎有各自的查询语法，可在「**空间测绘**」→「**测绘配置**」中预设常用查询模板，方便快速调用。

---

## 执行搜索

1. 进入「**空间测绘**」→「**搜索**」
2. 选择一个或多个搜索引擎
3. 在搜索框输入查询语法
4. 设置结果数量上限（避免消耗过多配额）
5. 点击「**搜索**」执行查询

### 各引擎语法示例

::: code-group

```text [FOFA]
# 搜索指定域名的资产
domain="example.com"

# 搜索某 IP 段
ip="192.168.1.0/24"

# 多条件组合
domain="example.com" && status_code="200"

# 搜索特定技术栈
app="WordPress" && domain="example.com"
```

```text [Shodan]
# 搜索主机名
hostname:example.com

# 搜索 IP 网段
net:192.168.1.0/24

# 搜索特定端口
port:8080 hostname:example.com

# 搜索特定组织
org:"Example Corp"
```

```text [ZoomEye]
# 搜索域名
site:example.com

# 搜索 IP
ip:192.168.1.1

# 搜索服务
service:http hostname:example.com
```

```text [Hunter]
# 搜索域名
domain.suffix="example.com"

# 搜索 IP
ip="192.168.1.1"

# 搜索标题
web.title="Example"
```

```text [Quake]
# 搜索域名
domain: "example.com"

# 搜索 IP / 网段
ip: "192.168.1.0/24"

# 搜索端口服务
port: 8080 AND service: "http"
```

```text [Zone]
# 搜索域名或站点
site="example.com"

# 搜索关联企业
company="Example Corp"

# 搜索网页标题
title="管理后台"
```

:::

---

## 导入搜索结果

搜索完成后，可将结果导入到 TestNet 资产库：

1. 在搜索结果列表中勾选需要导入的记录
   - 支持全选当前页
   - 支持跨页选择
2. 点击「**导入资产**」按钮
3. 选择：
   - **目标项目**：资产将归属的项目
   - **资产类型**：IP、Web 等
4. 点击「**确认导入**」

导入结果会展示：
- ✅ 新增数量：成功创建的资产数
- ⏭️ 跳过数量：已存在的重复资产数
- ❌ 失败数量：验证不通过的资产数

---

## 注意事项

::: warning 配额消耗
- 每次搜索会消耗对应引擎的 API 配额
- 建议设置合理的结果数量上限，避免不必要的配额消耗
- 定期检查各引擎的剩余配额
:::

::: danger 合规提醒
请确保您只查询和导入**已授权目标**的资产信息，未经授权的搜索和扫描可能违反法律法规。
:::
