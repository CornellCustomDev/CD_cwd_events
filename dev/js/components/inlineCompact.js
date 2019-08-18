import LocalistComponent from './_localistComponent';
import {
    inlineCompactInner,
    inlineCompactWrapper
} from '../templates/inlineCompact';

export default class Archive extends LocalistComponent {
    constructor(props) {
        props.innerTemplate = inlineCompactInner;
        props.outerTemplate = inlineCompactWrapper;
        props.pref_category_filters = false;
        super(props);
    }
}
