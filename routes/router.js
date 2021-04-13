const router = require('@koa/router')();
const users = require('./api/users');
const articles = require('./api/articles');

router.prefix('/api');

router.use(users.routes(), users.allowedMethods());
router.use(articles.routes(), articles.allowedMethods());

module.exports = router;