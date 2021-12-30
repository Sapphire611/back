"use strict";
const Joi = require("joi");
const custom = require("../core/joiExtends");
const { getList, getListNoSort } = require("./globalTemplate");

/**
 * PlatformInfo 前端数据校验
 */

exports.add = {
  body: {
    platform: Joi.string().required().valid("iOS", "Android"),
    pad_Model: Joi.string().required(),
    pad_Version: Joi.string().required(),
    app_Version: Joi.string().required(),
  },
};
