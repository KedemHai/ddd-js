'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var Enum = require('../Enum/Enum')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var ValueObject = require('../ValueObject')

/**
 * @method
 * @name Month.fromNative
 * @return {Month}
 */
/**
 * @method
 * @name Month.get
 * @param {Month.constants} value
 * @return {Month}
 */
/**
 * @method
 * @name Month.getByName
 * @param {string} name
 * @return {Month}
 */
/**
 * @method
 * @name Month.getByOrdinal
 * @param {number} ordinal
 * @return {Month}
 */

/**
 *
 * @readonly
 * @enum {string}
 */
Month.constants = {
  JANUARY: 'January',
  FEBRUARY: 'February',
  MARCH: 'March',
  APRIL: 'April',
  MAY: 'May',
  JUNE: 'June',
  JULY: 'July',
  AUGUST: 'August',
  SEPTEMBER: 'September',
  OCTOBER: 'October',
  NOVEMBER: 'November',
  DECEMBER: 'December'
}
Object.freeze(Month.constants)

/**
 *
 * @return {Month}
 */
Month.JANUARY = function () {
  return Month.get(Month.constants.JANUARY)
}

/**
 *
 * @return {Month}
 */
Month.FEBRUARY = function () {
  return Month.get(Month.constants.FEBRUARY)
}

/**
 *
 * @return {Month}
 */
Month.MARCH = function () {
  return Month.get(Month.constants.MARCH)
}

/**
 *
 * @return {Month}
 */
Month.APRIL = function () {
  return Month.get(Month.constants.APRIL)
}

/**
 *
 * @return {Month}
 */
Month.MAY = function () {
  return Month.get(Month.constants.MAY)
}

/**
 *
 * @return {Month}
 */
Month.JUNE = function () {
  return Month.get(Month.constants.JUNE)
}

/**
 *
 * @return {Month}
 */
Month.JULY = function () {
  return Month.get(Month.constants.JULY)
}

/**
 *
 * @return {Month}
 */
Month.AUGUST = function () {
  return Month.get(Month.constants.AUGUST)
}

/**
 *
 * @return {Month}
 */
Month.SEPTEMBER = function () {
  return Month.get(Month.constants.SEPTEMBER)
}

/**
 *
 * @return {Month}
 */
Month.OCTOBER = function () {
  return Month.get(Month.constants.OCTOBER)
}

/**
 *
 * @return {Month}
 */
Month.NOVEMBER = function () {
  return Month.get(Month.constants.NOVEMBER)
}

/**
 *
 * @return {Month}
 */
Month.DECEMBER = function () {
  return Month.get(Month.constants.DECEMBER)
}

/**
 * Constructs Month from JS native Date
 *
 * @param {Date} date
 * @return {Month}
 */
Month.fromNativeDate = function (date) {
  if (!date.isInstanceOf(Date)) {
    throw new InvalidTypeException(date, Date)
  }

  return this.getByOrdinal(date.getMonth())
}

/**
 * Returns the current Month
 * @return {Month}
 */
Month.now = function () {
  return this.fromNativeDate(new Date())
}

/**
 * Month constructor
 *
 * @param {Month.constants} value
 * @constructor
 * @extends {Enum}
 * @implements {ValueObject}
 */
function Month (value) {
  Enum.call(this, value)
}

Month.extends(Enum)

Month.Implements(ValueObject)

module.exports = Month
