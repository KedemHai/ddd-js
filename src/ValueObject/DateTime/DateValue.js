'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var Month = require('./Month')
var MonthDay = require('./MonthDay')
var RealNumber = require('../Number/RealNumber')
var ValueObject = require('../ValueObject')
var WeekDay = require('./WeekDay')
var Year = require('./Year')

/**
 * Constructs DateValue from JS native values
 * @return {DateValue}
 */
DateValue.fromNative = function () {
  var year = new Year(arguments[0])
  var month = isNaN(arguments[1]) ? Month.get(arguments[1]) : Month.getByOrdinal(arguments[1])
  var day = new MonthDay(arguments[2])

  return new this(year, month, day)
}

/**
 * Construct DateValue from JS native Date
 * @param {Date} date
 * @return {DateValue}
 * @this DateValue
 */
DateValue.fromNativeDate = function (date) {
  if (!date.isInstanceOf(Date)) {
    throw new InvalidTypeException(date, Date)
  }

  var year = Year.fromNativeDate(date)
  var month = Month.fromNativeDate(date)
  var day = MonthDay.fromNativeDate(date)

  return new this(year, month, day)
}

/**
 * Returns DateValue for current time
 * @return {DateValue}
 */
DateValue.now = function () {
  return this.fromNativeDate(new Date())
}

/**
 * DateValue constructor
 * @param {Year} year
 * @param {Month} month
 * @param {MonthDay} day
 * @constructor
 * @implements {ValueObject}
 */
function DateValue (year, month, day) {
  if (!year.isInstanceOf(Year)) {
    throw new InvalidTypeException(year, Year)
  }
  if (!month.isInstanceOf(Month)) {
    throw new InvalidTypeException(month, Month)
  }
  if (!day.isInstanceOf(MonthDay)) {
    throw new InvalidTypeException(day, MonthDay)
  }

  /**
   *
   * @return {Year}
   */
  this.year = function () {
    return year
  }
  /**
   *
   * @return {Month}
   */
  this.month = function () {
    return month
  }
  /**
   *
   * @return {MonthDay}
   */
  this.day = function () {
    return day
  }
}

/**
 * Checks if 2 DateValue objects are equal
 *
 * @param {ValueObject|DateValue} other
 * @return {boolean}
 */
DateValue.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  if (!(other instanceof DateValue)) {
    return false
  }

  return (
    this.year().hasSameValueAs(other.year()) &&
    this.month().hasSameValueAs(other.month()) &&
    this.day().hasSameValueAs(other.day())
  )
}

/**
 *
 * @return {number}
 */
DateValue.prototype.valueOf = function () {
  return this.toNativeDate().getTime()
}

DateValue.prototype.toString = function () {
  return this.toNativeDate().toISOString()
}

/**
 * Returns native JS Date of current DateValue
 * @return {Date}
 */
DateValue.prototype.toNativeDate = function () {
  var nativeDate = new Date()
  nativeDate.setUTCFullYear(this.year().valueOf())
  nativeDate.setUTCMonth(this.month().getOrdinal())
  nativeDate.setUTCDate(this.day().valueOf())
  nativeDate.setUTCHours(0, 0, 0, 0)

  return nativeDate
}

/**
 *
 * @return {WeekDay}
 */
DateValue.prototype.weekDay = function () {
  return WeekDay.fromNativeDate(this.toNativeDate())
}

/**
 *
 * @param {RealNumber} years
 * @return {DateValue}
 */
DateValue.prototype.addYears = function (years) {
  if (!years.isInstanceOf(RealNumber)) {
    throw new InvalidTypeException(years, RealNumber)
  }

  var _years = this.year().add(years)
  var _newDate = this.toNativeDate()
  _newDate.setUTCFullYear(_years.valueOf())

  return this.constructor.fromNativeDate(_newDate)
}

/**
 *
 * @param {RealNumber} days
 * @return {DateValue}
 */
DateValue.prototype.addDays = function (days) {
  if (!days.isInstanceOf(RealNumber)) {
    throw new InvalidTypeException(days, RealNumber)
  }

  var _days = this.day().add(days)
  var _newDate = this.toNativeDate()
  _newDate.setUTCDate(_days.valueOf())

  return this.constructor.fromNativeDate(_newDate)
}

/**
 *
 * @param {DateValue} other
 * @return {boolean}
 */
DateValue.prototype.isEarlierThan = function (other) {
  if (!other.isInstanceOf(this.constructor)) {
    throw new InvalidTypeException(other, this.constructor)
  }

  return this.valueOf() < other.valueOf()
}

/**
 *
 * @param {DateValue} other
 * @return {boolean}
 */
DateValue.prototype.isLaterThan = function (other) {
  if (!other.isInstanceOf(this.constructor)) {
    throw new InvalidTypeException(other, this.constructor)
  }

  return this.valueOf() > other.valueOf()
}

/**
 *
 * @param {DateValue} other
 * @return {boolean}
 */
DateValue.prototype.hasSameDateAs = function (other) {
  if (!other.isInstanceOf(this.constructor)) {
    throw new InvalidTypeException(other, this.constructor)
  }

  return this.valueOf() === other.valueOf()
}

DateValue.Implements(ValueObject)

module.exports = DateValue
