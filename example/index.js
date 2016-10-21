/* @flow */
'use strict'

const path = require('path')

const Conf = require('conf')
const putInOven = require('../index.js').putInOven

const cakeName = 'strawberry-shortcake'
const conf = new Conf({ configName: cakeName })

// start baking our strawberry-shortcake
putInOven({
  bakePath: path.join(__dirname, 'bake.js'),
  cakeName
})

// try to continue on, in case we already started baking last time
const flavour = conf.get('flavour')

if (flavour) {
  // yay, we must have prepared something earlier
  // TODO: eat cake, enjoy flavour
} else {
  // ah, this must be our first time through here
  // better luck next time!
  // TODO: do something that doesn't require eating delicious cake
}
