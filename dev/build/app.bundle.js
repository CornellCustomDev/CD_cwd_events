var CWD_LocalList =
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//load the required styles and bundle @todo do conditional dynamic imports?


var _localList = __webpack_require__(/*! ./service/local-list */ "./js/service/local-list.js");

var service = _interopRequireWildcard(_localList);

var _buildEvent = __webpack_require__(/*! ./buildEvent */ "./js/buildEvent.js");

var _standard = __webpack_require__(/*! ./templates/standard */ "./js/templates/standard.js");

var _compact = __webpack_require__(/*! ./templates/compact */ "./js/templates/compact.js");

var _calendar = __webpack_require__(/*! ./templates/calendar */ "./js/templates/calendar.js");

var _modernCompact = __webpack_require__(/*! ./templates/modernCompact */ "./js/templates/modernCompact.js");

var _modernStandard = __webpack_require__(/*! ./templates/modernStandard */ "./js/templates/modernStandard.js");

__webpack_require__(/*! ../styles/app.scss */ "./styles/app.scss");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//expose the localList via run function
module.exports = {
    run: function run(args) {
        var LL = new LocalList(args);
        /*
         add custom templates here:
         LL.innerTemplate = (data)=>`<p>${data.event.title}</p>`;
         build the outer wrapper at a minimum this must contain innerHtml
         LL.outerTemplate = (innerHTML, args)=>`<h2>${args.heading}</h2>${innerHTML}`;
         */
        LL.renderEvents();
    }

    /*LoacalList typical usage
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

    //@todo should verify target exists
};
var LocalList = function () {
    // define the following arguments
    function LocalList(_ref) {
        var _ref$depts = _ref.depts,
            depts = _ref$depts === undefined ? 0 : _ref$depts,
            _ref$entries = _ref.entries,
            entries = _ref$entries === undefined ? 10 : _ref$entries,
            _ref$format = _ref.format,
            format = _ref$format === undefined ? 'standard' : _ref$format,
            _ref$group = _ref.group,
            group = _ref$group === undefined ? 0 : _ref$group,
            _ref$target = _ref.target,
            target = _ref$target === undefined ? "events-listing" : _ref$target,
            _ref$title = _ref.title,
            title = _ref$title === undefined ? "Events List" : _ref$title,
            _ref$heading = _ref.heading,
            heading = _ref$heading === undefined ? 'Events' : _ref$heading,
            _ref$api = _ref.api,
            api = _ref$api === undefined ? '2.1' : _ref$api,
            _ref$pref_excerpt_len = _ref.pref_excerpt_length,
            pref_excerpt_length = _ref$pref_excerpt_len === undefined ? 250 : _ref$pref_excerpt_len,
            _ref$pref_excerpt_len2 = _ref.pref_excerpt_length_compact,
            pref_excerpt_length_compact = _ref$pref_excerpt_len2 === undefined ? 125 : _ref$pref_excerpt_len2,
            _ref$pref_allow_rich = _ref.pref_allow_rich,
            pref_allow_rich = _ref$pref_allow_rich === undefined ? true : _ref$pref_allow_rich,
            _ref$pref_readmore = _ref.pref_readmore,
            pref_readmore = _ref$pref_readmore === undefined ? 'read more' : _ref$pref_readmore,
            _ref$pref_eventdetail = _ref.pref_eventdetails,
            pref_eventdetails = _ref$pref_eventdetail === undefined ? 'event details' : _ref$pref_eventdetail,
            _ref$pref_category = _ref.pref_category,
            pref_category = _ref$pref_category === undefined ? 'group' : _ref$pref_category,
            _ref$pref_category_fi = _ref.pref_category_filters,
            pref_category_filters = _ref$pref_category_fi === undefined ? true : _ref$pref_category_fi,
            _ref$pref_date_header = _ref.pref_date_headers,
            pref_date_headers = _ref$pref_date_header === undefined ? true : _ref$pref_date_header,
            _ref$singleday = _ref.singleday,
            singleday = _ref$singleday === undefined ? false : _ref$singleday,
            _ref$keyword = _ref.keyword,
            keyword = _ref$keyword === undefined ? false : _ref$keyword,
            _ref$addCal = _ref.addCal,
            addCal = _ref$addCal === undefined ? false : _ref$addCal;

        _classCallCheck(this, LocalList);

        //used in filters
        this.pref_category = pref_category;
        this.pref_category_filters = pref_category_filters;

        //localist variables
        this.target = target;
        this.format = format;

        //standard wrapper variables 
        this.wrapperArgs = { 'target': this.target }; //pass unique target id};
        this.wrapperArgs.title = title;
        this.wrapperArgs.heading = heading;
        this.wrapperArgs.filters = {};

        //required by service findall to request localist data
        this.requestArgs = {};
        this.requestArgs.depts = depts;
        this.requestArgs.entries = entries;
        this.requestArgs.format = format;
        this.requestArgs.group = group;
        this.requestArgs.singleday = singleday;
        this.requestArgs.keyword = keyword;
        this.requestArgs.api = api;
        this.requestArgs.pref_allow_rich = pref_allow_rich;

        // build event variables required for inner HTML logic 
        this.BE_args = {};
        this.BE_args.supports_rich = false;
        this.BE_args.supports_direction = false;
        this.BE_args.pref_date_headers = pref_date_headers;
        this.BE_args.pref_excerpt_length = pref_excerpt_length;
        this.BE_args.pref_excerpt_length_compact = pref_excerpt_length_compact;
        this.BE_args.pref_readmore = pref_readmore;
        this.BE_args.pref_eventdetails = pref_eventdetails; //is this used?
        this.BE_args.addCal = addCal;
        if (parseFloat(api) >= 2.1) {
            this.BE_args.supports_rich = true; // rich text descriptions (HTML) were added in API 2.1
            this.BE_args.supports_direction = true; // "direction" (asc/desc) was added in API 2.1
        }
    }

    _createClass(LocalList, [{
        key: "renderEvents",
        value: function renderEvents() {
            //add the loading throbber
            this.addThrobber(this.target);
            //test  to see if custom templates are defined
            if (!('innerTemplate' in this) && !('outerTemplate' in this)) {
                //if not set format of template
                this.innerTemplate = _standard.standardInner;
                this.outerTemplate = _standard.standardWrapper;
                switch (this.format) {
                    case 'standard':
                        this.innerTemplate = _standard.standardInner;
                        this.outerTemplate = _standard.standardWrapper;
                        break;
                    case 'compact':
                        this.innerTemplate = _compact.compactInner;
                        this.outerTemplate = _compact.compactWrapper;
                        break;
                    case 'inline_compact':
                        this.innerTemplate = _calendar.calendarInner;
                        this.outerTemplate = _calendar.calendarWrapper;
                        break;
                    case 'modern_compact':
                        //overide exerpt length this should be added to drupal form options
                        this.BE_args.pref_excerpt_length = 125;
                        this.innerTemplate = _modernCompact.modernCompactInner;
                        this.outerTemplate = _modernCompact.modernCompactWrapper;
                        break;
                    case 'modern_standard':
                        this.innerTemplate = _modernStandard.moderStandardInner;
                        this.outerTemplate = _modernStandard.modernStandardWrapper;
                        break;
                    default:
                    //console.warn("Warning: no format was defined using fallback standard");
                }
            } else {
                console.log('using custom templates');
            }
            //fetch localist events and build the event nodes
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
                console.log('WARNING: can not find target element for loading animation');
            }
        }

        /* get the events */

    }, {
        key: "getAndBuildList",
        value: function getAndBuildList() {
            var _this = this;

            service.findAll(this.requestArgs).then(function (eventsObj) {
                _this.buildEventsList(eventsObj);
            }).catch(function (error) {
                return console.log(error);
            });
        }
    }, {
        key: "buildEventsList",
        value: function buildEventsList(myObj) {
            var _this2 = this;

            var inner = '';
            //loop through each event () => required to give access to 'this'
            myObj.events.forEach(function (event) {
                //built event provides common functions to format the data
                var builtEvent = new _buildEvent.BuildEvent(event.event, _this2.BE_args);
                console.log(builtEvent);
                //build the filters array does not support multiple filter entries [0]only
                if (_this2.pref_category_filters) {
                    if (_this2.pref_category == 'type' && builtEvent.type != 0) {
                        _this2.wrapperArgs.filters[event.filters.event_types[0].name] = {
                            'id': event.filters.event_types[0].id,
                            'name': event.filters.event_types[0].name,
                            'pref_category': pref_category
                        };
                    } else if (_this2.pref_category == 'dept' && builtEvent.department != 0) {
                        _this2.wrapperArgs.filters[event.filters.departments[0].name] = {
                            'id': event.filters.departments[0].id,
                            'name': event.filters.departments[0].name,
                            'pref_category': pref_category
                        };
                    } else if (_this2.pref_category == 'group' && builtEvent.group_name != '') {
                        _this2.wrapperArgs.filters[builtEvent.group_name] = {
                            'id': builtEvent.group_id,
                            'name': builtEvent.group_name,
                            'pref_category': _this2.pref_category
                        };
                    }
                }

                inner += _this2.innerTemplate(builtEvent); //returns html string
            });

            var html = this.outerTemplate(inner, this.wrapperArgs); //returns html string

            //remove loading animation timer
            clearTimeout(this.c_loader);
            //the loader is replaced by html
            //document.getElementById('loader').classList.remove('fadeIn'); 
            var tarElem = document.getElementById(this.target);
            tarElem ? tarElem.innerHTML = html : console.warn('WARNING: target element does not exist');
        }
    }]);

    return LocalList;
}();

