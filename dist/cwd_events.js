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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _localist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localist */ "./js/localist.js");
 // Expose localist to Drupal.

window.CWD_LocalList = _localist__WEBPACK_IMPORTED_MODULE_0__["default"];

/***/ }),

/***/ "./js/buildEvent.js":
/*!**************************!*\
  !*** ./js/buildEvent.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BuildEvent; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* helper function */
var convertTime = function convertTime(time) {
  var timeHour = time.split(':')[0];
  var timeMin = time.split(':')[1];

  if (parseInt(timeHour, 10) >= 12) {
    if (parseInt(timeHour, 10) > 12) {
      timeHour = parseInt(timeHour, 10) - 12;
    }

    return "".concat(timeHour, ":").concat(timeMin, " p.m.");
  }

  return "".concat(parseInt(timeHour, 10), ":").concat(timeMin, " a.m.");
};
/**
 *A Helper function to convert localist event data into usable formats.
 *
 * @param {obj} event The localist event json data
 * @param {obj} args Formating instructions.
 *
 * @return {obj} see docs/buildEvent.config
 */


var BuildEvent =
/*#__PURE__*/
function () {
  function BuildEvent(event, args) {
    _classCallCheck(this, BuildEvent);

    this.event = event;
    this.description = event.description;
    this.args = args;
    this.format = args.format;
    this.addCal = args.addCal;
    this.pref_eventdetails = args.pref_eventdetails;
    this.pref_readmore = args.pref_readmore; // Date time variables.

    this.month_array = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.month_array_abb = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.day_array = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.day_array_abb = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.event_time = '';
    this.event_date_compact = '';
    this.event_date = '';
    this.displayDate = '';
    this.dateTime = ''; // yyyy-mm-dd

    this.abbrDay = '';
    this.fullDay = '';
    this.abbrMonth = '';
    this.month = '';
    this.day = '';
    this.monthHeader = ''; // month + year
    // the truncated description

    this.description = ''; // options

    this.department = 0;
    this.type = 0;
    this.group_name = '';
    this.group_id = 0;
    this.event_types = '';
    this.event_time_end = '';
    this.ticket_cost = ''; // setters

    this.setTruncDesc();
    this.setDateTime();
    this.setOptionFields();
    this.setEventType();
    this.setTicketCost();
    this.setTimeEnd();
  } // END OF CONSTRUCTOR


  _createClass(BuildEvent, [{
    key: "setDateTime",
    value: function setDateTime() {
      var event = this.event; // date and time

      var eventFullDate = new Date(event.event_instances[0].event_instance.start);
      var eventDay = this.day_array_abb[eventFullDate.getDay()];
      var eventDate = event.event_instances[0].event_instance.start.split('T')[0];
      this.dateTime = eventDate; // eslint-disable-next-line prefer-destructuring

      this.event_time = event.event_instances[0].event_instance.start.split('T')[1];
      this.event_time = convertTime(this.event_time); // convert to 12-hour format

      var year = eventDate.split('-')[0];
      var month = eventDate.split('-')[1].replace(/\b0+/g, ''); // remove leading zeroes

      var day = eventDate.split('-')[2].replace(/\b0+/g, ''); // remove leading zeroes

      eventDate = "".concat(month, "/").concat(day, "/").concat(year); // convert date format
      // eventDate_compact = month+'/'+day; // for compact mode (numbers only, e.g., "4/13")

      this.event_date_compact = "".concat(this.month_array_abb[month - 1], " ").concat(day); // for compact mode (month text, e.g., "Apr 13")

      this.event_date = "".concat(this.month_array[month - 1], " ").concat(day);
      this.displayDate = this.setDisplayDate(eventDate, this.event_date_compact);

      if (event.event_instances[0].event_instance.all_day) {
        this.event_time = 'all day';
      }

      this.abbrDay = eventDay;
      this.abbrMonth = this.month_array_abb[month - 1];
      this.month = this.month_array[month - 1];
      this.fullDay = this.day_array[eventFullDate.getDay()];
      this.day = day;
      this.monthHeader = "".concat(this.month, " ").concat(year);
    } // set date time helper

  }, {
    key: "setDisplayDate",
    value: function setDisplayDate(eventDate, eventDateCompact) {
      var prefDateHeaders = this.args.pref_date_headers;

      if (prefDateHeaders || this.format === 'compact') {
        if (this.format === 'compact') {
          return eventDateCompact;
        }

        return eventDate;
      }

      console.warn('warning no date headers');
      console.warn(eventDateCompact);
    }
  }, {
    key: "setTruncDesc",
    value: function setTruncDesc() {
      var event = this.event;
      var excerptLength = this.args.pref_excerpt_length;

      if (this.format === 'compact') {
        excerptLength = this.args.pref_excerpt_length_compact;
      }

      if (!this.args.supports_rich) {
        if (excerptLength > 0 && event.description.length > excerptLength) {
          this.description = event.description.trim().substring(0, excerptLength).split(' ').slice(0, -1).join(' ');
        } else {
          this.description = event.description;
        }
      } else if (excerptLength > 0) {
        if (event.description_text.length > excerptLength) {
          this.description = event.description_text.trim().substring(0, excerptLength).split(' ').slice(0, -1).join(' ');
        } else {
          this.description = event.description_text;
        } // TODO: add support for Rich Text (HTML) truncation

      } else if (this.args.pref_allow_rich) {
        this.description = event.description;
      } else {
        this.description = event.description_text;
      }
    }
  }, {
    key: "setOptionFields",
    value: function setOptionFields() {
      var event = this.event; // optional fields

      if (typeof event.filters.departments !== 'undefined') {
        this.department = event.filters.departments[0].id; // TODO: add support for multiple departments per event ( departments[1+] )
      }

      if (typeof event.filters.event_types !== 'undefined') {
        this.type = event.filters.event_types[0].id; // TODO: add support for multiple types per event per event ( event_types[1+] )
      }

      if (typeof event.group_name !== 'undefined') {
        this.group_name = event.group_name;
        this.group_id = event.group_id;
      }
    }
  }, {
    key: "setEventType",
    value: function setEventType() {
      var event = this.event;

      if (typeof event.filters.event_types !== 'undefined') {
        this.event_types = event.filters.event_types[0].name;
      }

      if (this.args.pref_category === 'dept' && this.department !== 0) {
        this.event_types = event.filters.departments[0].name;
      }

      if (this.args.pref_category === 'group' && this.group_name !== '') {
        this.event_types = this.group_name;
      }
    }
  }, {
    key: "setTimeEnd",
    value: function setTimeEnd() {
      var event = this.event;

      if (typeof event.event_instances[0].event_instance.end !== 'undefined' && event.event_instances[0].event_instance.end != null) {
        // eslint-disable-next-line prefer-destructuring
        this.event_time_end = event.event_instances[0].event_instance.end.split('T')[1];
        this.event_time_end = convertTime(this.event_time_end); // convert to 12-hour format
      }
    }
  }, {
    key: "setTicketCost",
    value: function setTicketCost() {
      var event = this.event;

      if (typeof event.ticket_cost !== 'undefined') {
        this.ticket_cost = event.ticket_cost;
      }
    }
  }]);

  return BuildEvent;
}();



