import * as moment from 'moment';

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
