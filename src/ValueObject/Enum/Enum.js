'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var ConstantNotFountException = require('./Exception/ConstantNotFountException')
var InaccessibleException = require('../../Exception/InaccessibleException')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var ValueObject = require('../ValueObject')

/**
 * Keeps Enum constructor private
 * @type {boolean}
 * @private
 */
var _privateConstructor = true
/**
 *
 * @enum {*}
 */
Enum.constants = {}
Object.freeze(Enum.constants)

/**
 * @return {{}}
 */
Enum.getConstants = function () {
  return this.constants
}
/**
 * Construct Enum from JS native values
 * @return {Enum}
 */
Enum.fromNative = function () {
  return this.get(arguments[0])
}

/**
 * Construct Enum from given value. searches for the value within the Object's constants.
 * @param {*} value
 * @return {Enum}
 */
Enum.get = function (value) {
  var constants = this.getConstants()
  var getValue = null
  for (var prop in constants) {
    if (constants.hasOwnProperty(prop)) {
      if (constants[prop] === value) {
        getValue = constants[prop]
        break
      }
    }
  }

  if (getValue === null) {
    throw new ConstantNotFountException(value)
  }

  _privateConstructor = false
  return new this(getValue)
}

/**
 *
 * @param {string} name
 * @return {Enum}
 */
Enum.getByName = function (name) {
  _privateConstructor = false
  return new this(this.getConstants()[name])
}

/**
 *
 * @param {number} ordinal
 * @return {Enum}
 */
Enum.getByOrdinal = function (ordinal) {
  if (typeof ordinal !== 'number') {
    throw new InvalidTypeException(ordinal, Number)
  }

  var _iOrdinal = 0
  for (var constant in this.getConstants()) {
    if (!this.getConstants().hasOwnProperty(constant)) {
      continue
    }

    if (_iOrdinal === ordinal) {
      _privateConstructor = false
      return new this(this.getConstants()[constant])
    }

    _iOrdinal++
  }

  throw new Error('value not found')
}

/**
 * Enum abstract class
 *
 * @param {*} value
 * @constructor
 * @implements {ValueObject}
 * @abstract
 */
function Enum (value) {
  if (_privateConstructor === true) {
    throw new InaccessibleException()
  }
  if (this.constructor === Enum) {
    throw new Error('Cannot instantiate abstract class Enum')
  }

  _privateConstructor = true
  /**
   *
   * @return {!*}
   */
  this.value = function () {
    return value
  }
}

/**
 *
 * @param {ValueObject|Enum} other
 * @return {boolean}
 */
Enum.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  return this.value() === other.value()
}

/**
 *
 * @return {*}
 */
Enum.prototype.valueOf = function () {
  return this.value()
}

/**
 *
 * @return {string}
 */
Enum.prototype.toString = function () {
  return this.value().toString().toString()
}

/**
 *
 * @return {number}
 */
Enum.prototype.getOrdinal = function () {
  var constants = this.constructor.getConstants()
  var constant
  var ordinal = 0
  for (constant in constants) {
    if (!constants.hasOwnProperty(constant)) {
      continue
    }

    if (constants[constant] === this.value()) {
      return ordinal
    }

    ordinal++
  }
}

Enum.Implements(ValueObject)

module.exports = Enum
