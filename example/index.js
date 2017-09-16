/* @flow */
'use strict';

const path = require('path');

const getCake = require('../index.js').getCake;
const putInOven = require('../index.js').putInOven;

const cakeName = 'strawberry-shortcake';

// start baking our strawberry-shortcake
putInOven({
  bakePath: path.join(__dirname, 'bake.js'),
  cakeName,
});

// try to continue on, in case we already started baking last time
const cake = getCake({ cakeName });
const flavour = cake.flavour;

if (flavour) {
  // yay, we must have prepared something earlier
  // TODO: eat cake, enjoy flavour
} else {
  // ah, this must be our first time through here
  // better luck next time!
  // TODO: do something that doesn't require eating delicious cake
}
