'use strict'

const { getName } = require('./fs')

/**
 * Processes an item.
 *
 * @param {RawItem} item
 * An object containing the item’s path and type.
 *
 * @returns {ProcessedItem}
 */
function process (raw) {
  const { path, type } = raw

  const name = getName(path)
  const item = { name, path, type }

  return item
}

module.exports = process

/**
 * A processed file or directory.
 * @typedef {Object} ProcessedItem
 *
 * @property {string} name
 * The item’s name (relative path).
 *
 * @property {string} path
 * The item’s absolute path.
 *
 * @property {string} type
 * The type of the item (i.e. file or directory).
 */
