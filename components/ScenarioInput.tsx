import React, { useState, useEffect } from 'react';

interface ScenarioInputProps {
  scenario: string;
  setScenario: (scenario: string) => void;
  onDesign: () => void;
  isLoading: boolean;
  numAgents: number;
  setNumAgents: (num: number) => void;
  hasApiKey: boolean;
}

interface ScenarioExample {
  label: string;
  value: string;
}

const defaultScenarioExamples: ScenarioExample[] = [
  { label: 'Social Media for Italian Vacation Rentals', value: 'devo creare una pagina social su fb con contenuti ottimizzati la pagina è dedicata ad una piattaforma che fornisce strumenti digitali ad host italiani e gestori di case vacanze in forma non imprenditoriale e non' },
  { label: 'Ospitly.it Social Media Launch', value: `Obiettivo: Creare da zero una presenza social efficace su Facebook e Instagram per lanciare la piattaforma italiana Ospitly.it, con l'obiettivo di generare consapevolezza del brand, attrarre i primi utenti host, e promuovere il valore della gestione "all-in-one" e della prenotazione diretta.

Contesto:

Prodotto: Ospitly.it è la piattaforma software all-in-one progettata in Italia per host e property manager di affitti brevi. La sua proposta di valore è centralizzare e semplificare ogni aspetto della gestione.
Funzionalità Chiave da Promuovere:
Channel Manager: Per sincronizzare calendari e prenotazioni su Airbnb, Booking.com, Vrbo e altri portali, evitando overbooking.
Pricing Dinamico: Per ottimizzare automaticamente i prezzi in base a domanda, stagione ed eventi.
Website Builder: Uno strumento cruciale per permettere agli host di creare il proprio sito di prenotazione diretta, riducendo le commissioni dei portali.
Check-in Online: Per automatizzare l'accoglienza e la raccolta dei documenti degli ospiti.
Gestione Pulizie e Manutenzione: Per organizzare il personale e le attività tra un cambio di ospite e l'altro.
Pubblico Target: Host privati e piccole/medie imprese di gestione immobiliari (property manager) in Italia. Sono professionisti spesso sovraccarichi di lavoro, che cercano una soluzione unica per risparmiare tempo, ridurre gli errori e massimizzare i guadagni. Il loro "dolore" è la frammentazione di diversi strumenti e la gestione manuale.
Stato Attuale: Siamo una startup italiana in fase di lancio. L'obiettivo è posizionarci come l'alternativa italiana e più completa rispetto ai competitor internazionali, sottolineando la comprensione del mercato locale e un supporto più accessibile.
Tone of Voice: Esperto, affidabile, ma anche empatico e proattivo. Usa un linguaggio semplice e diretto ("tu"), evitando tecnicismi inutili. Si posiziona come un partner strategico per la crescita dell'host, non solo come un software.
Compiti Richiesti:

Analisi di Mercato e Competitor: Analizzare i competitor (sia italiani che internazionali) sui social. Identificare i loro contenuti e la loro comunicazione. Sviluppare un angolazione unica per Ospitly, sottolineando il vantaggio di essere una piattaforma italiana e la completezza del suo ecosistema "all-in-one".
Definizione della Strategia di Contenuto: Sviluppare una strategia basata su pilastri tematici chiari:
Educazione: Guide su "Come aumentare le prenotazioni", "Vantaggi del pricing dinamico", "Come ridurre le commissioni".
Demo Funzionalità: Brevi video (Reel) e post che mostrano nel dettaglio come funziona una specifica funzionalità di Ospitly (es. "Crea il tuo sito di prenotazione in 5 minuti").
Storie di Successo: Interviste o testimonianze (anche simulate inizialmente) di host che hanno ottimizzato il loro lavoro.
Prenotazione Diretta: Contenuti focalizzati sui benefici economici e di controllo derivanti dall'avere un proprio sito web.
Creazione del Calendario Editoriale: Produrre un calendario editoriale dettagliato per il primo mese, specificando per ogni giorno: piattaforma, tipo di contenuto (post, Reel, Storia, carosello), pilastro tematico e call-to-action (es. "Prova gratis", "Scopri come funziona").
Produzione dei Contenuti Iniziali: Creare un pacchetto di contenuti di lancio (circa 10-12 post). Questo include:
Scrittura Copy: Redigere testi che parlano direttamente ai "dolori" dell'host e presentano Ospitly come la soluzione.
Creazione Visiva: Progettare grafiche pulite e professionali. Utilizzare screenshot e brevi screen-recording dell'interfaccia di Ospitly per mostrare la semplicità e la potenza dello strumento.
Setup e Ottimizzazione delle Pagine: Creare e configurare le pagine Facebook e Instagram, ottimizzando biografia e link per comunicare immediatamente il valore di Ospitly.it e indirizzare il traffico verso il sito per una prova gratuita o una demo.
Definizione della Strategia di Engagement: Stabilire le linee guida per interagire con la community, rispondendo a domande tecniche in modo chiaro e incoraggiando la condivisione di esperienze tra host.
Risultato Atteso:
Un pacchetto di lancio completo che includa:

Un documento di strategia social che definisce il posizionamento unico di Ospitly.
Il calendario editoriale del primo mese.
Un set di 10-12 contenuti pronti per la pubblicazione (grafiche, video e copy) che mostrano concretamente la piattaforma.
Le pagine Facebook e Instagram completamente impostate e ottimizzate per la conversione.`},
  { label: 'Marketing for Eco-Friendly Coffee Cups', value: 'Launch a comprehensive marketing campaign for a new brand of eco-friendly, reusable coffee cups. The campaign should target millennials on social media, include influencer collaborations, and track key performance metrics.' },
  { label: 'Software Feature Development', value: 'Develop a new feature for a project management application. The feature should allow users to create Gantt charts, assign tasks to team members, and set deadlines. The process should include planning, UI/UX design, development, testing, and deployment.' },
  { label: 'Content Creation for Remote Work', value: 'Create a series of 5 educational blog posts and corresponding social media snippets about the benefits of remote work for small businesses. The content should be SEO-optimized and engaging.' },
  { label: 'Travel Planning for Tokyo', value: 'Plan a 7-day trip to Tokyo, Japan for two people on a moderate budget. The plan should include flight and accommodation recommendations, a daily itinerary with sightseeing spots, restaurant suggestions for authentic Japanese cuisine, and transportation details.' },
  { label: 'E-commerce for Artisanal Ceramics', value: 'Lanciare un piccolo negozio di e-commerce per vendere ceramiche artigianali fatte a mano. Il progetto include la creazione del sito, la fotografia dei prodotti, la scrittura delle descrizioni e la gestione degli ordini.' },
];


