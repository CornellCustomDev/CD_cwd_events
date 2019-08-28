import buildEvent from '../helpers/buildEvent';
import { CheckDate } from '../helpers/template-helpers';
import findAll from '../services/localistApiConnector';

const check = require('check-types');

/**
 * Test params property types.
 * @param {obj} params The block element data.
 * @param {obj} type The check.type
 * @return {boolean} Valid proptype.
 */
const checkPropTypes = (params, type) => {
    const valid = check.map(params, type);

    return check.all(valid);
};

/**
 * The base component
 * @param {obj} parm0 The base parameters.
 */
export default class LocalistComponent {
    constructor({
        target,
        depts,
        entries,
        group,
        format,
        heading,
        keyword,
        pref_category_filters,
        pref_category,
        innerTemplate,
        outerTemplate,
        addcal = 'false',
        pref_excerpt_length = '250',
        calendarurl = '//events.cornell.edu/api/2.1/events'
    }) {
        if (
            !checkPropTypes(
                {
                    target,
                    depts,
                    entries,
                    group,
                    format,
                    heading,
                    keyword,
                    addcal,
                    pref_category_filters,
                    pref_category,
                    pref_excerpt_length,
                    calendarurl
                },
                check.string
            ) &&
            !checkPropTypes({ innerTemplate, outerTemplate }, check.function)
        ) {
            console.warn('Invalid props types in localist base component.');
            return {};
        }
        // The wrapper template params.
        this.wrapperArgs = {
            target,
            title: 'Events List',
            heading,
            filters: {}
        };
        // The localist api request params
        this.requestArgs = {
            depts,
            entries,
            format,
            group,
            keyword,
            api_key: 'KLhy2GtuSAGirYGY', // Move api key to drupal block?
            calendarurl
        };

        // The build event params.
        this.BE_args = {
            pref_excerpt_length,
            pref_eventdetails: 'event details',
            addcal
        };
        this.findAll = findAll;

        // Is this used?
        this.group = group;
        this.depts = depts;
        this.entries = entries;

        // The categories to filter on.
        // Currently only uses group
        /** @todo add support for other filter options. */
        this.pref_category = pref_category;
        this.pref_category_filters = pref_category_filters;

        this.events = [];
        this.target = target;
        this.format = format; // used by inner template to check if standard
        this.innerTemplate = innerTemplate;
        this.outerTemplate = outerTemplate;
        /** @todo dont render here */

        if (typeof document !== 'undefined') {
            this.parent = document.getElementById(target);
            this.renderThrobber();
        } else {
            this.parent = null;
        }
        this.getLocalistEvents(this.requestArgs);
    }

    /**
     * Connects to localist and fetches event data.
     * After data is recieved sets the new Component state.
     * @param {obj} args The request params.
     */
    getLocalistEvents(args) {
        this.findAll(args)
            .then(response => {
                this.setState({ events: response.data.events });
            })
            .catch(error => {
                console.error(error);
            });
    }

    /**
     * Sets the new values and rerenders template.
     * @param {obj} args The target and the data { target: data }
     */
    setState(args) {
        const keys = Object.keys(args);
        keys.forEach(key => {
            this[key] = args[key];
        });
        this.render();
    }

    /**
     * Sets the filters for the template.
     * @todo This can use some refactoring.
     * @param {obj} event The localist event Json data.
     */
    buildFilters(event) {
        if (this.pref_category_filters) {
            if (
                this.pref_category === 'type' &&
                this.builtEvent.type !== 0 &&
                event.filters.event_types
            ) {
                this.wrapperArgs.filters[event.filters.event_types[0].name] = {
                    id: event.filters.event_types[0].id,
                    name: event.filters.event_types[0].name,
                    pref_category: this.pref_category
                };
            } else if (
                this.pref_category === 'dept' &&
                this.builtEvent.department !== 0 &&
                event.filters.departments
            ) {
                this.wrapperArgs.filters[event.filters.departments[0].name] = {
                    id: event.filters.departments[0].id,
                    name: event.filters.departments[0].name,
                    pref_category: this.pref_category
                };
            } else if (
                this.pref_category === 'group' &&
                this.builtEvent.group_name !== ''
            ) {
                this.wrapperArgs.filters[this.builtEvent.group_name] = {
                    id: this.builtEvent.group_id,
                    name: this.builtEvent.group_name,
                    pref_category: this.pref_category
                };
            }
        }
    }

    buildInnerHtml() {
        let inner = '';
        /** @todo fix issue with checkDate */
        const checkDate = this.format === 'standard' ? new CheckDate() : null;
        this.events.forEach(event => {
            this.builtEvent = buildEvent(event.event, this.BE_args);
            if (this.format === 'standard') {
                this.builtEvent.checkDate = checkDate;
            }
            this.buildFilters(event.event);
            inner += this.innerTemplate(this.builtEvent);
        });
        return inner;
    }

    /**
     * Renders the html template string.
     */
    render() {
        // remove loading animation timer
        if (this.c_loader) {
            clearTimeout(this.c_loader);
        }
        // replace this with map join
        const inner = this.buildInnerHtml();
        const outer = this.outerTemplate(inner, this.wrapperArgs);
        /** @todo set this somewhere else */
        if (this.parent) {
            this.parent.innerHTML = outer;
        }
    }

    /**
     * Inserts throbber while data is loading.
     * Throbber is timer is turned off and deleted on localList render.
     * @warning this.c_loader is defined here.
     */
    renderThrobber() {
        const loadingNode = /* html */ `
            <div class="fadeOut loader">
                <span class="fa fa-spin fa-cog"></span>
            </div>
        `;
        this.parent.insertAdjacentHTML('afterbegin', loadingNode);
        this.c_loader = setTimeout(() => {
            const [loader] = [...this.parent.getElementsByClassName('loader')];
            loader.classList.remove('fadeOut');
        }, 200); // skip loading animation if under 0.5s
    }
}
