import React, { useState } from 'react';
import { AgentDefinition } from '../types';

interface AgentCardProps {
  agent: AgentDefinition;
  onAgentChange: (updatedAgent: AgentDefinition) => void;
  agentNumber: number;
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

const AgentCard: React.FC<AgentCardProps> = ({ agent, onAgentChange, agentNumber }) => {
  const [copiedField, setCopiedField] = useState<'idle' | 'name' | 'description' | 'prompt' | 'promptTerminal'>('idle');

  const handleCopy = (field: 'name' | 'description' | 'prompt', terminalMode: boolean = false) => {
    let textToCopy: string;
    let fieldToSet: 'name' | 'description' | 'prompt' | 'promptTerminal';

    switch (field) {
        case 'name':
            textToCopy = agent.name;
            fieldToSet = 'name';
            break;
        case 'description':
            textToCopy = agent.description;
            fieldToSet = 'description';
            break;
        case 'prompt':
            textToCopy = terminalMode ? JSON.stringify(agent.prompt) : agent.prompt;
            fieldToSet = terminalMode ? 'promptTerminal' : 'prompt';
            break;
        default:
            return;
    }
    
    navigator.clipboard.writeText(textToCopy);
    setCopiedField(fieldToSet);
    setTimeout(() => setCopiedField('idle'), 2500);
  };

  const handleChange = (field: keyof AgentDefinition, value: string) => {
    onAgentChange({ ...agent, [field]: value });
  };

  const handleDownload = () => {
    const markdownContent = 
`# Agent: ${agent.name}

## Description
${agent.description}

## Prompt
\`\`\`
${agent.prompt}
\`\`\``;
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${agent.name || `agent-${agentNumber}`}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
      <div className="p-6">
        <div className="flex justify-between items-center">
            <div className="flex-grow">
                <span className="text-blue-400 font-semibold">Agent {agentNumber}</span>
                <input
                    type="text"
                    value={agent.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="text-2xl font-bold bg-transparent border-0 p-0 focus:ring-0 w-full text-white"
                />
            </div>
            <button
                onClick={() => handleCopy('name')}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors ml-4 flex-shrink-0"
                aria-label="Copy agent name"
                title="Copy agent name"
            >
                {copiedField === 'name'
                    ? <CheckIcon className="h-5 w-5 text-green-400" /> 
                    : <CopyIcon className="h-5 w-5 text-gray-300" />}
            </button>
        </div>
        
        <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-400">Description</label>
                 <button
                    onClick={() => handleCopy('description')}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors flex-shrink-0"
                    aria-label="Copy description"
                    title="Copy description"
                >
                    {copiedField === 'description'
                        ? <CheckIcon className="h-5 w-5 text-green-400" /> 
                        : <CopyIcon className="h-5 w-5 text-gray-300" />}
                </button>
            </div>
            <textarea
                value={agent.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-md p-2 text-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none"
                rows={3}
            />
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-900/50 relative">
        <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-400">Prompt</label>
            <div className="flex items-center space-x-2">
              <button
                  onClick={() => handleCopy('prompt', false)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                  aria-label="Copy prompt for editors"
                  title="Copy prompt for editors"
              >
                  {copiedField === 'prompt' 
                  ? <CheckIcon className="h-5 w-5 text-green-400" /> 
                  : <CopyIcon className="h-5 w-5 text-gray-300" />}
              </button>
               <button
                  onClick={() => handleCopy('prompt', true)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                  aria-label="Copy for Terminal (single line)"
                  title="Copy for Terminal (single line)"
              >
                  {copiedField === 'promptTerminal' 
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
        </div>
        <textarea
            value={agent.prompt}
            onChange={(e) => handleChange('prompt', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 font-mono text-sm text-gray-300 leading-relaxed focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y"
            rows={15}
        />
        <p className="text-xs text-gray-500 mt-2 text-right">
            For terminals, use <TerminalIcon className="inline h-3 w-3" /> or <DownloadIcon className="inline h-3 w-3" /> to avoid pasting issues.
        </p>
      </div>
    </div>
  );
};

export default AgentCard;
