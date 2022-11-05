# egg-cute-logger

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
  userKey: 'state.user.userIden',
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
