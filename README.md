# Agentic Workflow Architect

![CI](https://github.com/fracabu/agentic-workflow-architect/actions/workflows/ci.yml/badge.svg)


Agentic Workflow Architect is a powerful web application designed to help users conceptualize and design multi-agent AI systems. By providing a high-level scenario, the application leverages the Google Gemini API to generate a complete workflow, including detailed definitions for specialized AI agents and an initial execution prompt to set the system in motion.

This tool is perfect for developers, prompt engineers, and system designers who want to rapidly prototype complex, agent-based workflows without starting from scratch.

![Agentic Workflow Architect Screenshot](https://i.imgur.com/example.png) <!-- Placeholder: Replace with an actual screenshot -->

## ✨ Core Features

-   **Scenario-Driven Design:** Simply describe your goal in natural language, and the application designs the entire agentic system.
-   **Customizable Agent Count:** Specify the exact number of agents you need for your workflow, from a single, multi-skilled agent to a larger team.
-   **Detailed Agent Generation:** Automatically creates specialized agents with unique names, clear descriptions, and comprehensive, high-quality prompts.
-   **Unified Execution Prompt:** Generates a single, cohesive prompt to orchestrate the agents and kick off the entire workflow.
-   **Fully Interactive UI:** Edit any part of the generated workflow directly in the browser. You can refine agent names, descriptions, prompts, and the final execution command.
-   **Copy & Download:** Easily copy individual prompts for use in code editors or terminals. A terminal-safe copy option is included to prevent shell injection issues. You can also download individual agent definitions or the execution prompt as Markdown files.
-   **Example Scenarios:** Comes with a set of pre-built examples to demonstrate the application's capabilities.
-   **Save Custom Examples:** Save your own scenarios directly in your browser's local storage for future use.

## ⚙️ How It Works

1.  **Input:** The user enters a descriptive scenario (e.g., "Launch a social media campaign for a new eco-friendly product") and selects the desired number of agents.
2.  **API Call:** The application constructs a detailed "meta-prompt" that instructs the Google Gemini API (`gemini-2.5-flash`) to act as an "Agentic Workflow Architect."
3.  **AI Analysis:** Gemini analyzes the scenario, breaks it down into logical tasks, and designs a set of specialized agents to handle those tasks. It generates a name, description, and a detailed operational prompt for each agent.
4.  **Structured Response:** The API is configured to return a structured JSON object containing the agent definitions and a final execution prompt, ensuring a consistent and parseable output.
5.  **Rendering:** The frontend receives the JSON data and renders it in a clean, interactive user interface.
6.  **Refinement:** The user can then review, edit, copy, or download the generated workflow components for use in their own projects.

## 🚀 Tech Stack

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **AI Model:** Google Gemini API (`gemini-2.5-flash`)

## 📂 Project Structure

```
.
├── components/
│   ├── AgentCard.tsx         # Renders a single agent's details
│   ├── AgentDefinitions.tsx  # Container for all agent cards
│   ├── ExecutionPrompt.tsx   # Displays the final execution prompt
│   ├── Loader.tsx            # A simple loading spinner
│   ├── ScenarioInput.tsx     # The main input form for the user
│   └── WorkflowDisplay.tsx   # Container for the entire generated output
├── services/
│   └── geminiService.ts      # Logic for interacting with the Gemini API
├── types.ts                  # TypeScript type definitions
├── App.tsx                   # Main application component
├── index.html                # Main HTML entry point
├── index.tsx                 # React root renderer
└── README.md                 # This file
```

## 🔧 Getting Started

This application is designed to run in a web environment where the Google Gemini API key is securely provided.

### Prerequisites

-   A modern web browser (Chrome, Firefox, Safari, Edge).
-   A valid Google Gemini API key.

### Running the Application

1.  Ensure the environment you are running this in has access to a `process.env.API_KEY` variable containing your Gemini API key.
2.  Serve the `index.html` file through a local web server.
3.  Open the application in your browser.

The application is now ready to use. Enter a scenario, choose the number of agents, and click "Design Workflow" to begin.

