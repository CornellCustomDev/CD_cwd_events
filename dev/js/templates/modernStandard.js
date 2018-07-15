import {eventFilters, add_calender} from './template-helpers';

export const moderStandardInner = (builtData) =>`<div class="card event-node dept-${builtData.department} type-${builtData.type} group-${builtData.group_id}" >
                            <div class="events">
                                <a href="${builtData.event.localist_url}" class="group-link-wrapper field-group-link">
                                    <time title="${builtData.event_date}" datetime="${builtData.dateTime}">
                                        <span class='month'>${builtData.abbrMonth}</span>
                                        <span class='day'>${builtData.day}</span>
                                    </time>
                                    <div class="field title">
                                        <h3>${builtData.event.title}</h3>
                                    </div>
                                    <div class="field meta">
                                            <p>${builtData.event_time}${builtData.event.location_name ? `, ${builtData.event.location_name}` : ''} ${tagStr(builtData.event.filters.event_types)}</p>
                                    </div>
                                    <div class="field field-name-summary summary">
                                        <p>${builtData.description}... read more</p> 
                                    </div>
                                </a>
                                ${builtData.addCal ? `${add_calender(builtData.event)}` : ''}  
                            </div><!--events-->
                        </div><!--card-->`;

export const modernStandardWrapper = (inner, args) => `
    <section title="${args.title}">
        ${args.heading ? `<h2>${args.heading}</h2>` : ''}
        <div>  
            <div class="cwd-component cwd-card-grid three-card singles events-listing no-thumbnails">
                ${eventFilters(args.filters, args.target)}
                <div class="events-list">
                    ${inner}
                </div>
            </div><!--events listing -->
        </div><!-- main-body -->
    </section><!--end of section -->`;

const tagStr = (event_types) => {
    let spanStr = ''
    if (event_types){
            event_types.forEach(element => {
                spanStr  += '<span class="inline-events-type">'+element.name+'</span>';
        })
    }
    return spanStr;
}