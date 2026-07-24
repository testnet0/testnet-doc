---
title: API Endpoint Index
description: API Endpoint Index
---

# TestNet API Endpoint Index

> Auto-generated from Spring controller annotations by `scripts/generate_api_index.py`.
> Re-run the script after adding or changing controller routes.

Total endpoints: 361

## /api/v1/asset

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/asset/api/add` | Add API asset | `asset/api/controller/AssetApiController.java` |
| `GET` | `/api/v1/asset/api/all` | Query all API assets (for dropdown) | `asset/api/controller/AssetApiController.java` |
| `POST` | `/api/v1/asset/api/batchAdd` | Batch add API | `asset/api/controller/AssetApiController.java` |
| `POST` | `/api/v1/asset/api/batchDelete` | Batch delete | `asset/api/controller/AssetApiController.java` |
| `POST` | `/api/v1/asset/api/batchUpdateStatus` | Batch update status | `asset/api/controller/AssetApiController.java` |
| `POST` | `/api/v1/asset/api/batchUpdateTag` | Batch update tags | `asset/api/controller/AssetApiController.java` |
| `DELETE` | `/api/v1/asset/api/delete` | Delete by ID | `asset/api/controller/AssetApiController.java` |
| `DELETE` | `/api/v1/asset/api/deleteBatch` | Batch delete | `asset/api/controller/AssetApiController.java` |
| `PUT` | `/api/v1/asset/api/edit` | Edit API asset | `asset/api/controller/AssetApiController.java` |
| `GET` | `/api/v1/asset/api/export` | Export API assets | `asset/api/controller/AssetApiController.java` |
| `POST` | `/api/v1/asset/api/import` | Import API assets | `asset/api/controller/AssetApiController.java` |
| `GET` | `/api/v1/asset/api/list` | Paginated API asset list | `asset/api/controller/AssetApiController.java` |
| `GET` | `/api/v1/asset/api/queryById` | Query by ID | `asset/api/controller/AssetApiController.java` |
| `GET` | `/api/v1/asset/api/tree` | Query API tree by webId (all) | `asset/api/controller/AssetApiController.java` |
| `GET` | `/api/v1/asset/api/tree/hierarchical` | Query API tree (hierarchical) | `asset/api/controller/AssetApiController.java` |
| `POST` | `/api/v1/asset/company/add` | Add company | `asset/company/controller/CompanyController.java` |
| `GET` | `/api/v1/asset/company/all` | Query all companies (for dropdown) | `asset/company/controller/CompanyController.java` |
| `POST` | `/api/v1/asset/company/batchAdd` | Batch add companies | `asset/company/controller/CompanyController.java` |
| `POST` | `/api/v1/asset/company/batchDelete` | Batch delete | `asset/company/controller/CompanyController.java` |
| `POST` | `/api/v1/asset/company/batchUpdateStatus` | Batch update status | `asset/company/controller/CompanyController.java` |
| `POST` | `/api/v1/asset/company/batchUpdateTag` | Batch update tags | `asset/company/controller/CompanyController.java` |
| `DELETE` | `/api/v1/asset/company/delete` | Delete by ID | `asset/company/controller/CompanyController.java` |
| `DELETE` | `/api/v1/asset/company/deleteBatch` | Batch delete | `asset/company/controller/CompanyController.java` |
| `PUT` | `/api/v1/asset/company/edit` | Edit company | `asset/company/controller/CompanyController.java` |
| `GET` | `/api/v1/asset/company/export` | Export company assets | `asset/company/controller/CompanyController.java` |
| `POST` | `/api/v1/asset/company/import` | Import company assets | `asset/company/controller/CompanyController.java` |
| `GET` | `/api/v1/asset/company/list` | Paginated company list | `asset/company/controller/CompanyController.java` |
| `GET` | `/api/v1/asset/company/queryById` | Query by ID | `asset/company/controller/CompanyController.java` |
| `POST` | `/api/v1/asset/config/add` | Add asset config | `asset/config/controller/AssetConfigController.java` |
| `GET` | `/api/v1/asset/config/all` | Query config list | `asset/config/controller/AssetConfigController.java` |
| `DELETE` | `/api/v1/asset/config/delete` | Delete asset config | `asset/config/controller/AssetConfigController.java` |
| `DELETE` | `/api/v1/asset/config/deleteBatch` | Batch delete asset configs | `asset/config/controller/AssetConfigController.java` |
| `PUT` | `/api/v1/asset/config/edit` | Edit asset config | `asset/config/controller/AssetConfigController.java` |
| `GET` | `/api/v1/asset/config/history-cleanup` | Get history cleanup config | `asset/config/controller/AssetConfigController.java` |
| `PUT` | `/api/v1/asset/config/history-cleanup` | Update history cleanup config | `asset/config/controller/AssetConfigController.java` |
| `POST` | `/api/v1/asset/config/history-cleanup/execute` | Execute history cleanup | `asset/config/controller/AssetConfigController.java` |
| `GET` | `/api/v1/asset/config/list` | Paginated asset config | `asset/config/controller/AssetConfigController.java` |
| `GET` | `/api/v1/asset/config/queryById` | Query config detail | `asset/config/controller/AssetConfigController.java` |
| `GET` | `/api/v1/asset/domain/all` | Query all domains (for dropdown) | `asset/domain/controller/DomainController.java` |
| `POST` | `/api/v1/asset/domain/batchAdd` | Batch add domains | `asset/domain/controller/DomainController.java` |
| `POST` | `/api/v1/asset/domain/batchDelete` | Batch delete | `asset/domain/controller/DomainController.java` |
| `POST` | `/api/v1/asset/domain/batchUpdateStatus` | Batch update status | `asset/domain/controller/DomainController.java` |
| `POST` | `/api/v1/asset/domain/batchUpdateTag` | Batch update tags | `asset/domain/controller/DomainController.java` |
| `DELETE` | `/api/v1/asset/domain/delete` | Delete by ID | `asset/domain/controller/DomainController.java` |
| `DELETE` | `/api/v1/asset/domain/deleteBatch` | Batch delete | `asset/domain/controller/DomainController.java` |
| `PUT` | `/api/v1/asset/domain/edit` | Edit domain | `asset/domain/controller/DomainController.java` |
| `GET` | `/api/v1/asset/domain/export` | Export domains | `asset/domain/controller/DomainController.java` |
| `POST` | `/api/v1/asset/domain/import` | Import domains | `asset/domain/controller/DomainController.java` |
| `GET` | `/api/v1/asset/domain/list` | Paginated domain list | `asset/domain/controller/DomainController.java` |
| `GET` | `/api/v1/asset/domain/queryById` | Query by ID | `asset/domain/controller/DomainController.java` |
| `GET` | `/api/v1/asset/history/detail` | Query single change detail | `common/history/controller/AssetChangeLogController.java` |
| `GET` | `/api/v1/asset/history/list` | Query asset change history | `common/history/controller/AssetChangeLogController.java` |
| `POST` | `/api/v1/asset/history/rollback` | Rollback asset to version | `common/history/controller/AssetChangeLogController.java` |
| `POST` | `/api/v1/asset/ip/add` | Add IP | `asset/ip/controller/AssetIpController.java` |
| `GET` | `/api/v1/asset/ip/all` | Query all IPs (for dropdown) | `asset/ip/controller/AssetIpController.java` |
| `POST` | `/api/v1/asset/ip/batchAdd` | Batch add IPs | `asset/ip/controller/AssetIpController.java` |
| `POST` | `/api/v1/asset/ip/batchDelete` | Batch delete | `asset/ip/controller/AssetIpController.java` |
| `POST` | `/api/v1/asset/ip/batchUpdateStatus` | Batch update status | `asset/ip/controller/AssetIpController.java` |
| `POST` | `/api/v1/asset/ip/batchUpdateTag` | Batch update tags | `asset/ip/controller/AssetIpController.java` |
| `DELETE` | `/api/v1/asset/ip/delete` | Delete by ID | `asset/ip/controller/AssetIpController.java` |
| `DELETE` | `/api/v1/asset/ip/deleteBatch` | Batch delete | `asset/ip/controller/AssetIpController.java` |
| `PUT` | `/api/v1/asset/ip/edit` | Edit IP | `asset/ip/controller/AssetIpController.java` |
| `GET` | `/api/v1/asset/ip/export` | Export IP assets | `asset/ip/controller/AssetIpController.java` |
| `POST` | `/api/v1/asset/ip/import` | Import IP assets | `asset/ip/controller/AssetIpController.java` |
| `GET` | `/api/v1/asset/ip/list` | Paginated IP list | `asset/ip/controller/AssetIpController.java` |
| `GET` | `/api/v1/asset/ip/queryById` | Query by ID | `asset/ip/controller/AssetIpController.java` |
| `POST` | `/api/v1/asset/ip/relatedSubdomains` | Batch query IP-related subdomains | `asset/ip/controller/AssetIpController.java` |
| `PUT` | `/api/v1/asset/ip/{ipId}/subdomains` | Update IP-related subdomains | `asset/ip/controller/AssetIpController.java` |
| `POST` | `/api/v1/asset/port/add` | Add port | `asset/port/controller/AssetPortController.java` |
| `GET` | `/api/v1/asset/port/all` | Query all ports (for dropdown) | `asset/port/controller/AssetPortController.java` |
| `POST` | `/api/v1/asset/port/batchAdd` | Batch add ports | `asset/port/controller/AssetPortController.java` |
| `POST` | `/api/v1/asset/port/batchDelete` | Batch delete | `asset/port/controller/AssetPortController.java` |
| `POST` | `/api/v1/asset/port/batchUpdateStatus` | Batch update status | `asset/port/controller/AssetPortController.java` |
| `POST` | `/api/v1/asset/port/batchUpdateTag` | Batch update tags | `asset/port/controller/AssetPortController.java` |
| `DELETE` | `/api/v1/asset/port/delete` | Delete by ID | `asset/port/controller/AssetPortController.java` |
| `DELETE` | `/api/v1/asset/port/deleteBatch` | Batch delete | `asset/port/controller/AssetPortController.java` |
| `PUT` | `/api/v1/asset/port/edit` | Edit port | `asset/port/controller/AssetPortController.java` |
| `GET` | `/api/v1/asset/port/export` | Export port assets | `asset/port/controller/AssetPortController.java` |
| `POST` | `/api/v1/asset/port/import` | Import port assets | `asset/port/controller/AssetPortController.java` |
| `GET` | `/api/v1/asset/port/list` | Paginated port list | `asset/port/controller/AssetPortController.java` |
| `GET` | `/api/v1/asset/port/queryById` | Query by ID | `asset/port/controller/AssetPortController.java` |
| `POST` | `/api/v1/asset/root_domain/add` | Add root domain | `asset/domain/controller/RootDomainController.java` |
| `DELETE` | `/api/v1/asset/root_domain/delete` | Delete by ID | `asset/domain/controller/RootDomainController.java` |
| `DELETE` | `/api/v1/asset/root_domain/deleteBatch` | Batch delete | `asset/domain/controller/RootDomainController.java` |
| `PUT` | `/api/v1/asset/root_domain/edit` | Edit root domain | `asset/domain/controller/RootDomainController.java` |
| `GET` | `/api/v1/asset/root_domain/list` | Paginated root domain list | `asset/domain/controller/RootDomainController.java` |
| `POST` | `/api/v1/asset/search/batch-import` | Batch multi-page import engine assets | `search/controller/AssetSearchController.java` |
| `POST` | `/api/v1/asset/search/batch-import/cancel/{taskId}` | Cancel ongoing batch import | `search/controller/AssetSearchController.java` |
| `GET` | `/api/v1/asset/search/batch-import/progress/{taskId}` | Query batch import progress | `search/controller/AssetSearchController.java` |
| `POST` | `/api/v1/asset/search/import` | Import selected engine assets | `search/controller/AssetSearchController.java` |
| `POST` | `/api/v1/asset/search/list` | Search external engine assets | `search/controller/AssetSearchController.java` |
| `GET` | `/api/v1/asset/stats` | Get asset total stats | `asset/controller/AssetStatsController.java` |
| `GET` | `/api/v1/asset/stats/detail` | Get asset detailed stats | `asset/controller/AssetStatsController.java` |
| `GET` | `/api/v1/asset/subdomain/all` | Query all subdomains (for dropdown) | `asset/subdomain/controller/SubDomainController.java` |
| `POST` | `/api/v1/asset/subdomain/batchAdd` | Batch add subdomains | `asset/subdomain/controller/SubDomainController.java` |
| `POST` | `/api/v1/asset/subdomain/batchDelete` | Batch delete | `asset/subdomain/controller/SubDomainController.java` |
| `POST` | `/api/v1/asset/subdomain/batchUpdateStatus` | Batch update status | `asset/subdomain/controller/SubDomainController.java` |
| `POST` | `/api/v1/asset/subdomain/batchUpdateTag` | Batch update tags | `asset/subdomain/controller/SubDomainController.java` |
| `DELETE` | `/api/v1/asset/subdomain/delete` | Delete by ID | `asset/subdomain/controller/SubDomainController.java` |
| `DELETE` | `/api/v1/asset/subdomain/deleteBatch` | Batch delete | `asset/subdomain/controller/SubDomainController.java` |
| `PUT` | `/api/v1/asset/subdomain/edit` | Edit subdomain | `asset/subdomain/controller/SubDomainController.java` |
| `GET` | `/api/v1/asset/subdomain/export` | Export subdomain assets | `asset/subdomain/controller/SubDomainController.java` |
| `POST` | `/api/v1/asset/subdomain/import` | Import subdomain assets | `asset/subdomain/controller/SubDomainController.java` |
| `GET` | `/api/v1/asset/subdomain/list` | Paginated subdomain list | `asset/subdomain/controller/SubDomainController.java` |
| `GET` | `/api/v1/asset/subdomain/queryById` | Query by ID | `asset/subdomain/controller/SubDomainController.java` |
| `POST` | `/api/v1/asset/subdomain/relatedIps` | Batch query subdomain-related IPs | `asset/subdomain/controller/SubDomainController.java` |
| `PUT` | `/api/v1/asset/subdomain/{subdomainId}/ips` | Update subdomain-related IPs | `asset/subdomain/controller/SubDomainController.java` |
| `POST` | `/api/v1/asset/vul/add` | Add vulnerability | `asset/vul/controller/AssetVulController.java` |
| `POST` | `/api/v1/asset/vul/batchDelete` | Batch delete | `asset/vul/controller/AssetVulController.java` |
| `POST` | `/api/v1/asset/vul/batchUpdateStatus` | Batch update status | `asset/vul/controller/AssetVulController.java` |
| `POST` | `/api/v1/asset/vul/batchUpdateTag` | Batch update tags | `asset/vul/controller/AssetVulController.java` |
| `DELETE` | `/api/v1/asset/vul/delete` | Delete by ID | `asset/vul/controller/AssetVulController.java` |
| `DELETE` | `/api/v1/asset/vul/deleteBatch` | Batch delete | `asset/vul/controller/AssetVulController.java` |
| `PUT` | `/api/v1/asset/vul/edit` | Edit vulnerability | `asset/vul/controller/AssetVulController.java` |
| `GET` | `/api/v1/asset/vul/export` | Export vulnerability assets | `asset/vul/controller/AssetVulController.java` |
| `POST` | `/api/v1/asset/vul/import` | Import vulnerability assets | `asset/vul/controller/AssetVulController.java` |
| `GET` | `/api/v1/asset/vul/list` | Paginated vulnerability list | `asset/vul/controller/AssetVulController.java` |
| `GET` | `/api/v1/asset/vul/queryById` | Query by ID | `asset/vul/controller/AssetVulController.java` |
| `POST` | `/api/v1/asset/web/add` | Add Web asset | `asset/web/controller/AssetWebController.java` |
| `GET` | `/api/v1/asset/web/all` | Query all Web assets (for dropdown) | `asset/web/controller/AssetWebController.java` |
| `POST` | `/api/v1/asset/web/batchAdd` | Batch add Web assets | `asset/web/controller/AssetWebController.java` |
| `POST` | `/api/v1/asset/web/batchDelete` | Batch delete | `asset/web/controller/AssetWebController.java` |
| `POST` | `/api/v1/asset/web/batchUpdateStatus` | Batch update status | `asset/web/controller/AssetWebController.java` |
| `POST` | `/api/v1/asset/web/batchUpdateTag` | Batch update tags | `asset/web/controller/AssetWebController.java` |
| `DELETE` | `/api/v1/asset/web/delete` | Delete by ID | `asset/web/controller/AssetWebController.java` |
| `DELETE` | `/api/v1/asset/web/deleteBatch` | Batch delete | `asset/web/controller/AssetWebController.java` |
| `PUT` | `/api/v1/asset/web/edit` | Edit Web asset | `asset/web/controller/AssetWebController.java` |
| `GET` | `/api/v1/asset/web/export` | Export Web assets | `asset/web/controller/AssetWebController.java` |
| `POST` | `/api/v1/asset/web/import` | Import Web assets | `asset/web/controller/AssetWebController.java` |
| `GET` | `/api/v1/asset/web/list` | Paginated Web asset list | `asset/web/controller/AssetWebController.java` |
| `GET` | `/api/v1/asset/web/queryById` | Query by ID | `asset/web/controller/AssetWebController.java` |

## /api/v1/auth

| Method | Path | Summary | Controller |
|---|---|---|---|
| `GET` | `/api/v1/auth/info` | - | `system/controller/AuthController.java` |
| `POST` | `/api/v1/auth/login` | - | `system/controller/AuthController.java` |
| `POST` | `/api/v1/auth/logout` | - | `system/controller/AuthController.java` |
| `POST` | `/api/v1/auth/refreshToken` | - | `system/controller/AuthController.java` |

## /api/v1/client

| Method | Path | Summary | Controller |
|---|---|---|---|
| `GET` | `/api/v1/client/all` | Query all nodes | `client/controller/ClientController.java` |
| `GET` | `/api/v1/client/config-file/{id}/download` | Client download config file | `client/controller/ClientConfigFileController.java` |
| `GET` | `/api/v1/client/config-file/{id}/fetch` | Client fetch config (with hash) | `client/controller/ClientConfigFileController.java` |
| `DELETE` | `/api/v1/client/delete` | Delete node by ID | `client/controller/ClientController.java` |
| `DELETE` | `/api/v1/client/deleteBatch` | Batch delete nodes | `client/controller/ClientController.java` |
| `POST` | `/api/v1/client/heartbeat` | Node heartbeat report | `client/controller/ClientController.java` |
| `GET` | `/api/v1/client/list` | Paginated node list | `client/controller/ClientController.java` |
| `POST` | `/api/v1/client/offline` | Node offline (client call) | `client/controller/ClientController.java` |
| `GET` | `/api/v1/client/queryById` | Query by ID | `client/controller/ClientController.java` |
| `POST` | `/api/v1/client/register` | Node registration (client call) | `client/controller/ClientController.java` |
| `GET` | `/api/v1/client/storage/policy` | - | `client/controller/ClientStoragePolicyController.java` |
| `GET` | `/api/v1/client/task/poll` | Client long-polling task fetch | `task/controller/ClientTaskController.java` |
| `GET` | `/api/v1/client/task/pull` | Client pull assigned task | `task/controller/ClientTaskController.java` |
| `POST` | `/api/v1/client/task/start` | Client confirm task start | `task/controller/ClientTaskController.java` |
| `POST` | `/api/v1/client/task/{taskId}/log` | Client incremental log report | `task/controller/ClientTaskController.java` |
| `POST` | `/api/v1/client/task/{taskId}/report` | Client report final task result | `task/controller/ClientTaskController.java` |
| `POST` | `/api/v1/client/task/{taskId}/report-with-files` | Client report result with file upload | `task/controller/ClientTaskController.java` |
| `PUT` | `/api/v1/client/update` | Update node info/config | `client/controller/ClientController.java` |

## /api/v1/common

| Method | Path | Summary | Controller |
|---|---|---|---|
| `GET` | `/api/v1/common/file/download/{fileId}` | - | `common/file/controller/FileUploadController.java` |
| `POST` | `/api/v1/common/file/report` | - | `common/file/controller/FileUploadController.java` |
| `POST` | `/api/v1/common/file/upload` | - | `common/file/controller/FileUploadController.java` |
| `GET` | `/api/v1/common/file/view/{fileId}` | - | `common/file/controller/FileUploadController.java` |

## /api/v1/config-file

| Method | Path | Summary | Controller |
|---|---|---|---|
| `DELETE` | `/api/v1/config-file/batch` | Batch delete config files | `configfile/controller/ConfigFileController.java` |
| `GET` | `/api/v1/config-file/list` | Config file list | `configfile/controller/ConfigFileController.java` |
| `POST` | `/api/v1/config-file/tool-bind` | Bind config file to tool | `configfile/controller/ConfigFileController.java` |
| `DELETE` | `/api/v1/config-file/tool-bind/{id}` | Unbind tool config file | `configfile/controller/ConfigFileController.java` |
| `GET` | `/api/v1/config-file/tool/{toolId}` | Get tool config file list | `configfile/controller/ConfigFileController.java` |
| `POST` | `/api/v1/config-file/upload` | Upload config file | `configfile/controller/ConfigFileController.java` |
| `DELETE` | `/api/v1/config-file/{id}` | Delete config file | `configfile/controller/ConfigFileController.java` |
| `GET` | `/api/v1/config-file/{id}` | Get config file detail | `configfile/controller/ConfigFileController.java` |
| `PUT` | `/api/v1/config-file/{id}` | Update config file metadata | `configfile/controller/ConfigFileController.java` |
| `PUT` | `/api/v1/config-file/{id}/content` | Update config file content | `configfile/controller/ConfigFileController.java` |
| `GET` | `/api/v1/config-file/{id}/download` | Download config file | `configfile/controller/ConfigFileController.java` |
| `GET` | `/api/v1/config-file/{id}/preview` | Preview config file content | `configfile/controller/ConfigFileController.java` |

## /api/v1/dsl

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/dsl/preview/{toolIdentifier}` | Preview ExecutionSpec | `dsl/controller/DslController.java` |
| `POST` | `/api/v1/dsl/preview/{toolIdentifier}/batch` | Preview batch ExecutionSpec | `dsl/controller/DslController.java` |
| `POST` | `/api/v1/dsl/vnext/tool/parse` | Parse vNext Tool DSL | `dsl/vnext/controller/VNextDslController.java` |
| `POST` | `/api/v1/dsl/vnext/tool/validate` | Validate vNext Tool DSL | `dsl/vnext/controller/VNextDslController.java` |
| `POST` | `/api/v1/dsl/vnext/workflow/compile` | Compile vNext Workflow to ExecutionPlan | `dsl/vnext/controller/VNextDslController.java` |
| `POST` | `/api/v1/dsl/vnext/workflow/parse` | Parse vNext Workflow DSL | `dsl/vnext/controller/VNextDslController.java` |
| `POST` | `/api/v1/dsl/vnext/workflow/validate` | Validate vNext Workflow DSL | `dsl/vnext/controller/VNextDslController.java` |

