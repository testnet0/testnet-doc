## AI助手配置教程

修改目录下的`.env`文件，需要修改`GPT_KEY`和`GPT_HOST`，GPT_KEY通过ChatGPT 官方申请即可；
```
GPT_ENABLE=true
GPT_KEY=sk-xxx (你的APIkey)
GPT_HOST=https://api.openai.com
```
![image](https://github.com/user-attachments/assets/4d218d02-b301-46ed-b40c-f04e8a9c8a26)

然后重启服务端：
```
docker compose up --force-recreate -d testnet-server
```
- 如果你的服务器在国外，那么`GPT_HOST`可以直接使用 `https://api.openai.com`

- 如果你是国内服务器，可以自己搭建。具体参考下面文档：
![image](https://github.com/user-attachments/assets/3a5943c8-5826-43b0-a218-6d47aba5cff7)

## AI助手入口
点击右侧`AI`图标，或者点击`首页-AI助手` 弹出AI助手对话界面：
![image](https://github.com/user-attachments/assets/bb3e171c-fd76-4b54-9017-60842852e861)
## AI助手使用演示
比如以ICP备案脚本为例，我们可以先复制脚本列表里的ICP备案查询代码：
![image](https://github.com/user-attachments/assets/7b49b60f-3fe8-4de0-9b95-265898b113ae)
比如我们找到了一个免费的备案查询接口是https://xxxx.com?domain=baidu.com

**然后就可以使用AI助手帮我们完成脚本,提示词：**
```
根据上面的代码这个帮我修改脚本，请求的域名是https://xxxx.com?domain=baidu.com
返回格式是：
{ "code": 200, "msg": "请求成功", "cache": true, "data": { "cacheTime": "2024-07-16", "organizer": "北京百度网讯科技有限公司", "unitNature": "企业", "licenseKey": "京ICP证030173号-1", "auditTime": "2019-05-16" } }
```
![image](https://github.com/user-attachments/assets/05b97ad8-ab23-47b6-97bf-3ad2f8f5f1e1)
复制GPT提供的代码，替换原来的脚本内容，保存之后就可以去主域名列表使用了。

