import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classList from '../scss/index.scss';

const propTypes = {
    data: PropTypes.object.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
};

const defaultProps = {
    width: 300,
    height: 300,
};

export default class App extends Component {
    state = {
        messagesVisible: 0,
    };

    componentWillUnmount() {
        clearInterval(this.messagesInterval);
    }

    initChatflow = (e) => {
        if (!e) {

        }
        else {
            this.messagesInterval = setInterval(() => {
                let {data: {messages}} = this.props;
                let {messagesVisible} = this.state;
                ++messagesVisible;
                if (messagesVisible > messages.length) {
                    clearInterval(this.messagesInterval);
                }
                else {
                    this.setState({messagesVisible});
                }
            }, 2000);
        }
    };

    getAvatar = (message) => {
        switch (message.from) {
            case 'bot':
                return '//picsum.photos/30';

            case 'user':
                return '//picsum.photos/35';
        }
    };

    render() {
        let {data: {messages}, width, height} = this.props;
        if (!messages) return null;

        let {messagesVisible} = this.state;

        messages = messages.slice(0, messagesVisible);

        return (
            <div
                ref={this.initChatflow}
                className={classList['chatflow']}
                style={{
                    width,
                    height,
                }}>
                {messages.map((message, i) => (
                    <div
                        key={i}
                        className={classNames(classList['chatflow__message'], {
                            [classList['message--left']]: message.from === 'bot',
                            [classList['message--right']]: message.from === 'user',
                            [classList['message--system']]: message.from === 'system',
                        })}>
                        {message.from !== 'system' && (
                            <div className={classList['message__avatar']}>
                                <img
                                    src={this.getAvatar(message)}
                                />
                            </div>
                        )}
                        <div className={classList['message__text']}>
                            {message.message}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;