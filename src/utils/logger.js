'use strict';
var bunyan = require('bunyan');

export default class logger {
    constructor() {
        return bunyan.createLogger(
            {
                name: "ninja-service",
                streams: [
                    {
                        stream: process.stdout
                    },
                    {
                        path: 'logs/ninja-service.log'
                    }
                ],
                serializers: {
                    req: bunyan.stdSerializers.req
                },
            });
    }
}