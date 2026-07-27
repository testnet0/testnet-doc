---
title: API 端点索引
description: API 端点索引
---

# TestNet API 端点索引

> 本索引手工维护，涵盖所有 Spring Controller 暴露的 REST 端点。
> 新增或修改 Controller 路由后请同步更新本表。

总端点数：361

## /api/v1/asset

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/asset/api/add` | 新增 API 资产 | `asset/api/controller/AssetApiController.java` |
| `GET` | `/api/v1/asset/api/all` | 查询所有 API 资产 (用于下拉列表) | `asset/api/controller/AssetApiController.java` |
| `POST` | `/api/v1/asset/api/batchAdd` | 批量新增 API | `asset/api/controller/AssetApiController.java` |
| `POST` | `/api/v1/asset/api/batchDelete` | 批量删除 | `asset/api/controller/AssetApiController.java` |
| `POST` | `/api/v1/asset/api/batchUpdateStatus` | 批量修改状态 | `asset/api/controller/AssetApiController.java` |
| `POST` | `/api/v1/asset/api/batchUpdateTag` | 批量修改标签 | `asset/api/controller/AssetApiController.java` |
| `DELETE` | `/api/v1/asset/api/delete` | 通过ID删除 | `asset/api/controller/AssetApiController.java` |
| `DELETE` | `/api/v1/asset/api/deleteBatch` | 批量删除 | `asset/api/controller/AssetApiController.java` |
| `PUT` | `/api/v1/asset/api/edit` | 编辑 API 资产 | `asset/api/controller/AssetApiController.java` |
| `GET` | `/api/v1/asset/api/export` | 导出 API 资产 | `asset/api/controller/AssetApiController.java` |
| `POST` | `/api/v1/asset/api/import` | 导入 API 资产 | `asset/api/controller/AssetApiController.java` |
| `GET` | `/api/v1/asset/api/list` | 分页查询 API 资产列表 | `asset/api/controller/AssetApiController.java` |
| `GET` | `/api/v1/asset/api/queryById` | 通过ID查询详情 | `asset/api/controller/AssetApiController.java` |
| `GET` | `/api/v1/asset/api/tree` | 按 webId 查询 API 树（返回全部） | `asset/api/controller/AssetApiController.java` |
| `GET` | `/api/v1/asset/api/tree/hierarchical` | 查询 API 树（分层结构） | `asset/api/controller/AssetApiController.java` |
| `POST` | `/api/v1/asset/company/add` | 新增公司 | `asset/company/controller/CompanyController.java` |
| `GET` | `/api/v1/asset/company/all` | 查询所有公司 (用于下拉列表) | `asset/company/controller/CompanyController.java` |
| `POST` | `/api/v1/asset/company/batchAdd` | 批量新增公司 | `asset/company/controller/CompanyController.java` |
| `POST` | `/api/v1/asset/company/batchDelete` | 批量删除 | `asset/company/controller/CompanyController.java` |
| `POST` | `/api/v1/asset/company/batchUpdateStatus` | 批量修改状态 | `asset/company/controller/CompanyController.java` |
| `POST` | `/api/v1/asset/company/batchUpdateTag` | 批量修改标签 | `asset/company/controller/CompanyController.java` |
| `DELETE` | `/api/v1/asset/company/delete` | 通过ID删除 | `asset/company/controller/CompanyController.java` |
| `DELETE` | `/api/v1/asset/company/deleteBatch` | 批量删除 | `asset/company/controller/CompanyController.java` |
| `PUT` | `/api/v1/asset/company/edit` | 编辑公司 | `asset/company/controller/CompanyController.java` |
| `GET` | `/api/v1/asset/company/export` | 导出公司资产 | `asset/company/controller/CompanyController.java` |
| `POST` | `/api/v1/asset/company/import` | 导入公司资产 | `asset/company/controller/CompanyController.java` |
| `GET` | `/api/v1/asset/company/list` | 分页查询公司列表 | `asset/company/controller/CompanyController.java` |
| `GET` | `/api/v1/asset/company/queryById` | 通过ID查询详情 | `asset/company/controller/CompanyController.java` |
| `POST` | `/api/v1/asset/config/add` | 新增资产配置 | `asset/config/controller/AssetConfigController.java` |
| `GET` | `/api/v1/asset/config/all` | 查询配置列表 | `asset/config/controller/AssetConfigController.java` |
| `DELETE` | `/api/v1/asset/config/delete` | 删除资产配置 | `asset/config/controller/AssetConfigController.java` |
| `DELETE` | `/api/v1/asset/config/deleteBatch` | 批量删除资产配置 | `asset/config/controller/AssetConfigController.java` |
| `PUT` | `/api/v1/asset/config/edit` | 编辑资产配置 | `asset/config/controller/AssetConfigController.java` |
| `GET` | `/api/v1/asset/config/history-cleanup` | 获取历史清理配置 | `asset/config/controller/AssetConfigController.java` |
| `PUT` | `/api/v1/asset/config/history-cleanup` | 更新历史清理配置 | `asset/config/controller/AssetConfigController.java` |
| `POST` | `/api/v1/asset/config/history-cleanup/execute` | 立即执行历史清理 | `asset/config/controller/AssetConfigController.java` |
| `GET` | `/api/v1/asset/config/list` | 分页查询资产配置 | `asset/config/controller/AssetConfigController.java` |
| `GET` | `/api/v1/asset/config/queryById` | 查询配置详情 | `asset/config/controller/AssetConfigController.java` |
| `GET` | `/api/v1/asset/domain/all` | 查询所有主域名 (用于下拉列表) | `asset/domain/controller/DomainController.java` |
| `POST` | `/api/v1/asset/domain/batchAdd` | 批量新增主域名 | `asset/domain/controller/DomainController.java` |
| `POST` | `/api/v1/asset/domain/batchDelete` | 批量删除 | `asset/domain/controller/DomainController.java` |
| `POST` | `/api/v1/asset/domain/batchUpdateStatus` | 批量修改状态 | `asset/domain/controller/DomainController.java` |
| `POST` | `/api/v1/asset/domain/batchUpdateTag` | 批量修改标签 | `asset/domain/controller/DomainController.java` |
| `DELETE` | `/api/v1/asset/domain/delete` | 通过ID删除 | `asset/domain/controller/DomainController.java` |
| `DELETE` | `/api/v1/asset/domain/deleteBatch` | 批量删除 | `asset/domain/controller/DomainController.java` |
| `PUT` | `/api/v1/asset/domain/edit` | 编辑主域名 | `asset/domain/controller/DomainController.java` |
| `GET` | `/api/v1/asset/domain/export` | 导出主域名 | `asset/domain/controller/DomainController.java` |
| `POST` | `/api/v1/asset/domain/import` | 导入主域名 | `asset/domain/controller/DomainController.java` |
| `GET` | `/api/v1/asset/domain/list` | 分页查询主域名列表 | `asset/domain/controller/DomainController.java` |
| `GET` | `/api/v1/asset/domain/queryById` | 通过ID查询详情 | `asset/domain/controller/DomainController.java` |
| `GET` | `/api/v1/asset/history/detail` | 查询单条变更详情 | `common/history/controller/AssetChangeLogController.java` |
| `GET` | `/api/v1/asset/history/list` | 查询某资产的变更历史 | `common/history/controller/AssetChangeLogController.java` |
| `POST` | `/api/v1/asset/history/rollback` | 回滚资产到指定版本 | `common/history/controller/AssetChangeLogController.java` |
| `POST` | `/api/v1/asset/ip/add` | 新增IP | `asset/ip/controller/AssetIpController.java` |
| `GET` | `/api/v1/asset/ip/all` | 查询所有 IP (用于下拉列表) | `asset/ip/controller/AssetIpController.java` |
| `POST` | `/api/v1/asset/ip/batchAdd` | 批量新增 IP | `asset/ip/controller/AssetIpController.java` |
| `POST` | `/api/v1/asset/ip/batchDelete` | 批量删除 | `asset/ip/controller/AssetIpController.java` |
| `POST` | `/api/v1/asset/ip/batchUpdateStatus` | 批量修改状态 | `asset/ip/controller/AssetIpController.java` |
| `POST` | `/api/v1/asset/ip/batchUpdateTag` | 批量修改标签 | `asset/ip/controller/AssetIpController.java` |
| `DELETE` | `/api/v1/asset/ip/delete` | 通过ID删除 | `asset/ip/controller/AssetIpController.java` |
| `DELETE` | `/api/v1/asset/ip/deleteBatch` | 批量删除 | `asset/ip/controller/AssetIpController.java` |
| `PUT` | `/api/v1/asset/ip/edit` | 编辑 IP | `asset/ip/controller/AssetIpController.java` |
| `GET` | `/api/v1/asset/ip/export` | 导出IP资产 | `asset/ip/controller/AssetIpController.java` |
| `POST` | `/api/v1/asset/ip/import` | 导入IP资产 | `asset/ip/controller/AssetIpController.java` |
| `GET` | `/api/v1/asset/ip/list` | 分页查询 IP 列表 | `asset/ip/controller/AssetIpController.java` |
| `GET` | `/api/v1/asset/ip/queryById` | 通过ID查询详情 | `asset/ip/controller/AssetIpController.java` |
| `POST` | `/api/v1/asset/ip/relatedSubdomains` | 批量查询IP关联的子域名 | `asset/ip/controller/AssetIpController.java` |
| `PUT` | `/api/v1/asset/ip/{ipId}/subdomains` | 更新IP关联的子域名 | `asset/ip/controller/AssetIpController.java` |
| `POST` | `/api/v1/asset/port/add` | 新增端口 | `asset/port/controller/AssetPortController.java` |
| `GET` | `/api/v1/asset/port/all` | 查询所有端口 (用于下拉列表) | `asset/port/controller/AssetPortController.java` |
| `POST` | `/api/v1/asset/port/batchAdd` | 批量新增端口 | `asset/port/controller/AssetPortController.java` |
| `POST` | `/api/v1/asset/port/batchDelete` | 批量删除 | `asset/port/controller/AssetPortController.java` |
| `POST` | `/api/v1/asset/port/batchUpdateStatus` | 批量修改状态 | `asset/port/controller/AssetPortController.java` |
| `POST` | `/api/v1/asset/port/batchUpdateTag` | 批量修改标签 | `asset/port/controller/AssetPortController.java` |
| `DELETE` | `/api/v1/asset/port/delete` | 通过ID删除 | `asset/port/controller/AssetPortController.java` |
| `DELETE` | `/api/v1/asset/port/deleteBatch` | 批量删除 | `asset/port/controller/AssetPortController.java` |
| `PUT` | `/api/v1/asset/port/edit` | 编辑端口 | `asset/port/controller/AssetPortController.java` |
| `GET` | `/api/v1/asset/port/export` | 导出端口资产 | `asset/port/controller/AssetPortController.java` |
| `POST` | `/api/v1/asset/port/import` | 导入端口资产 | `asset/port/controller/AssetPortController.java` |
| `GET` | `/api/v1/asset/port/list` | 分页查询端口列表 | `asset/port/controller/AssetPortController.java` |
| `GET` | `/api/v1/asset/port/queryById` | 通过ID查询详情 | `asset/port/controller/AssetPortController.java` |
| `POST` | `/api/v1/asset/root_domain/add` | 新增顶级域名 | `asset/domain/controller/RootDomainController.java` |
| `DELETE` | `/api/v1/asset/root_domain/delete` | 通过ID删除 | `asset/domain/controller/RootDomainController.java` |
| `DELETE` | `/api/v1/asset/root_domain/deleteBatch` | 批量删除 | `asset/domain/controller/RootDomainController.java` |
| `PUT` | `/api/v1/asset/root_domain/edit` | 编辑顶级域名 | `asset/domain/controller/RootDomainController.java` |
| `GET` | `/api/v1/asset/root_domain/list` | 分页查询顶级域名列表 | `asset/domain/controller/RootDomainController.java` |
| `POST` | `/api/v1/asset/search/batch-import` | 批量多页导入引擎资产到项目 | `search/controller/AssetSearchController.java` |
| `POST` | `/api/v1/asset/search/batch-import/cancel/{taskId}` | 取消正在进行的批量导入任务 | `search/controller/AssetSearchController.java` |
| `GET` | `/api/v1/asset/search/batch-import/progress/{taskId}` | 查询批量导入进度 | `search/controller/AssetSearchController.java` |
| `POST` | `/api/v1/asset/search/import` | 导入选中的引擎资产到项目 | `search/controller/AssetSearchController.java` |
| `POST` | `/api/v1/asset/search/list` | 检索外部引擎资产 | `search/controller/AssetSearchController.java` |
| `GET` | `/api/v1/asset/stats` | 获取资产总数统计 | `asset/controller/AssetStatsController.java` |
| `GET` | `/api/v1/asset/stats/detail` | 获取资产深维度统计 | `asset/controller/AssetStatsController.java` |
| `GET` | `/api/v1/asset/subdomain/all` | 查询所有子域名 (用于下拉列表) | `asset/subdomain/controller/SubDomainController.java` |
| `POST` | `/api/v1/asset/subdomain/batchAdd` | 批量新增子域名 | `asset/subdomain/controller/SubDomainController.java` |
| `POST` | `/api/v1/asset/subdomain/batchDelete` | 批量删除 | `asset/subdomain/controller/SubDomainController.java` |
| `POST` | `/api/v1/asset/subdomain/batchUpdateStatus` | 批量修改状态 | `asset/subdomain/controller/SubDomainController.java` |
| `POST` | `/api/v1/asset/subdomain/batchUpdateTag` | 批量修改标签 | `asset/subdomain/controller/SubDomainController.java` |
| `DELETE` | `/api/v1/asset/subdomain/delete` | 通过ID删除 | `asset/subdomain/controller/SubDomainController.java` |
| `DELETE` | `/api/v1/asset/subdomain/deleteBatch` | 批量删除 | `asset/subdomain/controller/SubDomainController.java` |
| `PUT` | `/api/v1/asset/subdomain/edit` | 编辑子域名 | `asset/subdomain/controller/SubDomainController.java` |
| `GET` | `/api/v1/asset/subdomain/export` | 导出子域名资产 | `asset/subdomain/controller/SubDomainController.java` |
| `POST` | `/api/v1/asset/subdomain/import` | 导入子域名资产 | `asset/subdomain/controller/SubDomainController.java` |
| `GET` | `/api/v1/asset/subdomain/list` | 分页查询子域名列表 | `asset/subdomain/controller/SubDomainController.java` |
| `GET` | `/api/v1/asset/subdomain/queryById` | 通过ID查询详情 | `asset/subdomain/controller/SubDomainController.java` |
| `POST` | `/api/v1/asset/subdomain/relatedIps` | 批量查询子域名关联的IP | `asset/subdomain/controller/SubDomainController.java` |
| `PUT` | `/api/v1/asset/subdomain/{subdomainId}/ips` | 更新子域名关联的IP | `asset/subdomain/controller/SubDomainController.java` |
| `POST` | `/api/v1/asset/vul/add` | 新增漏洞 | `asset/vul/controller/AssetVulController.java` |
| `POST` | `/api/v1/asset/vul/batchDelete` | 批量删除 | `asset/vul/controller/AssetVulController.java` |
| `POST` | `/api/v1/asset/vul/batchUpdateStatus` | 批量修改状态 | `asset/vul/controller/AssetVulController.java` |
| `POST` | `/api/v1/asset/vul/batchUpdateTag` | 批量修改标签 | `asset/vul/controller/AssetVulController.java` |
| `DELETE` | `/api/v1/asset/vul/delete` | 通过ID删除 | `asset/vul/controller/AssetVulController.java` |
| `DELETE` | `/api/v1/asset/vul/deleteBatch` | 批量删除 | `asset/vul/controller/AssetVulController.java` |
| `PUT` | `/api/v1/asset/vul/edit` | 编辑漏洞 | `asset/vul/controller/AssetVulController.java` |
| `GET` | `/api/v1/asset/vul/export` | 导出漏洞资产 | `asset/vul/controller/AssetVulController.java` |
| `POST` | `/api/v1/asset/vul/import` | 导入漏洞资产 | `asset/vul/controller/AssetVulController.java` |
| `GET` | `/api/v1/asset/vul/list` | 分页查询漏洞列表 | `asset/vul/controller/AssetVulController.java` |
| `GET` | `/api/v1/asset/vul/queryById` | 通过ID查询详情 | `asset/vul/controller/AssetVulController.java` |
| `POST` | `/api/v1/asset/web/add` | 新增 Web 资产 | `asset/web/controller/AssetWebController.java` |
| `GET` | `/api/v1/asset/web/all` | 查询所有 Web 资产 (用于下拉列表) | `asset/web/controller/AssetWebController.java` |
| `POST` | `/api/v1/asset/web/batchAdd` | 批量新增 Web 资产 | `asset/web/controller/AssetWebController.java` |
| `POST` | `/api/v1/asset/web/batchDelete` | 批量删除 | `asset/web/controller/AssetWebController.java` |
| `POST` | `/api/v1/asset/web/batchUpdateStatus` | 批量修改状态 | `asset/web/controller/AssetWebController.java` |
| `POST` | `/api/v1/asset/web/batchUpdateTag` | 批量修改标签 | `asset/web/controller/AssetWebController.java` |
| `DELETE` | `/api/v1/asset/web/delete` | 通过ID删除 | `asset/web/controller/AssetWebController.java` |
| `DELETE` | `/api/v1/asset/web/deleteBatch` | 批量删除 | `asset/web/controller/AssetWebController.java` |
| `PUT` | `/api/v1/asset/web/edit` | 编辑 Web 资产 | `asset/web/controller/AssetWebController.java` |
| `GET` | `/api/v1/asset/web/export` | 导出 Web 资产 | `asset/web/controller/AssetWebController.java` |
| `POST` | `/api/v1/asset/web/import` | 导入 Web 资产 | `asset/web/controller/AssetWebController.java` |
| `GET` | `/api/v1/asset/web/list` | 分页查询 Web 资产列表 | `asset/web/controller/AssetWebController.java` |
| `GET` | `/api/v1/asset/web/queryById` | 通过ID查询详情 | `asset/web/controller/AssetWebController.java` |

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
| `GET` | `/api/v1/client/all` | 查询所有节点 | `client/controller/ClientController.java` |
| `GET` | `/api/v1/client/config-file/{id}/download` | 客户端下载配置文件 | `client/controller/ClientConfigFileController.java` |
| `GET` | `/api/v1/client/config-file/{id}/fetch` | 客户端获取配置(含哈希) | `client/controller/ClientConfigFileController.java` |
| `DELETE` | `/api/v1/client/delete` | 通过ID删除节点 | `client/controller/ClientController.java` |
| `DELETE` | `/api/v1/client/deleteBatch` | 批量删除节点 | `client/controller/ClientController.java` |
| `POST` | `/api/v1/client/heartbeat` | 节点心跳上报 (客户端调用) | `client/controller/ClientController.java` |
| `GET` | `/api/v1/client/list` | 分页查询节点列表 | `client/controller/ClientController.java` |
| `POST` | `/api/v1/client/offline` | 节点主动下线 (客户端调用) | `client/controller/ClientController.java` |
| `GET` | `/api/v1/client/queryById` | 通过ID查询详情 | `client/controller/ClientController.java` |
| `POST` | `/api/v1/client/register` | 节点注册 (客户端调用) | `client/controller/ClientController.java` |
| `GET` | `/api/v1/client/storage/policy` | - | `client/controller/ClientStoragePolicyController.java` |
| `GET` | `/api/v1/client/task/poll` | 客户端长轮询拉取任务 (异步非阻塞) | `task/controller/ClientTaskController.java` |
| `GET` | `/api/v1/client/task/pull` | 客户端拉取已分配任务 | `task/controller/ClientTaskController.java` |
| `POST` | `/api/v1/client/task/start` | 客户端确认启动任务 | `task/controller/ClientTaskController.java` |
| `POST` | `/api/v1/client/task/{taskId}/log` | 客户端分段上报执行日志 | `task/controller/ClientTaskController.java` |
| `POST` | `/api/v1/client/task/{taskId}/report` | 客户端上报最终任务结果 | `task/controller/ClientTaskController.java` |
| `POST` | `/api/v1/client/task/{taskId}/report-with-files` | 客户端上报任务结果(带文件上传) | `task/controller/ClientTaskController.java` |
| `PUT` | `/api/v1/client/update` | 更新节点信息/配置 | `client/controller/ClientController.java` |

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
| `DELETE` | `/api/v1/config-file/batch` | 批量删除配置文件 | `configfile/controller/ConfigFileController.java` |
| `GET` | `/api/v1/config-file/list` | 配置文件列表 | `configfile/controller/ConfigFileController.java` |
| `POST` | `/api/v1/config-file/tool-bind` | 关联配置文件到工具 | `configfile/controller/ConfigFileController.java` |
| `DELETE` | `/api/v1/config-file/tool-bind/{id}` | 解除工具配置文件关联 | `configfile/controller/ConfigFileController.java` |
| `GET` | `/api/v1/config-file/tool/{toolId}` | 获取工具的配置文件列表 | `configfile/controller/ConfigFileController.java` |
| `POST` | `/api/v1/config-file/upload` | 上传配置文件 | `configfile/controller/ConfigFileController.java` |
| `DELETE` | `/api/v1/config-file/{id}` | 删除配置文件 | `configfile/controller/ConfigFileController.java` |
| `GET` | `/api/v1/config-file/{id}` | 获取配置文件详情 | `configfile/controller/ConfigFileController.java` |
| `PUT` | `/api/v1/config-file/{id}` | 更新配置文件元信息 | `configfile/controller/ConfigFileController.java` |
| `PUT` | `/api/v1/config-file/{id}/content` | 更新配置文件内容 | `configfile/controller/ConfigFileController.java` |
| `GET` | `/api/v1/config-file/{id}/download` | 下载配置文件 | `configfile/controller/ConfigFileController.java` |
| `GET` | `/api/v1/config-file/{id}/preview` | 预览配置文件内容(文本类型) | `configfile/controller/ConfigFileController.java` |

## /api/v1/dsl

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/dsl/preview/{toolIdentifier}` | 预览ExecutionSpec | `dsl/controller/DslController.java` |
| `POST` | `/api/v1/dsl/preview/{toolIdentifier}/batch` | 预览批量ExecutionSpec | `dsl/controller/DslController.java` |
| `POST` | `/api/v1/dsl/vnext/tool/parse` | 解析 vNext Tool DSL | `dsl/vnext/controller/VNextDslController.java` |
| `POST` | `/api/v1/dsl/vnext/tool/validate` | 校验 vNext Tool DSL | `dsl/vnext/controller/VNextDslController.java` |
| `POST` | `/api/v1/dsl/vnext/workflow/compile` | 编译 vNext Workflow 为 ExecutionPlan | `dsl/vnext/controller/VNextDslController.java` |
| `POST` | `/api/v1/dsl/vnext/workflow/parse` | 解析 vNext Workflow DSL | `dsl/vnext/controller/VNextDslController.java` |
| `POST` | `/api/v1/dsl/vnext/workflow/validate` | 校验 vNext Workflow DSL | `dsl/vnext/controller/VNextDslController.java` |

