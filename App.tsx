import React, { useState, useCallback, useEffect } from 'react';
import { Workflow } from './types';
import { designWorkflow } from './services/geminiService';
import ScenarioInput from './components/ScenarioInput';
import WorkflowDisplay from './components/WorkflowDisplay';
import Loader from './components/Loader';
import ApiKeyModal from './components/ApiKeyModal';

const App: React.FC = () => {
  const [scenario, setScenario] = useState<string>('devo creare una pagina social su fb con contenuti ottimizzati la pagina è dedicata ad una piattaforma che fornisce strumenti digitali ad host italiani e gestori di case vacanze in forma non imprenditoriale e non');
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [numAgents, setNumAgents] = useState<number>(3);
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setIsApiKeyModalOpen(true);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    if (key.trim()) {
      setApiKey(key);
      localStorage.setItem('gemini-api-key', key);
      setIsApiKeyModalOpen(false);
      setError(null); // Clear previous errors
    }
  };

  const handleDesignWorkflow = useCallback(async () => {
    if (!apiKey) {
      setError('Please set your Gemini API key before designing a workflow.');
      setIsApiKeyModalOpen(true);
      return;
    }
    if (!scenario.trim()) {
      setError('Please enter a scenario.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setWorkflow(null);
    try {
      const result = await designWorkflow(scenario, numAgents, apiKey);
      setWorkflow(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? `Failed to design workflow: ${err.message}` : 'An unknown error occurred.';
      setError(errorMessage);
      if (errorMessage.includes("API key is not valid")) {
        setIsApiKeyModalOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, [scenario, numAgents, apiKey]);

  const handleWorkflowChange = useCallback((updatedWorkflow: Workflow) => {
    setWorkflow(updatedWorkflow);
  }, []);

  return (
    <>
      <ApiKeyModal 
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleSaveApiKey}
        currentApiKey={apiKey}
      />
      <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <div className="flex justify-center items-center mb-2">
              <h1 className="text-4xl font-bold text-white">Agentic Workflow Architect</h1>
              <button 
                onClick={() => setIsApiKeyModalOpen(true)}
                className="ml-4 p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
                aria-label="Manage API Key"
                title="Manage API Key"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 0110.257-4.257M15 7A2 2 0 0013 5M15 7a2 2 0 012-2M15 7a2 2 0 002 2m-7 6a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
            <p className="text-lg text-gray-400">Design multi-agent AI systems from a simple scenario.</p>
          </header>

          <main>
            <ScenarioInput 
              scenario={scenario} 
              setScenario={setScenario} 
              onDesign={handleDesignWorkflow}
              isLoading={isLoading}
              numAgents={numAgents}
              setNumAgents={setNumAgents}
              hasApiKey={!!apiKey}
            />

            {error && (
              <div className="mt-6 bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {isLoading && <Loader />}
            
            {workflow && !isLoading && (
              <WorkflowDisplay workflow={workflow} onWorkflowChange={handleWorkflowChange} />
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
