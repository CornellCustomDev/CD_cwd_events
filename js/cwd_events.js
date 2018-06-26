/* Cornell Events Calendar (ama39, January 2015) */


/* Global Settings 
   -------------------------------------------------------------------------- */

var api = '2.1'; // Localist API version (e.g., '2' for the latest 2.x, '2.1' for the specific point release) 
var pref_date_headers = true; // include month and day headers (if set to 'false', the full date will instead display on each entry) TODO: separate into two preferences
var pref_show_time = true; // include time
var pref_show_endtime = false; // include end time (requires 'pref_show_time' to be true)
var pref_show_location = true; // include location
var pref_show_type = true; // include event type(s)
var pref_show_thumbs = false; // include thumbnails (thumbnails are always off in "compact" mode)
var pref_hide_desc = false; // hides event descriptions and provides toggle functionality
var pref_excerpt_length = 250; // use 0 for no truncation, using truncation will force descriptions to plaintext
var pref_excerpt_length_compact = 125; // excerpt length can be made shorter for 'compact' mode
var pref_allow_rich = true; // setting to false will force plaintext descriptions (only affects api 2.1 or later)
var pref_days = 365; // range of days to retrieve (overridden by "singleday" requests)
var pref_distinct = true; // controls the "distinct" filter for the events query ('true' only returns one instance of a repeating event)
var pref_readmore = 'read more'; // label for "read more" links at the end of truncated excerpts 
var pref_eventdetails = 'event details'; // label for "event details" toggle buttons
var pref_archive_range = 6; // number of past months to retrieve (legacy API 2.0 only)
var pref_category = 'group'; // the event "type" label can be replaced with other localist values to act as custom categorization (currently supports: 'type','dept','group')
var pref_category_filters = true; // include filtering based on 'pref_category'
var pref_alpha_categories = true; // alphabatize the filters (if 'false', their order will be pseudo-random, based on the order of events in the Localist response)

/* detect feature support */
var supports_rich = false;
var supports_direction = false;
if (parseFloat(api) >= 2.1) {
    supports_rich = true; // rich text descriptions (HTML) were added in API 2.1
    supports_direction = true; // "direction" (asc/desc) was added in API 2.1
}



/* renderEvents() -- initializes and renders events on document.ready
   -------------------------------------------------------------------------- */
/* 
    Parameters:
        target: the DOM container where events will be displayed (required)
        depts: the department(s) to be included, by ID (single dept ID or an array of multiple IDs)
        entries: max number of events to retrieve (max 100 in API 2.1+)
        format: possible values include 'standard' (default), 'compact' (omits thumbnails, type, and end-time, and includes "compact" class for independent styling), and "archive" (past events in reverse chronological order)
        group: another Localist filter option (can be used alone or in combination with 'depts' and 'keyword') 
        singleday: can be used to specify a single day to display events from (e.g., the focused days of Charter Day Weekend)
        keyword: display events with a specific tag or keyword (can be used alone or in combination with 'depts' and 'group')
        
    Examples: 
        renderEvents('events-listing',4212,15);
        -> targets #events-listing, and outputs up to 15 entries from dept 4212 (the Department of Music)
        renderEvents('main',4212,50,'archive');
        -> targets #main, and outputs up to the 50 most recent *past* events from dept 4212
        renderEvents('events',0,50,'standard',0,'2015-04-24','Charter Day Weekend');
        -> targets #events, and outputs up to 50 entries with the tag "Charter Day Weekend," from any dept, and only from a specific day in April

   -------------------------------------------------------------------------- */

