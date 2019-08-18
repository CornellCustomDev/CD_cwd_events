import LocalistComponent from './_localistComponent';
import { compactInner, compactWrapper } from '../templates/compact';

export default class Archive extends LocalistComponent {
    constructor(props) {
        props.innerTemplate = compactInner;
        props.outerTemplate = compactWrapper;
        props.pref_category_filters = false;
        super(props);
    }
}
