import React from 'react';
import PropTypes from 'prop-types';
import {
    getAbbrMonth,
    getDay,
    getEventTime,
    getEventEndTime
} from '../helpers/displayEvent';

const InlineCompactInner = props => {
    const {event, eventclass} = props;
    const eventTime = getEventTime(event);
    const endTime = getEventEndTime(event);

    const renderEventLocation = locationName =>{
        if (locationName){
            return (
                <div className="event-location">
                    <span className="fa fa-map-marker"></span>
                    {event.location_name}
                </div>
            )
        }
    }

    return (
        <div className={`views-row ${eventclass}`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 event-month-and-day">
                        <div>
                            <span className="event-month">{getAbbrMonth(event)}</span>
                            <span className="event-day">{getDay(event)}</span>
                        </div>
                    </div>
                    <div className="col-sm-8 event-title-and-location">
                        <div className="event-title">
                            <a href="${builtEvent.event.localist_url}" hrefLang="en">
                                {event.title}
                            </a>
                        </div>
                        <div className="event-times">
                            <span className="fa fa-clock-o"></span>
                            {eventTime}{endTime ? ` - ${endTime}` : ''}
                        </div>
                        {renderEventLocation(event)}
                    </div>
                </div>
            </div>
        </div>

    )
}

InlineCompactInner.propTypes = {
    event: PropTypes.object.isRequired,
    eventclass: PropTypes.string.isRequired,
};

const InlineCompact= props =>{
    const {
        events,
        eventclass,
        eventslistclass,
        wrapperclass} = props;

    return (
        <section className='modern' id="eventsInlineCompact" title="Events List">
            <div className="main-body">
                <div className={`cwd-component compact events-listing ${wrapperclass}`}>
                    <div className={`events-list view-content ${eventslistclass}`}>
                        {events.length > 0
                            ? events.map( event => {
                                return (
                                    <InlineCompactInner
                                        key={event.event.id}
                                        event={event.event}
                                        eventclass={eventclass}
                                    />
                                )
                            })
                            : <p>There are no upcomming events.</p>}
                    </div>
                </div>
            </div>
        </section>
    );

}

InlineCompact.propTypes = {
    events: PropTypes.array,
    wrapperclass: PropTypes.string,
    eventslistclass: PropTypes.string,
    eventclass: PropTypes.string,
};

InlineCompact.defaultProps = {
    events: [],
    wrapperclass: '',
    eventslistclass: '',
    eventclass: '',

};
export default InlineCompact;
