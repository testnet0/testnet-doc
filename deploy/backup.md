---
title: 数据备份与恢复
description: PostgreSQL 数据库与配置文件的备份、恢复及跨服务器迁移
---

# 数据备份与恢复

TestNet 的核心数据存储在 PostgreSQL 数据库中。本指南介绍如何备份数据并在故障时恢复。

## 备份对象

| 数据 | 存储位置 | 重要程度 |
|------|----------|----------|
| **PostgreSQL 数据库** | Docker 卷 `testnet-db-data` | 🔴 必须备份 |
| **配置文件** | `deploy/.env` | 🔴 必须备份 |
| **授权文件** | `deploy/license/server/` | 🔴 必须备份 |
| **SSL 证书** | `deploy/certs/` | 🟡 建议备份 |
| **工具配置文件** | Docker 卷 `testnet-server-files` | 🟡 建议备份 |

---

## 备份数据库

### 手动备份（推荐）

```bash
# 进入部署目录
cd deploy

# 使用 pg_dump 导出数据库（自定义格式支持并行恢复）
docker exec testnet-db pg_dump \
  -U testnet \
  -d testnet \
  --no-owner \
  --no-acl \
  -F c \
  -f backup_$(date +%Y%m%d_%H%M%S).dump

echo "备份完成: backup_$(date +%Y%m%d_%H%M%S).dump"
```

### 定时自动备份（crontab）

```bash
# 编辑定时任务
crontab -e

# 每天凌晨 2 点自动备份，保留 30 天
0 2 * * * cd /path/to/testnet/deploy && docker exec testnet-db pg_dump \
  -U testnet -d testnet --no-owner -F c \
  -f /backup/testnet_$(date +\%Y\%m\%d).dump && \
  find /backup -name "testnet_*.dump" -mtime +30 -delete
```

---

## 备份配置文件

```bash
# 备份 .env 配置
cp deploy/.env deploy/.env.backup.$(date +%Y%m%d)

# 备份授权文件
cp -r deploy/license/ backup/license_$(date +%Y%m%d)/

# 备份 SSL 证书
cp -r deploy/certs/ backup/certs_$(date +%Y%m%d)/
```

---

## 恢复数据库

### 从备份文件恢复

```bash
# 确认服务正在运行
./testnet.sh status

# 停止应用服务（保持数据库运行）
docker compose -f docker-compose.yml stop testnet-server testnet-web

# 恢复数据库（此操作将覆盖现有数据！）
docker exec -i testnet-db pg_restore \
  -U testnet \
  -d testnet \
  --no-owner \
  --clean \
  --if-exists \
  -F c < backup_20260101_020000.dump

# 重启服务
./testnet.sh start
```

::: danger 恢复前请注意
- 恢复操作将**覆盖**数据库中的所有现有数据
- 恢复前请验证备份文件完整性：`ls -lh backup_xxx.dump`
- 建议在维护窗口期间执行，并提前通知用户
:::

### 验证恢复结果

```bash
# 连接数据库并验证记录数
docker exec -it testnet-db psql \
  -U testnet \
  -d testnet \
  -c "SELECT COUNT(*) FROM testnet_asset_subdomain;"
```

---

## 跨服务器迁移

### 1. 从旧服务器导出

```bash
# 备份数据库
docker exec testnet-db pg_dump \
  -U testnet -d testnet --no-owner -F c \
  -f full_backup.dump

# 打包配置文件
tar -czf testnet-config.tar.gz deploy/.env deploy/certs/ deploy/license/
```

### 2. 传输到新服务器

```bash
scp full_backup.dump user@new-server:/opt/testnet/
scp testnet-config.tar.gz user@new-server:/opt/testnet/
```

### 3. 在新服务器恢复

```bash
cd deploy
./testnet.sh install

tar -xzf testnet-config.tar.gz

./testnet.sh start
sleep 30

docker exec -i testnet-db pg_restore \
  -U testnet -d testnet \
  --no-owner --clean --if-exists -F c \
  < full_backup.dump

./testnet.sh restart
```

---

## 备份最佳实践

::: tip 备份建议
1. **3-2-1 原则**：3 份数据，2 种存储介质，1 份异地保存
2. **定期测试恢复**：每月验证备份文件的完整性和可恢复性
3. **升级前备份**：版本升级前务必先备份（参考[系统升级维护](/deploy/upgrade)）
4. **加密敏感备份**：包含敏感数据的备份文件应加密存储
:::

---

## 相关文档

- [系统升级维护](/deploy/upgrade) — 版本升级与数据库迁移
- [系统部署与激活](/deploy/overview) — 完整部署流程与集群水平扩展
- [常见问题](/guide/faq) — 常见问题与解决方案
