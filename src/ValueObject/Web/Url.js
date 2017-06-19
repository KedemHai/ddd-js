'use strict'

require('../../../lib/Object.prototype.isInstanceOf')
require('../../../lib/Function.prototype.Implements')
var Host = require('./Host')
var HostFactory = require('./HostFactory')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var Path = require('./Path')
var URI = require('urijs')
var UrlScheme = require('./UrlScheme')
var ValueObject = require('../ValueObject')

/**
 * Construct Url from Native value
 * @return {Url}
 */
Url.fromNative = function () {
  if (arguments[0] === null) {
    throw new TypeError('')
  }
  var _url = new URI(arguments[0])
  if (_url.scheme() === null) {
    _url.scheme('')
  }
  if (_url.host() === null) {
    _url.host('')
  }
  if (_url.path() === null) {
    _url.path('')
  }

  var _scheme = UrlScheme.fromNative(_url.scheme())
  var _host = HostFactory.hostOfType(_url.host())
  var _path = Path.fromNative(_url.path())

  return new this(_scheme, _host, _path)
}

/**
 *
 * @param {UrlScheme} scheme
 * @param {Host} host
 * @param {Path} path
 * @constructor
 * @implements {ValueObject}
 */
function Url (scheme, host, path) {
  if (!(scheme instanceof UrlScheme)) {
    throw new TypeError('')
  }
  if (!(host instanceof Host)) {
    throw new TypeError('')
  }
  if (!(path instanceof Path)) {
    throw new TypeError('')
  }

  /**
   *
   * @return {UrlScheme}
   */
  this.scheme = function () {
    return scheme
  }
  /**
   *
   * @return {Host}
   */
  this.host = function () {
    return host
  }
  /**
   *
   * @return {Path}
   */
  this.path = function () {
    return path
  }
}

/**
 *
 * @param {ValueObject|Url} other
 * @return {boolean}
 */
Url.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  return (
    this.scheme().hasSameValueAs(other.scheme()) &&
    this.host().hasSameValueAs(other.host()) &&
    this.path().hasSameValueAs(other.path())
  )
}

/**
 *
 * @return {{scheme: (string|*), host: (string|*), path: (string|*)}}
 */
Url.prototype.valueOf = function () {
  var self = this

  return {
    scheme: self.scheme().valueOf(),
    host: self.host().valueOf(),
    path: self.path().valueOf()
  }
}

Url.prototype.toString = function () {
  var _url = new URI()
  _url.scheme(this.scheme().toString())
  _url.host(this.host().toString())
  _url.path(this.path().toString())

  return _url.toString()
}

Url.Implements(ValueObject)

module.exports = Url
