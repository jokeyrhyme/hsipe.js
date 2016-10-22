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

function isValidString (string) {
  return typeof string === 'string' && string
}

function isValidInterval (interval) {
  return typeof interval === 'number' && Number.isFinite(interval)
}

function putInOven (options /* : HSIPEOptions */) {
  if (!options || typeof options !== 'object') {
    throw new TypeError('options object is mandatory')
  }

  const bakePath = options.bakePath
  const cakeName = options.cakeName

  if (!isValidString(bakePath) || !isValidString(cakeName)) {
    throw new TypeError('bakePath and cakeName strings are mandatory')
  }

  // const interval = isValidInterval(options.interval) ? options.interval : ONE_DAY
  // const args = arguments.slice(1)
}

module.exports = {
  putInOven
}
