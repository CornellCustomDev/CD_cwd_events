import * as moment from 'moment';
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
} from './dateTime';

/**
 * A Helper function to convert localist event data into display formats.
 * @todo Move all of this functionality to templates.
 *
 * @param {obj} event The localist event json data
 * @param {obj} args Formating instructions.
 *
 * @return {obj} see docs/buildEvent.config
 */
export default class BuildEvent {
    constructor(event, args) {
        const startDateTime = getEventStartDate(event);
        this.event = event;
        this.args = args;
        this.description = event.description;
        this.addCal = args.addCal;
        this.event_time = getEventTime(event);
        this.event_date_compact = moment(startDateTime).format('MMM D');
        this.event_date = getEventDate(event);
        this.displayDate = getDisplayDate(event, this.format);
        this.dateTime = moment(startDateTime).format('YYYY-MM-DD');
        this.abbrMonth = moment(startDateTime).format('MMM');
        this.month = moment(startDateTime).format('MMMM');
        this.day = getDay(event);
        this.monthHeader = moment(startDateTime).format('MMMM YYYY');
        this.event_time_end = getEventEndTime(event);
        this.description = getTruncDesc(event, args.pref_excerpt_length);

        // options
        this.department = getDepartment(event);
        this.type = getType(event);
        this.group_name = getGroupName(event);
        this.group_id = getGroupId(event);

        this.event_types = getEventType(event, args.pref_category);
    } // END OF CONSTRUCTOR
}
