/**
 *   @todo add prop type validation.
 * @param {obj} builtData A buildEvents.js obj.
 * @return {string} Html string
 */
export const archiveInner = builtData => /* html */ `
    <div class="views-row">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 event-title-and-location">
                    <div>
                        <a href="${builtData.event.localist_url}">
                            ${builtData.event.title}
                        </a>
                    </div>
                    <div>
                        <span class="event-date">
                            ${builtData.event_date}
                        </span>
                        - ${builtData.event_time}
                        ${
                            builtData.event.location_name
                                ? ` | ${builtData.event.location_name}`
                                : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

/**
 *   @todo add prop type validation.
 * @param {string} inner The html inner string.
 * @return {string} Html string
 */
export const archiveWrapper = inner => /* html */ `
    <div class="view view-events view-id-events cuenergy-events">
        <div class="view-content">
            ${inner}
        </div>
    </div>
`;