/***/ }),

/***/ "./js/localist.js":
/*!************************!*\
  !*** ./js/localist.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocalList; });
/* harmony import */ var _service_local_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service/local-list */ "./js/service/local-list.js");
/* harmony import */ var _buildEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buildEvent */ "./js/buildEvent.js");
/* harmony import */ var _templates_standard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates/standard */ "./js/templates/standard.js");
/* harmony import */ var _templates_compact__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./templates/compact */ "./js/templates/compact.js");
/* harmony import */ var _templates_calendar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./templates/calendar */ "./js/templates/calendar.js");
/* harmony import */ var _templates_modernCompact__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./templates/modernCompact */ "./js/templates/modernCompact.js");
/* harmony import */ var _templates_modernStandard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./templates/modernStandard */ "./js/templates/modernStandard.js");
/* harmony import */ var _templates_cuenergy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./templates/cuenergy */ "./js/templates/cuenergy.js");
/* harmony import */ var _templates_archive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./templates/archive */ "./js/templates/archive.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable camelcase */









/*
  LoacalList typical usage example.
    const settings = { 'format':'standard', 'entries':20, 'heading':'My Local List',  'addCal': true};
    let localList = new LocalList( settings ).renderEvents();
    or with custom template
    let localList = new LocalList()
    //define inner template list of events
    localList.innerTemplate = (data)=>`<p>${data.event.title}</p>`;
    //build the outer wrapper at a minimum this must contain innerHtml
    localList.outerTemplate = (innerHTML, args)=>`<h2>${args.heading}</h2>${innerHTML}`;
    localList.renderEvents();
*/

