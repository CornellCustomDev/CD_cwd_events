import standard from './components/standard';
import compact from './components/compact';
import modern_standard from './components/modernStandard';
import modern_compact from './components/modernCompact';
import archive from './components/archive';
import inline_compact from './components/inlineCompact';

const check = require('check-types');

/**
 * Test params property types.
 * @param {obj} params The block element data.
 * @return {boolean} Valid proptype.
 */
const checkPropTypes = params => {
    const valid = check.map(params, {
        target: check.string,
        depts: check.string,
        entries: check.string,
        format: check.string,
        group: check.string,
        keyword: check.string,
        heading: check.string
    });
    return check.all(valid);
};

/**
 * Get the party started!
 *   Selects the coresponding component based on format name.
 *   @todo add support for unused options. [filter, addCal]
 * @param {obj} params The base Component params.
 * @return {Component} a localist component of the type param.format.
 */
export default params => {
    // Map out formats for look up. These must match Drupal block.
    const formatOptions = {
        standard,
        compact,
        modern_compact,
        modern_standard,
        inline_compact,
        archive
    };

    if (checkPropTypes(params) && params.format in formatOptions) {
        const Component = formatOptions[params.format];
        // @todo impliment filter options and pagination
        // The following are static filter params. type and
        params.pref_category = 'group';
        params.pref_category_filters = 'true';
        const component = new Component(params);
        return component;
    }
    return { error: 'invalid props - all props should be strings' };
};
