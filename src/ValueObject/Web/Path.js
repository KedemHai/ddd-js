'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Function.prototype.Implements')
var StringLiteral = require('../String/StringLiteral')
var ValueObject = require('../ValueObject')

/**
 * @method
 * @name Path.fromNative
 * @param {...[]} arguments
 * @return {Path}
 */

/**
 * Path constructor
 * @param {string} value
 * @constructor
 * @extends {StringLiteral}
 * @implements {ValueObject}
 */
function Path (value) {
  StringLiteral.call(this, value)
}

Path.extends(StringLiteral)

Path.Implements(ValueObject)

module.exports = Path
