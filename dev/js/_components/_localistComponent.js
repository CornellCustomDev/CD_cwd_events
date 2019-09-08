import buildEvent from '../helpers/buildEvent';
import { CheckDate } from '../helpers/template-helpers';
import findAll from '../services/localistApiConnector';
import paginatorTemplate from '../templates/paginationTemplate';
import eventHandler from '../helpers/eventHandler';
import { buildEventWrapperFilters } from '../helpers/eventFilters';
import { checkLocalistPropTypes } from '../helpers/common';

// Bind a persistent event handler function.
let handleclick;

/**
 * The base component
 * @param {obj} props The base parameters.
 */
export default class LocalistComponent {
    constructor(props) {
        if (!checkLocalistPropTypes(props)) {
            console.warn('Invalid props types in localist base component.');
            return {};
        }
        this.props = props;
        this.parent = props.win.document.getElementById(props.target);
        if (!this.parent) {
            console.warn('Target not found');
            return {};
        }
        // remove any DOM event listeners before you add them.
        this.parent.removeEventListener('click', handleclick, true);
        // The wrapper template params.
        this.wrapperArgs = {
            target: props.target,
            heading: props.heading,
            filters: {}
        };
        // The localist api request params
        this.requestArgs = {
            depts: props.depts,
            entries: props.entries,
            format: props.format,
            group: props.group,
            keyword: props.keyword,
            apikey: props.apikey,
            calendarurl: props.calendarurl,
            page: props.page,
            days: props.days
        };
        // The localist api connector
        this.findAll = findAll;
        // Holders for the response data
        this.events = [];
        this.date = {};
        this.page = {};

        // The build event params.
        // @todo move these last two to templates
        this.BE_args = {
            pref_excerpt_length: props.pref_excerpt_length,
            addcal: props.addcal
        };

        // this.pagination = props.pagination;
        this.eventListeners();
        this.renderThrobber();
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
                if (typeof response.data.events !== 'undefined') {
                    this.setState({
                        events: response.data.events,
                        date: response.data.date,
                        page: response.data.page
                    });
                } else {
                    console.warn('localist returned invalid data');
                }
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
     * Bulds pagination if used.
     * @return {string} A HTML string.
     */
    buildPagination() {
        if (this.props.pagination !== 'true') {
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
        const checkDate =
            this.props.format === 'standard' ? new CheckDate() : null;
        this.events.forEach(event => {
            this.builtEvent = buildEvent(event.event, this.BE_args);
            if (this.props.format === 'standard') {
                this.builtEvent.checkDate = checkDate;
            }
            buildEventWrapperFilters(event.event, this);
            inner += this.props.innerTemplate(this.builtEvent);
        });
        return inner;
    }

    /**
     * Handles window events { filters and pagination }.
     * @return {mixed} The handle clisck event.
     */
    eventListeners() {
        handleclick = eventHandler(this);
        this.parent.addEventListener('click', handleclick, true);
        return handleclick;
    }

    /**
     * Renders the html template string.
     * @return {string} A html string with inner and outer templates.
     */
    render() {
        // remove loading animation timer
        if (this.c_loader) {
            clearTimeout(this.c_loader);
        }
        const inner = this.buildInnerHtml();
        let outer = this.props.outerTemplate(inner, this.wrapperArgs);
        outer += this.buildPagination();
        this.doRender(outer);
        return outer;
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
        this.doRender(loadingNode);
        this.c_loader = setTimeout(() => {
            const [loader] = [...this.parent.getElementsByClassName('loader')];
            if (loader) {
                loader.classList.remove('fadeOut');
            }
        }, 500); // skip loading animation if under 0.5s
    }

    doRender(innerhtml) {
        this.parent.innerHTML = innerhtml;
    }
}
