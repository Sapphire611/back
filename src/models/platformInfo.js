"use strict";

const mongoose = require("mongoose");
const { baseOptions } = require("./base");
const { Schema } = mongoose;
const { Types } = Schema;

/**
 * @class platformInfoSchema 埋点事件
 * @memberOf 
 * @constructor
 * @property {string} platform Pad 平台 (iOs/Android)
 * @property {string} pad_Model Pad 型号
 * @property {string} pad_Version Pad 版本号
 * @property {string} app_Version 当前软件版本号
 */

const platformInfoSchema = new Schema(
  {
    platform: {
      type: String,
      required: true,
    },
    pad_Model: {
      type: String,
      required: true,
    },
    pad_Version: {
      type: String,
      required: true,
    },
    app_Version: {
      type: String,
      required: true,
    },
  },
  { ...baseOptions }
);

exports.PlatformInfo = mongoose.model("PlatformInfo", platformInfoSchema);
