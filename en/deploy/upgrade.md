---
title: Upgrade Guide
description: Step-by-step guide to upgrading TestNet to the latest version
---

# Upgrade Guide

This document describes how to upgrade an existing TestNet installation to a newer version.

## Pre-upgrade Preparation

### 1. Backup Data

```bash
# Backup PostgreSQL database
docker exec testnet-db pg_dump \
  -U testnet -d testnet -F c \
  -f backup_$(date +%Y%m%d).dump

# Backup .env configuration file
cp deploy/.env deploy/.env.backup
```

### 2. Review Release Notes

Before upgrading, check the target version's Release Notes for:
- Breaking changes
- New features
- Database schema changes

### 3. Record Current Version

```bash
docker images | grep testnet
```

---

## Upgrade Steps

### Upgrade via Script

```bash
cd deploy
./testnet.sh update
```

The `update` command pulls the latest images and restarts services. Database migrations run automatically.

### Manual Upgrade

```bash
# Pull latest images
docker compose -f deploy/docker-compose.yml pull

# Restart services
docker compose -f deploy/docker-compose.yml up -d
```

---

## Client Node Upgrade

If a new version of the scanning node (`testnet-client`) is released, update it individually:

```bash
# Pull latest client image
docker pull testnet/client:latest

# Restart client container
docker stop testnet-client
docker rm testnet-client
docker run -d ...  # Use original startup command
```

## Upgrade Troubleshooting

### Services Keep Restarting After Upgrade

If the server container keeps restarting after upgrade, it's usually caused by a failed database migration or incompatible configuration. Follow these steps:

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
| **Database migration failed** | Confirm `testnet-db` is running; restore from backup if needed ([Backup & Recovery](/en/deploy/backup)) |
| **Missing .env variables** | New versions may introduce new env vars; compare `.env` with release notes, add missing entries, then restart |
| **Database connection failed** | Verify DB health: `docker exec testnet-db pg_isready`; check `SPRING_DATASOURCE_URL` config |
| **Port already in use** | Check port 8081: `lsof -i:8081`, free it and restart |

**3. Rollback Upgrade**

If the issue cannot be resolved, roll back to the pre-upgrade version:

```bash
# Restore pre-upgrade database backup
docker exec -i testnet-db pg_restore \
  -U testnet -d testnet --no-owner --clean --if-exists -F c \
  < backup_$(date +%Y%m%d).dump

# Restart with previous image version
docker compose -f deploy/docker-compose.yml up -d
```

---

## Related Documentation

- [Backup & Recovery](/en/deploy/backup) — Pre-upgrade backup and disaster recovery
- [System Setup & Activation](/en/deploy/overview) — Full deployment guide
- [FAQ](/en/guide/faq) — Deployment troubleshooting