var LocalList =
/*#__PURE__*/
function () {
  // define the following arguments
  function LocalList(_ref) {
    var _ref$depts = _ref.depts,
        depts = _ref$depts === void 0 ? 0 : _ref$depts,
        _ref$entries = _ref.entries,
        entries = _ref$entries === void 0 ? 10 : _ref$entries,
        _ref$format = _ref.format,
        format = _ref$format === void 0 ? 'standard' : _ref$format,
        _ref$group = _ref.group,
        group = _ref$group === void 0 ? 0 : _ref$group,
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? 'events-listing' : _ref$target,
        _ref$title = _ref.title,
        title = _ref$title === void 0 ? 'Events List' : _ref$title,
        _ref$heading = _ref.heading,
        heading = _ref$heading === void 0 ? 'Events' : _ref$heading,
        _ref$api = _ref.api,
        api = _ref$api === void 0 ? '2.1' : _ref$api,
        _ref$pref_excerpt_len = _ref.pref_excerpt_length,
        pref_excerpt_length = _ref$pref_excerpt_len === void 0 ? 250 : _ref$pref_excerpt_len,
        _ref$pref_excerpt_len2 = _ref.pref_excerpt_length_compact,
        pref_excerpt_length_compact = _ref$pref_excerpt_len2 === void 0 ? 125 : _ref$pref_excerpt_len2,
        _ref$pref_allow_rich = _ref.pref_allow_rich,
        pref_allow_rich = _ref$pref_allow_rich === void 0 ? true : _ref$pref_allow_rich,
        _ref$pref_readmore = _ref.pref_readmore,
        pref_readmore = _ref$pref_readmore === void 0 ? 'read more' : _ref$pref_readmore,
        _ref$pref_eventdetail = _ref.pref_eventdetails,
        pref_eventdetails = _ref$pref_eventdetail === void 0 ? 'event details' : _ref$pref_eventdetail,
        _ref$pref_category = _ref.pref_category,
        pref_category = _ref$pref_category === void 0 ? 'group' : _ref$pref_category,
        _ref$pref_category_fi = _ref.pref_category_filters,
        pref_category_filters = _ref$pref_category_fi === void 0 ? true : _ref$pref_category_fi,
        _ref$pref_date_header = _ref.pref_date_headers,
        pref_date_headers = _ref$pref_date_header === void 0 ? true : _ref$pref_date_header,
        _ref$singleday = _ref.singleday,
        singleday = _ref$singleday === void 0 ? false : _ref$singleday,
        _ref$keyword = _ref.keyword,
        keyword = _ref$keyword === void 0 ? false : _ref$keyword,
        _ref$addCal = _ref.addCal,
        addCal = _ref$addCal === void 0 ? false : _ref$addCal;

    _classCallCheck(this, LocalList);

    // used in filters
    this.pref_category = pref_category;
    this.pref_category_filters = pref_category_filters; // localist variables

    this.target = target;
    this.format = format; // standard wrapper variables

    this.wrapperArgs = {
      target: this.target
    }; // pass unique target id};

    this.wrapperArgs.title = title;
    this.wrapperArgs.heading = heading;
    this.wrapperArgs.filters = {}; // required by service findall to request localist data

    this.requestArgs = {};
    this.requestArgs.depts = depts;
    this.requestArgs.entries = parseInt(entries, 10);
    this.requestArgs.format = format;
    this.requestArgs.group = group;
    this.requestArgs.singleday = singleday;
    this.requestArgs.keyword = keyword;
    this.requestArgs.api = api;
    this.requestArgs.pref_allow_rich = pref_allow_rich; // build event variables required for inner HTML logic

    this.BE_args = {};
    this.BE_args.supports_rich = false;
    this.BE_args.supports_direction = false;
    this.BE_args.pref_date_headers = pref_date_headers;
    this.BE_args.pref_excerpt_length = pref_excerpt_length;
    this.BE_args.pref_excerpt_length_compact = pref_excerpt_length_compact;
    this.BE_args.pref_readmore = pref_readmore;
    this.BE_args.pref_eventdetails = pref_eventdetails; // is this used?

    this.BE_args.addCal = addCal;

    if (parseFloat(api) >= 2.1) {
      this.BE_args.supports_rich = true; // rich text descriptions (HTML) were added in API 2.1

      this.BE_args.supports_direction = true; // "direction" (asc/desc) was added in API 2.1
    }
  }

  _createClass(LocalList, [{
    key: "renderEvents",
    value: function renderEvents() {
      // add the loading throbber
      this.addThrobber(this.target); // test  to see if custom templates are defined

      if (!('innerTemplate' in this) && !('outerTemplate' in this)) {
        // if not defined set format of template
        this.innerTemplate = _templates_standard__WEBPACK_IMPORTED_MODULE_2__["standardInner"];
        this.outerTemplate = _templates_standard__WEBPACK_IMPORTED_MODULE_2__["standardWrapper"];

        switch (this.format) {
          case 'standard':
            this.innerTemplate = _templates_standard__WEBPACK_IMPORTED_MODULE_2__["standardInner"];
            this.outerTemplate = _templates_standard__WEBPACK_IMPORTED_MODULE_2__["standardWrapper"];
            break;

          case 'compact':
            this.innerTemplate = _templates_compact__WEBPACK_IMPORTED_MODULE_3__["compactInner"];
            this.outerTemplate = _templates_compact__WEBPACK_IMPORTED_MODULE_3__["compactWrapper"];
            break;

          case 'inline_compact':
            this.innerTemplate = _templates_calendar__WEBPACK_IMPORTED_MODULE_4__["calendarInner"];
            this.outerTemplate = _templates_calendar__WEBPACK_IMPORTED_MODULE_4__["calendarWrapper"];
            break;

          case 'modern_compact':
            // overide exerpt length this should be added to drupal form options
            this.BE_args.pref_excerpt_length = 125;
            this.innerTemplate = _templates_modernCompact__WEBPACK_IMPORTED_MODULE_5__["modernCompactInner"];
            this.outerTemplate = _templates_modernCompact__WEBPACK_IMPORTED_MODULE_5__["modernCompactWrapper"];
            break;

          case 'modern_standard':
            this.innerTemplate = _templates_modernStandard__WEBPACK_IMPORTED_MODULE_6__["moderStandardInner"];
            this.outerTemplate = _templates_modernStandard__WEBPACK_IMPORTED_MODULE_6__["modernStandardWrapper"];
            break;

          case 'simple_standard':
            this.innerTemplate = _templates_cuenergy__WEBPACK_IMPORTED_MODULE_7__["cuenergyEventsInner"];
            this.outerTemplate = _templates_cuenergy__WEBPACK_IMPORTED_MODULE_7__["cuenergyEventsWrapper"];
            break;

          case 'simple_compact':
            this.innerTemplate = _templates_cuenergy__WEBPACK_IMPORTED_MODULE_7__["cuenergyCompactInner"];
            this.outerTemplate = _templates_cuenergy__WEBPACK_IMPORTED_MODULE_7__["cuenergyCompactWrapper"];
            break;

          case 'archive':
            this.innerTemplate = _templates_archive__WEBPACK_IMPORTED_MODULE_8__["archiveInner"];
            this.outerTemplate = _templates_archive__WEBPACK_IMPORTED_MODULE_8__["archiveWrapper"];
            break;

          default: // console.warn("Warning: no format was defined using fallback standard");

        }
      } else {
        console.warn('using custom templates');
      } // fetch localist events and build the event nodes


      this.getAndBuildList();
    }
    /*
        inserts throbber after target elem
        this is deleted on localList render
        warning this.c_loader may be undefined
     */

  }, {
    key: "addThrobber",
    value: function addThrobber(target) {
      var loadingNode = '<div id="loader" class="fadeOut"><span class="fa fa-spin fa-cog"></span></div>';
      var tarElem = document.getElementById(target);

      if (tarElem) {
        tarElem.insertAdjacentHTML('afterbegin', loadingNode);
        this.c_loader = setTimeout(function () {
          document.getElementById('loader').classList.remove('fadeOut');
        }, 200); // skip loading animation if under 0.5s
      } else {
        console.warn('WARNING: can not find target element for loading animation');
      }
    }
    /* get the events */

  }, {
    key: "getAndBuildList",
    value: function getAndBuildList() {
      var _this = this;

      _service_local_list__WEBPACK_IMPORTED_MODULE_0__["findAll"](this.requestArgs).then(function (eventsObj) {
        _this.buildEventsList(eventsObj);
      })["catch"](function (error) {
        return console.error(error);
      });
    }
  }, {
    key: "buildEventsList",
    value: function buildEventsList(myObj) {
      var _this2 = this;

      var inner = ''; // loop through each event () => required to give access to 'this'

      myObj.events.forEach(function (event) {
        // built event provides common functions to format the data
        var builtEvent = new _buildEvent__WEBPACK_IMPORTED_MODULE_1__["default"](event.event, _this2.BE_args); // console.log( builtEvent );
        // build the filters array does not support multiple filter entries [0]only

        if (_this2.pref_category_filters) {
          if (_this2.pref_category === 'type' && builtEvent.type !== 0) {
            _this2.wrapperArgs.filters[event.filters.event_types[0].name] = {
              id: event.filters.event_types[0].id,
              name: event.filters.event_types[0].name,
              pref_category: _this2.pref_category
            };
          } else if (_this2.pref_category === 'dept' && builtEvent.department !== 0) {
            _this2.wrapperArgs.filters[event.filters.departments[0].name] = {
              id: event.filters.departments[0].id,
              name: event.filters.departments[0].name,
              pref_category: _this2.pref_category
            };
          } else if (_this2.pref_category === 'group' && builtEvent.group_name !== '') {
            _this2.wrapperArgs.filters[builtEvent.group_name] = {
              id: builtEvent.group_id,
              name: builtEvent.group_name,
              pref_category: _this2.pref_category
            };
          }
        } // console.log(builtEvent);


        inner += _this2.innerTemplate(builtEvent); // returns html string
      });
      var html = this.outerTemplate(inner, this.wrapperArgs); // returns html string
      // remove loading animation timer

      clearTimeout(this.c_loader); // the loader is replaced by html
      // document.getElementById('loader').classList.remove('fadeIn');

      var tarElem = document.getElementById(this.target);

      if (tarElem) {
        tarElem.innerHTML = html;
      } else {
        console.warn('WARNING: target element does not exist');
      }
    }
  }]);

  return LocalList;
}();



