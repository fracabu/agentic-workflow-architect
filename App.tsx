import React, { useState, useCallback, useEffect } from 'react';
import { Workflow, GeminiModel } from './types';
import { designWorkflow } from './services/geminiService';
import ScenarioInput from './components/ScenarioInput';
import WorkflowDisplay from './components/WorkflowDisplay';
import Loader from './components/Loader';
import ApiKeyModal from './components/ApiKeyModal';

const App: React.FC = () => {
  const [scenario, setScenario] = useState<string>('');
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [numAgents, setNumAgents] = useState<number>(3);
  const [selectedModel, setSelectedModel] = useState<GeminiModel>('gemini-2.5-flash');
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'input' | 'result'>('input');

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
      const result = await designWorkflow(scenario, numAgents, apiKey, selectedModel);
      setWorkflow(result);
      setCurrentView('result');
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

  const handleBackToInput = () => {
    setCurrentView('input');
  };

  return (
    <>
      <ApiKeyModal 
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleSaveApiKey}
        currentApiKey={apiKey}
      />
      <div className="h-screen bg-gray-900 text-gray-100 flex flex-col overflow-hidden">
          <header className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  AWA
                </div>
              </div>
              <button 
                onClick={() => setIsApiKeyModalOpen(true)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
                aria-label="Manage API Key"
                title="Manage API Key"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-hidden">
            {/* Input View */}
            {currentView === 'input' && (
              <div className="h-full p-4 sm:p-6 lg:p-8 overflow-hidden">
                <div className="w-full h-full flex flex-col">
                  <div className="text-center mb-4 flex-shrink-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Agentic Workflow Architect</h1>
                    <p className="text-sm sm:text-base text-gray-400">Design multi-agent AI systems from a simple scenario.</p>
                  </div>
                  
                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 flex-1">
                    {/* Left Column - Scenario Input */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
                      <div className="mb-4 flex-shrink-0">
                        <label htmlFor="scenario-examples" className="block text-sm font-medium mb-2 text-gray-400">
                          Or start with an example:
                        </label>
                        <select
                          id="scenario-examples"
                          className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          value=""
                          onChange={(e) => setScenario(e.target.value)}
                          disabled={isLoading}
                        >
                          <option value="">Select an example...</option>
                          <option value="devo creare una pagina social su fb con contenuti ottimizzati la pagina è dedicata ad una piattaforma che fornisce strumenti digitali ad host italiani e gestori di case vacanze in forma non imprenditoriale e non">Social Media for Italian Vacation Rentals</option>
                          <option value="Launch a comprehensive marketing campaign for a new brand of eco-friendly, reusable coffee cups. The campaign should target millennials on social media, include influencer collaborations, and track key performance metrics.">Marketing for Eco-Friendly Coffee Cups</option>
                        </select>
                      </div>

                      <div className="flex-1 flex flex-col">
                        <label htmlFor="scenario" className="block text-lg font-semibold mb-2 text-gray-300">
                          Enter Your Scenario
                        </label>
                        <textarea
                          id="scenario"
                          className="flex-1 w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-500 resize-none"
                          placeholder="e.g., Launch a marketing campaign for a new vegan snack brand..."
                          value={scenario}
                          onChange={(e) => setScenario(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {/* Right Column - Settings */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
                      <div className="flex-1 flex flex-col justify-center space-y-8">
                        <div>
                          <label className="block text-lg font-semibold mb-4 text-gray-300 text-center">
                            Number of Agents
                          </label>
                          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <button
                                key={n}
                                onClick={() => setNumAgents(n)}
                                disabled={isLoading}
                                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-200 ease-in-out transform hover:scale-110
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

                        <div>
                          <label htmlFor="model-select" className="block text-lg font-semibold mb-4 text-gray-300 text-center">
                            Gemini Model
                          </label>
                          <div className="flex items-center justify-center">
                            <select
                              id="model-select"
                              value={selectedModel}
                              onChange={(e) => setSelectedModel(e.target.value as GeminiModel)}
                              disabled={isLoading}
                              className="bg-gray-900 border border-gray-700 rounded-md p-4 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-base"
                            >
                              <option value="gemini-2.5-flash">Gemini 2.5 Flash (Veloce)</option>
                              <option value="gemini-2.5-pro">Gemini 2.5 Pro (Qualità Superiore)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Design Button */}
                  <div className="mb-6 flex justify-center">
                    <button
                      onClick={handleDesignWorkflow}
                      disabled={isLoading || !apiKey}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                      title={!apiKey ? "Please set your Gemini API key first" : ""}
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

                  {error && (
                    <div className="mb-6 bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center" role="alert">
                      <strong className="font-bold">Error: </strong>
                      <span className="block sm:inline">{error}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Result View */}
            {currentView === 'result' && (
              <div className="h-full flex flex-col">
                {/* Result Header */}
                <div className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0">
                  <div className="w-full flex items-center justify-between">
                    <button
                      onClick={handleBackToInput}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      <span>Back to Input</span>
                    </button>
                    <h2 className="text-xl font-semibold text-white">Workflow Results</h2>
                    <div className="w-20"></div>
                  </div>
                </div>

                {/* Result Content */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  {workflow && (
                    <WorkflowDisplay workflow={workflow} onWorkflowChange={handleWorkflowChange} />
                  )}
                </div>
              </div>
            )}

            {/* Loading Overlay */}
            {isLoading && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50">
                <Loader />
              </div>
            )}
          </main>
          
          <footer className="bg-gray-800 border-t border-gray-700 px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0">
            <div className="w-full text-center">
              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-500">
                <span>Progetto creato da <span className="text-blue-400">Gemini</span> e <span className="text-blue-400">Claude</span> utilizzando le risorse di Mark Kashef</span>
                <a 
                  href="https://www.promptadvisers.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  title="Prompt Advisers Website"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/watch?v=qzeRWzKte3I" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  title="YouTube Video"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </footer>
      </div>
    </>
  );
};

export default App;
