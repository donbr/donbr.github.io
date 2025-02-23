import React, { useState } from 'react';
import { EventAnalyzerService } from '../../services/eventAnalyzer';
import type { 
  IEventAnalyzer, 
  EventAnalysis, 
  FormattedAnalysis 
} from '../../types/event-analyzer';

const eventAnalyzer: IEventAnalyzer = new EventAnalyzerService();

const EventAnalyzer: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<FormattedAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = (analysis: EventAnalysis): string => {
    const parts: string[] = [];
    
    if (analysis.type) {
      parts.push(`Type: ${analysis.type}`);
    }
    
    if (analysis.time?.length) {
      const times = analysis.time.map(t => 
        `${t.value}${t.type === 'relative' ? ' (relative)' : ''}`
      ).join(', ');
      parts.push(`Time: ${times}`);
    }
    
    if (analysis.place?.length) {
      const places = analysis.place.map(p => 
        `${p.value}${p.coordinates ? ` (${p.coordinates.join(', ')})` : ''}`
      ).join(', ');
      parts.push(`Location: ${places}`);
    }
    
    if (analysis.entities?.length) {
      const entities = analysis.entities
        .filter(e => e.confidence > 0.5)
        .map(e => `${e.type}: ${e.value}`)
        .join(', ');
      parts.push(`Entities: ${entities}`);
    }
    
    return parts.join(' | ');
  };

  const handleAnalyzeClick = async (): Promise<void> => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const analysis = await eventAnalyzer.analyze(input); // Now matches interface
      const formattedResult: FormattedAnalysis = {
        ...analysis,
        confidence: `${(analysis.confidence * 100).toFixed(1)}%`,
        summary: generateSummary(analysis)
      };
      setResult(formattedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInput(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <label 
          htmlFor="eventInput" 
          className="block text-gray-700 font-medium mb-2"
        >
          Enter event text to analyze:
        </label>
        <textarea
          id="eventInput"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter the event description here..."
          disabled={loading}
        />
      </div>

      <button
        className={`
          px-6 py-2 rounded-md transition-colors
          ${loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-500 text-white'}
        `}
        onClick={handleAnalyzeClick}
        disabled={loading || !input.trim()}
      >
        {loading ? 'Analyzing...' : 'Analyze Text'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Analysis Results
          </h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="mb-4">
              <span className="font-medium">Summary:</span> {result.summary}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="font-medium">Confidence:</span> {result.confidence}
              </div>
              <div>
                <span className="font-medium">Severity:</span> {result.severity}/10
              </div>
            </div>
            <pre className="mt-4 p-4 bg-gray-100 rounded-md overflow-x-auto text-sm font-mono">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventAnalyzer;
