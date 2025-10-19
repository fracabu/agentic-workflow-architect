
import React from 'react';
import { AgentDefinition } from '../types';
import AgentCard from './AgentCard';

interface AgentDefinitionsProps {
  agents: AgentDefinition[];
  onAgentChange: (index: number, updatedAgent: AgentDefinition) => void;
  onAddAgent: () => void;
}

const PlusIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);


const AgentDefinitions: React.FC<AgentDefinitionsProps> = ({ agents, onAgentChange, onAddAgent }) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Part 1: Required Agent Definitions</h2>
        <button
            onClick={onAddAgent}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center gap-2"
            aria-label="Add new agent"
        >
            <PlusIcon className="h-5 w-5" />
            <span>Add Agent</span>
        </button>
      </div>
      <div className="space-y-6">
        {agents.map((agent, index) => (
          <AgentCard
            key={index}
            agent={agent}
            onAgentChange={(updatedAgent) => onAgentChange(index, updatedAgent)}
            agentNumber={index + 1}
          />
        ))}
      </div>
    </section>
  );
};

export default AgentDefinitions;
