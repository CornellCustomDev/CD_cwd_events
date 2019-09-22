/* eslint-disable react/forbid-prop-types */
import React, { useState }  from 'react';
import PropTypes from 'prop-types';

import {
    getTypeIds,
    getGroupId,
    getDepartmentIds,
} from '../helpers/displayEvent';

/**
 * @todo ad target id to data filter string.
 * @param {obj} props The props.
 */
const EventFilters = props => {
    const {filterObjs, handleEventFilter, filterby, events} = props;
    if (filterby === 'none'){
        return '';
    }
    const filterKeys = Object.keys(filterObjs);
    const [active, setActive] = useState('filterAll');

    const applyFilter = obj => {
        if (obj.name === 'filterAll'){
            handleEventFilter(events);
        } else {
            const filters = events.filter( event => {
                if (filterby === 'type' && getTypeIds(event.event).includes(obj.id)){
                    return event;
                }else if (filterby === 'dept' && getDepartmentIds(event.event).includes(obj.id)){
                    return event;
                } else if (filterby === 'group' && getGroupId(event.event).includes(obj.id)){
                    return event;
                }
            })
            handleEventFilter(filters);
        }
    }

    return (
        <div className="events-filters-wrap">
            <h3 className="hidden">Show:</h3>
            <ul className="events-filters">
                <li>
                    <button
                        id="filterAll"
                        data-filter="all"
                        className={`filter-btn ${active === 'filterAll' ? 'active' : ''}`}
                        type="button"
                        onClick={()=>{
                            const obj = {id:'filterAll', name:'filterAll'};
                            applyFilter(obj);
                            setActive('filterAll')
                        }}
                    >
                All Events
                    </button>
                </li>
                {filterKeys.map(key => {
                    const obj = filterObjs[key];
                    const {id, name} = obj;
                    const filterId = 'filter'+id
                    return (
                        <li key={id} >
                            <button
                                id={filterId}
                                data-filter='filter'
                                className={`filter-btn ${active === filterId ? 'active' : ''}`}
                                type="button"
                                onClick={()=>{
                                    applyFilter(obj);
                                    setActive(filterId);
                                }}
                            >{name}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

EventFilters.propTypes = {
    // Filterby will have shape of uniquefiltername:{id:integer, name:string, filterby:string}.
    filterObjs: PropTypes.object.isRequired,
    handleEventFilter: PropTypes.func.isRequired,
    filterby: PropTypes.string.isRequired,
    events: PropTypes.array.isRequired,
}

export default EventFilters
