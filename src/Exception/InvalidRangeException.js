'use strict'

require('../../lib/Function.prototype.extends')

/**
 * InvalidRangeException exception constructor
 * @param {string} message
 * @constructor
 * @extends {RangeError}
 */
function InvalidRangeException (message) {
  this.message = message
  if (RangeError.captureStackTrace) {
    RangeError.captureStackTrace(this, this.constructor)
  } else {
    var err = new RangeError()
    this.stack = err.stack
  }
}

InvalidRangeException.extends(RangeError)
InvalidRangeException.prototype.name = 'InvalidRangeException'

module.exports = InvalidRangeException
