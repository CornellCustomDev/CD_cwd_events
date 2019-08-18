import LocalistComponent from './_localistComponent';
import {
    modernCompactInner,
    modernCompactWrapper
} from '../templates/modernCompact';

export default class Archive extends LocalistComponent {
    constructor(props) {
        props.innerTemplate = modernCompactInner;
        props.outerTemplate = modernCompactWrapper;
        props.pref_category_filters = false;
        super(props);
    }
}
