/* eslint-disable func-names */
/** *********************** START LOCALIST ********************************* /
 * Localist Events
 * javascript es5 requires {core/jQuery, core/jQuery.once cwd_events.js}
 * @author CU Custom Development
 *  self invoking anonymous function, using drupal behaviours API.
 *
 * @param {jQuery} $
 * @param {Drupal} Drupal
 * @param {Drupal} window
 */

(function($, Drupal, window) {
    Drupal.behaviors.megamenu = {
        attach(context, settings) {
            $('div.events-listing', context)
                .once('cwd_events')
                .each(function() {
                    const LL = new window.CWD_LocalList({
                        target: this.id,
                        format: this.dataset.format,
                        entries: this.dataset.entries,
                        heading: this.dataset.heading,
                        addCal: this.dataset.addCal,
                        keyword: this.dataset.keyword,
                        pref_category_filters: this.dataset.prefCategoryFilters
                    });
                    LL.renderEvents();
                });
        }
    };
})(jQuery, Drupal, window);
