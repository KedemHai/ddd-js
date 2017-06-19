'use strict'

// var alias = require('browserify-alias-grunt');

module.exports = function () {
  return {
    standalone: {
      options: {
        browserifyOptions: {
          standalone: '<%= pkg.name %>'
        },
        transform: ['deamdify', 'deglobalify']
      },
      src: ['<%= pkg.main %>'],
      // src:['./src/**/*.js','!./src/**/index.js','!./src/main.js'],
      dest: './dist/<%= pkg.name %>.standalone.js'
    },
    require: {
      options: {
        alias: ['<%= pkg.main %>:<%= pkg.main %>']
      },
      src: ['<%= pkg.main %>'],
      dest: './dist/<%= pkg.name %>.require.js'
    },
    tests: {
      options: {
        external: ['<%= pkg.main %>'],
        // Embed source map for tests
        debug: true
      },
      src: ['./test/**/*.spec.js'],
      dest: './dist/test/browserified_tests.js'
    }
  }
}
