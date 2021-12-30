"use strict";

const { PlatformInfo } = require("../models/platformInfo");
const {
  CommonService: { getPageOptions },
} = require("../core/common");
const {
  mongo: { MongoError },
} = require("mongoose");

// buriedEventService 具体实现
const platformInfoService = {};

platformInfoService.findById = async (id) => {
  return await PlatformInfo.findById({ _id: id });
};

platformInfoService.add = async (doc, attributes) => {
  try {
    const result = await PlatformInfo.create(doc);
    return result;
  } catch (err) {
    if (err instanceof MongoError) {
      if (err.code === 11000) {
        if (err.keyPattern?.name) {
          throw new Error("dup_key_name");
        }
      }
    }
    throw err;
  }
};

module.exports = platformInfoService;
