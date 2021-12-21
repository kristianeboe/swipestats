// import * as debug from 'debug'
const d = require('debug');

export default function debug(name: string) {
  return d('swipestats:client:' + name);
}

export const logger =
  (debug: any) =>
  (m: string, ...args: any[]) => {
    // TODO: If chrome console log, else debug
    console.log(m, ...args);
    debug(m, ...args);
  };
