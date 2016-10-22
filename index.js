/* @flow */
'use strict'

const path = require('path')
const spawn = require('child_process').spawn

const Conf = require('conf')

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

function putInOven (options /* : HSIPEOptions */) {
  if (!options || typeof options !== 'object') {
    throw new TypeError('options object is mandatory')
  }

  const bakePath = options.bakePath
  const cakeName = options.cakeName

  const conf = new Conf({ configName: cakeName, projectName: 'hsipe' })

  if (!isValidString(bakePath) || !isValidString(cakeName)) {
    throw new TypeError('bakePath and cakeName strings are mandatory')
  }

  let interval
  if (typeof options.interval === 'number' && Number.isFinite(options.interval)) {
    interval = options.interval
  } else {
    interval = ONE_DAY
  }
  const args = Array.prototype.slice.call(arguments, 1)

  // Only check for updates on a set interval
  if (Date.now() - conf.get('lastBaked') < interval) {
    return
  }

  const spawnPath = path.join(__dirname, 'lib', 'start-baking.js')
  const child = spawn(
    process.execPath,
    [ spawnPath, JSON.stringify([ options, args ]) ],
    {
      detached: true,
      stdio: 'ignore'
    }
  )
  // $FlowFixMe: there definitely _is_ an unref() method
  child.unref()
}

module.exports = {
  putInOven
}
