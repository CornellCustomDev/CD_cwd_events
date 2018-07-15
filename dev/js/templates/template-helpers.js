/* 
 @param filterObj has structure: obj.name, obj.id 
 @param domTarget: string of html id #id should exist and be unique
 attaches onClick handlers to window object

 @todo  Add wai-aria controls support,
        this should probably be a class,
        also tests that element exists,
*/
export const eventFilters = (filterObjs, domTarget) => {
    let targetElem = document.getElementById(domTarget);
    //handles filter events
    const toggleFilters = (id, target) => {
        //remove active class from all filter buttons
        var allFilterBtns = targetElem.getElementsByClassName('filter-btn');
        for (let value of allFilterBtns){
            value.classList.remove('active');
        }
        var elem = document.getElementById(id);
        //set the current item active
        elem.classList.add('active');

        //onclick button will only hide non target elements
        //hide all filter elements
        var allEvents = targetElem.getElementsByClassName('event-node');
        for (let value of allEvents){
            value.classList.add('fadeOut');
        }

        //show the target elements
        var targetElems = targetElem.getElementsByClassName(target);
        for (let value of targetElems){
            value.classList.remove('fadeOut');
        }
    }
    const showAllEvents = () => {
        //remove active class from all filter buttons
        var allFilterBtns = targetElem.getElementsByClassName('filter-btn');
        for (let value of allFilterBtns){
            value.classList.remove('active');
        }    
        
        var elem = document.getElementById('filterAll-'+domTarget);
        //set the current item active
        elem.classList.add('active');

        //show all filter elements
        var allEvents = targetElem.getElementsByClassName('event-node');
        for (let value of allEvents){
            value.classList.remove('fadeOut');
        }    

    }
    // attach event handlers to window
    window['toggleFilters'+domTarget] = toggleFilters;
    window['showAllEvents'+domTarget] = showAllEvents;    
    
    return `
        <div class='events-filters-wrap' ><h3 class="hidden">Show:</h3>
            <ul class="events-filters">
                <li><button id="filterAll-${domTarget}" data-filter="all" class="filter-btn active" onClick="showAllEvents${domTarget}()">All Events</button></li>
                ${filterObjs ? 
                    Object.keys(filterObjs).map( (key, index)=> `<li><button id='filter${filterObjs[key].id}-${domTarget}' data-filter="${filterObjs[key].pref_category}-${filterObjs[key].id}" class="filter-btn" onclick="toggleFilters${domTarget}('filter${filterObjs[key].id}-${domTarget}', '${filterObjs[key].pref_category}-${filterObjs[key].id}')">${filterObjs[key].name}</button></li>`).join('')
                :''}
            </ul>
        </div>
    `;    
            }  

export const add_calendar = (myEvent) => {
    /* ----------------- build calander links -------------------------- */
    const buidGoogleStr=(myObj)=> {
        let mySD = myObj.event_instances[0].event_instance.start.split('T')[0];
        const gDateStart = mySD.split('-')[0] + mySD.split('-')[1] + mySD.split('-')[2];
        //this may not work as intended for repeating events
        let myED = myObj.last_date;
        const gDateStop = myED.split('-')[0] + myED.split('-')[1] + myED.split('-')[2];
        return `
                <a class="fa fa-google google" 
                    href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;dates=${gDateStart}%2F${gDateStop}&amp;details=${encodeURIComponent(myObj.description_text.replace(/[\r\n]/g, `<br />`))}&amp;location=${encodeURIComponent(myObj.location)}&amp;sprop=website%3Aevents.cornell.edu&amp;text=${encodeURIComponent(myObj.title)}" title="Save to Google Calendar" target="_blank">
                <span class="sr-only">Add ${myObj.title} to Google Calendar</span>
                </a>
                `;
    }

    const buildiCal=(myObj)=> `
                        <a class="fa fa-calendar apple" href="${myObj.localist_ics_url}/#" title="Save to iCal" target="_blank" >
                        <span class='sr-only'>Add ${myObj.title} to iCal</span>
                        </a>
                        `;

    const buildOutlookCal=(myObj)=> `
                        <a class="fa fa-clock-o microsoft" href="${myObj.localist_ics_url}" title="Save to Outlook" target="_blank" >
                            <span class='sr-only'>Add ${myObj.title} to Outlook</span>
                        </a>
                        `;

    /* ------------------ END OF BUILD LINKS --------------------------- */    
    return `<span class="event-subscribe">add to calendar
            ${buidGoogleStr(myEvent)} ${buildiCal(myEvent)} ${buildOutlookCal(myEvent)}
            </span>`;
}
