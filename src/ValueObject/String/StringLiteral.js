'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var NaturalNumber = require('../Number/NaturalNumber')
var ValueObject = require('../ValueObject')

/**
 * Returns empty StringLiteral
 * @return {StringLiteral}
 */
StringLiteral.empty = function () {
  return new this('')
}

/**
 * Construct StringLiteral from native JS values
 * @returns {StringLiteral}
 */
StringLiteral.fromNative = function () {
  return new this(arguments[0])
}

/**
 * StringLiteral constructor
 * @param {string} value
 * @constructor
 * @implements {ValueObject}
 */
function StringLiteral (value) {
  value = String(value)
  /**
   *
   * @return {string}
   */
  this.value = function () {
    return value.toString()
  }
}

/**
 *
 * @return {string}
 */
StringLiteral.prototype.valueOf = function () {
  return this.value()
}

/**
 *
 * @return {NaturalNumber}
 */
StringLiteral.prototype.length = function () {
  return new NaturalNumber(this.value().length)
}

/**
 *
 * @return {string}
 */
StringLiteral.prototype.toString = function () {
  return this.value()
}

/**
 * Check if 2 StringLiteral objects are equal
 * @param {StringLiteral} other
 * @returns {boolean}
 */
StringLiteral.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  if (!(other instanceof StringLiteral)) {
    return false
  }

  return this.value() === other.value()
}

StringLiteral.Implements(ValueObject)

module.exports = StringLiteral
