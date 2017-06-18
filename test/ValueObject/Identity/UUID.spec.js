'use strict'

var assert = require('chai').assert
var BadMethodCallException = require('../../../src/main').Exception.BadMethodCallException
var UUID = require('../../../src/main').ValueObject.Identity.UUID

suite('UUID', function () {
  /**
   * @type {RegExp}
   */
  var regExpUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

  suite('constructor', function () {
    test('invalid arguments', function () {
      assert.throw(function () {
        return new UUID('invalid-uuid')
      }, BadMethodCallException)
    })
  })

  suite('#valueOf', function () {
    test('generate UUID string', function () {
      var uuid = new UUID()
      assert.match(uuid.valueOf(), regExpUUID)
    })
  })
})
