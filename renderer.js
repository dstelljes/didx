'use strict'

const ejs = require('ejs')

const { readFile } = require('./fs')
const templates = require('./templates')

/**
 * Generates a render function for a template.
 *
 * @param {string} template
 * The path to a template.
 *
 * @returns {Function}
 * A function that accepts a context object and returns the rendered output.
 */
async function render (template) {
  const path = templates.get(template) || template
  template = await readFile(path)

  switch ((path.match(/.+\.([0-9A-Za-z]+)$/) || [])[1]) {
    case 'ejs':
      return context => ejs.render(template.toString(), context)

    default:
      throw new Error('Unsupported template type.')
  }
}

module.exports = render