## /api/v1/license

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/license/activate` | 激活授权 | `license/LicenseController.java` |
| `GET` | `/api/v1/license/info` | 获取授权信息 | `license/LicenseController.java` |
| `GET` | `/api/v1/license/machine-id` | 获取当前机器码 | `license/LicenseController.java` |

## /api/v1/mock

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/mock/execution-spec/dry-run` | Tool Spec Dry-Run | `mock/controller/MockExecutionController.java` |
| `POST` | `/api/v1/mock/generate-output` | 生成模拟输出 | `mock/controller/MockExecutionController.java` |
| `POST` | `/api/v1/mock/tool/{toolId}/dry-run` | 工具 Dry-Run | `mock/controller/MockExecutionController.java` |
| `POST` | `/api/v1/mock/workflow/dry-run` | Workflow Dry-Run | `mock/controller/MockExecutionController.java` |

## /api/v1/mock-files

| Method | Path | Summary | Controller |
|---|---|---|---|
| `GET` | `/api/v1/mock-files` | 列出Mock文件 | `mock/controller/MockFileController.java` |
| `POST` | `/api/v1/mock-files` | 创建Mock文件 | `mock/controller/MockFileController.java` |
| `GET` | `/api/v1/mock-files/by-tool/{toolId}` | 根据工具ID获取Mock文件 | `mock/controller/MockFileController.java` |
| `POST` | `/api/v1/mock-files/upload` | 上传Mock文件 | `mock/controller/MockFileController.java` |
| `DELETE` | `/api/v1/mock-files/{id}` | 删除Mock文件 | `mock/controller/MockFileController.java` |
| `GET` | `/api/v1/mock-files/{id}` | 获取Mock文件详情 | `mock/controller/MockFileController.java` |
| `PUT` | `/api/v1/mock-files/{id}` | 更新Mock文件 | `mock/controller/MockFileController.java` |
| `GET` | `/api/v1/mock-files/{id}/download` | 下载Mock文件 | `mock/controller/MockFileController.java` |

