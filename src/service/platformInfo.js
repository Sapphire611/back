"use strict";

const { PlatformInfo } = require("../models/platformInfo");
const EventEmitter = require('events');

class PlatformInfoService extends EventEmitter {
	constructor(ctx) {
		super();
		this.ctx = ctx;
		this.logger = ctx.logger;
	}

	async open() {
		try {
			console.log('PlatformInfoService opened');
		} catch (error) {
			console.log(`PlatformInfoService open error: ${error}`);
		}
	}

	async close() {
		console.log('PlatformInfoService closed');
	}

	async add(doc){
    return await PlatformInfo.create(doc);
  }
	
	async findById(){
    return await PlatformInfo.findById({ _id: id });
  }
}

module.exports = PlatformInfoService;
