'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Function.prototype.Implements')
var BadMethodCallException = require('../../Exception/BadMethodCallException')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var RealNumber = require('./RealNumber')
var ValueObject = require('../ValueObject')

/**
 * @method
 * @name IntegerValue.fromNative
 * @param {...[]} arguments
 * @return {IntegerValue}
 */

/**
 * IntegerValue value object constructor
 * @param {number} value
 * @constructor
 * @extends {RealNumber}
 * @property {RealNumber.prototype} parent
 * @implements {ValueObject}
 */
function IntegerValue (value) {
  if (isNaN(value)) {
    throw new InvalidTypeException(value, Number)
  }

  value = Number(value)
  if ((value % 1) !== 0) {
    throw new BadMethodCallException('Not an integer')
  }

  RealNumber.call(this, value)
}

IntegerValue.extends(RealNumber)

/**
 * Returns a RealNumber with the value of the IntegerValue
 *
 * @return {RealNumber}
 */
IntegerValue.prototype.toRealNumber = function () {
  return new RealNumber(this.valueOf())
}

IntegerValue.Implements(ValueObject)

module.exports = IntegerValue
