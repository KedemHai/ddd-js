'use strict'

module.exports = function () {
  return {
    test: {
      options: {
        ui: 'tdd',
        reporter: 'spec'
      },
      src: [
        'test/**/*.spec.js'
      ]
    }
  }
}
