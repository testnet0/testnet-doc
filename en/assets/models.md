# Asset Graph Models

TestNet's asset management core is built upon a distributed **Asset Graph** that decomposes enterprise attack surfaces into **8 core asset models**. Each asset is stored independently and connected through cascading topology relationships (e.g., `Company -> Domain -> Subdomain -> IP -> Port -> Web -> API/Vulnerability`).

---

## 1. Overview of the 8 Asset Models

The core business fields, automatic linkage rules, and risk indicators for each model are summarized below:

| Asset Model | Entity Identifier | Core Business Fields | Cascading Relationship Rules | Key Risk Indicators |
| :--- | :--- | :--- | :--- | :--- |
| **🏢 Company** (`company`) | Corporate entity / branch | • Unified Social Credit Code<br>• Legal Representative & Capital<br>• Contact emails | Upstream: None. Downstream: automatically aggregates primary domains, subdomains & IP ranges | Unmonitored subsidiary branches, data leaks |
| **🌐 Domain** (`domain`) | Root / primary domain | • Whois server & Registrar<br>• Registration & Expiration dates<br>• Registrant email | Upstream: Company. Downstream: all subdomains | Impending expiration, DNS hijacking risks |
| **🔗 Subdomain** (`subdomain`) | DNS record / hostname | • Record type (A / CNAME / MX)<br>• Target value (`recordValue`)<br>• CDN/WAF tags | Upstream: Domain. Downstream: points to IPs or Web applications | Wildcard exposure, takeover of abandoned subdomains |
| **💻 IP Address** (`ip`) | Host / network IP | • IP address & CIDR netmask<br>• Geolocation & ISP<br>• ASN & OS fingerprint | Upstream: Subdomain. Downstream: exposed port services | Publicly exposed management subnets, abnormal geolocations |
| **🔌 Port Service** (`port`) | Network listener | • Protocol (TCP / UDP)<br>• Port & service name (SSH/HTTP)<br>• Banner & version info | Upstream: IP. Downstream: hosts Web sites or bottom-layer APIs | High-risk exposed ports (e.g., 22, 3389, 6379, 27017) |
| **🌍 Web App** (`web`) | HTTP(S) site / system | • URL & page title<br>• HTTP status code (`statusCode`)<br>• CMS / Framework fingerprint | Upstream: Subdomain & Port. Downstream: API endpoints & Vulnerabilities | Unauthenticated admin panels, outdated vulnerable frameworks |
| **⚡ API Endpoint** (`api`) | REST / RPC route | • Path & HTTP method (GET/POST)<br>• Auth scheme (`authType`)<br>• Parameters (`paramsSchema`) | Upstream: Web application or port service | Broken object level authorization (BOLA), plaintext secrets |
| **🛡️ Vulnerability** (`vulnerability`) | Security threat / CVE | • Name & CVE ID<br>• Severity (`CRITICAL` - `INFO`)<br>• PoC evidence & Remediation | Attached to any target asset above via `targetAsset` | Unpatched `CRITICAL` or `HIGH` severity vulnerabilities |

---

## 2. Common Core Entity Attributes

In addition to module-specific properties, all 8 asset models inherit TestNet's standard entity schema (`BaseEntity`):

```json
{
  "id": "64-bit Snowflake Unique ID (String)",
  "projectId": "Context ID of the parent Project/Department",
  "tags": ["Core Business", "Production", "High-Def CDN"],
  "status": "ACTIVE / ENABLE / DISABLED / PENDING",
  "isDeleted": false,
  "createBy": "System auto-capture or scanner report",
  "createTime": "2026-07-16 10:00:00",
  "updateTime": "2026-07-16 10:15:00"
}
```

> [!TIP]
> **Multi-dimensional Tagging**: Using the `tags` array, users and automated tasks can freely categorize assets. System tagging rules (see [Asset Rules](/en/assets/rules)) automatically attach tags such as `ThinkPHP`, `Spring Boot`, or `High Risk` based on fingerprinting results.

---

## 3. Automatic Upstream/Downstream Resolution

TestNet features a robust cascade binding resolution engine (`TargetResolverEngine`):
1. When a scanning task takes a **Company** or **Primary Domain** as target, the engine automatically expands the graph downwards;
2. It retrieves all active subdomains, IPs, and open Web URLs under that hierarchy in one pass—no manual page switching or pagination clicks required;
3. Any node changes can be visualized in real-time within the [Asset Topology Graph (/en/assets/graph)](/en/assets/graph) as an ECharts force-directed layout, where nodes with `CRITICAL/HIGH` vulnerabilities glow red for immediate awareness.