## /api/v1/license

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/license/activate` | Activate license | `license/LicenseController.java` |
| `GET` | `/api/v1/license/info` | Get license info | `license/LicenseController.java` |
| `GET` | `/api/v1/license/machine-id` | Get machine ID | `license/LicenseController.java` |

## /api/v1/mock

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/mock/execution-spec/dry-run` | Tool Spec Dry-Run | `mock/controller/MockExecutionController.java` |
| `POST` | `/api/v1/mock/generate-output` | Generate mock output | `mock/controller/MockExecutionController.java` |
| `POST` | `/api/v1/mock/tool/{toolId}/dry-run` | Tool Dry-Run | `mock/controller/MockExecutionController.java` |
| `POST` | `/api/v1/mock/workflow/dry-run` | Workflow Dry-Run | `mock/controller/MockExecutionController.java` |

## /api/v1/mock-files

| Method | Path | Summary | Controller |
|---|---|---|---|
| `GET` | `/api/v1/mock-files` | List mock files | `mock/controller/MockFileController.java` |
| `POST` | `/api/v1/mock-files` | Create mock file | `mock/controller/MockFileController.java` |
| `GET` | `/api/v1/mock-files/by-tool/{toolId}` | Get mock files by tool ID | `mock/controller/MockFileController.java` |
| `POST` | `/api/v1/mock-files/upload` | Upload mock file | `mock/controller/MockFileController.java` |
| `DELETE` | `/api/v1/mock-files/{id}` | Delete mock file | `mock/controller/MockFileController.java` |
| `GET` | `/api/v1/mock-files/{id}` | Get mock file detail | `mock/controller/MockFileController.java` |
| `PUT` | `/api/v1/mock-files/{id}` | Update mock file | `mock/controller/MockFileController.java` |
| `GET` | `/api/v1/mock-files/{id}/download` | Download mock file | `mock/controller/MockFileController.java` |

