'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var Country = require('./Country')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var Street = require('./Street')
var StringLiteral = require('../String/StringLiteral')
var ValueObject = require('../ValueObject')

Address.fromNative = function () {

}
/**
 * Address constructor
 * @param {StringLiteral} name
 * @param {Street} street
 * @param {StringLiteral} city
 * @param {Country} country
 * @constructor
 * @implements {ValueObject}
 */
function Address (name, street, city, country) {
  if (!name.isInstanceOf(StringLiteral)) {
    throw new InvalidTypeException(name, StringLiteral)
  }
  if (!street.isInstanceOf(Street)) {
    throw new InvalidTypeException(street, Street)
  }
  if (!city.isInstanceOf(StringLiteral)) {
    throw new InvalidTypeException(city, StringLiteral)
  }
  if (!country.isInstanceOf(Country)) {
    throw new InvalidTypeException(country, Country)
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
   * @return {Street}
   */
  this.street = function () {
    return street
  }
  /**
   *
   * @return {StringLiteral}
   */
  this.city = function () {
    return city
  }
  /**
   *
   * @return {Country}
   */
  this.country = function () {
    return country
  }
}

/**
 * @inheritDoc
 * @param {Address} other
 */
Address.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  return (
    this.name().hasSameValueAs(other.name()) &&
    this.street().hasSameValueAs(other.street()) &&
    this.city().hasSameValueAs(other.city()) &&
    this.country().hasSameValueAs(other.country())
  )
}

/**
 *
 * @return {{name: string, street: {name: string, number: string}, city: string, country: {code: *, name: string}}}
 */
Address.prototype.valueOf = function () {
  var self = this

  return {
    name: self.name().valueOf(),
    street: self.street().valueOf(),
    city: self.city().valueOf(),
    country: self.country().valueOf()
  }
}

/**
 *
 * @return {string}
 */
Address.prototype.toString = function () {
  throw new Error('Not implemented yet')
  // TODO: implement address string format
}

Address.Implements(ValueObject)

module.exports = Address
