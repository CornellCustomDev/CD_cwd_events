import standard from './components/standard';
import compact from './components/compact';
import modern_standard from './components/modernStandard';
import modern_compact from './components/modernCompact';
import archive from './components/archive';
import inline_compact from './components/inlineCompact';
/**
 * Get the party started!
 *   Selects the coresponding component based on format name.
 *   @todo add support for unused options. [filter, addCal]
 * @param {obj} params The base Component params.
 */
const localList = params => {
    // Map out formats for look up. These must match Drupal block.
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
        // The following are static filter params. type and
        params.pref_category = 'group';
        params.pref_category_filters = true;
        // eslint-disable-next-line no-unused-vars
        const component = new Component(params);
    }
};

export default localList;
