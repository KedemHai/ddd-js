'use strict'

require('../../lib/Function.prototype.extends')

/**
 * InaccessibleException exception constructor
 * @constructor
 * @extends {Error}
 */
function InaccessibleException () {
  this.message = 'Method is inaccessible'
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor)
  } else {
    var err = new Error()
    this.stack = err.stack
  }
}

InaccessibleException.extends(Error)
InaccessibleException.prototype.name = 'InaccessibleException'

module.exports = InaccessibleException