## /api/v1/notification

| Method | Path | Summary | Controller |
|---|---|---|---|
| `GET` | `/api/v1/notification/list` | Get notification list | `notification/controller/NotificationController.java` |
| `POST` | `/api/v1/notification/read-all` | Mark all as read | `notification/controller/NotificationController.java` |
| `POST` | `/api/v1/notification/read/{id}` | Mark notification as read | `notification/controller/NotificationController.java` |
| `GET` | `/api/v1/notification/unread-count` | Get unread count | `notification/controller/NotificationController.java` |
| `DELETE` | `/api/v1/notification/{id}` | Delete notification | `notification/controller/NotificationController.java` |

## /api/v1/project

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/project/add` | Add project | `project/controller/ProjectController.java` |
| `GET` | `/api/v1/project/all` | Query all projects (for dropdown) | `project/controller/ProjectController.java` |
| `DELETE` | `/api/v1/project/delete` | Delete by ID | `project/controller/ProjectController.java` |
| `DELETE` | `/api/v1/project/deleteBatch` | Batch delete | `project/controller/ProjectController.java` |
| `PUT` | `/api/v1/project/edit` | Edit project | `project/controller/ProjectController.java` |
| `GET` | `/api/v1/project/list` | Paginated project list | `project/controller/ProjectController.java` |
| `GET` | `/api/v1/project/queryById` | Query by ID | `project/controller/ProjectController.java` |

## /api/v1/registry

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/registry/cache/clear` | Clear registry cache | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/check-updates` | Check all updates | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/config` | Get registry config | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/config` | Save registry config | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/config/test` | Test registry connection | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/installed/tools` | Installed tools list | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/installed/workflows` | Installed workflows list | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/tools/check-updates/{toolId}` | Check tool updates | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/tools/install/{toolId}` | Install tool | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/tools/installBatch` | Batch install tools | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/tools/remote` | Get remote tool list | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/tools/remote/{toolId}` | Get remote tool detail | `workflow/registry/PackageRegistryController.java` |
| `DELETE` | `/api/v1/registry/tools/uninstall/{toolId}` | Uninstall tool | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/tools/update/{toolId}` | Update tool | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/workflows/check-updates/{workflowId}` | Check workflow updates | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/workflows/install/{workflowId}` | Install workflow | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/workflows/installBatch` | Batch install workflows | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/workflows/remote` | Get remote workflow list | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/workflows/remote/{workflowId}` | Get remote workflow detail | `workflow/registry/PackageRegistryController.java` |
| `DELETE` | `/api/v1/registry/workflows/uninstall/{workflowId}` | Uninstall workflow | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/workflows/update/{workflowId}` | Update workflow | `workflow/registry/PackageRegistryController.java` |

