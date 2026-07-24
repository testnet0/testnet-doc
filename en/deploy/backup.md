---
title: Data Backup & Recovery
description: Data Backup & Recovery
---

# Data Backup & Recovery

TestNet's core data is stored in a PostgreSQL database. This guide explains how to back up your data and recover from failures.

## What to Back Up

| Data | Location | Importance |
|------|----------|------------|
| **PostgreSQL Database** | Docker Volume `testnet-db-data` | 🔴 Must backup |
| **Configuration File** | `deploy/.env` | 🔴 Must backup |
| **License File** | `deploy/license/server/` | 🔴 Must backup |
| **SSL Certificates** | `deploy/certs/` | 🟡 Recommended |
| **Tool Config Files** | Docker Volume `testnet-server-files` | 🟡 Recommended |

---

## Backing Up the Database

### Manual Backup (Recommended)

```bash
# Enter the deploy directory
cd deploy

# Export database using pg_dump (custom format for parallel restore)
docker exec testnet-db pg_dump \
  -U testnet \
  -d testnet \
  --no-owner \
  --no-acl \
  -F c \
  -f backup_$(date +%Y%m%d_%H%M%S).dump

echo "Backup complete: backup_$(date +%Y%m%d_%H%M%S).dump"
```

### Automated Scheduled Backup (crontab)

```bash
# Edit crontab
crontab -e

# Auto backup at 2 AM daily, retain for 30 days
0 2 * * * cd /path/to/testnet/deploy && docker exec testnet-db pg_dump \
  -U testnet -d testnet --no-owner -F c \
  -f /backup/testnet_$(date +\%Y\%m\%d).dump && \
  find /backup -name "testnet_*.dump" -mtime +30 -delete
```

---

## Backing Up Configuration Files

```bash
# Backup .env config
cp deploy/.env deploy/.env.backup.$(date +%Y%m%d)

# Backup license files
cp -r deploy/license/ backup/license_$(date +%Y%m%d)/

# Backup SSL certificates
cp -r deploy/certs/ backup/certs_$(date +%Y%m%d)/
```

---

## Restoring the Database

### Restore from Backup File

```bash
# Confirm services are running
./testnet.sh status

# Stop application services (keep database running)
docker compose -f docker-compose.yml stop testnet-server testnet-web

# Restore database (this will overwrite existing data!)
docker exec -i testnet-db pg_restore \
  -U testnet \
  -d testnet \
  --no-owner \
  --clean \
  --if-exists \
  -F c < backup_20260101_020000.dump

# Restart services
./testnet.sh start
```

::: danger Before Restoring
- The restore operation will **overwrite** all existing data in the database
- Verify backup file integrity: `ls -lh backup_xxx.dump`
- Recommended to perform during a maintenance window and notify users
:::

### Verify Restore

```bash
# Connect and verify row counts
docker exec -it testnet-db psql \
  -U testnet \
  -d testnet \
  -c "SELECT COUNT(*) FROM testnet_asset_subdomain;"
```

---

## Migrating to a New Server

### 1. Export from Old Server

```bash
# Backup database
docker exec testnet-db pg_dump \
  -U testnet -d testnet --no-owner -F c \
  -f full_backup.dump

# Pack configuration
tar -czf testnet-config.tar.gz deploy/.env deploy/certs/ deploy/license/
```

### 2. Transfer to New Server

```bash
scp full_backup.dump user@new-server:/opt/testnet/
scp testnet-config.tar.gz user@new-server:/opt/testnet/
```

### 3. Restore on New Server

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

## Backup Best Practices

::: tip Recommendations
1. **3-2-1 Rule**: 3 copies, 2 different media, 1 offsite
2. **Test Restores Regularly**: Validate backup integrity monthly
3. **Backup Before Upgrades**: Always backup before version upgrades ([Upgrade Guide](/en/deploy/upgrade))
4. **Encrypt Sensitive Backups**: Encrypt backup files containing sensitive data
:::

---

## Related Documentation

- [Upgrade Guide](/en/deploy/upgrade) — Version upgrades and database migrations
- [System Setup & Activation Guide](/en/deploy/overview) — Comprehensive setup and horizontal scaling
- [FAQ](/en/guide/faq) — Common issues and solutions
