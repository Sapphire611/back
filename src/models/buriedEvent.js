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

const resourceEnum = {
  app_click: "App_click",
  web_click: "Web_click",
  api_click: "API_click",
};

const typeEnum = {
  turn_on: "Turn_on",
  turn_off: "Turn_off",
  qr_click: "QR_click"
};

const ligntButtonNameEnum = {
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

const curtainButtonNameEnum = {
  till_out: "Till_out",
  till_in: "Till_in",
  up: "Up",
  down: "Down",
  stop: "Stop",
  customize: "Customize",
};

const lightModeEnum = {
  mode_talking: "Mode_talking",
  mode_presentation: "Mode_presentation",
  mode_customize: "Mode_customize",
};

const airConditionerModeEnum = {
  cold: "cold",
  warm: "warm"
};

const airConditionerSpeedEnum = {
  speed_L: "Speed_L",
  speed_M: "Speed_M",
  speed_H: "Speed_H"
};

const microphoneModeEnum = {
  celling_and_handhold: "Celling&Handhold",
  handhold_only: "Handhold_only"
}
// 控制面板首页模块_点击按钮
model.discriminator(
  "Button_Click",
  new Schema({
    value: {
      type: new Schema({
        _id: false,
        resource: {
          type: String,
          enum: Object.values(resourceEnum),
          required: true,
        },
        buttonName: {
          type: String,
          enum: Object.values(ligntButtonNameEnum),
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

// 控制面板首页模块_点击全 开/关
model.discriminator(
  "All_Click",
  new Schema({
    value: {
      type: new Schema({
        _id: false,
        resource: {
          type: String,
          enum: Object.values(resourceEnum),
          required: true,
        },
        type: {
          type: String,
          enum: Object.values(typeEnum),
          required: true,
        },
        time: {
          type: new Schema({
            _id: false,
            Click_time: { type: Date, required: true, },
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
          enum: Object.values(typeEnum),
          required: true,
        },
        time: {
          type: new Schema({
            _id: false,
            Last_time: { type: Date, required: true, },
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
          enum: Object.values(resourceEnum),
          required: true,
        },
        lightMode: {
          type: String,
          enum: Object.values(lightModeEnum),
          required: true,
        },
        lightIntensity: {
          type: Number,
          min: 0.1,
          max: 1.0
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

// 空调模块_调节空调
model.discriminator(
  "Airconditioner_Set",
  new Schema({
    value: {
      resource: {
        type: String,
        enum: Object.values(resourceEnum),
        required: true,
      },
      model: {
        type: String,
        enum: Object.values(airConditionerModeEnum),
        required: true,
      },
      airconditionerSpeed: {
        type: String,
        enum: Object.values(airConditionerSpeedEnum),
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
        enum: Object.values(resourceEnum),
        required: true,
      },
      model: {
        type: String,
        enum: Object.values(curtainButtonNameEnum),
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
        enum: Object.values(microphoneModeEnum),
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
        type: String,
        required: true,
      },
      time:{
        type: Date,
        required: true,
      }
    },
  })
);