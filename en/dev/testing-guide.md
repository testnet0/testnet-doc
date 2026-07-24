---
title: E2E Testing Guide
description: E2E Testing Guide
---

# AI Browser Automation Full Acceptance Manual

> Applicable scenario: AI invoking browser automation tools to perform TestNet pre-release full end-to-end acceptance testing

## 1. Testing Objectives

This manual guides AI browser automation through full acceptance of the TestNet platform, covering local environment startup, system activation, login, business module verification, and final report generation.

Acceptance objectives:

- Verify local development environment starts completely
- Verify system activation, login, session persistence, and logout
- Verify Dashboard, projects, assets, asset config, search, workflows, tools, config files, nodes, tasks, notifications, and system management pages are accessible
- Verify CRUD operations, search, pagination, import/export, and associations for projects and 8 asset types
- Verify no white screens under common error scenarios, clear error messages, correct permission redirects
- Generate traceable test reports

## 2. Test Scope

### 2.1 Mandatory Modules

| Module | Route | Focus |
|--------|-------|-------|
| System Activation | `/login` | Machine ID display, license submission, activation success or skip |
| Login | `/login` | Default account login, session persistence, logout, wrong password |
| Dashboard | `/dashboard` | Stats cards, charts, notifications, project switch, WebSocket status |
| Project Management | `/project` | Add, query, edit, delete, search, pagination |
| 8 Asset Types | `/asset/*` | CRUD, associations, import/export |
| Asset Config | `/asset/config/*` | Tags, rules, root domains, notifications, vul types, history cleanup |
| Search Engine | `/search` | Config, syntax config, query, asset import |
| Workflow | `/workflow` | List, editor, validation, execution, run records |
| Tool Management | `/tool` | CRUD, validation, copy, YAML import, store install |
| Config Files | `/config-file` | CRUD, version content save |
| Scanning Nodes | `/client` | Node list, status, heartbeat |
| Task Management | `/task` | List, detail, logs, results |
| Notifications | `/notification` | Unread count, mark read, delete |
| System Management | `/system/*` | Users, roles, departments, permissions, config |

### 2.2 Skippable Modules

Modules dependent on external environments may be recorded as `SKIPPED`:

- System activation: skip when already activated or license disabled
- Search engine queries: verify only config page and error messages without API keys
- DSL Store: verify only that StoreDrawer button opens drawer
- Scanning node execution: verify only empty state without running client
- Workflow real execution: verify only validation and error messages without nodes

## 3. Local Environment Startup

### 3.1 Prerequisites

| Dependency | Requirement |
|------------|-------------|
| Docker | Docker Compose runnable |
| Java | JDK 17 |
| Maven | 3.8+ |
| Node.js | LTS version |
| Go | 1.21+ (for scanning node verification) |

### 3.2 Start PostgreSQL and Redis

```bash
docker compose -f docker-compose-dev.yml up -d
```

Verify: PostgreSQL is listening on `127.0.0.1:5432`, Redis on `127.0.0.1:6379`.

### 3.3 Start Backend

```bash
cd testnet-server
mvn spring-boot:run
```

Verify: Backend on `http://127.0.0.1:8081`, Flyway migration complete, no connection errors.

### 3.4 Start Frontend

```bash
cd testnet-web
npm install && npm run dev
```

Verify: Frontend on `http://127.0.0.1:3100`, `/login` renders without white screen.

### 3.5 Start Scanning Node (Optional)

```bash
cd testnet-client
go run ./cmd -server http://localhost:8081 -secret dev-client-secret-for-local-testing -name AI-E2E-Node
```

Verify: Node registered, visible on `/client` page.

## 4. Test Account and Data Conventions

### 4.1 Default Admin Account

```text
Username: admin
Password: 123456
```

::: warning Security Note
Local dev default password is `123456`. Production environments must change this.
:::

### 4.2 Test Data Naming

All test data uses prefix `AI-E2E-<timestamp>` (e.g. `AI-E2E-20260604153000`) to avoid deleting human-created data.

### 4.3 Standard Asset Chain Data

| Type | Example |
|------|---------|
| Project | `AI-E2E-Project-<timestamp>` |
| Company | `AI-E2E Company <timestamp>` |
| Domain | `e2e-<timestamp>.example.com` |
| Subdomain | `app.e2e-<timestamp>.example.com` |
| IP | `198.51.100.10` |
| Port | `443` |
| Web | `https://app.e2e-<timestamp>.example.com` |
| API | `https://app.e2e-<timestamp>.example.com/api/health` |
| Vulnerability | `AI-E2E-VUL-<timestamp>` |

## 5. AI Browser Automation Execution Conventions

### 5.1 Operation Principles

- Locate elements via visible text, button names, form labels
- Do not rely on volatile CSS classes
- Wait for main title or table before proceeding in each module
- Wait for success message after each submission
- Save at least one screenshot per module
- Save screenshot, URL, console errors for each failure

### 5.2 General Assertions

Every page should verify:

- URL matches expected route
- No white screen
- Main title or core functional area visible
- No unauthorized redirects (except permission test cases)
- No severe console errors
- No unexpected 401/403/500 network requests

### 5.3 Evidence Collection Path

