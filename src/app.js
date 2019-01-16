'use strict';

import express from 'express';
import bodyparser from 'body-parser';
import bunyanRequestLogger from 'bunyan-request-logger';
import cors from 'cors';
import contentLength from 'express-content-length-validator';

let _requestLogger = bunyanRequestLogger({
    name: "geonosis"});

var app = express();
app.use(_requestLogger.requestLogger());
app.enable('trust proxy');
app.use(contentLength.validateMax());
var router = express.Router();
app.use(bodyparser.json({ strict: false }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router);
let all_routes = require('./controller/router');
all_routes.init(app,router);

module.exports = app;