/***/ }),

/***/ "./js/buildEvent.js":
/*!**************************!*\
  !*** ./js/buildEvent.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BuildEvent = exports.BuildEvent = function () {
    function BuildEvent(event, args) {
        _classCallCheck(this, BuildEvent);

        this.event = event;
        this.description = event.description;
        this.args = args;
        this.format = args.format;
        this.addCal = args.addCal;
        this.pref_eventdetails = args.pref_eventdetails;
        this.pref_readmore = args.pref_readmore;

        //date time variables
        this.month_array = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.month_array_abb = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.day_array = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.day_array_abb = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.event_time;
        this.event_date_compact;
        this.event_date;
        this.displayDate;
        this.dateTime; //yyyy-mm-dd
        this.abbrDay;
        this.fullDay;
        this.abbrMonth;
        this.month;
        this.day;
        this.monthHeader; //month + year

        //the truncated description
        this.description;

        //options
        this.department = 0;
        this.type = 0;
        this.group_name = '';
        this.group_id = 0;
        this.event_types = '';

        this.event_time_end = '';

        this.ticket_cost = '';

        //setters
        this.setTruncDesc();
        this.setDateTime();
        this.setOptionFields();
        this.setEventType();
        this.setTicketCost();
        this.setTimeEnd();
    } //END OF CONSTRUCTOR

    _createClass(BuildEvent, [{
        key: 'setDateTime',
        value: function setDateTime() {
            var event = this.event;
            // date and time
            var event_fulldate = new Date(event.event_instances[0].event_instance.start);
            var event_day = this.day_array_abb[event_fulldate.getDay()];
            var event_date = event.event_instances[0].event_instance.start.split('T')[0];
            this.dateTime = event_date;
            this.event_time = event.event_instances[0].event_instance.start.split('T')[1];
            this.event_time = convertTime(this.event_time); // convert to 12-hour format
            var year = event_date.split('-')[0];
            var month = event_date.split('-')[1].replace(/\b0+/g, ''); // remove leading zeroes
            var day = event_date.split('-')[2].replace(/\b0+/g, ''); // remove leading zeroes
            var event_date = month + '/' + day + '/' + year; // convert date format
            //event_date_compact = month+'/'+day; // for compact mode (numbers only, e.g., "4/13")
            this.event_date_compact = this.month_array_abb[month - 1] + ' ' + day; // for compact mode (month text, e.g., "Apr 13")
            this.event_date = this.month_array[month - 1] + ' ' + day;
            this.displayDate = this.setDisplayDate(event_date, this.event_date_compact);
            if (event.event_instances[0].event_instance.all_day) {
                this.event_time = 'all day';
            }
            this.abbrDay = event_day;
            this.abbrMonth = this.month_array_abb[month - 1];
            this.month = this.month_array[month - 1];
            this.fullDay = this.day_array[event_fulldate.getDay()];
            this.day = day;
            this.monthHeader = this.month + ' ' + year;
        }
    }, {
        key: 'setDisplayDate',


        //set date time helper
        value: function setDisplayDate(event_date, event_date_compact) {
            var pref_date_headers = this.args.pref_date_headers;
            if (pref_date_headers || this.format == 'compact') {
                if (this.format == 'compact') {
                    return event_date_compact;
                }
                return event_date;
            } else {
                console.log("warning no date headers");
                console.log(event_date_compact);
            }
        }
    }, {
        key: 'setTruncDesc',
        value: function setTruncDesc() {
            var event = this.event;
            var excerpt_length = this.args.pref_excerpt_length;
            if (this.format == 'compact') {
                excerpt_length = this.args.pref_excerpt_length_compact;
            }

            if (!this.args.supports_rich) {
                if (excerpt_length > 0 && event.description.length > excerpt_length) {
                    this.description = event.description.trim().substring(0, excerpt_length).split(' ').slice(0, -1).join(' ');
                    //console.log(description)
                } else {
                    this.description = event.description;
                }
            } else {
                if (excerpt_length > 0) {
                    if (event.description_text.length > excerpt_length) {
                        this.description = event.description_text.trim().substring(0, excerpt_length).split(' ').slice(0, -1).join(' ');
                        //console.log(this.description)
                    } else {
                        this.description = event.description_text;
                    }
                    // TODO: add support for Rich Text (HTML) truncation
                } else {
                    if (this.args.pref_allow_rich) {
                        this.description = event.description;
                    } else {
                        this.description = event.description_text;
                    }
                }
            }
        }
    }, {
        key: 'setOptionFields',
        value: function setOptionFields() {
            var event = this.event;
            // optional fields
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
        key: 'setEventType',
        value: function setEventType() {
            var event = this.event;
            if (typeof event.filters.event_types !== 'undefined') {
                this.event_types = event.filters.event_types[0].name;
            }
            if (this.args.pref_category == 'dept' && this.department != 0) {
                this.event_types = event.filters.departments[0].name;
            }
            if (this.args.pref_category == 'group' && this.group_name != '') {
                this.event_types = this.group_name;
            }
        }
    }, {
        key: 'setTimeEnd',
        value: function setTimeEnd() {
            var event = this.event;
            if (typeof event.event_instances[0].event_instance.end !== 'undefined' && event.event_instances[0].event_instance.end != null) {
                this.event_time_end = event.event_instances[0].event_instance.end.split('T')[1];
                this.event_time_end = convertTime(this.event_time_end); // convert to 12-hour format
            }
        }
    }, {
        key: 'setTicketCost',
        value: function setTicketCost() {
            var event = this.event;
            if (typeof event.ticket_cost !== 'undefined') {
                this.ticket_cost = event.ticket_cost;
            }
        }
    }]);

    return BuildEvent;
}();

/* helper function */


