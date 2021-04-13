const router = require('@koa/router')();
const jwt = require('jsonwebtoken');
const { Users } = require('../../model/model');
const { secret } = require('../../secret');

var getUsers = async function (ctx, next) {
  let result = await Users.find();
  if (result.length) {
    ctx.body = {
      status: 1,
      msg: 'success',
      body: result,
    };
  } else {
    ctx.body = {
      status: 0,
      msg: 'no user',
      body: [],
    };
  }
};

var login = async function (ctx, next) {
  let { username, password } = ctx.request.body;
  let result = await Users.findOne({ username, password });

  if (result) {
    let token = jwt.sign(
      {
        userid: result.id,
        username: username, //payload 部分可解密获取，不能放敏感信息
      },
      secret.jwtsecret,
      {
        expiresIn: secret.expiresIn, // 授权时效 1 天
      }
    );
    ctx.body = {
      msg: 'success',
      status: 1,
      token,
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      msg: 'login error',
      status: 0,
      token: null,
    };
  }
};

var signup = async function (ctx, next) {
  let { username, password, nickname } = ctx.request.body;
  let result = await Users.findOne({ username });
  if (result) {
    ctx.status = 401;
    ctx.body = {
      msg: 'username exist',
      status: 0,
    };
    return;
  }
  var user = new Users({
    username,
    password,
    nickname,
  });
  await user.save();
  ctx.body = {
    msg: 'success',
    status: 1,
  };
};



router.get('/users', getUsers); // 得到所有用户
router.post('/users/login', login); // 用户登录
router.post('/users/signup', signup); // 用户注册

module.exports = router;