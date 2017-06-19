'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var NaturalNumber = require('../Number/NaturalNumber')
var StringLiteral = require('../String/StringLiteral')
var ValueObject = require('../ValueObject')

/**
 * Constructs Collection from native JS Array
 * @param {Array} array
 * @return {Collection}
 */
Collection.fromNativeArray = function (array) {
  if (!array.isInstanceOf(Array)) {
    throw new InvalidTypeException(array, Array)
  }

  var items = []

  for (var i = 0; i < array.length; i++) {
    if (array[i].constructor === Array) {
      items.push(this.fromNativeArray(array[i]))
    } else {
      items.push(new StringLiteral(array[i]))
    }
  }

  return new this(items)
}

/**
 * Constructs Collection from native JS values
 * @return {Collection}
 */
Collection.fromNative = function () {
  return this.fromNativeArray(arguments[0])
}

/**
 * Collection constructor
 * @param {Array.<ValueObject>} items
 * @constructor
 * @implements {ValueObject}
 */
function Collection (items) {
  if (!items.isInstanceOf(Array)) {
    throw new InvalidTypeException(items, Array)
  }

  for (var i = 0; i < items.length; i++) {
    if (!items[i].isInstanceOf(ValueObject)) {
      throw new InvalidTypeException(items[i], ValueObject)
    }
  }

  /**
   *
   * @return {Array.<ValueObject>}
   */
  this.items = function () {
    return items
  }
}

/**
 *
 * @param {ValueObject|Collection} other
 * @returns {boolean}
 */
Collection.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  if (!(other instanceof this.constructor)) {
    return false
  }

  if (!this.count().hasSameValueAs(other.count())) {
    return false
  }

  var _selfItems = this.items()
  var _otherItems = other.items()
  for (var i = 0; i < _selfItems.length; i++) {
    if (typeof _otherItems[i] === 'undefined') {
      return false
    }
    if (!_selfItems[i].hasSameValueAs(_otherItems[i])) {
      return false
    }
  }

  return true
}

/**
 *
 * @return {Array}
 */
Collection.prototype.valueOf = function () {
  return this.toNativeArray()
}

Collection.prototype.toString = function () {
  return this.toNativeArray().map(
    function (p1) {
      return p1.toString()
    }
  )
}

/**
 * Returns the first item
 * @return {ValueObject}
 */
Collection.prototype.first = function () {
  return this.items()[0]
}

/**
 * Returns the last item
 * @return {ValueObject}
 */
Collection.prototype.last = function () {
  var _items = this.items()
  return _items[(_items.length - 1)]
}

/**
 * Returns an item of index
 * @param {number} index
 * @return {ValueObject|null}
 */
Collection.prototype.index = function (index) {
  var _found = this.items()[index]
  return (typeof _found === 'undefined') ? null : _found
}

/**
 *
 * @return {NaturalNumber}
 */
Collection.prototype.count = function () {
  return new NaturalNumber(this.items().length)
}

/**
 * Returns a native JS Array representation of the Collection
 * @return {Array}
 */
Collection.prototype.toNativeArray = function () {
  return this.items().map(
    function (p1) {
      return p1.valueOf()
    }
  )
}

Collection.Implements(ValueObject)

module.exports = Collection
