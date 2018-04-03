import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FromType from '../../types/From';

import classList from '../../scss/typing-indicator.scss';

const propTypes = {
    from: FromType.isRequired,
    className: PropTypes.string,
};

export default class TypingIndicator extends Component {
    render() {
        let {className} = this.props;

        return (
            <div className={classNames(classList['typing-indicator'], className)}>
                <span/>
                <span/>
                <span/>
            </div>
        );
    }
}

TypingIndicator.propTypes = propTypes;