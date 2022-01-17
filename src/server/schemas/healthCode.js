"use strict";
const Joi = require("joi");
const custom = require("../core/joiExtends");

/**
 * TrackEvent 前端数据校验
 */

exports.add = {
  body: {
    XM: Joi.string().required(),
    ZJHM: Joi.string().required(),
  },
};