## ffuf 目录扫描
### 使用场景：API列表

ffuf使用需要先配置字典，可以在testnet/client_data/tools/目录下创建一个字典，比如dict.txt。
然后修改ffuf配置为
```
ffuf -u %s/FUZZ -w /testnet-client/tools/dict.txt -mc 200,301,302,403 -of json -o %s
```

如果您需要修改运行的命令，可以参考 **ffuf** [官方文档](https://github.com/ffuf/ffuf)。