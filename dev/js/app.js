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
                            format: this.dataset.format,
                            entries: this.dataset.entries,
                            heading: this.dataset.heading,
                            addCal: this.dataset.addCal,
                            keyword: this.dataset.keyword,
                            pref_category_filters: this.dataset
                                .prefCategoryFilters
                        });
                        LL.renderEvents();
                    });
            }
        };
    })(jQuery, Drupal);
} else {
    console.warn(`jQuery is ${typeof jQuery} and Drupal is ${typeof Drupal}`);
    const eventListings = document.getElementsByClassName('events-listing');
    for (let i = 0; i < eventListings.length; i++) {
        const elem = eventListings[i];
        const LL = new LocalList({
            target: elem.dataset.target,
            format: elem.dataset.format,
            entries: elem.dataset.entries,
            heading: elem.dataset.heading,
            addCal: elem.dataset.addCal,
            keyword: elem.dataset.keyword,
            pref_excerpt_length: elem.dataset.prefExcerptLength,
            pref_category_filters: elem.dataset.prefCategoryFilters
        });
        LL.renderEvents();
    }
}
