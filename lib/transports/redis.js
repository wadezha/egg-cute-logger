'use strict';

const assert = require('assert');
const Transport = require('egg-logger').Transport;

class RedisTransport extends Transport {

  constructor(options, app) {
    assert(options && options.channel, 'should pass options.channel');
    assert(app && app.redis, 'should pass app.redis');
    super(options);
    this.app = app;
  }

  /**
   * output log, see {@link Transport#log}
   * @param  {String} level - log level
   * @param  {Array} args - all arguments
   * @param  {Object} meta - meta information
   */
  log(level, args, meta) {
    const msg = super.log(level, args, meta);
    this.app.redis.publish(this.options.channel, msg);
  }
}

module.exports = RedisTransport;
