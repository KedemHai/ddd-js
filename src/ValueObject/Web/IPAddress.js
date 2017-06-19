'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Function.prototype.Implements')
var BadMethodCallException = require('../../Exception/BadMethodCallException')
var Host = require('./Host')
var Util = require('../../Util/Util')
var ValueObject = require('../ValueObject')

/**
 *
 * @param {string} value
 * @constructor
 * @extends {Host}
 * @implements {ValueObject}
 */
function IPAddress (value) {
  if (!Util.validateIPAddress(value)) {
    throw new BadMethodCallException('Not a valid IP Address')
  }

  Host.call(this, value)
}

IPAddress.extends(Host)

IPAddress.Implements(ValueObject)

module.exports = IPAddress
