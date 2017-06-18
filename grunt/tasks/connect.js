'use strict'

module.exports = function () {
  return {
    // Used for mocha-phantomjs tests
    server: {},

    // you can use this manually by doing
    // grunt connect:keepalive
    // to start a server for the example pages (browser/example/*.html) or to
    // run the tests manually in a browser
    keepalive: {
      options: {
        keepalive: true
      }
    }
  }
}
