
# 常见问题
## 服务端和客户端的区别

- 服务端用来存储数据，下发扫描，服务端只有一个
- 客户端用来执行扫描任务，客户端可以部署多个

## 如何更新版本

在安装目录执行bash build.sh 然后选择更新：

![picture 0](https://github.com/testnet0/image/raw/main/66ef5036e60c17bb61b6ca4bc949a3ec3ed40f63e58e46ddd8732eb2ce4e3e63.png)  


## 修改配置不生效

- 节点上线之后需要去`工作流管理-节点配置`中修改
- 在工作流管理-脚本编排中编辑配置`新上线的节点`才会使用这里的配置作为默认配置

## 安装过程中报错
如果在安装过程中遇到报错，请先查看[安装报错](安装报错)

## 忘记密码
如果忘记管理员密码，可以执行以下命令重置密码为`123456`

#### 一、首先执行`cat .env`
MYSQL_PASSWORD=之后部分为MySQL密码，记住这个密码:
![图 0](https://github.com/testnet0/image/raw/main/d378613e45f786937f72759c4b415d04f0528497edd2072cacba83a8613a37a6.png)  
#### 二、复制下面的命令执行：
```
docker exec -it testnet-mysql /bin/bash
```
#### 三、下面的PASSWORD替换为第一步的密码执行：
```
mysql -uroot -pPASSWORD
```
#### 四、复制下面的命令执行
```
UPDATE `sys_user` SET  `password` = 'cb362cfeefbf3d8d', `salt` = 'RCGTeGiH' WHERE `id` = 'e9ca23d68d884d4ebb19d07889727dae';
```
 ![图 2](https://github.com/testnet0/image/raw/main/4015525f77b274b06222d98efc83a69bffe7531658bb85490bea5039158434ff.png)  

全部执行完成`admin`账号的默认密码被重置为`123456`