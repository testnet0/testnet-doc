# 接口文档
## API说明
可通过API接口对接第三方系统实现自动化资产管理和扫描,接口使用Token方式进行鉴权。
## 获取API Token
Token获取和修改方式：`.env`文件 `TESTNET_API_TOKEN`配置

注意修改配置之后需要重启服务端才会生效:
```
docker compose up --force-recreate -d testnet-server
```
## 请求接口
接口地址为`https://<您的服务器IP>:8099`+ `接口URL`
## 接口列表
### 1. 获取资产

#### 请求

- **URL**: `/jeecgboot/testnet.server/api/list`
- **方法**: `POST`
- **请求参数**: 

| 字段         | 说明                   | 是否必填 | 备注                                  |
|--------------|------------------------|----------|---------------------------------------|
| `token`      | 查看.env文件获取       | 是       |                                       |
| `assetType`  | 资产类型               | 是       | 支持以下类型：<br>domain 域名<br>sub_domain 子域名<br>ip IP<br>port 端口<br>web WEB服务<br>vul 漏洞<br>api API<br>company 公司 |
| `pageSize`   | 每页数量               | 是       |                                       |
| `pageNo`     | 页码                   | 是       |                                       |
| `params`     | 参数                   | 可选     | 格式参考在页面上方搜索框输入<br>例如：<br>`params: { "projectId": "123456" }` |
| `queryParam` | 高级查询条件           | 可选     | 格式参考 页面高级查询<br>例如：<br>`queryParam: {}` |


#### 请求样例

```
{
    "token": "123456",
    "assetType": "domain",
    "pageSize": 10,
    "pageNo": 1
}
```

#### 响应样例

```
{
    "success": true,
    "message": "",
    "code": 200,
    "result": {
        "records": [
            {
                "id": "1818100619029327874",
                "createBy": "admin",
                "createTime": "2024-07-30 09:45:41",
                "updateBy": null,
                "updateTime": null,
                "sysOrgCode": "A01",
                "projectId": "1818100552054681601",
                "assetLabel": null,
                "source": "手工录入",
                "domain": "test.com",
                "icpNumber": null,
                "whois": null,
                "dnsServer": null,
                "companyId": null,
                "subDomainNumber": 0,
                "projectId_dictText": "aa"
            }
        ],
        "total": 1,
        "size": 10,
        "current": 1,
        "orders": [],
        "optimizeCountSql": true,
        "searchCount": true,
        "maxLimit": null,
        "countId": null,
        "pages": 1
    },
    "timestamp": 1722303947307
}
```

### 2. 新增资产

#### 请求

- **URL**: `/jeecgboot/testnet.server/api/add`
- **方法**: `POST`
- **请求参数**:

| 字段         | 说明                   | 备注                                  |
|--------------|------------------------|---------------------------------------|
| `token`      | 查看.env文件获取       |                                       |
| `assetType`  | 资产类型               | 支持以下类型：<br>domain 域名<br>sub_domain 子域名<br>ip IP<br>port 端口<br>web WEB服务<br>vul 漏洞<br>api API<br>company 公司 |
| `assetList`  | 资产的列表             | 格式可以参考手工录入                  |

#### 请求样例
```
{
    "token": "123456",
    "assetType": "domain",
    "assetList": [
        {
            "projectId": "1813454467345240065",
            "domain": "1qq.com",
            "source": "API导入"
        },
        {
            "projectId": "1813454467345240065",
            "domain": "2qq.com",
            "source": "API导入"
        },
        {
            "projectId": "1813454467345240065",
            "domain": "3qq.com",
            "source": "API导入"
        }
    ]
}
```

#### 响应样例

```
  {
    "status": "success",
    "data": {
      "id": "3",
      "name": "New Asset",
      "type": "Type C",
      "value": "3000",
      "status": "active"
    }
  }
```

### 3. 运行脚本

#### 请求

- **URL**: `/jeecgboot/testnet.server/api/runChain`
- **方法**: `POST`
- **请求参数**:

| 字段   | 说明   | 备注                      |
|--------|--------|---------------------------|
| `token`| 查看.env文件获取 |                           |
| `params`| 参数   | 格式可以参考运行任务        |

#### 请求样例
```
{
    "token": "123456",
    "params": "{\"queryObj\":{\"column\":\"id\",\"order\":\"desc\",\"pageNo\":1,\"pageSize\":10},\"queryParam\":{},\"chainId\":\"1797542426571706370\",\"chainName\":\"DNS解析\",\"data\":[],\"assetType\":\"sub_domain\"}"
}
```

#### 响应样例

```
  {
    "status": "success",
    "message": "任务已成功运行",
    "task_id": "1234",
    "result": {
      "status": "completed",
      "details": "任务详细信息"
    }
  }
```