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

``` linux
sudo yum - 
mongod 
mongo
netstat -nltp|grep mongod
```

``` linux
pm2 start ./back/index.js --name api  # 启动应用程序并命名为 "api"
pm2 start ./back/index.js --watch # 有代码变动自动重启
pm2 start ./back/index.js -i 3 # 同时启动 3 个实例，负载均衡。或者 -i max

pm2 ls # 查看程序列表
pm2 logs api          # 显示指定应用程序的日志
pm2 restart api       # 重启
pm2 stop api
pm2 delete api

# api 为程序名称，也可以用 pm2 ls 中显示的序号。或者 all 全部
```
