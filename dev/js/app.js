import LocalList from './localist';

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
                        const LL = new LocalList({
                            target: this.id,
                            dept: this.dataset.depts,
                            entries: this.dataset.entries,
                            format: this.dataset.format,
                            group: this.dataset.group,
                            keyword: this.dataset.keyword,
                            heading: this.dataset.heading
                        });
                        LL.renderEvents();
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
        const LL = new LocalList({
            target: elem.dataset.target,
            dept: elem.dataset.dept,
            entries: elem.dataset.entries,
            format: elem.dataset.format,
            group: elem.dataset.group,
            keyword: elem.dataset.keyword,
            heading: elem.dataset.heading,
            addCal: elem.dataset.addCal
        });
        LL.renderEvents();
    });
}
