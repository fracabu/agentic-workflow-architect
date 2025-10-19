
export interface AgentDefinition {
  name: string;
  description: string;
  prompt: string;
}

export interface Workflow {
  agents: AgentDefinition[];
  executionPrompt: string;
}

export type GeminiModel = 'gemini-2.5-flash' | 'gemini-2.5-pro';
