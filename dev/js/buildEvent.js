/* helper function */
const convertTime = time => {
    let timeHour = time.split(':')[0];
    const timeMin = time.split(':')[1];
    if (parseInt(timeHour, 10) >= 12) {
        if (parseInt(timeHour, 10) > 12) {
            timeHour = parseInt(timeHour, 10) - 12;
        }
        return `${timeHour}:${timeMin} p.m.`;
    }
    return `${parseInt(timeHour, 10)}:${timeMin} a.m.`;
};

/**
 *A Helper function to convert localist event data into usable formats.
 *
 * @param {obj} event The localist event json data
 * @param {obj} args Formating instructions.
 *
 * @return {obj} see docs/buildEvent.config
 */
export default class BuildEvent {
    constructor(event, args) {
        this.event = event;
        this.description = event.description;
        this.args = args;
        this.format = args.format;
        this.addCal = args.addCal;
        this.pref_eventdetails = args.pref_eventdetails;
        this.pref_readmore = args.pref_readmore;

        // Date time variables.
        this.month_array = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        this.month_array_abb = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        this.day_array = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
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
        this.description = '';

        // options
        this.department = 0;
        this.type = 0;
        this.group_name = '';
        this.group_id = 0;
        this.event_types = '';

        this.event_time_end = '';

        this.ticket_cost = '';

        // setters
        this.setTruncDesc();
        this.setDateTime();
        this.setOptionFields();
        this.setEventType();
        this.setTicketCost();
        this.setTimeEnd();
    } // END OF CONSTRUCTOR

    setDateTime() {
        const { event } = this;
        // date and time
        const eventFullDate = new Date(
            event.event_instances[0].event_instance.start
        );
        const eventDay = this.day_array_abb[eventFullDate.getDay()];
        let eventDate = event.event_instances[0].event_instance.start.split(
            'T'
        )[0];
        this.dateTime = eventDate;
        // eslint-disable-next-line prefer-destructuring
        this.event_time = event.event_instances[0].event_instance.start.split(
            'T'
        )[1];
        this.event_time = convertTime(this.event_time); // convert to 12-hour format
        const year = eventDate.split('-')[0];
        const month = eventDate.split('-')[1].replace(/\b0+/g, ''); // remove leading zeroes
        const day = eventDate.split('-')[2].replace(/\b0+/g, ''); // remove leading zeroes
        eventDate = `${month}/${day}/${year}`; // convert date format
        // eventDate_compact = month+'/'+day; // for compact mode (numbers only, e.g., "4/13")
        this.event_date_compact = `${this.month_array_abb[month - 1]} ${day}`; // for compact mode (month text, e.g., "Apr 13")
        this.event_date = `${this.month_array[month - 1]} ${day}`;
        this.displayDate = this.setDisplayDate(
            eventDate,
            this.event_date_compact
        );
        if (event.event_instances[0].event_instance.all_day) {
            this.event_time = 'all day';
        }
        this.abbrDay = eventDay;
        this.abbrMonth = this.month_array_abb[month - 1];
        this.month = this.month_array[month - 1];
        this.fullDay = this.day_array[eventFullDate.getDay()];
        this.day = day;
        this.monthHeader = `${this.month} ${year}`;
    }

    // set date time helper
    setDisplayDate(eventDate, eventDateCompact) {
        const { pref_date_headers: prefDateHeaders } = this.args;
        if (prefDateHeaders || this.format === 'compact') {
            if (this.format === 'compact') {
                return eventDateCompact;
            }
            return eventDate;
        }
        console.warn('warning no date headers');
        console.warn(eventDateCompact);
    }

    setTruncDesc() {
        const { event } = this;
        let excerptLength = this.args.pref_excerpt_length;
        if (this.format === 'compact') {
            excerptLength = this.args.pref_excerpt_length_compact;
        }

        if (!this.args.supports_rich) {
            if (excerptLength > 0 && event.description.length > excerptLength) {
                this.description = event.description
                    .trim()
                    .substring(0, excerptLength)
                    .split(' ')
                    .slice(0, -1)
                    .join(' ');
            } else {
                this.description = event.description;
            }
        } else if (excerptLength > 0) {
            if (event.description_text.length > excerptLength) {
                this.description = event.description_text
                    .trim()
                    .substring(0, excerptLength)
                    .split(' ')
                    .slice(0, -1)
                    .join(' ');
            } else {
                this.description = event.description_text;
            }
            // TODO: add support for Rich Text (HTML) truncation
        } else if (this.args.pref_allow_rich) {
            this.description = event.description;
        } else {
            this.description = event.description_text;
        }
    }

    setOptionFields() {
        const { event } = this;
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

    setEventType() {
        const { event } = this;
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

    setTimeEnd() {
        const { event } = this;
        if (
            typeof event.event_instances[0].event_instance.end !==
                'undefined' &&
            event.event_instances[0].event_instance.end != null
        ) {
            // eslint-disable-next-line prefer-destructuring
            this.event_time_end = event.event_instances[0].event_instance.end.split(
                'T'
            )[1];
            this.event_time_end = convertTime(this.event_time_end); // convert to 12-hour format
        }
    }

    setTicketCost() {
        const { event } = this;
        if (typeof event.ticket_cost !== 'undefined') {
            this.ticket_cost = event.ticket_cost;
        }
    }
}
