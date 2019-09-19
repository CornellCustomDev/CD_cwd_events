import React from 'react';
import PropTypes from 'prop-types';
import {
    getAbbrMonth,
    getDay,
    getEventTime,
    getEventEndTime
} from '../helpers/displayEvent';

const InlineCompactInner = props => {
    const {event, itemclass} = props;
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
        <div className={`views-row ${itemclass}`}>
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
    itemclass: PropTypes.string.isRequired,
};

const InlineCompact= props =>{
    const {
        events,
        itemclass,
        listclass,
        wrapperclass} = props;

    return (
        <section className='modern' id="eventsInlineCompact" title="Events List">
            <div className="main-body">
                <div className={`cwd-component compact events-listing ${wrapperclass}`}>
                    <div className={`events-list view-content ${listclass}`}>
                        {events.length > 0
                            ? events.map( event => {
                                return (
                                    <InlineCompactInner
                                        key={event.event.id}
                                        event={event.event}
                                        itemclass={itemclass}
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
    listclass: PropTypes.string,
    itemclass: PropTypes.string,
};

InlineCompact.defaultProps = {
    events: [],
    wrapperclass: '',
    listclass: '',
    itemclass: '',

};
export default InlineCompact;
