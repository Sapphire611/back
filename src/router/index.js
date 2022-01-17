const compose = require('koa-compose');
const _ = require('lodash');

let mods = [
	require('./mock'),
];

let routers = [];
_.each(mods, x => {
	routers.push(x.routes());
	routers.push(x.allowedMethods());
});

module.exports = compose(routers);