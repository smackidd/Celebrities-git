import React from 'react';
import ChatMessages from './room-chat-messages.component.js';

const RoomChat = ({ message, messages, setMessage, sendMessage }) => {
  return (
    <React.Fragment>
      <h3>Chat</h3>
      <ChatMessages messages={messages} />
      <div id='chat-input1'>
        <form id='chat-form'>
          <input
            type='text'
            id='msg'
            placeholder='Enter Message'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) =>
              event.key === 'Enter' ? sendMessage(event) : null
            }
          />
          <button type='submit' onClick={(event) => sendMessage(event)}>
            Send
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default RoomChat;
