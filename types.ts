
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
export type OpenAIModel = 'gpt-5-2025-08-07' | 'gpt-5-mini-2025-08-07';

export type AIProvider = 'gemini' | 'openai';
export type AIModel = GeminiModel | OpenAIModel;
