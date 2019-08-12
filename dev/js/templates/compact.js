/* eslint-disable camelcase */
import { add_calendar } from './template-helpers';

export const compactInner = builtData => `
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
            href="${builtData.event.localist_url}/#"
            target="_blank"
        >
            ${builtData.pref_readmore}
            <span class='visually-hidden'> about ${builtData.event.title}</span>
        </a>
    </p>
    ${builtData.addCal ? `${add_calendar(builtData.event)}` : ''}
</div><!--end of node -->`;

// this has class compact only difference
export const compactWrapper = (inner, args) => `
    <section class='standard' id="standarCompact" title="${args.title}">
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
