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

### 服务启动后一直重启

```bash
# 查看错误日志
docker logs testnet-server
```

