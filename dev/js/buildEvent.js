export class BuildEvent{
    constructor( event, args ) {
        this.event = event;
        this.description = event.description;
        this.args = args;
        this.format = args.format
        this.addCal = args.addCal;
        this.pref_eventdetails = args.pref_eventdetails;
        this.pref_readmore = args.pref_readmore;

        //date time variables
        this.month_array = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        this.month_array_abb = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        this.day_array = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        this.day_array_abb = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        this.event_time;
        this.event_date_compact;
        this.event_date;
        this.displayDate;
        this.dateTime;//yyyy-mm-dd
        this.abbrDay;
        this.fullDay;
        this.abbrMonth;
        this.month;
        this.day;
        this.monthHeader;//month + year

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
    }//END OF CONSTRUCTOR

    setDateTime(){
        let event = this.event;
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
        var event_date = month+'/'+day+'/'+year; // convert date format
        //event_date_compact = month+'/'+day; // for compact mode (numbers only, e.g., "4/13")
        this.event_date_compact = this.month_array_abb[month-1]+' '+day; // for compact mode (month text, e.g., "Apr 13")
        this.event_date = this.month_array[month-1]+' '+day;
        this.displayDate = this.setDisplayDate(event_date, this.event_date_compact);
        if (event.event_instances[0].event_instance.all_day) {
            this.event_time = 'all day';
        }
        this.abbrDay = event_day;
        this.abbrMonth = this.month_array_abb[month-1];
        this.month=this.month_array[month-1];
        this.fullDay = this.day_array[event_fulldate.getDay()];
        this.day = day;
        this.monthHeader = this.month+' '+year;
    };

    //set date time helper
    setDisplayDate(event_date, event_date_compact ){
        let pref_date_headers = this.args.pref_date_headers
        if ( pref_date_headers || this.format == 'compact') {
            if (this.format == 'compact') {
                return event_date_compact;
            }
            return event_date;
        }else{
            console.log("warning no date headers");
            console.log( event_date_compact );
        }
    }    

    setTruncDesc(){
        let event = this.event;
        let excerpt_length = this.args.pref_excerpt_length;
        if (this.format == 'compact') {
            excerpt_length = this.args.pref_excerpt_length_compact;
        }
        
        if (!this.args.supports_rich) {
            if (excerpt_length > 0 && event.description.length > excerpt_length) {
                this.description = event.description.trim().substring(0, excerpt_length).split(' ').slice(0, -1).join(' ');
                //console.log(description)
            }
            else {
                this.description = event.description;
            }
        }
        else {
            if (excerpt_length > 0) {
                if (event.description_text.length > excerpt_length) {
                    this.description = event.description_text.trim().substring(0, excerpt_length).split(' ').slice(0, -1).join(' ');
                    //console.log(this.description)
                }
                else {
                    this.description = event.description_text;
                }
                // TODO: add support for Rich Text (HTML) truncation
            }
            else {
                if (this.args.pref_allow_rich) {
                    this.description = event.description;
                }
                else {
                    this.description = event.description_text;
                }
            }
        }
    };

    setOptionFields(){
        let event = this.event;
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
    };

    setEventType(){
        let event = this.event;
        if (typeof event.filters.event_types !== 'undefined') {
            this.event_types = event.filters.event_types[0].name;
        }
        if (this.args.pref_category == 'dept' && this.department != 0) {
            this.event_types = event.filters.departments[0].name;
        }
        if (this.args.pref_category == 'group' && this.group_name != '') {
            this.event_types = this.group_name;
        }
    };

    setTimeEnd(){
        let event = this.event;
        if (typeof event.event_instances[0].event_instance.end !== 'undefined' && event.event_instances[0].event_instance.end != null) {
            this.event_time_end = event.event_instances[0].event_instance.end.split('T')[1];
            this.event_time_end = convertTime(this.event_time_end); // convert to 12-hour format
        }      
    };

    setTicketCost(){
        let event = this.event;
        if (typeof event.ticket_cost !== 'undefined') {
            this.ticket_cost = event.ticket_cost;
        }
    };

}

/* helper function */
let convertTime = (time) => {
    let time_hour = time.split(':')[0];
    let time_min = time.split(':')[1];
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