# CMS - Back

nodejs - backend - test

### 环境准备
```
npm config set registry https://registry.npm.taobao.org
npm install
npm run start
```

### Git 

> 初始化Git、上传相关命令

```
git init 
git config user.name "Sapphire611"
git config user.email "liuliyi611@gmail.com"
git remote add origin "https://github.com/Sapphire611/back"
```

```
git status
git add .
git commit -m "message"
git push 
```

### JWT
> 使用 JWT 后发 POST 请求，需要新增 Header 

```
Authorization: Bearer aaa.bbb.ccc
```
- 其中 aaa.bbb.ccc 就是登录 API 返回的 token，也就是后端登录方法根据密钥和 jwt.sign() 生成的 token。

- JWT(JSON Web Token)，由 3 部分组成，第一部分aaa是头部协议，第二部分 bbb 是负载（加密明文信息），第三部分ccc是签名验证区。

