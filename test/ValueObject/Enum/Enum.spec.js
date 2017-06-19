'use strict'

var assert = require('chai').assert
var sinon = require('sinon')
var InaccessibleException = require('../../../src/main').Exception.InaccessibleException
var Enum = require('../../../src/main').ValueObject.Enum.Enum

suite('Enum', function () {
  suite('constructor', function () {
    test('should have private constructor', function () {
      assert.throws(function () {
        return new Enum('value')
      }, InaccessibleException)
    })

    test('should be abstract', function () {
      assert.throws(function () {
        // stub Enum constants
        sinon.stub(Enum, 'getConstants').callsFake(function () {
          return {
            TEST: 'test'
          }
        })

        return Enum.get('test')
      }, 'Cannot instantiate abstract class Enum')
    })
  })
})
