"use strict";
const { CommonService } = require("../core/common");

const buriedEventService = require("../services/buriedEvent");

const trackEventController = {};

trackEventController.ButtonClickEvent = async (ctx, next) => {
  const { body } = ctx.validateResult;
  const realBody = {
    event: "Button_Click",
    ...body,
  };

  const realAttributes = {};

  const result = await buriedEventService.add(realBody, realAttributes);

  ctx.body = CommonService.responseData(result);
};

trackEventController.AllClickEvent = async (ctx, next) => {
  const { body } = ctx.validateResult;
  const realBody = {
    event: "All_Click",
    ...body,
  };

  const realAttributes = {};

  const result = await buriedEventService.add(realBody, realAttributes);

  ctx.body = CommonService.responseData(result);
};

trackEventController.QRScanEvent = async (ctx, next) => {
  const { body } = ctx.validateResult;
  const realBody = {
    event: "QR_Scan",
    ...body,
  };

  const realAttributes = {};

  const result = await buriedEventService.add(realBody, realAttributes);

  ctx.body = CommonService.responseData(result);
};

trackEventController.LightSetEvent = async (ctx, next) => {
  const { body } = ctx.validateResult;
  const realBody = {
    event: "Light_Set",
    ...body,
  };

  const realAttributes = {};

  const result = await buriedEventService.add(realBody, realAttributes);

  ctx.body = CommonService.responseData(result);
};

trackEventController.AirconditionerSetEvent = async (ctx, next) => {
  const { body } = ctx.validateResult;
  const realBody = {
    event: "Airconditioner_Set",
    ...body,
  };

  const realAttributes = {};

  const result = await buriedEventService.add(realBody, realAttributes);

  ctx.body = CommonService.responseData(result);
};

trackEventController.CurtainSetEvent = async (ctx, next) => {
  const { body } = ctx.validateResult;
  const realBody = {
    event: "Curtain_Set",
    ...body,
  };

  const realAttributes = {};

  const result = await buriedEventService.add(realBody, realAttributes);

  ctx.body = CommonService.responseData(result);
};

trackEventController.MicrophoneSetEvent = async (ctx, next) => {
  const { body } = ctx.validateResult;
  const realBody = {
    event: "Microphone_Set",
    ...body,
  };

  const realAttributes = {};

  const result = await buriedEventService.add(realBody, realAttributes);

  ctx.body = CommonService.responseData(result);
};

trackEventController.ErrorEvent = async (ctx, next) => {
  const { body } = ctx.validateResult;
  const realBody = {
    event: "Error",
    ...body,
  };

  const realAttributes = {};

  const result = await buriedEventService.add(realBody, realAttributes);

  ctx.body = CommonService.responseData(result);
};


module.exports = trackEventController;
