import * as moment from 'moment';
import truncate from 'truncate';

/**
 * Gets time from dateTime.
 *
 * @param {dateTime} dateTime A valid datetime.
 *
 * @return {string} The 12 hour string: "1:00 p.m".
 */
export const getTimefromDateTime = dateTime => {
    const time = moment(dateTime).format('h:mm a');
    return time;
};

/**
 * Gets full month day  from dateTime.
 *
 * @param {dateTime} dateTime A valid datetime.
 *
 * @return {string} The abbreviated month and day "Jan 1".
 */
export const getMonthDayfromDateTime = dateTime => {
    const monthDay = moment(dateTime).format('MMMM D');
    return monthDay;
};

/**
 * Gets day  from dateTime.
 *
 * @param {dateTime} dateTime A valid datetime.
 *
 * @return {string} The abbreviated day "1".
 */
export const getDayfromDateTime = dateTime => {
    const day = moment(dateTime).format('D');
    return day;
};

/**
 * Get event start date.
 * @param {obj} event A localist event obj
 * @return {string} Date string.
 */
export const getEventStartDate = event => {
    const startDateTime = event.event_instances[0].event_instance.start;
    return startDateTime;
};

/**
 * The logic for determining the type of date string.
 *
 * @param {obj} event The localist event.
 * @param {string} format Either compact or standard.
 *
 * @return {string} The date string.
 */
export const getDisplayDate = (event, format) => {
    const dateTime = getEventStartDate(event);
    const eventDate =
        format === 'compact'
            ? moment(dateTime).format('MMM D')
            : moment(dateTime).format('M/DD/YYYY');
    return eventDate;
};

/**
 *
 * @param {obj} event The localist event.
 * @return {string} The event start date.
 */
export const getEventDate = event => {
    const startDateTime = getEventStartDate(event);
    const eventSrtartDate = getMonthDayfromDateTime(startDateTime);
    return eventSrtartDate;
};

/**
 * Truncates the description text.
 *   Does not support html.
 *
 * @param {obj} event the event object.
 * @param {integer} excerptLength The length of the excerpt.
 *
 * @return {string} The truncated description string
 */
export const getTruncDesc = (event, excerptLength) => {
    const description = truncate(event.description_text, excerptLength);
    return description;
};

/**
 *
 * @param {obj} event The localist event.
 * @return {string} The day of the event.
 */
export const getDay = event => {
    const startDateTime = getEventStartDate(event);
    const date = getDayfromDateTime(startDateTime);
    return date;
};

export const getEventEndTime = event => {
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
export const getEventTime = event => {
    let eventTime = '';
    if (event.event_instances[0].event_instance.all_day) {
        eventTime = 'all day';
    } else {
        const startDate = getEventStartDate(event);
        eventTime = getTimefromDateTime(startDate);
    }
    return eventTime;
};

/**
 *
 * @param {obj} event The localist event
 * @return {string} The group name.
 */
export const getGroupName = event => {
    let group_name = '';
    if (typeof event.group_name !== 'undefined') {
        group_name = event.group_name;
    }
    return group_name;
};

/**
 *
 * @param {obj} event The localist event
 * @return {integer} The group Id.
 */
export const getGroupId = event => {
    let groupId = 0;
    if (typeof event.group_name !== 'undefined') {
        groupId = event.group_id;
    }
    return groupId;
};

/**
 * The event type id.
 * @todo add support for multiple types per event per event ( event_types[1+] )
 * @param {obj} event The event object.
 *
 * @return {integer} An array of fields.
 */
export const getType = event => {
    let type = '';
    if (typeof event.filters.event_types !== 'undefined') {
        type = event.filters.event_types[0].id; //
    }
    return type;
};

/**
 * The events deartment id
 * @param {obj} event The event object.
 *
 * @return {integer} The department id.
 */
export const getDepartment = event => {
    let department = '';
    if (typeof event.filters.departments !== 'undefined') {
        department = event.filters.departments[0].id;
    }
    return department;
};

/**
 * Gets the appropriate event type.
 * @param {obj} event The localist Event.
 * @param {string} prefCategory The preffered category filter.
 * @return {string} The filter text.
 */
export const getEventType = (event, prefCategory) => {
    const department = getDepartment(event);
    const groupName = getGroupName(event);
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
