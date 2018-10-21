'use strict'

const cli = require('commander')
const path = require('path')

const read = require('./reader')

const { version } = require('./package.json')

const program = cli
  .version(version)
  .arguments('[directory]')
  .action(directory => read(path.resolve(directory || '.'))
    .then(items => console.log(items))
    .catch(error => {
      console.error(`Failed to generate the listing: ${error.message}`)
      process.exitCode = 1
    })
  )

/**
 * Parses arguments and runs the program.
 *
 * @param {string[]} argv
 * Command-line arguments.
 */
module.exports = function run (argv) {
  program.parse(argv)
}
