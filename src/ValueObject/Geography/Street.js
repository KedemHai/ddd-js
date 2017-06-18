'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var StringLiteral = require('../String/StringLiteral')
var ValueObject = require('../ValueObject')

/**
 *
 * @return {Street}
 */
Street.fromNative = function () {
  var name = StringLiteral.fromNative(arguments[0])
  var number = StringLiteral.fromNative(arguments[1])

  return new this(name, number)
}

/**
 * Street constructor
 * @param {StringLiteral} name
 * @param {StringLiteral} number
 * @constructor
 * @implements {ValueObject}
 */
function Street (name, number) {
  if (!name.isInstanceOf(StringLiteral)) {
    throw new InvalidTypeException(name, StringLiteral)
  }
  if (!number.isInstanceOf(StringLiteral)) {
    throw new InvalidTypeException(number, StringLiteral)
  }

  /**
   *
   * @return {StringLiteral}
   */
  this.name = function () {
    return name
  }
  /**
   *
   * @return {StringLiteral}
   */
  this.number = function () {
    return number
  }
}

/**
 *
 * @param {ValueObject|Street} other
 * @return {boolean}
 */
Street.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  return (
    this.name().hasSameValueAs(other.name()) &&
    this.number().hasSameValueAs(other.number())
  )
}

/**
 *
 * @return {{name: string, number: string}}
 */
Street.prototype.valueOf = function () {
  var self = this

  return {
    name: self.name().valueOf(),
    number: self.number().valueOf()
  }
}

/**
 *
 * @return {string}
 */
Street.prototype.toString = function () {
  return this.name().toString() + ' ' + this.number().toString()
}

Street.Implements(ValueObject)

module.exports = Street
