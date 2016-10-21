/* @flow */
'use strict'

/* ::
import type { BakeOptions } from '../index.js'
*/

function bake (options /* : BakeOptions */) /* : Promise<void> */ {
  const conf = options.conf
  // const args = arguments.slice(1)

  // e.g. something that can take a while to finish
  return new Promise((resolve) => {
    setTimeout(() => {
      conf.set('flavour', 'delicious')
      resolve()
    }, 5e3)
  })
}

module.exports = { bake }
