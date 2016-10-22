/* flow */
'use strict'

const Conf = require('conf')
const idemFs = require('idempotent-fs')

const fixturePath = require('./helpers/paths.js').fixturePath
const delay = require('./helpers/promises.js').delay
const putInOven = require('../index.js').putInOven

let cakeName
let conf
beforeEach(() => {
  cakeName = Math.floor(Math.random() * 1e6) + '-' + (new Date()).valueOf()
  conf = new Conf({ configName: cakeName, projectName: 'hsipe' })
})
afterEach(() => {
  idemFs.unlinkSync(conf.path)
  conf = null
})

test('putInOven() no options', () => {
  expect(() => putInOven()).toThrow()
  expect(conf.get('lastBaked')).toBeUndefined()
})

test('putInOven({ bakePath }) no cakeName', () => {
  expect(() => putInOven({ bakePath: './bake.js' })).toThrow()
  expect(conf.get('lastBaked')).toBeUndefined()
})

test('putInOven({ cakeName }) no bakePath', () => {
  expect(() => putInOven({ cakeName })).toThrow()
  expect(conf.get('lastBaked')).toBeUndefined()
})

test('putInOven({ bakePath, cakeName })', () => {
  const bakePath = fixturePath('resolve')
  expect(() => putInOven({ bakePath, cakeName })).not.toThrow()
  expect(conf.get('lastBaked')).toBeUndefined()
  return delay(250)
    .then(() => {
      expect(typeof conf.get('lastBaked')).toEqual('number')
    })
})

test('putInOven({ bakePath, cakeName }, ...args)', () => {
  const bakePath = fixturePath('bake-function-args')
  const customArg1 = 'hello'
  const customArg2 = 123
  expect(() => {
    putInOven({ bakePath, cakeName }, customArg1, customArg2)
  }).not.toThrow()
  expect(conf.get('lastBaked')).toBeUndefined()
  return delay(250)
    .then(() => {
      expect(conf.get('customArg1')).toEqual(customArg1)
      expect(conf.get('customArg2')).toEqual(customArg2)
      expect(typeof conf.get('lastBaked')).toEqual('number')
    })
})
