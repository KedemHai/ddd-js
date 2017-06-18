'use strict'

if (typeof Function.prototype.extends !== 'function') {
  Function.prototype.extends = function (parentClassOrObject) {
    var self = this

    if (parentClassOrObject.constructor === Function) {
      // Normal Inheritance
      this.prototype = Object.create(parentClassOrObject.prototype)
      this.prototype.constructor = this
      this.prototype.parent = parentClassOrObject.prototype

      // inherit static properties
      Object.keys(parentClassOrObject).forEach(function (key) {
        if (self.hasOwnProperty(key)) {
          return
        }
        self[key] = parentClassOrObject[key]
      })

      return this
    }

    // Virtual Inheritance
    this.prototype = parentClassOrObject
    this.prototype.constructor = this
    this.prototype.parent = parentClassOrObject
    return this
  }
}
