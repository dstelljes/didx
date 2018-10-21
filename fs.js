'use strict'

const fs = require('fs')
const path = require('path')

/**
 * Gets a file or directory name.
 *
 * @param {string} absolute
 * The absolute path of a file or directory.
 *
 * @returns {string}
 */
function getName (absolute) {
  return path.basename(absolute)
}

/**
 * Gets an absolute path.
 *
 * @param {string[]} segments
 * A sequence of path segments.
 *
 * @returns {string}
 */
function getPath (...segments) {
  return path.resolve(...segments)
}

/**
 * Promisifies fs.readdir.
 *
 * @param {string} directory
 * The path of a directory.
 *
 * @returns {Promise<fs.Dirent[]>}
 */
function readDirectory (directory) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, { withFileTypes: true }, (error, entries) => {
      if (error) {
        reject(error)
      } else {
        resolve(entries)
      }
    })
  })
}

module.exports = {
  getName,
  getPath,
  readDirectory
}
