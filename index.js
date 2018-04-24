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
// detect someone using this URL without HTTPS and redirect them to the HTTPS site
//

if (window.location.protocol == 'http:' && window.location.hostname != 'localhost') {
    var newurl = window.location.href.replace(/^http:/, 'https:');
    window.location.href = newurl;
}

//
// some polyfills and extensions
//

// JS's Date objects are weak: only way to get YYYY-MM-DD string is to use toISOFormat() which fudges the time zone...
Date.prototype.YMD = function () {
    var y = 1900 + this.getYear();
    var m = 1 + this.getMonth();
    var d = this.getDate();
    return y + '-' + (m >= 10 ? m : '0' + m) + '-' + (d >= 10 ? d : '0' + d);
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

//
// constants
//

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
var SERVICES_OFFERED = ["Case Management", "Child/Young Adult", "Clothing/Blankets/Sleeping Bags", "Computer Access", "Dental", "Drop In", "Food", "Health Care", "Housing", "Hygiene", "Laundry", "Legal", "LGBTQ+", "Mail", "Medical", "Mental Health", "Pets", "Phone", "Referrals", "Restroom", "Shelter", "Shower", "Substance Abuse", "Women"];

// the URL where one may contact to report bugs; we just use a mailto link whichnwork A-OK on mobile
var CONTACT_URL = "mailto:dorothydayhouse@gmail.com?subject=Feedback on eastbay.homeless-connection.org";

//
// AngularJS with a controller in ES2015 class syntax
//

var PageController = function () {
    // match this argument list to the $inject list provided below... or weird things will happen
    function PageController($scope, $http, $window, $timeout) {
        var _this = this;

        _classCallCheck(this, PageController);

        // injections we want to pass into other methods (sigh)
        this.$scope = $scope;
        this.$http = $http;
        this.$timeout = $timeout;
        this.$window = $window;

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
            sortby: 'time', // "time" or "distance"
            done: false
        };
        // application state stuff
        this.busy = false; // are we busy?
        this.showmap = false; // should we be showing results the map? if not, then the list

        // assign some constants into scope so we can use them to build the UI
        this.services_list = SERVICES_OFFERED;
        this.email_contact = CONTACT_URL;

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
            return _this.search.sortby;
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
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            mapTypeControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT,
                mapTypeIds: [google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.HYBRID]
            },
            gestureHandling: "greedy"
        });

        google.maps.event.addListenerOnce(this.resultsmap, 'idle', function () {
            this.mapTypes[google.maps.MapTypeId.HYBRID].name = 'Photo'; // hack to rename the layer's name in the control
        });

        this.resultsmap.youarehere = new google.maps.Marker({
            position: { lat: 0, lng: 0 },
            title: "You Are Here",
            icon: 'images/youarehere.svg'
        });

        this.resultsmap.locations = [];
        $scope.$watch(function () {
            return _this.search.results;
        }, this.redrawLocationMarkers(), true);
        $scope.$watch(function () {
            return _this.resultdetails;
        }, this.redrawLocationMarkers(), true);

        // map custom controls: zoom to my location, zoom to region, Mapbox + OSM credits
        function makeCustomControl(controlDiv, map) {}

        var controlDiv1 = document.getElementById('GeolocationControl');
        var newControl1 = new makeCustomControl(controlDiv1, this.map);
        this.resultsmap.controls[google.maps.ControlPosition.RIGHT_TOP].push(controlDiv1);

        var controlDiv2 = document.getElementById('DetailsControl');
        var newControl2 = new makeCustomControl(controlDiv2, this.map);
        this.resultsmap.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(controlDiv2);

        // add map workarounds: they hate being invisible and malfunction strangely
        // tell GMap that its size has changed (even though it has not)
        angular.element($window).on('resize', function () {
            if (!_this.showmap) return;

            $timeout(function () {
                google.maps.event.trigger(_this.resultsmap, 'resize');
                _this.resultsmap.setCenter(_this.resultsmap.getCenter());
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

            // check required fields
            if (!this.search.services.length) return alert("Select the help you are trying to find.");

            // about to do a search; if we're showing any details for a location, they're no longer useful
            this.resultdetails = null;

            // compose the filter formula
            // the syntax is weird, and the documentation is quite poor, but here's a start...
            // https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference
            // super brief overviews of some gotchas:
            // * syntax for a giant and is: AND( clause1, clause2, clause3, ...)
            // * field names with spaces should be wrapped in {}
            // * there is no IN operator for arrays, just substring matching; see the note in SERVICES_OFFERED about overlapping substrings
            var formula = [];

            this.search.services.forEach(function (wanted) {
                formula.push('FIND("' + wanted + '", {Services Offered}) > 0');
            });

            if (this.search.date) {
                var weekday = WEEKDAYS_LOOKUP[this.search.date.getDay()];
                formula.push('FIND("' + weekday + '", Day) > 0');
            }

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
                // UI is no longer busy; dismiss spinner
                _this2.busy = false;

                // massage the records into shape: fix some array fields, cast some float data seen as lists of strings, etc
                _this2.search.results = response.data.records.map(function (item) {
                    // issue 29: some severely broken records are missing name & address, both of which are required
                    // not only for processing, but to really be meaningful as a useful search result for our users
                    if (!item.fields.Address || !item.fields.AgencyName) return null;

                    // extract the fields, then do some data corrections
                    // many of the fields come out as arrays of strings, instead of single values
                    item.fields.ID = item.fields.ID;
                    item.fields.Address = item.fields.Address[0];
                    item.fields.AgencyName = item.fields.AgencyName[0];
                    item.fields.LatLng = item.fields.lat && item.fields.lng ? [parseFloat(item.fields.lat[0]), parseFloat(item.fields.lng[0])] : null; // can be empty!
                    item.fields.Services = item.fields['Services Offered']; // rename just to be less nuisance
                    item.fields.Facebook = item.fields.facebook ? item.fields.facebook[0] : null;
                    item.fields.Website = item.fields.url ? item.fields.url[0] : null;
                    item.fields.Phone = item.fields.phone ? item.fields.phone[0].trim() : null;

                    // the PhoneNumber is the tel: formatted string: add +1 and keep only numbers
                    item.fields.PhoneNumber = item.fields.Phone ? '+1' + item.fields.Phone.replace(/[^0-9]/g, '') : null;

                    // Website and Facebook lack http:// prefixes so add them
                    if (item.fields.Facebook && item.fields.Facebook.substr(0, 4).toLowerCase() != 'http') item.fields.Facebook = 'https://' + item.fields.Facebook;
                    if (item.fields.Website && item.fields.Website.substr(0, 4).toLowerCase() != 'http') item.fields.Website = 'http://' + item.fields.Website;

                    // new synthetic field: DistanceMiles from your location; to be filled in afterward, declared here for clarity + documentation
                    item.fields.DistanceMiles = null;

                    // new synthetic field: Start and End times, prettier version for rendering
                    item.fields.StartTime = item.fields['Start Hour'] ? (item.fields['Start Hour'] >= '10' ? item.fields['Start Hour'] : item.fields['Start Hour'].substr(1)) + ':' + item.fields['Start Minute'] + ' ' + item.fields['Start AM-PM'] : '';
                    item.fields.EndTime = item.fields['End Hour'] ? (item.fields['End Hour'] >= '10' ? item.fields['End Hour'] : item.fields['End Hour'].substr(1)) + ':' + item.fields['End Minute'] + ' ' + item.fields['End AM-PM'] : '';

                    // new synthetic fields: Start and End time as a JS Date objects usable for sorting and filtering
                    if (item.fields['Start Hour'] && item.fields['Start Minute'] && item.fields['Start AM-PM']) {
                        item.fields.StartTimeObject = new Date();
                        item.fields.StartTimeObject.setSeconds(0);
                        item.fields.StartTimeObject.setMilliseconds(0);
                        item.fields.StartTimeObject.setHours(item.fields['Start AM-PM'] == 'PM' && item.fields['Start Hour'] != '12' ? 12 + parseInt(item.fields['Start Hour']) : parseInt(item.fields['Start Hour']));
                        item.fields.StartTimeObject.setMinutes(parseInt(item.fields['Start Minute']));
                    }
                    if (item.fields['End Hour'] && item.fields['End Minute'] && item.fields['End AM-PM']) {
                        item.fields.EndTimeObject = new Date();
                        item.fields.EndTimeObject.setSeconds(0);
                        item.fields.EndTimeObject.setMilliseconds(0);
                        item.fields.EndTimeObject.setHours(item.fields['End AM-PM'] == 'PM' && item.fields['End Hour'] != '12' ? 12 + parseInt(item.fields['End Hour']) : parseInt(item.fields['End Hour']));
                        item.fields.EndTimeObject.setMinutes(parseInt(item.fields['End Minute']));
                    }

                    // finally, ready for use
                    return item.fields;
                });

                // now filter out NULLs resulting above, due to severely-broken records
                _this2.search.results = _this2.search.results.filter(function (result) {
                    return result;
                });

                // if the search was for Today we can filter out already-finished events
                // do this after the data massaging so we have usable Date objects for comparison
                if (_this2.today == _this2.search.date) {
                    var rightnow = new Date();
                    _this2.search.results = _this2.search.results.filter(function (item) {
                        if (!item.EndTimeObject) return true; // no end time given, so it has not ended (overnight events)
                        return item.EndTimeObject > rightnow;
                    });
                }

                // add distance decorators and sort by distance from me; note the wrapped nature here
                // tip: do not put a watch on this.search.results to call updateGeolocationResultsList() which in fact mutates this list in-place by sorting it
                // in-place mutation is desirable under those watch conditions, where we change the desired sorting and want to modify the list's sequence
                // but here it effectively becomes an infinite loop
                _this2.updateGeolocationResultsList()();

                // center the map on our own location
                _this2.resultsmap.setCenter({ lat: _this2.geolocation[0], lng: _this2.geolocation[1] });
                _this2.resultsmap.setZoom(14);

                // we have now performed a search; results or no, it's done
                // force them over to the listing view and scroll to the top of that listing
                _this2.search.done = true;
                _this2.showmap = false;
                _this2.performScrollTop();
            }, function (error) {
                _this2.busy = false;
                alert("Could not connect to the site. Check your connection and try again.");
            });
        }
    }, {
        key: 'performScrollTop',
        value: function performScrollTop() {
            window.scrollTo(0, 0);
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
                _this4.search.results.forEach(function (item) {
                    item.DistanceMiles = item.LatLng && _this4.geolocation ? haversineDistance(_this4.geolocation, item.LatLng) : null;
                });

                // then sort the list so closest locations come first
                // in event of a tie (same location, listed multiple times for different service-times) sort by starting time
                _this4.search.results.sort(function (p, q) {
                    // sorting depends on their choice
                    switch (_this4.search.sortby) {
                        case 'distance':
                            if (p.DistanceMiles === null) return 1; // no location = send to the end of the list
                            if (q.DistanceMiles === null) return -1; // no location = send to the end of the list
                            if (p.DistanceMiles != q.DistanceMiles) {
                                return p.DistanceMiles > q.DistanceMiles ? 1 : -1;
                            }

                            // if we got here, then neither has a location/distance; break the tie with their Name
                            return p.AgencyName > q.AgencyName ? 1 : -1;
                        case 'time':
                            // both items may have start time, end time, neither, both; we want to sort for what opens first and also what ends first,
                            // and also we want to keep the list stable so two items with same start/end won't flip-flop
                            // so there's a tree of possible outcomes: earlier/later/no start, earlier/later/no end, tie-breaking by name, ...
                            // note that the code here is intended for readability and debugging, not compactness ;)

                            // logic is greatly simplified if we don't have to worry about nulls, so fudge some dates
                            // a blank starter means that it started a looong time ago; blank end means it ends a loooong time in the future
                            var pstarter = p.StartTimeObject ? p.StartTimeObject.getTime() : new Date(1900, 1, 1).getTime();
                            var pender = p.EndTimeObject ? p.EndTimeObject.getTime() : new Date(2100, 12, 31).getTime();
                            var qstarter = q.StartTimeObject ? q.StartTimeObject.getTime() : new Date(1900, 1, 1).getTime();
                            var qender = q.EndTimeObject ? q.EndTimeObject.getTime() : new Date(2100, 12, 31).getTime();

                            if (pstarter != qstarter) return pstarter > qstarter ? 1 : -1; // different starting times, earlier goes to the front
                            else if (pender != qender) return pender > qender ? 1 : -1; // different ending times; earlier ending goes to the front
                            return p.AgencyName > q.AgencyName ? 1 : -1; // same start + end times, sort by name so the output is stable
                        default:
                            throw 'updateGeolocationResultsList: unknown sorting: ' + _this4.search.sortby;
                    }
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

                // will we be giving a marker an alternative icon, highlighting it?
                var highlight_id = _this5.resultdetails ? _this5.resultdetails.ID : null;

                // load the new ones
                _this5.search.results.forEach(function (item) {
                    if (!item.LatLng) return; // some lack a location

                    var icon = highlight_id == item.ID ? 'images/location-selected.svg' : 'images/location.svg';
                    var zindex = highlight_id == item.ID ? 1000 : 0;

                    var marker = new google.maps.Marker({
                        icon: icon,
                        zIndex: zindex,
                        position: { lat: item.LatLng[0], lng: item.LatLng[1] },
                        title: item.AgencyName,
                        map: _this5.resultsmap,
                        details: item // the raw attribute details
                    });

                    _this5.resultsmap.locations.push(marker);

                    google.maps.event.addListener(marker, 'click', function () {
                        _this5.$scope.$evalAsync(function () {
                            _this5.resultdetails = marker.details;
                        });
                    });
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
        key: 'zoomMapToGeolocation',
        value: function zoomMapToGeolocation() {
            if (!this.geolocation) return alert("Still searching for location.");
            this.zoomMapToLatLng(this.geolocation);
        }
    }, {
        key: 'zoomMapToLatLng',
        value: function zoomMapToLatLng(latlng, switchtomap) {
            var _this6 = this;

            var doit = function doit() {
                _this6.resultsmap.setCenter({ lat: latlng[0], lng: latlng[1] });
                _this6.resultsmap.setZoom(16);
            };

            if (switchtomap && !this.showmap) {
                this.showmap = true;
                this.$timeout(doit, 500);
            } else {
                doit();
            }
        }
    }, {
        key: 'makeDirectionsLink',
        value: function makeDirectionsLink(stringwords, latlng) {
            // try to use Apple Maps if we detect iOS; everyone else gets Google which will either open navigation, or be a good desktop site anyway
            var url = 'https://maps.google.com/?daddr=loc:' + latlng[0] + ',' + latlng[1];
            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                url = 'https://maps.apple.com/?daddr=loc:' + latlng[0] + ',' + latlng[1];
            }
            return '<a target="_blank" href="' + url + '">' + stringwords + '</a>';
        }

        // why we can't have simple things like ng-model on a checkbox: they want this totally outre method of removing single terms in multiple different UIs
        // remove the given service from our search list, and optionally perform a new search

    }, {
        key: 'removeSearchService',
        value: function removeSearchService(servicename) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { thensearch: true, exitifnoselections: true };

            this.search.services = this.search.services.filter(function (thisterm) {
                return thisterm != servicename;
            });

            if (options.exitifnoselections && !this.search.services.length) {
                this.searchBack();
                return;
            }

            if (options.thensearch) {
                this.performSearch();
            }
        }
    }]);

    return PageController;
}();

PageController.$inject = ['$scope', '$http', '$window', '$timeout'];

angular.module('app', ['checklist-model', 'ui.bootstrap', 'ngSanitize']).controller('PageController', PageController);

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map