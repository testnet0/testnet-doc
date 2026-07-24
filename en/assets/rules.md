---
title: Asset Configuration & Rules
description: Guide on Asset Configuration, Smart Rules, Root Domain Suffixes, Custom Fields, and History Cleanup
---

# Asset Configuration & Rules

TestNet provides a rich set of system dictionaries, automation policies, and cleanup rules under the **"Asset Management" -> "Asset Config"** sub-menu, helping security teams automate asset tagging, access control filtering, multi-dimensional attribute customization, and data lifecycle management.

---

## 1. Asset Smart Rules (AUTO_TAG / ACCESS_RULE / OWNERSHIP)

Asset rules trigger automatically when assets are saved (including scan tool reporting and manual imports) to implement automated list filtering, asset tagging, and ownership assignment.

### Rule Configuration Types (Config Type)

| Rule Type (Config Type) | Target Effect | Effect Description |
|-----------------------|-------------------|----------|
| **ACCESS_RULE (Access Control Rule)** | **BLACKLIST** / **WHITELIST** | Pre-save asset filtering. If an asset hits the blacklist or misses an enabled whitelist, it will be directly blocked and not saved to the database. |
| **AUTO_TAG (Auto-Tagging)** | **Applied Tag List** (Tags, comma-separated) | Automatically applies specified tags to assets matching the rule characteristics. The tags used must already exist in the system tag dictionary, otherwise they will be automatically ignored. |
| **OWNERSHIP (Ownership Mapping Rule)** | **Owner** / **Department** / **CompanyId** / **ProjectId** | Automatically sets the data ownership entity and responsible owner for assets. |

### Match Fields and Match Algorithms

The system matches data by configuring specific match fields and algorithms for rules, without needing to write complex code logic:

#### Match Field (Config Key)
- Specifies which field of the asset entity to match. Examples: `subDomain`, `ip`, `url`, `title`, `service`, `product`, etc.
- Supports comma-separated **multi-field matching (OR relation)**. For example, if `config_key` is `url,subDomain`, as long as any one of these field values matches the rule value, the match is triggered.
- **If left empty**: The system will automatically attempt matching against **all core fields** of the asset type (e.g. for IP type: `ip`, `isp`, `country`, `province`, etc.).

#### Match Algorithm (Matcher Type)
Rules support the following 6 match algorithms when comparing field values:

| Match Type (Matcher Type) | Logic | Sample Match Value (Matcher Value) |
|------------------------|----------|----------------------------|
| **EXACT** | Exact equality match (case-insensitive) | `dev-api` |
| **PREFIX** | Prefix match | `dev-` |
| **SUFFIX** / **DOMAIN_SUFFIX** | Suffix/domain suffix match (automatically adapts leading `.`) | `.gov.cn` / `baidu.com` |
| **CONTAINS** | Contains substring match | `staging` |
| **REGEX** | Complex Java regex match | `^test-[0-9]+\.domain\.com$` |
| **CIDR** | CIDR network range validation (only used for IP asset related field matching) | `192.168.1.0/24` / `10.0.0.0/8` |

### Rule Configuration Best Practices

#### 🚨 Block Internal/Private Assets from Being Saved
To prevent non-compliant internal IP addresses from being automatically saved to the system, configure a blacklist block:
- **Rule Type**: `ACCESS_RULE` (BLACKLIST) | **Config Key**: `ip` | **Matcher Type**: `CIDR` | **Matcher Value**: `10.0.0.0/8` (or `192.168.0.0/16`)

#### 🏷️ Auto-Tag High-Risk Ports
- **Rule Type**: `AUTO_TAG` | **Config Key**: `port` | **Matcher Type**: `REGEX` | **Matcher Value**: `^(22|3389|3306|6379|27017)$` | **Assigned Tags**: `High-Risk Exposed Port`

#### 🏢 Auto-Assign Asset Owner
- **Rule Type**: `OWNERSHIP` | **Config Key**: `subDomain` | **Matcher Type**: `PREFIX` | **Matcher Value**: `dev-` | **Effect Parameters**: Configure Owner as `dev-team` and assign to a specific project.

---

## 2. Root Domain Suffixes

### Function Background
When a distributed client discovers new subdomains (e.g., `mail.example.com.cn`) and reports them, the system needs to automatically extract their **Primary Domain** (e.g., `example.com.cn`).
Stripping only the last segment can incorrectly resolve the domain as `com.cn`.

### Configuration Effect
The system uses the global **Root Domain Suffix Suffix Dictionary** for splitting:
- Admins configure and enable various domain suffixes (e.g., `com.cn`, `edu.cn`, `net.cn`, `gov.cn`) in the **"Root Domain"** configuration;
- The backend automatically queries active (`ACTIVE`) suffixes to guarantee the accuracy of parent domain extraction.

---

## 3. Custom Fields

### Function Background
Beyond system-defined fields, organizations often need to extend asset schemas with custom metadata (e.g., mapping a subdomain's "business line importance" or tagging an IP's "security level").

### Supported Field Types
In the **"Custom Fields"** view, users can declare custom attributes for any of the 8 core assets:
- **STRING**: Single-line text input;
- **TEXT / URL**: Multi-line textbox, ideal for notes or external links;
- **NUMBER**: Numeric input with min/max validation;
- **SELECT / MULTI_SELECT**: Dropdown selection menu. Options must be structured as a valid JSON array, e.g.: `[{"label": "High", "value": "high"}, {"label": "Normal", "value": "normal"}]`;
- **DATE**: Date/time selector (precise to seconds);
- **CHECKBOX**: Boolean toggles/switches.

### Integration Behavior
* **Dynamic Form Rendering**: Once a custom field definition is saved and active (`ACTIVE`), edit modals for the corresponding asset dynamically append fields at the bottom.
* **List Views**: Custom columns are dynamically added to lists using `_cf_fieldName` as the key, supporting list sorting and advanced query filtering.

---

## 4. History Cleanup

### Function Background
Frequent scanning creates large volumes of asset change log rows (`testnet_asset_change_log`). To prevent database bloat, Admins can manage log lifecycles.

### Parameters
Control retention via **"History Cleanup"**:
- **Enabled (enabled)**: When active, a periodic background cleanup task runs;
- **Retention Days (retentionDays)**: Maximum logs retention (default: `90` days; older rows are permanently purged);
- **Cleanup Hour (cleanupHour)**: Scheduled hour for the task (defaults to `3` AM daily).

---

## 5. Vulnerability Categories

### Function Background
To standardize scan reports and ensure remediation recommendations are consistent across different PoC findings, TestNet provides a central vulnerability classification dictionary.

### Usage
Under **"Vulnerability Config"**:
- Admins add common categories (e.g., `SQL Injection`, `XSS`, `Unauthorized Access`);
- Pre-populate detailed **Remediation Recommendations (notes)**;
- When matching vulnerabilities are recorded, the default recommendations are automatically filled, reducing administrative overhead during reporting.

---

## 6. Notes

1. **Trigger Timing**: Asset configuration rules (`ACCESS_RULE`, `AUTO_TAG`, `OWNERSHIP`) **only trigger on first ingestion**. Modifying existing assets manually will not re-trigger rules to prevent overwriting manual adjustments.
2. **Rule Priority**: `ACCESS_RULE` (Blacklist/Whitelist blocks) holds the highest priority. If a save is blocked (`BLOCK`), subsequent auto-tagging or ownership assignments are aborted.
3. **Tag Dependencies**: Tags specified in tagging rules must first exist and be active in **"Tag Management"**, otherwise they will be ignored during matching.
