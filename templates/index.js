'use strict'

const { getPath } = require('../fs')

module.exports = new Map([
  ['apache', getPath(__dirname, 'apache.ejs')],
  ['default', getPath(__dirname, 'default.ejs')]
])
