---
title: RBAC Permissions & Department Isolation
description: RBAC model and departmental data isolation guide
---

# RBAC Permissions & Department Isolation

TestNet uses an RBAC permission model combined with department-level data isolation for fine-grained access control.

---

## 1. User Account & Session Security

Navigate to **"System Management" -> "User Security Management"** to manage accounts:

- **Authentication**: Login issues a 24-hour JWT token;
- **Password Policy**: Enforces alphanumeric and special character combinations for new accounts and password resets;
- **Account Disabling**: Set abnormal or departed accounts to `DISABLED` to immediately revoke all access.

---

## 2. Role Configuration

Under **"System Management" -> "Role Permission Configuration"**, create roles for different teams (e.g., Security Ops, Penetration Tester, Auditor):

### 1. Permission Codes

The system controls operations via permission codes in the format `resource:entity:action`:
- **List**: `asset:domain:list`, `workflow:spec:list`, `client:node:list`
- **Modify**: `asset:domain:add`, `asset:domain:edit`, `tool:spec:edit`
- **Execute & Export**: `workflow:spec:run`, `asset:domain:export`, `task:instance:kill`

### 2. Menu & Button Control

Upon login, unauthorized menu items and dangerous action buttons (e.g., "Delete All Assets", "Run Command") are automatically hidden or disabled.

---

## 3. Department Tree & Data Isolation

### 1. Organizational Tree

Navigate to **"System Management" -> "Department Management"** to build multi-level structures (e.g., `Headquarters -> Security Center -> Red Team Lab`). Each department has a unique code.

### 2. Project-Department Binding

Projects are bound to a department upon creation. Users can only access projects within their own department and its subordinates.

### 3. Automatic Data Isolation

When searching assets or running workflows, the system automatically isolates data by department — different departments cannot see each other's data.
