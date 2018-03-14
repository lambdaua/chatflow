import React from 'react';
import ReactDOM from 'react-dom';

import ChatFlow from './containers/ChatFlowContainer';

const messages = [
    {message: '- Conversation start -', from: 'system', delay: 0},
    {message: "Josh, I need your email to register on our service", from: "bot", delay: 500, typingDuration: 1000},
    {message: "sure", from: "user"},
    {message: "josh@email.com", from: "user"},
    {message: "thx, Josh", from: "bot"},
    {message: "and your phone number", from: "bot"},
    {message: '- Some system message again -', from: "system"},
    {message: "+47-JOSH-PHONE", from: "user"},
    {message: "great, thanks a lot", from: "bot"},
    {message: "have a nice day!", from: "bot"},
    {message: "have a nice day!", from: "bot"},
    {message: "have a nice day!", from: "bot"},
];

let root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
    <ChatFlow
        messages={messages}
        onInit={(e) => window.chatflow = e}
    />
    , root
);
