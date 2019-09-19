/* eslint-disable react/jsx-filename-extension */
/* eslint-disable func-names */
import ReactDOM from 'react-dom';
import React from 'react';
import Localist from './localist';

require('babel-polyfill');

/** *********************** START LOCALIST ********************************* /
 * Localist Events
 * javascript es6 requires {core/Drupal, core/jQuery, core/jQuery.once cwd_events.js}
 * @author CU Custom Development
 *  self invoking anonymous function, using drupal behaviours API.
 *
 * @param {jQuery} $
 * @param {Drupal} Drupal
 */
if (
    typeof jQuery === 'function' &&
    typeof Drupal !== 'undefined'
) {
    (function($, Drupal) {
        Drupal.behaviors.cwdEvents = {
            attach(context) {
                $('div.events-listing', context)
                    .once('cwd_events')
                    .each(function() {
                        const data = { ...this.dataset };
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
                        } = data;
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
                    });
            }
        };
    })(jQuery, Drupal, window);
} else {
    console.warn(`jQuery is ${typeof jQuery} and Drupal is ${typeof Drupal}`);
    const eventListings = [
        ...document.getElementsByClassName('events-listing')
    ];
    eventListings.forEach(elem => {
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
        } = { ...elem.dataset };
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
            hidepagination = {hide4pagination}
            wrapperclass= {wrapperclass}
            listclass= {listclass}
            itemclass= {itemclass}
        />, document.getElementById(target));
    });
}
