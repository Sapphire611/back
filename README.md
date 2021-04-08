# Readme 

nodejs - backend - test

### 环境准备

```
npm config set registry https://registry.npm.taobao.org
npm init
node index.js &

```

### mongo 后台启动服务

> 先新建一个终端，启动mongodb后台服务

```
mongod --dbpath "D:\liuliyi\lq_CMS" --logpath "D:\liuliyi\lq_CMS\log\mongo.log"
mongo
```

### Nginx

```
sudo cp /home/project/vue.conf /etc/nginx/conf.d/vue.conf
sudo nginx
```

> vue.conf

```
server {
    listen       8080;
    location / {
        proxy_pass http://127.0.0.1:8081/;
    }
    location /node/ {
        proxy_pass http://127.0.0.1:8082/;
    }
}
```