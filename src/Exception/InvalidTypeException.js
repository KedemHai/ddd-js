'use strict'

require('../../lib/Function.prototype.extends')
var Util = require('../Util/Util')

/**
 * InvalidTypeException exception constructor
 * @param {Object} got
 * @param {function}  expected
 * @constructor
 * @extends {Error}
 */
function InvalidTypeException (got, expected) {
  this.message = Util.formatStr('Expected {0} got {1}', expected.prototype.constructor.name, (typeof got.constructor === 'undefined') ? got : got.constructor.name)
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor)
  } else {
    var err = new Error()
    this.stack = err.stack
  }
}

InvalidTypeException.extends(Error)
InvalidTypeException.prototype.name = 'InvalidTypeException'

module.exports = InvalidTypeException
