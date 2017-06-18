'use strict'

var assert = require('chai').assert
var IntegerValue = require('../../../src/main').ValueObject.Number.IntegerValue
var InvalidRangeException = require('../../../src/main').Exception.InvalidRangeException
var InvalidTypeException = require('../../../src/main').Exception.InvalidTypeException
var RGBValue = require('../../../src/main').ValueObject.Color.RGBValue

suite('RGBValue', function () {
  suite('constructor', function () {
    test('should throw an error if argument is not a number', function () {
      assert.throws(function () {
        // noinspection JSCheckFunctionSignatures
        return new RGBValue('string')
      }, InvalidTypeException)
    })

    test('should throw an error if argument is out of 0-255 range', function () {
      assert.throws(function () {
        return new RGBValue(256)
      }, InvalidRangeException)
      assert.throws(function () {
        return new RGBValue(-1)
      }, InvalidRangeException)
    })
  })

  suite('#valueOf', function () {
    var rgb = new RGBValue(1)

    test('should return a number for RGBValue', function () {
      assert.equal(rgb.valueOf(), 1)
    })
  })

  suite('#toString', function () {
    var rgb = new RGBValue(1)

    test('should return a string form of RGBValue number', function () {
      assert.equal(rgb.toString(), '1')
    })
  })

  suite('#hasSameValueAs', function () {
    var rgb1 = new RGBValue(20)
    var rgb2 = new RGBValue(20)
    var rgb3 = new RGBValue(100)

    test('should return true if 2 RGBValue objects have the same value', function () {
      assert.isTrue(rgb1.hasSameValueAs(rgb2))
    })

    test('should return false if 2 RGBValue objects have different value', function () {
      assert.isFalse(rgb1.hasSameValueAs(rgb3))
    })
  })

  suite('.fromNative', function () {
    var fromNative = RGBValue.fromNative(255)
    var constructed = new RGBValue(255)

    test('should return an Instance of RGBValue with same value as from constructor', function () {
      assert.isTrue(fromNative.hasSameValueAs(constructed))
    })
  })

  suite('#add', function () {
    var rgb = new RGBValue(100)
    var rgbAdd = rgb.add(new IntegerValue(155))
    var rgbSubtract = rgb.add(new IntegerValue(-100))
    var shouldRGBAdd = new RGBValue(255)
    var shouldRGBSubtract = new RGBValue(0)

    test('should return RGBValue with additional value', function () {
      assert.isTrue(rgbAdd.hasSameValueAs(shouldRGBAdd))
      assert.isTrue(rgbSubtract.hasSameValueAs(shouldRGBSubtract))
    })

    test('should keep the new value within 0-255 range', function () {
      var rgb = new RGBValue(100)
      var rgbOutOfRange1 = rgb.add(new IntegerValue(156))
      var rgbOutOfRange2 = rgb.add(new IntegerValue(-101))

      assert.isTrue(rgbOutOfRange1.hasSameValueAs(new RGBValue(255)))
      assert.isTrue(rgbOutOfRange2.hasSameValueAs(new RGBValue(0)))
    })
  })
})
