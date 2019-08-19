import LocalistComponent from './_localistComponent';
import { archiveInner, archiveWrapper } from '../templates/archive';
/**
 * The Archive component.
 *
 * @constructor
 * @extends LocalistComponent
 */
export default class Archive extends LocalistComponent {
    constructor(props) {
        props.innerTemplate = archiveInner;
        props.outerTemplate = archiveWrapper;
        props.pref_category_filters = false;
        super(props);
    }
}
