'use strict'

/**
 * Constructs ValueObject from native JS values
 * @param {...[]} arguments
 * @return {ValueObject}
 */
ValueObject.fromNative = function () {
  throw new Error('Must implement method ValueObject::fromNative')
}

/**
 * ValueObject interface
 * @interface
 */
function ValueObject () {
  throw new Error('Cannot instantiate interface ValueObject')
}

/**
 *
 * @param {ValueObject} other
 * @return {boolean}
 */
ValueObject.prototype.hasSameValueAs = function (other) {
  throw new Error('Must implement method ValueObject::hasSameValueAs')
}

/**
 *
 * @return {Object}
 */
ValueObject.prototype.valueOf = function () {
  throw new Error('Must implement method ValueObject::valueOf')
}

/**
 *
 * @return {string}
 */
ValueObject.prototype.toString = function () {
  throw new Error('Must implement method ValueObject::toString')
}

module.exports = ValueObject
