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

/**
 * Tests to see if month / day should be displayed.
 */
export class CheckDate {
    constructor() {
        this.lastMonth = '';
        this.lastDay = '';
    }

    month(builtData) {
        if (this.lastMonth !== builtData.month) {
            this.lastMonth = builtData.month;
            return /* html */ `
                <h3 class="month-header">${builtData.monthHeader}</h3>
            `;
        }
        return '';
    }

    day(builtData) {
        if (this.lastDay !== builtData.displayDate) {
            this.lastDay = builtData.displayDate;
            return /* html */ `
                <h4 class="day-header">
                    <span class="fa fa-calendar-o"></span
                    >${builtData.displayDate}
                </h4>
            `;
        }
        return '';
    }
}

export default { CheckDate, add_calendar };
