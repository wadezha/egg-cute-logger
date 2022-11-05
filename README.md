# egg-cute-logger

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-cute-logger.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-cute-logger
[travis-image]: https://img.shields.io/travis/eggjs/egg-cute-logger.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-cute-logger
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-cute-logger.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-cute-logger?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-cute-logger.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-cute-logger
[snyk-image]: https://snyk.io/test/npm/egg-cute-logger/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-cute-logger
[download-image]: https://img.shields.io/npm/dm/egg-cute-logger.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-cute-logger

<!--
Support Egg Logger multiple transports (redis, amqp)
-->

## Install

```bash
$ npm i egg-cute-logger --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.cuteLogger = {
  enable: true,
  package: 'egg-cute-logger',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.cuteLogger = {
  transports: ['redis'],
  channel: 'log',
  ex: 'cute.logs',
  topic: 'cute.serve.log',
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
