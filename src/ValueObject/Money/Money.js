'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var Currency = require('./Currency')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var IntegerValue = require('../Number/IntegerValue')
var ValueObject = require('../ValueObject')

/**
 * construct Money from native values
 * @return {Money}
 */
Money.fromNative = function () {
  var amount = new IntegerValue(arguments[0])
  var currency = Currency.fromNative(arguments[1])

  return new this(amount, currency)
}

/**
 * Money constructor
 * @param {IntegerValue} amount
 * @param {Currency} currency
 * @constructor
 * @implements {ValueObject}
 */
function Money (amount, currency) {
  if (!amount.isInstanceOf(IntegerValue)) {
    throw new InvalidTypeException(amount, IntegerValue)
  }
  if (!currency.isInstanceOf(Currency)) {
    throw new InvalidTypeException(currency, Currency)
  }

  /**
   * @return {IntegerValue}
   */
  this.amount = function () {
    return amount
  }
  /**
   * @return {Currency}
   */
  this.currency = function () {
    return currency
  }
}

/**
 * Checks if 2 Money objects have the same value
 *
 * @param {ValueObject|Money} other
 * @inheritDoc
 */
Money.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  if (!(other instanceof this.constructor)) {
    return false
  }

  return this.amount().hasSameValueAs(other.amount()) && this.currency().hasSameValueAs(other.currency())
}

Money.prototype.toString = function () {
  return this.amount().toString()
}

Money.prototype.valueOf = function () {
  return this.amount().valueOf()
}

/**
 *
 * @param {Money} other
 * @returns {Money}
 */
Money.prototype.add = function (other) {
  if (!other.isInstanceOf(Money)) {
    throw new InvalidTypeException(other, Money)
  }

  var newAmount = this.amount().add(other.amount())
  return new this.constructor(newAmount)
}

/**
 *
 * @param {Money} other
 * @returns {Money}
 */
Money.prototype.subtract = function (other) {
  if (!other.isInstanceOf(Money)) {
    throw new InvalidTypeException(other, Money)
  }

  var newAmount = this.amount().subtract(other.amount())
  return new this.constructor(newAmount)
}

/**
 *
 * @param {IntegerValue} number
 * @returns {Money}
 */
Money.prototype.multiplyBy = function (number) {
  if (!number.isInstanceOf(IntegerValue)) {
    throw InvalidTypeException(number, IntegerValue)
  }

  var newAmount = this.amount().multiplyBy(number)
  return new this.constructor(newAmount, this.code())
}

/**
 *
 * @param {Array.<number>} ratios
 * @return {Array.<Money>}
 */
Money.prototype.allocate = function (ratios) {
  if (!ratios.isInstanceOf(Array)) {
    throw new InvalidTypeException(ratios, Array)
  }

  /**
   * @type {number}
   */
  var remainder = this.amount().valueOf()
  /**
   * @type {Array.<number>}
   */
  var results = ratios.map(
    function () {
      return 0
    }
  )
  /**
   * @type {number}
   */
  var total = ratios.reduce(
    function (p1, p2) {
      return p1 + p2
    }, 0
  )

  for (var ratio = 0, len = ratios.length; ratio < len; ratio++) {
    var share = Math.floor(this.amount().valueOf() * ratios[ratio] / total)
    results[ratio] += share
    remainder -= share
  }

  var i = 0
  while (remainder > 0) {
    var rem = Math.round(this.amount().valueOf() * ratios[i] / total) - results[i]
    results[i] += rem
    remainder -= rem
    i++
  }

  var self = this

  return results.map(
    function (p1) {
      return new Money(new IntegerValue(p1), self.currency())
    }
  )
}

Money.Implements(ValueObject)

module.exports = Money
