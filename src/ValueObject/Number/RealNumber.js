'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var BadMethodCallException = require('../../Exception/BadMethodCallException')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var NumberValue = require('./NumberValue')
var RoundingMode = require('./RoundingMode')
var ValueObject = require('../ValueObject')

/**
 * Constructs RealNumber from JS native values
 * @param {...[]} arguments
 * @return {RealNumber}
 */
RealNumber.fromNative = function () {
  return new this(arguments[0])
}

/**
 * RealNumber value object constructor
 * @param {number} value
 * @constructor
 * @implements {NumberValue}
 * @implements {ValueObject}
 */
function RealNumber (value) {
  if (isNaN(value)) {
    throw new InvalidTypeException(value, Number)
  }

  value = Number(value)
  if (isNaN(value - value)) {
    throw new BadMethodCallException('Not a real number')
  }

  /**
   *
   * @return {number}
   */
  this.value = function () {
    return value
  }
}

/**
 * Check if 2 NumberValue objects are equal
 * @param {ValueObject|RealNumber} other
 * @returns {boolean}
 */
RealNumber.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  return this.valueOf() === other.valueOf()
}

/**
 *
 * @return {number}
 */
RealNumber.prototype.valueOf = function () {
  return this.value()
}

/**
 *
 * @param {number} [fractionalDigits] Optional. The number of digits to appear after the decimal point;
 * functions the same as native JS Number.prototype.toFixed except when it is omitted. If this argument is omitted, then no change is made to the fractional digits
 * @returns {string}
 */
RealNumber.prototype.toString = function (fractionalDigits) {
  if (typeof fractionalDigits === 'undefined') {
    // keep floating point
    fractionalDigits = 0
    var fractional = String(this.valueOf()).split('.')
    if (fractional.length > 1) {
      fractionalDigits = fractional[1].length
    }
  }

  return this.valueOf().toFixed(fractionalDigits)
}

/**
 *
 * @param {number} [decimal]
 * @return {number}
 */
RealNumber.prototype.round = function (decimal) {
  if (isNaN(decimal)) {
    decimal = 0
  }

  return Math.round(this.valueOf() * Math.pow(10, decimal)) / Math.pow(10, decimal)
}

/**
 *
 * @param {NumberValue|RealNumber} other
 * @return {NumberValue|RealNumber}
 */
RealNumber.prototype.add = function (other) {
  if (!other.isInstanceOf(NumberValue)) {
    throw new InvalidTypeException(other, NumberValue)
  }

  if (other instanceof RealNumber) {
    return new this.constructor(this.valueOf() + other.valueOf())
  }

  throw new Error('Not implemented yet')
}

/**
 *
 * @param {NumberValue|RealNumber} other
 * @return {NumberValue|RealNumber}
 */
RealNumber.prototype.subtract = function (other) {
  if (!other.isInstanceOf(NumberValue)) {
    throw new InvalidTypeException(other, NumberValue)
  }

  if (other instanceof RealNumber) {
    return new this.constructor(this.valueOf() - other.valueOf())
  }

  throw new Error('Not implemented yet')
}

/**
 *
 * @param {NumberValue|RealNumber} other
 * @return {NumberValue|RealNumber}
 */
RealNumber.prototype.multiplyBy = function (other) {
  if (!other.isInstanceOf(NumberValue)) {
    throw new InvalidTypeException(other, NumberValue)
  }

  if (other instanceof RealNumber) {
    return new this.constructor(this.valueOf() * other.valueOf())
  }

  throw new Error('Not implemented yet')
}

/**
 *
 * @param {NumberValue|RealNumber} other
 * @return {NumberValue|RealNumber}
 */
RealNumber.prototype.divideBy = function (other) {
  if (!other.isInstanceOf(NumberValue)) {
    throw new InvalidTypeException(other, NumberValue)
  }

  if (other instanceof RealNumber) {
    return new this.constructor(this.valueOf() / other.valueOf())
  }

  throw new Error('Not implemented yet')
}

/**
 *
 * @param {NumberValue|RealNumber} other
 * @return {boolean}
 */
RealNumber.prototype.isLesserThan = function (other) {
  if (!other.isInstanceOf(NumberValue)) {
    throw new InvalidTypeException(other, NumberValue)
  }

  return this.value() < other.value()
}

/**
 *
 * @param {NumberValue|RealNumber} other
 * @return {boolean}
 */
RealNumber.prototype.isGreaterThan = function (other) {
  if (!other.isInstanceOf(NumberValue)) {
    throw new InvalidTypeException(other, NumberValue)
  }

  return this.value() > other.value()
}

/**
 *
 * @param {NumberValue|RealNumber} other
 * @return {boolean}
 */
RealNumber.prototype.isEqualTo = function (other) {
  if (!other.isInstanceOf(NumberValue)) {
    throw new InvalidTypeException(other, NumberValue)
  }

  return this.value() === other.value()
}

/**
 * Returns the integer part of RealNumber as Integer
 * @param {RoundingMode} [roundingMode] default is RoundingMode::CEIL
 * @return {IntegerValue}
 */
RealNumber.prototype.toIntegerValue = function (roundingMode) {
  if (typeof roundingMode === 'undefined') {
    roundingMode = RoundingMode.CEIL()
  }

  if (!roundingMode.isInstanceOf(RoundingMode)) {
    throw new InvalidTypeException(roundingMode, RoundingMode)
  }

  var value = this.valueOf()
  var round = this.round()
  if (roundingMode.hasSameValueAs(RoundingMode.FLOOR()) && (round > value)) {
    round--
  }

  var IntegerValue = require('./IntegerValue')
  return new IntegerValue(round)
}

/**
 * Returns the absolute integer part of RealNumber as NaturalNumber
 * @param {RoundingMode} [roundingMode] default is RoundingMode::CEIL
 * @return {NaturalNumber}
 */
RealNumber.prototype.toNaturalNumber = function (roundingMode) {
  var integer = this.toIntegerValue(roundingMode).valueOf()
  var natural = Math.abs(integer)

  var NaturalNumber = require('./NaturalNumber')
  return new NaturalNumber(natural)
}

RealNumber.Implements(NumberValue, ValueObject)

module.exports = RealNumber
