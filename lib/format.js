'use strict';

const url = require('url');
const MESSAGE = Symbol('LogFormat#message');
const MESSAGECTX = Symbol('LogFormat#messageCtx');
const deepGet = Symbol('LogFormat#deepGet');

class LogFormat {
  constructor() {
  }

  static getInstance() {
    if (!LogFormat.instance) {
      LogFormat.instance = new LogFormat();
    }
    return LogFormat.instance;
  }

  format(meta, appName) {
    const { ctx } = meta;
    if (ctx) {
      return this[MESSAGECTX](meta);
    }
    return this[MESSAGE](meta, appName);
  }

  [MESSAGE](meta, appName) {
    return {
      date: meta.date.replace(',', '.'),
      pid: process.pid,
      appName: appName || '',
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
    const { ctx } = meta;
    const params = JSON.stringify(Object.assign({}, ctx.request.query, ctx.request.body));
    const userIden = this[deepGet](ctx, ctx.app.config.cuteLogger.userKey, '');
    const use = `${(ctx.starttime ? Date.now() - ctx.starttime : 0)}ms`;
    const traceId = this[deepGet](ctx, 'tracer.traceId', '') || ctx.traceId || '';

    return {
      date: meta.date.replace(',', '.'),
      pid: process.pid,
      appName: ctx.app.config.name || '',
      level: meta.level,
      traceId,
      ip: ctx.ip,
      use,
      userIden,
      method: meta.ctx.method,
      funcName: (url.parse(meta.ctx.originalUrl).pathname || '').split('/').filter(f => f).join('.'),
      params,
      message: meta.message,
    };
  }

  [deepGet](object, path, defaultValue) {
    return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
    .reduce((o, k) => (o || {})[k], object) || defaultValue;
  }
}

module.exports = LogFormat;
