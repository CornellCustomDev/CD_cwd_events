// import request from './request';

import axios from 'axios';
import * as moment from 'moment';

/**
 * Configures request params and Fetched events from loacalist api.
 *
 * @param {obj} param0 The optional api config params.
 *
 * @return {axios} A axios promise;
 */
const findAll = ({
    depts = '0',
    entries = 3,
    format = 'standard',
    group = 0,
    keyword = ''
}) => {
    const params = {
        api_key: 'KLhy2GtuSAGirYGY', // Move api key to drupal block? works without it.
        days: 365,
        distinct: true,
        pp: entries,
        start:
            format !== 'archive'
                ? moment().format('YYYY-MM-DD')
                : moment()
                      .subtract(1, 'Y')
                      .format('YYYY-MM-DD')
    };
    // Supports multiple departments with CSV string.
    if (depts && parseInt(depts, 10) !== 0) {
        params.type = [];
        depts.split(',').forEach(item => {
            params.type.push(item.trim());
        });
    }
    if (group && parseInt(group, 10) !== 0) {
        params.group_id = group;
    }
    if (keyword && keyword !== '') {
        params.keyword = keyword;
    }
    if (format === 'archive') {
        params.direction = 'desc';
    }
    const url = '//events.cornell.edu/api/2.1/events';
    return axios.get(url, { params });
};

export default findAll;
