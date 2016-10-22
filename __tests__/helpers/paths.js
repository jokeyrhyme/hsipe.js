/* @flow */
'use strict'

const path = require('path')

function fixturePath (name /* : string */) /* : string */ {
  return path.join(__dirname, '..', 'fixtures', `${name}.js`)
}

module.exports = {
  fixturePath
}
