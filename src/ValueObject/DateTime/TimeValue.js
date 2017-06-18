'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
var Hour = require('./Hour')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var Millisecond = require('./Millisecond')
var Minute = require('./Minute')
var Second = require('./Second')
var ValueObject = require('../ValueObject')

/**
 * Construct TimeValue from native values
 * @return {TimeValue}
 */
TimeValue.fromNative = function () {
  var args = Array.prototype.slice.apply(arguments)
  if (typeof args[0] === 'undefined') {
    args[0] = 0
  }
  if (typeof args[1] === 'undefined') {
    args[1] = 0
  }
  if (typeof args[2] === 'undefined') {
    args[2] = 0
  }
  if (typeof args[3] === 'undefined') {
    args[3] = 0
  }

  var hour = new Hour(args[0])
  var minute = new Minute(args[1])
  var second = new Second(args[2])
  var millisecond = new Millisecond(args[3])

  return new this(hour, minute, second, millisecond)
}
/**
 * Construct TimeValue from native js Date
 * @param {Date} date
 * @return {TimeValue}
 */
TimeValue.fromNativeDate = function (date) {
  if (!date.isInstanceOf(Date)) {
    throw new InvalidTypeException(date, Date)
  }

  return this.fromNative(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())
}

/**
 * Returns TimeValue for current time
 * @return {TimeValue}
 */
TimeValue.now = function () {
  return this.fromNativeDate(new Date())
}

/**
 * Constructs TimeValue with zero time.
 * @return {TimeValue}
 */
TimeValue.zero = function () {
  return this.fromNative(0, 0, 0, 0)
}

/**
 * TimeValue constructor
 * @param {Hour} hour
 * @param {Minute} minute
 * @param {Second} second
 * @param {Millisecond} millisecond
 * @constructor
 * @implements {ValueObject}
 */
function TimeValue (hour, minute, second, millisecond) {
  if (!hour.isInstanceOf(Hour)) {
    throw new InvalidTypeException(hour, Hour)
  }
  if (!minute.isInstanceOf(Minute)) {
    throw new InvalidTypeException(minute, Minute)
  }
  if (!second.isInstanceOf(Second)) {
    throw new InvalidTypeException(second, Second)
  }
  if (!millisecond.isInstanceOf(Millisecond)) {
    throw new InvalidTypeException(millisecond, Millisecond)
  }

  /**
   *
   * @return {Hour}
   */
  this.hour = function () {
    return hour
  }
  /**
   *
   * @return {Minute}
   */
  this.minute = function () {
    return minute
  }
  /**
   *
   * @return {Second}
   */
  this.second = function () {
    return second
  }
  /**
   *
   * @return {Millisecond}
   */
  this.millisecond = function () {
    return millisecond
  }
}

/**
 * Checks if 2 TimeValue objects are the same
 * @param {ValueObject|TimeValue} other
 * @returns {boolean}
 */
TimeValue.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  if (!(other instanceof TimeValue)) {
    return false
  }

  return (
    this.hour().hasSameValueAs(other.hour()) &&
    this.minute().hasSameValueAs(other.minute()) &&
    this.second().hasSameValueAs(other.second()) &&
    this.millisecond().hasSameValueAs(other.millisecond())
  )
}

/**
 *
 * @return {number}
 */
TimeValue.prototype.valueOf = function () {
  return this.toNativeDate().getTime()
}

TimeValue.prototype.toString = function () {
  return this.toNativeDate().toISOString()
}

/**
 *
 * @returns {Date}
 */
TimeValue.prototype.toNativeDate = function () {
  var nativeDate = new Date()
  nativeDate.setUTCHours(this.hour().valueOf())
  nativeDate.setUTCMinutes(this.minute().valueOf())
  nativeDate.setUTCSeconds(this.second().valueOf())
  nativeDate.setUTCMilliseconds(this.millisecond().valueOf())

  return nativeDate
}

module.exports = TimeValue
