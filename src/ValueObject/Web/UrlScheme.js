'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Function.prototype.Implements')
var StringLiteral = require('../String/StringLiteral')
var ValueObject = require('../ValueObject')

/**
 * @method
 * @name UrlScheme.fromNative
 * @param {...[]} arguments
 * @return {UrlScheme}
 */

/**
 * Constructs empty scheme
 * @return {UrlScheme}
 */
UrlScheme.empty = function () {
  return new this('')
}

/**
 *
 * @param {string} value
 * @constructor
 * @extends {StringLiteral}
 * @implements {ValueObject}
 *
 * TODO: validate scheme value
 */
function UrlScheme (value) {
  StringLiteral.call(this, value)
}

UrlScheme.extends(StringLiteral)

UrlScheme.Implements(ValueObject)

module.exports = UrlScheme
