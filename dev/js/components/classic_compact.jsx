import React from 'react';
import PropTypes from 'prop-types';
import {
    getEventTime,
    getDay,
    getAbbrMonth
} from '../helpers/displayEvent';

const ClassicCompactInner = props => {
    const {event, eventclass} = props;
    const eventTime = getEventTime(event);
    return (
        <div className={`views-row ${eventclass}`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 event-month-and-day">
                        <div>
                            <span className="event-month">{getAbbrMonth(event)}</span>
                            <span className="event-day">{getDay(event)}</span>
                        </div>
                    </div>
                    <div className="col-sm-9 event-title-and-location">
                        <div>
                            <a href={event.localist_url}
                            >{event.title}</a>
                        </div>
                        <div>
                            {eventTime}{event.location_name
                                ? ` | ${event.location_name}`
                                : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ClassicCompactInner.propTypes = {
    event: PropTypes.object.isRequired,
    eventclass: PropTypes.string.isRequired,
};

const ClassicCompact= props =>{
    const {
        events,
        eventclass,
        eventslistclass,
        wrapperclass} = props;

    return (
        <div className={`view view-events view-id-events cuenergy-events ${wrapperclass}`}>
            <div className={`events-list view-content ${eventslistclass}`}>
                {events.length > 0
                    ? events.map( event => {
                        return (
                            <ClassicCompactInner
                                key={event.event.id}
                                event={event.event}
                                eventclass={eventclass}
                            />
                        )
                    })
                    : <p>There are no upcomming events.</p>}
            </div>
        </div>
    );

}

ClassicCompact.propTypes = {
    events: PropTypes.array,
    wrapperclass: PropTypes.string,
    eventslistclass: PropTypes.string,
    eventclass: PropTypes.string,
};

ClassicCompact.defaultProps = {
    events: [],
    wrapperclass: '',
    eventslistclass: '',
    eventclass: '',

};
export default ClassicCompact;
