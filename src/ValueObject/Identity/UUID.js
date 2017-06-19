'use strict'

var BadMethodCallException = require('../../Exception/BadMethodCallException')
var BaseUuid = require('uuid')
var StringLiteral = require('../String/StringLiteral')
var Util = require('../../Util/Util')
var ValueObject = require('../ValueObject')

/**
 * UUID constructor
 * @param {?string} [value=null]
 * @constructor
 * @extends {StringLiteral}
 * @implements {ValueObject}
 */
function UUID (value) {
  if (typeof value === 'undefined') {
    value = null
  }

  var uuidString = BaseUuid.v4()

  if (value !== null) {
    if (!Util.validateUUID(value)) {
      throw new BadMethodCallException('Not a valid UUID')
    }

    uuidString = value
  }

  StringLiteral.call(this, uuidString)
}

UUID.extends(StringLiteral)

UUID.Implements(ValueObject)

module.exports = UUID
