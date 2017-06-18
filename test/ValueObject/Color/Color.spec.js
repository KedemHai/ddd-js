'use strict'

var assert = require('chai').assert
var Color = require('../../../src/main').ValueObject.Color.Color
var IntegerValue = require('../../../src/main').ValueObject.Number.IntegerValue
var RGBValue = require('../../../src/main').ValueObject.Color.RGBValue

suite('Color', function () {
  suite('#hasSameValueAs', function () {
    var color1 = new Color(new RGBValue(0), new RGBValue(0), new RGBValue(0))
    var color2 = new Color(new RGBValue(0), new RGBValue(0), new RGBValue(0))
    var color3 = new Color(new RGBValue(0), new RGBValue(0), new RGBValue(1))

    test('should return true if 2 Color objects have same value', function () {
      assert.isTrue(color1.hasSameValueAs(color2))
    })
    test('should return false if 2 Color objects have different value', function () {
      assert.isFalse(color1.hasSameValueAs(color3))
    })
  })

  suite('.fromNative', function () {
    var fromNative = Color.fromNative(255, 0, 0)
    var constructed = new Color(new RGBValue(255), new RGBValue(0), new RGBValue(0))

    test('should return Color with same value as Color from constructor', function () {
      assert.isTrue(fromNative.hasSameValueAs(constructed))
    })
  })

  suite('#fromHex', function () {
    var fromHex = Color.fromHex('#ffffff')
    var constructed = new Color(new RGBValue(255), new RGBValue(255), new RGBValue(255))

    test('should return Color with same value as Color constructor', function () {
      assert.isTrue(fromHex.hasSameValueAs(constructed))
    })
  })

  suite('#valueOf', function () {
    var color = new Color(new RGBValue(255), new RGBValue(0), new RGBValue(0))

    test('should return an Object literal for Color', function () {
      assert.deepEqual(color.valueOf(), {
        red: 255,
        green: 0,
        blue: 0
      })
    })
  })

  suite('#toString', function () {
    var color = new Color(new RGBValue(255), new RGBValue(0), new RGBValue(0))

    test('should return the same result as Color#toHex', function () {
      assert.deepEqual(color.toHex(), color.toString())
    })
  })

  suite('#toHex', function () {
    var color1 = new Color(new RGBValue(0), new RGBValue(0), new RGBValue(0))
    var color2 = new Color(new RGBValue(255), new RGBValue(255), new RGBValue(255))

    test('should return the hex string form for Color', function () {
      assert.equal(color1.toHex(), '#000000')
      assert.equal(color2.toHex(), '#ffffff')
    })
  })

  suite('#setRed', function () {
    var color = new Color(new RGBValue(0), new RGBValue(0), new RGBValue(0))
    var colorWithRed = color.setRed(new RGBValue(128))
    var shouldColor = new Color(new RGBValue(128), new RGBValue(0), new RGBValue(0))

    test('should return Color with new red value', function () {
      assert.isTrue(colorWithRed.hasSameValueAs(shouldColor))
    })
  })

  suite('#setGreen', function () {
    var color = new Color(new RGBValue(0), new RGBValue(0), new RGBValue(0))
    var colorWithGreen = color.setGreen(new RGBValue(128))
    var shouldColor = new Color(new RGBValue(0), new RGBValue(128), new RGBValue(0))

    test('should return Color with new green value', function () {
      assert.isTrue(colorWithGreen.hasSameValueAs(shouldColor))
    })
  })

  suite('#setBlue', function () {
    var color = new Color(new RGBValue(0), new RGBValue(0), new RGBValue(0))
    var colorWithBlue = color.setBlue(new RGBValue(128))
    var shouldColor = new Color(new RGBValue(0), new RGBValue(0), new RGBValue(128))

    test('should return Color with new blue value', function () {
      assert.isTrue(colorWithBlue.hasSameValueAs(shouldColor))
    })
  })

  suite('#addRed', function () {
    var color = new Color(new RGBValue(1), new RGBValue(0), new RGBValue(0))
    var colorAddRed = color.addRed(new IntegerValue(254))
    var colorSubtractRed = color.addRed(new IntegerValue(-1))
    var shouldAddColor = new Color(new RGBValue(255), new RGBValue(0), new RGBValue(0))
    var shouldSubtractColor = new Color(new RGBValue(0), new RGBValue(0), new RGBValue(0))

    test('should return Color with new red value', function () {
      assert.isTrue(colorAddRed.hasSameValueAs(shouldAddColor))
      assert.isTrue(colorSubtractRed.hasSameValueAs(shouldSubtractColor))
    })
  })

  suite('#addGreen', function () {
    var color = new Color(new RGBValue(0), new RGBValue(1), new RGBValue(0))
    var colorAddGreen = color.addGreen(new IntegerValue(254))
    var colorSubtractGreen = color.addGreen(new IntegerValue(-1))
    var shouldAddColor = new Color(new RGBValue(0), new RGBValue(255), new RGBValue(0))
    var shouldSubtractColor = new Color(new RGBValue(0), new RGBValue(0), new RGBValue(0))

    test('should return Color with new green value', function () {
      assert.isTrue(colorAddGreen.hasSameValueAs(shouldAddColor))
      assert.isTrue(colorSubtractGreen.hasSameValueAs(shouldSubtractColor))
    })
  })

  suite('#addBlue', function () {
    var color = new Color(new RGBValue(0), new RGBValue(0), new RGBValue(1))
    var colorAddBlue = color.addBlue(new IntegerValue(254))
    var colorSubtractBlue = color.addBlue(new IntegerValue(-1))
    var shouldAddColor = new Color(new RGBValue(0), new RGBValue(0), new RGBValue(255))
    var shouldSubtractColor = new Color(new RGBValue(0), new RGBValue(0), new RGBValue(0))

    test('should return Color with new blue value', function () {
      assert.isTrue(colorAddBlue.hasSameValueAs(shouldAddColor))
      assert.isTrue(colorSubtractBlue.hasSameValueAs(shouldSubtractColor))
    })
  })
})
