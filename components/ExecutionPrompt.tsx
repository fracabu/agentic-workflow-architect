import React, { useState } from 'react';

interface ExecutionPromptProps {
  prompt: string;
  onPromptChange: (newPrompt: string) => void;
}

const CopyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const DownloadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const TerminalIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
    </svg>
);


const ExecutionPrompt: React.FC<ExecutionPromptProps> = ({ prompt, onPromptChange }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'copiedTerminal'>('idle');

  const handleCopy = (terminalMode: boolean = false) => {
    const textToCopy = terminalMode ? JSON.stringify(prompt) : prompt;
    navigator.clipboard.writeText(textToCopy);
    setCopyStatus(terminalMode ? 'copiedTerminal' : 'copied');
    setTimeout(() => setCopyStatus('idle'), 2500);
  };
  
  const handleDownload = () => {
    const markdownContent = `# Initial Execution Prompt\n\n\`\`\`\n${prompt}\n\`\`\``;
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'execution-prompt.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-4">Part 2: Initial Execution Prompt</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative">
        <div className="absolute top-4 right-4 flex items-center space-x-2">
            <button
                onClick={() => handleCopy(false)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                aria-label="Copy prompt for editors"
                title="Copy prompt for editors"
            >
                {copyStatus === 'copied'
                    ? <CheckIcon className="h-5 w-5 text-green-400" /> 
                    : <CopyIcon className="h-5 w-5 text-gray-300" />}
            </button>
             <button
                onClick={() => handleCopy(true)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                aria-label="Copy for Terminal (single line)"
                title="Copy for Terminal (single line)"
            >
                {copyStatus === 'copiedTerminal' 
                    ? <CheckIcon className="h-5 w-5 text-green-400" /> 
                    : <TerminalIcon className="h-5 w-5 text-gray-300" />}
            </button>
            <button
                onClick={handleDownload}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                aria-label="Download as Markdown"
                title="Download as Markdown"
            >
                <DownloadIcon className="h-5 w-5 text-gray-300" />
            </button>
        </div>
        <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            className="w-full bg-gray-800 text-gray-300 font-mono text-sm leading-relaxed p-0 border-0 focus:ring-0 resize-none"
            rows={8}
        />
        <p className="text-xs text-gray-500 mt-2 text-right">
            For terminals, use <TerminalIcon className="inline h-3 w-3" /> or <DownloadIcon className="inline h-3 w-3" /> to avoid pasting issues.
        </p>
      </div>
    </section>
  );
};

export default ExecutionPrompt;