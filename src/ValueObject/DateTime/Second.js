'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var NaturalNumber = require('../Number/NaturalNumber')
var ValueObject = require('../ValueObject')

/**
 * @method
 * @name Second.fromNative
 * @param {...[]} arguments
 * @return {Second}
 */

/**
 * Constructs Second from JS native Date
 * @param {Date} date
 * @return {Second}
 */
Second.fromNativeDate = function (date) {
  if (!date.isInstanceOf(Date)) {
    throw new InvalidTypeException(date, Date)
  }

  return new this(date.getSeconds())
}

/**
 * Constructs Second from current time
 * @return {Second}
 */
Second.now = function () {
  return this.fromNativeDate(new Date())
}

/**
 * Second constructor
 * @param {number} value
 * @constructor
 * @extends {NaturalNumber}
 * @implements {ValueObject}
 */
function Second (value) {
  if (isNaN(value)) {
    throw new TypeError('')
  }

  value = Number(value)
  if (value > 59) {
    throw new TypeError('')
  }

  NaturalNumber.call(this, value)
}

Second.extends(NaturalNumber)

Second.Implements(ValueObject)

module.exports = Second
