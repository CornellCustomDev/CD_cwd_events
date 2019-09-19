import React from 'react';
import PropTypes from 'prop-types';
import {
    getEventDate,
    getEventTime,
} from '../helpers/displayEvent';

const ClassicInner = props => {
    const {event, itemclass} = props;
    const eventTime = getEventTime(event);
    const date = getEventDate(event);
    return (
        <div className={`views-row ${itemclass}`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 event-title-and-location">
                        <div>
                            <a href="${builtData.event.localist_url}"
                            >{event.title}</a
                            >
                        </div>
                        <div>
                            <span className="event-date">{date}</span>
                            -
                            {eventTime}{
                                event.location_name
                                    ? ` | ${event.location_name}`
                                    : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ClassicInner.propTypes = {
    event: PropTypes.object.isRequired,
    itemclass: PropTypes.string.isRequired,
};

const Classic= props =>{
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
                            <ClassicInner
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

Classic.propTypes = {
    events: PropTypes.array,
    wrapperclass: PropTypes.string,
    listclass: PropTypes.string,
    itemclass: PropTypes.string,
};

Classic.defaultProps = {
    events: [],
    wrapperclass: '',
    listclass: '',
    itemclass: '',

};
export default Classic;
