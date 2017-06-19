'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var ValueObject = require('../ValueObject')
var IntegerValue = require('../Number/IntegerValue')
var InvalidTypeException = require('../../Exception/InvalidTypeException')

/**
 * @method
 * @name Year.fromNative
 * @param {...} arguments
 * @return {Year}
 */

/**
 * Constructs Year from native JS Date
 * @param {Date} date
 * @return {Year}
 */
Year.fromNativeDate = function (date) {
  if (!date.isInstanceOf(Date)) {
    throw new InvalidTypeException(date, Date)
  }

  return new this(date.getFullYear())
}

/**
 * Returns the current year
 * @return {Year}
 */
Year.now = function () {
  return this.fromNativeDate(new Date())
}

/**
 * Year constructor
 * @param {number} value
 * @constructor
 * @extends {IntegerValue}
 * @implements {ValueObject}
 */
function Year (value) {
  IntegerValue.call(this, value)
}

Year.extends(IntegerValue)

Year.Implements(ValueObject)

module.exports = Year
