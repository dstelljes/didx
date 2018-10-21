'use strict'

const { TYPE_DIRECTORY, TYPE_FILE } = require('./constants')
const { getPath, readDirectory } = require('./fs')

/**
 * Generates a list of results to operate on.
 *
 * @param {string} directory
 * The absolute path of the directory to search.
 *
 * @returns {Promise<RawItem[]>}
 */
async function read (directory) {
  const items = []

  for (const entry of await readDirectory(directory)) {
    const item = {
      path: getPath(directory, entry.name)
    }

    if (entry.isDirectory()) {
      item.type = TYPE_DIRECTORY
    } else if (entry.isFile()) {
      item.type = TYPE_FILE
    } else {
      continue
    }

    items.push(item)
  }

  return items
}

module.exports = read

/**
 * A file or directory.
 * @typedef {Object} RawItem
 *
 * @property {string} path
 * The item’s absolute path.
 *
 * @property {string} type
 * The type of the item (i.e. file or directory).
 */
