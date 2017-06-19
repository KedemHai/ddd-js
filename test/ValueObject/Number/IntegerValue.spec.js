'use strict'

var assert = require('chai').assert
var BadMethodCallException = require('../../../src/main').Exception.BadMethodCallException
var IntegerValue = require('../../../src/main').ValueObject.Number.IntegerValue
var RealNumber = require('../../../src/main').ValueObject.Number.RealNumber

suite('IntegerValue', function () {
  suite('constructor', function () {
    test('should throw an error if argument is not an integer', function () {
      assert.throws(function () {
        return new IntegerValue(1.5)
      }, BadMethodCallException)
    })
  })

  suite('#valueOf', function () {
    var integer = new IntegerValue(7)

    test('should return a number', function () {
      assert.equal(integer.valueOf(), 7)
    })
  })

  suite('#toString', function () {
    var integer = new IntegerValue(-7)

    test('should return a string form of a number', function () {
      assert.equal(integer.toString(), '-7')
      assert.equal(integer.toString(0), '-7')
      assert.equal(integer.toString(1), '-7.0')
      assert.equal(integer.toString(2), '-7.00')
    })
  })

  suite('#hasSameValueAs', function () {
    var integer1 = new IntegerValue(1)
    var integer2 = new IntegerValue(1)
    var integer3 = new IntegerValue(23)

    test('should return true if 2 IntegerValue objects have the same value', function () {
      assert.isTrue(integer1.hasSameValueAs(integer2))
    })
    test('should return false if 2 IntegerValue objects have different value', function () {
      assert.isFalse(integer1.hasSameValueAs(integer3))
    })
  })

  suite('#toRealNumber', function () {
    var integer = new IntegerValue(14)
    var toReal = integer.toRealNumber()
    var shouldReal = new RealNumber(14)

    test('should return RealNumber with value of IntegerValue', function () {
      assert.isTrue(toReal.hasSameValueAs(shouldReal))
    })
  })
})
