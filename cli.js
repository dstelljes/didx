'use strict'

const cli = require('commander')

const metadata = require('./package.json')
const pipeline = require('./pipeline')

/**
 * Parses arguments and runs the program.
 *
 * @param {string[]} argv
 * Command-line arguments.
 */
function run (argv) {
  cli
    .version(metadata.version)
    .arguments('[directory]')
    .action((directory = '.') => pipeline(directory)
      .then(context => console.log(context))
      .catch(error => {
        console.error(`Failed to generate the listing: ${error.message}`)
        process.exitCode = 1
      })
    )
    .parse(argv)
}

module.exports = run
