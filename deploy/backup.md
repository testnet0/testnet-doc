---
title: 数据备份与恢复
description: 数据备份与恢复
---

# 数据备份与恢复

TestNet 的核心数据存储在 PostgreSQL 数据库中。本文介绍如何备份数据和在故障后恢复。

## 需要备份的内容

| 数据 | 位置 | 重要性 |
|------|------|--------|
| **PostgreSQL 数据库** | Docker Volume `testnet-db-data` | 🔴 必须备份 |
| **配置文件** | `deploy/.env` | 🔴 必须备份 |
| **授权文件** | `deploy/license/server/` | 🔴 必须备份 |
| **SSL 证书** | `deploy/certs/` | 🟡 建议备份 |
| **工具配置文件** | Docker Volume `testnet-server-files` | 🟡 建议备份 |

---

## 备份数据库

### 手动备份（推荐）

```bash
# 进入 deploy 目录
cd deploy

# 使用 pg_dump 导出（自定义格式，支持并行恢复）
docker exec testnet-db pg_dump \
  -U testnet \
  -d testnet \
  --no-owner \
  --no-acl \
  -F c \
  -f backup_$(date +%Y%m%d_%H%M%S).dump

echo "备份完成：backup_$(date +%Y%m%d_%H%M%S).dump"
```

### 自动定期备份（crontab）

```bash
# 编辑 crontab
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

# 停止应用服务（保留数据库继续运行）
docker compose -f docker-compose.yml stop testnet-server testnet-web

# 还原数据库（会覆盖现有数据！）
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

::: danger 恢复前必读
- 还原操作会**覆盖**数据库中现有的全部数据
- 请先确认备份文件完整性：`ls -lh backup_xxx.dump`
- 建议在维护窗口期间执行，通知相关用户
:::

### 验证恢复结果

```bash
# 登录数据库验证数据行数
docker exec -it testnet-db psql \
  -U testnet \
  -d testnet \
  -c "SELECT COUNT(*) FROM testnet_asset_subdomain;"
```

---

## 迁移到新服务器

完整的数据迁移步骤：

### 1. 在旧服务器上导出

```bash
# 备份数据库
docker exec testnet-db pg_dump \
  -U testnet -d testnet --no-owner -F c \
  -f full_backup.dump

# 打包配置
tar -czf testnet-config.tar.gz deploy/.env deploy/certs/ deploy/license/
```

### 2. 传输到新服务器

```bash
scp full_backup.dump user@new-server:/opt/testnet/
scp testnet-config.tar.gz user@new-server:/opt/testnet/
```

### 3. 在新服务器上恢复

```bash
# 先安装 TestNet（参见部署指南）
cd deploy
./testnet.sh install  # 生成新的 .env 等

# 替换为旧服务器的配置
tar -xzf testnet-config.tar.gz

# 启动服务后导入数据库
./testnet.sh start
sleep 30  # 等待数据库初始化完成

docker exec -i testnet-db pg_restore \
  -U testnet -d testnet \
  --no-owner --clean --if-exists -F c \
  < full_backup.dump

./testnet.sh restart
```

---

## 备份最佳实践

::: tip 建议
1. **3-2-1 备份原则**：保留 3 份副本，2 种介质，1 份异地
2. **定期测试恢复**：每月至少验证一次备份可用性
3. **升级前必须备份**：版本升级前先完整备份（参见[升级指南](/deploy/upgrade)）
4. **加密存储**：如备份含敏感数据，应加密后存储
:::

---

## 相关文档

- [升级指南](/deploy/upgrade) — 版本升级与数据库迁移
- [系统部署与激活](/deploy/overview) — 一体化部署与集群扩展指南
- [常见问题](/guide/faq) — 常见问题解决
