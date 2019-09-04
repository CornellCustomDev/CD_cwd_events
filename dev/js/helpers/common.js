const check = require('check-types');

const validatProps = (params, props) => {
    const paramsKeys = Object.keys(params)
        .sort()
        .join(',');
    const propsKeys = Object.keys(props)
        .sort()
        .join(',');
    if (paramsKeys !== propsKeys) {
        console.warn(`Unsupported prop exiting ${paramsKeys} != ${propsKeys}`);
    }
    return true;
};

/**
 * Test params property types.
 * @param {obj} props The block element data.
 * @param {obj} type The check.type
 * @return {boolean} Valid proptype.
 */
export const checkLocalistPropTypes = props => {
    const params = {
        target: props.target,
        depts: props.depts,
        entries: props.entries,
        days: props.days,
        group: props.group,
        format: props.format,
        heading: props.heading,
        keyword: props.keyword,
        addcal: props.addcal,
        apikey: props.apikey,
        filterby_filters: props.filterby_filters,
        filterby: props.filterby,
        pref_excerpt_length: props.pref_excerpt_length,
        calendarurl: props.calendarurl,
        pagination: props.pagination,
        page: props.page,
        innerTemplate: props.innerTemplate,
        outerTemplate: props.outerTemplate,
        win: {} // Define window in validation
    };
    const propTypes = {
        target: check.string,
        depts: check.string,
        entries: check.string,
        days: check.string,
        group: check.string,
        format: check.string,
        heading: check.string,
        keyword: check.string,
        addcal: check.string,
        filterby_filters: check.string,
        filterby: check.string,
        pref_excerpt_length: check.string,
        calendarurl: check.string,
        pagination: check.string,
        innerTemplate: check.function,
        outerTemplate: check.function,
        page: check.string,
        apikey: check.string,
        win: check.object
    };
    let valid = validatProps(props, propTypes) && typeof props.win === 'object';
    if (!valid) {
        return false;
    }
    valid = check.map(params, propTypes);
    const isValid = check.all(valid);
    if (!isValid) {
        console.warn(valid);
    }
    return isValid;
};

export default validatProps;
