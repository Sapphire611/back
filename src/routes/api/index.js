"use strict"

const router = require("@koa/router")();
router.prefix("/api");

const buriedEvent = require("./buriedEvent");
router.use(buriedEvent.routes(),buriedEvent.allowedMethods());

module.exports = router;