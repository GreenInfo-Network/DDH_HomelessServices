/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.html";

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// this page's HTML template with the [hash] cache-buster
// and the only stylesheet
__webpack_require__(0);
__webpack_require__(1);

//
// begin JavaScript code
// AngularJS with a conjtroller in ES2015 class syntax
// and a pinch of jQuery for date pickers
//

// JS's Date objects are weak: only way to get YYYY-MM-DD string is to use toISOFormat() which fudges the time zone...
Date.prototype.YMD = function () {
    var y = 1900 + this.getYear();
    var m = 1 + this.getMonth();
    var d = this.getDate();
    return y + '-' + (m >= 10 ? m : '0' + m) + '-' + d;
};

// a function for calculating distance between two [lat, lng] tuples
function haversineDistance(latlng1, latlng2) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    var dLat = toRad(latlng2[0] - latlng1[0]);
    var dLon = toRad(latlng2[1] - latlng1[1]);
    var lat1 = toRad(latlng1[0]);
    var lat2 = toRad(latlng2[0]);

    //const R = 6371000; // meters
    var R = 3960; // miles

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// map JS Date weekday (0-6, 0=Sunday) to match our table values (Sun, Wed, Fri, etc)
var WEEKDAYS_LOOKUP = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// API key for Airtable
// USE A READ-ONLY USER because this could become visible to anyone who views the source
var AIRTABLE_API_KEY = "keymXIGCYEoPy4vib";

// the URL of the table
// which includes the account hash and URL-encoded table name
var AIRTABLE_SEARCH_URL = "https://api.airtable.com/v0/appv6KlqHiaOSlrcQ/All%20Services";

// the list of services offered for selection
// this MUST match the domain values in the Airtable
// DANGER! Airtable uses substring matching so one could get false matches,
// e.g. Health and Mental Health would both match "Health", and there would be no way to fetch only Health records (maybe some postprocessing?)
// so just don't do it! use distinct-enough values that substrings won't match
// sorry but that's the degree of Airtable's support for multiple-choice values
var SERVICES_OFFERED = ["Case Management", "Clothing/Blankets/Sleeping Bags", "Computer Access", "Drop In", "Food", "Health Care", "Housing", "Hygiene", "Legal", "Mail", "Mental Health", "Phone", "Referrals", "Restroom", "Substance Abuse"];

// the controller class and then launch

