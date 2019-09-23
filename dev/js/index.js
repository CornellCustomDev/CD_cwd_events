/* eslint-disable react/jsx-filename-extension */
/* eslint-disable func-names */
import ReactDOM from 'react-dom';
import React from 'react';
import Localist from './localist';

// module.exports = {
//     run: function (args) {
//         run(args)
//     }
// }


const run = props => {
    const {
        target,
        heading,
        calendarurl,
        apikey,
        format,
        entries,
        daysahead,
        depts,
        group,
        keyword,
        hidedescription,
        truncatedescription,
        hideimages,
        hideaddcal,
        hidepagination,
        filterby,
        wrapperclass,
        listclass,
        itemclass,
    } = props;
    if (typeof document === 'undefined' || !document.getElementById(target)) {
        console.warn(`invalid target: ${target}`);
        return;
    }
    ReactDOM.render(<Localist
        target= {target}
        depts= {depts}
        entries= {entries}
        daysahead= {daysahead}
        format= {format}
        group= {group}
        keyword= {keyword}
        heading= {heading}
        filterby= {filterby}
        calendarurl= {calendarurl}
        apikey= {apikey}
        hideaddcal= {hideaddcal}
        hidedescription= {hidedescription}
        truncatedescription= {truncatedescription}
        hideimages= {hideimages}
        hidepagination = {hidepagination}
        wrapperclass= {wrapperclass}
        listclass= {listclass}
        itemclass= {itemclass}
    />, document.getElementById(target));
}
// Add localist to the dom.
if (typeof window !== 'undefined'){
    window.Localist = run;
}

export default run;