## /api/v1/notification

| Method | Path | Summary | Controller |
|---|---|---|---|
| `GET` | `/api/v1/notification/list` | 获取通知列表 | `notification/controller/NotificationController.java` |
| `POST` | `/api/v1/notification/read-all` | 标记全部已读 | `notification/controller/NotificationController.java` |
| `POST` | `/api/v1/notification/read/{id}` | 标记通知已读 | `notification/controller/NotificationController.java` |
| `GET` | `/api/v1/notification/unread-count` | 获取未读通知数量 | `notification/controller/NotificationController.java` |
| `DELETE` | `/api/v1/notification/{id}` | 删除通知 | `notification/controller/NotificationController.java` |

## /api/v1/project

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/project/add` | 新增项目 | `project/controller/ProjectController.java` |
| `GET` | `/api/v1/project/all` | 查询所有项目 (用于下拉列表) | `project/controller/ProjectController.java` |
| `DELETE` | `/api/v1/project/delete` | 通过ID删除 | `project/controller/ProjectController.java` |
| `DELETE` | `/api/v1/project/deleteBatch` | 批量删除 | `project/controller/ProjectController.java` |
| `PUT` | `/api/v1/project/edit` | 编辑项目 | `project/controller/ProjectController.java` |
| `GET` | `/api/v1/project/list` | 分页查询项目列表 | `project/controller/ProjectController.java` |
| `GET` | `/api/v1/project/queryById` | 通过ID查询详情 | `project/controller/ProjectController.java` |

## /api/v1/registry

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/registry/cache/clear` | 清除商店缓存 | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/check-updates` | 检查所有更新 | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/config` | 获取商店配置 | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/config` | 保存商店配置 | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/config/test` | 测试商店连接 | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/installed/tools` | 已安装工具列表 | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/installed/workflows` | 已安装工作流列表 | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/tools/check-updates/{toolId}` | 检查工具更新 | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/tools/install/{toolId}` | 安装工具 | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/tools/installBatch` | 批量安装工具 | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/tools/remote` | 获取远程工具列表 | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/tools/remote/{toolId}` | 获取远程工具详情 | `workflow/registry/PackageRegistryController.java` |
| `DELETE` | `/api/v1/registry/tools/uninstall/{toolId}` | 卸载工具 | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/tools/update/{toolId}` | 更新工具 | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/workflows/check-updates/{workflowId}` | 检查工作流更新 | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/workflows/install/{workflowId}` | 安装工作流 | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/workflows/installBatch` | 批量安装工作流 | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/workflows/remote` | 获取远程工作流列表 | `workflow/registry/PackageRegistryController.java` |
| `GET` | `/api/v1/registry/workflows/remote/{workflowId}` | 获取远程工作流详情 | `workflow/registry/PackageRegistryController.java` |
| `DELETE` | `/api/v1/registry/workflows/uninstall/{workflowId}` | 卸载工作流 | `workflow/registry/PackageRegistryController.java` |
| `POST` | `/api/v1/registry/workflows/update/{workflowId}` | 更新工作流 | `workflow/registry/PackageRegistryController.java` |

