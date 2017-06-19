'use strict'

require('./Function.prototype.Implements')

// check interface type
if (typeof Object.prototype.isInstanceOf !== 'function') {
  Object.defineProperty(Object.prototype, 'isInstanceOf', {
    /**
     * @param {constructor} classOrInterface
     * @return {boolean}
     */
    value: function (classOrInterface) {
      if (this instanceof classOrInterface) {
        return true
      }

      try {
        this.constructor.Implements(classOrInterface)
        return true
      } catch (e) {
        return false
      }
    }
  })
}
