'use strict'

var assert = require('chai').assert
var BadMethodCallException = require('../../../src/main').Exception.BadMethodCallException
var NaturalNumber = require('../../../src/main').ValueObject.Number.NaturalNumber

suite('NaturalNumber', function () {
  suite('constructor', function () {
    test('should throw an error if argument is not a natural number', function () {
      assert.throws(function () {
        return new NaturalNumber(-1)
      }, BadMethodCallException)
    })
  })

  suite('#valueOf', function () {
    var natural = new NaturalNumber(1)

    test('should return a number with value of NaturalNumber', function () {
      assert.equal(natural.valueOf(), 1)
    })
  })

  suite('#toString', function () {
    var natural = new NaturalNumber(7)

    test('should return a string form of a number', function () {
      assert.equal(natural.toString(), '7')
      assert.equal(natural.toString(0), '7')
      assert.equal(natural.toString(1), '7.0')
      assert.equal(natural.toString(2), '7.00')
    })
  })

  suite('#hasSameValueAs', function () {
    var natural1 = new NaturalNumber(1)
    var natural2 = new NaturalNumber(1)
    var natural3 = new NaturalNumber(23)

    test('should return true if 2 NaturalNumber objects have the same value', function () {
      assert.isTrue(natural1.hasSameValueAs(natural2))
    })
    test('should return false if 2 NaturalNumber objects have different value', function () {
      assert.isFalse(natural1.hasSameValueAs(natural3))
    })
  })
})
