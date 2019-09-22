/* eslint-disable react/jsx-filename-extension */
/* eslint-disable func-names */
import Localist from './index';
//const Localist = require ('./index')
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
                        Localist(data);
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
        Localist(data);
    });
}
