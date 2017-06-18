'use strict'

/**
 * TimeZoneCalculator interface
 * @interface
 */
function TimeZoneCalculator () {
  throw new Error('Cannot instantiate interface TimeZoneCalculator')
}

/**
 *
 * @param {Date} date
 * @return {string}
 */
TimeZoneCalculator.prototype.getTimeZoneName = function (date) {
  throw new Error('Must implement method TimeZoneCalculator::getTimeZone')
}

/**
 *
 * @param {string} name
 * @return {number}
 */
TimeZoneCalculator.prototype.getTimezoneOffset = function (name) {
  throw new Error('Must implement method TimeZoneCalculator::getTimeZone')
}

module.exports = TimeZoneCalculator
