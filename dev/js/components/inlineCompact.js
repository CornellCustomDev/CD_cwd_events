import LocalistComponent from './_localistComponent';
import {
    inlineCompactInner,
    inlineCompactWrapper
} from '../templates/inlineCompact';

/**
 * The InLineCompact component.
 *
 * @constructor
 * @extends LocalistComponent
 */
export default class InlineCompact extends LocalistComponent {
    constructor(props) {
        props.innerTemplate = inlineCompactInner;
        props.outerTemplate = inlineCompactWrapper;
        props.pref_category_filters = 'false';
        props.pref_excerpt_length = '150';
        super(props);
    }
}