## /api/v1/search

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/search/engine/add` | 新增引擎配置 | `search/controller/AssetSearchEngineController.java` |
| `GET` | `/api/v1/search/engine/all` | 查询所有启用的引擎（搜索页下拉用） | `search/controller/AssetSearchEngineController.java` |
| `DELETE` | `/api/v1/search/engine/delete` | 删除引擎配置 | `search/controller/AssetSearchEngineController.java` |
| `DELETE` | `/api/v1/search/engine/deleteBatch` | 批量删除 | `search/controller/AssetSearchEngineController.java` |
| `PUT` | `/api/v1/search/engine/edit` | 修改引擎配置 | `search/controller/AssetSearchEngineController.java` |
| `GET` | `/api/v1/search/engine/list` | 分页查询引擎配置 | `search/controller/AssetSearchEngineController.java` |
| `GET` | `/api/v1/search/engine/queryById` | 通过ID查询详情 | `search/controller/AssetSearchEngineController.java` |
| `POST` | `/api/v1/search/syntax/add` | 新增语法 | `search/controller/SearchEngineSyntaxController.java` |
| `GET` | `/api/v1/search/syntax/all` | 按引擎查询所有语法（用于前端补全） | `search/controller/SearchEngineSyntaxController.java` |
| `DELETE` | `/api/v1/search/syntax/delete` | 删除语法 | `search/controller/SearchEngineSyntaxController.java` |
| `DELETE` | `/api/v1/search/syntax/deleteBatch` | 批量删除 | `search/controller/SearchEngineSyntaxController.java` |
| `PUT` | `/api/v1/search/syntax/edit` | 编辑语法 | `search/controller/SearchEngineSyntaxController.java` |
| `GET` | `/api/v1/search/syntax/list` | 分页查询语法列表 | `search/controller/SearchEngineSyntaxController.java` |
| `GET` | `/api/v1/search/syntax/queryById` | 通过ID查询 | `search/controller/SearchEngineSyntaxController.java` |

## /api/v1/spec

| Method | Path | Summary | Controller |
|---|---|---|---|
| `GET` | `/api/v1/spec/tools/vnext/parsed` | 获取所有解析后的 vNext 工具定义 | `workflow/editor/controller/SpecController.java` |

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
| `DELETE` | `/api/v1/task/delete` | 通过ID删除任务记录 | `task/controller/AssetTaskController.java` |
| `DELETE` | `/api/v1/task/deleteBatch` | 批量删除任务记录 | `task/controller/AssetTaskController.java` |
| `GET` | `/api/v1/task/list` | 分页查询任务列表 | `task/controller/AssetTaskController.java` |
| `GET` | `/api/v1/task/queryById` | 通过ID查询详情 | `task/controller/AssetTaskController.java` |
| `GET` | `/api/v1/task/{id}/logs` | 查询任务执行日志 | `task/controller/AssetTaskController.java` |
| `POST` | `/api/v1/task/{id}/rerun` | 重跑任务 | `task/controller/AssetTaskController.java` |

## /api/v1/test

| Method | Path | Summary | Controller |
|---|---|---|---|
| `GET` | `/api/v1/test/case/list` | 列出测试用例 | `test/controller/TestCaseController.java` |
| `POST` | `/api/v1/test/case/add` | 创建测试用例 | `test/controller/TestCaseController.java` |
| `POST` | `/api/v1/test/case/batchRun` | 批量运行测试用例 | `test/controller/TestCaseController.java` |
| `DELETE` | `/api/v1/test/case/delete` | 删除测试用例 | `test/controller/TestCaseController.java` |
| `GET` | `/api/v1/test/case/queryById` | 获取测试用例详情 | `test/controller/TestCaseController.java` |
| `PUT` | `/api/v1/test/case/edit` | 更新测试用例 | `test/controller/TestCaseController.java` |
| `POST` | `/api/v1/test/case/run` | 运行测试用例 | `test/controller/TestCaseController.java` |

## /api/v1/tool

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/tool/add` | 新增工具 | `tool/controller/ClientToolController.java` |
| `GET` | `/api/v1/tool/all` | 查询所有工具 | `tool/controller/ClientToolController.java` |
| `POST` | `/api/v1/tool/batchRunTool` | 批量运行工具 | `tool/controller/ClientToolRunController.java` |
| `GET` | `/api/v1/tool/byType` | 按类型查询工具 | `tool/controller/ClientToolController.java` |
| `POST` | `/api/v1/tool/copy` | 复制工具 | `tool/controller/ClientToolController.java` |
| `DELETE` | `/api/v1/tool/delete` | 通过ID删除 | `tool/controller/ClientToolController.java` |
| `DELETE` | `/api/v1/tool/deleteBatch` | 批量删除 | `tool/controller/ClientToolController.java` |
| `PUT` | `/api/v1/tool/edit` | 编辑工具 | `tool/controller/ClientToolController.java` |
| `POST` | `/api/v1/tool/importYaml` | 导入本地 YAML 工具 | `tool/controller/ClientToolController.java` |
| `GET` | `/api/v1/tool/list` | 分页查询工具列表 | `tool/controller/ClientToolController.java` |
| `POST` | `/api/v1/tool/parser/preview` | 解析预览 | `tool/controller/ToolTestController.java` |
| `GET` | `/api/v1/tool/parser/types` | 获取支持的解析器类型 | `tool/controller/ToolTestController.java` |
| `POST` | `/api/v1/tool/preview-targets` | 预览工具 targetResolver 的解析结果 | `tool/controller/ClientToolController.java` |
| `GET` | `/api/v1/tool/queryById` | 通过ID查询详情 | `tool/controller/ClientToolController.java` |
| `POST` | `/api/v1/tool/runForAsset` | 为单个资产运行工具 | `tool/controller/ClientToolRunController.java` |
| `POST` | `/api/v1/tool/test` | 测试配置（无需保存） | `tool/controller/ToolTestController.java` |
| `POST` | `/api/v1/tool/validate` | 验证工具配置 | `tool/controller/ClientToolController.java` |
| `POST` | `/api/v1/tool/validateYaml` | 验证 YAML 配置 | `tool/controller/ClientToolController.java` |
| `POST` | `/api/v1/tool/{id}/test` | 测试工具配置 | `tool/controller/ToolTestController.java` |
| `GET` | `/api/v1/tool/{id}/validate` | 验证指定工具的配置 | `tool/controller/ClientToolController.java` |

