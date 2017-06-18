'use strict'

require('../../../lib/Function.prototype.Implements')
var NumberValue = require('./NumberValue')
var ValueObject = require('../ValueObject')

ComplexNumber.fromNative = function () {

}
/**
 * TODO: implement ComplexNumber
 *
 * @param {RealNumber} real
 * @param {RealNumber} imaginary
 * @constructor
 * @implements {NumberValue}
 * @implements {ValueObject}
 */
function ComplexNumber (real, imaginary) {
  throw new Error('Not implemented yet')
}
ComplexNumber.prototype.toString = function () {
}
ComplexNumber.prototype.subtract = function (other) {
}
ComplexNumber.prototype.isEqualTo = function (other) {
}
ComplexNumber.prototype.isLesserThan = function (other) {
}
ComplexNumber.prototype.multiplyBy = function (other) {
}
ComplexNumber.prototype.valueOf = function () {
}
ComplexNumber.prototype.add = function (other) {
}
ComplexNumber.prototype.divideBy = function (other) {
}
ComplexNumber.prototype.hasSameValueAs = function (other) {
}
ComplexNumber.prototype.isGreaterThan = function (other) {
}

ComplexNumber.Implements(NumberValue, ValueObject)

module.exports = ComplexNumber
