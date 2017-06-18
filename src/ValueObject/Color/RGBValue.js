'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Function.prototype.Implements')
var IntegerValue = require('../Number/IntegerValue')
var InvalidRangeException = require('../../Exception/InvalidRangeException')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var ValueObject = require('../ValueObject')

/**
 * Constructs RGBValue from native JS values
 * @return {RGBValue}
 */
RGBValue.fromNative = function () {
  return new this(arguments[0])
}

/**
 * RGBValue constructor
 * @param {number} value
 * @constructor
 * @implements {ValueObject}
 */
function RGBValue (value) {
  if (isNaN(value)) {
    throw new InvalidTypeException(value, Number)
  }

  value = Number(value)
  if (value < 0 || value > 255) {
    throw new InvalidRangeException('RGB range invalid')
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
 * Checks of 2 RGBValue objects have the same value
 * @param {ValueObject|RGBValue}other
 * @return {boolean}
 */
RGBValue.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  return this.value() === other.value()
}

/**
 *
 * @return {number}
 */
RGBValue.prototype.valueOf = function () {
  return this.value()
}

/**
 *
 * @return {string}
 */
RGBValue.prototype.toString = function () {
  return String(this.value())
}

/**
 * Return RGBValue with additional value
 * @param {IntegerValue} integer
 * @return {RGBValue}
 */
RGBValue.prototype.add = function (integer) {
  if (!integer.isInstanceOf(IntegerValue)) {
    throw new InvalidTypeException(integer, IntegerValue)
  }

  var value = this.valueOf() + integer.valueOf()
  if (value < 0) {
    value = 0
  }
  if (value > 255) {
    value = 255
  }

  return new this.constructor(value)
}

RGBValue.Implements(ValueObject)

module.exports = RGBValue
