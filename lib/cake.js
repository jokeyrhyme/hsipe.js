/* @flow */
'use strict'

const Conf = require('conf')

/* ::
export type CakeOptions = {
  cakeName: string
}
*/

function getConf (options /* : CakeOptions */) {
  return new Conf({ configName: options.cakeName })
}

function getCake (options /* : CakeOptions */) {
  return getConf(options).store
}

module.exports = {
  getConf,
  getCake
}
