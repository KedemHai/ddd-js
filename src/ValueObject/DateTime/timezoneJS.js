'use strict'

var timezoneJS = require('timezone-js')
var tzdata = require('tzdata')

var _tz = timezoneJS.timezone
_tz.loadingScheme = _tz.loadingSchemes.MANUAL_LOAD
_tz.loadZoneDataFromObject(tzdata)

module.exports = timezoneJS
