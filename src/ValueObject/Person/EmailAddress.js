'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Function.prototype.Implements')
var StringLiteral = require('../String/StringLiteral')
var ValueObject = require('../ValueObject')

/**
 * @method
 * @name EmailAddress.fromNative
 * @param {...[]} arguments
 * @return {EmailAddress}
 */

/**
 * EmailAddress constructor
 *
 * @param {string} value
 * @constructor
 * @extends {StringLiteral}
 * @implements {ValueObject}
 *
 * TODO: email address validation
 */
function EmailAddress (value) {
  StringLiteral.call(this, value)
}

EmailAddress.extends(StringLiteral)

EmailAddress.Implements(ValueObject)

module.exports = EmailAddress
