"use strict";

const mongoose = require("mongoose");
const { baseOptions } = require("./base");
const { Schema } = mongoose;
const { Types } = Schema;

/**
 * @class buriedEventSchema 埋点事件
 * @memberOf FModel
 * @constructor
 * @property {string} event 事件(键)
 * @property {Mixed} value 值
 */

const BuriedEventSchema = new Schema(
  {
    event: {
      type: String,
      required: true,
    },
  },
  { ...baseOptions, discriminatorKey: "event" }
);

const model = mongoose.model("BuriedEvent", BuriedEventSchema);

// 控制面板首页模块_点击按钮
model.discriminator(
  "Button_Click",
  new Schema({
    value: {
      type: new Schema({
        _id: false,
        resource: {
          type: String,
          required: true,
        },
        buttonName: {
          type: String,
          required: true,
        },
        responseTime: {
          type: new Schema({
            _id: false,
            Click_time: { type: Number, required: true },
            Request_time: { type: Number, required: true },
            Response_time: { type: Number, required: true },
          }),
        },
      }),
    },
  })
);

// 控制面板首页模块_点击全 开/关
model.discriminator(
  "All_Click",
  new Schema({
    value: {
      type: new Schema({
        _id: false,
        resource: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        time: {
          type: new Schema({
            _id: false,
            Click_time: { type: Number, required: true },
          }),
        },
      }),
    },
  })
);

// 控制面板首页模块_查看二维码
model.discriminator(
  "QR_Scan",
  new Schema({
    value: {
      type: new Schema({
        _id: false,
        type: {
          type: String,
          required: true,
        },
        time: {
          type: new Schema({
            _id: false,
            Last_time: { type: Number, required: true },
          }),
        },
      }),
    },
  })
);

// 灯光模块_调节灯光
model.discriminator(
  "Light_Set",
  new Schema({
    value: {
      type: new Schema({
        _id: false,
        resource: {
          type: String,
          required: true,
        },
        lightMode: {
          type: String,
          required: true,
        },
        lightIntensity: {
          type: Number,
          min: 0.1,
          max: 1.0,
        },
        responseTime: {
          type: new Schema({
            _id: false,
            Click_time: { type: Number, required: true },
            Request_time: { type: Number, required: true },
            Response_time: { type: Number, required: true },
          }),
        },
      }),
    },
  })
);

// 空调模块_调节空调
model.discriminator(
  "Airconditioner_Set",
  new Schema({
    value: {
      resource: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      airconditionerSpeed: {
        type: String,
        required: true,
      },
      responseTime: {
        type: new Schema({
          _id: false,
          Click_time: { type: Number, required: true },
          Request_time: { type: Number, required: true },
          Response_time: { type: Number, required: true },
        }),
      },
    },
  })
);

// 窗帘模块_调节窗帘
model.discriminator(
  "Curtain_Set",
  new Schema({
    value: {
      resource: {
        type: String,
        required: true,
      },
      buttonName: {
        type: String,
        required: true,
      },
      responseTime: {
        type: new Schema({
          _id: false,
          Click_time: { type: Number, required: true },
          Request_time: { type: Number, required: true },
          Response_time: { type: Number, required: true },
        }),
      },
    },
  })
);

// 麦克风模块_调节麦克风
model.discriminator(
  "Microphone_Set",
  new Schema({
    value: {
      microphoneMode: {
        type: String,
        required: true,
      },
      responseTime: {
        type: new Schema({
          _id: false,
          Click_time: { type: Number, required: true },
          Request_time: { type: Number, required: true },
          Response_time: { type: Number, required: true },
        }),
      },
    },
  })
);

// 异常报错_出现报错
model.discriminator(
  "Error",
  new Schema({
    value: {
      errorFrequency: {
        type: Number,
        required: true,
      },
      errorCode: {
        type: String,
        required: true,
      },
      buttonName: {
        type: String,
        required: true,
      },
      scanQR: {
        type: Number,
        required: true,
      },
      time: {
        type: Number,
        required: true,
      },
    },
  })
);

exports.BuriedEvent = mongoose.model("BuriedEvent");
