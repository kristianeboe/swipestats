// import * as debug from 'debug'
const d = require('debug');

export default function logger(name: string) {
  return d('swipestats:server:' + name);
}
