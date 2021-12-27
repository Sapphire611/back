"use strict";

const { BuriedEvent,resourceEnum} = require("../models/buriedEvent");
const {
  CommonService: { getPageOptions },
} = require("../core/common");
const {
  mongo: { MongoError },
} = require("mongoose");

// buriedEventService 具体实现
const buriedEventService = {};

buriedEventService.findById = async (id) => {
  return await BuriedEvent.findById({ _id: id });
};

buriedEventService.add = async (event, realAttributes, realBody) => {
  // const result = await BuriedEvent.create(doc);

  const typeDict = {
    "Button_Click": () => {
      const body = {
        "value.resource": realBody.value.resource,
        "value.buttonName": realBody.value.buttonName,
        "value.responseTime.Click_time": realBody.value.responseTime.Click_time,
        "value.responseTime.Request_time": realBody.value.responseTime.Request_Time,
        "value.responseTime.Response_time": realBody.value.responseTime.Response_Time,
      };
      return body;
    },
  };

  return await BuriedEvent.discriminators[event].create(
    typeDict[event]()
  );
};

// buriedEventService.update = async (query, values, opr = "set") => {
//   try {
//     const realQuery = {};
//     if (Object.hasOwnProperty.call(query, "_id")) {
//       realQuery._id = query._id;
//     } else {
//       throw new Error("_id is null");
//     }
//     const realUpdates = {};
//     let oprKey;
//     switch (opr) {
//       case "set":
//         oprKey = "$set";
//         break;
//     }
//     const realValues = {};
//     if (Object.hasOwnProperty.call(values, "name")) {
//       realValues.name = values.name;
//     }
//     realUpdates[oprKey] = realValues;
//     await SharedFileCategory.updateOne(realQuery, realUpdates);
//     return;
//   } catch (err) {
//     if (err instanceof MongoError) {
//       if (err.code === 11000) {
//         if (err.keyPattern?.name) {
//           throw new Error("dup_key_name");
//         }
//       }
//     }
//     throw err;
//   }
// };

// sharedFileCategoryService.delete = async (query) => {
//   const realQuery = {};
//   if (Object.hasOwnProperty.call(query, "_id")) {
//     realQuery._id = query._id;
//   } else {
//     throw new Error("id is null");
//   }

//   // 删除父分类时,一并删除子分类以及文件(删除文件暂未完成)
//   const sub_category = await SharedFileCategory.find(
//     { parentId: realQuery._id },
//     { _id: 1 }
//   )
//     .lean()
//     .exec();

//   // 删除此分类下所有的子分类
//   for (const temp of sub_category) {
//     await SharedFileCategory.deleteOne(temp);
//   }

//   await SharedFileCategory.deleteOne(realQuery);
// };

buriedEventService.list = async (query, attributes) => {
  const realQuery = {};

  const realOptions = {
    ...getPageOptions(query),
  };

  const result = await BuriedEvent.find(
    realQuery,
    attributes,
    realOptions
  );

  return result;
};

// Detail ： 用于在 编辑/删除 之前判断对象是否存在
// sharedFileCategoryService.detail = async (query, attributes) => {
//   const realQuery = {};
//   if (Object.hasOwnProperty.call(query, "_id")) {
//     realQuery._id = query._id;
//   } else {
//     throw new Error("id is null");
//   }
//   const result = await SharedFileCategory.findOne(realQuery, attributes);
//   return result;
// };

module.exports = buriedEventService;
