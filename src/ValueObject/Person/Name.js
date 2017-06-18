'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var StringLiteral = require('../String/StringLiteral')
var ValueObject = require('../ValueObject')

/**
 * Construct Name from native js values
 * @returns {Name}
 */
Name.fromNative = function () {
  if (typeof arguments[1] === 'undefined') {
    arguments[1] = ''
  }
  if (typeof arguments[2] === 'undefined') {
    arguments[2] = ''
  }
  var _firstName = StringLiteral.fromNative(arguments[0])
  var _middleName = StringLiteral.fromNative(arguments[1])
  var _lastName = StringLiteral.fromNative(arguments[2])

  return new this(_firstName, _middleName, _lastName)
}

/**
 * Name Constructor
 *
 * @param {StringLiteral} firstName
 * @param {StringLiteral} middleName
 * @param {StringLiteral} lastName
 * @constructor
 * @implements {ValueObject}
 */
function Name (firstName, middleName, lastName) {
  if (!firstName.isInstanceOf(StringLiteral)) {
    throw new InvalidTypeException(firstName, StringLiteral)
  }
  if (!middleName.isInstanceOf(StringLiteral)) {
    throw new InvalidTypeException(middleName, StringLiteral)
  }
  if (!lastName.isInstanceOf(StringLiteral)) {
    throw new InvalidTypeException(lastName, StringLiteral)
  }

  /**
   *
   * @return {StringLiteral}
   */
  this.firstName = function () {
    return firstName
  }
  /**
   *
   * @return {StringLiteral}
   */
  this.middleName = function () {
    return middleName
  }
  /**
   *
   * @return {StringLiteral}
   */
  this.lastName = function () {
    return lastName
  }
}

/**
 *
 * @return {{firstName: string, middleName: string, lastName: string}}
 */
Name.prototype.valueOf = function () {
  var self = this
  return {
    firstName: self.firstName().valueOf(),
    middleName: self.middleName().valueOf(),
    lastName: self.lastName().valueOf()
  }
}

/**
 * Checks if 2 Name objects have thw same value
 * @inheritDoc
 * @param {ValueObject|Name} other
 */
Name.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  if (!(other instanceof this.constructor)) {
    return false
  }

  return (this.firstName().hasSameValueAs(other.firstName()) &&
    this.middleName().hasSameValueAs(other.middleName()) &&
    this.lastName().hasSameValueAs(other.lastName())) || this.fullName().hasSameValueAs(other.fullName())
}

/**
 *
 * @return {StringLiteral}
 */
Name.prototype.fullName = function () {
  var _strFirstName = this.firstName().toString()
  var _strMiddleName = ((this.middleName().length() > 0) ? ' ' : '') + this.middleName().toString()
  var _strLastName = ((this.lastName().length() > 0) ? ' ' : '') + this.lastName().toString()

  return new StringLiteral(_strFirstName + _strMiddleName + _strLastName)
}

/**
 * @inheritDoc
 */
Name.prototype.toString = function () {
  return this.fullName().toString()
}

Name.Implements(ValueObject)

module.exports = Name
