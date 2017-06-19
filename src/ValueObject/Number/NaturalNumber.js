'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Function.prototype.Implements')
var BadMethodCallException = require('../../Exception/BadMethodCallException')
var IntegerValue = require('./IntegerValue')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var ValueObject = require('../ValueObject')

/**
 * @method
 * @name NaturalNumber.fromNative
 * @param {...[]} arguments
 * @return {NaturalNumber}
 */

/**
 * NaturalNumber constructor
 * @param {number} value
 * @constructor
 * @extends {IntegerValue}
 * @implements {ValueObject}
 */
function NaturalNumber (value) {
  if (isNaN(value)) {
    throw InvalidTypeException(value, Number)
  }

  value = Number(value)
  if ((value % 1) !== 0 || value < 0) {
    throw new BadMethodCallException('Not a natural number')
  }

  IntegerValue.call(this, value)
}

NaturalNumber.extends(IntegerValue)

NaturalNumber.Implements(ValueObject)

module.exports = NaturalNumber
