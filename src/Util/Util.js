'use strict'

var _ = require('lodash/core')
var URI = require('urijs')

var Util = {}

/**
 * @return {string}
 */
Util.formatStr = function () {
  var str = Array.prototype.shift.call(arguments).toString()

  if (arguments.length > 0) {
    var t = typeof arguments[0]
    var key
    var args = (t === 'string' || t === 'number')
      ? Array.prototype.slice.call(arguments)
      : arguments[0]

    for (key in args) {
      if (args.hasOwnProperty(key)) {
        str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), args[key])
      }
    }
  }

  return str
}

/**
 *
 * @param {string} variable
 * @param {RegExp} test
 * @return {boolean}
 */
Util.validateVar = function (variable, test) {
  return test.test(variable)
}

/**
 *
 * @param {string} ipAddress
 * @return {boolean}
 */
Util.validateIPAddress = function (ipAddress) {
  var _test = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
  return this.validateVar(ipAddress, _test)
}

Util.validateUUID = function (uuid) {
  var _test = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  return this.validateVar(uuid, _test)
}

/**
 *
 * @readonly
 * @enum {string}
 */
Util.URLCOMPONENT = {
  PROTOCOL: 'PROTOCOL'
}

/**
 *
 * @param {string} url
 * @param {string} [component]
 * @return {URI|string}
 */
Util.parseUrl = function (url, component) {
  var _uri = new URI(url)
  if (undefined === component ||
    undefined === _.findKey(Util.URLCOMPONENT, function (obj) {
      return obj === component
    })
  ) {
    return _uri
  }

  if (component === Util.URLCOMPONENT.PROTOCOL) {
    return _uri.protocol()
  }
}

module.exports = Util
