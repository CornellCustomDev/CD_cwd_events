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
export const eventFilters = (filterObjs, domTarget) => {
    if (typeof filterObjs === 'undefined' || typeof domTarget === 'undefined') {
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

        const elem = document.getElementById(id);
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
    const showAllEvents = () => {
        // remove active class from all filter buttons
        const allFilterBtns = [
            ...targetElem.getElementsByClassName('filter-btn')
        ];
        allFilterBtns.forEach(value => {
            value.classList.remove('active');
        });

        const elem = document.getElementById(`filterAll-${domStr}`);
        // set the current item active
        elem.classList.add('active');

        // show all filter elements
        const allEvents = [...targetElem.getElementsByClassName('event-node')];
        allEvents.forEach(value => {
            value.classList.remove('fadeOut');
        });
    };
    // attach event handlers to window
    window[`toggleFilters${domStr}`] = toggleFilters;
    window[`showAllEvents${domStr}`] = showAllEvents;

    return /* html */ `
        <div class="events-filters-wrap">
            <h3 class="hidden">Show:</h3>
            <ul class="events-filters">
                <li>
                    <button
                        id="filterAll-${domStr}"
                        data-filter="all"
                        class="filter-btn active"
                        onClick="showAllEvents${domStr}()"
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
                                      }" class="filter-btn" onclick="toggleFilters${domStr}('filter${
                                          filterObjs[key].id
                                      }-${domStr}', '${
                                          filterObjs[key].pref_category
                                      }-${filterObjs[key].id}')">${
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

export const add_calendar = myEvent => {
    /* ----------------- build calander links -------------------------- */
    const buidGoogleStr = myObj => {
        const mySD = myObj.event_instances[0].event_instance.start.split(
            'T'
        )[0];
        const gDateStart =
            mySD.split('-')[0] + mySD.split('-')[1] + mySD.split('-')[2];
        // this may not work as intended for repeating events
        const myED = myObj.last_date;
        const gDateStop =
            myED.split('-')[0] + myED.split('-')[1] + myED.split('-')[2];
        return /* html */ `
            <a
                class="fa fa-google google"
                href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;dates=${gDateStart}%2F${gDateStop}&amp;details=${encodeURIComponent(
            myObj.description_text.replace(/[\r\n]/g, `<br />`)
        )}&amp;location=${encodeURIComponent(
            myObj.location
        )}&amp;sprop=website%3Aevents.cornell.edu&amp;text=${encodeURIComponent(
            myObj.title
        )}"
                title="Save to Google Calendar"
                target="_blank"
            >
                <span class="sr-only"
                    >Add ${myObj.title} to Google Calendar</span
                >
            </a>
        `;
    };

    const buildiCal = myObj => /* html */ `
        <a
            class="fa fa-calendar apple"
            href="${myObj.localist_ics_url}"
            title="Save to iCal"
            target="_blank"
        >
            <span class="sr-only">Add ${myObj.title} to iCal</span>
        </a>
    `;

    const buildOutlookCal = myObj => /* html */ `
        <a
            class="fa fa-clock-o microsoft"
            href="${myObj.localist_ics_url}"
            title="Save to Outlook"
            target="_blank"
        >
            <span class="sr-only">Add ${myObj.title} to Outlook</span>
        </a>
    `;

    /* ------------------ END OF BUILD LINKS --------------------------- */
    return /* html */ `
        <span class="event-subscribe"
            >add to calendar ${buidGoogleStr(myEvent)} ${buildiCal(myEvent)}
            ${buildOutlookCal(myEvent)}
        </span>
    `;
};