## /api/v1/search

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/search/engine/add` | Add engine config | `search/controller/AssetSearchEngineController.java` |
| `GET` | `/api/v1/search/engine/all` | Query all enabled engines | `search/controller/AssetSearchEngineController.java` |
| `DELETE` | `/api/v1/search/engine/delete` | Delete engine config | `search/controller/AssetSearchEngineController.java` |
| `DELETE` | `/api/v1/search/engine/deleteBatch` | Batch delete | `search/controller/AssetSearchEngineController.java` |
| `PUT` | `/api/v1/search/engine/edit` | Edit engine config | `search/controller/AssetSearchEngineController.java` |
| `GET` | `/api/v1/search/engine/list` | Paginated engine config | `search/controller/AssetSearchEngineController.java` |
| `GET` | `/api/v1/search/engine/queryById` | Query by ID | `search/controller/AssetSearchEngineController.java` |
| `POST` | `/api/v1/search/syntax/add` | Add syntax | `search/controller/SearchEngineSyntaxController.java` |
| `GET` | `/api/v1/search/syntax/all` | Query all syntax by engine | `search/controller/SearchEngineSyntaxController.java` |
| `DELETE` | `/api/v1/search/syntax/delete` | Delete syntax | `search/controller/SearchEngineSyntaxController.java` |
| `DELETE` | `/api/v1/search/syntax/deleteBatch` | Batch delete | `search/controller/SearchEngineSyntaxController.java` |
| `PUT` | `/api/v1/search/syntax/edit` | Edit syntax | `search/controller/SearchEngineSyntaxController.java` |
| `GET` | `/api/v1/search/syntax/list` | Paginated syntax list | `search/controller/SearchEngineSyntaxController.java` |
| `GET` | `/api/v1/search/syntax/queryById` | Query by ID | `search/controller/SearchEngineSyntaxController.java` |

## /api/v1/spec

| Method | Path | Summary | Controller |
|---|---|---|---|
| `GET` | `/api/v1/spec/tools/vnext/parsed` | Get all parsed vNext tool definitions | `workflow/editor/controller/SpecController.java` |

## /api/v1/system

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/system/config` | - | `system/controller/SysConfigController.java` |
| `PUT` | `/api/v1/system/config` | - | `system/controller/SysConfigController.java` |
| `POST` | `/api/v1/system/config/add` | - | `system/controller/SysConfigController.java` |
| `POST` | `/api/v1/system/config/batch-save` | - | `system/controller/SysConfigController.java` |
| `DELETE` | `/api/v1/system/config/delete` | - | `system/controller/SysConfigController.java` |
| `PUT` | `/api/v1/system/config/edit` | - | `system/controller/SysConfigController.java` |
| `POST` | `/api/v1/system/config/email/test` | - | `system/controller/SysConfigController.java` |
| `GET` | `/api/v1/system/config/list` | - | `system/controller/SysConfigController.java` |
| `GET` | `/api/v1/system/config/page` | - | `system/controller/SysConfigController.java` |
| `GET` | `/api/v1/system/config/queryById` | - | `system/controller/SysConfigController.java` |
| `POST` | `/api/v1/system/config/refresh` | - | `system/controller/SysConfigController.java` |
| `POST` | `/api/v1/system/config/storage/test` | - | `system/controller/SysConfigController.java` |
| `DELETE` | `/api/v1/system/config/{id}` | - | `system/controller/SysConfigController.java` |
| `GET` | `/api/v1/system/config/{id}` | - | `system/controller/SysConfigController.java` |
| `POST` | `/api/v1/system/department` | - | `system/controller/SysDepartmentController.java` |
| `PUT` | `/api/v1/system/department` | - | `system/controller/SysDepartmentController.java` |
| `POST` | `/api/v1/system/department/add` | - | `system/controller/SysDepartmentController.java` |
| `GET` | `/api/v1/system/department/all` | - | `system/controller/SysDepartmentController.java` |
| `GET` | `/api/v1/system/department/children` | - | `system/controller/SysDepartmentController.java` |
| `DELETE` | `/api/v1/system/department/delete` | - | `system/controller/SysDepartmentController.java` |
| `PUT` | `/api/v1/system/department/edit` | - | `system/controller/SysDepartmentController.java` |
| `GET` | `/api/v1/system/department/list` | - | `system/controller/SysDepartmentController.java` |
| `GET` | `/api/v1/system/department/queryById` | - | `system/controller/SysDepartmentController.java` |
| `GET` | `/api/v1/system/department/tree` | - | `system/controller/SysDepartmentController.java` |
| `DELETE` | `/api/v1/system/department/{id}` | - | `system/controller/SysDepartmentController.java` |
| `GET` | `/api/v1/system/department/{id}` | - | `system/controller/SysDepartmentController.java` |
| `POST` | `/api/v1/system/permission` | - | `system/controller/SysPermissionController.java` |
| `PUT` | `/api/v1/system/permission` | - | `system/controller/SysPermissionController.java` |
| `POST` | `/api/v1/system/permission/add` | - | `system/controller/SysPermissionController.java` |
| `GET` | `/api/v1/system/permission/all` | - | `system/controller/SysPermissionController.java` |
| `DELETE` | `/api/v1/system/permission/delete` | - | `system/controller/SysPermissionController.java` |
| `PUT` | `/api/v1/system/permission/edit` | - | `system/controller/SysPermissionController.java` |
| `GET` | `/api/v1/system/permission/list` | - | `system/controller/SysPermissionController.java` |
| `GET` | `/api/v1/system/permission/menu/{menuId}` | - | `system/controller/SysPermissionController.java` |
| `GET` | `/api/v1/system/permission/queryById` | - | `system/controller/SysPermissionController.java` |
| `GET` | `/api/v1/system/permission/role/{roleId}` | - | `system/controller/SysPermissionController.java` |
| `GET` | `/api/v1/system/permission/tree` | - | `system/controller/SysPermissionController.java` |
| `GET` | `/api/v1/system/permission/user/{userId}` | - | `system/controller/SysPermissionController.java` |
| `DELETE` | `/api/v1/system/permission/{id}` | - | `system/controller/SysPermissionController.java` |
| `GET` | `/api/v1/system/permission/{id}` | - | `system/controller/SysPermissionController.java` |
| `POST` | `/api/v1/system/role` | - | `system/controller/SysRoleController.java` |
| `PUT` | `/api/v1/system/role` | - | `system/controller/SysRoleController.java` |
| `POST` | `/api/v1/system/role/add` | - | `system/controller/SysRoleController.java` |
| `GET` | `/api/v1/system/role/all` | - | `system/controller/SysRoleController.java` |
| `POST` | `/api/v1/system/role/assignPermissions` | - | `system/controller/SysRoleController.java` |
| `DELETE` | `/api/v1/system/role/delete` | - | `system/controller/SysRoleController.java` |
| `PUT` | `/api/v1/system/role/edit` | - | `system/controller/SysRoleController.java` |
| `GET` | `/api/v1/system/role/list` | - | `system/controller/SysRoleController.java` |
| `GET` | `/api/v1/system/role/permissions/{roleId}` | - | `system/controller/SysRoleController.java` |
| `GET` | `/api/v1/system/role/queryById` | - | `system/controller/SysRoleController.java` |
| `GET` | `/api/v1/system/role/users/{roleId}` | - | `system/controller/SysRoleController.java` |
| `DELETE` | `/api/v1/system/role/{id}` | - | `system/controller/SysRoleController.java` |
| `GET` | `/api/v1/system/role/{id}` | - | `system/controller/SysRoleController.java` |
| `POST` | `/api/v1/system/user` | - | `system/controller/SysUserController.java` |
| `PUT` | `/api/v1/system/user` | - | `system/controller/SysUserController.java` |
| `POST` | `/api/v1/system/user/add` | - | `system/controller/SysUserController.java` |
| `GET` | `/api/v1/system/user/all` | - | `system/controller/SysUserController.java` |
| `POST` | `/api/v1/system/user/assignRoles` | - | `system/controller/SysUserController.java` |
| `DELETE` | `/api/v1/system/user/delete` | - | `system/controller/SysUserController.java` |
| `PUT` | `/api/v1/system/user/edit` | - | `system/controller/SysUserController.java` |
| `GET` | `/api/v1/system/user/list` | - | `system/controller/SysUserController.java` |
| `GET` | `/api/v1/system/user/queryById` | - | `system/controller/SysUserController.java` |
| `POST` | `/api/v1/system/user/resetPwd/{id}` | - | `system/controller/SysUserController.java` |
| `GET` | `/api/v1/system/user/roles/{userId}` | - | `system/controller/SysUserController.java` |
| `POST` | `/api/v1/system/user/status/{id}` | - | `system/controller/SysUserController.java` |
| `DELETE` | `/api/v1/system/user/{id}` | - | `system/controller/SysUserController.java` |
| `GET` | `/api/v1/system/user/{id}` | - | `system/controller/SysUserController.java` |
| `PUT` | `/api/v1/system/user/{id}` | - | `system/controller/SysUserController.java` |

