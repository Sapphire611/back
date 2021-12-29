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
        "value.resource": realBody.value.resource,
        "value.buttonName": realBody.value.buttonName,
        "value.responseTime.Click_time": realBody.value.responseTime.Click_time,
        "value.responseTime.Request_time":
          realBody.value.responseTime.Request_Time,
        "value.responseTime.Response_time":
          realBody.value.responseTime.Response_Time,
      };
    },

    All_Click: () => {
      return {
        "value.resource": realBody.value.resource,
        "value.type": realBody.value.type,
        "value.responseTime.time": realBody.value.time.Click_time,
      };
    },

    QR_Scan: () => {
      return {
        "value.type": realBody.value.type,
        "value.time.Last_time": realBody.value.time.Last_time,
      };
    },

    Light_Set: () => {
      return {
        "value.resource": realBody.value.resource,
        "value.lightMode": realBody.value.lightMode,
        "value.lightIntensity": realBody.value.lightIntensity,
        "value.responseTime.Click_time": realBody.value.responseTime.Click_time,
        "value.responseTime.Request_time":
          realBody.value.responseTime.Request_Time,
        "value.responseTime.Response_time":
          realBody.value.responseTime.Response_Time,
      };
    },

    Airconditioner_Set: () => {
      return {
        "value.resource": realBody.value.resource,
        "value.model": realBody.value.model,
        "value.airconditionerSpeed": realBody.value.airconditionerSpeed,
        "value.responseTime.Click_time": realBody.value.responseTime.Click_time,
        "value.responseTime.Request_time":
          realBody.value.responseTime.Request_Time,
        "value.responseTime.Response_time":
          realBody.value.responseTime.Response_Time,
      };
    },

    Curtain_Set: () => {
      return {
        "value.resource": realBody.value.resource,
        "value.buttonName": realBody.value.buttonName,
        "value.responseTime.Click_time": realBody.value.responseTime.Click_time,
        "value.responseTime.Request_time":
          realBody.value.responseTime.Request_Time,
        "value.responseTime.Response_time":
          realBody.value.responseTime.Response_Time,
      };
    },

    Microphone_Set: () => {
      return {
        "value.microphoneMode": realBody.value.microphoneMode,
        "value.responseTime.Click_time": realBody.value.responseTime.Click_time,
        "value.responseTime.Request_time":
          realBody.value.responseTime.Request_Time,
        "value.responseTime.Response_time":
          realBody.value.responseTime.Response_Time,
      };
    },

    Error: () => {
      return {
        "value.errorFrequency": realBody.value.errorFrequency,
        "value.errorCode": realBody.value.errorCode,
        "value.buttonName": realBody.value.buttonName,
        "value.scanQR": realBody.value.scanQR,
        "value.time": realBody.value.time,
      };
    },
  };

  return await BuriedEvent.discriminators[event].create(typeDict[event]());
};

module.exports = buriedEventService;
