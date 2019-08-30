import standard from './components/standard';
import compact from './components/compact';
import modern_standard from './components/modernStandard';
import modern_compact from './components/modernCompact';
import archive from './components/archive';
import inline_compact from './components/inlineCompact';

const check = require('check-types');

/**
 * Test props property types.
 * @param {obj} props The block element data.
 * @return {boolean} Valid proptype.
 */
const checkPropTypes = props => {
    const valid = check.map(props, {
        target: check.string,
        depts: check.string,
        entries: check.string,
        format: check.string,
        group: check.string,
        keyword: check.string,
        heading: check.string,
        filterby: check.string,
        filterby_filters: check.string,
        calendarurl: check.string,
        apikey: check.string,
        addcal: check.string
    });
    return check.all(valid);
};

/**
 * Get the party started!
 *   Selects the coresponding component based on format name.
 *   @todo add support for unused options. [filter, addcal]
 *   @todo impliment filter options and pagination.
 * @param {obj} props The base Component props.
 * @return {Component} a localist component of the type param.format.
 */
export default props => {
    // Map out formats for look up. These must match Drupal block.
    const formatOptions = {
        standard,
        compact,
        modern_compact,
        modern_standard,
        inline_compact,
        archive
    };
    // The following are static filter props.
    props.filterby_filters = 'true';
    props.pref_excerpt_length = '250';
    // optional props
    props.addcal = props.addcal || 'false';
    if (typeof window !== 'undefined') {
        props.win = props.win || window;
    }
    if (
        checkPropTypes(props) &&
        props.format in formatOptions &&
        typeof props.win === 'object'
    ) {
        if (props.pagination === 'true') {
            const url = new URL(props.win.location.href);
            props.page = url.searchParams.get('page');
        } else {
            props.page = '1';
        }
        const Component = formatOptions[props.format];
        const component = new Component(props);
        return component;
    }
    console.error('localist recieved invalid props');
    return { error: 'localist recieved invalid props' };
};
