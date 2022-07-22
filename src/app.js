/*
 * @Author: Sapphire Liu
 * @Date: 2022-07-21 16:55:08
 * @LastEditors: Sapphire Liu
 * @LastEditTime: 2022-07-22 12:32:30
 * @Description: app.js
 */
const config = require("config");
const _ = require("lodash");

const AppContext = require("./AppContext");
const Koa = require("koa");
const koaCors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const json = require("koa-json");
const koaLogger = require("koa-logger");

const app = {};
const httpServer = new Koa();
const router = require("./router/index");
const mongodb = require("./server/core/mongodb");

// const { TrackEventService, PlatformInfoService } = AppContext.instance;

app.open = async () => {
  httpServer
    .use(koaCors())
    .use(koaLogger())
    .use(json())
    .use(bodyParser())
    .use(router);

  httpServer.listen(config.port, () => {
    console.log("http server listening on port " + config.port);
  });

  // await mongodb.open();
  // await TrackEventService.open();
  // await PlatformInfoService.open();
};

app.close = async () => {
  // await mongodb.open();
  // await TrackEventService.close();
  // await PlatformInfoService.close();
};

module.exports = app;
