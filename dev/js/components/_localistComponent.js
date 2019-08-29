import buildEvent from '../helpers/buildEvent';
import { CheckDate } from '../helpers/template-helpers';
import findAll from '../services/localistApiConnector';
import paginatorTemplate from '../templates/paginationTemplate';
import eventHandler from '../helpers/eventHandler';
import { buildEventWrapperFilters } from '../helpers/eventFilters';

const check = require('check-types');

// Bind a persistent event handler function.
let handleclick;

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
        filterby_filters,
        filterby,
        innerTemplate,
        outerTemplate,
        addcal,
        pref_excerpt_length,
        calendarurl,
        apikey,
        page = '1',
        pagination
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
                    filterby_filters,
                    filterby,
                    pref_excerpt_length,
                    calendarurl,
                    pagination
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
            apikey, // Move api key to drupal block?
            calendarurl,
            page
        };
        // The build event params.
        this.BE_args = {
            pref_excerpt_length,
            pref_eventdetails: 'event details',
            addcal
        };
        this.loaded = false;
        this.findAll = findAll;
        // Is this used?
        this.group = group;
        this.depts = depts;
        this.entries = entries;
        // The categories to filter on.
        this.filterby = filterby;
        this.filterby_filters = filterby_filters;
        this.events = [];
        this.target = target;
        this.format = format; // used by inner template to check if standard
        this.innerTemplate = innerTemplate;
        this.outerTemplate = outerTemplate;
        // Event data.
        this.date = {};
        this.page = {};

        // Sets if pagination should be used or not.
        this.pagination = pagination;
        // Should this be in a seperate render function?
        // Renders element on construction.
        if (typeof document !== 'undefined') {
            this.parent = document.getElementById(target);
            // remove any DOM event listeners before you add them.
            this.parent.removeEventListener('click', handleclick, true);
            this.eventListeners();
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
        const beargs = args || this.requestArgs;
        this.findAll(beargs)
            .then(response => {
                this.setState({
                    events: response.data.events,
                    date: response.data.date,
                    page: response.data.page
                });
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
     * Sets the rapperArgs filters for the template.
     * @param {obj} event The localist event obj.
     */
    buildFilters(event) {
        buildEventWrapperFilters(event, this);
    }

    /**
     * Bulds pagination if used.
     * @return {string} A HTML string.
     */
    buildPagination() {
        if (this.pagination !== 'true') {
            return '';
        }
        // attach events
        const paginator = paginatorTemplate(this.page);
        return paginator.render();
    }

    /**
     * Bulds the inner HTML template.
     * @return {string} A HTML string.
     */
    buildInnerHtml() {
        let inner = '';
        // standard is the only format that uses a date grouping wrapper.
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
     * Handles window events { filters and pagination }.
     */
    eventListeners() {
        handleclick = eventHandler(this);
        this.parent.addEventListener('click', handleclick, true);
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
        let outer = this.outerTemplate(inner, this.wrapperArgs);
        outer += this.buildPagination();
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
            <div class="loader">
                <span class="fa fa-spin fa-cog"></span>
            </div>
        `;
        this.parent.innerHTML = loadingNode;
        this.c_loader = setTimeout(() => {
            const [loader] = [...this.parent.getElementsByClassName('loader')];
            if (loader) {
                loader.classList.remove('fadeOut');
            }
        }, 500); // skip loading animation if under 0.5s
    }
}
