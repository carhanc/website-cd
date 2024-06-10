// components/ChatWindow.js
import React from 'react';

const ChatWindow = ({ closeChat }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        width: '300px',
        height: '400px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
      }}
    >
      <button
        onClick={closeChat}
        style={{
          alignSelf: 'flex-end',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        X
      </button>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Your chat content goes here */}
        <p>Chat with us!</p>
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginTop: '10px',
        }}
      />
    </div>
  );
};

export default ChatWindow;
