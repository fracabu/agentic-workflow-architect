<h1 align="center">Agentic Workflow Architect</h1>
<h3 align="center">Design multi-agent AI systems from natural language</h3>

<p align="center">
  <em>Transform scenarios into complete agent workflows with Gemini AI</em>
</p>

<p align="center">
  <img src="https://github.com/fracabu/agentic-workflow-architect/actions/workflows/ci.yml/badge.svg" alt="CI" />
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Gemini_AI-4285F4?style=flat-square&logo=google&logoColor=white" alt="Gemini AI" />
</p>

<p align="center">
  :gb: <a href="#english">English</a> | :it: <a href="#italiano">Italiano</a>
</p>

---

## Overview

![Agentic Workflow Architect Overview](assets/agentic-workflow-overview.png)

---

<a name="english"></a>
## :gb: English

### What is Agentic Workflow Architect?

A web application that helps you design **multi-agent AI systems** by simply describing your goal in natural language. The app uses Google Gemini to generate complete agent definitions, prompts, and execution workflows.

### Features

- **Scenario-Driven Design**: Describe your goal, get a complete agentic system
- **Customizable Agent Count**: Specify 1-10 agents for your workflow
- **Detailed Agent Generation**: Creates agents with names, descriptions, and operational prompts
- **Unified Execution Prompt**: Generates a single prompt to orchestrate all agents
- **Interactive UI**: Edit any part of the generated workflow in the browser
- **Copy & Download**: Export prompts as Markdown or copy for terminal use
- **Example Scenarios**: Pre-built examples to demonstrate capabilities
- **Save Custom Examples**: Store your scenarios in local storage

### How It Works

```
User Scenario
     |
     v
+-------------------+
|   Gemini 2.5      |  Analyzes scenario
|   Flash API       |  Designs agent team
+-------------------+
     |
     v
+-------------------+
|  Agent Definitions|  Name, description,
|  + Prompts        |  operational prompt
+-------------------+
     |
     v
+-------------------+
| Execution Prompt  |  Single prompt to
|                   |  orchestrate all agents
+-------------------+
```

### Quick Start

```bash
# Clone
git clone https://github.com/fracabu/agentic-workflow-architect.git
cd agentic-workflow-architect

# Install
npm install

# Configure
# Set VITE_GEMINI_API_KEY in .env

# Run
npm run dev
```

### Example Scenarios

| Scenario | Agents |
|----------|--------|
| Launch social media campaign | Marketing, Content, Analytics |
| Build SaaS MVP | PM, Frontend, Backend, QA |
| Analyze competitor landscape | Research, Data, Strategy |

---

<a name="italiano"></a>
## :it: Italiano

### Cos'e Agentic Workflow Architect?

Un'applicazione web che ti aiuta a progettare **sistemi AI multi-agente** semplicemente descrivendo il tuo obiettivo in linguaggio naturale. L'app usa Google Gemini per generare definizioni complete degli agenti, prompt e workflow di esecuzione.

### Funzionalita

- **Design Guidato dallo Scenario**: Descrivi l'obiettivo, ottieni un sistema agentico completo
- **Numero Agenti Personalizzabile**: Specifica da 1 a 10 agenti per il workflow
- **Generazione Agenti Dettagliata**: Crea agenti con nomi, descrizioni e prompt operativi
- **Prompt di Esecuzione Unificato**: Genera un singolo prompt per orchestrare tutti gli agenti
- **UI Interattiva**: Modifica qualsiasi parte del workflow generato nel browser
- **Copia & Download**: Esporta i prompt come Markdown o copia per uso terminale
- **Scenari di Esempio**: Esempi pre-costruiti per dimostrare le capacita
- **Salva Esempi Personalizzati**: Memorizza i tuoi scenari in local storage

### Come Funziona

```
Scenario Utente
     |
     v
+-------------------+
|   Gemini 2.5      |  Analizza lo scenario
|   Flash API       |  Progetta il team di agenti
+-------------------+
     |
     v
+-------------------+
| Definizioni Agenti|  Nome, descrizione,
|  + Prompt         |  prompt operativo
+-------------------+
     |
     v
+-------------------+
| Prompt Esecuzione |  Singolo prompt per
|                   |  orchestrare tutti gli agenti
+-------------------+
```

### Quick Start

```bash
# Clona
git clone https://github.com/fracabu/agentic-workflow-architect.git
cd agentic-workflow-architect

# Installa
npm install

# Configura
# Imposta VITE_GEMINI_API_KEY in .env

# Esegui
npm run dev
```

### Scenari di Esempio

| Scenario | Agenti |
|----------|--------|
| Lancio campagna social media | Marketing, Content, Analytics |
| Costruire MVP SaaS | PM, Frontend, Backend, QA |
| Analisi competitor | Research, Data, Strategy |

---

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI Model**: Google Gemini API (`gemini-2.5-flash`)

## Project Structure

```
.
├── components/
│   ├── AgentCard.tsx         # Single agent details
│   ├── AgentDefinitions.tsx  # All agent cards container
│   ├── ExecutionPrompt.tsx   # Final execution prompt
│   ├── ScenarioInput.tsx     # User input form
│   └── WorkflowDisplay.tsx   # Generated output container
├── services/
│   └── geminiService.ts      # Gemini API integration
├── App.tsx                   # Main component
└── README.md
```

---

## License

MIT

---

<p align="center">
  <strong>Agentic Workflow Architect</strong> — Design AI agent teams in seconds
</p>

<p align="center">
  <a href="https://github.com/fracabu">
    <img src="https://img.shields.io/badge/Made_by-fracabu-8B5CF6?style=flat-square" alt="Made by fracabu" />
  </a>
</p>
