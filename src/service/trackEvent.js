"use strict";

const { TrackEvent } = require("../models/trackEvent");
const EventEmitter = require('events');
const {
  CommonService: { getPageOptions },
} = require("../server/core/common");
const {
  mongo: { MongoError },
} = require("mongoose");

class TrackEventService extends EventEmitter {
  constructor(ctx) {
    super();
    this.ctx = ctx;
    this.logger = ctx.logger;
  }

  async open() {
    try {
      console.log('TrackEventService opened');
    } catch (error) {
      console.log(`TrackEventService open error: ${error}`);
    }
  }

  async close() {
    console.log('TrackEventService closed');
  }

  async findById(id) {
    return await TrackEvent.findById({ _id: id });
  }

  // 显示列表
  async list(query, attributes) {
    const realQuery = { ...query };

    const realOptions = {
      ...getPageOptions(query),
    };

    const result = await TrackEvent.find(realQuery, attributes, realOptions);

    return result;
  };

  // 根据字典集添加埋点事件
  async add(body) {
    if (!Reflect.has(body, "event")) {
      throw new Error("event is null");
    }

    const event = body?.event;

    const realBody = body;

    const typeDict = {
      Button_Click: () => {
        return {
          resource: realBody.resource,
          buttonName: realBody.buttonName,
          Click_time: realBody.Click_time,
          Request_time: realBody.Request_Time,
          Response_time: realBody.Response_Time,
        };
      },

      All_Click: () => {
        return {
          resource: realBody.resource,
          type: realBody.type,
          Click_time: realBody.Click_time,
        };
      },

      QR_Scan: () => {
        return {
          QR_Click: realBody.QR_Click,
          Last_time: realBody.Last_time,
        };
      },

      Light_Set: () => {
        return {
          resource: realBody.resource,
          lightMode: realBody.lightMode,
          lightIntensity: realBody.lightIntensity,
          Click_time: realBody.Click_time,
          Request_time: realBody.Request_Time,
          Response_time: realBody.Response_Time,
        };
      },

      Airconditioner_Set: () => {
        return {
          resource: realBody.resource,
          model: realBody.model,
          airconditionerSpeed: realBody.airconditionerSpeed,
          Click_time: realBody.Click_time,
          Request_time: realBody.Request_Time,
          Response_time: realBody.Response_Time,
        };
      },

      Curtain_Set: () => {
        return {
          resource: realBody.resource,
          buttonName: realBody.buttonName,
          Click_time: realBody.Click_time,
          Request_time: realBody.Request_Time,
          Response_time: realBody.Response_Time,
        };
      },

      Microphone_Set: () => {
        return {
          microphoneMode: realBody.microphoneMode,
          Click_time: realBody.Click_time,
          Request_time: realBody.Request_Time,
          Response_time: realBody.Response_Time,
        };
      },

      Error: () => {
        return {
          errorFrequency: realBody.errorFrequency,
          errorCode: realBody.errorCode,
          buttonName: realBody.buttonName,
          scanQR: realBody.scanQR,
          time: realBody.time,
        };
      },
    };

    return await TrackEvent.discriminators[event].create(typeDict[event]());
  }

  async detail(query, attributes) {
    const realQuery = { ...query };

    if (Reflect.has(query, "_id")) {
      realQuery._id = query._id;
    } else {
      throw new Error("id is null");
    }

    const realAttributes = { ...attributes };

    return await TrackEvent.findOne(realQuery, realAttributes);
  }
}

module.exports = TrackEventService;
