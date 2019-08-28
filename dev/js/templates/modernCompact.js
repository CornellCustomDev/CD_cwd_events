/**
 *   @todo add prop type validation.
 * @param {obj} builtData A buildEvents.js obj.
 * @return {string} Html string
 */
export const modernCompactInner = builtData => /* html */ `
<div class="card">
    <div class="events">
        <a href="${
            builtData.event.localist_url
        }" class="group-link-wrapper field-group-link">
            <time title="${builtData.event_date}" datetime="${
    builtData.dateTime
}">
                <span class='month'>${builtData.abbrMonth}</span>
                <span class='day'>${builtData.day}</span>
            </time>
            <div class="field title">
                <h3>${builtData.event.title}</h3>
            </div>
            <div class="field meta">
            <p>${builtData.event_time}${
    builtData.event.location_name ? `, ${builtData.event.location_name}` : ''
}</p>
            </div>
            <div class="field field-name-summary summary">
                <p>${builtData.description}</p>
            </div>
        </a>
    </div>
</div>
`;

/**
 *   @todo add prop type validation.
 * @param {string} inner The html inner string.
 * @param {obj} args Mostly unused try and remove these.
 * @return {string} Html string
 */
export const modernCompactWrapper = (inner, args) => /* html */ `
    <div id='eventsModernCompact' class="secondary modern">
         ${args.heading ? `<h2>${args.heading}</h2>` : ''}
        <div class="cwd-component cwd-card-grid three-card singles compact no-thumbnails">
            <div id="cwd-homeEvents-list" class="compact no-thumbnails">
                <!--no filters -->
                <div class="events-list">
                    ${inner}
                </div>
            </div><!--events listing -->
        </div><!-- main-body -->
    </div><!--end of section -->`;
