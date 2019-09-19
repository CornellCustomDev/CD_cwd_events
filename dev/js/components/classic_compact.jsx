import React from 'react';
import PropTypes from 'prop-types';
import {
    getEventTime,
    getDay,
    getAbbrMonth
} from '../helpers/displayEvent';

const ClassicCompactInner = props => {
    const {event, itemclass} = props;
    const eventTime = getEventTime(event);
    return (
        <div className={`views-row ${itemclass}`}>
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
    itemclass: PropTypes.string.isRequired,
};

const ClassicCompact= props =>{
    const {
        events,
        itemclass,
        listclass,
        wrapperclass} = props;

    return (
        <div className={`view view-events view-id-events cuenergy-events ${wrapperclass}`}>
            <div className={`events-list view-content ${listclass}`}>
                {events.length > 0
                    ? events.map( event => {
                        return (
                            <ClassicCompactInner
                                key={event.event.id}
                                event={event.event}
                                itemclass={itemclass}
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
    listclass: PropTypes.string,
    itemclass: PropTypes.string,
};

ClassicCompact.defaultProps = {
    events: [],
    wrapperclass: '',
    listclass: '',
    itemclass: '',

};
export default ClassicCompact;
