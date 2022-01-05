"use strict";
const Joi = require("joi");
const custom = require("../core/joiExtends");
const { getList, getListNoSort } = require("./globalTemplate");

/**
 * TrackEvent 前端数据校验
 */

exports.ButtonClickEvent = {
  body: {
    resource: Joi.string()
      .required()
      .valid("App_click", "Web_click", "API_click"),
    buttonName: Joi.string().required(),
    Click_time: Joi.string(),
    Request_time: Joi.string(),
    Response_time: Joi.string(),
  },
};

exports.AllClickEvent = {
  body: {
    resource: Joi.string()
      .required()
      .valid("App_click", "Web_click", "API_click"),
    type: Joi.string().required().valid("Turn_on", "Turn_off"),
    Click_time: Joi.string(),
  },
};

exports.QRScanEvent = {
  body: {
    QR_Click: Joi.string().required(),
    Last_time: Joi.string().required(),
  },
};

exports.LightSetEvent = {
  body: {
    resource: Joi.string()
      .required()
      .valid("App_click", "Web_click", "API_click"),
    lightMode: Joi.string()
      .required()
      .valid("Mode_talking", "Mode_presentation", "Mode_customize"),
    lightIntensity: Joi.number().required().min(0.1).max(1.0),
    Click_time: Joi.string(),
    Request_time: Joi.string(),
    Response_time: Joi.string(),
  },
};

exports.AirconditionerSetEvent = {
  body: {
    resource: Joi.string()
      .required()
      .valid("App_click", "Web_click", "API_click"),
    model: Joi.string().required().valid("cold", "warm"),
    airconditionerSpeed: Joi.string()
      .required()
      .valid("Speed_L", "Speed_M", "Speed_H"),
    Click_time: Joi.string(),
    Request_time: Joi.string(),
    Response_time: Joi.string(),
  },
};

exports.CurtainSetEvent = {
  body: {
    resource: Joi.string()
      .required()
      .valid("App_click", "Web_click", "API_click"),
    buttonName: Joi.string()
      .required()
      .valid("Till_out", "Till_in", "Up", "Down", "Stop", "Customize"),
    Click_time: Joi.string(),
    Request_time: Joi.string(),
    Response_time: Joi.string(),
  },
};

exports.MicrophoneSetEvent = {
  body: {
    microphoneMode: Joi.string()
      .required()
      .valid("Celling&Handhold", "Handhold_only"),
    Click_time: Joi.string(),
    Request_time: Joi.string(),
    Response_time: Joi.string(),
  },
};

exports.ErrorEvent = {
  body: {
    errorFrequency: Joi.string().required(),
    errorCode: Joi.number().required(),
    buttonName: Joi.string().required(),
    scanQR: Joi.number(),
    time: Joi.string(),
  },
};


// =====================
// basic for use
exports.list = {
  query: {
    search: Joi.string().trim(),
    ...getList,
  },
};

exports.detail = {
  params: {
    id: custom.strObjectId().required(),
  },
};

exports.add = {
  body: {
    event: Joi.string()
      .required()
      .valid(
        "Button_Click",
        "All_Click",
        "QR_Scan",
        "Light_Set",
        "Airconditioner_Set",
        "Curtain_Set",
        "Microphone_Set",
        "Error"
      ),
    value: Joi.required(),
  },
};

// exports.update = {
//   params: {
//     id: custom.strObjectId().required(),
//   },
//   body: {
//      ...
//   },
// };

exports.delete = {
  params: {
    id: custom.strObjectId().required(),
  },
};
