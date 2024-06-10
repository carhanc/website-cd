// components/ChatButton.js
import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleChatWindow}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          cursor: 'pointer',
        }}
      >
        Chat
      </button>
      {isOpen && <ChatWindow closeChat={toggleChatWindow} />}
    </div>
  );
};

export default ChatButton;
