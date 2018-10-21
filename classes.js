'use strict'

const {
  CLASS_AUDIO,
  CLASS_IMAGE,
  CLASS_VIDEO
} = require('./constants')

module.exports = new Map([
  ['avi', CLASS_VIDEO],
  ['bmp', CLASS_IMAGE],
  ['gif', CLASS_IMAGE],
  ['jpg', CLASS_IMAGE],
  ['m4a', CLASS_AUDIO],
  ['m4v', CLASS_VIDEO],
  ['mkv', CLASS_VIDEO],
  ['mid', CLASS_AUDIO],
  ['mov', CLASS_VIDEO],
  ['mp2', CLASS_AUDIO],
  ['mp3', CLASS_AUDIO],
  ['mp4', CLASS_VIDEO],
  ['ogg', CLASS_VIDEO],
  ['png', CLASS_IMAGE],
  ['tif', CLASS_IMAGE],
  ['webp', CLASS_VIDEO],
  ['webp', CLASS_IMAGE],
  ['wma', CLASS_AUDIO],
  ['wmv', CLASS_VIDEO]
])
