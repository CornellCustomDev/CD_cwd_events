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
    typeof Drupal !== 'undefined' &&
    typeof window === 'object'
) {
    (function($, Drupal, window) {
        Drupal.behaviors.cwdEvents = {
            attach(context) {
                $('div.events-listing', context)
                    .once('cwd_events')
                    .each(function() {
                        const data = { ...this.dataset };
                        data.win = window;
                        ReactDOM.render(
                            <Localist />,
                            document.getElementById(data.target)
                        );
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
            depts,
            entries,
            format,
            group,
            keyword,
            heading,
            filterby,
            calendarurl,
            apikey,
            addcal,
            pref_excerpt_length,
            filterby_filters,
            days,
            page,
            pagination,
            wrapperclass,
            eventslistclass,
            eventclass,
        } = { ...elem.dataset };
        ReactDOM.render(<Localist
            win= {window}
            target= {target}
            depts= {depts}
            entries= {entries}
            format= {format}
            group= {group}
            keyword= {keyword}
            heading= {heading}
            filterby= {filterby}
            calendarurl= {calendarurl}
            apikey= {apikey}
            addcal= {addcal}
            pref_excerpt_length= {pref_excerpt_length}
            filterby_filters= {filterby_filters}
            days= {days}
            page= {page}
            pagination = {pagination}
            wrapperclass= {wrapperclass}
            eventslistclass= {eventslistclass}
            eventclass= {eventclass}
        />, document.getElementById(target));
    });
}
