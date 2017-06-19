'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var ValueObject = require('../ValueObject')

/**
 * Constructs Timestamp from native js Date.
 * @param {Date} date
 * @return {Timestamp}
 */
Timestamp.fromNativeDate = function (date) {
  if (!date.isInstanceOf(Date)) {
    throw new InvalidTypeException(date, Date)
  }

  return new this(date.getTime())
}

/**
 * Constructs Timestamp from native JS values
 * @return {Timestamp}
 */
Timestamp.fromNative = function () {
  return this.fromNativeDate(new Date(arguments[0]))
}

/**
 * Timestamp constructor
 * @param {number} [value]
 * @constructor
 * @implements {ValueObject}
 */
function Timestamp (value) {
  if (typeof value === 'undefined') {
    var date = new Date()
    value = date.getTime()
  }

  if (isNaN(value)) {
    throw InvalidTypeException(value, Number)
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
 *
 * @param {ValueObject|Timestamp} other
 * @return {boolean}
 */
Timestamp.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  if (!(other instanceof this.constructor)) {
    return false
  }

  return this.value() === other.value()
}

/**
 *
 * @return {number}
 */
Timestamp.prototype.valueOf = function () {
  return this.value()
}

/**
 *
 * @return {string}
 */
Timestamp.prototype.toString = function () {
  return this.toNativeDate().toISOString()
}

/**
 * Returns native JS Date for current Timestamp
 * @return {Date}
 */
Timestamp.prototype.toNativeDate = function () {
  return new Date(this.value())
}

Timestamp.Implements(ValueObject)

module.exports = Timestamp
