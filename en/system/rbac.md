---
title: RBAC Permissions & Department Isolation
description: RBAC model and departmental data isolation guide
---

# RBAC Permissions & Department Isolation

TestNet enforces security governance through a **Role-Based Access Control (RBAC)** architecture combined with **Departmental Data Isolation (`sysOrgCode`)**, securing actions down to individual API endpoints and UI buttons.

---

## 1. User Account & Session Security

Navigate to **"System Management" -> "User Security Management"** to oversee account lifecycles across your organization:

### Security Enforcement
- **Stateless JWT Sessions (`com.testnet.config.filter.JwtLoginFilter`)**: Successful authentication issues a 24-hour Bearer token without server-side session stickiness;
- **Password Complexity Rules**: Enforces alphanumeric and special character combinations for new accounts and password resets;
- **Instant Revocation (`DISABLED`)**: Locking an account immediately terminates its ability to authenticate against any REST API endpoint.

---

## 2. Role Configuration & Fine-Grained Authorization

Under **"System Management" -> "Role Permission Configuration"**, create tailored roles (`SOC Lead`, `Penetration Tester`, `Compliance Auditor`) to partition responsibilities:

### Resource Identifiers (`Resource Code`)
Every controller action in TestNet is guarded by Spring Security `@PreAuthorize("hasAuthority('resource:entity:action')")` annotations. Frontend elements map to these exact authority codes:
- **List Queries**: `asset:domain:list`, `workflow:spec:list`, `client:node:list`
- **Modifications**: `asset:domain:add`, `asset:domain:edit`, `tool:spec:edit`
- **High-Impact Actions**: `workflow:spec:run`, `asset:domain:export`, `task:instance:kill`

### Frontend Dynamic Menu & Action Filtering
The frontend permission service dynamically evaluates authority codes upon login. Navigation sidebar items and destructive action buttons ("Delete All Assets" or "Run Remote Command") are automatically hidden or disabled for unauthorized users.

---

## 3. Organizational Tree & Multi-Project Data Isolation

In enterprise cyberspace asset management, assets belonging to different departments or business units (e.g., "E-Commerce Division" vs. "Cloud Infrastructure Team") must be strictly isolated to prevent unauthorized cross-department modification. TestNet achieves this via its **Project & Department Isolation Engine**:

### 1. Hierarchical Organizational Tree
- Navigate to **System Management -> Department Management** to build multi-level department structures (`Headquarters -> Cyber Security Center -> Red Team Lab`);
- Each node receives a hierarchical system organization code (`sysOrgCode`, such as `A01.B02`).

### 2. Strict Project-Department Binding
- Every Project context (see [Overview & Orgs](/en/project/overview)) is bound upon creation to a governing department via `sysOrgCode`;
- When users log into their workspace, the project switcher only permits access to projects owned by their assigned department and its direct subordinate units.

### 3. Automated Data Boundary Enforcement
When searching assets or running workflows, the data engine automatically evaluates the user's active `sysOrgCode`, injecting scope filters dynamically at query time. This guarantees true zero-trust data boundaries across departments!
