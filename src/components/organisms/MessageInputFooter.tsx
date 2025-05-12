import React from 'react';
import { SendIcon } from '../atoms/SendIcon';

interface MessageInputFooterProps {
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isAiTyping: boolean;
}

export const MessageInputFooter: React.FC<MessageInputFooterProps> = ({
  inputValue,
  onInputChange,
  onSendMessage,
  onKeyPress,
  isAiTyping,
}) => (
  <footer className="bg-gray-100 p-4 border-t border-gray-200 shrink-0">
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Write a message..."
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
        value={inputValue}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
        disabled={isAiTyping}
      />
      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 disabled:opacity-50"
        aria-label="Send message"
        onClick={onSendMessage}
        disabled={inputValue.trim() === '' || isAiTyping}
      >
        <SendIcon />
      </button>
    </div>
    <p className="text-xs text-gray-400 text-center mt-3">
      Powered by Wizybot <span role="img" aria-label="lock">🔒</span>
    </p>
  </footer>
);