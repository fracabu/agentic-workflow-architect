import React, { useState, useEffect } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (geminiKey: string, openaiKey: string) => void;
  currentGeminiKey: string;
  currentOpenaiKey: string;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave, currentGeminiKey, currentOpenaiKey }) => {
  const [geminiKey, setGeminiKey] = useState(currentGeminiKey);
  const [openaiKey, setOpenaiKey] = useState(currentOpenaiKey);

  useEffect(() => {
    setGeminiKey(currentGeminiKey || '');
    setOpenaiKey(currentOpenaiKey || '');
  }, [currentGeminiKey, currentOpenaiKey, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(geminiKey, openaiKey);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-md m-4 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">API Keys</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-gray-400 mb-4">
          Please enter your API keys to use this application. Your keys are stored securely in your browser's local storage and are never sent to our servers.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="gemini-key-input" className="block text-sm font-medium text-gray-300 mb-2">
              Google Gemini API Key
            </label>
            <input
              id="gemini-key-input"
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter your Gemini key"
            />
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline text-xs mt-1 block"
            >
              Get your key from Google AI Studio &rarr;
            </a>
          </div>

          <div>
            <label htmlFor="openai-key-input" className="block text-sm font-medium text-gray-300 mb-2">
              OpenAI API Key
            </label>
            <input
              id="openai-key-input"
              type="password"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter your OpenAI key"
            />
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline text-xs mt-1 block"
            >
              Get your key from OpenAI Platform &rarr;
            </a>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={!geminiKey?.trim() && !openaiKey?.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Save Keys
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