```text
test-reports/e2e-browser/<timestamp>/
├── screenshots/
├── downloads/
├── logs/
├── network/
├── summary.md
├── report_activation.md
├── report_login.md
├── report_dashboard.md
├── report_project.md
├── report_asset.md
├── report_asset_relation.md
├── report_import_export.md
├── report_asset_config.md
├── report_search_engine.md
├── report_workflow.md
├── report_tool.md
├── report_config_file.md
├── report_client.md
├── report_task.md
├── report_notification.md
├── report_system.md
└── report_permission_exception.md
```

## 6. Pre-flight Health Check

1. Open `http://127.0.0.1:3100/login`, wait for render
2. Verify login or activation page visible, no white screen
3. Confirm `/api` proxy requests reach backend

## 7. System Activation Acceptance

### 7.1 Unactivated Scenario

1. If "System Activation" page appears, read and copy machine ID
2. Paste license content, click "Activate Now"
3. Verify machine ID not empty, activation success redirects to login

### 7.2 Already Activated Scenario

Record as `SKIPPED`, does not affect subsequent tests.

## 8. Login and Session Acceptance

### 8.1 Correct Account Login

Enter `admin / 123456`, verify redirect to `/dashboard`, token in localStorage.

### 8.2 Wrong Password

Enter `admin / wrong-password`, verify stays on `/login` with error message.

### 8.3 Session Persistence and Logout

Refresh page to verify session persists; logout clears token, unauthenticated access redirects to `/login`.

## 9. Dashboard Acceptance

Verify stats cards, charts, notification bell, WebSocket status display, no unexpected errors.

## 10. Project Management Acceptance

Add project `AI-E2E-Project-<timestamp>` → query → edit → delete, verify CRUD flow.

## 11. Full Asset Management Acceptance

### 11.1 General CRUD Flow

Applies to all 8 asset pages: add → search → edit → delete, verify required field validation, save, update, delete, pagination, import/export entry.

### 11.2 ~ 11.9 Each Asset Type

Verify in sequence: Company → Domain → Subdomain → IP → Port → Web → API → Vulnerability CRUD and association fields.

## 12. Asset Association Acceptance

### 12.1 Forward Chain Verification

Create associations in order `Project → Company → Domain → Subdomain → IP → Port → Web → API → Vul`, verify each association field saves correctly.

### 12.2 Association Persistence

After each save, refresh page and reopen edit modal to verify associations are not lost.

### 12.3 Delete Order Verification

Delete in reverse dependency order: `Vul → API → Web → Port → IP → Subdomain → Domain → Company → Project`.

::: warning Delete Order
Must delete test data in reverse dependency order. Never delete non-`AI-E2E-<timestamp>` data.
:::

## 13. Asset Import/Export Acceptance

Export Excel for 8 asset types; import Excel with `AI-E2E-IMPORT-<timestamp>` data; upload wrong file type to verify clear error message.

## 14. Asset Configuration Acceptance

Verify tag config, auto-tag rules, ownership rules, root domain config, access rules, notification rules, vulnerability type config, history cleanup config.

## 15. Search Engine Acceptance

Configure engine → configure syntax → execute search → import assets; verify clear error messages without API keys.

## 16. Workflow Acceptance

List CRUD → editor DAG → validation → execution → run records → import from store.

## 17. Tool Management Acceptance

List CRUD → validation → copy → YAML import → install from store → preview target resolution.

## 18. Config File Management Acceptance

CRUD → content save persists → deleted items unqueryable.

## 19. Scanning Node Acceptance

Empty state display works; after starting local node, verify name, status, heartbeat.

## 20. Task Management Acceptance

List → detail → logs → results; failed tasks show error info, successful tasks show output summary.

## 21. Notification Center Acceptance

Unread count → mark read → mark all read → delete → bell syncs updates.

## 22. System Management Acceptance

- User management: add, edit, disable/enable, assign roles, delete (never delete admin)
- Role management: add, edit, assign permissions, delete
- Department management: add, edit, delete
- Permission management: list display, permission tree, search
- System config: edit non-sensitive config, test connection
- Profile: view, modify non-critical fields
- License management: view status, machine ID, activate

## 23. Permission and Exception Page Acceptance

- Unauthenticated access to `/dashboard` → redirect to `/login`
- Low-privilege user accessing unauthorized route → redirect to `/403`
- Non-existent route → no white screen
- Form errors: empty required fields, duplicate unique fields, wrong formats, cancel delete

## 24. Data Cleanup

Only clean `AI-E2E-<timestamp>` data, delete in reverse dependency order, never delete system built-in data.

## 25. Test Reports

### 25.1 Summary Report (`summary.md`)

Includes environment info, module result statistics, asset chain verification, import/export results, final conclusion.

### 25.2 Module Independent Reports (`report_<module>.md`)

Each module report contains: module info, case result table, failure details, skipped items, console exceptions, cleanup confirmation.

### 25.3 Pass Criteria

- Environment startup, login, Dashboard, project, asset management, asset associations must pass
- All 8 asset type CRUD passes at least once
- Export covers all 8 asset types; import covers at least 5 types
- System management has no blocking issues
- Non-external-dependency modules have no white screens, no unexpected 401/403/500
- All failures have screenshots and reproduction steps
- Test data cleanup complete or residuals documented

## 26. Recommended Execution Order

1. Start environment → health check
2. System activation or record skip
3. Login → Dashboard
4. Create project → create full asset chain
5. Verify association persistence
6. Search, edit, export, import
7. Asset config → search engine
8. Tools, workflows, config files
9. Scanning node (or skip) → tasks → notifications
10. System management → permission and exception scenarios
11. Clean data in reverse order
12. Generate module reports and summary report
