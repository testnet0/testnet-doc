---
title: 升级与维护
description: 版本升级、数据备份与恢复、跨服务器迁移
---

# 升级与维护

本文介绍 TestNet 的版本升级、数据备份恢复以及跨服务器迁移操作。

所有命令均需在 `testnet-deploy` 目录下执行。

---

## 升级

### 1. 升级前备份

```bash
# 备份 PostgreSQL 数据库
docker exec testnet-db pg_dump \
  -U testnet -d testnet --no-owner --no-acl -F c \
  -f backup_$(date +%Y%m%d).dump

# 备份 .env 配置文件
cp .env .env.backup.$(date +%Y%m%d)
```

### 2. 使用部署脚本升级

```bash
./testnet.sh update
```

`update` 命令会拉取最新镜像、同步配置文件并重启服务，数据库迁移会自动执行。

### 3. 手动升级

```bash
# 拉取最新镜像
docker compose pull

# 重启服务
docker compose up -d
```

### 4. 扫描节点升级

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

## 数据备份与恢复

### 备份对象

| 数据 | 存储位置 | 重要程度 |
|------|----------|----------|
| **PostgreSQL 数据库** | Docker 卷 `testnet-db-data` | 🔴 必须备份 |
| **配置文件** | `.env` | 🔴 必须备份 |
| **授权文件** | `license/server/` | 🔴 必须备份 |
| **SSL 证书** | `certs/` | 🟡 建议备份 |
| **上传文件** | `testnet-server/uploads/` | 🟡 建议备份 |

### 备份数据库

```bash
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

### 备份配置文件

```bash
# 备份 .env 配置
cp .env .env.backup.$(date +%Y%m%d)

# 备份授权文件
cp -r license/server/ backup/license_$(date +%Y%m%d)/

# 备份 SSL 证书
cp -r certs/ backup/certs_$(date +%Y%m%d)/
```

### 恢复数据库

```bash
# 确认服务正在运行
./testnet.sh status

# 停止应用服务（保持数据库运行）
docker compose stop testnet-server testnet-web

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
tar -czf testnet-config.tar.gz .env certs/ license/
```

### 2. 传输到新服务器

```bash
scp full_backup.dump user@new-server:/opt/testnet/
scp testnet-config.tar.gz user@new-server:/opt/testnet/
```

### 3. 在新服务器恢复

```bash
cd testnet-deploy
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

## 升级排障

### 服务启动后一直重启

升级后服务端容器反复重启，通常是数据库迁移失败或配置不兼容导致：

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
| **数据库迁移失败** | 确认 `testnet-db` 正常运行；必要时从上文备份恢复 |
| **.env 缺失新变量** | 新版本可能引入新的环境变量，对比 `.env` 与发布说明，补全缺失项后重启 |

**3. 回滚升级**

如果问题无法解决，可回滚到升级前版本：

```bash
# 恢复升级前的数据库备份
docker exec -i testnet-db pg_restore \
  -U testnet -d testnet --no-owner --clean --if-exists -F c \
  < backup_$(date +%Y%m%d).dump

# 使用旧版本镜像重启
docker compose up -d
```

---

## 相关文档

- [系统部署与激活](/deploy/overview) — 完整部署流程
- [常见问题](/guide/faq) — 部署环境排查