var convertTime = function convertTime(time) {
    var time_hour = time.split(':')[0];
    var time_min = time.split(':')[1];
    if (parseInt(time_hour) >= 12) {
        if (parseInt(time_hour) > 12) {
            time_hour = parseInt(time_hour) - 12;
        }
        return time_hour + ':' + time_min + ' p.m.';
    } else {
        return parseInt(time_hour) + ':' + time_min + ' a.m.';
    }
};

/***/ }),

/***/ "./js/service/local-list.js":
/*!**********************************!*\
  !*** ./js/service/local-list.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findAll = undefined;

var _request = __webpack_require__(/*! ./request */ "./js/service/request.js");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findAll = exports.findAll = function findAll(_ref) {
    var _ref$depts = _ref.depts,
        depts = _ref$depts === undefined ? 0 : _ref$depts,
        _ref$entries = _ref.entries,
        entries = _ref$entries === undefined ? 3 : _ref$entries,
        _ref$format = _ref.format,
        format = _ref$format === undefined ? 'standard' : _ref$format,
        _ref$group = _ref.group,
        group = _ref$group === undefined ? 0 : _ref$group,
        _ref$singleday = _ref.singleday,
        singleday = _ref$singleday === undefined ? false : _ref$singleday,
        _ref$keyword = _ref.keyword,
        keyword = _ref$keyword === undefined ? false : _ref$keyword,
        _ref$api = _ref.api,
        api = _ref$api === undefined ? '2.1' : _ref$api;

    /* More Params */
    // calculate date ranges (including archive options)
    var pref_archive_range = 6;
    var pref_days = 365; // range of days to retrieve (overridden by "singleday" requests)
    var pref_distinct = true; // controls the "distinct" filter for the events query ('true' only returns one instance of a repeating event)
    var today = new Date();
    var today_month = today.getMonth();
    var today_year = today.getFullYear();
    var past_year = today_year;
    var past_month = today_month - pref_archive_range; // past x months (legacy API 2.0)
    if (past_month < 0) {
        past_month += 12;
        past_year -= 1;
    }

    //helper function
    var addLeadingZero = function addLeadingZero(num) {
        if (num.toString().length == 1) {
            num = '0' + num;
        }
        return num;
    };

    var start_results = today.getFullYear() + '-' + addLeadingZero(parseInt(today.getMonth() + 1)) + '-' + addLeadingZero(today.getDate());
    var end_results = parseInt(today.getFullYear() + 1) + '-' + addLeadingZero(parseInt(today.getMonth() + 1)) + '-' + addLeadingZero(today.getDate()); // 'end_results' is only used for archive mode in legacy API 2.0
    if (format == 'archive') {
        end_results = start_results;
        if (supports_direction) {
            start_results = today.getFullYear() - 1 + '-' + addLeadingZero(parseInt(today.getMonth() + 1)) + '-' + addLeadingZero(today.getDate());
        } else {
            // legacy API 2.0
            start_results = past_year + '-' + addLeadingZero(parseInt(past_month + 1)) + '-' + addLeadingZero(today.getDate());
        }
    }

    // single day option
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

    if (depts && depts != 0) {
        query.type = depts;
    }
    if (group != 0) {
        query.group_id = group;
    }
    if (keyword && keyword != '') {
        query.keyword = keyword;
    }
    if (format == 'archive' && !supports_direction) {
        query.end = end_results; // legacy API 2.0
    } else {
        query.days = pref_days;
    }
    if (format == 'archive' && supports_direction) {
        query.direction = 'desc';
    }
    //Get helper function
    var formatParams = function formatParams(params) {
        return "?" + Object.keys(params).map(function (key) {
            return key + "=" + encodeURIComponent(params[key]);
        }).join("&");
    };
    var url = '//events.cornell.edu/api/' + api + '/events' + formatParams(query);
    // return request({url:"testData.json"})
    return (0, _request2.default)({
        url: url,
        method: "GET",
        dataType: 'jsonp',
        crossDomain: true,
        data: query
    }).then(function (retData) {
        return retData = JSON.parse(retData);
    });
};

