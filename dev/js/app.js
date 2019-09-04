/* eslint-disable func-names */
import localList from './localList';

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
                        localList(data);
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
        const data = { ...elem.dataset };
        data.win = window;
        localList(data);
    });
    // If not drupal expose localList.
    if (typeof window === 'object') {
        window.localList = localList;
    }
}
