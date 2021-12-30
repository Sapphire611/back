"use strict";

const router = require("@koa/router")();
const { validate } = require("../../middlewares/validator");
const {
  platformInfoController,
  trackEventController,
} = require("../../controllers");
const platformInfoSchema = require("../../schemas/platformInfo");
const trackEventSchema = require("../../schemas/trackEvent");

router.prefix("/track");

/**
 * 1.1 前台基本信息事件  POST /trackPlatformInfoEvent
 */
router.post(
  "PlatformInfoEvent",
  validate(platformInfoSchema.add),
  platformInfoController.add
);

/**
 * 2.1 点击按钮事件  POST /trackButtonClickEvent
 */
router.post(
  "ButtonClickEvent",
  validate(trackEventSchema.ButtonClickEvent),
  trackEventController.ButtonClickEvent
);

// /**
//  * 2.2 点击全开/全关事件  POST /trackAllClickEvent
//  */
router.post(
  "AllClickEvent",
  validate(trackEventSchema.AllClickEvent),
  trackEventController.AllClickEvent
);

// /**
//  * 2.3 查看二维码事件  POST /trackQRScanEvent
//  */
router.post(
  "QRScanEvent",
  validate(trackEventSchema.QRScanEvent),
  trackEventController.QRScanEvent
);

// /**
//  * 3.1 调节灯光事件  POST /trackLightSetEvent
//  */
router.post(
  "LightSetEvent",
  validate(trackEventSchema.LightSetEvent),
  trackEventController.LightSetEvent
);

// /**
//  * 4.1 调节空调事件  POST /trackLightSetEvent
//  */
router.post(
  "AirconditionerSetEvent",
  validate(trackEventSchema.AirconditionerSetEvent),
  trackEventController.AirconditionerSetEvent
);

// /**
//  * 5.1 调节窗帘事件  POST /trackCurtainSetEvent
//  */
router.post(
  "CurtainSetEvent",
  validate(trackEventSchema.CurtainSetEvent),
  trackEventController.CurtainSetEvent
);

// /**
//  * 6.1 调节窗帘事件  POST /trackMicrophoneSetEvent
//  */
router.post(
  "MicrophoneSetEvent",
  validate(trackEventSchema.MicrophoneSetEvent),
  trackEventController.MicrophoneSetEvent
);

// /**
//  * 7.1 出现报错事件  POST /trackErrorEvent
//  */
router.post(
  "ErrorEvent",
  validate(trackEventSchema.ErrorEvent),
  trackEventController.ErrorEvent
);

module.exports = router;
