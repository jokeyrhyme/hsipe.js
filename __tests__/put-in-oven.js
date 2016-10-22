/* flow */
'use strict'

const Conf = require('conf')
const idemFs = require('idempotent-fs')

const putInOven = require('../index.js').putInOven

let cakeName
let conf
beforeEach(() => {
  cakeName = Math.floor(Math.random() * 1e6) + '-' + (new Date()).valueOf()
  conf = new Conf({ configName: cakeName })
})
afterEach(() => {
  idemFs.unlinkSync(conf.path)
  conf = null
})

test('putInOven() no options', () => {
  expect(() => putInOven()).toThrow()
})

test('putInOven({ bakePath }) no cakeName', () => {
  expect(() => putInOven({ bakePath: './bake.js' })).toThrow()
})

test('putInOven({ cakeName }) no bakePath', () => {
  expect(() => putInOven({ cakeName })).toThrow()
})
