
interface EggCuteLoggerOptions {
  transports?: string[];
  channel?: string;
  ex?: string;
  topic?: string;
  userKey?: string;
}

declare module 'egg' {
  interface EggAppConfig {
    cuteLogger: EggCuteLoggerOptions;
  }
}

export declare class LogFormat {
  static getInstance(): LogFormat;
  format(meta?: object, name?: string): object;
}
