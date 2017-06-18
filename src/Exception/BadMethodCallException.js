'use strict'

require('../../lib/Function.prototype.extends')

/**
 * BadMethodCallException exception constructor
 * @param {string} message
 * @constructor
 * @extends {Error}
 */
function BadMethodCallException (message) {
  this.message = message
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor)
  } else {
    var err = new Error()
    this.stack = err.stack
  }
}

BadMethodCallException.extends(Error)
BadMethodCallException.prototype.name = 'BadMethodCallException'

module.exports = BadMethodCallException
