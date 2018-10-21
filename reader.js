'use strict'

const fs = require('fs')
const path = require('path')

const { TYPE_DIRECTORY, TYPE_FILE } = require('./constants')

/**
 * Generates a list of results to operate on.
 *
 * @param {string} directory
 * The absolute path of the directory to search.
 *
 * @returns Promise<ReadResult[]>
 */
module.exports = function read (directory) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, { withFileTypes: true }, (error, entries) => {
      if (error) {
        reject(error)
      } else {
        const items = []

        for (const entry of entries) {
          const item = {}

          if (entry.isDirectory()) {
            item.type = TYPE_DIRECTORY
          } else if (entry.isFile()) {
            item.type = TYPE_FILE
          } else {
            continue
          }

          item.path = path.resolve(directory, entry.name)
          items.push(item)
        }

        resolve(items)
      }
    })
  })
}

/**
 * A file or directory.
 * @typedef {Object} Item
 *
 * @property {string} path
 * The item’s absolute path.
 *
 * @property {string} type
 * The type of the item (i.e. file or directory).
 */
