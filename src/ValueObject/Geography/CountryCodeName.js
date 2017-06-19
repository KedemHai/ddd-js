'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var CountryCode = require('./CountryCode')
var StringLiteral = require('../String/StringLiteral')

// TODO: private
var _names = {
  US: 'United States',
  GB: 'United Kingdom'
}

var CountryCodeName = {
  /**
   *
   * @param {CountryCode} code
   * @return {StringLiteral}
   */
  getName: function (code) {
    if (!code.isInstanceOf(CountryCode)) {
      throw new InvalidTypeException(code, CountryCode)
    }

    var _value = code.valueOf()
    if (!_names.hasOwnProperty(_value)) {
      throw new Error('value not found')
    }

    return new StringLiteral(_names[_value])
  }
}

module.exports = CountryCodeName
