'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var CountryCode = require('./CountryCode')
var CountryCodeName = require('./CountryCodeName')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var ValueObject = require('../ValueObject')

Country.fromNative = function () {
  return new this(CountryCode.fromNative(arguments[0]))
}

/**
 * Country constructor
 * @param {CountryCode} code
 * @constructor
 * @implements {ValueObject}
 */
function Country (code) {
  if (!code.isInstanceOf(CountryCode)) {
    throw InvalidTypeException(code, CountryCode)
  }

  /**
   *
   * @return {CountryCode}
   */
  this.code = function () {
    return code
  }
}

/**
 *
 * @return {StringLiteral}
 */
Country.prototype.name = function () {
  return CountryCodeName.getName(this.code())
}

/**
 *
 * @param {ValueObject|Country} other
 * @return {boolean}
 */
Country.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  if (!(other instanceof this.constructor)) {
    return false
  }

  return this.code().hasSameValueAs(other.code())
}

/**
 *
 * @return {{code: *, name: string}}
 */
Country.prototype.valueOf = function () {
  var self = this

  return {
    code: self.code().valueOf(),
    name: self.name().valueOf()
  }
}

/**
 *
 * @return {string}
 */
Country.prototype.toString = function () {
  return this.name().toString()
}

Country.Implements(ValueObject)

module.exports = Country
