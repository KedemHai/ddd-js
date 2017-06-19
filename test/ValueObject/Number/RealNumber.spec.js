'use strict'

var assert = require('chai').assert
var IntegerValue = require('../../../src/main').ValueObject.Number.IntegerValue
var InvalidTypeException = require('../../../src/main').Exception.InvalidTypeException
var NaturalNumber = require('../../../src/main').ValueObject.Number.NaturalNumber
var RealNumber = require('../../../src/main').ValueObject.Number.RealNumber
var RoundingMode = require('../../../src/main').ValueObject.Number.RoundingMode

suite('RealNumber', function () {
  suite('constructor', function () {
    test('should throw an error if argument is not a number', function () {
      assert.throws(function () {
        // noinspection JSCheckFunctionSignatures
        return new RealNumber('string')
      }, InvalidTypeException)
    })
  })

  suite('#valueOf', function () {
    var real = new RealNumber(2.40)

    test('should return a number', function () {
      assert.equal(real.valueOf(), 2.40)
      assert.equal(real.valueOf(), 2.4)
    })
  })

  suite('#toString', function () {
    var real = new RealNumber(2.543)

    test('should return a string form of a number with floating point', function () {
      assert.equal(real.toString(), '2.543')
      assert.equal(real.toString(0), '3')
      assert.equal(real.toString(1), '2.5')
      assert.equal(real.toString(2), '2.54')
    })
  })

  suite('#round', function () {
    var real = new RealNumber(2.5)
    var negativeReal = new RealNumber(-2.5)

    test('should return a rounded number to decimal places', function () {
      assert.equal(real.round(), 3)
      assert.equal(real.round(1), 2.5)
      assert.equal(real.round(2), 2.5)
      assert.equal(negativeReal.round(), -2)
      assert.equal(negativeReal.round(1), -2.5)
      assert.equal(negativeReal.round(2), -2.5)
    })
  })

  suite('#hasSameValueAs', function () {
    var real1 = new RealNumber(2.4)
    var real2 = new RealNumber(2.40)
    var real3 = new RealNumber(1.2)
    var real4 = new RealNumber(-1.2)

    test('should return true if 2 RealNumber object have the same value', function () {
      assert.isTrue(real1.hasSameValueAs(real2))
    })

    test('should return false if 2 RealNumber have different value', function () {
      assert.isFalse(real1.hasSameValueAs(real3))
      assert.isFalse(real3.hasSameValueAs(real4))
    })
  })

  suite('.fromNative', function () {
    var fromNative = RealNumber.fromNative(1.5)
    var constructed = new RealNumber(1.5)

    test('should return RealNumber object with same value as from RealNumber constructor', function () {
      assert.isTrue(fromNative.hasSameValueAs(constructed))
    })
  })

  suite('#add', function () {
    var real = new RealNumber(2.5)
    var anotherReal = new RealNumber(4)
    var result = real.add(anotherReal)

    test('should return RealNumber with addition result value', function () {
      assert.isTrue(result.hasSameValueAs(new RealNumber(6.5)))
    })
  })

  suite('#subtract', function () {
    var real = new RealNumber(2.5)
    var anotherReal = new RealNumber(4)
    var result = real.subtract(anotherReal)

    test('should return RealNumber with subtraction result value', function () {
      assert.isTrue(result.hasSameValueAs(new RealNumber(-1.5)))
    })
  })

  suite('#multiplyBy', function () {
    var real = new RealNumber(2.5)
    var anotherReal = new RealNumber(4)
    var result = real.multiplyBy(anotherReal)

    test('should return RealNumber with multiplication result value', function () {
      assert.isTrue(result.hasSameValueAs(new RealNumber(10)))
    })
  })

  suite('#divideBy', function () {
    var real = new RealNumber(2.5)
    var anotherReal = new RealNumber(4)
    var result = real.divideBy(anotherReal)

    test('should return RealNumber with division result value', function () {
      assert.isTrue(result.hasSameValueAs(new RealNumber(0.625)))
    })
  })

  suite('#isLesserThan', function () {
    test('should return true if current is lesser than other', function () {
      var current = new RealNumber(4)
      var other = new RealNumber(10)
      assert.isTrue(current.isLesserThan(other))
    })
    test('should return false if current is greater than other', function () {
      var current = new RealNumber(10)
      var other = new RealNumber(4)
      assert.isFalse(current.isLesserThan(other))
    })
    test('should return false if current is equal to other', function () {
      var current = new RealNumber(4)
      var other = new RealNumber(4)
      assert.isFalse(current.isLesserThan(other))
    })
  })

  suite('#isGreaterThan', function () {
    test('should return true if current is greater than other', function () {
      var current = new RealNumber(10)
      var other = new RealNumber(4)
      assert.isTrue(current.isGreaterThan(other))
    })
    test('should return false if current is lesser than other', function () {
      var current = new RealNumber(4)
      var other = new RealNumber(10)
      assert.isFalse(current.isGreaterThan(other))
    })
    test('should return false if current is equal to other', function () {
      var current = new RealNumber(4)
      var other = new RealNumber(4)
      assert.isFalse(current.isGreaterThan(other))
    })
  })

  suite('#isEqualTo', function () {
    test('should return true if current is equal to other', function () {
      var current = new RealNumber(4)
      var other = new RealNumber(4)
      assert.isTrue(current.isEqualTo(other))
    })
    test('should return false if current is lesser than other', function () {
      var current = new RealNumber(4)
      var other = new RealNumber(10)
      assert.isFalse(current.isEqualTo(other))
    })
    test('should return false if current is greater other', function () {
      var current = new RealNumber(10)
      var other = new RealNumber(4)
      assert.isFalse(current.isEqualTo(other))
    })
  })

  suite('#toIntegerValue', function () {
    var real = new RealNumber(2.5)
    var negativeReal = new RealNumber(-2.5)
    var toIntegerUp = real.toIntegerValue()
    var toIntegerDown = real.toIntegerValue(RoundingMode.FLOOR())
    var toIntegerUpNegative = negativeReal.toIntegerValue()
    var toIntegerDownNegative = negativeReal.toIntegerValue(RoundingMode.FLOOR())

    test('should return the integer part of RealNumber as Integer', function () {
      assert.isTrue(toIntegerUp.hasSameValueAs(new IntegerValue(3)))
      assert.isTrue(toIntegerDown.hasSameValueAs(new IntegerValue(2)))
      assert.isTrue(toIntegerUpNegative.hasSameValueAs(new IntegerValue(-2)))
      assert.isTrue(toIntegerDownNegative.hasSameValueAs(new IntegerValue(-3)))
    })
  })

  suite('#toNaturalNumber', function () {
    var real = new RealNumber(-2.5)
    var toNaturalUp = real.toNaturalNumber()
    var toNaturalDown = real.toNaturalNumber(RoundingMode.FLOOR())

    test('should return the absolute integer part of RealNumber as NaturalNumber', function () {
      assert.isTrue(toNaturalUp.hasSameValueAs(new NaturalNumber(2)))
      assert.isTrue(toNaturalDown.hasSameValueAs(new NaturalNumber(3)))
    })
  })
})
