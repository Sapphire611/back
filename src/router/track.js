const moment = require('moment');
const Router = require('koa-router');
const AppContext = require('../AppContext');
const { validate } = require('../server/middlewares/validator');
const { CommonService } = require('../server/core/common');

const trackEventSchema = require('../server/schemas/trackEvent');
const platformInfoSchema = require('../server/schemas/platformInfo');

const { TrackEventService, PlatformInfoService } = AppContext.instance;

const router = new Router();

// test
router.get('/', async ctx => {
	ctx.body = {
		service: 'Siruis-Mock',
		env: process.env.NODE_ENV,
		timestamp: moment().format('LLLL'),
		t: moment().unix(),
	};
});

/**
 * 1.1 前台基本信息事件  POST /trackPlatformInfoEvent
 */
router.post("/trackPlatformInfoEvent", validate(platformInfoSchema.add), async (ctx) => {
	const { body } = ctx.validateResult;
	const realBody = {
		...body,
	};

	const realAttributes = {};

	const result = await PlatformInfoService.add(realBody);

	ctx.body = CommonService.responseData(result);
});

/**
 * 2.1 点击按钮事件  POST /trackButtonClickEvent
 */
router.post("/trackButtonClickEvent", validate(trackEventSchema.ButtonClickEvent), async (ctx) => {
	const { body } = ctx.validateResult;
	const realBody = {
		event: "Button_Click",
		...body,
	};

	const realAttributes = {};

	const result = await TrackEventService.add(realBody, realAttributes);

	ctx.body = CommonService.responseData(result);
});

/**
 * 2.2 点击全开/全关事件  POST /trackAllClickEvent
 */
router.post("/trackAllClickEvent", validate(trackEventSchema.AllClickEvent), async (ctx) => {
	const { body } = ctx.validateResult;
	const realBody = {
		event: "All_Click",
		...body,
	};

	const realAttributes = {};

	const result = await TrackEventService.add(realBody, realAttributes);

	ctx.body = CommonService.responseData(result);
});

/**
 * 2.3 查看二维码事件  POST /trackQRScanEvent
 */
router.post("/trackQRScanEvent", validate(trackEventSchema.QRScanEvent), async (ctx) => {
	const { body } = ctx.validateResult;
	const realBody = {
		event: "QR_Scan",
		...body,
	};

	const realAttributes = {};

	const result = await TrackEventService.add(realBody, realAttributes);

	ctx.body = CommonService.responseData(result);
});

/**
 * 3.1 调节灯光事件  POST /trackLightSetEvent
 */
router.post("/trackLightSetEvent", validate(trackEventSchema.LightSetEvent), async (ctx) => {
	const { body } = ctx.validateResult;
	const realBody = {
		event: "Light_Set",
		...body,
	};

	const realAttributes = {};

	const result = await TrackEventService.add(realBody, realAttributes);

	ctx.body = CommonService.responseData(result);
});

/**
 * 4.1 调节空调事件  POST /trackLightSetEvent
 */
router.post("/trackAirconditionerSetEvent", validate(trackEventSchema.AirconditionerSetEvent), async (ctx) => {
	const { body } = ctx.validateResult;
	const realBody = {
		event: "Airconditioner_Set",
		...body,
	};

	const realAttributes = {};

	const result = await TrackEventService.add(realBody, realAttributes);

	ctx.body = CommonService.responseData(result);
});

/**
 * 5.1 调节窗帘事件  POST /trackCurtainSetEvent
 */
router.post("/trackCurtainSetEvent", validate(trackEventSchema.CurtainSetEvent), async (ctx) => {
	const { body } = ctx.validateResult;
	const realBody = {
		event: "Curtain_Set",
		...body,
	};

	const realAttributes = {};

	const result = await TrackEventService.add(realBody, realAttributes);

	ctx.body = CommonService.responseData(result);
});

/**
 * 6.1 调节窗帘事件  POST /trackMicrophoneSetEvent
 */
router.post("/trackMicrophoneSetEvent", validate(trackEventSchema.MicrophoneSetEvent), async (ctx) => {
	const { body } = ctx.validateResult;
	const realBody = {
		event: "Microphone_Set",
		...body,
	};

	const realAttributes = {};

	const result = await TrackEventService.add(realBody, realAttributes);

	ctx.body = CommonService.responseData(result);
});

/**
 * 7.1 出现报错事件  POST /trackErrorEvent
 */
router.post("/trackErrorEvent", validate(trackEventSchema.ErrorEvent), async (ctx) => {
	const { body } = ctx.validateResult;
	const realBody = {
		event: "Error",
		...body,
	};

	const realAttributes = {};

	const result = await TrackEventService.add(realBody, realAttributes);

	ctx.body = CommonService.responseData(result);
});

/**
 * 获取所有埋点事件  GET /trackEvent
 */
router.get("/trackEvent", validate(trackEventSchema.list), async (ctx) => {
	const { query } = ctx.validateResult;
	const realQuery = {
		...query,
	};

	const realAttributes = { "__v": 0 };

	const result = await TrackEventService.list(realQuery, realAttributes);

	ctx.status = 200;
	ctx.body = CommonService.responseData(result, ctx.status);
});

/**
 * 查询一个埋点事件  POST /trackEvent
 */
router.get("/trackEvent/:id", validate(trackEventSchema.detail), async (ctx) => {
	const { params } = ctx.validateResult;
	const realQuery = {
		_id: params.id,
	};

	const realAttributes = { "__v": 0 };

	const result = await TrackEventService.detail(realQuery, realAttributes);

	if (!result) {
		ctx.throw(404);
	}
	ctx.body = CommonService.responseData(result);
});

/**
 * 添加一个埋点事件  POST /api/v1/buriedEvent
 */
router.post("/trackEvent", validate(trackEventSchema.add), async (ctx) => {
	const { body } = ctx.validateResult;
	const realBody = {
		event: body.event,
		...body.value,
	};

	const result = await TrackEventService.add(realBody);

	ctx.body = CommonService.responseData(result);
});


module.exports = router;
