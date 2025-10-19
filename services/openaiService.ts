import { Workflow, AgentDefinition, OpenAIModel } from '../types';

const responseSchema = {
  type: "object",
  properties: {
    agents: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "A short, descriptive, kebab-case name for agent (e.g., 'social-media-strategist')."
          },
          description: {
            type: "string",
            description: "A clear, concise explanation of agent's purpose and expertise."
          },
          prompt: {
            type: "string",
            description: "A detailed set of instructions, responsibilities, and guiding principles for AI agent to follow."
          }
        },
        required: ["name", "description", "prompt"],
      }
    },
    executionPrompt: {
      type: "string",
      description: "A single, one-paragraph prompt to kick off the entire workflow, referencing defined agents by name."
    }
  },
  required: ["agents", "executionPrompt"],
};

export const designWorkflowWithOpenAI = async (scenario: string, numAgents: number, apiKey: string, model: OpenAIModel = 'gpt-4o'): Promise<Workflow> => {
  if (!apiKey) {
    throw new Error("OpenAI API key not provided.");
  }

  const metaPrompt = `
You are an expert Agentic Workflow Architect. Your task is to analyze a user-provided scenario and design a complete, multi-agent system to accomplish it.

You MUST follow these instructions:
1.  Analyze user's scenario to identify distinct tasks required.
2.  Design exactly ${numAgents} specialized agent(s), distributing tasks among them as logically as possible. If scenario is simple, some agents can have more high-level or supervisory roles.
3.  For EACH agent, you must generate a definition with three parts: 'name', 'description', and 'prompt'. The quality, style, and detail must be exceptional, like a senior engineer designing a system.
4.  The agent 'name' should be a short, descriptive, kebab-case string (e.g., 'social-media-strategist').
5.  The agent 'description' should clearly explain the agent's purpose and expertise.
6.  The agent 'prompt' must be a detailed set of instructions, responsibilities, and guiding principles for that AI agent to follow.
7.  After defining agents, you will create a single, one-paragraph 'Initial Execution Prompt'.
8.  This execution prompt must clearly state the overall goal, explicitly reference agents you defined (by their 'name'), specify the order of execution, and define the final output.
9.  You MUST return the entire output as a single, valid JSON object that adheres to the provided schema. Do not include any markdown formatting like \`\`\`json or any text outside of the JSON object.
10. CRUCIAL: All generated content (agent names, descriptions, prompts, and execution prompt) MUST be in professional English, regardless of the language of the user's input scenario.
11. CRITICAL FOR TERMINAL COMPATIBILITY: In all generated text (descriptions, prompts, etc.), you MUST AVOID using single quotes (') to wrap identifiers or for emphasis. Use double quotes (") sparingly if necessary, but it is preferable to write clearly without needing quotation marks. This is to ensure text can be safely copied and pasted into a command-line terminal.

User Scenario:
"${scenario}"
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert Agentic Workflow Architect. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: metaPrompt
          }
        ],
        response_format: {
          type: 'json_object',
          schema: responseSchema
        },
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 401) {
        throw new Error("Your OpenAI API key is not valid. Please check it and try again.");
      }
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const jsonText = data.choices[0].message.content.trim();
    let workflowData = JSON.parse(jsonText);

    // Basic validation to ensure response shape matches our expectations
    if (!workflowData.agents || !workflowData.executionPrompt) {
      throw new Error("Invalid response structure from API.");
    }

    // Programmatically clean output to ensure terminal compatibility.
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
    console.error("Error calling OpenAI API:", error);
    if (error instanceof Error && error.message.includes('API key')) {
      throw error;
    }
    throw new Error("Failed to generate workflow from OpenAI API.");
  }
};