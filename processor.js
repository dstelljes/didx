'use strict'

const { TYPE_FILE } = require('./constants')
const { getFormat, getName, getStats } = require('./fs')

/**
 * Processes an item.
 *
 * @param {RawItem} item
 * An object containing the item’s path and type.
 *
 * @returns {Promise<ProcessedItem>}
 */
async function process (raw) {
  const { path, type } = raw

  const name = getName(path)
  const stats = await getStats(path)

  const item = {
    created: stats.ctime,
    modified: stats.mtime,
    name,
    path,
    size: stats.size,
    type
  }

  switch (type) {
    case TYPE_FILE:
      const format = await getFormat(path)

      item.class = format.class
      item.extension = format.extension

      break
  }

  return item
}

module.exports = process

/**
 * A processed file or directory.
 * @typedef {Object} ProcessedItem
 *
 * @property {string} class
 * The item’s class ("image", "video", etc.).
 *
 * @property {Date} created
 * The time at which the item was created.
 *
 * @property {string} class
 * The extension of the item’s format (if one was able to be guessed).
 *
 * @property {Date} modified
 * The time at which the item was last modified.
 *
 * @property {string} name
 * The item’s name (relative path).
 *
 * @property {string} path
 * The item’s absolute path.
 *
 * @property {number} size
 * The item’s size (in bytes).
 *
 * @property {string} type
 * The type of the item (i.e. file or directory).
 */
