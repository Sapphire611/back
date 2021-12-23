const router = require('@koa/router')();
const users = require('./api/users');
const articles = require('./api/articles');
const comments = require('./api/comments');

router.prefix('/api');

router.use(users.routes(), users.allowedMethods());
router.use(articles.routes(), articles.allowedMethods());
router.use(comments.routes(), comments.allowedMethods());

module.exports = router;