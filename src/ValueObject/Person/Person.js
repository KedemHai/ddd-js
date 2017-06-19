'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var Name = require('./Name')
var ValueObject = require('../ValueObject')

Person.fromNative = function () {

}
/**
 * Person constructor
 *
 * @param {Name} name
 * @constructor
 * @implements {ValueObject}
 */
function Person (name) {
  if (!name.isInstanceOf(Name)) {
    throw new InvalidTypeException(name, Name)
  }
  /**
   *
   * @return {Name}
   */
  this.name = function () {
    return name
  }
}

/**
 * @inheritDoc
 * @param {ValueObject|Person} other
 */
Person.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  return this.name().hasSameValueAs(other.name())
}

/**
 *
 * @return {{name: {firstName: string, middleName: string, lastName: string}}}
 */
Person.prototype.valueOf = function () {
  var self = this

  return {
    name: self.name().valueOf()
  }
}

/**
 * @inheritDoc
 */
Person.prototype.toString = function () {
  return this.name().toString()
}

Person.Implements(ValueObject)

module.exports = Person

module.exports = Person
