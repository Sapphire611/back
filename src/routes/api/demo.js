"use strict";

const router = require("@koa/router")();
const { validate } = require("../../middlewares/validator");
const { sharedFileCategoryController } = require("../../controllers");
const sharedFileCategorySchema = require("../../schemas/sharedFileCategory");
const { logined, authority, actionEnum } = require("../../middlewares/auth");

const objName = "sharedFile";

router.prefix("/v1/sharedFileCategory");

/**
 * 获取共享资料分类列表  GET /api/v1/sharedFileCategory
 */
router.get(
  "/",
  logined,
  validate(sharedFileCategorySchema.list),
  sharedFileCategoryController.list
);

/**
 * 添加共享资料分类  POST /api/v1/sharedFileCategory
 */
router.post(
  "/",
  logined,
  authority(objName, actionEnum.create),
  validate(sharedFileCategorySchema.add),
  sharedFileCategoryController.add
);

/**
 * 编辑共享资料分类  PATCH /api/v1/sharedFileCategory
 */
router.patch(
  "/:id",
  logined,
  authority(objName, actionEnum.update),
  validate(sharedFileCategorySchema.update),
  sharedFileCategoryController.update
);

/**
 * 删除共享资料分类  DELETE /api/v1/sharedFileCaßtegory
 */
router.delete(
  "/:id",
  logined,
  authority(objName, actionEnum.delete),
  validate(sharedFileCategorySchema.delete),
  sharedFileCategoryController.delete
);

module.exports = router;
