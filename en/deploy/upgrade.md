---
title: Upgrades & Maintenance
description: Version upgrades, data backup & recovery, and server migration
---

# Upgrades & Maintenance

This guide covers version upgrades, data backup & recovery, and server migration for TestNet.

All commands must be run from the `testnet-deploy` directory.

---

## Upgrading

### 1. Pre-upgrade Backup

```bash
# Backup PostgreSQL database
docker exec testnet-db pg_dump \
  -U testnet -d testnet --no-owner --no-acl -F c \
  -f backup_$(date +%Y%m%d).dump

# Backup .env configuration file
cp .env .env.backup.$(date +%Y%m%d)
```

### 2. Upgrade via Script

```bash
./testnet.sh update
```

The `update` command pulls the latest images, syncs configuration files, and restarts services. Database migrations run automatically.

### 3. Manual Upgrade

```bash
# Pull latest images
docker compose pull

# Restart services
docker compose up -d
```

### 4. Client Node Upgrade

If a new version of the scanning node (`testnet-client`) is released, update it individually:

```bash
# Pull latest client image
docker pull testnet/client:latest

# Restart client container
docker stop testnet-client
docker rm testnet-client
docker run -d ...  # Use original startup command
```

---

## Data Backup & Recovery

### What to Back Up

| Data | Location | Importance |
|------|----------|------------|
| **PostgreSQL Database** | Docker Volume `testnet-db-data` | 🔴 Must backup |
| **Configuration File** | `.env` | 🔴 Must backup |
| **License File** | `license/server/` | 🔴 Must backup |
| **SSL Certificates** | `certs/` | 🟡 Recommended |
| **Uploaded Files** | `testnet-server/uploads/` | 🟡 Recommended |

### Backing Up the Database

```bash
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

### Backing Up Configuration Files

```bash
# Backup .env config
cp .env .env.backup.$(date +%Y%m%d)

# Backup license files
cp -r license/server/ backup/license_$(date +%Y%m%d)/

# Backup SSL certificates
cp -r certs/ backup/certs_$(date +%Y%m%d)/
```

### Restoring the Database

```bash
# Confirm services are running
./testnet.sh status

# Stop application services (keep database running)
docker compose stop testnet-server testnet-web

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
tar -czf testnet-config.tar.gz .env certs/ license/
```

### 2. Transfer to New Server

```bash
scp full_backup.dump user@new-server:/opt/testnet/
scp testnet-config.tar.gz user@new-server:/opt/testnet/
```

### 3. Restore on New Server

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

## Upgrade Troubleshooting

### Services Keep Restarting After Upgrade

If the server container keeps restarting after upgrade, it's usually caused by a failed database migration or incompatible configuration:

**1. Inspect Error Logs**

```bash
# View recent server logs
docker logs testnet-server --tail 100

# Check database migration logs
docker logs testnet-server 2>&1 | grep -i "migration\|error"
```

**2. Common Causes & Solutions**

| Cause | Troubleshooting & Fix |
|-------|----------------------|
| **Database migration failed** | Confirm `testnet-db` is running; restore from backup if needed (see above) |
| **Missing .env variables** | New versions may introduce new env vars; compare `.env` with release notes, add missing entries, then restart |

**3. Rollback Upgrade**

If the issue cannot be resolved, roll back to the pre-upgrade version:

```bash
# Restore pre-upgrade database backup
docker exec -i testnet-db pg_restore \
  -U testnet -d testnet --no-owner --clean --if-exists -F c \
  < backup_$(date +%Y%m%d).dump

# Restart with previous image version
docker compose up -d
```

---

## Related Documentation

- [System Setup & Activation](/en/deploy/overview) — Full deployment guide
- [FAQ](/en/guide/faq) — Deployment troubleshooting