const ScenarioInput: React.FC<ScenarioInputProps> = ({ scenario, setScenario, onDesign, isLoading, numAgents, setNumAgents, hasApiKey }) => {
  const [customExamples, setCustomExamples] = useState<ScenarioExample[]>([]);

  useEffect(() => {
    try {
      const storedExamples = localStorage.getItem('customScenarioExamples');
      if (storedExamples) {
        setCustomExamples(JSON.parse(storedExamples));
      }
    } catch (e) {
      console.error("Failed to parse custom examples from localStorage", e);
      localStorage.removeItem('customScenarioExamples');
    }
  }, []);

  const handleSaveExample = () => {
    const label = prompt("Enter a short name for this scenario example:");
    if (!label) return;

    if (!scenario.trim()) {
      alert("Cannot save an empty scenario.");
      return;
    }

    const newExample = { label, value: scenario };

    setCustomExamples(prevExamples => {
      if (prevExamples.some(ex => ex.label === label) || defaultScenarioExamples.some(ex => ex.label === label)) {
        alert("An example with this name already exists.");
        return prevExamples; 
      }
      const updatedExamples = [...prevExamples, newExample];
      try {
        localStorage.setItem('customScenarioExamples', JSON.stringify(updatedExamples));
      } catch (e) {
        console.error("Failed to save custom examples to localStorage", e);
        alert("Could not save the example to your browser's storage.");
      }
      return updatedExamples;
    });
  };

  const handleDeleteExample = (valueToDelete: string) => {
    if (!window.confirm("Are you sure you want to delete this custom example?")) return;
    
    setCustomExamples(prevExamples => {
        const updatedExamples = prevExamples.filter(ex => ex.value !== valueToDelete);
        try {
            localStorage.setItem('customScenarioExamples', JSON.stringify(updatedExamples));
        } catch (e) {
            console.error("Failed to update custom examples in localStorage", e);
        }
        return updatedExamples;
    });
    
    if (scenario === valueToDelete) {
      setScenario('');
    }
  }
  
  const handleExampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setScenario(selectedValue);
  };
  
  const allExamples = [...defaultScenarioExamples, ...customExamples];
  const isExampleSelected = allExamples.some(ex => ex.value === scenario);
  const selectedCustomExample = customExamples.find(ex => ex.value === scenario);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="scenario-examples" className="block text-sm font-medium mb-2 text-gray-400">
          Or start with an example:
        </label>
        <div className="flex items-center gap-2">
            <select
            id="scenario-examples"
            value={isExampleSelected ? scenario : ""}
            onChange={handleExampleChange}
            disabled={isLoading}
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            >
                <option value="">Select an example...</option>
                <optgroup label="Default Examples">
                    {defaultScenarioExamples.map((ex, index) => (
                        <option key={`default-${index}`} value={ex.value}>{ex.label}</option>
                    ))}
                </optgroup>
                {customExamples.length > 0 && (
                    <optgroup label="Custom Examples">
                        {customExamples.map((ex, index) => (
                        <option key={`custom-${index}`} value={ex.value}>{ex.label}</option>
                        ))}
                    </optgroup>
                )}
            </select>
            {selectedCustomExample && (
                <button 
                    onClick={() => handleDeleteExample(selectedCustomExample.value)} 
                    disabled={isLoading}
                    className="p-3 bg-red-800 hover:bg-red-700 rounded-md transition-colors"
                    aria-label="Delete custom example"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            )}
        </div>
      </div>

        <div className="relative">
            <label htmlFor="scenario" className="block text-lg font-semibold mb-2 text-gray-300">
                Enter Your Scenario
            </label>
            <textarea
                id="scenario"
                rows={8}
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-500"
                placeholder="e.g., Launch a marketing campaign for a new vegan snack brand..."
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                disabled={isLoading}
            />
             <button
                onClick={handleSaveExample}
                disabled={isLoading || !scenario.trim()}
                className="absolute bottom-3 right-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition duration-300 ease-in-out disabled:bg-gray-600/50 disabled:cursor-not-allowed disabled:text-gray-400"
                aria-label="Save current scenario as a custom example"
                title="Save current scenario as a custom example"
            >
                Save as Example
            </button>
        </div>
      
      <div className="mt-4">
        <label className="block text-lg font-semibold mb-3 text-gray-300 text-center">
          Number of Agents
        </label>
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setNumAgents(n)}
              disabled={isLoading}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-200 ease-in-out transform hover:scale-110
                ${numAgents === n
                  ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }
                disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none`}
              aria-pressed={numAgents === n}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onDesign}
        disabled={isLoading || !hasApiKey}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
        title={!hasApiKey ? "Please set your Gemini API key first" : ""}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Designing...</span>
          </>
        ) : (
          'Design Workflow'
        )}
      </button>
    </div>
  );
};

export default ScenarioInput;
