'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var Enum = require('../Enum/Enum')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var ValueObject = require('../ValueObject')

/**
 * @method
 * @name WeekDay.fromNative
 * @param {...[]} arguments
 * @return {WeekDay}
 */
/**
 * @method
 * @name WeekDay.get
 * @param {WeekDay.constants} value
 * @return {WeekDay}
 */
/**
 * @method
 * @name WeekDay.getByName
 * @param {string} name
 * @return {WeekDay}
 */
/**
 * @method
 * @name WeekDay.getByOrdinal
 * @param {number} ordinal
 * @return {WeekDay}
 */

/**
 *
 * @enum {string}
 */
WeekDay.constants = {
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday'
}
Object.freeze(WeekDay.constants)

WeekDay.MONDAY = function () {
  return WeekDay.get(WeekDay.constants.MONDAY)
}

WeekDay.TUESDAY = function () {
  return WeekDay.get(WeekDay.constants.TUESDAY)
}

WeekDay.WEDNESDAY = function () {
  return WeekDay.get(WeekDay.constants.WEDNESDAY)
}

WeekDay.THURSDAY = function () {
  return WeekDay.get(WeekDay.constants.THURSDAY)
}

WeekDay.FRIDAY = function () {
  return WeekDay.get(WeekDay.constants.FRIDAY)
}

WeekDay.SATURDAY = function () {
  return WeekDay.get(WeekDay.constants.SATURDAY)
}

WeekDay.SUNDAY = function () {
  return WeekDay.get(WeekDay.constants.SUNDAY)
}

/**
 * Constructs WeekDay from JS native Date
 *
 * @param {Date} date
 * @return {WeekDay}
 */
WeekDay.fromNativeDate = function (date) {
  if (!date.isInstanceOf(Date)) {
    throw new InvalidTypeException(date, Date)
  }

  return this.getByOrdinal(date.getDay())
}

/**
 * Returns the current WeekDay
 * @return {WeekDay}
 */
WeekDay.now = function () {
  return this.fromNativeDate(new Date())
}

/**
 * WeekDay constructor
 *
 * @param {number} value
 * @constructor
 * @extends {Enum}
 * @implements {ValueObject}
 */
function WeekDay (value) {
  Enum.call(this, value)
}

WeekDay.extends(Enum)

WeekDay.Implements(ValueObject)

module.exports = WeekDay
