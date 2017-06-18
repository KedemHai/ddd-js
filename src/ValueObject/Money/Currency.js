'use strict'

var currencies = require('./currencies.json')
var CurrencyCode = require('./CurrencyCode')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var ValueObject = require('../ValueObject')

Currency.fromNative = function () {
  return new this(CurrencyCode.fromNative(arguments[0]))
}

/**
 * Currency constructor
 * @param {CurrencyCode} code
 * @constructor
 * @implements {ValueObject}
 */
function Currency (code) {
  if (!code.isInstanceOf(CurrencyCode)) {
    throw new InvalidTypeException(code, CurrencyCode)
  }

  /**
   * @return {CurrencyCode}
   */
  this.code = function () {
    return code
  }
}

/**
 * Checks if 2 Currency objects has the same value
 * @param {ValueObject|Currency} other
 * @inheritDoc
 */
Currency.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  if (!(other instanceof this.constructor)) {
    return false
  }

  return this.code().hasSameValueAs(other.code())
}

Currency.prototype.valueOf = function () {
  return this.code().valueOf()
}

/**
 * @return {string}
 */
Currency.prototype.toString = function () {
  return currencies[this.valueOf()]
}

Currency.Implements(ValueObject)

module.exports = Currency
