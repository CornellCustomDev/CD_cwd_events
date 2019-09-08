const axios = require('axios');
const moment = require('moment');

/**
 * Sets params and returns axios Promise.
 */
export default (
    depts,
    entries,
    format,
    group,
    keyword,
    days,
    apikey,
    calendarurl,
    page,
) => {
    const params = {
        apikey: apikey,
        days: days,
        distinct: true,
        pp: entries,
        page: page,
        start:
            format !== 'archive'
                ? moment().format('YYYY-MM-DD')
                : moment()
                    .subtract(days, 'D')
                    .format('YYYY-MM-DD'),
        direction: format !== 'archive' ? 'asc' : 'desc'
    };
    // Supports multiple departments with CSV string.
    if (depts && depts !== '0') {
        params.type = [];
        depts.split(',').forEach(item => {
            params.type.push(item.trim());
        });
    }
    if (group && group !== '0') {
        params.group_id = group;
    }
    if (keyword && keyword !== '') {
        params.keyword = keyword;
    }
    return axios.get(calendarurl, { params });
};
