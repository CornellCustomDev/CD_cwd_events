/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { add_calendar } from '../helpers/template-helpers';
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
    getDepartment,
    getEventDateCompact
} from '../helpers/displayEvent';
import EventFilters from './filter';

const CompactInner = props => {
    const {event} = props;

    const renderEventDate = (event) => {
        const gedc = getEventDateCompact(event);
        if (gedc){
            return(
                <h4 className="meta date">
                    <span className="fulldate">
                        {getEventDateCompact(event)}
                    </span>
                </h4>
            )
        }
    }

    const renderEventLocation = (event) => {
        if (event.location_name) {
            return <h4 className="meta location">{event.location_name}</h4>
        }
    }
    return (
        <div
            className={`event-node dept-${getDepartment(event)} node
    type-${getType(event)} group-${getGroupId(event)}`}
        >
            <h3>
                <a
                    target="_blank"
                    href="{builtData.event.localist_url}"
                >
                    {event.title}
                </a>
            </h3>
            { renderEventDate(event) }
            { renderEventLocation(event) }
            <p className="description">
                {getTruncDesc(event, '150')}
                <a
                    className="read-more more"
                    href="${builtData.event.localist_url}"
                    target="_blank"
                > read more
                    <span className='visually-hidden'> about ${event.title}</span>
                </a>
            </p>
        </div>
    )
}

const Compact = (props) => {
    // const [count, setCount] = useState(5);
    const {events, filterby} = props;
    const filters = {};

    const buildEventWrapperFilters = (event) => {
        // const department = getDepartment(event);
        // const type = getType(event);
        const group_name = getGroupName(event);
        const group_id = getGroupId(event);
        // const event_types = getEventType(event, filterby);
        if (
            filterby === 'type' &&
            event.filters.event_types
        ) {
            filters[event.filters.event_types[0].name] = {
                id: event.filters.event_types[0].id,
                name: event.filters.event_types[0].name,
                filterby: filterby
            };
        } else if (
            filterby === 'dept' &&
            event.filters.departments
        ) {
            filters[event.filters.departments[0].name] = {
                id: event.filters.departments[0].id,
                name: event.filters.departments[0].name,
                filterby: filterby
            };
        } else if (
            filterby === 'group' &&
            group_name !== ''
        ) {
            filters[group_name] = {
                id: group_id,
                name: group_name,
                filterby: filterby
            };
        }
    };

    return (
        <section className='standard' id="standardCompact" title="Events List">
            <div className="main-body">
                <div className="events-listing no-thumbnails compact">
                    <EventFilters filterObjs={filters} />
                    <div className="events-list">
                        { events.map( event => {
                            buildEventWrapperFilters(event.event)
                            return <CompactInner
                                key={event.event.id}
                                event={event.event}
                            />;
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

Compact.propTypes = {
    events: PropTypes.array,
    filterby: PropTypes.string.isRequired,
};

Compact.defaultProps = {
    events: [],
};

CompactInner.propTypes = {
    event: PropTypes.object,
};

CompactInner.defaultProps = {
    event: {},
};

export default Compact;
