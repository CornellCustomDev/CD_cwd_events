import LocalistView from 'localist-viewer';

require('babel-polyfill');

/** *********************** START LOCALIST *********************************** /
 * CWD Events
 * requires {Drupal, jQuery, jQuery.once drupalSettings localist-viewer}
 * @author CU Custom Development
 *  self invoking anonymous function, using drupal behaviours API.
 *
 * @param {jQuery} $
 * @param {Drupal} Drupal
 * @param {obj} drupalSettings
 **************************************************************************** */
if (
    typeof jQuery === 'function' &&
    typeof Drupal !== 'undefined' &&
    typeof drupalSettings !== 'undefined'
) {
    (function ($, Drupal, drupalSettings) {
        Drupal.behaviors.cwd_events = {
            attach(context) {
                $('div.events-listing', context)
                    .once('cwd_events')
                    .each(function() {
                        console.log(drupalSettings.cwd_events);
                        LocalistView(drupalSettings.cwd_events);
                    });
            }
        };
    })(jQuery, Drupal, drupalSettings);
} else {
    console.warn(`jQuery is ${typeof jQuery} and Drupal is ${typeof Drupal}`);
    const eventListings = [
        ...document.getElementsByClassName('events-listing')
    ];
    eventListings.forEach(elem => {
        const data = { ...elem.dataset };
        LocalistView(data);
    });
}
