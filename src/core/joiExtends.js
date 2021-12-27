"use strict";
const Bourne = require("@hapi/bourne");
const { isValidObjectId } = require("mongoose");
const Joi = require("joi");

let custom = Joi.extend((joi) => {
  return {
    type: "strObject",
    base: joi.object(),
    coerce: {
      from: "string",
      method(value, helpers) {
        if (value[0] !== "{" && !/^\s*\{/.test(value)) {
          return;
        }

        try {
          return { value: Bourne.parse(value) };
          // eslint-disable-next-line no-empty
        } catch (ignoreErr) {}
      },
    },
  };
})
  .extend((joi) => {
    return {
      type: "strBoolean",
      base: joi.boolean(),
      coerce: {
        from: "string",
        method(value, helpers) {
          switch (value) {
            case "true":
              return { value: true };
            case "false":
              return { value: false };
            default:
              return { value: Boolean(value) };
          }
        },
      },
    };
  })
  .extend((joi) => {
    return {
      type: "strArray",
      base: joi.array(),
      coerce: {
        from: "string",
        method(value, helpers) {
          if (
            typeof value !== "string" ||
            (value[0] !== "[" && !/^\s*\[/.test(value))
          ) {
            return;
          }

          try {
            return { value: Bourne.parse(value) };
            // eslint-disable-next-line no-empty
          } catch (ignoreErr) {}
        },
      },
    };
  })
  .extend({
    type: "objectId",
    messages: {
      invalid: "It must have a valid ObjectId.",
    },
    validate(value, { error }) {
      if (typeof value === "string" || !isValidObjectId(value)) {
        return { value, errors: error("invalid") };
      }
    },
  })
  .extend({
    type: "strObjectId",
    messages: {
      invalid: "It must have a valid ObjectId.",
    },
    validate(value, { error }) {
      if (!isValidObjectId(value)) {
        return { value, errors: error("invalid") };
      }
    },
  });
module.exports = custom;
