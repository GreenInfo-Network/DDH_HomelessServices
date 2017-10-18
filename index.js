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

// API key for Airtable
// USE A READ-ONLY USER because this could become visible to anyone who views the source
var AIRTABLE_API_KEY = "keymXIGCYEoPy4vib";

// the list of services offered for selection
// this MUST match the domain values in the Airtable
var SERVICES_OFFERED = ["Case Management", "Clothing/Blankets/Sleeping Bags", "Computer Access", "Drop In", "Food", "Health Care", "Housing", "Hygiene", "Legal", "Mail", "Mental Health", "Phone", "Referrals", "Restroom", "Services Offered", "Substance Abuse"];

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
        this.results = [];
        this.search = {
            // search params: date and services
            services: [],
            date: null,
            // metadata: are we busy? have we in fact run?
            busy: false,
            done: false
        };
        this.showmap = false;

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
            // check required
            if (!this.search.services.length) return alert("Select the help you are trying to find.");
            if (!this.search.date) return alert("Select a date.");

            console.log([this.search.date.YMD(), this.today.YMD(), this.tomorrow.YMD()]);

            // compose params
            var params = {
                services: this.search.services.join(","),
                date: this.search.date.toISOString().substr(0, 10)
            };
            console.log(this.search);
            console.log(params);
        }
    }]);

    return PageController;
}();

PageController.$inject = ['$scope', '$http'];

angular.module('app', ['checklist-model', 'ui.bootstrap']).controller('PageController', PageController);

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map