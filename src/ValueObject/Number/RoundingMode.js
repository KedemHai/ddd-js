'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Function.prototype.Implements')
var ValueObject = require('../ValueObject')
var Enum = require('../Enum/Enum')

/**
 *
 * @enum {string}
 */
RoundingMode.constants = {
  CEIL: 'Ceil',
  FLOOR: 'Floor'
}
Object.freeze(RoundingMode.constants)

/**
 *
 * @return {Enum|RoundingMode}
 */
RoundingMode.CEIL = function () {
  return Enum.get.call(RoundingMode, RoundingMode.constants.CEIL)
}

/**
 *
 * @return {Enum|RoundingMode}
 */
RoundingMode.FLOOR = function () {
  return Enum.get.call(RoundingMode, RoundingMode.constants.FLOOR)
}

/**
 * @param {RoundingMode.constants} value
 * @return {Enum|RoundingMode}
 */
RoundingMode.get = function (value) {
  return Enum.get.call(this, value)
}

/**
 *
 * @param {string} name
 * @return {Enum|RoundingMode}
 */
RoundingMode.getByName = function (name) {
  return Enum.getByName.call(this, name)
}

/**
 *
 * @param {number} number
 * @return {Enum|RoundingMode}
 */
RoundingMode.getByOrdinal = function (number) {
  return Enum.getByOrdinal.call(this, number)
}

/**
 * RoundingMode Enum
 * @param {RoundingMode.constants} value
 * @constructor
 * @extends {Enum}
 * @implements {ValueObject}
 */
function RoundingMode (value) {
  Enum.call(this, value)
}

RoundingMode.extends(Enum)

RoundingMode.Implements(ValueObject)

module.exports = RoundingMode
