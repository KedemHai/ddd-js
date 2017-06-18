'use strict'

var Util = require('../src/Util/Util')

if (typeof Function.MethodNotImplemented !== 'function') {
  /**
   * Function.MethodNotImplemented constructor
   * @param {string} implementing
   * @param {string} implemented
   * @param {string} pseudoInterface
   * @constructor
   * @extends {Error}
   */
  Function.MethodNotImplemented = function (implementing, implemented, pseudoInterface) {
    this.message = Util.formatStr('{0} does not implement function: {1} as contracted in interface: {2}', implementing, implemented, pseudoInterface)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    } else {
      var err = new Error()
      this.stack = err.stack
    }
  }

  Function.MethodNotImplemented.prototype = Object.create(Error.prototype)
  Function.MethodNotImplemented.prototype.constructor = Function.MethodNotImplemented
  Function.MethodNotImplemented.prototype.name = 'MethodNotImplemented'
}
