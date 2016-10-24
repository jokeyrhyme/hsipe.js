/* @flow */
'use strict'

const cake = require('./cake.js')

const data = JSON.parse(process.argv[2])
const options = data[0]

const conf = cake.getConf({ cakeName: options.cakeName })
// $FlowFixMe: need to require() a dynamic path, that is the whole point
const bakeFunction = require(options.bakePath).bake

bakeFunction.apply(null, [ { conf } ].concat(data[1]))
  .then(() => {
    conf.set('lastBaked', Date.now())

    // Call process exit explicitly to terminate the child process
    // Otherwise the child process will run forever (according to nodejs docs)
    process.exit()
  })
  .catch(() => {
    process.exit(1)
  })