var PageController = function () {
    // match this argument list to the $inject list provided below... or weird things will happen
    function PageController($scope, $http, $window, $timeout) {
        var _this = this;

        _classCallCheck(this, PageController);

        // injections we want to pass into other methods (sigh)
        this.$http = $http;
        this.$scope = $scope;

        // cache some dates used for calendar date picker and date buttons
        // used for a minimum date allowed, as well as "is the selected date tomorrow?"
        this.today = new Date();

        this.tomorrow = new Date();
        this.tomorrow.setDate(this.tomorrow.getDate() + 1);

        // initial search-and-results state
        this.search = {
            // search params: date and services
            services: [],
            date: null,
            // search results and having in fact ever performed a search
            results: [],
            done: false
        };
        // application state stuff
        this.busy = false; // are we busy?
        this.showmap = false; // should we be showing results the map? if not, then the list

        // assign some constants into scope so we can use them to build the UI
        this.services_list = SERVICES_OFFERED;

        // start watching our location: null for unknown, or [ lat, lng ]
        // we use this to update a marker on the map, and to sort the list by what's closest
        this.geolocation = [0, 0];
        navigator.geolocation.watchPosition(function (position) {
            $scope.$evalAsync(function () {
                _this.geolocation = [parseFloat(position.coords.latitude), parseFloat(position.coords.longitude)];
            });
        }, function (error) {
            console.warn('Geolocation: ' + err.message);
        }, {
            enableHighAccuracy: true
        });

        $scope.$watchCollection(function () {
            return _this.geolocation;
        }, this.updateGeolocationResultsList(), true);
        $scope.$watchCollection(function () {
            return _this.geolocation;
        }, this.updateGeolocationMapmarker(), true);

        // start the map
        this.resultsmap = new google.maps.Map(document.getElementById('resultsmap'), {
            center: new google.maps.LatLng(0, 0),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            scrollwheel: false,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT,
                mapTypeIds: [google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.HYBRID]
            }
        });

        google.maps.event.addListenerOnce(this.resultsmap, 'idle', function () {
            this.mapTypes[google.maps.MapTypeId.HYBRID].name = 'Photo'; // hack to rename the layer's name in the control
        });

        this.resultsmap.youarehere = new google.maps.Marker({
            position: { lat: 0, lng: 0 },
            title: "You Are Here",
            icon: '/images/youarehere.gif'
        });

        this.resultsmap.infowindow = new google.maps.InfoWindow();
        this.resultsmap.locations = [];
        $scope.$watch(function () {
            return _this.search.results;
        }, this.redrawLocationMarkers(), true);

        // add map workarounds: they hate being invisible and malfunction strangely
        // tell GMap that its size has changed (even though it has not)
        angular.element($window).on('resize', function () {
            if (!_this.showmap) return;

            $timeout(function () {
                google.maps.event.trigger(_this.resultsmap, 'resize');

                if (_this.geolocation) {
                    _this.resultsmap.setCenter({ lat: _this.geolocation[0], lng: _this.geolocation[1] });
                }
            }, 100);
        });

        $scope.$watch(function () {
            return _this.showmap;
        }, function () {
            if (_this.showmap) {
                angular.element($window).triggerHandler('resize');
            }
        });
    }

    _createClass(PageController, [{
        key: 'openDatePicker',
        value: function openDatePicker() {
            $('#modal_datepicker').modal('show');
        }
    }, {
        key: 'closeDatePicker',
        value: function closeDatePicker() {
            $('#modal_datepicker').modal('hide');
        }
    }, {
        key: 'pickDate',
        value: function pickDate(which) {
            // accepts a named day (today or tomorrow) or "date" to pick one
            switch (which) {
                case 'today':
                    this.search.date = this.today;
                    break;
                case 'tomorrow':
                    this.search.date = this.tomorrow;
                    break;
                case 'date':
                    this.openDatePicker(); // has a change handler which will set search.date
                    break;
                case 'clear':
                    this.search.date = null;
                    break;
            }
        }
    }, {
        key: 'performSearch',
        value: function performSearch() {
            var _this2 = this;

            // check required
            if (!this.search.services.length) return alert("Select the help you are trying to find.");
            if (!this.search.date) return alert("Select a date.");

            // compose the filter formula
            // the syntax is weird, and the documentation is quite poor, but here's a start...
            // https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference
            // super brief overviews of some gotchas:
            // * syntax for a giant and is: AND( clause1, clause2, clause3, ...)
            // * field names with spaces should be wrapped in {}
            // * there is no IN operator for arrays, just substring matching; see the note in SERVICES_OFFERED about overlapping substrings
            var formula = [];

            var weekday = WEEKDAYS_LOOKUP[this.search.date.getDay()];
            formula.push('FIND("' + weekday + '", Day) > 0');

            this.search.services.forEach(function (wanted) {
                formula.push('FIND("' + wanted + '", {Services Offered}) > 0');
            });

            formula = 'AND(' + formula.join(", ") + ')';

            // compose the query and send it off
            var params = {
                filterByFormula: formula
            };

            this.busy = true;
            this.$http({
                method: 'GET',
                url: AIRTABLE_SEARCH_URL,
                params: params,
                headers: {
                    "Authorization": 'Bearer ' + AIRTABLE_API_KEY
                }
            }).then(function (response) {
                _this2.busy = false;
                _this2.search.results = response.data.records.map(function (item) {
                    // extract the fields, then do some data corrections
                    // many of the fields come out as arrays of strings, instead of single values
                    item.fields.Address = item.fields.Address[0];
                    item.fields.AgencyName = item.fields.AgencyName[0];
                    item.fields.LatLng = item.fields.lat && item.fields.lng ? [parseFloat(item.fields.lat[0]), parseFloat(item.fields.lng[0])] : null; // can be empty!

                    // new synthetic field: DistanceMiles from your location; to be filled in afterward, declared here for clarity + documentation
                    item.fields.DistanceMiles = null;

                    return item.fields;
                });

                // add distance decorators and sort by distance from me; note the wrapped nature here
                _this2.updateGeolocationResultsList()();

                // center the map on our own location
                _this2.resultsmap.setCenter({ lat: _this2.geolocation[0], lng: _this2.geolocation[1] });
                _this2.resultsmap.setZoom(14);

                // we have now performed a search; results or no, it's done
                _this2.search.done = true;
            }, function (error) {
                _this2.busy = false;
                alert("Could not connect to the site. Check your connection and try again.");
            });
        }
    }, {
        key: 'updateGeolocationMapmarker',
        value: function updateGeolocationMapmarker() {
            var _this3 = this;

            // wrapped function for use with $watch
            return function () {
                // update the You Are Here map marker and recenter
                if (_this3.resultsmap) {
                    _this3.resultsmap.youarehere.setPosition({ lat: _this3.geolocation[0], lng: _this3.geolocation[1] });
                    _this3.resultsmap.youarehere.setMap(_this3.resultsmap);
                }
            };
        }
    }, {
        key: 'updateGeolocationResultsList',
        value: function updateGeolocationResultsList() {
            var _this4 = this;

            // wrapped function for use with $watch
            return function () {
                // tag each result with its distance from my geolocation
                // then sort the list so closest locations come first
                _this4.search.results.forEach(function (item) {
                    item.DistanceMiles = item.LatLng && _this4.geolocation ? haversineDistance(_this4.geolocation, item.LatLng) : null;
                });

                _this4.search.results.sort(function (p, q) {
                    if (p.DistanceMiles === null) return 1; // no location = send to the end of the list
                    if (q.DistanceMiles === null) return -1; // no location = send to the end of the list
                    return p.DistanceMiles > q.DistanceMiles ? 1 : -1;
                });
            };
        }
    }, {
        key: 'redrawLocationMarkers',
        value: function redrawLocationMarkers() {
            var _this5 = this;

            // wrapped function for use with $watch
            return function () {
                // empty current markers
                _this5.resultsmap.locations.forEach(function (marker) {
                    marker.setMap(null);
                });
                _this5.resultsmap.locations = [];

                // load the new ones
                _this5.search.results.forEach(function (item) {
                    if (!item.LatLng) return; // some lack a location

                    var marker = new google.maps.Marker({
                        position: { lat: item.LatLng[0], lng: item.LatLng[1] },
                        title: item.AgencyName
                    });

                    var html = '<div class="popup">';
                    html += '<h3>' + item.AgencyName + '</h3>';
                    if (item.Address) html += '<div class="address">' + item.Address + '</div>';
                    if (item.Details) html += '<div class="details">' + item.Details + '</div>';
                    html += '</div>';

                    google.maps.event.addListener(marker, 'click', function () {
                        this.map.infowindow.setContent(html);
                        this.map.infowindow.open(this.resultsmap, marker);
                    });

                    _this5.resultsmap.locations.push(marker);
                    marker.setMap(_this5.resultsmap);
                });
            };
        }
    }, {
        key: 'searchBack',
        value: function searchBack() {
            // empty our results and done flag so we go back to the search panel
            // but don't modify their search parameters
            this.search.done = false;
            this.search.results = [];
        }
    }, {
        key: 'zoomMapToLatLng',
        value: function zoomMapToLatLng() {
            alert('not yet');
        }
    }]);

    return PageController;
}();

PageController.$inject = ['$scope', '$http', '$window', '$timeout'];

angular.module('app', ['checklist-model', 'ui.bootstrap']).controller('PageController', PageController);

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map