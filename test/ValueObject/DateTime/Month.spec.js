'use strict'

var assert = require('chai').assert
var InaccessibleException = require('../../../src/main').Exception.InaccessibleException
var Month = require('../../../src/main').ValueObject.DateTime.Month

suite('Month', function () {
  suite('constructor', function () {
    test('should have a private constructor', function () {
      assert.throws(function () {
        return new Month(Month.constants.NOVEMBER)
      }, InaccessibleException)
    })
  })

  suite('.fromNativeDate', function () {
    var date = new Date(Date.UTC(2017, 1, 1, 0, 0, 0, 0))

    test('should return the month part of date as Month', function () {
      assert.isTrue(Month.fromNativeDate(date).hasSameValueAs(Month.FEBRUARY()))
    })
  })
})