## /api/v1/task

| Method | Path | Summary | Controller |
|---|---|---|---|
| `DELETE` | `/api/v1/task/delete` | Delete task record by ID | `task/controller/AssetTaskController.java` |
| `DELETE` | `/api/v1/task/deleteBatch` | Batch delete task records | `task/controller/AssetTaskController.java` |
| `GET` | `/api/v1/task/list` | Paginated task list | `task/controller/AssetTaskController.java` |
| `GET` | `/api/v1/task/queryById` | Query by ID | `task/controller/AssetTaskController.java` |
| `GET` | `/api/v1/task/{id}/logs` | Query task execution logs | `task/controller/AssetTaskController.java` |
| `POST` | `/api/v1/task/{id}/rerun` | Re-run task | `task/controller/AssetTaskController.java` |

## /api/v1/test

| Method | Path | Summary | Controller |
|---|---|---|---|
| `GET` | `/api/v1/test/case/list` | List test cases | `test/controller/TestCaseController.java` |
| `POST` | `/api/v1/test/case/add` | Create test case | `test/controller/TestCaseController.java` |
| `POST` | `/api/v1/test/case/batchRun` | Batch run test cases | `test/controller/TestCaseController.java` |
| `DELETE` | `/api/v1/test/case/delete` | Delete test case | `test/controller/TestCaseController.java` |
| `GET` | `/api/v1/test/case/queryById` | Get test case detail | `test/controller/TestCaseController.java` |
| `PUT` | `/api/v1/test/case/edit` | Update test case | `test/controller/TestCaseController.java` |
| `POST` | `/api/v1/test/case/run` | Run test case | `test/controller/TestCaseController.java` |

