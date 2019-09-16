import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    getTruncDesc,
    getAbbrMonth,
    getDay,
    getEventDate,
    getEventTime,
} from '../helpers/displayEvent';
import EventFilters from './filter';
import AddCal from './addCal'
import buildEventWrapperFilters from '../helpers/buildEventWrapperFilters';
import {EventThumbnail} from './partials';

const ModernCompactInner = props => {
    const {event, addcal, thumbnail, excerptlength, eventclass} = props;
    const eventTime = getEventTime(event);

    return (
        <div className={`card event-node ${eventclass}`}>
            <div className="events">
                <a
                    href={event.localist_url}
                    className="group-link-wrapper field-group-link"
                >
                    <EventThumbnail
                        photoUrl={event.photo_url}
                        title={event.title}
                        thumbnail={thumbnail}
                        photoCrop='big'
                    />
                    <time
                        title={getEventDate(event)}
                        dateTime={eventTime}
                    >
                        <span className="month">{getAbbrMonth(event)}</span>
                        <span className="day">{getDay(event)}</span>
                    </time>
                    <div className="field title">
                        <h3>{event.title}</h3>
                    </div>
                    <div className="field meta">
                        <p>
                            {eventTime}{ event.location_name ? `, ${event.location_name}` : '' }
                        </p>
                    </div>
                    <div className="field field-name-summary summary">
                        <p>
                            {getTruncDesc(event, excerptlength)}
                        </p>
                    </div>
                </a>
                {
                    addcal === 'true'
                        ? <AddCal event={event} />
                        : ''
                }
            </div>

        </div>
    )
}

ModernCompactInner.propTypes = {
    event: PropTypes.object.isRequired,
    addcal: PropTypes.string.isRequired,
    excerptlength: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    eventclass: PropTypes.string.isRequired,
};

const ModernCompact= props =>{
    const {
        events,
        filterby,
        usefilterby,
        addcal,
        excerptlength,
        thumbnail,
        eventclass,
        eventslistclass,
        wrapperclass} = props;
    const [filterEvents, handleEventFilter] = useState(events);
    const filterObjs = buildEventWrapperFilters(events, filterby);
    const thumbNailClass = (thumbnail === 'false') ? 'no-thumbnails' : '';

    return (
        <section className='modern' id="eventsModernCompact" title="Events List">
            <div className="main-body">
                <div className={`cwd-component compact events-listing ${thumbNailClass} ${wrapperclass}`}>
                    { usefilterby === 'true'
                        ? <EventFilters
                            filterObjs={filterObjs}
                            events={events}
                            handleEventFilter={handleEventFilter}
                            filterby={filterby}
                        />
                        : ''}
                    <div className={`events-list view-content ${eventslistclass}`}>
                        {filterEvents.length > 0
                            ? filterEvents.map( event => {
                                return (
                                    <ModernCompactInner
                                        key={event.event.id}
                                        event={event.event}
                                        filterby={filterby}
                                        addcal={addcal}
                                        excerptlength={excerptlength}
                                        thumbnail={thumbnail}
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

ModernCompact.propTypes = {
    events: PropTypes.array,
    filterby: PropTypes.string.isRequired,
    usefilterby: PropTypes.string,
    addcal: PropTypes.string,
    excerptlength: PropTypes.string,
    thumbnail: PropTypes.string,
    wrapperclass: PropTypes.string,
    eventslistclass: PropTypes.string,
    eventclass: PropTypes.string,
};

ModernCompact.defaultProps = {
    events: [],
    usefilterby: 'false',
    addcal: 'false',
    excerptlength: '150',
    thumbnail: 'true',
    wrapperclass: '', //cwd-card-grid three-card',
    eventslistclass: '', //cards',
    eventclass: '', //card',

};
export default ModernCompact;
