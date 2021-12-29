"use strict";
const Joi = require("joi");
const custom = require("../core/joiExtends");
const { getList, getListNoSort } = require("./globalTemplate");

/**
 * buriedEvent 前端数据校验
 */
exports.list = {
  query: {
    search: Joi.string().trim(),
    ...getList,
  },
};

// exports.count = {
//   query: {
//     search: Joi.string().trim(),
//     sharedFileCategoryId: custom.strObjectId(),
//   },
// };

// exports.detail = {
//   params: {
//     id: custom.strObjectId().required(),
//   },
// };

exports.add = {
  body: {
    event: Joi.string().required().valid("Button_Click", "All_Click", "QR_Scan", "Light_Set", "Airconditioner_Set", "Curtain_Set", "Microphone_Set", "Error"),
    value: Joi.required()
  }
};

// exports.update = {
//   params: {
//     id: custom.strObjectId().required(),
//   },
//   body: {
//     name: Joi.string(),
//     sharedFileCategoryId: custom.strObjectId(),
//     ps: Joi.string(),
//   },
// };

// exports.delete = {
//   params: {
//     id: custom.strObjectId().required(),
//   },
// };
