/* @flow */
'use strict'

const getCake = require('./cake.js').getCake
const getConf = require('./cake.js').getConf

const data = JSON.parse(process.argv[2])
const options = data[0]

const conf = getConf({ cakeName: options.cakeName })
const oldCake = getCake({ cakeName: options.cakeName })

// $FlowFixMe: need to require() a dynamic path, that is the whole point
const bakeFunction = require(options.bakePath).bake

bakeFunction.apply(null, [ { cake: oldCake } ].concat(data[1]))
  .then((newCake) => {
    conf.store = Object.assign({}, newCake, { lastBaked: Date.now() })

    // Call process exit explicitly to terminate the child process
    // Otherwise the child process will run forever (according to nodejs docs)
    /* eslint-disable no-process-exit */
    process.exit()
    /* eslint-enable no-process-exit */
  })
  .catch(() => {
    /* eslint-disable no-process-exit */
    process.exit(1)
    /* eslint-enable no-process-exit */
  })
