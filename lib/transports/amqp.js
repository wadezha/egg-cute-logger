'use strict';

const assert = require('assert');
const Transport = require('egg-logger').Transport;

class AmqpTransport extends Transport {

  constructor(options, app) {
    assert(options && options.ex, 'should pass options.ex');
    assert(options && options.topic, 'should pass options.topic');
    assert(app && app.amqplib, 'should pass app.amqplib');
    super(options);
    this.app = app;
    this.ch = null;
  }

  /**
   * output log, see {@link Transport#log}
   * @param  {String} level - log level
   * @param  {Array} args - all arguments
   * @param  {Object} meta - meta information
   */
  async log(level, args, meta) {

    const msg = super.log(level, args, meta);

    const ch = await this.app.amqplib.createChannel();
    await ch.assertExchange(this.options.ex, 'topic', { durable: false });
    ch.publish(this.options.ex, this.options.topic, Buffer.from(msg));
    ch.close();
  }
}

module.exports = AmqpTransport;