/***/ }),

/***/ "./js/service/local-list.js":
/*!**********************************!*\
  !*** ./js/service/local-list.js ***!
  \**********************************/
/*! exports provided: findAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findAll", function() { return findAll; });
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ "./js/service/request.js");
/* eslint-disable prettier/prettier */

/* eslint-disable camelcase */
 // eslint-disable-next-line import/prefer-default-export

var findAll = function findAll(_ref) {
  var _ref$depts = _ref.depts,
      depts = _ref$depts === void 0 ? 0 : _ref$depts,
      _ref$entries = _ref.entries,
      entries = _ref$entries === void 0 ? 3 : _ref$entries,
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? 'standard' : _ref$format,
      _ref$group = _ref.group,
      group = _ref$group === void 0 ? 0 : _ref$group,
      _ref$singleday = _ref.singleday,
      singleday = _ref$singleday === void 0 ? false : _ref$singleday,
      _ref$keyword = _ref.keyword,
      keyword = _ref$keyword === void 0 ? false : _ref$keyword,
      _ref$api = _ref.api,
      api = _ref$api === void 0 ? '2.1' : _ref$api;

  /* More Params */
  // calculate date ranges (including archive options)
  var pref_archive_range = 6;
  var pref_days = 365; // range of days to retrieve (overridden by "singleday" requests)

  var pref_distinct = true; // controls the "distinct" filter for the events query ('true' only returns one instance of a repeating event)

  var today = new Date();
  var today_month = today.getMonth();
  var today_year = today.getFullYear();
  var supports_direction = true;
  var past_year = today_year;
  var past_month = today_month - pref_archive_range; // past x months (legacy API 2.0)

  if (past_month < 0) {
    past_month += 12;
    past_year -= 1;
  } // helper function


  var addLeadingZero = function addLeadingZero(num) {
    if (num.toString().length === 1) {
      num = "0".concat(num);
    }

    return num;
  };

  var start_results = "".concat(today.getFullYear(), "-").concat(addLeadingZero(parseInt(today.getMonth() + 1, 10)), "-").concat(addLeadingZero(today.getDate()));
  var end_results = "".concat(parseInt(today.getFullYear() + 1, 10), "-").concat(addLeadingZero(parseInt(today.getMonth() + 1, 10)), "-").concat(addLeadingZero(today.getDate()));

  if (format === 'archive') {
    end_results = start_results;

    if (supports_direction) {
      start_results = "".concat(today.getFullYear() - 1, "-").concat(addLeadingZero(parseInt(today.getMonth() + 1, 10)), "-").concat(addLeadingZero(today.getDate()));
    } else {
      // legacy API 2.0
      start_results = "".concat(past_year, "-").concat(addLeadingZero(parseInt(past_month + 1, 10)), "-").concat(addLeadingZero(today.getDate()));
    }
  } // single day option


  if (singleday) {
    start_results = singleday;
    pref_days = 1;
  }

  var query = {
    api_key: 'KLhy2GtuSAGirYGY',
    days: pref_days,
    distinct: pref_distinct,
    pp: entries,
    start: start_results
  };

  if (depts && depts !== 0) {
    query.type = depts;
  }

  if (group !== 0) {
    query.group_id = group;
  }

  if (keyword && keyword !== '') {
    query.keyword = keyword;
  }

  if (format === 'archive' && !supports_direction) {
    query.end = end_results; // legacy API 2.0
  } else {
    query.days = pref_days;
  }

  if (format === 'archive' && supports_direction) {
    query.direction = 'desc';
  } // Get helper function


  var formatParams = function formatParams(params) {
    return "?".concat(Object.keys(params).map(function (key) {
      return "".concat(key, "=").concat(encodeURIComponent(params[key]));
    }).join('&'));
  };

  var url = "//events.cornell.edu/api/".concat(api, "/events").concat(formatParams(query)); // return request({url:"testData.json"})

  return Object(_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: url,
    method: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    data: query
  }).then(function (retData) {
    retData = JSON.parse(retData);
    return retData;
  });
};

