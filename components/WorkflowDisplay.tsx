
import React from 'react';
import { Workflow, AgentDefinition } from '../types';
import AgentDefinitions from './AgentDefinitions';
import ExecutionPrompt from './ExecutionPrompt';

interface WorkflowDisplayProps {
  workflow: Workflow;
  onWorkflowChange: (workflow: Workflow) => void;
}

const WorkflowDisplay: React.FC<WorkflowDisplayProps> = ({ workflow, onWorkflowChange }) => {

  const handleAgentChange = (index: number, updatedAgent: AgentDefinition) => {
    const newAgents = [...workflow.agents];
    newAgents[index] = updatedAgent;
    onWorkflowChange({ ...workflow, agents: newAgents });
  };

  const handleAddAgent = () => {
    const newAgent: AgentDefinition = {
      name: `new-agent-${workflow.agents.length + 1}`,
      description: "Provide a clear, concise explanation of this new agent's purpose and expertise.",
      prompt: "Provide a detailed set of instructions, responsibilities, and guiding principles for this new AI agent to follow.",
    };
    const newAgents = [...workflow.agents, newAgent];
    onWorkflowChange({ ...workflow, agents: newAgents });
  };

  const handleExecutionPromptChange = (newPrompt: string) => {
    onWorkflowChange({ ...workflow, executionPrompt: newPrompt });
  };

  return (
    <div className="mt-8 space-y-8">
      <AgentDefinitions 
        agents={workflow.agents} 
        onAgentChange={handleAgentChange}
        onAddAgent={handleAddAgent}
      />
      <ExecutionPrompt prompt={workflow.executionPrompt} onPromptChange={handleExecutionPromptChange} />
    </div>
  );
};

export default WorkflowDisplay;
