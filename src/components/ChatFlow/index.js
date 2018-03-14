import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MessageType from '../../types/Message';
import TypingIndicator from '../TypingIndicator';

import PlayIcon from '../../assets/svg/play-circle.svg';

import classList from '../../scss/index.scss';

const propTypes = {
    messages: PropTypes.arrayOf(MessageType),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    messagesVisible: PropTypes.number.isRequired,
    typingAnimation: PropTypes.object.isRequired,
    startChat: PropTypes.func.isRequired,
    isStarted: PropTypes.bool.isRequired,
};

export default class ChatFlow extends Component {
    getAvatar = (message) => {
        switch (message.from) {
            case 'bot':
                return '//picsum.photos/30';

            case 'user':
                return '//picsum.photos/35';
        }
    };

    render() {
        let {messages, width, height, messagesVisible, typingAnimation, isStarted} = this.props;
        if (!messages) return null;

        let nextMessage = messages[messagesVisible];
        messages = messages.slice(0, messagesVisible);

        if (!isStarted) {
            return (
                <div
                    className={classList['chatflow']}
                    style={{
                        width,
                        height,
                    }}>
                    <div
                        className={classList['chatflow__start-btn']}
                        onClick={this.props.startChat}>
                        <PlayIcon/>
                        Run demo
                    </div>
                </div>
            )
        }

        return (
            <div
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

                {!!nextMessage && nextMessage.from !== 'system' && !!typingAnimation[nextMessage.from] && (
                    <div className={classNames(classList['chatflow__message'], {
                        [classList['message--left']]: nextMessage.from === 'bot',
                        [classList['message--right']]: nextMessage.from === 'user',
                        [classList['message--system']]: nextMessage.from === 'system',
                    })}>
                        <div className={classList['message__avatar']}>
                            <img
                                src={this.getAvatar(nextMessage)}
                            />
                        </div>
                        <div className={classList['message__typing-indicator']}>
                            <TypingIndicator from={nextMessage.from}/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

ChatFlow.propTypes = propTypes;