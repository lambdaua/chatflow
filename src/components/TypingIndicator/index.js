import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FromType from '../../types/From';

import classList from '../../scss/typing-indicator.scss';

const propTypes = {
    from: FromType.isRequired,
};

export default class TypingIndicator extends Component {
    render() {
        return (
            <div className={classList['typing-indicator']}>
                <span/>
                <span/>
                <span/>
            </div>
        );
    }
}

TypingIndicator.propTypes = propTypes;