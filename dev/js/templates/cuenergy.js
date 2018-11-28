/*
 returns html string
 @param builtData a buildEvents.js obj
*/
export const cuenergyEventsInner = ( builtData )=> `<div class="views-row">
<div class="container-fluid">
  <div class="row">
      <div class="col-sm-12 event-title-and-location">
          <div><a href="${builtData.event.localist_url}" >${builtData.event.title}</a></div>
          <div><span class="event-date">${builtData.event_date}</span> - ${builtData.event_time}${builtData.event.location_name ? ` | ${builtData.event.location_name}` :''}</div>
      </div>
  </div>
</div>
</div>`;

export const cuenergyEventsWrapper = (inner, args) => `
<div class="view view-events view-id-events cuenergy-events">
  <div class="view-content">
  ${inner}
  </div>
</div>`;

export const cuenergyCompactInner = ( builtData )=> `
<div class="views-row">
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-2 event-month-and-day">
        <div><span class="event-month">${builtData.abbrMonth}</span><span class="event-day">${builtData.day}</span></div>
      </div>
      <div class="col-sm-10 event-title-and-location">
        <div><a href="${builtData.event.localist_url}" >${builtData.event.title}</a></div>
        <div>${builtData.event_time}${builtData.event.location_name ? ` | ${builtData.event.location_name}` :''}</div>
      </div>
    </div>
  </div>
</div>`;

export const cuenergyCompactWrapper = (inner, args) => `
<div id='block-cuenergy-views-block-events-block-1' class="form-group">
  <div class="view view-events view-id-events">
    <div class="view-content">
      ${inner}
    </div>
  </div>
</div>`;



