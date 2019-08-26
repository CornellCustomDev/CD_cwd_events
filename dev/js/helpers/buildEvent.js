import moment from 'moment';
import {
    getEventStartDate,
    getDisplayDate,
    getEventDate,
    getTruncDesc,
    getDay,
    getEventTime,
    getEventEndTime,
    getEventType,
    getType,
    getGroupName,
    getGroupId,
    getDepartment
} from './displayEvent';

const check = require('check-types');

/**
 * Test params property types.
 * @param {obj} params The block element data.
 * @return {boolean} Valid proptype.
 */
const checkPropTypes = params => {
    return check.all(check.map(params, check.string));
};

/**
 * A Helper function to convert localist event data into display formats.
 * @todo make this a function!
 * @todo Move all of this functionality to templates.
 *
 * @param {obj} event The localist event json data
 * @param {obj} args Formating instructions.
 *
 * @return {obj} see docs/buildEvent.config
 */
export default (event, args) => {
    if (!checkPropTypes(args)) {
        console.error(' Build Event props must be a string ');
        return { error: 'prop types must be string' };
    }
    const be = {};
    const startDateTime = getEventStartDate(event);
    be.event = event;
    be.args = args;
    be.description = event.description;
    be.addCal = args.addCal;
    be.event_time = getEventTime(event);
    be.event_date_compact = moment(startDateTime).format('MMM D');
    be.event_date = getEventDate(event);
    be.displayDate = getDisplayDate(event, be.format);
    be.dateTime = moment(startDateTime).format('YYYY-MM-DD');
    be.abbrMonth = moment(startDateTime).format('MMM');
    be.month = moment(startDateTime).format('MMMM');
    be.day = getDay(event);
    be.monthHeader = moment(startDateTime).format('MMMM YYYY');
    be.event_time_end = getEventEndTime(event);
    be.description = getTruncDesc(event, args.pref_excerpt_length);
    // options
    be.department = getDepartment(event);
    be.type = getType(event);
    be.group_name = getGroupName(event);
    be.group_id = getGroupId(event);
    be.event_types = getEventType(event, args.pref_category);
    return be;
};
