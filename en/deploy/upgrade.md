---
title: Upgrade Guide
description: Upgrade Guide
---

# Upgrade Guide

This guide describes how to upgrade an installed TestNet to a new version.

## Pre-Upgrade Preparation

### 1. Backup Data

```bash
# Backup PostgreSQL database
docker exec testnet-db pg_dump \
  -U testnet -d testnet -F c \
  -f backup_$(date +%Y%m%d).dump

# Backup .env configuration file
cp deploy/.env deploy/.env.backup
```

### 2. Review Change Log

Before upgrading, review the Release Notes of the target version to understand:
- Breaking changes
- New features
- Database schema changes

### 3. Record Current Version

```bash
docker images | grep testnet
```

---

## Upgrade Steps

### Upgrade Using Deployment Script

```bash
cd deploy
./testnet.sh update
```

The `update` command will:
1. Pull the latest Docker images
2. Stop existing services
3. Restart services (Flyway automatically executes database migrations on server startup)

### Manual Upgrade

```bash
# Pull latest images
docker compose -f deploy/docker-compose.yml pull

# Restart services
docker compose -f deploy/docker-compose.yml up -d
```

---

## Automatic Database Migration

TestNet server uses **Flyway** to manage database version upgrades. Each time the service starts, Flyway automatically checks and executes new Migration scripts:

```
Service starts
  ↓
Flyway checks current version (V1.0.12)
  ↓
Finds new Migrations (V1.0.13, V1.0.14)
  ↓
Automatically executes Migrations
  ↓
Updates version records
  ↓
Service starts normally
```

View migration logs:

```bash
docker compose -f deploy/docker-compose.yml logs testnet-server | grep -i flyway
```

---

## Scanning Node Upgrade

If the scanning node (testnet-client) has a new version, it needs to be updated separately:

```bash
# Pull new client image
docker pull testnet/client:latest

# Restart client container
docker stop testnet-client
docker rm testnet-client
docker run -d ...  # Use the original startup command
```

---

## Post-Upgrade Verification

1. Visit `https://your-server:3100` to confirm the frontend is working
2. Execute a test workflow to verify core functionality is working
3. Check the "**Scanning Nodes**" page to confirm nodes are online
4. View service logs to confirm no abnormal errors

---

## Rollback

If issues occur after upgrading, you can rollback to the previous version:

```bash
# View available old version images
docker images testnet/server

# Start with a specific old version
docker compose -f deploy/docker-compose.yml up -d --no-pull
```

::: warning
If database Migrations have already been executed, rolling back the service version may cause database incompatibility issues. Please make a complete backup before upgrading.
:::

---

## Common Upgrade Issues

### Service Keeps Restarting After Startup

```bash
# View error logs
docker logs testnet-server

# Common cause: database Migration failure
# Check Flyway logs
docker logs testnet-server | grep -i "flyway\|migration"
```

### Frontend Version Mismatch

Clear browser cache and refresh the page (force refresh: `Ctrl+Shift+R`).
