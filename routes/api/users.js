const router = require("@koa/router")();
const jwt = require("jsonwebtoken");
const { Users } = require("../../model/model");
const { secret } = require("../../secret");

var getUsers = async function (ctx, next) {
  let result = await Users.find();
  if (result.length) {
    ctx.body = {
      status: 1,
      msg: "success",
      body: result,
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "no user",
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
        nickname: result.nickname,
        role: result.role,
        userid: result.id,
        username: username, //payload 部分可解密获取，不能放敏感信息
      },
      secret.jwtsecret,
      {
        expiresIn: secret.expiresIn, // 授权时效 1 天
      }
    );
    ctx.body = {
      msg: "success",
      status: 1,
      token,
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      msg: "login error",
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
      msg: "username exist",
      status: 0,
    };
    return;
  }
  var user = new Users({
    username,
    password,
    nickname,
  });

  let isAdmin = await Users.countDocuments({});
  if (isAdmin == 0) user.role = "admin";

  await user.save();
  ctx.body = {
    msg: "success",
    status: 1,
  };
};

let info = async function (ctx, next) {
  let username = ctx.params.username;
  let result = await Users.findOne({ username });

  if (result) {
    ctx.body = {
      msg: 'success',
      status: 1,
      data: {
        username: username,
        nickname: result.nickname,
        avatar: result.avatar,
      },
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      msg: 'error',
      status: 0,
    };
  }
};

let update = async function (ctx, next) {
  let { username, password, nickname, avatar } = ctx.request.body;

  let user = await Users.findOne({ username });
  if (!user) {
    ctx.status = 401;
    ctx.body = {
      status: 0,
      msg: '用户信息修改错误',
    };
  }

  let decode = ctx.state.user;
  let operatorUsername = decode.username;
  let role = decode.role;

  if (role == 'admin' || operatorUsername == username) {
  } else {
    ctx.status = 401;
    ctx.body = {
      status: 0,
      msg: '无删除权限',
    };
    return;
  }

  let body = {};
  if (password) body.password = password;
  if (nickname) body.nickname = nickname;
  if (avatar || avatar === '') body.avatar = avatar;

  let result = await Users.updateOne(
    {
      username,
    },
    {
      $set: body,
    }
  );
  if (result) {
    ctx.body = {
      status: 1,
      msg: 'success',
    };
  } else {
    ctx.body = {
      status: 0,
      msg: 'update error',
    };
  }
};



router.get("/users", getUsers); // 得到所有用户
router.post("/users/login", login); // 用户登录
router.post("/users/signup", signup); // 用户注册
router.get('/users/info/:username', info);
router.post('/users/update', update);

module.exports = router;
