/* @flow */
'use strict';

/* ::
import type { BakeOptions, Cake } from '../../index.js'
*/

function bake(
  options /* : BakeOptions */,
  customArg1 /* : string */,
  customArg2 /* : number */
) /* : Promise<Cake> */ {
  // const cake = options.cake
  // const args = arguments.slice(1)

  return Promise.resolve({ customArg1, customArg2 });
}

module.exports = { bake };
