## httpx Web探测及截图
### 使用场景：子域名列表、IP列表、端口列表

项目自带了通过httpx探测Web及指纹功能，但如果需要网页截图和保存返回包功能，您需要自行配置腾讯云COS。配置方法如下：

1. 修改 `enableScreenshot` 为 `true`。
2. 填入相关信息，获取信息请参考 [腾讯云COS控制台](https://console.cloud.tencent.com/cos)：
   - `bucketName`（存储桶名称）：例如 `test-xxx`
   - `regionName`（所属地域）：例如 `ap-xxx`
   - 访问权限需设置为公有读私有写。
![picture 0](https://github.com/testnet0/image/raw/main/40f7e8dde4e542771108cfaceb1d31a4e5c7e2ab30d6aa8674a62f041fa22833.png)  

3. 获取 `secretId` 和 `secretKey`，请访问 [腾讯云API管理](https://console.cloud.tencent.com/cam/capi)：
   - `secretId`: AKIDxxxx
   - `secretKey`: xxxx

参考如下:
![picture 1](https://github.com/testnet0/image/raw/main/a1bd21faba4af47d5ed9823aa934ce6c35dbe88f5f225e57ec899c4294cb2248.png)  

保存配置后，在运行 httpx 时，网页截图和返回包将自动保存。
