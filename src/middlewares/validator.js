"use strict";

const Joi = require("joi");

exports.validate = (schema) => {
  const validateFunctions = {};
  if (schema.query) {
    const realSchema = Joi.object().keys(schema.query);
    validateFunctions.query = (ctx) => realSchema.validate(ctx.query);
  }
  if (schema.body) {
    const realSchema = Joi.object().keys(schema.body);
    validateFunctions.body = (ctx) => realSchema.validate(ctx.request.body);
  } else if (schema.arrBody) {
    const realSchema = Joi.array().items(Joi.object(schema.arrBody));
    validateFunctions.body = (ctx) => realSchema.validate(ctx.request.body);
  }
  if (schema.params) {
    const realSchema = Joi.object().keys(schema.params);
    validateFunctions.params = (ctx) => realSchema.validate(ctx.params);
  }
  return async function (ctx, next) {
    ctx.validateResult = {};
    for (const fk of Object.keys(validateFunctions)) {
      const validateResult = validateFunctions[fk](ctx);
      if (validateResult.error) {
        ctx.throw(400, "validate error", {
          debug: validateResult,
        });
      }
      ctx.validateResult[fk] = validateResult.value;
    }
    return next();
  };
};
