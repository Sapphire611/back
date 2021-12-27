"use strict";

const Joi = require("joi");

exports.getListNoSort = {
  page: Joi.number().integer().min(0).default(0),
  pageSize: Joi.number().integer().min(1).default(20),
};

exports.sort = {
  column: Joi.string().default("updatedAt"),
  sort: Joi.string().valid("asc", "desc").default("desc"),
};

exports.getList = {
  ...exports.getListNoSort,
  ...exports.sort,
};
