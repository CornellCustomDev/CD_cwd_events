import findAll from '../service/localistApi';
import BuildEvent from '../buildEvent';
/**
 * The base component.
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
        addCal,
        pref_category_filters,
        pref_category,
        innerTemplate,
        outerTemplate
    }) {
        // standard wrapper variables
        this.wrapperArgs = {
            target,
            title: 'Events List',
            heading,
            filters: {}
        };
        // required by service findall to request localist data
        this.requestArgs = {
            depts,
            entries: parseInt(entries, 10),
            format,
            group,
            keyword
        };

        // build event variables required for inner HTML logic
        this.BE_args = {
            pref_excerpt_length: 250,
            pref_excerpt_length_compact: 125,
            pref_readmore: 'read more',
            pref_eventdetails: 'event details',
            addCal
        };
        this.group = parseInt(group, 10);
        this.depts = depts;
        this.entries = parseInt(entries, 10);

        // used in filters
        this.pref_category = pref_category;
        this.pref_category_filters = pref_category_filters;

        this.events = [];
        this.target = target;
        this.innerTemplate = innerTemplate;
        this.outerTemplate = outerTemplate;
        this.parent = document.getElementById(target);
        this.getLocalistEvents();
        this.renderThrobber();
    }

    getLocalistEvents() {
        findAll(this.requestArgs)
            .then(response => {
                this.setState({ events: response.data.events });
            })
            .catch(error => {
                console.error(error);
            });
    }

    setState(args) {
        const keys = Object.keys(args);
        keys.forEach(key => {
            this[key] = args[key];
        });
        this.render();
    }

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

    render() {
        // remove loading animation timer
        clearTimeout(this.c_loader);
        let inner = '';
        this.events.forEach(event => {
            this.builtEvent = new BuildEvent(event.event, this.BE_args);
            this.buildFilters(event.event);
            inner += this.innerTemplate(this.builtEvent);
        });
        const outer = this.outerTemplate(inner, this.wrapperArgs);
        this.parent.innerHTML = outer;
    }

    /*
        inserts throbber after target elem
        this is deleted on localList render
        warning this.c_loader may be undefined
     */
    renderThrobber() {
        const loadingNode = /* html */ `
            <div class="fadeOut loader">
                <span class="fa fa-spin fa-cog"></span>
            </div>
        `;
        this.parent.insertAdjacentHTML('afterbegin', loadingNode);
        this.c_loader = setTimeout(() => {
            const loader = [...this.parent.getElementsByClassName('loader')];
            loader[0].classList.remove('fadeOut');
        }, 200); // skip loading animation if under 0.5s
    }
}
