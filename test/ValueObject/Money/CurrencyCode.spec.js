'use strict'

var assert = require('chai').assert
var CurrencyCode = require('../../../src/main').ValueObject.Money.CurrencyCode

suite('CurrencyCode', function () {
  suite('.fromNative', function () {
    test('should return a new CurrencyCode', function () {
      var fromNative = CurrencyCode.fromNative('USD')

      assert.equal(fromNative.valueOf(), 'USD')
    })
  })
})
