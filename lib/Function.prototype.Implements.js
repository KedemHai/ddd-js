'use strict'

require('./Function.MethodNotImplemented')

if (typeof Function.prototype._Implements !== 'function') {
  Function.prototype._Implements = function () {
    var _interfaces = arguments[0]
    for (var i = 0; i < _interfaces.length; i++) {
      var pseudoInterface = _interfaces[i]
      if (typeof pseudoInterface !== 'function') {
        throw new Error('The parameter supplied is not a Function')
      }

      for (var prop in pseudoInterface.prototype) {
        if (pseudoInterface.prototype.hasOwnProperty(prop) && (typeof pseudoInterface.prototype[prop] === 'function')) {
          if (typeof this.prototype[prop] !== 'function') {
            throw new Function.MethodNotImplemented(this.name, prop, pseudoInterface.name)
          }
        }
      }

      var self = this
      Object.keys(pseudoInterface).forEach(function (key) {
        if (pseudoInterface.hasOwnProperty(key) && (typeof pseudoInterface[key] === 'function')) {
          if (typeof self[key] !== 'function') {
            throw new Function.MethodNotImplemented(self.name, key, pseudoInterface.name)
          }
        }
      })
    }
  }
}

if (typeof Function.prototype.Implements !== 'function') {
  Function.prototype.Implements = function () {
    try {
      this._Implements(arguments)
    } catch (e) {
      throw e
    }
  }
}
