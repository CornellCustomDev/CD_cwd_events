import LocalistComponent from './_localistComponent';
import { compactInner, compactWrapper } from '../templates/compact';

export default class Compact extends LocalistComponent {
    constructor(props) {
        props.innerTemplate = compactInner;
        props.outerTemplate = compactWrapper;
        props.pref_category_filters = false;
        props.pref_excerpt_length = 150;
        super(props);
    }
}