/***/ }),

/***/ "./js/service/request.js":
/*!*******************************!*\
  !*** ./js/service/request.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

// XMLHttpRequest wrapper using callbacks
exports.default = function (obj) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url);
        if (obj.headers) {
            Object.keys(obj.headers).forEach(function (key) {
                console.log(key, obj.headers[key]);
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
};

/***/ }),

/***/ "./js/templates/calendar.js":
/*!**********************************!*\
  !*** ./js/templates/calendar.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var calendarInner = exports.calendarInner = function calendarInner(builtEvent) {
    return '\n        <div class="views-row">  \n        <div class="container-fluid"> \n        <div class="row"> \n        <div class="col-sm-2 event-month-and-day"> \n        <div> \n            <span class="event-month">' + builtEvent.abbrMonth + '</span> \n            <span class="event-day">' + builtEvent.abbrDay + '</span> \n        </div> \n        </div> \n        <div class="col-sm-8 event-title-and-location"> \n        <div class="event-title"> \n            <a href="' + builtEvent.event.localist_url + '" hreflang="en">\'' + builtEvent.event.title + '\'</a> \n        </div> \n        <div class="event-times"> \n            <span class="fa fa-clock-o"></span>' + builtEvent.event_time + (builtEvent.event_time_end ? ' - ' + builtEvent.event_time_end : '') + '\n        </div> \n        <div class="event-location"> \n        ' + (builtEvent.event.location_name ? '<span class="fa fa-map-marker"></span>' + builtEvent.event.location_name : '') + '  \n        </div> \n        </div> \n        </div>  \n        </div> \n        </div>';
};

var calendarWrapper = exports.calendarWrapper = function calendarWrapper(innerHtml, args) {
    return '\n    <section title="' + args.title + '">\n        <h2 class="block-title">' + args.heading + '</h2>\n        <div class="events-listing events-listing-inline inline no-thumbnails">\n            ' + innerHtml + '\n        </div>\n    </section>';
};

/***/ }),

/***/ "./js/templates/compact.js":
/*!*********************************!*\
  !*** ./js/templates/compact.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.compactWrapper = exports.compactInner = undefined;

var _templateHelpers = __webpack_require__(/*! ./template-helpers */ "./js/templates/template-helpers.js");

var compactInner = exports.compactInner = function compactInner(builtData) {
    return '\n    <div class="event-node node dept-' + builtData.department + ' type-' + builtData.type + ' group-' + builtData.group_id + '">\n    <h3><a target="_blank" href="' + builtData.event.localist_url + '">' + builtData.event.title + '</a></h3>\n    ' + (builtData.event_date_compact ? '<h4 class="meta date"><span class="fulldate">' + builtData.event_date_compact + '</span></h4>' : '') + '\n    ' + (builtData.event.location_name ? '<h4 class="meta location">' + builtData.event.location_name + '</h4>' : '') + '    \n    <p class="description">' + builtData.description + ' \n    <a class="read-more more" href="' + builtData.event.localist_url + '/#" target="_blank">' + builtData.pref_readmore + '<span class=\'visually-hidden\'> about ' + builtData.event.title + '</span></a>\n    </p>\n    ' + (builtData.addCal ? '' + (0, _templateHelpers.add_calender)(builtData.event) : '') + '  \n    </div><!--end of node -->\n    ';
};
//this has class compact only difference
var compactWrapper = exports.compactWrapper = function compactWrapper(inner, args) {
    return '\n    <section title="' + args.title + '">\n        <h2>' + args.heading + '</h2>\n        <div class="main-body">  \n            <div class="events-listing no-thumbnails compact">\n                <!--filters options not supported -->\n                <div class="events-list">\n                    ' + inner + '\n                </div>\n            </div><!--events listing -->\n        </div><!-- main-body -->\n    </section><!--end of section -->';
};

/***/ }),

/***/ "./js/templates/modernCompact.js":
/*!***************************************!*\
  !*** ./js/templates/modernCompact.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
 returns html string
 @param builtData a buildEvents.js obj
*/
var modernCompactInner = exports.modernCompactInner = function modernCompactInner(builtData) {
    return '<div class="card">\n<div class="events">\n    <a href="' + builtData.event.localist_url + '" class="group-link-wrapper field-group-link">\n        <time title="' + builtData.event_date + '" datetime="' + builtData.dateTime + '">\n            <span class=\'month\'>' + builtData.abbrMonth + '</span>\n            <span class=\'day\'>' + builtData.day + '</span>\n        </time>\n        <div class="field title">\n            <h3>' + builtData.event.title + '</h3>\n        </div>\n        <div class="field meta">\n        <p>' + builtData.event_time + (builtData.event.location_name ? ', ' + builtData.event.location_name : '') + '</p>\n        </div>\n        <div class="field field-name-summary summary">\n            <p>' + builtData.description + '...</p>\n        </div>\n    </a>\n</div>\n</div>';
};

//this has class compact and no filters option
var modernCompactWrapper = exports.modernCompactWrapper = function modernCompactWrapper(inner, args) {
    return '\n    <div class="secondary">\n         ' + (args.heading ? '<h2>' + args.heading + '</h2>' : '') + '\n        <div class="cwd-component cwd-card-grid three-card singles compact no-thumbnails"> \n            <div id="cwd-homeEvents-list" class="compact no-thumbnails">\n                <!--no filters -->\n                <div class="events-list">\n                    ' + inner + '\n                </div>\n            </div><!--events listing -->\n        </div><!-- main-body -->\n    </div><!--end of section -->';
};

/***/ }),

/***/ "./js/templates/modernStandard.js":
/*!****************************************!*\
  !*** ./js/templates/modernStandard.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modernStandardWrapper = exports.moderStandardInner = undefined;

var _templateHelpers = __webpack_require__(/*! ./template-helpers */ "./js/templates/template-helpers.js");

