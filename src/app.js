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
const mongodb = require('./server/core/mongodb');

app.open = async () => {
	httpServer.use(koaCors())
		.use(koaLogger())
		.use(json())
		.use(bodyParser())
		.use(router);

	httpServer.listen(config.port, () => {
		console.log('http server listening on port ' + config.port);
	});

};

app.close = async () => {

};

module.exports = app;
