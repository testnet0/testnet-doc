---
title: 开发者文档
description: TestNet 开发者参考中心
---

# 开发者文档

本章节为开发者提供 TestNet 平台的技术参考资料，包括 API 接口、前端架构、客户端设计和测试指南。

## 文档索引

| 文档 | 说明 |
|------|------|
| [API 接口参考](/dev/api-reference) | REST API 端点说明、请求/响应格式、认证方式 |
| [API 端点索引](/dev/api-index) | 后端 Controller 暴露的完整接口索引 |
| [前端开发指南](/dev/frontend-guide) | `ResourceCrudPage` 组件使用、CRUD 骨架开发 |
| [客户端架构](/dev/architecture) | Go 扫描客户端架构设计、执行器实现、安全策略 |
| [E2E 测试指南](/dev/testing-guide) | 端到端浏览器自动化测试手册 |
| [Mock 测试指南](/dev/mock-guide) | Mock 数据文件规范与本地模拟执行 |
| [DSL 验证工具](/dev/verify-guide) | testnet-client validate/test/verify 子命令用法 |

---

## 技术栈速览

### 后端（testnet-server）

| 技术 | 版本 | 用途 |
|------|------|------|
| Spring Boot | 3.4.3 | 核心框架 |
| JDK | 17 | 运行环境 |
| PostgreSQL | 16 | 主数据库 |
| Redis | 7 | 缓存 / 会话 |
| MyBatis-Plus | 3.5.8 | ORM 框架 |
| Flyway | - | 数据库版本迁移 |
| Resilience4j | 2.2.0 | 熔断 / 重试 / 限流 |
| Springdoc OpenAPI | 2.3.0 | API 文档生成 |

### 前端（testnet-web）

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.5 | UI 框架 |
| Vite | 8 | 构建工具 |
| TypeScript | 5.9 | 类型系统 |
| Naive UI | 2.44 | 组件库 |
| UnoCSS | 66 | 原子化 CSS |
| Pinia | 3 | 状态管理 |
| CodeMirror | 6 | 代码编辑器 |
| ECharts | 6 | 图表库 |

### 扫描客户端（testnet-client）

| 技术 | 版本 | 用途 |
|------|------|------|
| Go | 1.21+ | 开发语言 |
| Zap | - | 结构化日志 |
| gopsutil | - | 系统信息采集 |

---

## 开发环境快速启动

```bash
# 1. 启动开发依赖（PostgreSQL + Redis）
docker compose -f docker-compose-dev.yml up -d

# 2. 启动后端
cd testnet-server
mvn spring-boot:run
# 服务启动在 http://localhost:8081

# 3. 启动前端
cd testnet-web
npm install && npm run dev
# 前端启动在 http://localhost:3100

# 4. 启动扫描节点（可选）
cd testnet-client
go run ./cmd -server http://localhost:8081 -secret <secret> -name dev-node
```

---

## API 认证

所有 API（除白名单端点外）需在请求头携带 JWT Token：

```http
Authorization: Bearer <your-jwt-token>
```

Token 通过 `POST /api/v1/auth/login` 获取，有效期 **24 小时**。

**白名单端点（无需认证）**：
- `POST /api/v1/auth/login`
- `POST /api/v1/client/register`
- `POST /api/v1/client/heartbeat`
- `POST /api/v1/client/offline`
- `GET /api/v1/client/task/**`
- `GET /api/v1/client/storage/**`
- `GET /api/v1/client/config-file/**`
- `/api/v1/ws/**`（WebSocket 端点）
- `GET /api/v1/license/info`
- `GET /api/v1/license/machine-id`
- `POST /api/v1/license/activate`
- `GET /error`、`OPTIONS /**`
