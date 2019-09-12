import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    getTruncDesc,
    getTypeIds,
    getEventDateCompact,
} from '../helpers/displayEvent';
import EventFilters from './filter';
import AddCal from './addCal'
import buildEventWrapperFilters from '../helpers/buildEventWrapperFilters';
import {
    RenderTitle,
    RenderDate,
    RenderLocation,
    RenderThumbnail,
    RenderDescription,
} from './partials';

const CompactInner = props => {
    const {event, addcal, thumbnail, excerptlength, innerClass} = props;
    return (
        <div className={`views-row ${innerClass}`}>
            <RenderThumbnail
                photoUrl={event.photo_url}
                title={event.title}
                thumbnail={thumbnail}
                photoCrop='big'
            />
            <div className="event-node node">
                <RenderTitle title={event.title} url={event.localist_url} />
                <RenderLocation locationName={event.location_name} />
                <RenderDate date={getEventDateCompact(event)} />
                <RenderDescription
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
    innerClass: PropTypes.string.isRequired,
};

const Compact = (props) => {
    const {
        events,
        filterby,
        usefilterby,
        addcal,
        excerptlength,
        thumbnail} = props;
    const [filterEvents, handleEventFilter] = useState(events);
    const filterObjs = buildEventWrapperFilters(events, filterby);
    const thumbNailClass = (thumbnail === 'false') ? 'no-thumbnails' : '';
    const applyFilter = obj => {
        if (obj.name === 'filterAll'){
            handleEventFilter(events);
        } else {
            const filters = events.filter( event => {
                if (getTypeIds(event.event).includes(obj.id)){
                    return event;
                }
            })
            handleEventFilter(filters);
        }
    }

    return (
        <section className='standard' id="standardCompact" title="Events List">
            <div className="main-body">
                <div className={`events-listing ${thumbNailClass} compact cwd-card-grid three-card`}>
                    { usefilterby === 'true'
                        ? <EventFilters
                            filterObjs={filterObjs}
                            applyFilter={applyFilter}
                        />
                        : ''}
                    <div className="events-list view-content cards">
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
                                        innerClass='card'
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
    innerClass: PropTypes.string,
};

Compact.defaultProps = {
    events: [],
    usefilterby: 'false',
    addcal: 'false',
    excerptlength: '150',
    thumbnail: 'true',
    innerClass: '',
};

export default Compact;
