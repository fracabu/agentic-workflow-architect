
export interface AgentDefinition {
  name: string;
  description: string;
  prompt: string;
}

export interface Workflow {
  agents: AgentDefinition[];
  executionPrompt: string;
}
