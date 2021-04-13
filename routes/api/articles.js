const router = require('@koa/router')();
const { Articles } = require('../../model/model');

var getArticles = async function (ctx, next) {
  let result = await Articles.find();
  if (result.length) {
    ctx.body = {
      status: 1,
      msg: 'success',
      body: result,
    };
  } else {
    ctx.body = {
      status: 0,
      msg: 'no articles',
      body: [],
    };
  }
};

// router.prefix('/articles');
// router.get('/', getArticles);
router.get('/articles', getArticles);

module.exports = router;