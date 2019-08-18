import standard from './components/standard';
import compact from './components/compact';
import modern_standard from './components/modernStandard';
import modern_compact from './components/modernCompact';
import archive from './components/archive';
import inline_compact from './components/inlineCompact';
/**
 * Helper function to select component based on format.
 *   @todo add support for unused options. [filter, addCal]
 * @param {obj} param0 The base Component params.
 */
const localList = ({
    target = 'events-listing',
    depts = '0',
    entries = '10',
    format = 'standard',
    group = '0',
    keyword = false,
    heading = '',
    addCal = false
}) => {
    // Map out formats for look up.
    const formatOptions = {
        standard,
        compact,
        modern_compact,
        modern_standard,
        inline_compact,
        archive
    };

    if (format in formatOptions) {
        const Component = formatOptions[format];
        const component = new Component({
            target,
            depts,
            entries: parseInt(entries, 10),
            format,
            group: parseInt(group, 10),
            keyword,
            heading,
            addCal,
            pref_category: 'group',
            pref_category_filters: 'true'
        });
    }

    // const test = new Archive({ target, depts, entries, group });
};

export default localList;
