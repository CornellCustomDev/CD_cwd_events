/**
 * Renders the filter elemet usually used in the wrapper.
 *   Adds the event handlers to the window.
 *
 * @todo Add wai-aria controls support,
 *   also tests that element exists,
 *
 * @modifies {window} Attaches click event handlers to window.
 *
 * @param {array} filterObjs A array of objects [{id:'',name:'',filterby:''}]
 * @param {string} domTarget A string of html id #id should exist and be unique.
 *
 * @return {string} A html string.
 */
const eventFilters = (filterObjs, domTarget) => {
    if (
        typeof filterObjs === 'undefined' ||
        typeof domTarget === 'undefined' ||
        typeof document === 'undefined'
    ) {
        console.error('invalid props in eventFilters()');
        return '';
    }
    // make sure function names are safe strings
    const domStr = domTarget.replace(/[^\w]/gi, '');
    return /* html */ `
        <div class="events-filters-wrap">
            <h3 class="hidden">Show:</h3>
            <ul class="events-filters">
                <li>
                    <button
                        id="filterAll-${domStr}"
                        data-filter="all"
                        class="filter-btn active"
                    >
                        All Events
                    </button>
                </li>
                ${
                    filterObjs
                        ? Object.keys(filterObjs)
                              .map(
                                  key =>
                                      `<li><button id='filter${
                                          filterObjs[key].id
                                      }-${domStr}' data-filter="${
                                          filterObjs[key].filterby
                                      }-${
                                          filterObjs[key].id
                                      }" class="filter-btn" >${
                                          filterObjs[key].name
                                      }</button></li>`
                              )
                              .join('')
                        : ''
                }
            </ul>
        </div>
    `;
};

/**
 * @todo Try not to use that return the filter.
 * @param {obj} event The localist event object.
 * @param {obj} that The component.
 */
const buildEventWrapperFilters = (event, that) => {
    if (
        that.filterby === 'type' &&
        that.builtEvent.type !== 0 &&
        event.filters.event_types
    ) {
        that.wrapperArgs.filters[event.filters.event_types[0].name] = {
            id: event.filters.event_types[0].id,
            name: event.filters.event_types[0].name,
            filterby: that.filterby
        };
    } else if (
        that.filterby === 'dept' &&
        that.builtEvent.department !== 0 &&
        event.filters.departments
    ) {
        that.wrapperArgs.filters[event.filters.departments[0].name] = {
            id: event.filters.departments[0].id,
            name: event.filters.departments[0].name,
            filterby: that.filterby
        };
    } else if (that.filterby === 'group' && that.builtEvent.group_name !== '') {
        that.wrapperArgs.filters[that.builtEvent.group_name] = {
            id: that.builtEvent.group_id,
            name: that.builtEvent.group_name,
            filterby: that.filterby
        };
    }
};

export { eventFilters, buildEventWrapperFilters };
