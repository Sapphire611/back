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

    const realAttributes = {};

    const result = await buriedEventService.list(realQuery,realAttributes);

    ctx.status = 200;
    ctx.body = CommonService.responseData(result, ctx.status);
};

buriedEventController.add = async (ctx, next) => {
    const { body } = ctx.validateResult;
    const realBody = {
        ...body,
    };

    const realAttributes = {};

    const result = await buriedEventService.add(body.event,realAttributes,realBody);

    ctx.body = CommonService.responseData(result);
};


// buriedEventController.add = async (ctx, next) => {
//   try {
//     const { body } = ctx.validateResult;
//     logger.info(body);
//     const result = await SharedFileCategoryService.add(body);
//     ctx.status = 201;
//     ctx.body = CommonService.responseData({ id: result._id }, ctx.status);

//     // 添加创建日志
//     OperationLogService.add(
//       ctx.session.user._id,
//       OperationLogActionEnum.create,
//       OperationLogTypeEnum.sharedFileCategory,
//       OperationLogModuleEnum.sharedFileCategory,
//       result._id,
//       result.name
//     ).catch((err) => logger.error(err));
//   } catch (err) {
//     switch (err.message) {
//       case "dup_key_name":
//         ctx.throw(422, err.message, {
//           code: errorMap.sharedFileCategory.existName,
//         });
//         break;
//     }
//     throw err;
//   }
// };

// sharedFileCategoryController.update = async (ctx, next) => {
//   try {
//     const { params, body } = ctx.validateResult;
//     const realQuery = {
//       _id: params.id,
//     };
//     const dtc = await SharedFileCategoryService.detail(realQuery, {
//       _id: 1,
//       name: 1,
//     });
//     if (!dtc) {
//       ctx.throw(422, "cannot find sharedFileCategory", {
//         code: errorMap.sharedFileCategory.notExistCategory,
//       });
//     }
//     await SharedFileCategoryService.update(realQuery, body);
//     ctx.status = 201;
//     ctx.body = CommonService.responseData(undefined, ctx.status);
//     // 添加更新日志
//     OperationLogService.add(
//       ctx.session.user._id,
//       OperationLogActionEnum.update,
//       OperationLogTypeEnum.sharedFileCategory,
//       OperationLogModuleEnum.sharedFileCategory,
//       dtc._id,
//       dtc.name
//     ).catch((err) => logger.error(err));
//   } catch (err) {
//     switch (err.message) {
//       case "dup_key_name":
//         ctx.throw(422, err.message, {
//           code: errorMap.sharedFileCategory.existName,
//         });
//         break;
//     }
//     throw err;
//   }
// };

// sharedFileCategoryController.delete = async (ctx, next) => {
//   try {
//     const { params } = ctx.validateResult;
//     const realQuery = {
//       _id: params.id,
//     };
//     const dtc = await SharedFileCategoryService.detail(realQuery, {
//       _id: 1,
//     });
//     if (!dtc) {
//       ctx.throw(422, "cannot find sharedFileCategory", {
//         code: errorMap.sharedFileCategory.notExistTemplateCategory,
//       });
//     }
//     await SharedFileCategoryService.delete({ _id: dtc._id });
//     ctx.status = 204;
//     // 添加删除日志
//     OperationLogService.add(
//       ctx.session.user._id,
//       OperationLogActionEnum.delete,
//       OperationLogTypeEnum.sharedFileCategory,
//       OperationLogModuleEnum.sharedFileCategory,
//       dtc._id,
//       dtc.name
//     ).catch((err) => logger.error(err));
//   } catch (err) {
//     switch (err.message) {
//       case "existName":
//         ctx.throw(422, err.message, {
//           code: errorMap.sharedFileCategory.existName,
//         });
//         break;
//     }
//     throw err;
//   }
// };

// sharedFileCategoryController.list = async (ctx, next) => {
//   const { query } = ctx.validateResult;
//   const realQuery = {
//     ...query,
//   };

//   const result = await SharedFileCategoryService.list(realQuery, {
//     name: 1,
//     parentId: 1,
//   });

//   ctx.body = CommonService.responseData(result);
// };

module.exports = buriedEventController;
