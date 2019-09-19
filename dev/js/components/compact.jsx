import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    getTruncDesc,
    getEventDateCompact,
} from '../helpers/displayEvent';
import EventFilters from './filter';
import AddCal from './addCal'
import buildEventWrapperFilters from '../helpers/buildEventWrapperFilters';
import {
    EventTitle,
    EventDate,
    EventLocation,
    EventThumbnail,
    EventDescription,
} from './partials';

const CompactInner = props => {
    const {event, addcal, thumbnail, excerptlength, itemclass} = props;
    return (
        <div className={`views-row ${itemclass}`}>
            <EventThumbnail
                photoUrl={event.photo_url}
                title={event.title}
                thumbnail={thumbnail}
                photoCrop='big'
            />
            <div className="event-node node">
                <EventTitle title={event.title} url={event.localist_url} />
                <EventLocation locationName={event.location_name} />
                <EventDate date={getEventDateCompact(event)} />
                <EventDescription
                    description={getTruncDesc(event, excerptlength)}
                    title = {event.title}
                />
                {
                    addcal === 'true'
                        ? <AddCal event={event} />
                        : ''
                }
            </div>
        </div>
    )
}

CompactInner.propTypes = {
    event: PropTypes.object.isRequired,
    addcal: PropTypes.string.isRequired,
    excerptlength: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    itemclass: PropTypes.string.isRequired,
};

const Compact = (props) => {
    const {
        events,
        filterby,
        usefilterby,
        addcal,
        excerptlength,
        thumbnail,
        itemclass,
        listclass,
        wrapperclass} = props;
    const [filterEvents, handleEventFilter] = useState(events);
    const filterObjs = buildEventWrapperFilters(events, filterby);
    const thumbNailClass = (thumbnail === 'false') ? 'no-thumbnails' : '';

    return (
        <section className='standard' id="standardCompact" title="Events List">
            <div className="main-body">
                <div className={`events-listing ${thumbNailClass} compact ${wrapperclass}`}>
                    { usefilterby === 'true'
                        ? <EventFilters
                            filterObjs={filterObjs}
                            events={events}
                            handleEventFilter={handleEventFilter}
                            filterby={filterby}
                        />
                        : ''}
                    <div className={`events-list view-content ${listclass}`}>
                        {filterEvents.length > 0
                            ? filterEvents.map( event => {
                                return (
                                    <CompactInner
                                        key={event.event.id}
                                        event={event.event}
                                        filterby={filterby}
                                        addcal={addcal}
                                        excerptlength={excerptlength}
                                        thumbnail={thumbnail}
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

Compact.propTypes = {
    events: PropTypes.array,
    filterby: PropTypes.string.isRequired,
    usefilterby: PropTypes.string,
    addcal: PropTypes.string,
    excerptlength: PropTypes.string,
    thumbnail: PropTypes.string,
    wrapperclass: PropTypes.string,
    listclass: PropTypes.string,
    itemclass: PropTypes.string,
};

Compact.defaultProps = {
    events: [],
    usefilterby: 'false',
    addcal: 'false',
    excerptlength: '150',
    thumbnail: 'true',
    wrapperclass: '', //cwd-card-grid three-card',
    listclass: '', //cards',
    itemclass: '', //card',

};

export default Compact;
