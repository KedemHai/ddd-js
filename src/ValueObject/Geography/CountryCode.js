'use strict'

require('../../../lib/Function.prototype.extends')
require('../../../lib/Function.prototype.Implements')
var Enum = require('../Enum/Enum')
var ValueObject = require('../ValueObject')

/**
 * @method
 * @name CountryCode.fromNative
 * @param {...[]} arguments
 * @return {CountryCode}
 */

/**
 * @method
 * @name CountryCode.get
 * @param {CountryCode.constants} value
 * @return {Enum|CountryCode}
 */

/**
 * @method
 * @name CountryCode.getByName
 * @param {string} name
 * @return {Enum|CountryCode}
 */

/**
 *
 * @enum {string}
 */
CountryCode.constants = {
  US: 'US',
  GB: 'GB'
}
Object.freeze(CountryCode.constants)

/**
 * CountryCode constructor
 * @param {CountryCode.constants} value
 * @constructor
 * @extends {Enum}
 * @implements {ValueObject}
 */
function CountryCode (value) {
  Enum.call(this, value)
}

CountryCode.extends(Enum)

CountryCode.Implements(ValueObject)

module.exports = CountryCode
