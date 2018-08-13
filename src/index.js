import React from 'react';
import ReactDOM from 'react-dom';

import ChatFlow from './containers/ChatFlowContainer';

const messages = [
    {message: '- Conversation start -', from: 'system'},
    {message: "Josh, I need your email to register on our service", from: "bot"},
    {message: "sure", from: "user"},
    {message: "josh@email.com", from: "user"},
    {message: "thx, Josh", from: "bot"},
    {message: "and your phone number", from: "bot"},
    {message: '- Some system message again -', from: "system"},
    {message: "+47-JOSH-PHONE", from: "user"},
    {message: "great, thanks a lot", from: "bot"},
    {message: "have a nice day!", from: "bot"},
];

if (process.env.__REACT_CHATFLOW_TEST) {
    let root = document.createElement('div');
    document.body.appendChild(root);

    ReactDOM.render(
        <ChatFlow
            messages={messages}
            autoPlay
            messageDelay={0}
            typingDuration={0}
        />
        , root
    );
}

export default ChatFlow;