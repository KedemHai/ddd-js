'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var ValueObject = require('../ValueObject')
var NaturalNumber = require('../Number/NaturalNumber')
var InvalidTypeException = require('../../Exception/InvalidTypeException')

/**
 * @method
 * @name MonthDay.fromNative
 * @param {...[]} arguments
 * @return {MonthDay}
 */

/**
 * Constructs MonthDay from js native Date
 * @param {Date} date
 * @return {MonthDay}
 */
MonthDay.fromNativeDate = function (date) {
  if (!date.isInstanceOf(Date)) {
    throw new InvalidTypeException(date, Date)
  }

  return new this(date.getDate())
}

/**
 * Returns the current MonthDay
 * @return {MonthDay}
 */
MonthDay.now = function () {
  return this.fromNativeDate(new Date())
}

/**
 * MonthDay constructor
 *
 * @param {number} value
 * @constructor
 * @extends {NaturalNumber}
 * @implements {ValueObject}
 */
function MonthDay (value) {
  if (isNaN(value)) {
    throw new TypeError('Not a number')
  }

  value = Number(value)

  if ((value % 1) !== 0 || value < 1 || value > 31) {
    throw new TypeError('')
  }

  NaturalNumber.call(this, value)
}

MonthDay.extends(NaturalNumber)

MonthDay.Implements(ValueObject)

module.exports = MonthDay
