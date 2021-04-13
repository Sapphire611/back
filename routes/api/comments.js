const router = require("@koa/router")();
const { Articles, Comments } = require("../../model/model");

var getComments = async function (ctx, next) {
  let result = await Comments.find();
  if (result.length) {
    ctx.body = {
      status: 1,
      msg: "success",
      body: result,
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "no Comments",
      body: [],
    };
  }
};

var postComment = async function (ctx, next) {
  let articleid = ctx.params.aid;
  let body = ctx.request.body;
  let { username, userid, title, content } = body;
  let article = await Articles.findOne({ _id: articleid });

  if (!article) {
    ctx.status = 400;
    ctx.body = {
      status: 0,
      msg: 'article not exist',
    };
    return;
  }

  let newComment = new Comments({
    username,
    userid,
    title,
    content,
    articleid
  });

  let result = await newComment.save();

  if (result) {
    ctx.body = {
      status: 1,
      msg: "success",
      data: { id: result.id },
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "add Comment error",
    };
  }
};

var getCommentById = async function (ctx, next) {
  let id = ctx.params.id;
  let result = await Comments.findOne({ _id: id });
  if (result) {
    ctx.body = {
      status: 1,
      msg: "success",
      body: result,
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "Comment not exist",
      body: {},
    };
  }
};

var putCommentById = async function (ctx, next) {
  let id = ctx.params.id;
  let comment = await Comments.findOne({ _id: id });

  if (!comment) {
    ctx.status = 400;
    ctx.body = {
      status: 0,
      msg: 'comment not exist',
    };
    return;
  }
  
  let body = {};

  console.log(ctx.request.body.title);
  console.log(ctx.request.body.content);
  console.log(comment);
  //console.log(comment.title);
  //console.log(comment.content);
  
  // if (ctx.request.body.username !== undefined)
  //   body.username = ctx.request.body.username;
  // if (ctx.request.body.userid !== undefined)
  //   body.title = ctx.request.body.userid;
  if (ctx.request.body.title !== comment.title) 
    body.title = ctx.request.body.title;
  if (ctx.request.body.content !== comment.content)
    body.content = ctx.request.body.content;
  
    let result = await Comments.updateOne(
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

var delCommentById = async function (ctx, next) {
  let id = ctx.params.id;
  let result = await Comments.deleteOne({ _id: id });
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

var getCommentsByAid = async function (ctx, next) {
  let articleid = ctx.params.aid;
  let result = await Comments.find({ articleid });
  if (result.length) {
    ctx.body = {
      status: 1,
      msg: 'success',
      body: result,
    };
  } else {
    ctx.body = {
      status: 0,
      msg: 'no comments',
      body: [],
    };
  }
};


router.get("/comments", getComments);  // 查询所有评论
router.get("/comments/:id", getCommentById); // 查询某个评论
router.get('/comments/articles/:aid', getCommentsByAid); // 访问某个问题时，查询对应问题下的所有评论
router.post("/comments/:aid", postComment); // 发布评论
router.put("/comments/:id", putCommentById); // 更新某个评论
router.delete("/comments/:id",delCommentById); // 删除某个评论

module.exports = router;
