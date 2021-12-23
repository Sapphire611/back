"use strict";

const mongoose = require("mongoose");
const { baseOptions } = require("./base");
const { Schema } = mongoose;
const { Types } = Schema;


/**
 * @class buriedEventSchema 埋点事件
 * @memberOf module:FModel
 * @constructor
 * @property {string} event 事件(键)
 * @property {Mixed} value 值
 */

// Key = Event_ID 
const eventEnum = {
  button_click: "Button_Click",
  all_click: "ALL_Click",
  qr_scan: "QR_Scan",
  light_set: "Light_Set",
  airconditioner_set: "Airconditioner_Set",
  curtain_set: "Curtain_Set",
  microphone_set: "Microphone_Set",
  error: "Error"
};

const BuriedEventSchema = new Schema(
  {
    event: {
      type: String,
      enum: Object.values(eventEnum),
      required: true,
    },
  },
  { ...baseOptions, discriminatorKey: "event" }
);

BuriedEventSchema.index({ module: 1 }, { unique: true });
const model = mongoose.model("BuriedEvent", BuriedEventSchema);


const clickEnum = {
  app_click: "App_click",
  web_click: "Web_click",
  api_click: "API_click",
};

const buttonNameEnum = {
  light_on: "Light_on",
  light_off: "Light_off",
  airConditioner_on: "AirConditioner_on",
  airConditioner_off: "AirConditioner_off",
  projector_on: "Projector_on",
  projector_off: "Projector_off",
  tv_on: "TV_on",
  tv_off: "TV_off",
  led_on: "LED_on",
  led_off: "LED_off",
};


// 控制面板首页模块_点击按钮
model.discriminator(
  "Button_Click",
  new Schema({
    value: {
      type: new Schema({
        _id: false,
        resource: {
          type: String,
          enum: Object.values(clickEnum),
          required: true,
        },
        buttonName: {
          type: String,
          enum: Object.values(buttonNameEnum),
          required: true,
        },
        responseTime: {
          type: new Schema({
            _id: false,
            Click_time: { type: Date, required: true, },
            Request_time: { type: Date, required: true, },
            Response_time: { type: Date, required: true, },
          }),
        },
      }),
    },
  })
);

// 灯光模块
model.discriminator(
  "light",
  new Schema({
    value: {
      type: new Schema({
        _id: false,
        // 主机
        ip: {
          type: String,
          required: true,
        },
        port: {
          type: Number,
          required: true,
        },
      }),
    },
  })
);

// 空调模块
model.discriminator(
  "airConditioner",
  new Schema({
    value: {
      type: new Schema({
        _id: false,
        protocol: {
          type: String,
          enum: Object.values(protocolEnum),
          default: protocolEnum.http,
        },
        // 主机
        C: {
          type: String,
          required: true,
        },
        port: {
          type: Number,
          required: true,
        },
      }),
    },
  })
);

// 窗帘模块
model.discriminator(
  "curtain",
  new Schema({
    v: {
      type: new Schema({
        _id: false,
        // 主机
        ip: {
          type: String,
          required: true,
        },
        port: {
          type: Number,
          required: true,
        },
      }),
    },
  })
);

const mailSecureTypeEnum = {
  tls: "tls",
  starttls: "starttls",
  ssl: "ssl",
  none: "none",
};
exports.mailSecureTypeEnum = mailSecureTypeEnum;

// 麦克风模块
model.discriminator(
  "microphone",
  new Schema({
    value: {
      type: new Schema({
        _id: false,
        // 主机
        host: {
          type: String,
          required: true,
        },
        // 端口
        port: {
          type: Number,
          default: 25,
        },
        // 加密类型
        secure: {
          type: String,
          enum: Object.values(mailSecureTypeEnum),
        },
        // 用户名
        username: {
          type: String,
          trim: true,
        },
        // 密码
        password: {
          type: String,
        },
        // 发件人信息
        from: {
          type: String,
          trim: true,
          required: true,
        },
      }),
    },
  })
);

// 异常报错模块
model.discriminator(
  "error",
  new Schema({
    value: {
      type: new Schema({
        _id: false,
        title: { type: String },
        // 客户端应用id
        clientId: {
          type: String,
        },
        // 客户端secret
        clientSecret: {
          type: String,
        },
      }),
    },
  })
);