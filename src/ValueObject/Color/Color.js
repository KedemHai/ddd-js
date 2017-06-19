'use strict'

require('../../../lib/Function.prototype.Implements')
require('../../../lib/Object.prototype.isInstanceOf')
var BadMethodCallException = require('../../Exception/BadMethodCallException')
var IntegerValue = require('../Number/IntegerValue')
var InvalidTypeException = require('../../Exception/InvalidTypeException')
var RGBValue = require('./RGBValue')
var ValueObject = require('../ValueObject')

/**
 * Constructs Color from native value
 * @return {Color}
 */
Color.fromNative = function () {
  if (arguments.length !== 3) {
    throw new BadMethodCallException('You must provide exactly 3 arguments: 1) red, 2) green, 3) blue.')
  }

  var _red = RGBValue.fromNative(arguments[0])
  var _green = RGBValue.fromNative(arguments[1])
  var _blue = RGBValue.fromNative(arguments[2])

  return new this(_red, _green, _blue)
}

/**
 *
 * @return {Color}
 */
Color.fromHex = function () {
  var hex = arguments[0]
  // remove irrelevant chars form hex string i.e. '#'
  hex = hex.replace(/[^0-9A-F]/gi, '')

  var bigint = parseInt(hex, 16)
  var r = (bigint >> 16) & 255
  var g = (bigint >> 8) & 255
  var b = bigint & 255

  return this.fromNative(r, g, b)
}

/**
 * Color constructor
 * @param {RGBValue} red
 * @param {RGBValue} green
 * @param {RGBValue} blue
 * @constructor
 * @implements {ValueObject}
 */
function Color (red, green, blue) {
  if (!red.isInstanceOf(RGBValue)) {
    throw new InvalidTypeException(red, RGBValue)
  }
  if (!green.isInstanceOf(RGBValue)) {
    throw new InvalidTypeException(green, RGBValue)
  }
  if (!blue.isInstanceOf(RGBValue)) {
    throw new InvalidTypeException(blue, RGBValue)
  }

  /**
   *
   * @return {RGBValue}
   */
  this.red = function () {
    return red
  }
  /**
   *
   * @return {RGBValue}
   */
  this.green = function () {
    return green
  }
  /**
   *
   * @return {RGBValue}
   */
  this.blue = function () {
    return blue
  }
}

/**
 *
 * @param {ValueObject|Color} other
 * @return {boolean}
 */
Color.prototype.hasSameValueAs = function (other) {
  if (!other.isInstanceOf(ValueObject)) {
    throw new InvalidTypeException(other, ValueObject)
  }

  return (
    this.red().hasSameValueAs(other.red()) &&
    this.green().hasSameValueAs(other.green()) &&
    this.blue().hasSameValueAs(other.blue())
  )
}

/**
 *
 * @return {{red: (*|number), green: (*|number), blue: (*|number)}}
 */
Color.prototype.valueOf = function () {
  var self = this

  return {
    red: self.red().valueOf(),
    green: self.green().valueOf(),
    blue: self.blue().valueOf()
  }
}

Color.prototype.toString = function () {
  return this.toHex()
}

/**
 * Sets the red RGBValue for Color
 * @param {RGBValue} red
 * @return {Color}
 */
Color.prototype.setRed = function (red) {
  if (!red.isInstanceOf(RGBValue)) {
    throw new InvalidTypeException(red, RGBValue)
  }

  return new this.constructor(red, this.green(), this.blue())
}

/**
 * Sets the green RGBValue for Color
 * @param {RGBValue} green
 * @return {Color}
 */
Color.prototype.setGreen = function (green) {
  if (!green.isInstanceOf(RGBValue)) {
    throw new InvalidTypeException(green, RGBValue)
  }

  return new this.constructor(this.red(), green, this.blue())
}

/**
 * Sets the blue RGBValue for Color
 * @param {RGBValue} blue
 * @return {Color}
 */
Color.prototype.setBlue = function (blue) {
  if (!blue.isInstanceOf(RGBValue)) {
    throw new InvalidTypeException(blue, RGBValue)
  }

  return new this.constructor(this.red(), this.green(), blue)
}

/**
 * Increases or decreases the red RGBValue for Color
 * @param {IntegerValue} value
 * @return {Color}
 */
Color.prototype.addRed = function (value) {
  if (!value.isInstanceOf(IntegerValue)) {
    throw new InvalidTypeException(value, IntegerValue)
  }

  return new this.constructor(this.red().add(value), this.green(), this.blue())
}

/**
 * Increases or decreases the green RGBValue for Color
 * @param {IntegerValue} value
 * @return {Color}
 */
Color.prototype.addGreen = function (value) {
  if (!value.isInstanceOf(IntegerValue)) {
    throw new InvalidTypeException(value, IntegerValue)
  }

  return new this.constructor(this.red(), this.green().add(value), this.blue())
}

/**
 * Increases or decreases the blue RGBValue for Color
 * @param {IntegerValue} value
 * @return {Color}
 */
Color.prototype.addBlue = function (value) {
  if (!value.isInstanceOf(IntegerValue)) {
    throw new InvalidTypeException(value, IntegerValue)
  }

  return new this.constructor(this.red(), this.green(), this.blue().add(value))
}

/**
 * Returns the hex form of Color
 * @return {string}
 */
Color.prototype.toHex = function () {
  /**
   * @type {number}
   */
  var numeric = (1 << 24) + (this.red().valueOf() << 16) + (this.green().valueOf() << 8) + this.blue().valueOf()
  return '#' + numeric.toString(16).slice(1)
}

Color.Implements(ValueObject)

module.exports = Color
