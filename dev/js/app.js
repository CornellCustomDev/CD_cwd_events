import localList from './localist';

require('babel-polyfill');

/* eslint-disable func-names */
/** *********************** START LOCALIST ********************************* /
 * Localist Events
 * javascript es6 requires {core/Drupal, core/jQuery, core/jQuery.once cwd_events.js}
 * @author CU Custom Development
 *  self invoking anonymous function, using drupal behaviours API.
 *
 * @param {jQuery} $
 * @param {Drupal} Drupal
 */
if (typeof jQuery !== 'undefined' && typeof Drupal !== 'undefined') {
    (function($, Drupal) {
        Drupal.behaviors.cwdEvents = {
            attach(context) {
                $('div.events-listing', context)
                    .once('cwd_events')
                    .each(function() {
                        localList({ ...this.dataset });
                    });
            }
        };
    })(jQuery, Drupal);
} else {
    console.warn(`jQuery is ${typeof jQuery} and Drupal is ${typeof Drupal}`);
    const eventListings = [
        ...document.getElementsByClassName('events-listing')
    ];
    eventListings.forEach(elem => {
        // Convert DOMStringMap to object.
        localList({ ...elem.dataset });
    });
}
