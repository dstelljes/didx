'use strict'

const fs = require('fs')
const identify = require('file-type')
const path = require('path')
const read = require('read-chunk')

const classes = require('./classes')
const { CLASS_UNKNOWN } = require('./constants')

/**
 * Gets class/format information.
 *
 * @param {string} file
 * The path of a file.
 *
 * @returns {Promise<FileFormat>}
 */
async function getFormat (file) {
  const guess = identify(await read(file, 0, 4100)) || {}

  return {
    class: classes.get(guess.ext) || CLASS_UNKNOWN,
    extension: guess.ext || null
  }
}

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
 * Promisifies fs.stat.
 *
 * @param {string} path
 * The absolute path of a file or directory.
 *
 * @returns {Promise<FileStats>}
 */
function getStats (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error, stats) => {
      if (error) {
        reject(error)
      } else {
        resolve(stats)
      }
    })
  })
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
  getFormat,
  getName,
  getPath,
  getStats,
  readDirectory
}

/**
 * Class/extension information for a file.
 * @typedef {Object} FileFormat
 *
 * @property {string} class
 * The file class (or "unknown" if unknown).
 *
 * @property {string} extension
 * The likely file extension (or null if one couldn’t be guessed).
 */

/**
 * File statistics.
 * @typedef {Object} FileStats
 *
 * @property {Date} ctime
 * Created time.
 *
 * @property {Date} mtime
 * Last modified time.
 */
