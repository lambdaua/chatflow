import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';

import ChatFlow from '../components/ChatFlow';
import MessageType from '../types/Message';

const propTypes = {
    messages: PropTypes.arrayOf(MessageType),
    width: PropTypes.number,
    height: PropTypes.number,
    typingDuration: PropTypes.number,
    messageDelay: PropTypes.number,
    onInit: PropTypes.func,
    autoPlay: PropTypes.bool,
};

const defaultProps = {
    width: 300,
    height: 300,
    typingDuration: 1000,
    messageDelay: 1500,
    onInit: () => {},
    autoPlay: false,
};

export default class ChatFlowContainer extends Component {
    state = {
        isStarted: false,
        messagesVisible: 0,
        typingAnimation: {},
    };

    componentDidMount() {
        this.props.onInit({
            start: this.startChat,
            replay: this.replay,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.messagesVisible !== this.state.messagesVisible || prevState.typingAnimation !== this.state.typingAnimation) {
            this.chatflow.scrollTop = this.chatflow.scrollHeight;
        }

        if (!prevState.isStarted && this.state.isStarted) {
            this.createMessageTimeout(0);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    replay = () => {
        if (!this.state.isStarted) {
            return this.startChat();
        }

        clearTimeout(this.timeout);
        this.setState({
            messagesVisible: 0,
            typingAnimation: {},
        }, () => {
            this.createMessageTimeout(0);
        });
    };

    initChatflow = (e) => {
        if (!e) return;

        this.chatflow = findDOMNode(e);

        if (this.props.autoPlay) {
            this.createMessageTimeout(0);
        }
    };

    createMessageTimeout = (i) => {
        let {messages} = this.props;
        let message = messages[i];
        let delay = ('delay' in message) ? message.delay : this.props.messageDelay;
        let typingDuration = ('typingDuration' in message) ? message.typingDuration : this.props.typingDuration;

        const onMessageReady = () => {
            this.setTypingAnimation(message.from, false);
            this.setState({
                messagesVisible: this.state.messagesVisible + 1,
            });

            if (i < messages.length - 1) {
                this.createMessageTimeout(i + 1);
            }
        };

        if (!delay) {
            onMessageReady();
        }
        else {
            this.timeout = setTimeout(() => {
                this.setTypingAnimation(message.from, true);
                if (message.from === 'system' || !typingDuration) {
                    onMessageReady();
                }
                else {
                    this.timeout = setTimeout(onMessageReady, typingDuration);
                }
            }, delay);
        }
    };

    setTypingAnimation = (from, value) => {
        this.setState({
            typingAnimation: {
                ...this.state.typingAnimation,
                [from]: value,
            },
        });
    };

    startChat = () => {
        this.setState({
            isStarted: true,
        });
    };

    render() {
        let {messages, width, height} = this.props;
        let {messagesVisible, typingAnimation, isStarted} = this.state;

        return (
            <ChatFlow
                ref={this.initChatflow}
                messages={messages}
                width={width}
                height={height}
                messagesVisible={messagesVisible}
                typingAnimation={typingAnimation}
                startChat={this.startChat}
                isStarted={isStarted}
            />
        )
    }
}

ChatFlowContainer.propTypes = propTypes;
ChatFlowContainer.defaultProps = defaultProps;