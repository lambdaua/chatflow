# React Chatflow
[![npm version](https://img.shields.io/npm/v/react-chatflow.svg?style=flat)](https://www.npmjs.com/package/react-chatflow)

[React](https://github.com/facebook/react) library that helps you to emulate a simple chatflow between a real user and a bot.

## Installation

Download the package:
```
npm install --save react-chatflow
```

## Basic usage

```jsx
import Chatflow from 'react-chatflow';

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
    {message: "have a nice day!", from: "bot"}
];

<Chatflow
    messages={messages}
/>
```

## Properties

| Property | Type | Default value | Description |
|:--------:|:----:|:-------------:|-------------|
| `messages` | array | - | Array of messages to display (see [message structure](#message-structure) for detailed info) |
| `width` | number | `300` | Width (in px) of chat area |
| `height` | number | `300` | Height (in px) of chat area |
| `typingDuration` | number | `1000` | Duration (in ms) while the typing indicator is shown for each message |
| `messageDelay` | number | `1500` | Delay (in ms) before each message is shown |
| `onInit` | function | - | Callback that is called with no params after the init |
| `autoPlay` | bool | `false` | If set to `true`, messages will start showing without the user interaction |
| `messageClassName` | string | - | Custom class name that will be added to each message |
| `leftMessageClassName` | string | - | Custom class that will be added to each message from the bot |
| `rightMessageClassName` | string | - | Custom class that will be added to each message from the real user |
| `systemMessageClassName` | string | - | Custom class that will be added to each message from the system |
| `messageTextClassName` | string | - | Custom class that will be added to the text of each message |
| `containerClassName` | string | - | Custom class that will be added to the chat container |
| `messageAvatarClassName` | string | - | Custom class name that will be added to each avatar |
| `typingIndicatorClassName` | string | - | Custom class name that will be added to the typing indicator |
| `typingIndicatorInnerClassName` | string | - | Custom class name that will be added to the inner part of the typing indicator |
| `startBtnClassName` | string | - | Custom class name that will be added to the button that starts the chatflow |

## Message structure

| Field | Type | Required | Description |
|:-----:|:----:|:--------:|-------------|
| `message` | string | **yes** | Displayed text |
| `from` | string | **yes** |<ul><li><code>user</code> - message from the real user, shown on the right</li><li><code>bot</code> - message from the bot, shown on the left</li><li><code>system</code> - system message, shown in the middle</li></ul> |
| `delay` | number | no | Custom delay (in ms) before this message is shown |
| `typingDuration` | number | no | Custom duration (in ms) while the typing indicator is shown for this message |

## Licence
MIT
