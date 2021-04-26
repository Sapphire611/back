# CMS - Back

> Vue + Node.js 构建的CMS系统（后端）

## 环境准备

``` console
npm config set registry https://registry.npm.taobao.org
npm install
npm run start
```

## Git

> 初始化Git、上传相关命令

``` console
git init 
git config user.name "Sapphire611"
git config user.email "liuliyi611@gmail.com"
git remote add origin "https://github.com/Sapphire611/back"
git@github.com:Sapphire611/back.git
```

``` console
git status
git add .
git commit -m "message"
git push 
```

### JWT

> 使用 JWT 后发 POST 请求，需要新增 Header

``` html
Authorization: Bearer aaa.bbb.ccc
```

- 其中 aaa.bbb.ccc 就是登录 API 返回的 token，也就是后端登录方法根据密钥和 jwt.sign() 生成的 token。

- JWT(JSON Web Token)，由 3 部分组成，第一部分aaa是头部协议，第二部分 bbb 是负载（加密明文信息），第三部分ccc是签名验证区。

### linux

> 退出终端时，使用Exit，不要点右上角的叉

``` linux
ssh root@[ip]
sudo yum - 
mongod 
mongo
exit
```

```
netstat -nltp | grep mongod
cd /usr/local/mongodb4/bin
./mongod --config mongodb.conf
db.shutdownServer();
```
