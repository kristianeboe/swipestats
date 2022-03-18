import d from 'debug';
// const d = require('debug');

export default function debug(name: string) {
  return d('swipestats:client:' + name);
}

export const logger =
  (debug: any) =>
  (m: string, ...args: any[]) => {
    // Detect Chrome
    let chromeAgent =
      typeof window !== 'undefined' && window?.navigator?.userAgent?.indexOf('Chrome') > -1;
    if (chromeAgent) {
      console.log(m, ...args);
    } else {
      debug(m, ...args);
    }
  };

// export const l = (moduleName: string) => {
//   return d('swipestats:client:' + moduleName);
// };
// (m: string, ...args: any[]) => debug(+m, ...args);

export const logModule = (name: string) => d('swipestats:' + name + ':');
