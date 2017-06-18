'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Function.prototype.Implements')
var Host = require('./Host')
var ValueObject = require('../ValueObject')
/**
 *
 * @param {string} value
 * @constructor
 * @extends {Host}
 * @implements {ValueObject}
 *
 * TODO: validate host name
 */
function Hostname (value) {
  Host.call(this, value)
}

Hostname.extends(Host)

Hostname.Implements(ValueObject)

module.exports = Hostname