/***/ }),

/***/ "./js/service/request.js":
/*!*******************************!*\
  !*** ./js/service/request.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// XMLHttpRequest wrapper using callbacks
/* harmony default export */ __webpack_exports__["default"] = (function (obj) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(obj.method || 'GET', obj.url);

    if (obj.headers) {
      Object.keys(obj.headers).forEach(function (key) {
        // console.log( key, obj.headers[key] )
        xhr.setRequestHeader(key, obj.headers[key]);
      });
    }

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };

    xhr.onerror = function () {
      return reject(xhr.statusText);
    };

    xhr.send(obj.body);
  });
});

/***/ }),

/***/ "./js/templates/archive.js":
/*!*********************************!*\
  !*** ./js/templates/archive.js ***!
  \*********************************/
/*! exports provided: archiveInner, archiveWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "archiveInner", function() { return archiveInner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "archiveWrapper", function() { return archiveWrapper; });
/*
 returns html string
 @param builtData a buildEvents.js obj
 built off cu energy template
*/
var archiveInner = function archiveInner(builtData) {
  return "\n<div class=\"views-row\">\n    <div class=\"container-fluid\">\n        <div class=\"row\">\n            <div class=\"col-sm-12 event-title-and-location\">\n                <div>\n                    <a href=\"".concat(builtData.event.localist_url, "\" >\n                        ").concat(builtData.event.title, "\n                    </a>\n                </div>\n                <div>\n                    <span class=\"event-date\">\n                    ").concat(builtData.event_date, "\n                    </span> - ").concat(builtData.event_time, "\n                    ").concat(builtData.event.location_name ? " | ".concat(builtData.event.location_name) : '', "\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");
};
var archiveWrapper = function archiveWrapper(inner) {
  return "\n<div class=\"view view-events view-id-events cuenergy-events\">\n    <div class=\"view-content\">\n        ".concat(inner, "\n    </div>\n</div>");
};

/***/ }),

/***/ "./js/templates/calendar.js":
/*!**********************************!*\
  !*** ./js/templates/calendar.js ***!
  \**********************************/
/*! exports provided: calendarInner, calendarWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calendarInner", function() { return calendarInner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calendarWrapper", function() { return calendarWrapper; });
var calendarInner = function calendarInner(builtEvent) {
  return "\n<div class=\"views-row\">\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-sm-2 event-month-and-day\">\n            <div>\n                <span class=\"event-month\">".concat(builtEvent.abbrMonth, "</span>\n                <span class=\"event-day\">").concat(builtEvent.day, "</span>\n            </div>\n        </div>\n        <div class=\"col-sm-8 event-title-and-location\">\n            <div class=\"event-title\">\n                <a href=\"").concat(builtEvent.event.localist_url, "\" hreflang=\"en\">\n                    '").concat(builtEvent.event.title, "'\n                </a>\n            </div>\n            <div class=\"event-times\">\n                <span class=\"fa fa-clock-o\"></span>\n                ").concat(builtEvent.event_time, "\n                ").concat(builtEvent.event_time_end ? " - ".concat(builtEvent.event_time_end) : '', "\n            </div>\n            <div class=\"event-location\">\n            ").concat(builtEvent.event.location_name ? "<span class=\"fa fa-map-marker\"></span>\n                        ".concat(builtEvent.event.location_name) : '', "\n            </div>\n        </div>\n    </div>\n</div>\n</div>");
};
var calendarWrapper = function calendarWrapper(innerHtml, args) {
  return "\n    <section id='eventsInlineCompact' title=\"".concat(args.title, "\">\n        ").concat(args.heading ? "<h2 class=\"block-title\">".concat(args.heading, "</h2>") : '', "\n        <div class=\"events-listing events-listing-inline inline no-thumbnails\">\n            ").concat(innerHtml, "\n        </div>\n    </section>");
};

/***/ }),

/***/ "./js/templates/compact.js":
/*!*********************************!*\
  !*** ./js/templates/compact.js ***!
  \*********************************/
/*! exports provided: compactInner, compactWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compactInner", function() { return compactInner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compactWrapper", function() { return compactWrapper; });
/* harmony import */ var _template_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template-helpers */ "./js/templates/template-helpers.js");
/* eslint-disable camelcase */

var compactInner = function compactInner(builtData) {
  return "\n<div\n    class=\"event-node dept-".concat(builtData.department, " node\n    type-").concat(builtData.type, " group-").concat(builtData.group_id, "\"\n>\n    <h3>\n        <a\n            target=\"_blank\"\n            href=\"").concat(builtData.event.localist_url, "\"\n        >\n            ").concat(builtData.event.title, "\n        </a>\n    </h3>\n    ").concat(builtData.event_date_compact ? "<h4 class=\"meta date\"><span class=\"fulldate\">".concat(builtData.event_date_compact, "</span></h4>") : '', "\n    ").concat(builtData.event.location_name ? "<h4 class=\"meta location\">".concat(builtData.event.location_name, "</h4>") : '', "\n    <p class=\"description\">\n        ").concat(builtData.description, "\n        <a\n            class=\"read-more more\"\n            href=\"").concat(builtData.event.localist_url, "/#\"\n            target=\"_blank\"\n        >\n            ").concat(builtData.pref_readmore, "\n            <span class='visually-hidden'> about ").concat(builtData.event.title, "</span>\n        </a>\n    </p>\n    ").concat(builtData.addCal ? "".concat(Object(_template_helpers__WEBPACK_IMPORTED_MODULE_0__["add_calendar"])(builtData.event)) : '', "\n</div><!--end of node -->");
}; // this has class compact only difference

