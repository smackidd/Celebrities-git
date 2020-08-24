import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatMessages = ({ messages }) => {
  return (
    <ScrollToBottom>
      <div className='chat'>
        {messages.map((message) => (
          <React.Fragment>
            <p className='meta'>
              <strong>{message.user}</strong>
            </p>
            <p className='msgText'>{message.text}</p>
          </React.Fragment>
        ))}
      </div>
    </ScrollToBottom>
  );
};

export default ChatMessages;
