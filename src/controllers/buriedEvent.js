"use strict";
const { CommonService } = require("../core/common");
// const { errorMap } = require("../core/error");
// const { logger } = require("../core/logger");
const buriedEventService = require("../services/buriedEvent");

const buriedEventController = {};

buriedEventController.list = async (ctx, next) => {
  const { query } = ctx.validateResult;
  const realQuery = {
    ...query,
  };

  const realAttributes = {
    event: 1,
    value: 1,
  };

  const result = await buriedEventService.list(realQuery, realAttributes);

  ctx.status = 200;
  ctx.body = CommonService.responseData(result, ctx.status);
};

buriedEventController.add = async (ctx, next) => {
  const { body } = ctx.validateResult;
  const realBody = {
    ...body,
  };

  const realAttributes = {};

  const result = await buriedEventService.add(realBody, realAttributes);

  ctx.body = CommonService.responseData(result);
};

buriedEventController.detail = async (ctx, next) => {
  const { params } = ctx.validateResult;
  const realQuery = {
    _id: params.id,
  };
  const result = await buriedEventService.detail(realQuery, {
    event: 1,
    value: 1,
  });

  if (!result) {
    ctx.throw(404);
  }
  ctx.body = CommonService.responseData(result);
};

buriedEventController.delete = async (ctx, next) => {
  try {
    const { params } = ctx.validateResult;
    const realQuery = {
      _id: params.id,
    };
    const dtc = await SharedFileCategoryService.detail(realQuery, {
      _id: 1,
    });
    if (!dtc) {
      ctx.throw(422, "cannot find sharedFileCategory", {
        code: errorMap.sharedFileCategory.notExistTemplateCategory,
      });
    }
    await SharedFileCategoryService.delete({ _id: dtc._id });
    ctx.status = 204;
    // 添加删除日志
  } catch (err) {
    switch (err.message) {
      case "existName":
        ctx.throw(422, err.message, {
          code: errorMap.sharedFileCategory.existName,
        });
        break;
    }
    throw err;
  }
};

module.exports = buriedEventController;