var compactWrapper = function compactWrapper(inner, args) {
  return "\n    <section class='standard' id=\"standarCompact\" title=\"".concat(args.title, "\">\n    ").concat(args.heading ? "<h2>".concat(args.heading, "</h2>") : '', "\n        <div class=\"main-body\">\n            <div class=\"events-listing no-thumbnails compact\">\n                <!--filters options not supported -->\n                <div class=\"events-list\">\n                    ").concat(inner, "\n                </div>\n            </div><!--events listing -->\n        </div><!-- main-body -->\n    </section><!--end of section -->");
};

/***/ }),

/***/ "./js/templates/cuenergy.js":
/*!**********************************!*\
  !*** ./js/templates/cuenergy.js ***!
  \**********************************/
/*! exports provided: cuenergyEventsInner, cuenergyEventsWrapper, cuenergyCompactInner, cuenergyCompactWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cuenergyEventsInner", function() { return cuenergyEventsInner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cuenergyEventsWrapper", function() { return cuenergyEventsWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cuenergyCompactInner", function() { return cuenergyCompactInner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cuenergyCompactWrapper", function() { return cuenergyCompactWrapper; });
/*
 returns html string
 @param builtData a buildEvents.js obj
*/
var cuenergyEventsInner = function cuenergyEventsInner(builtData) {
  return "<div class=\"views-row\">\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-sm-12 event-title-and-location\">\n          <div><a href=\"".concat(builtData.event.localist_url, "\" >").concat(builtData.event.title, "</a></div>\n          <div><span class=\"event-date\">").concat(builtData.event_date, "</span> - ").concat(builtData.event_time).concat(builtData.event.location_name ? " | ".concat(builtData.event.location_name) : '', "</div>\n      </div>\n  </div>\n</div>\n</div>");
};
var cuenergyEventsWrapper = function cuenergyEventsWrapper(inner) {
  return "\n<div class=\"view view-events view-id-events cuenergy-events\">\n  <div class=\"view-content\">\n  ".concat(inner, "\n  </div>\n</div>");
};
var cuenergyCompactInner = function cuenergyCompactInner(builtData) {
  return "\n<div class=\"views-row\">\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <div class=\"col-sm-2 event-month-and-day\">\n        <div><span class=\"event-month\">".concat(builtData.abbrMonth, "</span><span class=\"event-day\">").concat(builtData.day, "</span></div>\n      </div>\n      <div class=\"col-sm-10 event-title-and-location\">\n        <div><a href=\"").concat(builtData.event.localist_url, "\" >").concat(builtData.event.title, "</a></div>\n        <div>").concat(builtData.event_time).concat(builtData.event.location_name ? " | ".concat(builtData.event.location_name) : '', "</div>\n      </div>\n    </div>\n  </div>\n</div>");
};
var cuenergyCompactWrapper = function cuenergyCompactWrapper(inner) {
  return "\n<div id='block-cuenergy-views-block-events-block-1' class=\"form-group\">\n  <div class=\"view view-events view-id-events\">\n    <div class=\"view-content\">\n      ".concat(inner, "\n    </div>\n  </div>\n</div>");
};

/***/ }),

/***/ "./js/templates/modernCompact.js":
/*!***************************************!*\
  !*** ./js/templates/modernCompact.js ***!
  \***************************************/
/*! exports provided: modernCompactInner, modernCompactWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modernCompactInner", function() { return modernCompactInner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modernCompactWrapper", function() { return modernCompactWrapper; });
/*
 returns html string
 @param builtData a buildEvents.js obj
*/
var modernCompactInner = function modernCompactInner(builtData) {
  return "<div class=\"card\">\n<div class=\"events\">\n    <a href=\"".concat(builtData.event.localist_url, "\" class=\"group-link-wrapper field-group-link\">\n        <time title=\"").concat(builtData.event_date, "\" datetime=\"").concat(builtData.dateTime, "\">\n            <span class='month'>").concat(builtData.abbrMonth, "</span>\n            <span class='day'>").concat(builtData.day, "</span>\n        </time>\n        <div class=\"field title\">\n            <h3>").concat(builtData.event.title, "</h3>\n        </div>\n        <div class=\"field meta\">\n        <p>").concat(builtData.event_time).concat(builtData.event.location_name ? ", ".concat(builtData.event.location_name) : '', "</p>\n        </div>\n        <div class=\"field field-name-summary summary\">\n            <p>").concat(builtData.description, "...</p>\n        </div>\n    </a>\n</div>\n</div>");
}; // this has class compact and no filters option

var modernCompactWrapper = function modernCompactWrapper(inner, args) {
  return "\n    <div id='eventsModernCompact' class=\"secondary modern\">\n         ".concat(args.heading ? "<h2>".concat(args.heading, "</h2>") : '', "\n        <div class=\"cwd-component cwd-card-grid three-card singles compact no-thumbnails\">\n            <div id=\"cwd-homeEvents-list\" class=\"compact no-thumbnails\">\n                <!--no filters -->\n                <div class=\"events-list\">\n                    ").concat(inner, "\n                </div>\n            </div><!--events listing -->\n        </div><!-- main-body -->\n    </div><!--end of section -->");
};

/***/ }),

/***/ "./js/templates/modernStandard.js":
/*!****************************************!*\
  !*** ./js/templates/modernStandard.js ***!
  \****************************************/
/*! exports provided: moderStandardInner, modernStandardWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moderStandardInner", function() { return moderStandardInner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modernStandardWrapper", function() { return modernStandardWrapper; });
/* harmony import */ var _template_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template-helpers */ "./js/templates/template-helpers.js");
/* eslint-disable camelcase */


var tagStr = function tagStr(event_types) {
  var spanStr = '';

  if (event_types) {
    event_types.forEach(function (element) {
      spanStr += "<span class=\"inline-events-type\">".concat(element.name, "</span>");
    });
  }

  return spanStr;
};

