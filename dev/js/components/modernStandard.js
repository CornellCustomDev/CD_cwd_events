import LocalistComponent from './_localistComponent';
import {
    moderStandardInner,
    modernStandardWrapper
} from '../templates/modernStandard';

export default class ModernStandard extends LocalistComponent {
    constructor(props) {
        props.innerTemplate = moderStandardInner;
        props.outerTemplate = modernStandardWrapper;
        super(props);
    }
}
