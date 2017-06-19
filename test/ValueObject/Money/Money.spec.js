'use strict'

var assert = require('chai').assert
var Money = require('../../../src/main').ValueObject.Money.Money
var IntegerValue = require('../../../src/main').ValueObject.Number.IntegerValue
var Currency = require('../../../src/main').ValueObject.Money.Currency
var CurrencyCode = require('../../../src/main').ValueObject.Money.CurrencyCode

suite('Money', function () {
  suite('#allocate', function () {
    test('should allocate money by ratio', function () {
      var money = new Money(new IntegerValue(5), new Currency(CurrencyCode.USD()))
      var ratios = [70, 30]
      var allocate = money.allocate(ratios)

      assert.equal(allocate[0].amount().valueOf(), 4)
      assert.equal(allocate[1].amount().valueOf(), 1)
    })
  })
})
