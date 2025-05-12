import React from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  formatTimestamp: (date: Date) => string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, formatTimestamp }) => {
  if (!message.text) return null;

  return (
    <div
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`p-3 rounded-lg max-w-[85%] shadow ${
          message.sender === 'user'
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'} text-right`}>
          {formatTimestamp(message.timestamp)}
        </p>
      </div>
    </div>
  );
};