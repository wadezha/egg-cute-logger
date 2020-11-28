'use strict';

const RedisTransport = require('./lib/transports/redis');
const AmqpTransport = require('./lib/transports/amqp');

module.exports = app => {

  if (app.config.cuteLogger.transports.includes('redis')) {
    const redisTransport = new RedisTransport({
      level: app.config.logger.consoleLevel,
      contextFormatter: app.config.logger.contextFormatter,
      channel: app.config.cuteLogger.channel || 'log',
      eol: app.config.cuteLogger.eol,
    }, app);

    app.logger.set('redis', redisTransport);
  }

  if (app.config.cuteLogger.transports.includes('amqp')) {
    const amqpTransport = new AmqpTransport({
      level: app.config.logger.consoleLevel,
      contextFormatter: app.config.logger.contextFormatter,
      ex: app.config.cuteLogger.ex || 'log',
      topic: app.config.cuteLogger.topic || 'log',
      eol: app.config.cuteLogger.eol,
    }, app);

    app.logger.set('amqp', amqpTransport);
  }

};
