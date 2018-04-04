import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MessageType from '../../types/Message';
import TypingIndicator from '../TypingIndicator';

import PlayIcon from '../../assets/svg/play-circle.svg';

import classList from '../../scss/index.scss';

const propTypes = {
    messages: PropTypes.arrayOf(MessageType),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    messagesVisible: PropTypes.number.isRequired,
    typingAnimation: PropTypes.object.isRequired,
    startChat: PropTypes.func.isRequired,
    isStarted: PropTypes.bool.isRequired,
    messageClassName: PropTypes.string,
    leftMessageClassName: PropTypes.string,
    rightMessageClassName: PropTypes.string,
    systemMessageClassName: PropTypes.string,
    messageTextClassName: PropTypes.string,
    containerClassName: PropTypes.string,
    messageAvatarClassName: PropTypes.string,
    typingIndicatorClassName: PropTypes.string,
    typingIndicatorInnerClassName: PropTypes.string,
    startBtnClassName: PropTypes.string,
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

        let containerClassName = classNames(classList['chatflow'], this.props.containerClassName);
        let startBtnClassName = classNames(classList['chatflow__start-btn'], this.props.startBtnClassName);
        let messageClassName = classNames(classList['chatflow__message'], this.props.messageClassName);
        let leftMessageClassName = classNames(classList['message--left'], this.props.leftMessageClassName);
        let rightMessageClassName = classNames(classList['message--right'], this.props.rightMessageClassName);
        let systemMessageClassName = classNames(classList['message--system'], this.props.systemMessageClassName);
        let messageTextClassName = classNames(classList['message__text'], this.props.messageTextClassName);
        let messageAvatarClassName = classNames(classList['message__avatar'], this.props.messageAvatarClassName);
        let typingIndicatorClassName = classNames(classList['message__typing-indicator'], this.props.typingIndicatorClassName);

        if (!isStarted) {
            return (
                <div
                    className={containerClassName}
                    style={{
                        width,
                        height,
                    }}>
                    <div
                        className={startBtnClassName}
                        onClick={this.props.startChat}>
                        <PlayIcon/>
                        Run demo
                    </div>
                </div>
            )
        }

        return (
            <div
                className={containerClassName}
                style={{
                    width,
                    height,
                }}>
                {messages.map((message, i) => (
                    <div
                        key={i}
                        className={classNames(messageClassName, {
                            [leftMessageClassName]: message.from === 'bot',
                            [rightMessageClassName]: message.from === 'user',
                            [systemMessageClassName]: message.from === 'system',
                        })}>
                        {message.from !== 'system' && (
                            <div className={messageAvatarClassName}>
                                <img
                                    src={this.getAvatar(message)}
                                />
                            </div>
                        )}
                        <div className={messageTextClassName}>
                            {message.message}
                        </div>
                    </div>
                ))}

                {!!nextMessage && nextMessage.from !== 'system' && !!typingAnimation[nextMessage.from] && (
                    <div className={classNames(messageClassName, {
                        [leftMessageClassName]: nextMessage.from === 'bot',
                        [rightMessageClassName]: nextMessage.from === 'user',
                        [systemMessageClassName]: nextMessage.from === 'system',
                    })}>
                        <div className={messageAvatarClassName}>
                            <img
                                src={this.getAvatar(nextMessage)}
                            />
                        </div>
                        <div className={typingIndicatorClassName}>
                            <TypingIndicator
                                from={nextMessage.from}
                                className={this.props.typingIndicatorInnerClassName}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

ChatFlow.propTypes = propTypes;