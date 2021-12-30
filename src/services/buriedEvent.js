"use strict";

const { BuriedEvent } = require("../models/buriedEvent");
const {
  CommonService: { getPageOptions },
} = require("../core/common");
const {
  mongo: { MongoError },
} = require("mongoose");

// buriedEventService 具体实现
const buriedEventService = {};

buriedEventService.findById = async (id) => {
  return await BuriedEvent.findById({ _id: id });
};

buriedEventService.list = async (query, attributes) => {
  const realQuery = {};

  const realOptions = {
    ...getPageOptions(query),
  };

  const result = await BuriedEvent.find(realQuery, attributes, realOptions);

  return result;
};

buriedEventService.add = async (realBody, realAttributes) => {
  const event = realBody.event;

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

  return await BuriedEvent.discriminators[event].create(typeDict[event]());
};

buriedEventService.detail = async (query, attributes) => {
  return await BuriedEvent.findById({ _id: query._id });
};

module.exports = buriedEventService;
