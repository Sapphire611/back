const router = require("@koa/router")();
const { Users, Articles } = require("../../model/model");

var getArticles = async function (ctx, next) {
  let result = await Articles.find();
  if (result.length) {
    // 添加部分，根据item.userName 获得头像
    let usernames = result.map((item) => item.username); //抽取
    usernames = [...new Set(usernames)]; //去重
    let users = await Users.find({ username: { $in: usernames } });
    let hash = {};
    users.map((item) => {
      hash[item.username] = item.avatar;
    });
    result = result.map((item) => {
      item.avatar = hash[item.username];
      return item;
    });

    ctx.body = {
      status: 1,
      msg: "success",
      body: result,
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "no articles",
      body: [],
    };
  }
};

var postArticle = async function (ctx, next) {
  let body = ctx.request.body;
  let { username, userid, title, content } = body;
  let newArticle = new Articles({
    username,
    userid,
    title,
    content,
  });
  let result = await newArticle.save();
  if (result) {
    ctx.body = {
      status: 1,
      msg: "success",
      data: { id: result.id },
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "add article error",
    };
  }
};

var getArticleById = async function (ctx, next) {
  let id = ctx.params.id;
  let result = await Articles.findOne({ _id: id });
  if (result) {
    ctx.body = {
      status: 1,
      msg: "success",
      body: result,
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "article not exist",
      body: {},
    };
  }
};

let putArticleById = async function (ctx, next) {
  let id = ctx.params.id;
  let body = {};
  if (ctx.request.body.username !== undefined)
    body.username = ctx.request.body.username;
  if (ctx.request.body.userid !== undefined)
    body.title = ctx.request.body.userid;
  if (ctx.request.body.title !== undefined) body.title = ctx.request.body.title;
  if (ctx.request.body.content !== undefined)
    body.content = ctx.request.body.content;
  let result = await Articles.updateOne(
    {
      _id: id,
    },
    {
      $set: body,
    }
  );
  if (result) {
    ctx.body = {
      status: 1,
      msg: "success",
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "update error",
    };
  }
};

var delArticleById = async function (ctx, next) {
  let id = ctx.params.id;

  let decode = ctx.state.user;
  if (decode.role == "admin") {
  } else {
    let owner = await Articles.findOne({ _id: id, username: decode.username });
    if (!owner) {
      ctx.status = 401;
      ctx.body = {
        status: 0,
        msg: "无删除权限",
      };
      return;
    }
  }

  let result = await Articles.deleteOne({ _id: id });
  if (result) {
    ctx.body = {
      status: 1,
      msg: "success",
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "delete error",
    };
  }
};

router.get("/articles", getArticles); // 查询所有问题
router.post("/articles", postArticle); // 发布一个问题
router.get("/articles/:id", getArticleById); // 查询某个问题
router.put("/articles/:id", putArticleById); // 更新某个问题
router.delete("/articles/:id", delArticleById); // 删除某个问题

module.exports = router;
