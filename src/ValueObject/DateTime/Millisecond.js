'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var NaturalNumber = require('../Number/NaturalNumber')
var ValueObject = require('../ValueObject')

/**
 * @method
 * @name Millisecond.fromNative
 * @param {...[]} arguments
 * @return {Millisecond}
 */

/**
 * Constructs Millisecond from JS native Date
 * @param {Date} date
 * @return {Millisecond}
 */
Millisecond.fromNativeDate = function (date) {
  if (!date.isInstanceOf(Date)) {
    throw new InvalidTypeException(date, Date)
  }

  return new this(date.getMilliseconds())
}

/**
 * Constructs Millisecond from current time
 * @return {Millisecond}
 */
Millisecond.now = function () {
  return this.fromNativeDate(new Date())
}

/**
 * Millisecond constructor
 * @param {number} value
 * @constructor
 * @extends {NaturalNumber}
 * @implements {ValueObject}
 */
function Millisecond (value) {
  if (isNaN(value)) {
    throw new TypeError('')
  }

  value = Number(value)
  if (value > 999) {
    throw new TypeError('')
  }

  NaturalNumber.call(this, value)
}

Millisecond.extends(NaturalNumber)

Millisecond.Implements(ValueObject)

module.exports = Millisecond
