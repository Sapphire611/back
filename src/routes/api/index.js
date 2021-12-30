"use strict";

const router = require("@koa/router")();

const buriedEvent = require("./buriedEvent");
router.use(buriedEvent.routes(), buriedEvent.allowedMethods());

const trackEvent = require("./trackEvent");
router.use(trackEvent.routes(), trackEvent.allowedMethods());

module.exports = router;
