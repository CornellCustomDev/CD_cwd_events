import LocalistComponent from './_localistComponent';
import {
    modernCompactInner,
    modernCompactWrapper
} from '../templates/modernCompact';
/**
 * The ModernCompact component.
 *
 * @constructor
 * @extends LocalistComponent
 */
export default class ModernCompact extends LocalistComponent {
    constructor(props) {
        props.innerTemplate = modernCompactInner;
        props.outerTemplate = modernCompactWrapper;
        props.pref_category_filters = false;
        props.pref_excerpt_length = 150;
        super(props);
    }
}
