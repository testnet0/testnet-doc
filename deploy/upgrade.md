---
title: 升级指南
description: 升级指南
---

# 升级指南

本文介绍如何将已安装的 TestNet 升级到新版本。

## 升级前准备

### 1. 备份数据

```bash
# 备份 PostgreSQL 数据库
docker exec testnet-db pg_dump \
  -U testnet -d testnet -F c \
  -f backup_$(date +%Y%m%d).dump

# 备份 .env 配置文件
cp deploy/.env deploy/.env.backup
```

### 2. 查看变更日志

在升级前，查看目标版本的 Release Notes，了解：
- 破坏性变更
- 新功能
- 数据库 Schema 变更

### 3. 记录当前版本

```bash
docker images | grep testnet
```

---

## 升级步骤

### 使用部署脚本升级

```bash
cd deploy
./testnet.sh update
```

`update` 命令会：
1. 拉取最新版本的 Docker 镜像
2. 停止现有服务
3. 重新启动服务（服务端启动时 Flyway 自动执行数据库迁移）

### 手动升级

```bash
# 拉取最新镜像
docker compose -f deploy/docker-compose.yml pull

# 重启服务
docker compose -f deploy/docker-compose.yml up -d
```

---

## 数据库自动迁移

TestNet 服务端使用 **Flyway** 管理数据库版本升级。每次服务启动时，Flyway 会自动检查并执行新的 Migration 脚本：

```
服务启动
  ↓
Flyway 检查当前版本 (V1.0.12)
  ↓
发现新 Migration (V1.0.13, V1.0.14)
  ↓
自动执行 Migration
  ↓
更新版本记录
  ↓
服务正常启动
```

查看迁移日志：

```bash
docker compose -f deploy/docker-compose.yml logs testnet-server | grep -i flyway
```

---

## 扫描节点升级

如果扫描节点（testnet-client）有新版本，需要单独更新：

```bash
# 拉取新版客户端镜像
docker pull testnet/client:latest

# 重启客户端容器
docker stop testnet-client
docker rm testnet-client
docker run -d ...  # 使用原来的启动命令
```

---

## 升级后验证

1. 访问 `https://your-server:3100` 确认前端正常
2. 执行一个测试工作流，验证核心功能正常
3. 检查「**扫描节点**」页面，确认节点在线
4. 查看服务日志，确认无异常错误

---

## 回滚

如果升级后出现问题，可以回滚到之前版本：

```bash
# 查看可用的旧版本镜像
docker images testnet/server

# 指定旧版本启动
docker compose -f deploy/docker-compose.yml up -d --no-pull
```

::: warning
数据库 Migration 已经执行的情况下，回滚服务版本可能导致数据库不兼容问题。请在升级前做好完整备份。
:::

---

## 常见升级问题

### 服务启动后一直重启

```bash
# 查看错误日志
docker logs testnet-server

# 常见原因：数据库 Migration 失败
# 检查 Flyway 日志
docker logs testnet-server | grep -i "flyway\|migration"
```

### 前端界面版本不匹配

清除浏览器缓存后刷新页面（强制刷新：`Ctrl+Shift+R`）。
