'use strict'

var assert = require('chai').assert
var Year = require('../../../src/main').ValueObject.DateTime.Year

suite('Year', function () {
  suite('.fromNative', function () {
    test('should construct a new Year', function () {
      var fromNative = Year.fromNative(2017)
      assert.isTrue(fromNative instanceof Year)
      assert.equal(fromNative.valueOf(), 2017)
    })
  })

  suite('#hasSameValueAs', function () {
    var year1 = new Year(2017)
    var year2 = new Year(2017)
    var year3 = new Year(2018)

    test('should return true if 2 Year objects have the same value', function () {
      assert.isTrue(year1.hasSameValueAs(year2))
    })

    test('should return false if 2 Year objects have different values', function () {
      assert.isFalse(year1.hasSameValueAs(year3))
    })
  })

  suite('.fromNativeDate', function () {
    var date = new Date(Date.UTC(2017, 0, 1))
    var fromNative = Year.fromNativeDate(date)

    test('should return the the year part of date as Year', function () {
      assert.isTrue(fromNative.hasSameValueAs(new Year(2017)))
    })
  })
})
