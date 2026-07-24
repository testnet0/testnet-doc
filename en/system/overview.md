---
title: System Management Overview
description: System Management Overview
---

# System Management Overview

The System Management module provides complete management capabilities for users, roles, permissions, and departments, as well as system configuration and license management.

## Module Descriptions

| Module | Path | Features |
|--------|------|----------|
| **User Management** | System Management → User Management | Create users, assign roles, reset passwords |
| **Role Management** | System Management → Role Management | Create roles, assign permissions |
| **Permission Management** | System Management → Permission Management | View all permission definitions |
| **Department Management** | System Management → Department Management | Organizational structure management |
| **System Configuration** | System Management → System Configuration | Email, notifications, and other system parameters |
| **License Management** | System Management → License Management | License file upload and viewing |

---

## Permission System

TestNet uses an RBAC (Role-Based Access Control) permission model:

```
User → Role → Permission
```

- Each user can be assigned multiple roles
- Each role contains multiple permissions
- Permissions control menu-level and operation-level access

### Permission Naming Convention

Permission code format: `resource:entity:action`

| Example Permission Code | Description |
|------------------------|-------------|
| `asset:domain:view` | View domains |
| `asset:domain:edit` | Edit domains |
| `asset:domain:delete` | Delete domains |
| `workflow:view` | View workflows |
| `workflow:execute` | Execute workflows |
| `system:user:manage` | User management |
| `mcp:view` | MCP query |
| `mcp:execute` | MCP execution |

---

## Default Roles

The system provides the following preset roles (can be customized):

| Role | Description |
|------|-------------|
| **Super Admin** | All permissions, not subject to project isolation restrictions |
| **Admin** | Asset management, workflows, and full system management permissions |
| **Operator** | Asset view and edit, workflow execution, no system management permissions |
| **Read-only** | Only view permissions, no edit or execution permissions |

---

## Related Documentation

- [RBAC & Department Isolation](/en/system/rbac)
- [System Configuration](/en/system/config)
- [License Management](/en/system/license)