var moderStandardInner = exports.moderStandardInner = function moderStandardInner(builtData) {
    return '<div class="card event-node dept-' + builtData.department + ' type-' + builtData.type + ' group-' + builtData.group_id + '" >\n                            <div class="events">\n                                <a href="' + builtData.event.localist_url + '" class="group-link-wrapper field-group-link">\n                                    <time title="' + builtData.event_date + '" datetime="' + builtData.dateTime + '">\n                                        <span class=\'month\'>' + builtData.abbrMonth + '</span>\n                                        <span class=\'day\'>' + builtData.day + '</span>\n                                    </time>\n                                    <div class="field title">\n                                        <h3>' + builtData.event.title + '</h3>\n                                    </div>\n                                    <div class="field meta">\n                                            <p>' + builtData.event_time + (builtData.event.location_name ? ', ' + builtData.event.location_name : '') + ' ' + tagStr(builtData.event.filters.event_types) + '</p>\n                                    </div>\n                                    <div class="field field-name-summary summary">\n                                        <p>' + builtData.description + '... read more</p> \n                                    </div>\n                                </a>\n                                ' + (builtData.addCal ? '' + (0, _templateHelpers.add_calender)(builtData.event) : '') + '  \n                            </div><!--events-->\n                        </div><!--card-->';
};

var modernStandardWrapper = exports.modernStandardWrapper = function modernStandardWrapper(inner, args) {
    return '\n    <section title="' + args.title + '">\n        ' + (args.heading ? '<h2>' + args.heading + '</h2>' : '') + '\n        <div>  \n            <div class="cwd-component cwd-card-grid three-card singles events-listing no-thumbnails">\n                ' + (0, _templateHelpers.eventFilters)(args.filters, args.target) + '\n                <div class="events-list">\n                    ' + inner + '\n                </div>\n            </div><!--events listing -->\n        </div><!-- main-body -->\n    </section><!--end of section -->';
};

var tagStr = function tagStr(event_types) {
    var spanStr = '';
    if (event_types) {
        event_types.forEach(function (element) {
            spanStr += '<span class="inline-events-type">' + element.name + '</span>';
        });
    }
    return spanStr;
};

/***/ }),

/***/ "./js/templates/standard.js":
/*!**********************************!*\
  !*** ./js/templates/standard.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.standardWrapper = exports.standardInner = undefined;

var _templateHelpers = __webpack_require__(/*! ./template-helpers */ "./js/templates/template-helpers.js");

//test for empty headings
var standardInner = exports.standardInner = function standardInner(builtData) {
    return '\n    ' + checkDate.month(builtData) + '\n    ' + checkDate.day(builtData) + '\n    <div class="event-node node dept-' + builtData.department + ' type-' + builtData.type + ' group-' + builtData.group_id + '">\n            <h3><a target="_blank" href="' + builtData.event.localist_url + '">' + builtData.event.title + '</a></h3>\n            ' + (builtData.event_time ? '<h4 class="meta date"><span class="start">' + builtData.event_time + '</span></h4>' : '') + '\n            ' + (builtData.event.location_name ? '<h4 class="meta location">' + builtData.event.location_name + '</h4>' : '') + '\n            ' + (builtData.event_types ? '<h4 class="meta type"><span class="fa"></span>' + builtData.event_types + '</h4>' : '') + '\n            <p class="description">' + builtData.description + ' \n                <a class="read-more more" href="' + builtData.event.localist_url + '/#" target="_blank">' + builtData.pref_readmore + '<span class=\'visually-hidden\'> about ' + builtData.event.title + '</span></a>\n            </p>\n            ' + (builtData.addCal ? '' + (0, _templateHelpers.add_calender)(builtData.event) : '') + '  \n    </div><!--end of node -->';
};

var standardWrapper = exports.standardWrapper = function standardWrapper(inner, args) {
    return '\n    <section title="' + args.title + '">\n    ' + (args.heading ? '<h2>' + args.heading + '</h2>' : '') + '\n        <div class="main-body">  \n            <div class="events-listing no-thumbnails" >\n                ' + (0, _templateHelpers.eventFilters)(args.filters, args.target) + '\n                <div class="events-list">\n                    ' + inner + '\n                </div>\n            </div><!--events listing -->\n        </div><!-- main-body -->\n    </section><!--end of section -->';
};

/* 
    tests to see if month / day should be displayed 
    for calendar page format 
*/
var CheckDate = function CheckDate() {
    var lastMonth = '';
    var lastDay = '';
    this.month = function (builtData) {
        if (lastMonth != builtData.month) {
            lastMonth = builtData.month;
            return '<h3 class="month-header">' + builtData.monthHeader + '</h3>';
        }
        return '';
    };
    this.day = function (builtData) {
        if (lastDay != builtData.displayDate) {
            lastDay = builtData.displayDate;
            return '<h4 class="day-header"><span class="fa fa-calendar-o"></span>' + builtData.displayDate + '</h4>';
        }
        return '';
    };
};

var checkDate = new CheckDate();

/***/ }),

