"use strict";
const { CommonService } = require("../core/common");
// const { errorMap } = require("../core/error");
// const { logger } = require("../core/logger");
const platformInfoSerivce = require("../services/platformInfo");

const platformInfoController = {};

platformInfoController.add = async (ctx, next) => {
  const { body } = ctx.validateResult;
  const realBody = {
    ...body,
  };

  const realAttributes = {};

  const result = await platformInfoSerivce.add(realBody, realAttributes);

  ctx.body = CommonService.responseData(result);
};

module.exports = platformInfoController;
