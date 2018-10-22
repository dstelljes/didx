'use strict'

const { getName, getPath } = require('./fs')
const process = require('./processor')
const read = require('./reader')
const render = require('./renderer')

async function pipeline (directory, { template }) {
  directory = getPath(directory)
  template = template.indexOf('.') < 0 ? template : getPath(template)

  const context = {
    items: (await Promise.all((await read(directory)).map(process)))
      .sort((a, b) => a.name.localeCompare(b.name)),
    name: getName(directory),
    path: directory,
    timestamp: new Date()
  }

  console.log((await render(template))(context))
}

module.exports = pipeline
