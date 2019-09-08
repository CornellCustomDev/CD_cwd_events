/* eslint-disable react/forbid-prop-types */
import React, { useState }  from 'react';
import PropTypes from 'prop-types';

/**
 * @todo ad target id to data filter string.
 * @param {obj} props The props.
 */
const EventFilters = props => {
    const {filterObjs} = props;
    const filterKeys = Object.keys(filterObjs);
    const [active, setActive] = useState('filterAll');

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
                                    setActive(filterId)
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
    filterObjs: PropTypes.object.isRequired,
}

export default EventFilters
