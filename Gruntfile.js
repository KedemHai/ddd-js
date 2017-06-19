module.exports = function (grunt) {
  'use strict'

  require('dotenv').config()

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: require('./grunt/tasks/browserify')(grunt),
    clean: require('./grunt/tasks/clean')(grunt),
    connect: require('./grunt/tasks/connect')(grunt),
    eslint: require('./grunt/tasks/eslint')(grunt),
    mocha_phantomjs: require('./grunt/tasks/mocha_phantomjs')(grunt),
    mochaTest: require('./grunt/tasks/mochaTest')(grunt),
    watch: {
      files: ['<%= eslint.target %>'],
      tasks: ['dev']
    }
  })

  require('load-grunt-tasks')(grunt) // load all tasks

  grunt.registerTask('dev', [
    'eslint', 'mochaTest', 'watch'
  ])

  grunt.registerTask('build', [
    'eslint', 'mochaTest', 'clean', 'browserify', 'connect:server', 'mocha_phantomjs'
  ])

  grunt.registerTask('production', [
    'build'
  ])

  grunt.registerTask('test', [
    'karma:build'
  ])

  grunt.registerTask('default', [
    'watch'
  ])
}
