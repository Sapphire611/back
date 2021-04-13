const router = require("@koa/router")();
const { Articles } = require("../../model/model");

var getArticles = async function (ctx, next) {
  let result = await Articles.find();
  if (result.length) {
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
  if (ctx.request.body.title !== undefined) 
    body.title = ctx.request.body.title;
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
  let result = await Articles.deleteOne({ _id: id });
  if (result) {
    ctx.body = {
      status: 1,
      msg: 'success',
    };
  } else {
    ctx.body = {
      status: 0,
      msg: 'delete error',
    };
  }
};


// router.prefix('/articles');
// router.get('/', getArticles);
router.get("/articles", getArticles);
router.post("/articles", postArticle);
router.get("/articles/:id", getArticleById);
router.put("/articles/:id", putArticleById);
router.delete("/articles/:id",delArticleById);

module.exports = router;
