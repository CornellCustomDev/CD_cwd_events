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
    const {
        event,
        hideaddcal,
        hideimages,
        truncatedescription,
        itemclass,
        hidedescription} = props;
    const eventTime = getEventTime(event);

    return (
        <div className={`event-node ${itemclass}`}>
            <div className="events">
                <a
                    href={event.localist_url}
                    className="group-link-wrapper field-group-link"
                >
                    <EventThumbnail
                        photoUrl={event.photo_url}
                        title={event.title}
                        hideimages={hideimages}
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
                            { hidedescription !== 'true'
                                ? getTruncDesc(event, truncatedescription)
                                : ''}
                        </p>
                    </div>
                </a>
                {
                    hideaddcal !== 'true'
                        ? <AddCal event={event} />
                        : ''
                }
            </div>

        </div>
    )
}

ModernCompactInner.propTypes = {
    event: PropTypes.object.isRequired,
    hideaddcal: PropTypes.string.isRequired,
    truncatedescription: PropTypes.string.isRequired,
    hideimages: PropTypes.string.isRequired,
    itemclass: PropTypes.string.isRequired,
    hidedescription: PropTypes.string.isRequired,
};

const ModernCompact= props =>{
    const {
        events,
        filterby,
        hideaddcal,
        truncatedescription,
        hideimages,
        itemclass,
        listclass,
        hidedescription,
        wrapperclass} = props;
    const [filterEvents, handleEventFilter] = useState(events);
    const filterObjs = buildEventWrapperFilters(events, filterby);
    const thumbNailClass = (hideimages === 'true') ? 'no-thumbnails' : '';
    return (
        <section className='events-modern-compact modern' title="Events List">
            <div className="main-body">
                <div className={`cwd-component compact events-listing ${thumbNailClass} ${wrapperclass}`}>
                    <EventFilters
                        filterObjs={filterObjs}
                        events={events}
                        handleEventFilter={handleEventFilter}
                        filterby={filterby}
                    />
                    <div className={`events-list view-content ${listclass}`}>
                        {filterEvents.length > 0
                            ? filterEvents.map( event => {
                                return (
                                    <ModernCompactInner
                                        key={event.event.id}
                                        event={event.event}
                                        filterby={filterby}
                                        hideaddcal={hideaddcal}
                                        truncatedescription={
                                            truncatedescription
                                        }
                                        hideimages={hideimages}
                                        itemclass={itemclass}
                                        hidedescription = {hidedescription}
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
    hideaddcal: PropTypes.string,
    truncatedescription: PropTypes.string,
    hideimages: PropTypes.string,
    wrapperclass: PropTypes.string,
    listclass: PropTypes.string,
    itemclass: PropTypes.string,
    hidedescription: PropTypes.string,
};

ModernCompact.defaultProps = {
    events: [],
    hideaddcal: 'false',
    truncatedescription: '150',
    hideimages: 'true',
    wrapperclass: '', //cwd-card-grid three-card',
    listclass: '', //cards',
    itemclass: '', //card',
    hidedescription: '',

};
export default ModernCompact;
