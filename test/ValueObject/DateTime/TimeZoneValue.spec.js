'use strict'

var assert = require('chai').assert
var InvalidTimeZoneException = require('../../../src/main').ValueObject.DateTime.Exception.InvalidTimeZoneException
var TimeZoneValue = require('../../../src/main').ValueObject.DateTime.TimeZoneValue

suite('TimeZoneValue', function () {
  suite('constructor', function () {
    test('should throw InvalidTimeZoneException about invalid name', function () {
      assert.throws(function () {
        return new TimeZoneValue('Invalid/Timezone')
      }, InvalidTimeZoneException)
    })
  })

  suite('#offset', function () {
    test('should return number', function () {
      var tz = new TimeZoneValue('Asia/Jerusalem')
      assert.equal(tz.offset(), 180)
    })
  })

  suite('.zero', function () {
    test('should return a zero', function () {
      var zero = TimeZoneValue.zero()
      assert.equal(zero.offset(), 0)
    })
  })

  suite('#toString', function () {
    test('should return a string that represents offset', function () {
      var tz = new TimeZoneValue('Asia/Jerusalem')
      assert.equal(tz.toString(), '+0300')
    })
  })
})
