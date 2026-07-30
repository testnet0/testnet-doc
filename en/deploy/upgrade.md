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

The `update` command will:
1. Pull the latest Docker images
2. Stop running services
3. Restart services (database migrations run automatically on startup via Flyway)

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

### Services Keep Restarting After Upgrade

```bash
# Inspect error logs
docker logs testnet-server
```
