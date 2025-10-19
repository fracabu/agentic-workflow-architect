# Agentic Workflow Architect

Agentic Workflow Architect è una potente applicazione web progettata per aiutare gli utenti a concettualizzare e progettare sistemi di AI multi-agente. Fornendo uno scenario di alto livello, l'applicazione sfrutta l'API Google Gemini per generare un flusso di lavoro completo, incluse definizioni dettagliate per agenti AI specializzati e un prompt di esecuzione iniziale per avviare il sistema.

Questo strumento è perfetto per sviluppatori, prompt engineer e progettisti di sistemi che desiderano prototipare rapidamente flussi di lavoro complessi basati su agenti senza partire da zero.

<!-- Placeholder: Sostituire con uno screenshot reale -->
![Screenshot di Agentic Workflow Architect](https://i.imgur.com/example.png)

## ✨ Funzionalità Principali

-   **Progettazione Guidata da Scenari:** Descrivi semplicemente il tuo obiettivo in linguaggio naturale e l'applicazione progetterà l'intero sistema di agenti.
-   **Numero di Agenti Personalizzabile:** Specifica il numero esatto di agenti di cui hai bisogno per il tuo flusso di lavoro, da un singolo agente multi-competenza a un team più ampio.
-   **Generazione Dettagliata di Agenti:** Crea automaticamente agenti specializzati con nomi unici, descrizioni chiare e prompt completi e di alta qualità.
-   **Prompt di Esecuzione Unificato:** Genera un singolo e coeso prompt per orchestrare gli agenti e avviare l'intero flusso di lavoro.
-   **UI Completamente Interattiva:** Modifica qualsiasi parte del flusso di lavoro generato direttamente nel browser. Puoi perfezionare nomi, descrizioni, prompt degli agenti e il comando di esecuzione finale.
-   **Copia e Scarica:** Copia facilmente i singoli prompt per utilizzarli in editor di codice o terminali. È inclusa un'opzione di copia sicura per il terminale per prevenire problemi di "shell injection". Puoi anche scaricare le definizioni dei singoli agenti o il prompt di esecuzione come file Markdown.
-   **Scenari di Esempio:** Include una serie di esempi predefiniti per dimostrare le capacità dell'applicazione.
-   **Salva Esempi Personalizzati:** Salva i tuoi scenari direttamente nel `local storage` del tuo browser per un uso futuro.

## ⚙️ Come Funziona

1.  **Input:** L'utente inserisce uno scenario descrittivo (es. "Lanciare una campagna social media per un nuovo prodotto ecologico") e seleziona il numero di agenti desiderato.
2.  **Chiamata API:** L'applicazione costruisce un "meta-prompt" dettagliato che istruisce l'API Google Gemini (`gemini-2.5-flash`) ad agire come un "Architetto di Flussi di Lavoro Agentici".
3.  **Analisi AI:** Gemini analizza lo scenario, lo scompone in compiti logici e progetta un set di agenti specializzati per gestire tali compiti. Genera un nome, una descrizione e un prompt operativo dettagliato per ogni agente.
4.  **Risposta Strutturata:** L'API è configurata per restituire un oggetto JSON strutturato contenente le definizioni degli agenti e un prompt di esecuzione finale, garantendo un output coerente e facilmente analizzabile.
5.  **Rendering:** Il frontend riceve i dati JSON e li visualizza in un'interfaccia utente pulita e interattiva.
6.  **Perfezionamento:** L'utente può quindi rivedere, modificare, copiare o scaricare i componenti del flusso di lavoro generato per utilizzarli nei propri progetti.

## 🚀 Stack Tecnologico

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **Modello AI:** Google Gemini API (`gemini-2.5-flash`)

## 📂 Struttura del Progetto

```
.
├── components/
│   ├── AgentCard.tsx         # Renderizza i dettagli di un singolo agente
│   ├── AgentDefinitions.tsx  # Contenitore per tutte le card degli agenti
│   ├── ApiKeyModal.tsx       # Modale per la gestione della chiave API dell'utente
│   ├── ExecutionPrompt.tsx   # Visualizza il prompt di esecuzione finale
│   ├── Loader.tsx            # Un semplice spinner di caricamento
│   ├── ScenarioInput.tsx     # Il form di input principale per l'utente
│   └── WorkflowDisplay.tsx   # Contenitore per l'intero output generato
├── services/
│   └── geminiService.ts      # Logica per interagire con l'API Gemini
├── types.ts                  # Definizioni dei tipi TypeScript
├── App.tsx                   # Componente principale dell'applicazione
├── index.html                # Punto di ingresso HTML principale
├── index.tsx                 # Renderer root di React
├── README.md                 # File README (Inglese)
└── README.it.md              # Questo file (Italiano)
```

## 🔧 Come Iniziare

Questa applicazione è progettata per funzionare in un ambiente web dove la chiave API di Google Gemini è fornita in modo sicuro dall'utente.

### Prerequisiti

-   Un browser web moderno (Chrome, Firefox, Safari, Edge).
-   Una chiave API valida di Google Gemini.

### Eseguire l'Applicazione

1.  Apri il file `index.html` in un browser web. Non è necessario un server locale, ma è consigliato se si effettuano modifiche.
2.  Al primo avvio, ti verrà chiesto di inserire la tua chiave API di Google Gemini.
3.  La chiave verrà salvata localmente nel tuo browser per le sessioni future.

L'applicazione è ora pronta per l'uso. Inserisci uno scenario, scegli il numero di agenti e clicca su "Design Workflow" per iniziare.
