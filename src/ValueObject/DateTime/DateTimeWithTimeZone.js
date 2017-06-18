'use strict'

require('../../../lib/Function.prototype.Implements')
require('../../../lib/Object.prototype.isInstanceOf')
var DateTime = require('./DateTime')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var RealNumber = require('../Number/RealNumber')
var TimeZoneValue = require('./TimeZoneValue')
var ValueObject = require('../ValueObject')

/**
 * Construct DateTimeWithTimeZone from native JS values
 * @param {...[]} arguments
 * @return {DateTimeWithTimeZone}
 */
DateTimeWithTimeZone.fromNative = function () {
  var dateTime = DateTime.fromNative(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6])
  var timezone = TimeZoneValue.fromNative(arguments[7])

  return new this(dateTime, timezone)
}

/**
 * Constructs DateTimeWithTimeZone from native js Date
 * @param {Date} date
 * @return {DateTimeWithTimeZone}
 */
DateTimeWithTimeZone.fromNativeDate = function (date) {
  if (!date.isInstanceOf(Date)) {
    throw new InvalidTypeException(date, Date)
  }

  return this.fromNative(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds(), 'UTC')
}

/**
 * Construct DateTimeWithTimeZone for current time
 * @param {TimeZoneValue} [timezone]
 * @return {DateTimeWithTimeZone}
 */
DateTimeWithTimeZone.now = function (timezone) {
  if (typeof timezone === 'undefined') {
    timezone = TimeZoneValue.zero()
  }

  if (!timezone.isInstanceOf(TimeZoneValue)) {
    throw new InvalidTypeException(timezone, TimeZoneValue)
  }

  var _zero = new this(DateTime.now(), TimeZoneValue.zero())

  return _zero.toTimeZone(timezone)
}

/**
 *
 * @param {DateTime} dateTime
 * @param {TimeZoneValue} timezone
 * @constructor
 * @implements {ValueObject}
 */
function DateTimeWithTimeZone (dateTime, timezone) {
  if (!dateTime.isInstanceOf(DateTime)) {
    throw InvalidTypeException(dateTime, DateTime)
  }
  if (!timezone.isInstanceOf(TimeZoneValue)) {
    throw new InvalidTypeException(timezone, TimeZoneValue)
  }

  /**
   *
   * @return {DateTime}
   */
  this.dateTime = function () {
    return dateTime
  }
  /**
   *
   * @return {TimeZoneValue}
   */
  this.timezone = function () {
    return timezone
  }
}

/**
 *
 * @param {RealNumber} days
 * @return {DateTimeWithTimeZone}
 */
DateTimeWithTimeZone.prototype.addDays = function (days) {
  if (!(days instanceof RealNumber)) {
    throw new TypeError('')
  }

  return new this(this.dateTime().addDays(days), this.timezone())
}

/**
 * @inheritDoc
 * @param {ValueObject|DateTimeWithTimeZone} other
 */
DateTimeWithTimeZone.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  if (!(other instanceof this.constructor)) {
    return false
  }
  return (
    other.dateTime().hasSameValueAs(this.dateTime()) &&
    other.timezone().hasSameValueAs(this.timezone())
  )
}

/**
 *
 * @param {DateTimeWithTimeZone} other
 * @return {boolean}
 */
DateTimeWithTimeZone.prototype.isLaterThan = function (other) {
  if (!(other instanceof DateTimeWithTimeZone)) {
    throw new TypeError('')
  }

  return this.toNativeDate().getTime() > other.toNativeDate().getTime()
}

/**
 *
 * @param {DateTimeWithTimeZone} other
 * @return {boolean}
 */
DateTimeWithTimeZone.prototype.isEarlierThan = function (other) {
  if (!(other instanceof DateTimeWithTimeZone)) {
    throw new TypeError('')
  }

  return this.toNativeDate().getTime() < other.toNativeDate().getTime()
}

/**
 *
 * @param {DateTimeWithTimeZone} other
 * @return {boolean}
 */
DateTimeWithTimeZone.prototype.hasSameDateTimeAs = function (other) {
  if (!other.isInstanceOf(DateTimeWithTimeZone)) {
    throw InvalidTypeException(other, DateTimeWithTimeZone)
  }

  return this.toNativeDate().getTime() === other.toNativeDate().getTime()
}

/**
 *
 * @param {TimeZoneValue} timezone
 * @return {DateTimeWithTimeZone}
 */
DateTimeWithTimeZone.prototype.toTimeZone = function (timezone) {
  if (!timezone.isInstanceOf(TimeZoneValue)) {
    throw new InvalidTypeException(timezone, TimeZoneValue)
  }

  var date = this.toNativeDate()
  date.setUTCMinutes(date.getUTCMinutes() + timezone.offset())

  return new this.constructor(DateTime.fromNativeDate(date), timezone)
}

/**
 *
 * @return {Date}
 */
DateTimeWithTimeZone.prototype.toNativeDate = function () {
  var year = this.dateTime().date().year().valueOf()
  var month = this.dateTime().date().month().getOrdinal()
  var day = this.dateTime().date().day().valueOf()
  var hours = this.dateTime().time().hour().valueOf()
  var minutes = this.dateTime().time().minute().valueOf() - this.timezone().offset().valueOf()
  var seconds = this.dateTime().time().second().valueOf()
  var milliseconds = this.dateTime().time().millisecond().valueOf()

  return new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds))
}

DateTimeWithTimeZone.prototype.valueOf = function () {
  return this.toNativeDate().toISOString()
}

/**
 *
 * @return {string}
 */
DateTimeWithTimeZone.prototype.toString = function () {
  return this.toNativeDate().toLocaleString()
}

DateTimeWithTimeZone.Implements(ValueObject)

module.exports = DateTimeWithTimeZone
