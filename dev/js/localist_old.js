/* eslint-disable camelcase */
import findall from './service/localistApi';
import BuildEvent from './buildEvent';
import { standardInner, standardWrapper } from './templates/standard';
import { compactInner, compactWrapper } from './templates/compact';
import { calendarInner, calendarWrapper } from './templates/inlineCompact';
import {
    modernCompactInner,
    modernCompactWrapper
} from './templates/modernCompact';
import {
    moderStandardInner,
    modernStandardWrapper
} from './templates/modernStandard';
import {
    cuenergyEventsInner,
    cuenergyEventsWrapper,
    cuenergyCompactInner,
    cuenergyCompactWrapper
} from './templates/cuenergy';
import { archiveInner, archiveWrapper } from './templates/archive';

import Test from './components/archive';

export default class LocalList {
    // define the following arguments
    constructor({
        target = 'events-listing',
        depts = '0',
        entries = '10',
        format = 'standard',
        group = '0',
        keyword = false,
        heading = '',
        addCal = false // add to google/outlook/ical options
    }) {


        // localist variables
        this.target = target;
        this.format = format;

        // standard wrapper variables
        this.wrapperArgs = {
            target,
            title: 'Events List',
            heading,
            filters: {}
        };

        // required by service findall to request localist data
        this.requestArgs = {
            entries: parseInt(entries, 10),
            depts,
            format,
            group,
            singleday: false,
            keyword,
            api
        };

        // build event variables required for inner HTML logic
        this.BE_args = {
            pref_excerpt_length: 250,
            pref_excerpt_length_compact: 125,
            pref_readmore: 'read more',
            pref_eventdetails: 'event details',
            addCal
        };
    }

    renderEvents() {
        // add the loading throbber
        this.addThrobber(this.target);
        // test  to see if custom templates are defined
        if (!('innerTemplate' in this) && !('outerTemplate' in this)) {
            // if not defined set format of template
            this.innerTemplate = standardInner;
            this.outerTemplate = standardWrapper;
            switch (this.format) {
                case 'standard':
                    this.innerTemplate = standardInner;
                    this.outerTemplate = standardWrapper;
                    break;
                case 'compact':
                    this.innerTemplate = compactInner;
                    this.outerTemplate = compactWrapper;
                    break;
                case 'inline_compact':
                    this.innerTemplate = calendarInner;
                    this.outerTemplate = calendarWrapper;
                    break;
                case 'modern_compact':
                    // overide exerpt length this should be added to drupal form options
                    this.BE_args.pref_excerpt_length = 125;
                    this.innerTemplate = modernCompactInner;
                    this.outerTemplate = modernCompactWrapper;
                    break;
                case 'modern_standard':
                    this.innerTemplate = moderStandardInner;
                    this.outerTemplate = modernStandardWrapper;
                    break;
                case 'simple_standard':
                    this.innerTemplate = cuenergyEventsInner;
                    this.outerTemplate = cuenergyEventsWrapper;
                    break;
                case 'simple_compact':
                    this.innerTemplate = cuenergyCompactInner;
                    this.outerTemplate = cuenergyCompactWrapper;
                    break;
                case 'archive':
                    this.innerTemplate = archiveInner;
                    this.outerTemplate = archiveWrapper;
                    break;
                default:
                    console.warn(
                        'Warning: no format was defined using fallback standard'
                    );
            }
        } else {
            console.warn('using custom templates');
        }
        // fetch localist events and build the event nodes
        this.getAndBuildList();
    }

    /*
        inserts throbber after target elem
        this is deleted on localList render
        warning this.c_loader may be undefined
     */
    addThrobber(target) {
        const loadingNode = /* html */ `
            <div id="loader" class="fadeOut">
                <span class="fa fa-spin fa-cog"></span>
            </div>
        `;
        const tarElem = document.getElementById(target);
        if (tarElem) {
            tarElem.insertAdjacentHTML('afterbegin', loadingNode);
            this.c_loader = setTimeout(() => {
                document.getElementById('loader').classList.remove('fadeOut');
            }, 200); // skip loading animation if under 0.5s
        } else {
            console.warn(
                'WARNING: can not find target element for loading animation'
            );
        }
    }

    /* get the events */
    getAndBuildList() {
        findall(this.requestArgs)
            .then(response => {
                this.buildEventsList(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    buildEventsList(myObj) {
        let inner = '';
        // loop through each event () => required to give access to 'this'
        myObj.events.forEach(event => {
            // built event provides common functions to format the data
            const builtEvent = new BuildEvent(event.event, this.BE_args);
            // console.log( builtEvent );
            // build the filters array does not support multiple filter entries [0]only
            if (this.pref_category_filters) {
                if (this.pref_category === 'type' && builtEvent.type !== 0) {
                    this.wrapperArgs.filters[
                        event.filters.event_types[0].name
                    ] = {
                        id: event.filters.event_types[0].id,
                        name: event.filters.event_types[0].name,
                        pref_category: this.pref_category
                    };
                } else if (
                    this.pref_category === 'dept' &&
                    builtEvent.department !== 0
                ) {
                    this.wrapperArgs.filters[
                        event.filters.departments[0].name
                    ] = {
                        id: event.filters.departments[0].id,
                        name: event.filters.departments[0].name,
                        pref_category: this.pref_category
                    };
                } else if (
                    this.pref_category === 'group' &&
                    builtEvent.group_name !== ''
                ) {
                    this.wrapperArgs.filters[builtEvent.group_name] = {
                        id: builtEvent.group_id,
                        name: builtEvent.group_name,
                        pref_category: this.pref_category
                    };
                }
            }
            // console.log(builtEvent);
            inner += this.innerTemplate(builtEvent); // returns html string
        });

        const html = this.outerTemplate(inner, this.wrapperArgs); // returns html string

        // remove loading animation timer
        clearTimeout(this.c_loader);
        // the loader is replaced by html
        // document.getElementById('loader').classList.remove('fadeIn');
        const tarElem = document.getElementById(this.target);
        if (tarElem) {
            tarElem.innerHTML = html;
        } else {
            console.warn('WARNING: target element does not exist');
        }
    }
}

const test = new Test({ target: 'test' });
