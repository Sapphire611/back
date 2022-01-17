const moment = require('moment');
const config = require('config');
const logger = require('./logger').logger.child({ module: 'ceibs-mock' });

class AppContext {
	static get instance() {
		if (!this._instance) {
			this._instance = new AppContext();
		}
		return this._instance;
	}

	constructor() {
		if (AppContext._instance) {
			return AppContext._instance;
		}

		this.init();
	}

	init() {
		this.startup = moment();
		this.logger = logger;
	}
}

module.exports = AppContext;