var moderStandardInner = function moderStandardInner(builtData) {
  return "<div class=\"card event-node dept-".concat(builtData.department, " type-").concat(builtData.type, " group-").concat(builtData.group_id, "\" >\n                            <div class=\"events\">\n                                <a href=\"").concat(builtData.event.localist_url, "\" class=\"group-link-wrapper field-group-link\">\n                                    <time title=\"").concat(builtData.event_date, "\" datetime=\"").concat(builtData.dateTime, "\">\n                                        <span class='month'>").concat(builtData.abbrMonth, "</span>\n                                        <span class='day'>").concat(builtData.day, "</span>\n                                    </time>\n                                    <div class=\"field title\">\n                                        <h3>").concat(builtData.event.title, "</h3>\n                                    </div>\n                                    <div class=\"field meta\">\n                                            <p>").concat(builtData.event_time).concat(builtData.event.location_name ? ", ".concat(builtData.event.location_name) : '', " ").concat(tagStr(builtData.event.filters.event_types), "</p>\n                                    </div>\n                                    <div class=\"field field-name-summary summary\">\n                                        <p>").concat(builtData.description, "... read more</p>\n                                    </div>\n                                </a>\n                                ").concat(builtData.addCal ? "".concat(Object(_template_helpers__WEBPACK_IMPORTED_MODULE_0__["add_calendar"])(builtData.event)) : '', "\n                            </div><!--events-->\n                        </div><!--card-->");
};
var modernStandardWrapper = function modernStandardWrapper(inner, args) {
  return "\n    <section id='eventsModernStandard' class='modern' title=\"".concat(args.title, "\">\n        ").concat(args.heading ? "<h2>".concat(args.heading, "</h2>") : '', "\n        <div>\n            <div class=\"cwd-component cwd-card-grid three-card singles events-listing no-thumbnails\">\n                ").concat(Object(_template_helpers__WEBPACK_IMPORTED_MODULE_0__["eventFilters"])(args.filters, args.target), "\n                <div class=\"events-list\">\n                    ").concat(inner, "\n                </div>\n            </div><!--events listing -->\n        </div><!-- main-body -->\n    </section><!--end of section -->");
};

/***/ }),

/***/ "./js/templates/standard.js":
/*!**********************************!*\
  !*** ./js/templates/standard.js ***!
  \**********************************/
/*! exports provided: standardInner, standardWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "standardInner", function() { return standardInner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "standardWrapper", function() { return standardWrapper; });
/* harmony import */ var _template_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template-helpers */ "./js/templates/template-helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable func-names */

/* eslint-disable camelcase */

/*
    tests to see if month / day should be displayed
    for calendar page format
*/

var CheckDate =
/*#__PURE__*/
function () {
  function CheckDate() {
    _classCallCheck(this, CheckDate);

    this.lastMonth = '';
    this.lastDay = '';
  }

  _createClass(CheckDate, [{
    key: "month",
    value: function month(builtData) {
      if (this.lastMonth !== builtData.month) {
        this.lastMonth = builtData.month;
        return "<h3 class=\"month-header\">".concat(builtData.monthHeader, "</h3>");
      }

      return '';
    }
  }, {
    key: "day",
    value: function day(builtData) {
      if (this.lastDay !== builtData.displayDate) {
        this.lastDay = builtData.displayDate;
        return "<h4 class=\"day-header\"><span class=\"fa fa-calendar-o\"></span>".concat(builtData.displayDate, "</h4>");
      }

      return '';
    }
  }]);

  return CheckDate;
}();

var checkDate = new CheckDate(); // test for empty headings

var standardInner = function standardInner(builtData) {
  return "\n    ".concat(checkDate.month(builtData), "\n    ").concat(checkDate.day(builtData), "\n    <div class=\"event-node node dept-").concat(builtData.department, " type-").concat(builtData.type, " group-").concat(builtData.group_id, "\">\n            <h3><a target=\"_blank\" href=\"").concat(builtData.event.localist_url, "\">").concat(builtData.event.title, "</a></h3>\n            ").concat(builtData.event_time ? "<h4 class=\"meta date\"><span class=\"start\">".concat(builtData.event_time, "</span></h4>") : '', "\n            ").concat(builtData.event.location_name ? "<h4 class=\"meta location\">".concat(builtData.event.location_name, "</h4>") : '', "\n            ").concat(builtData.event_types ? "<h4 class=\"meta type\"><span class=\"fa\"></span>".concat(builtData.event_types, "</h4>") : '', "\n            <p class=\"description\">").concat(builtData.description, "\n                <a class=\"read-more more\" href=\"").concat(builtData.event.localist_url, "/#\" target=\"_blank\">").concat(builtData.pref_readmore, "<span class='visually-hidden'> about ").concat(builtData.event.title, "</span></a>\n            </p>\n            ").concat(builtData.addCal ? "".concat(Object(_template_helpers__WEBPACK_IMPORTED_MODULE_0__["add_calendar"])(builtData.event)) : '', "\n    </div><!--end of node -->");
};
var standardWrapper = function standardWrapper(inner, args) {
  return "\n    <section class='standard' id='eventStandard' title=\"".concat(args.title, "\">\n    ").concat(args.heading ? "<h2>".concat(args.heading, "</h2>") : '', "\n        <div class=\"main-body\">\n            <div class=\"events-listing no-thumbnails\" >\n                ").concat(Object(_template_helpers__WEBPACK_IMPORTED_MODULE_0__["eventFilters"])(args.filters, args.target), "\n                <div class=\"events-list\">\n                    ").concat(inner, "\n                </div>\n            </div><!--events listing -->\n        </div><!-- main-body -->\n    </section><!--end of section -->");
};

/***/ }),

/***/ "./js/templates/template-helpers.js":
/*!******************************************!*\
  !*** ./js/templates/template-helpers.js ***!
  \******************************************/