/***/ "./js/templates/template-helpers.js":
/*!******************************************!*\
  !*** ./js/templates/template-helpers.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/* 
* filterObj has structure: obj.name, obj.id 
  @todo add a unique identifier
  attaches onClick handlers to window object

  this should probably be a class
  also tests that element exists
*/
var eventFilters = exports.eventFilters = function eventFilters(filterObjs, domTarget) {
    var targetElem = document.getElementById(domTarget);
    //handles filter events
    var toggleFilters = function toggleFilters(id, target) {
        //remove active class from all filter buttons
        var allFilterBtns = targetElem.getElementsByClassName('filter-btn');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = allFilterBtns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var value = _step.value;

                value.classList.remove('active');
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var elem = document.getElementById(id);
        //set the current item active
        elem.classList.add('active');

        //onclick button will only hide non target elements
        //hide all filter elements
        var allEvents = targetElem.getElementsByClassName('event-node');
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = allEvents[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _value = _step2.value;

                _value.classList.add('fadeOut');
            }

            //show the target elements
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        var targetElems = targetElem.getElementsByClassName(target);
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = targetElems[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _value2 = _step3.value;

                _value2.classList.remove('fadeOut');
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    };
    var showAllEvents = function showAllEvents() {
        //remove active class from all filter buttons
        var allFilterBtns = targetElem.getElementsByClassName('filter-btn');
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = allFilterBtns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var value = _step4.value;

                value.classList.remove('active');
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        var elem = document.getElementById('filterAll-' + domTarget);
        //set the current item active
        elem.classList.add('active');

        //show all filter elements
        var allEvents = targetElem.getElementsByClassName('event-node');
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = allEvents[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var _value3 = _step5.value;

                _value3.classList.remove('fadeOut');
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }
    };
    // attach event handlers to window

    window['toggleFilters' + domTarget] = toggleFilters;
    window['showAllEvents' + domTarget] = showAllEvents;

    return '\n        <div class=\'events-filters-wrap\' ><h3 class="hidden">Show:</h3>\n            <ul class="events-filters">\n                <li><button id="filterAll-' + domTarget + '" data-filter="all" class="filter-btn active" onClick="showAllEvents' + domTarget + '()">All Events</button></li>\n                ' + (filterObjs ? Object.keys(filterObjs).map(function (key, index) {
        return '<li><button id=\'filter' + filterObjs[key].id + '-' + domTarget + '\' data-filter="' + filterObjs[key].pref_category + '-' + filterObjs[key].id + '" class="filter-btn" onclick="toggleFilters' + domTarget + '(\'filter' + filterObjs[key].id + '-' + domTarget + '\', \'' + filterObjs[key].pref_category + '-' + filterObjs[key].id + '\')">' + filterObjs[key].name + '</button></li>';
    }).join('') : '') + '\n            </ul>\n        </div>\n    ';
};

var add_calender = exports.add_calender = function add_calender(myEvent) {
    /* ----------------- build calander links -------------------------- */
    var buidGoogleStr = function buidGoogleStr(myObj) {
        var mySD = myObj.event_instances[0].event_instance.start.split('T')[0];
        var gDateStart = mySD.split('-')[0] + mySD.split('-')[1] + mySD.split('-')[2];
        //this may not work as intended for repeating events
        var myED = myObj.last_date;
        var gDateStop = myED.split('-')[0] + myED.split('-')[1] + myED.split('-')[2];
        return '\n                <a class="fa fa-google google" \n                    href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;dates=' + gDateStart + '%2F' + gDateStop + '&amp;details=' + encodeURIComponent(myObj.description_text.replace(/[\r\n]/g, '<br />')) + '&amp;location=' + encodeURIComponent(myObj.location) + '&amp;sprop=website%3Aevents.cornell.edu&amp;text=' + encodeURIComponent(myObj.title) + '" title="Save to Google Calendar" target="_blank">\n                <span class="sr-only">Add ' + myObj.title + ' to Google Calendar</span>\n                </a>\n                ';
    };

    var buildiCal = function buildiCal(myObj) {
        return '\n                        <a class="fa fa-calendar apple" href="' + myObj.localist_ics_url + '/#" title="Save to iCal" target="_blank" >\n                        <span class=\'sr-only\'>Add ' + myObj.title + ' to iCal</span>\n                        </a>\n                        ';
    };

    var buildOutlookCal = function buildOutlookCal(myObj) {
        return '\n                        <a class="fa fa-clock-o microsoft" href="' + myObj.localist_ics_url + '" title="Save to Outlook" target="_blank" >\n                            <span class=\'sr-only\'>Add ' + myObj.title + ' to Outlook</span>\n                        </a>\n                        ';
    };

    /* ------------------ END OF BUILD LINKS --------------------------- */
    return '<span class="event-subscribe">add to calendar\n            ' + buidGoogleStr(myEvent) + ' ' + buildiCal(myEvent) + ' ' + buildOutlookCal(myEvent) + '\n            </span>';
};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./styles/app.scss":
/*!********************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./styles/app.scss ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* begin event */\n/* CWD Localist Events\r\n\t ************************************ */\n.events-listing {\n  position: relative;\n  float: left;\n  width: 100%;\n  margin: 1em 0 2em;\n  min-height: 120px; }\n  .events-listing .node {\n    float: left;\n    width: 100%;\n    margin: 1em 0 2em; }\n    .events-listing .node h3 {\n      margin-bottom: 8px;\n      font-family: Avenir Next, Proxima Nova, 'proxima-nova', Segoe UI Bold, Helvetica Neue, sans-serif;\n      font-weight: 600;\n      font-size: 16px; }\n  .events-listing h4 {\n    text-transform: none; }\n  .events-listing .description {\n    clear: right;\n    padding-left: 112px;\n    /* disable to allow description text to wrap around the thumbnail */\n    font-size: 13px; }\n  .events-listing.hide-descriptions .description {\n    float: left;\n    width: 100%;\n    clear: both;\n    padding: 0 !important; }\n  .events-listing .description-content {\n    padding: 0 1em 1em; }\n  .events-listing .description :last-child {\n    margin-bottom: 0; }\n  .events-listing .event-image {\n    width: 100px;\n    height: auto;\n    float: left;\n    margin: 0 12px 0 0; }\n  .events-listing .meta {\n    font-weight: normal;\n    font-size: 1em;\n    color: #666;\n    margin-bottom: 12px; }\n  .events-listing .type {\n    float: left;\n    display: none; }\n  .events-listing .location {\n    float: right; }\n  .events-listing .date {\n    float: right;\n    margin-left: 20px; }\n    .events-listing .date .fulldate {\n      margin-right: 5px; }\n  .events-listing .event-details {\n    /*float: left;*/\n    clear: right;\n    padding-left: 112px;\n    /* disable to allow this button to clear the thumbnail */ }\n    .events-listing .event-details .fa {\n      font-size: 7px;\n      /*background: #3787b0;*/\n      background: #f0eada;\n      color: #99802b;\n      padding: 3px;\n      margin-right: 4px;\n      -moz-border-radius: 2px;\n      -webkit-border-radius: 2px;\n      border-radius: 2px;\n      position: relative;\n      top: -2px; }\n    .events-listing .event-details a {\n      text-decoration: none; }\n      .events-listing .event-details a:hover .fa {\n        background: #f8f4ec;\n        /*background: rgba(0,0,0,0.7);*/\n        color: #000; }\n    .events-listing .event-details h4 {\n      font-size: 11px;\n      font-weight: 400; }\n  .events-listing .month-header {\n    text-align: center;\n    color: #fff;\n    background: #597F34;\n    float: left;\n    width: 100%;\n    padding: 9px 0;\n    margin-top: 12px;\n    font-size: 20px; }\n  .events-listing .day-header {\n    font-size: 14px;\n    border-top: 1px solid #e0e0e0;\n    padding: 10px 0 5px;\n    margin-bottom: 5px;\n    float: left;\n    width: 100%;\n    background: #fff;\n    background: -moz-linear-gradient(45deg, #ffffff 0%, #f2f2f2 100%);\n    background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, #ffffff), color-stop(100%, #f2f2f2));\n    background: -webkit-linear-gradient(45deg, #ffffff 0%, #f2f2f2 100%);\n    background: -o-linear-gradient(45deg, #ffffff 0%, #f2f2f2 100%);\n    background: -ms-linear-gradient(45deg, #ffffff 0%, #f2f2f2 100%);\n    background: linear-gradient(45deg, #ffffff 0%, #f2f2f2 100%);\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#f2f2f2',GradientType=1 );\n    font-family: Avenir Next, Proxima Nova, 'proxima-nova', Segoe UI Semibold, Helvetica Neue, sans-serif;\n    font-weight: 500; }\n    .events-listing .day-header .fa:before {\n      font-size: 14px;\n      margin: 0 8px 0 0;\n      color: #555;\n      padding-left: 1px; }\n\n/* event details toggle */\n@-moz-document url-prefix() {\n  /* FF */\n  .events-listing .event-details .fa {\n    font-size: 7.1px; } }\n\n/* Compact Mode\r\n\t -------------------- */\n.events-listing.compact {\n  margin-top: 0; }\n  .events-listing.compact #events-filters {\n    display: none; }\n  .events-listing.compact .node {\n    border-bottom: 1px solid #e0e0e0;\n    margin: 0.5em 0 0.6em; }\n    .events-listing.compact .node:last-child {\n      border: 0; }\n    .events-listing.compact .node h3 {\n      font-size: 14px; }\n  .events-listing.compact .meta {\n    font-size: 13px; }\n  .events-listing.compact .location {\n    float: left;\n    width: 60%;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  .events-listing.compact .description {\n    font-size: 11px;\n    padding-left: 0;\n    clear: both; }\n  .events-listing.compact .event-details {\n    padding-left: 0;\n    clear: both; }\n\n.events-listing.no-thumbnails .description, .events-listing.no-thumbnails .event-details {\n  padding-left: 0;\n  clear: both; }\n\n.events-listing.compact .date .fulldate {\n  margin: 0 0 0 5px;\n  padding: 3px 7px;\n  margin-top: -3px;\n  float: right;\n  background: #f2f2f2;\n  -moz-border-radius: 2px;\n  -webkit-border-radius: 2px;\n  border-radius: 2px; }\n\n.events-listing .type .fa:before {\n  margin-right: 5px;\n  content: '\\F124';\n  font-size: 14px; }\n\n.events-listing .location {\n  float: left;\n  width: 75%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.events-listing.compact .location {\n  width: 70%; }\n\n.events-listing.compact .date .start, .events-listing.compact .description {\n  display: none; }\n\n/* compact filters */\nul.events-filters {\n  width: 100%;\n  float: left; }\n  ul.events-filters li {\n    margin-right: 4px; }\n    ul.events-filters li:last-child {\n      border: 0;\n      margin-right: 0; }\n    ul.events-filters li a {\n      padding: 2px 10px 1px;\n      -moz-border-radius: 2px;\n      -webkit-border-radius: 2px;\n      border-radius: 2px;\n      font-size: 13px; }\n\n.win ul.events-filters li {\n  margin-right: 2px; }\n  .win ul.events-filters li:last-child {\n    margin-right: 0; }\n  .win ul.events-filters li a {\n    padding: 2px 8px 1px; }\n\n/* calendar */\n/***** Events *****/\n.event-month-and-day {\n  text-align: center;\n  line-height: 17px;\n  border-left: 4px solid #b31b1b;\n  border-right: 1px solid #eee;\n  padding: 3px 0 8px 8px;\n  margin-left: 18px;\n  margin-top: 4px;\n  height: 50px; }\n  .event-month-and-day .event-month {\n    float: left;\n    text-transform: uppercase;\n    color: #767676;\n    display: block;\n    font-size: 12px;\n    padding-left: 4px; }\n  .event-month-and-day .event-day {\n    clear: both;\n    color: #000;\n    font-weight: 600;\n    font-size: 18px;\n    display: block;\n    letter-spacing: -3px;\n    text-align: left; }\n    .event-month-and-day .event-day sup {\n      top: -6px;\n      font-size: 10px;\n      margin-left: 3px;\n      letter-spacing: .005em; }\n\n.event-title-and-location a {\n  text-decoration: underline;\n  font-size: 16px;\n  margin-bottom: 7px;\n  display: inline-block;\n  text-align: left; }\n  .event-title-and-location a:focus, .event-title-and-location a:hover {\n    text-decoration: none !important; }\n\n.event-title-and-location .event-location, .event-title-and-location .event-times {\n  padding: 0 7px; }\n\n.events-listing-inline {\n  background: #fff;\n  padding: 16px 10px 16px 6px;\n  margin-bottom: 0;\n  margin-top: 0;\n  /*padding-bottom: 114px;*/ }\n\n#block-eventsblock {\n  padding: 22px; }\n  #block-eventsblock h2 {\n    color: #000;\n    margin: 8px 0 0 0;\n    font-size: 34px;\n    float: none;\n    background: #fff;\n    padding: 13px 0 10px 20px; }\n\n.events-listing-inline .events-list .views-row {\n  margin-bottom: 23px; }\n\n.events-listing-inline .events-list .event-title-and-location {\n  width: 74.66667%; }\n\n@media (min-width: 768px) {\n  .col-sm-2 {\n    width: 16.66667%; } }\n\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left; } }\n\n.col-sm-8.event-title-and-location {\n  /* min-width: 62%; */\n  word-wrap: break-word;\n  width: 300px;\n  padding: 10px; }\n\n.views-row {\n  max-width: 500px; }\n\nspan.fa.fa-clock-o, span.fa.fa-map-marker {\n  margin-right: 10px; }\n\n.event-subscribe {\n  float: right;\n  font-size: 13px;\n  padding-bottom: 20px; }\n  .event-subscribe > a {\n    font-size: 20px;\n    padding-right: 8px;\n    color: #111;\n    text-decoration: none;\n    display: inline-block !important; }\n  .event-subscribe a:first-child {\n    padding-left: 10px; }\n\n.events a {\n  margin-bottom: 20px; }\n\ndiv.container-fluid {\n  padding-left: 0px;\n  padding-right: 0px; }\n\n/* Events */\n#home-events {\n  background: #f4f6f8;\n  padding-top: 40px;\n  padding-bottom: 40px;\n  overflow: hidden; }\n  #home-events .header-with-button {\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center; }\n  #home-events .link-more .fa {\n    margin: 0 -0.05em 0 0.5em;\n    position: static; }\n  #home-events .cwd-component {\n    margin: 0 auto 2.5em;\n    max-width: 480px;\n    float: none; }\n\n#home-social .cwd-component, #home-social .twitter {\n  margin: 0 auto 2.5em;\n  max-width: 480px;\n  float: none; }\n\n#elements {\n  margin: 0 auto 2.5em;\n  max-width: 480px;\n  float: none; }\n\n.cwd-component .events .field {\n  clear: both; }\n\n.cwd-component .events time {\n  width: auto;\n  min-height: 0;\n  margin: 0 0 1em; }\n  .cwd-component .events time .month {\n    float: left;\n    font-size: 15px;\n    line-height: 1;\n    font-weight: 400;\n    padding: 9px 12px;\n    background: #b83739;\n    color: #f8e0c4;\n    text-transform: uppercase; }\n  .cwd-component .events time .day {\n    float: left;\n    font-size: 15px;\n    line-height: 1;\n    font-weight: 400;\n    padding: 9px 12px;\n    background: #b83739;\n    background: #a63133; }\n\n.cwd-component .events h3 {\n  width: 100%;\n  font-size: 21px;\n  line-height: 1.4;\n  margin-bottom: 0.25em;\n  font-family: Iowan Old Style, Georgia, Athelas, Baskerville, Sitka Display, Constansia, serif; }\n\n.cwd-component .events .meta {\n  color: #767676;\n  font-size: 13px;\n  font-weight: 400; }\n\n.events-listing > div.events-list > div > div > a {\n  margin: 0px 0 25px 0 !important; }\n\n.cwd-component .events a {\n  display: block;\n  text-decoration: none;\n  color: #000;\n  transition: background 0.15s, box-shadow 0.15s; }\n  .cwd-component .events a:hover h3, .cwd-component .events a:focus h3 {\n    text-decoration: underline;\n    color: #127cb5; }\n  .cwd-component .events a:active h3 {\n    color: #000; }\n  .cwd-component .events a:hover, .cwd-component .events a:focus {\n    background: rgba(0, 0, 0, 0.05);\n    box-shadow: 0 0 0 15px rgba(0, 0, 0, 0.05); }\n  .cwd-component .events a:active {\n    background: rgba(0, 0, 0, 0.09);\n    box-shadow: 0 0 0 15px rgba(0, 0, 0, 0.09); }\n\na.view-all-events {\n  display: inline-block;\n  text-decoration: none;\n  text-align: right;\n  width: 100%;\n  padding: 5px 0;\n  text-transform: uppercase;\n  font-weight: bold; }\n  a.view-all-events:hover, a.view-all-events:focus, a.view-all-events:active {\n    text-decoration: underline; }\n\n.padded-left {\n  padding-left: 10px; }\n\n.events-filters-wrap ul {\n  margin-bottom: 5px !important; }\n\n.inline-events-type {\n  float: none;\n  padding: 2px 8px 1px;\n  background: #FCF3E1;\n  -moz-border-radius: 4px;\n  -webkit-border-radius: 4px;\n  border-radius: 4px;\n  text-decoration: none !important;\n  color: #000;\n  margin-left: 10px; }\n\n/* Category Filters\r\n  -------------------- */\n.events-filters-wrap {\n  float: left;\n  width: 100%;\n  margin: 10px 0; }\n  .events-filters-wrap ul {\n    margin: 0; }\n  .events-filters-wrap h3 {\n    float: left;\n    font-size: 14px;\n    line-height: 24px;\n    margin: 0;\n    padding: 2px 8px 2px 0; }\n\nul.events-filters li {\n  float: left;\n  list-style: none;\n  background: none;\n  line-height: 24px;\n  margin: 0 5px 5px 0;\n  padding: 0; }\n  ul.events-filters li button {\n    float: left;\n    padding: 5px 13px 5px;\n    background: #e7eff3;\n    -moz-border-radius: 4px;\n    -webkit-border-radius: 4px;\n    border-radius: 4px;\n    text-decoration: none !important;\n    border-style: none; }\n    ul.events-filters li button.active {\n      color: #fff !important;\n      background: #4B7995 !important; }\n    ul.events-filters li button:hover {\n      background: #d3e1e8;\n      color: #000; }\n\n/* hide / show \r\n    -used for filtered event nodes \r\n  -------------------------------------*/\n/*@ todo make this actually fade out */\n.fadeOut {\n  display: none; }\n\n.fadeIn {\n  display: block; }\n\n/* Animated Loading Icon\r\n    -------------------- */\n#loader {\n  /*display: none;*/\n  position: absolute;\n  left: 45%;\n  left: calc(50% - 25px);\n  top: 60px;\n  width: 50px;\n  text-align: center;\n  font-size: 24px;\n  color: #ccc;\n  color: rgba(0, 0, 0, 0.2); }\n\n/* Add To Calendar \r\n  -----------------*/\n.google {\n  color: #2d863e !important; }\n\n.microsoft {\n  color: #017bb1 !important; }\n\n.apple {\n  color: #545a5f !important; }\n\n/* required change to visually hidden*/\n.hidden {\n  position: absolute;\n  left: -10000em;\n  top: auto;\n  width: 1px;\n  height: 1px;\n  overflow: hidden; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),

/***/ "./styles/app.scss":
/*!*************************!*\
  !*** ./styles/app.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./app.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./styles/app.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map