'use strict';

import express from 'express';
import bodyparser from 'body-parser';
import bunyanRequestLogger from 'bunyan-request-logger';
import cors from 'cors';
import ratelimit from 'express-rate-limit';
import helmet from 'helmet';
import contentLength from 'express-content-length-validator';

let _requestLogger = bunyanRequestLogger({
    name: "node-express-seed"});

var app = express();
app.use(_requestLogger.requestLogger());
app.enable('trust proxy');
let limiter = new ratelimit({
    windowMs:60, //60 sec
    max: 10, //10 requests per second
    delayAfter:5, //start delaying responses after 5 calls from the same IP
    delayMs: 3*1000 // 3000ms delay
});
app.use(limiter);
/**
 * helmet settings to prevent some security vulnerabilities
 */
app.use(helmet.hidePoweredBy());
app.use(helmet.dnsPrefetchControl({ allow: false }));
app.use(helmet.xssFilter());
app.use(contentLength.validateMax());
var router = express.Router();
app.use(bodyparser.json({ strict: false }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router);
let all_routes = require('./controller/router');
all_routes.init(app,router);

module.exports = app;