/*! exports provided: eventFilters, add_calendar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventFilters", function() { return eventFilters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_calendar", function() { return add_calendar; });
/* eslint-disable camelcase */

/*
 @param filterObj has structure: obj.name, obj.id
 @param domTarget: string of html id #id should exist and be unique
 attaches onClick handlers to window object

 @todo  Add wai-aria controls support,
        this should probably be a class,
        also tests that element exists,
*/
var eventFilters = function eventFilters(filterObjs, domTarget) {
  var targetElem = document.getElementById(domTarget); // make sure function names are safe strings

  var domStr = domTarget.replace(/[^\w]/gi, ''); // handles filter events

  var toggleFilters = function toggleFilters(id, target) {
    // remove active class from all filter buttons
    var allFilterBtns = targetElem.getElementsByClassName('filter-btn');
    allFilterBtns.forEach(function (value) {
      value.classList.remove('active');
    });
    var elem = document.getElementById(id); // set the current item active

    elem.classList.add('active'); // onclick button will only hide non target elements
    // hide all filter elements

    var allEvents = targetElem.getElementsByClassName('event-node');
    allEvents.forEach(function (value) {
      value.classList.add('fadeOut');
    }); // show the target elements

    var targetElems = targetElem.getElementsByClassName(target);
    targetElems.forEach(function (value) {
      value.classList.remove('fadeOut');
    });
  };

  var showAllEvents = function showAllEvents() {
    // remove active class from all filter buttons
    var allFilterBtns = targetElem.getElementsByClassName('filter-btn');
    allFilterBtns.forEach(function (value) {
      value.classList.remove('active');
    });
    var elem = document.getElementById("filterAll-".concat(domStr)); // set the current item active

    elem.classList.add('active'); // show all filter elements

    var allEvents = targetElem.getElementsByClassName('event-node');
    allEvents.forEach(function (value) {
      value.classList.remove('fadeOut');
    });
  }; // attach event handlers to window


  window["toggleFilters".concat(domStr)] = toggleFilters;
  window["showAllEvents".concat(domStr)] = showAllEvents;
  return "\n        <div class='events-filters-wrap' ><h3 class=\"hidden\">Show:</h3>\n            <ul class=\"events-filters\">\n                <li><button id=\"filterAll-".concat(domStr, "\" data-filter=\"all\" class=\"filter-btn active\" onClick=\"showAllEvents").concat(domStr, "()\">All Events</button></li>\n                ").concat(filterObjs ? Object.keys(filterObjs).map(function (key) {
    return "<li><button id='filter".concat(filterObjs[key].id, "-").concat(domStr, "' data-filter=\"").concat(filterObjs[key].pref_category, "-").concat(filterObjs[key].id, "\" class=\"filter-btn\" onclick=\"toggleFilters").concat(domStr, "('filter").concat(filterObjs[key].id, "-").concat(domStr, "', '").concat(filterObjs[key].pref_category, "-").concat(filterObjs[key].id, "')\">").concat(filterObjs[key].name, "</button></li>");
  }).join('') : '', "\n            </ul>\n        </div>\n    ");
};
var add_calendar = function add_calendar(myEvent) {
  /* ----------------- build calander links -------------------------- */
  var buidGoogleStr = function buidGoogleStr(myObj) {
    var mySD = myObj.event_instances[0].event_instance.start.split('T')[0];
    var gDateStart = mySD.split('-')[0] + mySD.split('-')[1] + mySD.split('-')[2]; // this may not work as intended for repeating events

    var myED = myObj.last_date;
    var gDateStop = myED.split('-')[0] + myED.split('-')[1] + myED.split('-')[2];
    return "\n                <a class=\"fa fa-google google\"\n                    href=\"https://calendar.google.com/calendar/event?action=TEMPLATE&amp;dates=".concat(gDateStart, "%2F").concat(gDateStop, "&amp;details=").concat(encodeURIComponent(myObj.description_text.replace(/[\r\n]/g, "<br />")), "&amp;location=").concat(encodeURIComponent(myObj.location), "&amp;sprop=website%3Aevents.cornell.edu&amp;text=").concat(encodeURIComponent(myObj.title), "\" title=\"Save to Google Calendar\" target=\"_blank\">\n                <span class=\"sr-only\">Add ").concat(myObj.title, " to Google Calendar</span>\n                </a>\n                ");
  };

  var buildiCal = function buildiCal(myObj) {
    return "\n                        <a class=\"fa fa-calendar apple\" href=\"".concat(myObj.localist_ics_url, "/#\" title=\"Save to iCal\" target=\"_blank\" >\n                        <span class='sr-only'>Add ").concat(myObj.title, " to iCal</span>\n                        </a>\n                        ");
  };

  var buildOutlookCal = function buildOutlookCal(myObj) {
    return "\n                        <a class=\"fa fa-clock-o microsoft\" href=\"".concat(myObj.localist_ics_url, "\" title=\"Save to Outlook\" target=\"_blank\" >\n                            <span class='sr-only'>Add ").concat(myObj.title, " to Outlook</span>\n                        </a>\n                        ");
  };
  /* ------------------ END OF BUILD LINKS --------------------------- */


  return "<span class=\"event-subscribe\">add to calendar\n            ".concat(buidGoogleStr(myEvent), " ").concat(buildiCal(myEvent), " ").concat(buildOutlookCal(myEvent), "\n            </span>");
};

/***/ }),

/***/ "./styles/app.scss":
/*!*************************!*\
  !*** ./styles/app.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi ./js/app.js ./styles/app.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! d:\my_sites\CD_CWD_events\CD_cwd_events\dev\js\app.js */"./js/app.js");
module.exports = __webpack_require__(/*! d:\my_sites\CD_CWD_events\CD_cwd_events\dev\styles\app.scss */"./styles/app.scss");


/***/ })

/******/ });