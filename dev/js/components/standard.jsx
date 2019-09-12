import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    getTruncDesc,
    getTypeIds,
    getEventTime,
    getEventType,
    getMonthHeader,
    getDisplayDate,
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

const StandardInner = props => {
    const {event, filterby, addcal, excerptlength, thumbnail, innerClass} = props;

    const renderEventTime = (event) => {
        const gedc = getEventTime(event);
        if (gedc){
            return(
                <h4 className="meta date">
                    <span className="start">
                        {getEventTime(event)}
                    </span>
                </h4>
            )
        }
    }

    const renderEventLocation = (event) => {
        if (event.location_name) {
            return (
                <h4 className="meta location">{event.location_name}</h4>
            )
        }
    }

    const renderThumbnail = (event) => {
        // const photoBigSquare = event.photo_url.replace('huge', 'big_square');
        const photoBig = event.photo_url.replace('huge', 'big');
        if (thumbnail === 'true') {
            return (
                <img
                    alt={event.title}
                    height="200"
                    src={photoBig}
                    width="200"
                ></img>

            )
        }
    }



    const renderEventTypes = (event, filterby) => {
        const eventTypes = getEventType(event, filterby);
        if (eventTypes) {
            return (
                <h4 className="meta type">
                    <span className="fa"></span>
                    {eventTypes.map(event_type => {
                        return event_type.name
                    }).join(', ')}
                </h4>
            )
        }
    }

    const renderDescription = event => {
        return (
            <p className="description">
                {getTruncDesc(event, excerptlength)}
                <a
                    className="read-more more"
                    href={event.localist_url}
                    rel='noreferrer noopener'
                    target="_blank"
                > read more
                    <span className='visually-hidden'> about ${event.title}
                    </span>
                </a>
            </p>
        )
    }

    return (
        <div className={`views-row ${innerClass}`}>
            <div className="event-node node">
                <RenderTitle title={event.title} url={event.localist_url} />
                <RenderLocation locationName={event.location_name} />
                <div>
                    <RenderDate date={getEventTime(event)} />
                    {renderEventTypes(event, filterby)}
                </div>
                <RenderThumbnail
                    photoUrl={event.photo_url}
                    title={event.title}
                    thumbnail={thumbnail}
                    photoCrop='big'
                />
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

StandardInner.propTypes = {
    event: PropTypes.object,
    filterby: PropTypes.string.isRequired,
    addcal: PropTypes.string.isRequired,
    excerptlength: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    innerClass: PropTypes.string,
};

StandardInner.defaultProps = {
    event: {},
    innerClass: '',
};

const Standard = (props) => {
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
    let lastMonth = '';
    let lastDay = '';

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

    const getMonth = event => {
        const month = getMonthHeader(event);
        if (lastMonth !== month) {
            lastMonth = month;
            return (
                <h3 className="month-header">{month}</h3>
            )
        }
        return '';
    }

    const getDay = (event, filterby) => {
        const displayDate = getDisplayDate(event, filterby);
        if (lastDay !== displayDate) {
            lastDay = displayDate;
            return (
                <h4 className="day-header">
                    <span className="fa fa-calendar-o"></span>
                    {displayDate}
                </h4>
            )
        }
        return '';
    }

    return (
        <section className="standard" id="eventStandard" title="Events List">
            <div className="main-body">
                <div className={`events-listing ${thumbNailClass}`}>
                    { usefilterby === 'true'
                        ? <EventFilters
                            filterObjs={filterObjs}
                            applyFilter={applyFilter}
                        />
                        : ''}
                    <div className="events-list">
                        { filterEvents.length > 0
                            ? filterEvents.map( event => {
                                return (
                                    <div key={event.event.id}>
                                        { getMonth(event.event) }
                                        { getDay(event.event, filterby) }
                                        <StandardInner
                                            event={event.event}
                                            filterby={filterby}
                                            addcal={addcal}
                                            excerptlength={excerptlength}
                                            thumbnail={thumbnail}
                                        />
                                    </div>
                                )})
                            : <p>There are no upcomming events.</p>}
                    </div>
                </div>
            </div>
        </section>
    );
}

Standard.propTypes = {
    events: PropTypes.array,
    filterby: PropTypes.string.isRequired,
    usefilterby: PropTypes.string,
    addcal: PropTypes.string,
    excerptlength: PropTypes.string,
    thumbnail: PropTypes.string,
};

Standard.defaultProps = {
    events: [],
    usefilterby: 'true',
    addcal: 'true',
    excerptlength: '250',
    thumbnail: 'true',
};

export default Standard;
