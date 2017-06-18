'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var DateValue = require('./DateValue')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var RealNumber = require('../Number/RealNumber')
var TimeValue = require('./TimeValue')
var ValueObject = require('../ValueObject')

/**
 * Construct DateTime from native JS values
 * @return {DateTime}
 */
DateTime.fromNative = function () {
  var date = DateValue.fromNative(arguments[0], arguments[1], arguments[2])
  var time = TimeValue.fromNative(arguments[3], arguments[4], arguments[5], arguments[6])

  return new this(date, time)
}

/**
 * Construct DateTime from native JS Date
 * @param {Date} date
 * @return {DateTime}
 */
DateTime.fromNativeDate = function (date) {
  if (!(date instanceof Date)) {
    throw new InvalidTypeException(date, Date)
  }

  var dateValue = DateValue.fromNativeDate(date)
  var timeValue = TimeValue.fromNativeDate(date)

  return new this(dateValue, timeValue)
}

/**
 * Constructs DateTime for current time
 * @return {DateTime}
 */
DateTime.now = function () {
  return this.fromNativeDate(new Date())
}

/**
 * DateTime constructor
 * @param {DateValue} date
 * @param {TimeValue} time
 * @constructor
 * @implements {ValueObject}
 */
function DateTime (date, time) {
  if (!date.isInstanceOf(DateValue)) {
    throw new InvalidTypeException(date, DateValue)
  }
  if (!time.isInstanceOf(TimeValue)) {
    throw new InvalidTypeException(time, TimeValue)
  }

  /**
   *
   * @return {DateValue}
   */
  this.date = function () {
    return date
  }
  /**
   *
   * @return {TimeValue}
   */
  this.time = function () {
    return time
  }
}

/**
 *
 * @param {ValueObject|DateTime}other
 * @return {boolean}
 */
DateTime.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  if (!(other instanceof this.constructor)) {
    return false
  }

  return (
    this.date().hasSameValueAs(other.date()) &&
    this.time().hasSameValueAs(other.time())
  )
}

/**
 *
 * @return {number}
 */
DateTime.prototype.valueOf = function () {
  return this.toNativeDate().getTime()
}

/**
 *
 * @return {string}
 */
DateTime.prototype.toString = function () {
  return this.toNativeDate().toISOString()
}

/**
 *
 * @param {RealNumber} years
 * @return {DateTime}
 */
DateTime.prototype.addYears = function (years) {
  if (!years.isInstanceOf(RealNumber)) {
    throw new InvalidTypeException(years, RealNumber)
  }

  var yearTotal = this.date().year().add(years)
  var newDate = this.toNativeDate()
  newDate.setUTCFullYear(yearTotal.valueOf())

  return this.constructor.fromNativeDate(newDate)
}

/**
 *
 * @param {RealNumber} months
 * @return {DateTime}
 */
DateTime.prototype.addMonths = function (months) {
  if (!months.isInstanceOf(RealNumber)) {
    throw new InvalidTypeException(months, RealNumber)
  }

  var monthsTotal = this.date().month().getOrdinal() + months.valueOf()
  var newDate = this.toNativeDate()
  newDate.setUTCMonth(monthsTotal)

  return this.constructor.fromNativeDate(newDate)
}

/**
 *
 * @param {RealNumber} days
 * @return {DateTime}
 */
DateTime.prototype.addDays = function (days) {
  if (!days.isInstanceOf(RealNumber)) {
    throw new InvalidTypeException(days, RealNumber)
  }

  var daysTotal = this.date().day().add(days)
  var newDate = this.toNativeDate()
  newDate.setUTCDate(daysTotal.valueOf())

  return this.constructor.fromNativeDate(newDate)
}

/**
 *
 * @param {RealNumber} hours
 * @return {DateTime}
 */
DateTime.prototype.addHours = function (hours) {
  if (!hours.isInstanceOf(RealNumber)) {
    throw new InvalidTypeException(hours, RealNumber)
  }

  var hoursTotal = this.time().hour().add(hours)
  var newDate = this.toNativeDate()
  newDate.setUTCHours(hoursTotal.valueOf())

  return this.constructor.fromNativeDate(newDate)
}

/**
 *
 * @param {RealNumber} minutes
 * @return {DateTime}
 */
DateTime.prototype.addMinutes = function (minutes) {
  if (!minutes.isInstanceOf(RealNumber)) {
    throw new InvalidTypeException(minutes, RealNumber)
  }

  var minutesTotal = this.time().minute().add(minutes)
  var newDate = this.toNativeDate()
  newDate.setUTCMinutes(minutesTotal.valueOf())

  return this.constructor.fromNativeDate(newDate)
}

/**
 *
 * @param {RealNumber} seconds
 * @return {DateTime}
 */
DateTime.prototype.addSeconds = function (seconds) {
  if (!seconds.isInstanceOf(RealNumber)) {
    throw new InvalidTypeException(seconds, RealNumber)
  }

  var secondsTotal = this.time().second().add(seconds)
  var newDate = this.toNativeDate()
  newDate.setUTCSeconds(secondsTotal.valueOf())

  return this.constructor.fromNativeDate(newDate)
}

/**
 *
 * @param {RealNumber} milliseconds
 * @return {DateTime}
 */
DateTime.prototype.addMilliseconds = function (milliseconds) {
  if (!milliseconds.isInstanceOf(RealNumber)) {
    throw new InvalidTypeException(milliseconds, RealNumber)
  }

  var millisecondsTotal = this.time().millisecond().add(milliseconds)
  var newDate = this.toNativeDate()
  newDate.setUTCMilliseconds(millisecondsTotal.valueOf())

  return this.constructor.fromNativeDate(newDate)
}

/**
 * Returns native JS Date of the current DateTime
 * @return {Date}
 */
DateTime.prototype.toNativeDate = function () {
  var nativeDate = new Date()
  nativeDate.setUTCFullYear(this.date().year().valueOf())
  nativeDate.setUTCMonth(this.month().getOrdinal())
  nativeDate.setUTCDate(this.date().day().valueOf())
  nativeDate.setUTCHours(this.time().hour().valueOf())
  nativeDate.setUTCMinutes(this.time().minute().valueOf())
  nativeDate.setUTCSeconds(this.time().second().valueOf())
  nativeDate.setUTCMilliseconds(this.time().millisecond().valueOf())

  return nativeDate
}

/**
 *
 * @param {DateTime} other
 * @return {boolean}
 */
DateTime.prototype.isEarlierThan = function (other) {
  if (!other.isInstanceOf(this.constructor)) {
    throw new InvalidTypeException(other, this.constructor)
  }

  return this.valueOf() < other.valueOf()
}

/**
 *
 * @param {DateTime} other
 * @return {boolean}
 */
DateTime.prototype.isLaterThan = function (other) {
  if (!other.isInstanceOf(this.constructor)) {
    throw new InvalidTypeException(other, this.constructor)
  }

  return this.valueOf() > other.valueOf()
}

/**
 *
 * @param {DateTime} other
 * @return {boolean}
 */
DateTime.prototype.hasSameDateTimeAs = function (other) {
  if (!other.isInstanceOf(this.constructor)) {
    throw new InvalidTypeException(other, this.constructor)
  }

  return this.valueOf() === other.valueOf()
}

DateTime.Implements(ValueObject)

module.exports = DateTime
