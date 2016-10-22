/* @flow */
'use strict'

/* ::
export type HSIPEOptions = {
  bakePath: string,
  cakeName: string,
  interval?: number
}
export type BakeFunction = (options: BakeOptions, ...args: any[]) => Promise<void>
export type BakeOptions = {
  conf: { [id:string]: any }
}
*/

const ONE_DAY = 7 * 24 * 60 * 60 * 1000

function isValidInterval (interval) {
  return typeof interval === 'number' && Number.isFinite(interval)
}

function putInOven (options /* : HSIPEOptions */) {
  // const bakePath = options.bakePath
  // const cakeName = options.cakeName
  // const interval = isValidInterval(options.interval) ? options.interval : ONE_DAY
  // const args = arguments.slice(1)
}

module.exports = {
  putInOven
}
