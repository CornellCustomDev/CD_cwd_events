import standard from './components/standard';
import compact from './components/compact';
import modern_standard from './components/modernStandard';
import modern_compact from './components/modernCompact';
import archive from './components/archive';
import inline_compact from './components/inlineCompact';
/**
 * Helper function to select component based on format.
 *   @todo add support for unused options. [filter, addCal]
 * @param {obj} params The base Component params.
 */
const localList = params => {
    // Map out formats for look up.
    const formatOptions = {
        standard,
        compact,
        modern_compact,
        modern_standard,
        inline_compact,
        archive
    };

    if (params.format in formatOptions) {
        const Component = formatOptions[params.format];
        // @todo impliment filter options and pagination
        params.pref_category = 'group';
        params.pref_category_filters = 'true';
        // eslint-disable-next-line no-unused-vars
        const component = new Component(params);
    }
};

export default localList;
