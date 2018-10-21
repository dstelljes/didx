'use strict'

const cli = require('commander')
const { resolve } = require('path')
const { version } = require('./package.json')

const program = cli
  .version(version)
  .arguments('<directory>')
  .action(directory => {
    console.log(resolve(directory))
  })

/**
 * Parses arguments and runs the program.
 *
 * @param {string[]} argv
 * Command-line arguments.
 */
module.exports = function run (argv) {
  program.parse(argv)
}
