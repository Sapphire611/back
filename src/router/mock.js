const moment = require('moment');
const Router = require('koa-router');
const AppContext = require('../AppContext');
const { validate } = require('../server/middlewares/validator');

const healthCodeSchema = require('../server/schemas/healthCode');

const router = new Router();

// test
router.get('/', async ctx => {
	ctx.body = {
		service: 'ceibs-healthCode-Mock',
		env: process.env.NODE_ENV,
		timestamp: moment().format('LLLL'),
		t: moment().unix(),
	};
});

/**
 * mock 二维码链接数据
 */
router.post("/healthCode", validate(healthCodeSchema.add), async (ctx) => {
	const { body } = ctx.validateResult;

	const result = {
		"code": "0",
    "message": "success",
    "data": [
        {
            "type": "00"
        }
    ]
	};

	ctx.body = result;
});

module.exports = router;
