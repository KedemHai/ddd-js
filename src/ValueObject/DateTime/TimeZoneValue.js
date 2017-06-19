'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
var TimezoneJSDate = require('./timezoneJS').Date
var tzdata = require('tzdata/tzdata')
var InvalidTimeZoneException = require('./Exception/InvalidTimeZoneException')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var ValueObject = require('../ValueObject')

TimeZoneValue.default = function () {
  return new this('UTC')
}
/**
 * Constructs TimeZoneValue from native values.
 * @return {TimeZoneValue}
 */
TimeZoneValue.fromNative = function () {
  if (typeof arguments[0] === 'undefined') {
    return this.default()
  }

  return new this(arguments[0])
}

/**
 * Returns zero timezone
 * @return {TimeZoneValue}
 */
TimeZoneValue.zero = function () {
  return new this('UTC')
}

/**
 * TimeZoneValue constructor
 * @param {string} name
 * @constructor
 * @implements {ValueObject}
 */
function TimeZoneValue (name) {
  if (typeof tzdata.zones[name] === 'undefined') {
    throw new InvalidTimeZoneException(name)
  }

  /**
   *
   * @return {string}
   */
  this.name = function () {
    return name
  }
}

/**
 *
 * @param {ValueObject|TimeZoneValue} other
 * @return {boolean}
 */
TimeZoneValue.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  return this.name() === other.name()
}

/**
 *
 * @return {string}
 */
TimeZoneValue.prototype.valueOf = function () {
  return this.name()
}

/**
 *
 * @return {string}
 */
TimeZoneValue.prototype.toString = function () {
  var time = (this.offset() / 60).toString().split('.')
  var hour = parseInt(time[0])
  var negative = hour < 0
  hour = Math.abs(hour) < 10 ? '0' + Math.abs(hour) : Math.abs(hour)
  hour = negative ? '-' + hour : '+' + hour
  return time[1] ? hour + (time[1] * 6).toString() : hour + '00'
}

/**
 * Returns the offset in minutes
 * @return {number}
 */
TimeZoneValue.prototype.offset = function () {
  var date = new TimezoneJSDate(new Date(), this.name())
  return -(date.getTimezoneOffset())
}

module.exports = TimeZoneValue
