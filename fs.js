'use strict'

const fs = require('fs')
const identify = require('file-type')
const path = require('path')

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
  const guess = identify(await readFile(file, 4100)) || {}

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

/**
 * Gets file contents.
 *
 * @param {string} file
 * The path of a file.
 *
 * @returns {Promise<Buffer>}
 */
function readFile (file, bytes = Infinity) {
  return new Promise((resolve, reject) => {
    const chunks = []

    const stream = fs.createReadStream(file, {
      end: bytes,
      flags: 'r'
    })

    stream.on('data', chunk => chunks.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', error => reject(error))
  })
}

/**
 * Writes data to a file.
 *
 * @param {string} file
 * The path to write to.
 *
 * @param {Buffer} data
 * The file data.
 *
 * @returns {Promise}
 */
function writeFile (file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

module.exports = {
  getFormat,
  getName,
  getPath,
  getStats,
  readDirectory,
  readFile,
  writeFile
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
