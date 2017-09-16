/* @flow */
'use strict';

function delay(ms /* : number */) /* : Promise<void> */ {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  delay,
};
