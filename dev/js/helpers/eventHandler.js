/**
 * This returns an event handler, that handles all on click events.
 * The pagination event handler mutates the window location and history.
 * @param {obj} that The localList component.
 * @return {func} The parent click event handler.
 */
export default that => {
    const domStr = that.target.replace(/[^\w]/gi, '');
    const targetElem = that.parent;
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
    /**
     * @todo refactor this into a seperate handler
     * @param {event} e The event to be handled.
     */
    const handleclick = e => {
        if (/filterAll.*/.test(e.target.id)) {
            // handle All events filter button at top
            showAllEvents();
        } else if (/filter.*/.test(e.target.id)) {
            // handle other events filters.
            toggleFilters(e.target.id, e.target.dataset.filter);
        } else if (e.target.classList.contains('page-link')) {
            // handle pagination click with ajax
            e.preventDefault();
            if (
                !e.target.parentNode ||
                !e.target.parentNode.classList.contains('active')
            ) {
                that.renderThrobber();
                const url = new URL(e.target.href);
                const it = url.searchParams.get('page');
                that.requestArgs.page = `${it}`;
                const newurl = `${that.win.location.origin}?page=${it}`;
                that.win.history.pushState({}, null, newurl);
                that.getLocalistEvents(that.requestArgs);
            }
        }
    };

    return handleclick;
};
