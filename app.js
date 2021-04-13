const Koa = require("koa");
const allMiddleGroup = require('./middlewares/mutimidd');
const router = require('./routes/router');
const bodyparser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const db = require('./core/db');
const { secret } = require('./secret');

const app = new Koa();


// 全局错误捕获
app.use(async (ctx, next) => {
  try {
    await next();
    // console.log("handler 通过");
  } catch (err) {
    // console.log("handler 处理错误");
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message,
    };
  }
});



app.use(require('koa-static')(__dirname + '/public')); //设定 public 为静态公开可访问

// 用途 ： 允许从ctx.body获得信息
app.use(bodyparser());

// 引入日志记录
app.use(require('koa-logger')());
// 紧跟着写一个进行跨域和错误处理的中间件
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Methods',
    'POST, GET, OPTIONS, PATCH, HEAD, PUT, DELETE'
  );
  ctx.set('Access-Control-Max-Age', '3600');
  ctx.set(
    'Access-Control-Allow-Headers',
    'x-requested-with,Authorization,Content-Type,Accept'
  );
  ctx.set('Access-Control-Allow-Credentials', 'true');
  if (ctx.request.method == 'OPTIONS') {
    ctx.response.status = 200;
  } else {
    try {
      await next();
    } catch (err) {
      console.log('handler 处理错误' + err.message);
      ctx.response.status = err.statusCode || err.status || 500;
      ctx.response.body = {
        message: err.message,
      };
    }
  }
});

//JWT 鉴权
app.use(
  // 筛选掉 /api/user/login 和 /api/user/signup 这两个路由的 JWT 验证。
  jwt({ secret: secret.jwtsecret }).unless({
    method: ['OPTIONS', 'GET'],
    path: [/^\/api\/users\/login/, /^\/api\/users\/signup/],
  })
);

app.use(router.routes(), router.allowedMethods());
app.listen(8082);

console.log("Server running at http://127.0.0.1:8082/");
