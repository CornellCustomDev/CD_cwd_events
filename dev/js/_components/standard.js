import LocalistComponent from './_localistComponent';
import { standardInner, standardWrapper } from '../templates/standard';
/**
 * The Standard component.
 *
 * @constructor
 * @extends LocalistComponent
 */
export default class Standard extends LocalistComponent {
    constructor(props) {
        props.innerTemplate = standardInner;
        props.outerTemplate = standardWrapper;
        super(props);
    }
}
