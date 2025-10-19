import { GoogleGenAI, Type } from '@google/genai';
import { Workflow, AgentDefinition } from '../types';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    agents: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "A short, descriptive, kebab-case name for the agent (e.g., 'social-media-strategist')."
          },
          description: {
            type: Type.STRING,
            description: "A clear, concise explanation of the agent's purpose and expertise."
          },
          prompt: {
            type: Type.STRING,
            description: "A detailed set of instructions, responsibilities, and guiding principles for the AI agent to follow."
          }
        },
        required: ["name", "description", "prompt"],
      }
    },
    executionPrompt: {
      type: Type.STRING,
      description: "A single, one-paragraph prompt to kick off the entire workflow, referencing the defined agents by name."
    }
  },
  required: ["agents", "executionPrompt"],
};

export const designWorkflow = async (scenario: string, numAgents: number, apiKey: string): Promise<Workflow> => {
  if (!apiKey) {
    throw new Error("Gemini API key not provided.");
  }
  
  const ai = new GoogleGenAI({ apiKey });

  const metaPrompt = `
You are an expert Agentic Workflow Architect. Your task is to analyze a user-provided scenario and design a complete, multi-agent system to accomplish it.

You MUST follow these instructions:
1.  Analyze the user's scenario to identify the distinct tasks required.
2.  Design exactly ${numAgents} specialized agent(s), distributing the tasks among them as logically as possible. If the scenario is simple, some agents can have more high-level or supervisory roles.
3.  For EACH agent, you must generate a definition with the three parts: 'name', 'description', and 'prompt'. The quality, style, and detail must be exceptional, like a senior engineer designing a system.
4.  The agent 'name' should be a short, descriptive, kebab-case string (e.g., 'social-media-strategist').
5.  The agent 'description' should clearly explain the agent's purpose and expertise.
6.  The agent 'prompt' must be a detailed set of instructions, responsibilities, and guiding principles for that AI agent to follow.
7.  After defining the agents, you will create a single, one-paragraph 'Initial Execution Prompt'.
8.  This execution prompt must clearly state the overall goal, explicitly reference the agents you defined (by their 'name'), specify the order of execution, and define the final output.
9.  You MUST return the entire output as a single, valid JSON object that adheres to the provided schema. Do not include any markdown formatting like \`\`\`json or any text outside of the JSON object.
10. CRUCIAL: All generated content (agent names, descriptions, prompts, and the execution prompt) MUST be in professional English, regardless of the language of the user's input scenario.
11. CRITICAL FOR TERMINAL COMPATIBILITY: In all generated text (descriptions, prompts, etc.), you MUST AVOID using single quotes (') to wrap identifiers or for emphasis. Use double quotes (") sparingly if necessary, but it is preferable to write clearly without needing quotation marks. This is to ensure the text can be safely copied and pasted into a command-line terminal.

User Scenario:
"${scenario}"
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: metaPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    let workflowData = JSON.parse(jsonText);

    // Basic validation to ensure the response shape matches our expectations
    if (!workflowData.agents || !workflowData.executionPrompt) {
        throw new Error("Invalid response structure from API.");
    }

    // Programmatically clean the output to ensure terminal compatibility.
    // This is a safeguard in case the model doesn't perfectly follow the prompt instruction to avoid single quotes.
    const cleanString = (str: string): string => str.replace(/'/g, '');

    workflowData.agents = workflowData.agents.map((agent: AgentDefinition) => ({
      ...agent,
      description: cleanString(agent.description),
      prompt: cleanString(agent.prompt),
    }));

    workflowData.executionPrompt = cleanString(workflowData.executionPrompt);

    return workflowData as Workflow;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        throw new Error("Your Gemini API key is not valid. Please check it and try again.");
    }
    throw new Error("Failed to generate workflow from Gemini API.");
  }
};
