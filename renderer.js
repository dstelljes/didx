'use strict'

const ejs = require('ejs')
const handlebars = require('handlebars')
const mustache = require('mustache')

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
  template = (await readFile(path)).toString()

  switch ((path.match(/.+\.([0-9A-Za-z]+)$/) || [])[1]) {
    case 'ejs':
      return ejs.compile(template)

    case 'hbs':
    case 'handlebars':
      return handlebars.compile(template)

    case 'mustache':
      mustache.parse(template)
      return context => mustache.render(template, context)

    default:
      throw new Error('Unsupported template type.')
  }
}

module.exports = render
