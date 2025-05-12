import React from 'react';
import { WizybotLogoIcon } from '../atoms/WizybotLogoIcon';

export const ChatHeader: React.FC = () => (
  <header className="bg-blue-600 text-white p-4 flex items-center space-x-3 shrink-0">
    <WizybotLogoIcon />
    <div className="flex flex-col">
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-semibold">Wizybot Support</h1>
        <span className="w-3 h-3 bg-green-400 rounded-full border-2 border-blue-500 animate-pulse"></span>
      </div>
      <p className="text-xs text-blue-200">We reply immediately!</p>
    </div>
  </header>
);