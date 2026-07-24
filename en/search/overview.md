---
title: Cyberspace Search
description: Internet space mapping and search config
---

# Cyberspace Search

TestNet integrates with major internet space search engines, allowing you to query asset information directly within the platform and import results into your asset library.

## Supported Engines

| Engine | Description | Website |
|--------|-------------|---------|
| **FOFA** | Chinese internet space mapping, rich query syntax | [fofa.info](https://fofa.info) |
| **Hunter** | QiAnXin Eagle-Eye platform, comprehensive data | [hunter.qianxin.com](https://hunter.qianxin.com) |
| **Quake** | 360 global internet space mapping | [quake.360.net](https://quake.360.net) |
| **Shodan** | International leader, global coverage | [shodan.io](https://www.shodan.io) |
| **ZoomEye** | Knownsec's internet space radar | [zoomeye.org](https://www.zoomeye.org) |
| **Zone** | 0.zone asset mapping platform | [0.zone](https://0.zone) |

---

## Configure API Keys

Before using search engine features, configure the API Key for each engine.

1. Go to **"Cyberspace Search"** → **"Search Config"**
2. Select the engine to configure
3. Enter your **API Key** (obtain from each engine's official site)
4. Click **"Test Connection"** to validate
5. Click **"Save"**

::: tip Getting API Keys
- **FOFA**: Register and get the API Key from your profile page
- **Shodan**: Register and get the API Key from your account page
- **Hunter**: Register and get the API credit key from your profile
:::

---

## Configure Query Syntax

Different engines have their own query syntaxes. You can preset common query templates in **"Cyberspace Search"** → **"Search Config"** for quick access.

---

## Run a Search

1. Go to **"Cyberspace Search"** → **"Search"**
2. Select one or more search engines
3. Enter the query syntax in the search box
4. Set a result count limit (to avoid excessive quota consumption)
5. Click **"Search"**

### Syntax Examples

::: code-group

```text [FOFA]
# Search assets by domain
domain="example.com"

# Search an IP range
ip="192.168.1.0/24"

# Multi-condition query
domain="example.com" && status_code="200"

# Search by tech stack
app="WordPress" && domain="example.com"
```

```text [Shodan]
# Search by hostname
hostname:example.com

# Search an IP range
net:192.168.1.0/24

# Search a specific port
port:8080 hostname:example.com

# Search by organization
org:"Example Corp"
```

```text [ZoomEye]
# Search by domain
site:example.com

# Search by IP
ip:192.168.1.1

# Search by service
service:http hostname:example.com
```

```text [Hunter]
# Search by domain suffix
domain.suffix="example.com"

# Search by IP
ip="192.168.1.1"

# Search by page title
web.title="Example"
```

```text [Quake]
# Search by domain
domain: "example.com"

# Search by IP / CIDR
ip: "192.168.1.0/24"

# Search by port & service
port: 8080 AND service: "http"
```

```text [Zone]
# Search by site/domain
site="example.com"

# Search by company name
company="Example Corp"

# Search by web page title
title="Admin Dashboard"
```

:::

---

## Import Search Results

After searching, import results into TestNet's asset library:

1. Check the records to import in the result list
   - Supports select-all on the current page
   - Supports cross-page selection
2. Click **"Import Assets"**
3. Select:
   - **Target Project**: The project the assets will belong to
   - **Asset Type**: IP, Web, etc.
4. Click **"Confirm Import"**

Import results show:
- ✅ Created: successfully created assets
- ⏭️ Skipped: already-existing duplicate assets
- ❌ Failed: assets that failed validation

---

## Important Notes

::: warning Quota Consumption
- Each search consumes the corresponding engine's API quota
- Set a reasonable result count limit to avoid unnecessary quota usage
- Check remaining quota for each engine regularly
:::

::: danger Compliance Notice
Ensure you only query and import asset information for **authorized targets**. Unauthorized scanning may violate laws and regulations.
:::
