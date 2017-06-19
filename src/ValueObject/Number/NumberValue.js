'use strict'

/* eslint no-unused-vars: ["error", { "args": "none" }] */

/**
 * NumberValue interface
 * @interface
 */
function NumberValue () {
  throw new Error('Cannot instantiate interface NumberValue')
}

/**
 * Returns NumberValue for the result of an addition
 * @param {NumberValue} other
 * @returns {NumberValue}
 */
NumberValue.prototype.add = function (other) {
  throw new Error('Must implement method NumberValue::add')
}

/**
 * Returns NumberValue for the result of a subtraction
 * @param {NumberValue} other
 * @return {NumberValue}
 */
NumberValue.prototype.subtract = function (other) {
  throw new Error('Must implement method NumberValue::subtract')
}

/**
 * Returns NumberValue for the result of a multiplication
 * @param {NumberValue} other
 * @returns {NumberValue}
 */
NumberValue.prototype.multiplyBy = function (other) {
  throw new Error('Must implement method NumberValue::multiplyBy')
}

/**
 * Returns NumberValue for the result of a division
 * @param {NumberValue} other
 * @returns {NumberValue}
 */
NumberValue.prototype.divideBy = function (other) {
  throw new Error('Must implement method NumberValue::divideBy')
}

/**
 * Checks if NumberValue is greater than other
 * @param {NumberValue} other
 * @returns {boolean}
 */
NumberValue.prototype.isLesserThan = function (other) {
  throw new Error('Must implement method NumberValue::isLesserThan')
}

/**
 * Checks if NumberValue is greater than other
 * @param {NumberValue} other
 * @returns {boolean}
 */
NumberValue.prototype.isGreaterThan = function (other) {
  throw new Error('Must implement method NumberValue::isGreaterThan')
}

/**
 * Checks if NumberValue is equal to other
 * @param {NumberValue} other
 * @returns {boolean}
 */
NumberValue.prototype.isEqualTo = function (other) {
  throw new Error('Must implement method NumberValue::isEqualTo')
}

/**
 *
 * @return {*}
 */
NumberValue.prototype.valueOf = function () {
  throw new Error('Must implement method NumberValue::valueOf')
}

/**
 *
 * @return {string}
 */
NumberValue.prototype.toString = function () {
  throw new Error('Must implement method NumberValue::toString')
}

module.exports = NumberValue