## /api/v1/workflow

| Method | Path | Summary | Controller |
|---|---|---|---|
| `POST` | `/api/v1/workflow/add` | 新增工作流 | `workflow/controller/ScanWorkflowController.java` |
| `GET` | `/api/v1/workflow/all` | 查询所有工作流 | `workflow/controller/ScanWorkflowController.java` |
| `POST` | `/api/v1/workflow/batchRunWorkflow` | 批量运行工作流 | `workflow/controller/ScanWorkflowController.java` |
| `POST` | `/api/v1/workflow/copy` | 复制工作流 | `workflow/controller/ScanWorkflowController.java` |
| `DELETE` | `/api/v1/workflow/delete` | 删除工作流 | `workflow/controller/ScanWorkflowController.java` |
| `DELETE` | `/api/v1/workflow/deleteBatch` | 批量删除 | `workflow/controller/ScanWorkflowController.java` |
| `PUT` | `/api/v1/workflow/edit` | 编辑工作流 | `workflow/controller/ScanWorkflowController.java` |
| `POST` | `/api/v1/workflow/importYaml` | 导入本地 YAML 工作流 | `workflow/controller/ScanWorkflowController.java` |
| `GET` | `/api/v1/workflow/list` | 分页查询工作流 | `workflow/controller/ScanWorkflowController.java` |
| `GET` | `/api/v1/workflow/queryById` | 根据ID查询工作流 | `workflow/controller/ScanWorkflowController.java` |
| `POST` | `/api/v1/workflow/runForAsset` | 为单个资产运行工作流 | `workflow/controller/ScanWorkflowController.java` |
| `POST` | `/api/v1/workflow/runNow` | 手动触发工作流 | `workflow/controller/ScanWorkflowController.java` |
| `GET` | `/api/v1/workflow/runs` | 查询工作流运行批次汇总 | `workflow/controller/ScanWorkflowController.java` |
| `GET` | `/api/v1/workflow/runs/{runId}/nodes` | 查询指定运行批次的节点运行明细 | `workflow/controller/ScanWorkflowController.java` |
| `GET` | `/api/v1/workflow/runs/{runId}/tasks` | 查询指定运行批次的任务明细 | `workflow/controller/ScanWorkflowController.java` |
| `POST` | `/api/v1/workflow/validate` | 验证工作流配置 | `workflow/controller/ScanWorkflowController.java` |

## /mcp

| Method | Path | Summary | Controller |
|---|---|---|---|
| `GET` | `/mcp/v1/prompts` | 获取MCP提示词列表 | `ai/controller/McpController.java` |
| `GET` | `/mcp/v1/resources` | 获取MCP资源列表 | `ai/controller/McpController.java` |
| `GET` | `/mcp/v1/resources/read` | 读取MCP资源 | `ai/controller/McpController.java` |
| `GET` | `/mcp/v1/tools` | 获取MCP工具列表 | `ai/controller/McpController.java` |
| `POST` | `/mcp/v1/tools/call` | 调用MCP工具 | `ai/controller/McpController.java` |

::: tip 自动生成
此索引由 `scripts/generate_api_index.py` 从后端 Controller 注解自动提取。新增或修改路由后请重新运行脚本更新此页。
:::
