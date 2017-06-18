'use strict'

var Hostname = require('./Hostname')
var IPAddress = require('./IPAddress')
var Util = require('../../Util/Util')

var HostFactory = {
  /**
   *
   * @param {string} value
   * @return {Host}
   */
  hostOfType: function (value) {
    if (Util.validateIPAddress(value)) {
      return new IPAddress(value)
    }

    return new Hostname(value)
  }
}

module.exports = HostFactory
