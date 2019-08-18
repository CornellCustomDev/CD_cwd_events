import * as moment from 'moment';
import truncate from 'truncate';
import {
    getTimefromDateTime,
    getDayfromDateTime,
    getMonthDayfromDateTime
} from './common/dateTime';

/* helper functions */

/**
 * The logic for determining description length.
 *   Does not support html.
 *
 * @param {obj} event the event object.
 * @param {string} format Compact or standard.
 * @param {integer} pref_excerpt_length The length of the long excerpt.
 * @param {integer} pref_excerpt_length_compact The length of the compact excerpt.
 *
 * @return {string} The truncated description string
 */
const getTruncDesc = (
    event,
    format,
    pref_excerpt_length,
    pref_excerpt_length_compact
) => {
    const excerptLength =
        format === 'compact'
            ? pref_excerpt_length_compact
            : pref_excerpt_length;
    // Use plain text description is html
    const description = truncate(event.description_text, excerptLength);
    return description;
};

/**
 * The logic for determining the type of date string.
 *
 * @param {string} dateTime The date event datestring.
 * @param {string} format Either compact or standard.
 *
 * @return {string} The date string.
 */
const getDisplayDate = (dateTime, format) => {
    const eventDate =
        format === 'compact'
            ? moment(dateTime).format('MMM D')
            : moment(dateTime).format('M/DD/YYYY');
    return eventDate;
};

/**
 *
 * @param {obj} event The event object.
 *
 * @return {array} An array of fields.
 */
const getDepartmentFields = event => {
    let department = '';
    let type = '';
    let group_name = '';
    let group_id = '';
    if (typeof event.filters.departments !== 'undefined') {
        department = event.filters.departments[0].id;
    }
    if (typeof event.filters.event_types !== 'undefined') {
        type = event.filters.event_types[0].id; // TODO: add support for multiple types per event per event ( event_types[1+] )
    }
    if (typeof event.group_name !== 'undefined') {
        group_name = event.group_name;
        group_id = event.group_id;
    }
    return [department, type, group_name, group_id];
};

const getEventEndTime = event => {
    const endTime = event.event_instances[0].event_instance.end;
    if (typeof endTime !== 'undefined' && endTime !== null) {
        const time = getTimefromDateTime(endTime);
        return time;
    }
};

/**
 * Checks if event is all day and returns appropriate start time.
 * @param {obj} event The event obj.
 * @return {string} the eventTime string.
 */
const getEventTime = event => {
    let eventTime = '';
    if (event.event_instances[0].event_instance.all_day) {
        eventTime = 'all day';
    } else {
        eventTime = getTimefromDateTime(
            event.event_instances[0].event_instance.start
        );
    }
    return eventTime;
};

const getEventType = (event, prefCategory, department, groupName) => {
    let eventTypes = '';
    if (typeof event.filters.event_types !== 'undefined') {
        eventTypes = event.filters.event_types[0].name;
    }
    if (prefCategory === 'dept' && department !== 0) {
        eventTypes = event.filters.departments[0].name;
    }
    if (prefCategory === 'group' && groupName !== '') {
        eventTypes = this.group_name;
    }
    return eventTypes;
};

/**
 * A Helper function to convert localist event data into usable formats.
 * @todo get rid of this and move build to templates
 *
 * @param {obj} event The localist event json data
 * @param {obj} args Formating instructions.
 *
 * @return {obj} see docs/buildEvent.config
 */
export default class BuildEvent {
    constructor(event, args) {
        this.event = event;
        this.args = args;
        this.description = event.description; // used
        this.addCal = args.addCal; // used
        this.pref_readmore = args.pref_readmore; // used
        this.event_time = ''; // used
        this.event_date_compact = ''; // used
        this.event_date = ''; // used
        this.displayDate = ''; // used
        this.dateTime = ''; // used yyyy-mm-dd
        this.month = ''; // used
        this.day = ''; // used
        this.monthHeader = ''; // used month + year
        // options
        this.department = 0; // used
        this.type = 0; // used
        this.group_name = '';
        this.group_id = 0; // used
        this.event_types = ''; // used

        this.event_time_end = ''; // used

        // setters
        this.description = getTruncDesc(
            this.event,
            this.format,
            this.args.pref_excerpt_length,
            this.args.pref_excerpt_length_compact
        );
        [
            this.department,
            this.type,
            this.group_name,
            this.group_id
        ] = getDepartmentFields(this.event);

        this.event_time_end = getEventEndTime(event);

        this.setDateTime();
        // This must be called after department
        this.event_types = getEventType(
            event,
            this.args.pref_category,
            this.department,
            this.group_name
        );
    } // END OF CONSTRUCTOR

    setDateTime() {
        const { event } = this;
        // date and time
        const startDateTime = event.event_instances[0].event_instance.start;
        this.event_time = getEventTime(event);
        this.dateTime = moment(startDateTime).format('YYYY-MM-DD');
        this.event_date_compact = moment(startDateTime).format('MMM D');
        // event date is unused.
        this.event_date = getMonthDayfromDateTime(startDateTime);
        this.displayDate = getDisplayDate(startDateTime, this.format);
        this.abbrDay = moment(startDateTime).format('ddd');
        this.abbrMonth = moment(startDateTime).format('MMM');
        this.month = moment(startDateTime).format('MMMM');
        this.fullDay = moment(startDateTime).format('dddd');
        this.day = getDayfromDateTime(startDateTime);
        this.monthHeader = moment(startDateTime).format('MMMM YYYY');
    }
}
