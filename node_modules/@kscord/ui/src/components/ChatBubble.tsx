import React from 'react';

export type ChatBubbleProps = {
  user: string;
  text: string;
};

export const ChatBubble: React.FC<ChatBubbleProps> = ({ user, text }) => {
  return (
    <div style={{
      background: '#2f3136',
      color: '#fff',
      padding: '10px',
      marginBottom: '8px',
      borderRadius: '8px',
      maxWidth: '70%',
    }}>
      <strong style={{ color: '#00AFF4' }}>{user}</strong>: {text}
    </div>
  );
};
