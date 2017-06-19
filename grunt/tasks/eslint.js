'use strict'

module.exports = function () {
  return {
    options: {
      configFile: '.eslintrc.json'
    },
    target: [
      './Gruntfile.js',
      './grunt/**/*.js',
      './lib/**/*.js',
      './src/**/*.js',
      './test/**/spec*.js'
    ]
  }
}
