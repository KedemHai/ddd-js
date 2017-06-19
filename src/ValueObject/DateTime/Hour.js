'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var NaturalNumber = require('../Number/NaturalNumber')
var ValueObject = require('../ValueObject')

/**
 * @method
 * @name Hour.fromNative
 * @param {...[]} arguments
 * @return {Hour}
 */

/**
 * Constructs Hour from JS native Date
 * @param {Date} date
 * @return {Hour}
 */
Hour.fromNativeDate = function (date) {
  if (!date.isInstanceOf(Date)) {
    throw new InvalidTypeException(date, Date)
  }

  return new this(date.getHours())
}

/**
 * Constructs Hour from current time
 * @return {Hour}
 */
Hour.now = function () {
  return this.fromNativeDate(new Date())
}

/**
 * Hour constructor
 * @param {number} value
 * @constructor
 * @extends {NaturalNumber}
 * @implements {ValueObject}
 */
function Hour (value) {
  if (isNaN(value)) {
    throw new InvalidTypeException(value, Number)
  }

  value = Number(value)
  if (value > 23) {
    throw new TypeError('')
  }

  NaturalNumber.call(this, value)
}

Hour.extends(NaturalNumber)

Hour.Implements(ValueObject)

module.exports = Hour
