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

`update` 命令会拉取最新镜像并重启服务，数据库迁移会自动执行。

### 手动升级

```bash
# 拉取最新镜像
docker compose -f deploy/docker-compose.yml pull

# 重启服务
docker compose -f deploy/docker-compose.yml up -d
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

## 升级排障

### 服务启动后一直重启

升级后服务端容器反复重启，通常是数据库迁移失败或配置不兼容导致。按以下步骤排查：

**1. 查看错误日志**

```bash
# 查看服务端最近日志
docker logs testnet-server --tail 100

# 查看数据库迁移相关日志
docker logs testnet-server 2>&1 | grep -i "migration\|error"
```

**2. 常见原因与解决方案**

| 原因 | 排查与解决 |
|------|------------|
| **数据库迁移失败** | 确认 `testnet-db` 正常运行；必要时从备份恢复（参考[数据备份与恢复](/deploy/backup)） |
| **.env 缺失新变量** | 新版本可能引入新的环境变量，对比 `.env` 与发布说明，补全缺失项后重启 |
| **数据库连接失败** | 确认数据库健康：`docker exec testnet-db pg_isready`；检查 `SPRING_DATASOURCE_URL` 配置 |
| **端口被占用** | 检查 8081 端口：`lsof -i:8081`，释放占用后重启 |

**3. 回滚升级**

如果问题无法解决，可回滚到升级前版本：

```bash
# 恢复升级前的数据库备份
docker exec -i testnet-db pg_restore \
  -U testnet -d testnet --no-owner --clean --if-exists -F c \
  < backup_$(date +%Y%m%d).dump

# 使用旧版本镜像重启
docker compose -f deploy/docker-compose.yml up -d
```

---

## 相关文档

- [数据备份与恢复](/deploy/backup) — 升级前备份与故障恢复
- [系统部署与激活](/deploy/overview) — 完整部署流程
- [常见问题](/guide/faq) — 部署环境排查