function renderEvents(target, depts, entries, format, group, singleday, keyword) {
    depts = (typeof depts === 'undefined') ? 0 : depts;
    entries = (typeof entries === 'undefined') ? 3 : entries;
    format = (typeof format === 'undefined') ? 'standard' : format;
    group = (typeof group === 'undefined') ? 0 : group;
    singleday = (typeof singleday === 'undefined') ? false : singleday;
    keyword = (typeof keyword === 'undefined') ? false : keyword;
        
    jQuery(document).ready(function($){
        
        var month_array = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var month_array_abb = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var day_array = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var day_array_abb = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        var current_year;
        var current_month;
        var current_day;
        
        // calculate date ranges (including archive options)
        var today = new Date();
        var today_month = today.getMonth();
        var today_year = today.getFullYear();
        var past_year = today_year;
        var past_month = today_month - pref_archive_range; // past x months (legacy API 2.0)
        if (past_month < 0) {
            past_month += 12;
            past_year -= 1;
        }
        var start_results = today.getFullYear() + '-' + addLeadingZero(parseInt(today.getMonth()+1)) + '-' + addLeadingZero(today.getDate());
        var end_results = parseInt(today.getFullYear()+1) + '-' + addLeadingZero(parseInt(today.getMonth()+1)) + '-' + addLeadingZero(today.getDate()); // 'end_results' is only used for archive mode in legacy API 2.0
        if (format == 'archive') {
            end_results = start_results;
            if (supports_direction) {
                start_results = (today.getFullYear()-1) + '-' + addLeadingZero(parseInt(today.getMonth()+1)) + '-' + addLeadingZero(today.getDate());
            }
            else { // legacy API 2.0
                start_results = past_year + '-' + addLeadingZero(parseInt(past_month+1)) + '-' + addLeadingZero(today.getDate());
            }
        }
                    
        // single day option
        if (singleday) {
            start_results = singleday;
            pref_days = 1;
        }
        
        // build query filters
        query = {
            api_key: 'KLhy2GtuSAGirYGY',
            pp: entries,
            start: start_results,
            days: pref_days,
            distinct: pref_distinct
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
        }
        else {
            query.days = pref_days;
        }
        if (format == 'archive' && supports_direction) {
            query.direction = 'desc';
        }
        
        // loading animation icon (requires Font Awesome)
        $('#'+target).append('<div id="loader"><span class="fa fa-spin fa-cog"></span></div>');
        var c_loader = setTimeout(function(){ $('#loader').fadeIn(50); }, 500); // skip loading animation if under 0.5s
                    
        // send query
        $.ajax({
            url: '//events.cornell.edu/api/'+api+'/events',
            dataType: 'jsonp',
            crossDomain: true,
            data: query,
            complete: function(xhr, status) {
                // cancel loading animation
                clearTimeout(c_loader);
                $('#loader').fadeOut(200);
            },
            success: function(json) {
                //console.log(json); // response object
                
                var events = json.events;
                var department_ids = [];
                var department_names = [];
                var events_container = $('<div class="events-list">');
                if (format == 'compact') {
                    $('#'+target).addClass('compact');
                }
                if (!pref_show_type) {
                    $('#'+target).addClass('no-type');
                }
                if (!pref_show_location) {
                    $('#'+target).addClass('no-location');
                }
                if (!pref_show_thumbs) {
                    $('#'+target).addClass('no-thumbnails');
                }
                if (pref_hide_desc) {
                    $('#'+target).addClass('hide-descriptions');
                }
                // archive custom sorting
                if (format == 'archive' && !supports_direction) {
                    events = events.reverse(); // legacy API 2.0
                }
                
                // Data Selection and Processing
                for (i=0;i<events.length;i++) {
                    
                    // basic event data
                    title = events[i].event.title;
                    localist_url = events[i].event.localist_url;
                    location_name = events[i].event.location_name;
                    room_number = events[i].event.room_number;
                    venue_url = events[i].event.venue_url;
                    photo_url = events[i].event.photo_url.replace('/huge/','/big/'); // retrieve thumbnail size
                    
                    // description (with rich text and excerpt options)
                    excerpt_length = pref_excerpt_length;
                    if (format == 'compact') {
                        excerpt_length = pref_excerpt_length_compact;
                    }
                    
                    if (!supports_rich) {
                        if (excerpt_length > 0 && events[i].event.description.length > excerpt_length) {
                            description = $.trim($.trim(events[i].event.description).substring(0, excerpt_length).split(' ').slice(0, -1).join(' '));
                        }
                        else {
                            description = events[i].event.description;
                        }
                    }
                    else {
                        if (excerpt_length > 0) {
                            if (events[i].event.description_text.length > excerpt_length) {
                                description = $.trim($.trim(events[i].event.description_text).substring(0, excerpt_length).split(' ').slice(0, -1).join(' '));
                            }
                            else {
                                description = events[i].event.description_text;
                            }
                            // TODO: add support for Rich Text (HTML) truncation
                        }
                        else {
                            if (pref_allow_rich) {
                                description = events[i].event.description;
                            }
                            else {
                                description = events[i].event.description_text;
                            }
                        }
                    }
                    
                    // date and time
                    event_fulldate = new Date(events[i].event.event_instances[0].event_instance.start);
                    event_day = day_array_abb[event_fulldate.getDay()];
                    event_date = events[i].event.event_instances[0].event_instance.start.split('T')[0];
                    event_time = events[i].event.event_instances[0].event_instance.start.split('T')[1];
                    event_time = convertTime(event_time); // convert to 12-hour format
                    year = event_date.split('-')[0];
                    month = event_date.split('-')[1].replace(/\b0+/g, ''); // remove leading zeroes
                    day = event_date.split('-')[2].replace(/\b0+/g, ''); // remove leading zeroes
                    event_date = month+'/'+day+'/'+year; // convert date format
                    //event_date_compact = month+'/'+day; // for compact mode (numbers only, e.g., "4/13")
                    event_date_compact = month_array_abb[month-1]+' '+day; // for compact mode (month text, e.g., "Apr 13")
                    if (events[i].event.event_instances[0].event_instance.all_day) {
                        event_time = 'all day';
                    }
                    
                    // optional fields
                    department = 0;
                    type = 0;
                    if (typeof events[i].event.filters.departments !== 'undefined') {
                        department = events[i].event.filters.departments[0].id; // TODO: add support for multiple departments per event ( departments[1+] )
                    }
                    if (typeof events[i].event.filters.event_types !== 'undefined') {
                        type = events[i].event.filters.event_types[0].id; // TODO: add support for multiple types per event per event ( event_types[1+] )
                    }
                    group_name = '';
                    group_id = 0;
                    if (typeof events[i].event.group_name !== 'undefined') {
                        group_name = events[i].event.group_name;
                        group_id = events[i].event.group_id;
                    }
                    event_types = '';
                    if (typeof events[i].event.filters.event_types !== 'undefined') {
                        event_types = events[i].event.filters.event_types[0].name;
                    }
                    if (pref_category == 'dept' && department != 0) {
                        event_types = events[i].event.filters.departments[0].name;
                    }
                    if (pref_category == 'group' && group_name != '') {
                        event_types = group_name;
                    }
                    if (pref_category_filters) {
                        if (pref_category == 'type' && type != 0) {
                            if ( $.inArray(events[i].event.filters.event_types[0].id,department_ids) == -1 ) {
                                department_ids.push(events[i].event.filters.event_types[0].id);
                                department_names.push(events[i].event.filters.event_types[0].name);
                                // TODO: add support for multiple types per event ( event_types[1+] )
                            }
                        }
                        else if (pref_category == 'dept' && department != 0) {
                            if ( $.inArray(events[i].event.filters.departments[0].id,department_ids) == -1 ) {
                                department_ids.push(events[i].event.filters.departments[0].id);
                                department_names.push(events[i].event.filters.departments[0].name);
                                // TODO: add support for multiple departments per event ( departments[1+] )
                            }
                        }
                        else if (pref_category == 'group' && group_name != '') {
                            if ( $.inArray(events[i].event.group_id,department_ids) == -1 ) {
                                department_ids.push(group_id);
                                department_names.push(group_name);
                            }
                        }
                    }
                    ticket_cost = '';
                    if (typeof events[i].event.ticket_cost !== 'undefined') {
                        ticket_cost = events[i].event.ticket_cost;
                    }
                    event_time_end = '';
                    if (typeof events[i].event.event_instances[0].event_instance.end !== 'undefined' && events[i].event.event_instances[0].event_instance.end != null) {
                        event_time_end = events[i].event.event_instances[0].event_instance.end.split('T')[1];
                        event_time_end = convertTime(event_time_end); // convert to 12-hour format
                    }
                    
                    // build node
                    ///// CHECK IF CALENDAR FORMAT

                    if (format == 'calendar') {
                        months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

                        event_html = '\
    <div class="views-row">  \
        <div class="container-fluid"> \
            <div class="row"> \
                <div class="col-sm-2 event-month-and-day"> \
                    <div> \
                        <span class="event-month">' + months[month-1] + '</span> \
                        <span class="event-day">' + daySuffix(day) + '</span> \
                    </div> \
                </div> \
                <div class="col-sm-8 event-title-and-location"> \
                    <div class="event-title"> \
                        <a href="' + localist_url + '" hreflang="en">' + title + '</a> \
                    </div> \
                    <div class="event-times"> \
                        <span class="fa fa-clock-o"></span>' + event_time + ' - ' + event_time_end + '\
                    </div> \
                    <div class="event-location"> \
                        <span class="fa fa-map-marker"></span>' + location_name + '\
                    </div> \
                </div> \
            </div>  \
        </div> \
    </div>';
                        
                        event_node = $(event_html);

                    } else {

                        event_node = $('<div class="node">').addClass('dept-'+department).addClass('type-'+type).addClass('group-'+group_id);
                        
                        c_title = $('<h3>').html('<a target="_blank" href="'+localist_url+'">'+title);
                        c_location = $('<h4 class="meta location">').text(location_name);
                        c_type = $('<h4 class="meta type"><span class="fa"></span>').append(event_types);
                        c_date = $('<h4 class="meta date">')
                        if (!pref_date_headers || format == 'compact') {
                            $(c_date).append('<span class="fulldate"></span> ');
                            if (format == 'compact') {
                                $(c_date).find('.fulldate').text(event_date_compact);
                            }
                            else {
                                $(c_date).find('.fulldate').text(event_date);
                            }
                        }
                        $(c_date).append('<span class="start">'+event_time+'</span>');
                        if (event_time_end != '' && pref_show_endtime) {
                            $(c_date).find('.start').after(' to <span class="end">'+event_time_end+'</span>');
                        }
                        
                        if (excerpt_length > 0 || !supports_rich || (supports_rich && pref_allow_rich)) {
                            c_abstract = $('<p class="description">').text(description);
                        }
                        else {
                            c_abstract = $('<div class="description"><div class="description-content">'+description+'</div></div>');
                        }
                        if (excerpt_length > 0 ) {
                            c_abstract.append('... <a class="read-more more"></a>').find('.read-more').attr('href',localist_url).attr('target','_blank').text(pref_readmore);
                        }
                        if (format != 'compact' && pref_show_thumbs) {
                            event_node.append('<a><img class="event-image dropshadow-light" src="'+photo_url+'" target="_blank" /></a>');
                            event_node.find('a').first().attr('href',localist_url).attr('target','_blank');
                        }
                        
                        event_node.append(c_title);
                        event_node.append(c_date);
                        if (pref_show_location) {
                            event_node.append(c_location);
                        }
                        if (pref_show_type && format != 'compact') {
                            event_node.append(c_type);
                        }
                        if (description) {
                            event_node.append('<div class="event-details"></div>').append(c_abstract);
                            if (pref_hide_desc) {
                                event_node.find('.event-details').prepend('<h4><a href="#"><span class="fa fa-chevron-down"></span>'+pref_eventdetails+'</a></h4>');
                            }
                        }
                        
                        // month and day headers
                        if (pref_date_headers) {
                            if (format != 'compact' && month != current_month) {
                                current_month = month;
                                current_day = day;
                                mheader = $('<h3 class="month-header">').text(month_array[month-1] + ' ' + year);
                                dheader = $('<h4 class="day-header">').text(event_day + ', ' + month_array[month-1] + ' ' + daySuffix(day));
                                dheader.prepend('<span class="fa fa-calendar-o"></span>');
                                events_container.append(mheader).append(dheader);
                            }
                            else if (format != 'compact' && day != current_day) {
                                current_day = day;
                                dheader = $('<h4 class="day-header">').text(event_day + ', ' + month_array[month-1] + ' ' + daySuffix(day));
                                dheader.prepend('<span class="fa fa-calendar-o"></span>');
                                events_container.append(dheader);
                            }
                        }

                    }
                    
                    events_container.append(event_node);
                }
                $('#'+target).append(events_container);
                
                // Event Filters
                if (pref_category_filters && (format != "calendar")) {
                
                    
                    /* build filter UI */
                    event_filters = $('<div id="events-filters"><h3 class="hidden">Show:</h3><ul class="events-filters" /></div>');
                    event_filters.children('ul').append('<li><a data-filter="all" class="active" href="#">All Events</a></li>');
                    
                    // alphabetize option
                    department_ids_sorted = department_ids.slice(0);
                    department_names_sorted = department_names.slice(0);
                    if (pref_alpha_categories) {
                        department_names_sorted.sort();
                        for (i=0;i<department_ids.length;i++) {
                            department_ids_sorted[i] = department_ids[department_names.indexOf(department_names_sorted[i])]; // translate IDs to match alphabetized names
                        }
                    }
                    for (i=0;i<department_ids.length;i++) {
                        event_filters.children('ul').append('<li><a href="#" data-filter="' + department_ids_sorted[i] + '">' + department_names_sorted[i] + '</a></li>');
                    }
                    $('#'+target).prepend(event_filters);
                    $('#'+target+' .events-filters a').click(function(e) {
                        e.preventDefault();
                        
                        $('#'+target+' .events-filters a').removeClass('active');
                        $(this).addClass('active');
                        
                        if ($(this).attr('data-filter') == 'all') {
                            $('#'+target+' .node').show();
                        }
                        else {
                            $('#'+target+' .node').hide();
                            $('#'+target+' .node.'+pref_category+'-'+$(this).attr('data-filter')).show();
                        }
                        
                        // refresh headers
                        $('.day-header, .month-header').hide();
                        $('.day-header').each(function() {
                            if ($(this).nextUntil('.day-header','.node:visible').length > 0) {
                                $(this).show();
                            }
                        });
                        $('.month-header').each(function() {
                            if ($(this).nextUntil('.month-header','.day-header:visible').length > 0) {
                                $(this).show();
                            }
                        });
                    });
                    
                    /* URL parameter support */
                    var url_params = window.location.search.substring(1).split('&');
                    for (i=0;i<url_params.length;i++) {
                        c_parameter = url_params[i].split('=');
                        if (c_parameter[0] == 'id' && !isNaN(c_parameter[1]) && format != 'compact') {
                            $('#'+target+' .events-filters a').each(function() {
                                if ($(this).attr('data-filter') == c_parameter[1]) {
                                    $(this).trigger('click');
                                }
                            });
                        }
                    }
                    
                }

                // Show/Hide Descriptions
                if (pref_hide_desc) {
                    $('.events-listing .description').hide();
                    $('#'+target+' .event-details a').click(function(e) {
                        e.preventDefault();
                        console.log('click');
                        
                        $(this).parents('.event-details').first().next('.description').slideToggle(150);
                        if ( $(this).children('.fa').hasClass('fa-chevron-down') ) {
                            $(this).children('.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                        }
                        else {
                            $(this).children('.fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                        }
                    });
                }
                
                projectCustom(); // run any project-specific post-processing
            }
        });    
        
        // Utility Functions
        function daySuffix(day) {
            switch (day) {
                case '1':
                case '21':
                case '31':
                    return day+'st';
                case '2':
                case '22':
                    return day+'nd';
                case '3':
                case '23':
                    return day+'rd';
                default:
                    return day+'th';
            }
        }
        function addLeadingZero(num) {
            if (num.toString().length == 1) {
                num = '0'+num;
            }
            return num;
        }
        function convertTime(time) {
            time_hour = time.split(':')[0];
            time_min = time.split(':')[1];
            if (parseInt(time_hour) >= 12) {
                if (parseInt(time_hour) > 12) {
                    time_hour = (parseInt(time_hour) - 12);
                }
                return time_hour + ':' + time_min + ' p.m.';
            }
            else {
                return parseInt(time_hour) + ':' + time_min + ' a.m.';
            }
        }
        
        
        /* Custom Postprocessing (for project-specific needs) 
       -------------------------------------------------------------------------- */
       function projectCustom() {
           
           
       }
                
    });
}

