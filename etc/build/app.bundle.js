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

var _localList = __webpack_require__(/*! ./service/local-list */ "./js/service/local-list.js");

var service = _interopRequireWildcard(_localList);

var _buildEvent = __webpack_require__(/*! ./buildEvent */ "./js/buildEvent.js");

var _standard = __webpack_require__(/*! ./templates/standard */ "./js/templates/standard.js");

var _compact = __webpack_require__(/*! ./templates/compact */ "./js/templates/compact.js");

var _calendar = __webpack_require__(/*! ./templates/calendar */ "./js/templates/calendar.js");

var _modernCompact = __webpack_require__(/*! ./templates/modernCompact */ "./js/templates/modernCompact.js");

var _modernStandard = __webpack_require__(/*! ./templates/modernStandard */ "./js/templates/modernStandard.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//expose the localList via run function
module.exports = {
    run: function run(args) {
        var LL = new LocalList(args);
        /*
         add custom templates here:
         localList.innerTemplate = (data)=>`<p>${data.event.title}</p>`;
         build the outer wrapper at a minimum this must contain innerHtml
         localList.outerTemplate = (innerHTML, args)=>`<h2>${args.heading}</h2>${innerHTML}`;
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
    
    or with calendar
    
    const settings = { target:'events-listing', depts:0, entries:10, format:'calendar', group:0, singleday:false, keyword:'Small Farms Program'};
    let localList = new LocalList( settings ).renderEvents();
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

        //console.log(arguments);
        // local variables arguments 
        //used in filters
        this.pref_category = pref_category;
        this.pref_category_filters = pref_category_filters;

        this.target = target;
        this.format = format;

        //standard wrapper variables 
        this.wrapperArgs = {};
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
         */

    }, {
        key: "addThrobber",
        value: function addThrobber(target) {
            var loadingNode = '<div id="loader" class="fadeOut"><span class="fa fa-spin fa-cog"></span></div>';
            document.getElementById(target).insertAdjacentHTML('afterbegin', loadingNode);
            this.c_loader = setTimeout(function () {
                document.getElementById('loader').classList.remove('fadeOut');
            }, 200); // skip loading animation if under 0.5s
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
                //console.log( builtEvent );
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

                inner += _this2.innerTemplate(builtEvent);
            });

            var html = this.outerTemplate(inner, this.wrapperArgs);

            //remove loading animation timer
            clearTimeout(this.c_loader);
            //the loader is replaced by html
            //document.getElementById('loader').classList.remove('fadeIn'); 
            document.getElementById(this.target).innerHTML = html;
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
    return '\n    <section title="' + args.title + '">\n        <h2 class="block-title">' + args.heading + '</h2>\n        <div class="events-listing no-thumbnails" id="events-listing">\n            ' + innerHtml + '\n        </div>\n    </section>';
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
    return '\n    <div class="event-node node dept-' + builtData.department + ' type-' + builtData.type + ' group-' + builtData.group_id + '">\n    <h3><a target="_blank" href="' + builtData.event.localist_url + '">' + builtData.event.title + '</a></h3>\n    <h4 class="meta date"><span class="fulldate">' + builtData.event_date_compact + '</span> \n    <h4 class="meta location">' + builtData.event.location_name + '</h4>\n    <p class="description">' + builtData.description + ' \n    <a class="read-more more" href="' + builtData.event.localist_url + '" target="_blank">' + builtData.pref_readmore + '</a>\n    </p>\n    ' + (builtData.addCal ? '' + (0, _templateHelpers.add_calender)(builtData.event) : '') + '  \n    </div><!--end of node -->\n    ';
};
//this has class compact only difference
var compactWrapper = exports.compactWrapper = function compactWrapper(inner, args) {
    return '\n    <section title="' + args.title + '">\n        <h2>' + args.heading + '</h2>\n        <div id="main-body">  \n            <div class="events-listing no-thumbnails" id="events-listing compact">\n                <!--filters options not supported -->\n                <div class="events-list">\n                    ' + inner + '\n                </div>\n            </div><!--events listing -->\n        </div><!-- main-body -->\n    </section><!--end of section -->';
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
var modernCompactInner = exports.modernCompactInner = function modernCompactInner(builtData) {
    return '<div class="card">\n<div class="events">\n    <a href="' + builtData.event.localist_url + '" class="group-link-wrapper field-group-link">\n        <time title="' + builtData.event_date + '" datetime="' + builtData.displayDate + '">\n            <month>' + builtData.abbrMonth + '</month>\n            <day>' + builtData.day + '</day>\n        </time>\n        <div class="field title">\n            <h3>' + builtData.event.title + '</h3>\n        </div>\n        <div class="field meta">\n            <p>' + builtData.event_time + ', ' + builtData.event.location_name + '</p>\n        </div>\n        <div class="field field-name-summary summary">\n            <p>' + builtData.description + '...</p>\n        </div>\n    </a>\n</div>\n</div>';
};

//this has class compact only difference
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
    return '<div class="card event-node dept-' + builtData.department + ' type-' + builtData.type + ' group-' + builtData.group_id + '" >\n                            <div class="events">\n                                <a href="' + builtData.event.localist_url + '" class="group-link-wrapper field-group-link">\n                                <time title="' + builtData.event_date + '" datetime="' + builtData.displayDate + '">\n                                    <month>' + builtData.abbrMonth + '</month>\n                                    <day>' + builtData.day + '</day>\n                                    </time>\n                                    <div class="field title">\n                                    <h3>' + builtData.event.title + '</h3>\n                                    </div>\n                                    <div class="field meta">\n                                        <p>' + builtData.event_time + ', ' + builtData.event.location_name + ' ' + tagStr(builtData.event.filters.event_types) + '</p>\n                                    </div>\n                                    <div class="field field-name-summary summary">\n                                        <p>' + builtData.description + '... read more</p> \n                                    </div>\n                                </a>\n                                ' + (builtData.addCal ? '' + (0, _templateHelpers.add_calender)(builtData.event) : '') + '  \n                            </div>\n                        </div>';
};

var modernStandardWrapper = exports.modernStandardWrapper = function modernStandardWrapper(inner, args) {
    return '\n    <section title="' + args.title + '">\n        ' + (args.heading ? '<h2>' + args.heading + '</h2>' : '') + '\n        <div>  \n            <div class="cwd-component cwd-card-grid three-card singles events-listing no-thumbnails" id="events-listing">\n                ' + (0, _templateHelpers.eventFilters)(args.filters) + '\n                <div class="events-list">\n                    ' + inner + '\n                </div>\n            </div><!--events listing -->\n        </div><!-- main-body -->\n    </section><!--end of section -->';
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

var standardInner = exports.standardInner = function standardInner(builtData) {
    return '\n    ' + checkDate.month(builtData) + '\n    ' + checkDate.day(builtData) + '\n    <div class="event-node node dept-' + builtData.department + ' type-' + builtData.type + ' group-' + builtData.group_id + '">\n            <h3><a target="_blank" href="' + builtData.event.localist_url + '">' + builtData.event.title + '</a></h3>\n            <h4 class="meta date"><span class="start">' + builtData.event_time + '</span></h4>\n            <h4 class="meta location">' + builtData.event.location_name + '</h4>\n            <h4 class="meta type"><span class="fa"></span>' + builtData.event_types + '</h4>\n            <p class="description">' + builtData.description + ' \n                <a class="read-more more" href="' + builtData.event.localist_url + '" target="_blank">' + builtData.pref_readmore + '</a>\n            </p>\n            ' + (builtData.addCal ? '' + (0, _templateHelpers.add_calender)(builtData.event) : '') + '  \n    </div><!--end of node -->';
};

var standardWrapper = exports.standardWrapper = function standardWrapper(inner, args) {
    return '\n    <section title="' + args.title + '">\n        <h2>' + args.heading + '</h2>\n        <div id="main-body">  \n            <div class="events-listing no-thumbnails" id="events-listing">\n                ' + (0, _templateHelpers.eventFilters)(args.filters) + '\n                <div class="events-list">\n                    ' + inner + '\n                </div>\n            </div><!--events listing -->\n        </div><!-- main-body -->\n    </section><!--end of section -->';
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
* filterObj has structer obj.name obj.id 
*/
var eventFilters = exports.eventFilters = function eventFilters(filterObjs) {

    //handles filter events
    var toggleFilters = function toggleFilters(id, target) {
        //remove active class from all filter buttons
        var allFilterBtns = document.getElementsByClassName('filter-btn');
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
        var allEvents = document.getElementsByClassName('event-node');
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

        var targetElems = document.getElementsByClassName(target);
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
        var allFilterBtns = document.getElementsByClassName('filter-btn');
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

        var elem = document.getElementById('filterAll');
        //set the current item active
        elem.classList.add('active');

        //show all filter elements
        var allEvents = document.getElementsByClassName('event-node');
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
    window.toggleFilters = toggleFilters;
    window.showAllEvents = showAllEvents;

    return '\n        <div id="events-filters"><h3 class="hidden">Show:</h3>\n            <ul class="events-filters">\n                <li><button id="filterAll" data-filter="all" class="filter-btn active" onClick="showAllEvents()">All Events</button></li>\n                ' + (filterObjs ? Object.keys(filterObjs).map(function (key, index) {
        return '<li><button id=\'filter' + filterObjs[key].id + '\' data-filter="' + filterObjs[key].pref_category + '-' + filterObjs[key].id + '" class="filter-btn" onclick="toggleFilters(\'filter' + filterObjs[key].id + '\', \'' + filterObjs[key].pref_category + '-' + filterObjs[key].id + '\')">' + filterObjs[key].name + '</button></li>';
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
        return '\n                <a class="fa fa-google google" \n                    href=\'https://calendar.google.com/calendar/event?action=TEMPLATE&amp;dates=' + gDateStart + '%2F' + gDateStop + '&amp;details=' + encodeURIComponent(myObj.description_text.replace(/[\r\n]/g, "<br />")) + '&amp;location=' + myObj.location + '&amp;sprop=website%3Aevents.cornell.edu&amp;text=' + myObj.title + '\' title="Save to Google Calendar" target="_blank">\n                <span class="sr-only">Google Calendar</span>\n                </a>\n                ';
    };

    var buildiCal = function buildiCal(myObj) {
        return '\n                        <a class="fa fa-calendar apple" href="' + myObj.localist_ics_url + '" title="Save to iCal" target="_blank" >\n                        <span class=\'sr-only\'>iCal</span>\n                        </a>\n                        ';
    };

    var buildOutlookCal = function buildOutlookCal(myObj) {
        return '\n                        <a class="fa fa-clock-o microsoft" href="' + myObj.localist_ics_url + '" title="Save to Outlook" target="_blank" >\n                            <span class=\'sr-only\'>Outlook</span>\n                        </a>\n                        ';
    };

    /* ------------------ END OF BUILD LINKS --------------------------- */
    return '<dd class="event-subscribe" id="event_subscribe">add to calendar\n            ' + buidGoogleStr(myEvent) + ' ' + buildiCal(myEvent) + ' ' + buildOutlookCal(myEvent) + '\n            </dd>';
};

/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map