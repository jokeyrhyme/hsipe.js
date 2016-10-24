/* flow */
'use strict'

const Conf = require('conf')
const idemFs = require('idempotent-fs')

const fixturePath = require('./helpers/paths.js').fixturePath
const delay = require('./helpers/promises.js').delay
const getCake = require('../index.js').getCake
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
  let cake = getCake({ cakeName })
  expect(cake.lastBaked).toBeUndefined()
})

test('putInOven({ bakePath }) no cakeName', () => {
  expect(() => putInOven({ bakePath: './bake.js' })).toThrow()
  let cake = getCake({ cakeName })
  expect(cake.lastBaked).toBeUndefined()
})

test('putInOven({ cakeName }) no bakePath', () => {
  expect(() => putInOven({ cakeName })).toThrow()
  let cake = getCake({ cakeName })
  expect(cake.lastBaked).toBeUndefined()
})

test('putInOven({ bakePath, cakeName })', () => {
  const bakePath = fixturePath('resolve')
  expect(() => putInOven({ bakePath, cakeName })).not.toThrow()
  let cake = getCake({ cakeName })
  expect(cake.lastBaked).toBeUndefined()
  return delay(250)
    .then(() => {
      cake = getCake({ cakeName })
      expect(typeof cake.lastBaked).toEqual('number')
    })
})

test('putInOven({ bakePath, cakeName }, ...args)', () => {
  const bakePath = fixturePath('bake-function-args')
  const customArg1 = 'hello'
  const customArg2 = 123
  expect(() => {
    putInOven({ bakePath, cakeName }, customArg1, customArg2)
  }).not.toThrow()
  let cake = getCake({ cakeName })
  expect(cake.lastBaked).toBeUndefined()
  return delay(250)
    .then(() => {
      cake = getCake({ cakeName })
      expect(cake.customArg1).toEqual(customArg1)
      expect(cake.customArg2).toEqual(customArg2)
      expect(typeof cake.lastBaked).toEqual('number')
    })
})
