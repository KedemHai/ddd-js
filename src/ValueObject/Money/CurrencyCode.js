'use strict'

var Enum = require('../Enum/Enum')
var ValueObject = require('../ValueObject')

/**
 * @method
 * @name CurrencyCode.fromNative
 * @param {...[]} arguments
 * @return {Enum|CurrencyCode}
 */

/**
 * @enum {string}
 * TODO: more currency codes
 */
CurrencyCode.constants = {
  USD: 'USD'
}
Object.freeze(CurrencyCode.constants)

CurrencyCode.USD = function () {
  return CurrencyCode.get(CurrencyCode.constants.USD)
}

/**
 * CurrencyCode constructor
 * @param {CurrencyCode.constants} value
 * @constructor
 * @extends {Enum}
 * @implements {ValueObject}
 */
function CurrencyCode (value) {
  Enum.call(this, value)
}
CurrencyCode.extends(Enum)

CurrencyCode.Implements(ValueObject)

module.exports = CurrencyCode
