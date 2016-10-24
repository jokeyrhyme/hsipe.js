/* @flow */
'use strict'

/* ::
import type { BakeOptions, Cake } from '../index.js'
*/

function bake (options /* : BakeOptions */) /* : Promise<Cake> */ {
  // const cake = options.cake
  // const args = arguments.slice(1)

  // e.g. something that can take a while to finish
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ flavour: 'delicious' })
    }, 5e3)
  })
}

module.exports = { bake }
