'use strict';

const LogFormat = require('../lib/format');

module.exports = appInfo => {
    const config = {};
    config.logger = {
        contextFormatter: function (meta) {
            return JSON.stringify(LogFormat.getInstance(meta.ctx).format(meta));
        }
    };
    config.cuteLogger = {
        transports: ['redis'],
        channel: 'log',
        ex: 'cute.logs',
        topic: 'cute.serve.log',
    };
    return config;
};