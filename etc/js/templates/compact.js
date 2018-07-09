import {eventFilters, add_calender} from './template-helpers';

export const compactInner=(builtData)=>`
    <div class="event-node node dept-${builtData.department} type-${builtData.type} group-${builtData.group_id}">
    <h3><a target="_blank" href="${builtData.event.localist_url}">${builtData.event.title}</a></h3>
    <h4 class="meta date"><span class="fulldate">${builtData.event_date_compact}</span> 
    <h4 class="meta location">${builtData.event.location_name}</h4>
    <p class="description">${builtData.description} 
    <a class="read-more more" href="${builtData.event.localist_url}" target="_blank">${builtData.pref_readmore}</a>
    </p>
    ${builtData.addCal ? `${add_calender(builtData.event)}` : ''}  
    </div><!--end of node -->
    `;
//this has class compact only difference
export const compactWrapper = (inner, args) => `
    <section title="${args.title}">
        <h2>${args.heading}</h2>
        <div id="main-body">  
            <div class="events-listing no-thumbnails" id="events-listing compact">
                ${eventFilters(args.filters)}
                <div class="events-list">
                    ${inner}
                </div>
            </div><!--events listing -->
        </div><!-- main-body -->
    </section><!--end of section -->`;