'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var NaturalNumber = require('../Number/NaturalNumber')
var ValueObject = require('../ValueObject')

/**
 * @method
 * @name Minute.fromNative
 * @param {...[]} arguments
 * @return {Minute}
 */

/**
 * Constructs Minute from JS native Date
 * @param {Date} date
 * @return {Minute}
 */
Minute.fromNativeDate = function (date) {
  if (!date.isInstanceOf(Date)) {
    throw new InvalidTypeException(date, Date)
  }

  return new this(date.getMinutes())
}

/**
 * Constructs Minute from current time
 * @return {Minute}
 */
Minute.now = function () {
  return this.fromNativeDate(new Date())
}

/**
 * Minute constructor
 * @param {number} value
 * @constructor
 * @extends {NaturalNumber}
 * @implements {ValueObject}
 */
function Minute (value) {
  if (isNaN(value)) {
    throw new TypeError('')
  }

  value = Number(value)
  if (value > 59) {
    throw new TypeError('')
  }

  NaturalNumber.call(this, value)
}

Minute.extends(NaturalNumber)

Minute.Implements(ValueObject)

module.exports = Minute
