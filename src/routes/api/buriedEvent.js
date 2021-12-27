"use strict";

const router = require("@koa/router")();
const { validate } = require("../../middlewares/validator");
const { buriedEventController } = require("../../controllers");
const buriedEventSchema = require("../../schemas/buriedEvent");

router.prefix("/v1/buriedEvent");

/**
 * 获取所有埋点事件  GET /api/v1/buriedEvent
 */
router.get("/",
  validate(buriedEventSchema.list),
  buriedEventController.list
);

/**
 * 添加一个埋点事件  POST /api/v1/buriedEvent
 */
router.post("/",
  validate(buriedEventSchema.add),
  buriedEventController.add
);


module.exports = router;
