'use strict'

const { TYPE_DIRECTORY } = require('./constants')
const { getName, getPath, writeFile } = require('./fs')
const process = require('./processor')
const read = require('./reader')
const build = require('./renderer')

/**
 * Creates a context object for a directory.
 *
 * @param {string} directory
 * The path to a directory.
 */
async function gather (directory) {
  return {
    items: (await Promise.all((await read(directory)).map(process)))
      .sort((a, b) => a.name.localeCompare(b.name)),
    name: getName(directory),
    path: directory,
    timestamp: new Date()
  }
}

/**
 * Runs the render pipeline for a directory.
 *
 * @param {string} directory
 * The path of a directory to operate in.
 *
 * @param {PipelineOptions} options
 * Options from the command line.
 */
async function pipeline (directory, options) {
  let { name, recurse, template } = options

  directory = getPath(directory)
  template = template.indexOf('.') < 0
    ? template
    : getPath(template)

  const render = await build(template)

  const write = async directory => {
    const context = await gather(directory)
    const result = render(context)

    await writeFile(getPath(directory, name), result)

    if (recurse) {
      await Promise.all(context.items
        .filter(item => item.type === TYPE_DIRECTORY)
        .map(item => write(item.path))
      )
    }
  }

  write(directory)
}

module.exports = pipeline

/**
 * Command line options.
 * @typedef {Object} PipelineOptions
 *
 * @property {string} name
 * The name of the index file.
 *
 * @property {boolean} recurse
 * Whether to generate index files for subdirectories.
 *
 * @property {template}
 * The name of a built-in template or a path to a template file.
 */
