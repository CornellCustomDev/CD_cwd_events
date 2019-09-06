/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Localist Hello World Component
 */
class Localist extends Component {
    /**
     * set the title property
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.state = {
            title: props.title ? props.title : 'Hello World'
        };
    }
    /**
     * render the component
     * @return {JSX} the hello world view
     */
    render() {
        return (
            <div className="">
                {this.state.title}
                <p>It worked!</p>
            </div>
        );
    }
}

Localist.propTypes = {
    title: PropTypes.string
};

export default Localist;