## /api/v1/tool

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/tool/add` | Add tool | `tool/controller/ClientToolController.java` |
| `GET` | `/api/v1/tool/all` | Query all tools | `tool/controller/ClientToolController.java` |
| `POST` | `/api/v1/tool/batchRunTool` | Batch run tool | `tool/controller/ClientToolRunController.java` |
| `GET` | `/api/v1/tool/byType` | Query tools by type | `tool/controller/ClientToolController.java` |
| `POST` | `/api/v1/tool/copy` | Copy tool | `tool/controller/ClientToolController.java` |
| `DELETE` | `/api/v1/tool/delete` | Delete by ID | `tool/controller/ClientToolController.java` |
| `DELETE` | `/api/v1/tool/deleteBatch` | Batch delete | `tool/controller/ClientToolController.java` |
| `PUT` | `/api/v1/tool/edit` | Edit tool | `tool/controller/ClientToolController.java` |
| `POST` | `/api/v1/tool/importYaml` | Import local YAML tool | `tool/controller/ClientToolController.java` |
| `GET` | `/api/v1/tool/list` | Paginated tool list | `tool/controller/ClientToolController.java` |
| `POST` | `/api/v1/tool/parser/preview` | Parse preview | `tool/controller/ToolTestController.java` |
| `GET` | `/api/v1/tool/parser/types` | Get supported parser types | `tool/controller/ToolTestController.java` |
| `POST` | `/api/v1/tool/preview-targets` | Preview targetResolver results | `tool/controller/ClientToolController.java` |
| `GET` | `/api/v1/tool/queryById` | Query by ID | `tool/controller/ClientToolController.java` |
| `POST` | `/api/v1/tool/runForAsset` | Run tool for single asset | `tool/controller/ClientToolRunController.java` |
| `POST` | `/api/v1/tool/test` | Test config (no save) | `tool/controller/ToolTestController.java` |
| `POST` | `/api/v1/tool/validate` | Validate tool config | `tool/controller/ClientToolController.java` |
| `POST` | `/api/v1/tool/validateYaml` | Validate YAML config | `tool/controller/ClientToolController.java` |
| `POST` | `/api/v1/tool/{id}/test` | Test tool config | `tool/controller/ToolTestController.java` |
| `GET` | `/api/v1/tool/{id}/validate` | Validate specified tool config | `tool/controller/ClientToolController.java` |

## /api/v1/workflow

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/workflow/add` | Add workflow | `workflow/controller/ScanWorkflowController.java` |
| `GET` | `/api/v1/workflow/all` | Query all workflows | `workflow/controller/ScanWorkflowController.java` |
| `POST` | `/api/v1/workflow/batchRunWorkflow` | Batch run workflow | `workflow/controller/ScanWorkflowController.java` |
| `POST` | `/api/v1/workflow/copy` | Copy workflow | `workflow/controller/ScanWorkflowController.java` |
| `DELETE` | `/api/v1/workflow/delete` | Delete workflow | `workflow/controller/ScanWorkflowController.java` |
| `DELETE` | `/api/v1/workflow/deleteBatch` | Batch delete | `workflow/controller/ScanWorkflowController.java` |
| `PUT` | `/api/v1/workflow/edit` | Edit workflow | `workflow/controller/ScanWorkflowController.java` |
| `POST` | `/api/v1/workflow/importYaml` | Import local YAML workflow | `workflow/controller/ScanWorkflowController.java` |
| `GET` | `/api/v1/workflow/list` | Paginated workflow list | `workflow/controller/ScanWorkflowController.java` |
| `GET` | `/api/v1/workflow/queryById` | Query workflow by ID | `workflow/controller/ScanWorkflowController.java` |
| `POST` | `/api/v1/workflow/runForAsset` | Run workflow for single asset | `workflow/controller/ScanWorkflowController.java` |
| `POST` | `/api/v1/workflow/runNow` | Manually trigger workflow | `workflow/controller/ScanWorkflowController.java` |
| `GET` | `/api/v1/workflow/runs` | Query workflow run batch summary | `workflow/controller/ScanWorkflowController.java` |
| `GET` | `/api/v1/workflow/runs/{runId}/nodes` | Query run batch node details | `workflow/controller/ScanWorkflowController.java` |
| `GET` | `/api/v1/workflow/runs/{runId}/tasks` | Query run batch task details | `workflow/controller/ScanWorkflowController.java` |
| `POST` | `/api/v1/workflow/validate` | Validate workflow config | `workflow/controller/ScanWorkflowController.java` |

## /mcp

| Method | Path | Summary | Controller |
|---|---|---|---|
| `GET` | `/mcp/v1/prompts` | Get MCP prompts list | `ai/controller/McpController.java` |
| `GET` | `/mcp/v1/resources` | Get MCP resources list | `ai/controller/McpController.java` |
| `GET` | `/mcp/v1/resources/read` | Read MCP resource | `ai/controller/McpController.java` |
| `GET` | `/mcp/v1/tools` | Get MCP tools list | `ai/controller/McpController.java` |
| `POST` | `/mcp/v1/tools/call` | Call MCP tool | `ai/controller/McpController.java` |

::: tip Auto-generated
This index is auto-extracted from backend Controller annotations by `scripts/generate_api_index.py`. Re-run the script after adding or modifying routes to update this page.
:::
