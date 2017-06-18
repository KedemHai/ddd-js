'use strict'

require('../../../../lib/Function.prototype.extends')
var Util = require('../../../Util/Util')

/**
 * InvalidTimeZoneException constructor
 * @param {string} name
 * @constructor
 * @extends {Error}
 */
function InvalidTimeZoneException (name) {
  this.message = Util.formatStr('The Timezone {0} is invalid', name)
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor)
  } else {
    var err = new Error()
    this.stack = err.stack
  }
}

InvalidTimeZoneException.extends(Error)
InvalidTimeZoneException.prototype.name = 'InvalidTimeZoneException'

module.exports = InvalidTimeZoneException
