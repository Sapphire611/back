const router = require('@koa/router')();
const { Users } = require('../../model/model');

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

router.get('/users', getUsers);
module.exports = router;