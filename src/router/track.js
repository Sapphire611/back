/*
 * @Author: Sapphire Liu
 * @Date: 2022-07-21 16:56:29
 * @LastEditors: Sapphire Liu
 * @LastEditTime: 2022-07-22 12:41:53
 * @Description: router for feishu-test...
 */
const moment = require("moment");
const Router = require("koa-router");
const AppContext = require("../AppContext");
const logger = require("../logger").logger.child({
  module: "feishu-subscribe-test",
});
const router = new Router();

// test
router.get("/", async (ctx) => {
  ctx.body = {
    service: "feishu-subscribe-test",
    env: process.env.NODE_ENV,
    timestamp: moment().format("LLLL"),
    t: moment().unix(),
  };
});

// test
router.post("/test", async (ctx) => {
  const body = ctx.request.body;

  logger.info(JSON.stringify(body));

  ctx.body = {
    challenge: body.challenge,
  };
});

module.exports = router;
