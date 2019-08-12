/* eslint-disable func-names */
/* eslint-disable camelcase */
import { eventFilters, add_calendar } from './template-helpers';

/*
    tests to see if month / day should be displayed
    for calendar page format
*/
class CheckDate {
    constructor() {
        this.lastMonth = '';
        this.lastDay = '';
    }

    month(builtData) {
        if (this.lastMonth !== builtData.month) {
            this.lastMonth = builtData.month;
            return `<h3 class="month-header">${builtData.monthHeader}</h3>`;
        }
        return '';
    }

    day(builtData) {
        if (this.lastDay !== builtData.displayDate) {
            this.lastDay = builtData.displayDate;
            return `<h4 class="day-header"><span class="fa fa-calendar-o"></span>${
                builtData.displayDate
            }</h4>`;
        }
        return '';
    }
}

const checkDate = new CheckDate();

// test for empty headings
export const standardInner = builtData => `
    ${checkDate.month(builtData)}
    ${checkDate.day(builtData)}
    <div class="event-node node dept-${builtData.department} type-${
    builtData.type
} group-${builtData.group_id}">
            <h3><a target="_blank" href="${builtData.event.localist_url}">${
    builtData.event.title
}</a></h3>
            ${
                builtData.event_time
                    ? `<h4 class="meta date"><span class="start">${
                          builtData.event_time
                      }</span></h4>`
                    : ''
            }
            ${
                builtData.event.location_name
                    ? `<h4 class="meta location">${
                          builtData.event.location_name
                      }</h4>`
                    : ''
            }
            ${
                builtData.event_types
                    ? `<h4 class="meta type"><span class="fa"></span>${
                          builtData.event_types
                      }</h4>`
                    : ''
            }
            <p class="description">${builtData.description}
                <a class="read-more more" href="${
                    builtData.event.localist_url
                }/#" target="_blank">${
    builtData.pref_readmore
}<span class='visually-hidden'> about ${builtData.event.title}</span></a>
            </p>
            ${builtData.addCal ? `${add_calendar(builtData.event)}` : ''}
    </div><!--end of node -->`;

export const standardWrapper = (inner, args) => `
    <section class='standard' id='eventStandard' title="${args.title}">
    ${args.heading ? `<h2>${args.heading}</h2>` : ''}
        <div class="main-body">
            <div class="events-listing no-thumbnails" >
                ${eventFilters(args.filters, args.target)}
                <div class="events-list">
                    ${inner}
                </div>
            </div><!--events listing -->
        </div><!-- main-body -->
    </section><!--end of section -->`;
