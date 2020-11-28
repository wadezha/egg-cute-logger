'use strict';

const url = require('url');
const MESSAGE = Symbol('LogFormat#message');
const MESSAGECTX = Symbol('LogFormat#messageCtx');

class LogFormat {
  constructor(ctx) {
    this.ctx = ctx;
  }

  static getInstance(ctx) {
    if (!LogFormat.instance) {
      LogFormat.instance = new LogFormat(ctx);
    }
    return LogFormat.instance;
  }

  format(meta, name) {
    if (this.ctx) {
      return this[MESSAGECTX](meta);
    }
    return this[MESSAGE](meta, name);
  }

  [MESSAGE](meta, name) {
    return {
      date: meta.date,
      pid: process.pid,
      appName: name || '-',
      level: meta.level,
      traceId: '',
      ip: '',
      use: '',
      userIden: '',
      method: '',
      funcName: '',
      params: '',
      message: meta.message,
    };
  }

  [MESSAGECTX](meta) {
    const { ctx } = this;
    const params = JSON.stringify(Object.assign({}, ctx.request.query, ctx.body));
    const userIden = (ctx.session && ctx.session.user) ? ctx.session.user.userIden : '-';
    const use = `${(ctx.starttime ? Date.now() - ctx.starttime : 0)}ms`;
    const traceId = ctx.tracer && ctx.tracer.traceId;

    return {
      date: meta.date,
      pid: process.pid,
      appName: ctx.app.config.name || '-',
      level: meta.level,
      traceId: traceId || '',
      ip: ctx.ip,
      use,
      userIden,
      method: ctx.method,
      funcName: (url.parse(ctx.url).pathname || '').split('/').filter(f => f).join('.'),
      params,
      message: meta.message,
    };
  }
}

module.exports = LogFormat;
