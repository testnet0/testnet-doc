---
title: Developer Docs
description: TestNet Developer Reference Center
---

# Developer Documentation

This section provides technical reference materials for developers working with the TestNet platform, including API interfaces, frontend architecture, client design, and testing guides.

## Document Index

| Document | Description |
|----------|-------------|
| [API Reference](/en/dev/api-reference) | REST API endpoints, request/response formats, authentication |
| [API Endpoint Index](/en/dev/api-index) | Complete endpoint index generated from backend Controllers |
| [Frontend Dev Guide](/en/dev/frontend-guide) | `ResourceCrudPage` component usage, CRUD scaffold development |
| [Client Architecture](/en/dev/architecture) | Go scanning client architecture, executor implementations, security policies |
| [E2E Testing Guide](/en/dev/testing-guide) | End-to-end browser automation test manual |

---

## Tech Stack Overview

### Backend (testnet-server)

| Technology | Version | Usage |
|------------|---------|-------|
| Spring Boot | 3.4.3 | Core framework |
| JDK | 17 | Runtime |
| PostgreSQL | 16 | Primary database |
| Redis | 7 | Cache / Session |
| MyBatis-Plus | 3.5.8 | ORM |
| Flyway | - | Database migration |
| Resilience4j | 2.2.0 | Circuit breaking / Retry / Rate limiting |
| Springdoc OpenAPI | 2.3.0 | API documentation |

### Frontend (testnet-web)

| Technology | Version | Usage |
|------------|---------|-------|
| Vue | 3.5 | UI framework |
| Vite | 8 | Build tool |
| TypeScript | 5.9 | Type system |
| Naive UI | 2.44 | Component library |
| UnoCSS | 66 | Atomic CSS |
| Pinia | 3 | State management |
| CodeMirror | 6 | Code editor |
| ECharts | 6 | Charting library |

### Scan Client (testnet-client)

| Technology | Version | Usage |
|------------|---------|-------|
| Go | 1.21+ | Development language |
| Zap | - | Structured logging |
| gopsutil | - | System info collection |

---

## Quick Start for Development

```bash
# 1. Start development dependencies (PostgreSQL + Redis)
docker compose -f docker-compose-dev.yml up -d

# 2. Start backend
cd testnet-server
mvn spring-boot:run
# Service starts at http://localhost:8081

# 3. Start frontend
cd testnet-web
npm install && npm run dev
# Frontend starts at http://localhost:3100

# 4. Start scanning node (optional)
cd testnet-client
go run ./cmd -server http://localhost:8081 -secret <secret> -name dev-node
```

---

## API Authentication

All APIs (except whitelisted endpoints) require a JWT token in the request header:

```http
Authorization: Bearer <your-jwt-token>
```

Tokens are obtained via `POST /api/v1/auth/login` and are valid for **24 hours**.

**Whitelisted endpoints (no auth required)**:
- `POST /api/v1/auth/login`
- `POST /api/v1/client/register`
- `POST /api/v1/client/heartbeat`
- `GET /api/v1/client/task/**`
- `GET /api/v1/license/info`
