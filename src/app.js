const config = require('config');
const _ = require('lodash');

const AppContext = require('./AppContext');
const Koa = require('koa');
const koaCors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const koaLogger = require('koa-logger');

const app = {};
const httpServer = new Koa();
const router = require('./router/index');

const { TrackEventService , PlatformInfoService } = AppContext.instance;

app.open = async () => {
	httpServer.use(koaCors())
		.use(koaLogger())
		.use(json())
		.use(bodyParser())
		.use(router);

	httpServer.listen(config.port, () => {
		console.log('http server listening on port ' + config.port);
	});

	await TrackEventService.open();
	await PlatformInfoService.open();
};

app.close = async () => {
	await TrackEventService.close();
	await PlatformInfoService.close();
};

module.exports = app;
