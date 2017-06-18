'use strict'

var assert = require('chai').assert
var Year = require('../../../src/main').ValueObject.DateTime.Year
var Month = require('../../../src/main').ValueObject.DateTime.Month
var MonthDay = require('../../../src/main').ValueObject.DateTime.MonthDay
var Hour = require('../../../src/main').ValueObject.DateTime.Hour
var Minute = require('../../../src/main').ValueObject.DateTime.Minute
var Second = require('../../../src/main').ValueObject.DateTime.Second
var Millisecond = require('../../../src/main').ValueObject.DateTime.Millisecond
var DateValue = require('../../../src/main').ValueObject.DateTime.DateValue
var TimeValue = require('../../../src/main').ValueObject.DateTime.TimeValue
var DateTime = require('../../../src/main').ValueObject.DateTime.DateTime
var TimeZoneValue = require('../../../src/main').ValueObject.DateTime.TimeZoneValue
var DateTimeWithTimeZone = require('../../../src/main').ValueObject.DateTime.DateTimeWithTimeZone

suite('DateTimeWithTimeZone', function () {
  suite('.fromNative', function () {
    test('should construct new DateTimeWithTimeZone from native values', function () {
      var fromNative = DateTimeWithTimeZone.fromNative(2017, 0, 1, 0, 0, 0, 0)

      assert.isTrue(fromNative instanceof DateTimeWithTimeZone)
      assert.equal(fromNative.dateTime().date().year().valueOf(), 2017)
      assert.equal(fromNative.dateTime().date().month().valueOf(), Month.constants.JANUARY)
      assert.equal(fromNative.dateTime().date().day().valueOf(), 1)
      assert.equal(fromNative.dateTime().time().hour().valueOf(), 0)
      assert.equal(fromNative.dateTime().time().minute().valueOf(), 0)
      assert.equal(fromNative.dateTime().time().minute().valueOf(), 0)
      assert.equal(fromNative.dateTime().time().second().valueOf(), 0)
      assert.equal(fromNative.dateTime().time().millisecond().valueOf(), 0)
      assert.equal(fromNative.timezone().valueOf(), 'UTC')

      var fromNative2 = DateTimeWithTimeZone.fromNative(2017, 0, 1, 0, 0, 0, 0, 'Asia/Jerusalem')
      assert.equal(fromNative2.timezone().valueOf(), 'Asia/Jerusalem')
    })
  })

  suite('.fromNativeDate', function () {
    test('should construct new DateTimeWithTimeZone from native JS Date', function () {
      var nativeDate = new Date(2017, 0, 1, 0, 0, 0, 0)
      var dateTimeWithTimeZone = DateTimeWithTimeZone.fromNativeDate(nativeDate)

      assert.isTrue(dateTimeWithTimeZone instanceof DateTimeWithTimeZone)
      assert.equal(dateTimeWithTimeZone.timezone().name(), 'UTC')
      assert.equal(dateTimeWithTimeZone.dateTime().date().day().valueOf(), 31)
    })
  })

  suite('#toNativeDate', function () {
    // create a dateTime representing '2016-12-31T17:00:00.0000-0700' && 2017-01-01T00:00:00.000Z
    var year = new Year(2016)
    var month = Month.DECEMBER()
    var day = new MonthDay(31)
    var hour = new Hour(17)
    var minute = new Minute(0)
    var second = new Second(0)
    var millisecond = new Millisecond(0)

    var dateValue = new DateValue(year, month, day)
    var time = new TimeValue(hour, minute, second, millisecond)
    var dateTime = new DateTime(dateValue, time)
    // TODO: mock timezone
    var timezone = new TimeZoneValue('America/Los_Angeles')
    var dateTimeWithTimeZone = new DateTimeWithTimeZone(dateTime, timezone)

    var date = dateTimeWithTimeZone.toNativeDate()

    test('should return a native JS Date', function () {
      assert.isTrue(date instanceof Date)
      assert.equal(date.getUTCFullYear(), 2017)
      assert.equal(date.getUTCMonth(), 0)
      assert.equal(date.getUTCDate(), 1)
      assert.equal(date.getUTCHours(), 0)
      assert.equal(date.getUTCMinutes(), 0)
      assert.equal(date.getUTCSeconds(), 0)
      assert.equal(date.getUTCMilliseconds(), 0)
      assert.equal(date.toISOString(), '2017-01-01T00:00:00.000Z')
    })
  })

  suite('.fromNativeDate', function () {
    test('should return date with zero timezone as DateTimeWithTimeZone', function () {
      var date = new Date(Date.UTC(2017, 0, 1, 0, 0, 0, 0))
      var fromNativeDate = DateTimeWithTimeZone.fromNativeDate(date)

      assert.equal(fromNativeDate.timezone().offset().valueOf(), 0)
      assert.equal(fromNativeDate.toNativeDate().getTime(), date.getTime())
    })
  })

  suite('#hasSameDateTimeAs', function () {
    var dateTimeWithTimeZone1 = DateTimeWithTimeZone.fromNativeDate(new Date(Date.UTC(2017, 0, 1, 0, 0, 0, 0)))
    var dateTimeWithTimeZone2 = DateTimeWithTimeZone.fromNativeDate(new Date(Date.UTC(2017, 0, 1, 0, 0, 0, 0)))
    var dateTimeWithTimeZone3 = DateTimeWithTimeZone.fromNativeDate(new Date(Date.UTC(2017, 1, 1, 0, 0, 0, 0)))

    test('should return true if 2 objects represent the same time', function () {
      assert.isTrue(dateTimeWithTimeZone1.hasSameDateTimeAs(dateTimeWithTimeZone2))
    })

    test('should return false if 2 objects represent different times', function () {
      assert.isFalse(dateTimeWithTimeZone1.hasSameDateTimeAs(dateTimeWithTimeZone3))
    })
  })

  suite('#toTimeZone', function () {
    test('should return the same date and time on different timezone', function () {
      var date = new Date(Date.UTC(2017, 5, 22, 0, 0, 0, 0))
      var fromNativeDate = DateTimeWithTimeZone.fromNativeDate(date)
      var newTimeZone = new TimeZoneValue('America/Los_Angeles')

      assert.equal(fromNativeDate.toTimeZone(newTimeZone).dateTime().date().day().valueOf(), 21)
      assert.equal(fromNativeDate.toTimeZone(newTimeZone).dateTime().time().hour().valueOf(), 20)
    })
  })
})
