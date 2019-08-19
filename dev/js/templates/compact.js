/**
 *
 * @param {obj} builtData A buildEvents.js obj.
 * @return {string} Html string
 */
import { add_calendar } from '../helpers/template-helpers';

export const compactInner = builtData => /* html */ `
<div
    class="event-node dept-${builtData.department} node
    type-${builtData.type} group-${builtData.group_id}"
>
    <h3>
        <a
            target="_blank"
            href="${builtData.event.localist_url}"
        >
            ${builtData.event.title}
        </a>
    </h3>
    ${
        builtData.event_date_compact
            ? `<h4 class="meta date"><span class="fulldate">${
                  builtData.event_date_compact
              }</span></h4>`
            : ''
    }
    ${
        builtData.event.location_name
            ? `<h4 class="meta location">${builtData.event.location_name}</h4>`
            : ''
    }
    <p class="description">
        ${builtData.description}
        <a
            class="read-more more"
            href="${builtData.event.localist_url}"
            target="_blank"
        > read more
        <span class='visually-hidden'> about ${builtData.event.title}</span>
        </a>
    </p>
    ${builtData.addCal ? `${add_calendar(builtData.event)}` : ''}
</div><!--end of node -->`;

/**
 *
 * @param {string} inner The html inner string.
 * @param {obj} args Mostly unused try and remove these.
 * @return {string} Html string
 */
export const compactWrapper = (inner, args) => /* html */ `
    <section class='standard' id="standarCompact" title="Events List">
    ${args.heading ? `<h2>${args.heading}</h2>` : ''}
        <div class="main-body">
            <div class="events-listing no-thumbnails compact">
                <!--filters options not supported -->
                <div class="events-list">
                    ${inner}
                </div>
            </div><!--events listing -->
        </div><!-- main-body -->
    </section><!--end of section -->`;
