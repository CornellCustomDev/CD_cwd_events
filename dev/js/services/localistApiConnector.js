import validatProps from '../helpers/common';

const axios = require('axios');
const moment = require('moment');
const check = require('check-types');

/**
 * Test params property types.
 * @param {obj} params The block element data.
 * @param {obj} props The block element data.
 * @return {boolean} Valid proptype.
 */
const checkPropTypes = (params, props) => {
    let valid = validatProps(params, props);
    if (!valid) {
        return false;
    }
    valid = check.map(params, check.string);
    return check.all(valid);
};

/**
 * Configures request params and Get events from loacalist api.
 * @param {obj} props The optional api config params.
 * @return {axios} A axios promise;
 */
export default props => {
    if (
        !checkPropTypes(
            {
                depts: props.depts,
                entries: props.depts,
                format: props.format,
                group: props.group,
                keyword: props.keyword,
                days: props.days,
                apikey: props.apikey,
                calendarurl: props.calendarurl,
                page: props.page
            },
            props
        )
    ) {
        console.warn('invalid prop types in localist connect.');
        return axios.get('');
    }
    const params = {
        apikey: props.apikey,
        days: props.days,
        distinct: true,
        pp: props.entries,
        page: props.page,
        start:
            props.format !== 'archive'
                ? moment().format('YYYY-MM-DD')
                : moment()
                      .subtract(props.days, 'D')
                      .format('YYYY-MM-DD'),
        direction: props.format === 'archive' ? 'desc' : 'asc'
    };
    // Supports multiple departments with CSV string.
    if (props.depts && props.depts !== '0') {
        params.type = [];
        props.depts.split(',').forEach(item => {
            params.type.push(item.trim());
        });
    }
    if (props.group && props.group !== '0') {
        params.group_id = props.group;
    }
    if (props.keyword && props.keyword !== '') {
        params.keyword = props.keyword;
    }
    return axios.get(props.calendarurl, { params });
};
