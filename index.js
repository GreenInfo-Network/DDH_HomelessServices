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
    function PageController($scope, $http) {
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
            var _this = this;

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
                _this.busy = false;
                _this.search.results = response.data.records.map(function (item) {
                    return item.fields;
                });
                _this.search.done = true;
            }, function (error) {
                _this.busy = false;
                alert("Could not connect to the site. Check your connection and try again.");
            });
        }
    }, {
        key: 'searchBack',
        value: function searchBack() {
            // empty our results and done flag so we go back to the search panel
            // but don't modify their search parameters
            this.search.done = false;
            this.search.results = [];
        }
    }]);

    return PageController;
}();

PageController.$inject = ['$scope', '$http'];

angular.module('app', ['checklist-model', 'ui.bootstrap']).controller('PageController', PageController);

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map