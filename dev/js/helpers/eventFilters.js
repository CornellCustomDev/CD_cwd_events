/**
 * Renders the filter elemet usually used in the wrapper.
 *   Adds the event handlers to the window.
 *
 * @todo Add wai-aria controls support,
 *   also tests that element exists,
 *
 * @modifies {window} Attaches click event handlers to window.
 *
 * @param {array} filterObjs A array of objects [{id:'',name:'',pref_category:''}]
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
    const targetElem = document.getElementById(domTarget);
    // make sure function names are safe strings
    const domStr = domTarget.replace(/[^\w]/gi, '');

    // handles filter events
    const toggleFilters = (id, target) => {
        // remove active class from all filter buttons
        const allFilterBtns = [
            ...targetElem.getElementsByClassName('filter-btn')
        ];
        allFilterBtns.forEach(value => {
            value.classList.remove('active');
        });
        const elem = targetElem.querySelector(`#${id}`);
        // set the current item active
        elem.classList.add('active');

        // onclick button will only hide non target elements
        // hide all filter elements
        const allEvents = [...targetElem.getElementsByClassName('event-node')];
        allEvents.forEach(value => {
            value.classList.add('fadeOut');
        });

        // show the target elements
        const targetElems = [...targetElem.getElementsByClassName(target)];
        targetElems.forEach(value => {
            value.classList.remove('fadeOut');
        });
    };

    // Removes all fadeout classes
    const showAllEvents = () => {
        // remove active class from all filter buttons
        const allFilterBtns = [
            ...targetElem.getElementsByClassName('filter-btn')
        ];
        allFilterBtns.forEach(value => {
            value.classList.remove('active');
        });

        const elem = targetElem.querySelector(`#filterAll-${domStr}`);
        // set the current item active
        elem.classList.add('active');

        // show all filter elements
        const allEvents = [...targetElem.getElementsByClassName('event-node')];
        allEvents.forEach(value => {
            value.classList.remove('fadeOut');
        });
    };

    // attach event listeners to parent
    targetElem.addEventListener('click', e => {
        if (/filterAll.*/.test(e.target.id)) {
            showAllEvents();
        } else if (/filter.*/.test(e.target.id)) {
            toggleFilters(e.target.id, e.target.dataset.filter);
        }
    });

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
                                          filterObjs[key].pref_category
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

export default eventFilters;
