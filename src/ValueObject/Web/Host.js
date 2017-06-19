'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Function.prototype.Implements')
var StringLiteral = require('../String/StringLiteral')
var ValueObject = require('../ValueObject')

/**
 * Host abstract class
 * @param {string} value
 * @constructor
 * @abstract
 * @extends {StringLiteral}
 * @implements {ValueObject}
 */
function Host (value) {
  if (this.constructor === Host) {
    throw new Error('Cannot instantiate abstract class Host')
  }

  StringLiteral.call(this, value)
}

Host.extends(StringLiteral)

Host.Implements(ValueObject)

module.exports = Host
