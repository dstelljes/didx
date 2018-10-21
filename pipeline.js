'use strict'

const { getName, getPath } = require('./fs')
const process = require('./processor')
const read = require('./reader')

async function pipeline (directory) {
  directory = getPath(directory)

  return {
    items: await Promise.all((await read(directory)).map(process)),
    name: getName(directory),
    path: directory,
    timestamp: new Date()
  }
}

module.exports = pipeline
