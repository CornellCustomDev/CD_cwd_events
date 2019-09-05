import LocalistComponent from './_localistComponent';
import {
    modernStandardInner,
    modernStandardWrapper
} from '../templates/modernStandard';
/**
 * The ModernCompact component.
 *
 * @constructor
 * @extends LocalistComponent
 */
export default class ModernStandard extends LocalistComponent {
    constructor(props) {
        props.innerTemplate = modernStandardInner;
        props.outerTemplate = modernStandardWrapper;
        super(props);
    }
}
