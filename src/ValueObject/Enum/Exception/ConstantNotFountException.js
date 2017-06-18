'use strict'

require('../../../../lib/Function.prototype.extends')
var BadMethodCallException = require('../../../Exception/BadMethodCallException')
var Util = require('../../../Util/Util')

/**
 * ConstantNotFountException constructor
 * @param {string} value
 * @constructor
 */
function ConstantNotFountException (value) {
  var message = Util.formatStr('Cannot find constant {0}', value)
  BadMethodCallException.call(this, message)
}

ConstantNotFountException.extends(BadMethodCallException)
ConstantNotFountException.prototype.name = 'ConstantNotFountException'

module.exports = ConstantNotFountException
