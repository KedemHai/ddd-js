'use strict'

var assert = require('chai').assert
var Collection = require('../../../src/main').ValueObject.Structure.Collection
var IntegerValue = require('../../../src/main').ValueObject.Number.IntegerValue
var InvalidTypeException = require('../../../src/main').Exception.InvalidTypeException
var NaturalNumber = require('../../../src/main').ValueObject.Number.NaturalNumber
var StringLiteral = require('../../../src/main').ValueObject.String.StringLiteral

suite('Collection', function () {
  var setupCollection = new Collection([
    new StringLiteral('one'),
    new StringLiteral('two'),
    new Collection([
      new IntegerValue(1),
      new IntegerValue(2)
    ])
  ])

  suite('constructor', function () {
    test('should throw if argument is not Array', function () {
      assert.throws(function () {
        return new Collection('1, 2, 3')
      }, InvalidTypeException)
    })

    test('should throw if array item is not ValueObject', function () {
      assert.throws(function () {
        return new Collection([1, 2, 3])
      }, InvalidTypeException)
    })
  })

  suite('#hasSameValueAs', function () {
    var array
    array = [
      new StringLiteral('one'),
      new StringLiteral('two'),
      new Collection([
        new IntegerValue(1),
        new IntegerValue(2)
      ])
    ]
    var collection1 = new Collection(array)
    array = [
      new StringLiteral('one'),
      new StringLiteral('two'),
      new IntegerValue(4)
    ]
    var collection2 = new Collection(array)

    test('should return true if 2 Collection objects have the same value', function () {
      assert.isTrue(setupCollection.hasSameValueAs(collection1))
      assert.isTrue(collection1.hasSameValueAs(setupCollection))
    })
    test('should return false if 2 Collection Object have different value', function () {
      assert.isFalse(collection2.hasSameValueAs(setupCollection))
      assert.isFalse(setupCollection.hasSameValueAs(collection2))
    })
  })

  suite('.fromNative', function () {
    test('should construct Collection from native JS value', function () {
      var array

      array = [
        'one',
        'two',
        [1, 2]
      ]
      var fromNativeCollection = Collection.fromNative(array)

      array = [
        new StringLiteral('one'),
        new StringLiteral('two'),
        new Collection([
          new StringLiteral('1'),
          new StringLiteral('2')
        ])
      ]
      var constructedCollection = new Collection(array)

      assert.isTrue(fromNativeCollection.hasSameValueAs(constructedCollection))
    })
  })

  suite('#count', function () {
    test('should return the count of items as NaturalNumber', function () {
      var collection = new Collection([
        new StringLiteral('one'),
        new StringLiteral('two'),
        new Collection([
          new StringLiteral('1'),
          new StringLiteral('2')
        ])
      ])

      var three = new NaturalNumber(3)
      assert.isTrue(collection.count().hasSameValueAs(three))
    })
  })
})
