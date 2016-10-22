/* @flow */
'use strict'

/* ::
import type { BakeOptions } from '../../index.js'
*/

function bake (
  options /* : BakeOptions */,
  customArg1 /* : string */,
  customArg2 /* : number */
) /* : Promise<void> */ {
  const conf = options.conf

  conf.set('customArg1', customArg1)
  conf.set('customArg2', customArg2)

  return Promise.resolve()
}

module.exports = { bake }
