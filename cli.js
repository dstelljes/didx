'use strict'

const cli = require('commander')

const metadata = require('./package.json')
const pipeline = require('./pipeline')

const program = cli
  .version(metadata.version)
  .arguments('[directory]')
  .option(
    '-n, --name [name]',
    'The name of the output file.',
    'index.html'
  )
  .option(
    '-r, --recurse',
    'If set, will also generate index files for each subdirectory.'
  )
  .option(
    '-t, --template [template]',
    'The name of a built-in template or the path to a template file.',
    'default'
  )
  .action(async (directory = '.', options) => pipeline(directory, options)
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
function run (argv) {
  program.parse(argv)
}

module.exports = run
