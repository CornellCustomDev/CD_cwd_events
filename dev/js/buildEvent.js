import * as moment from 'moment';
import {
    getTimefromDateTime,
    getDayfromDateTime,
    getMonthDayfromDateTime
} from './common/dateTime';
/* helper functions */

/**
 *
 * @param {integer} excerptLength The length to truncate.
 * @param {string} description The description string.
 *
 * @return {string} The truncated description.
 */
const truncDescription = (excerptLength, description) => {
    let truncDesc = description;
    if (excerptLength > 0 && description.length > excerptLength) {
        truncDesc = description
            .trim()
            .substring(0, excerptLength)
            .split(' ')
            .slice(0, -1)
            .join(' ');
    }
    return truncDesc;
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

        // setters
        this.setTruncDesc();
        this.setDateTime();
        this.setOptionFields();
        this.setEventType();
        this.setTimeEnd();
    } // END OF CONSTRUCTOR

    setDateTime() {
        const { event } = this;
        // date and time
        const startDateTime = event.event_instances[0].event_instance.start;
        this.dateTime = moment(startDateTime).format('YYYY-MM-DD');
        this.event_time = getTimefromDateTime(startDateTime);
        const eventDate = moment(startDateTime).format('M/DD/YYYY');
        this.event_date_compact = moment(startDateTime).format('MMM D');
        // event date is unused.
        this.event_date = getMonthDayfromDateTime(startDateTime);
        this.displayDate = this.setDisplayDate(
            eventDate,
            this.event_date_compact
        );
        if (event.event_instances[0].event_instance.all_day) {
            this.event_time = 'all day';
        }
        this.abbrDay = moment(startDateTime).format('ddd');
        this.abbrMonth = moment(startDateTime).format('MMM');
        this.month = moment(startDateTime).format('MMMM');
        this.fullDay = moment(startDateTime).format('dddd');
        this.day = getDayfromDateTime(startDateTime);
        this.monthHeader = moment(startDateTime).format('MMMM YYYY');
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
            this.description = truncDescription(
                excerptLength,
                event.description
            );
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
            const endDateTime = event.event_instances[0].event_instance.end;
            const time = getTimefromDateTime(endDateTime);
            this.event_time_end = time;
        }
    }
}
