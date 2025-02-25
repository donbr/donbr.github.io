import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import _ from 'lodash';

// Define proper types for patterns
interface PatternDefinitions {
  temporal: {
    absolute: RegExp;
    relative: RegExp;
    date: RegExp;
  };
  location: {
    city: RegExp;
    address: RegExp;
  };
  entity: {
    person: RegExp;
    organization: RegExp;
    hashtag: RegExp;
  };
}

// Relation type (currently not used but properly typed)
interface Relation {
  type: string;
  sourceId: string;
  targetId: string;
}

// Simplified TypeScript definitions
interface EventResult {
  text: string;
  type: string;
  time: Array<{ type: string; value: string }>;
  place: Array<{ type: string; value: string }>;
  entities: Array<{ type: string; value: string; position: number }>;
  relations: Relation[]; // Replaced any[] with proper type
  confidence: number | string;
  severity: number;
  summary?: string;
}

// Migrated service code
const EventType = {
  TYPES: {
    INCIDENT: 'Incident',
    GATHERING: 'Gathering',
    ANNOUNCEMENT: 'Announcement',
    CRISIS: 'Crisis'
  },
  SEVERITY: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4
  }
};

class PatternRegistry {
  patterns: PatternDefinitions; // Properly typed
  keywords: Record<string, string[]>;

  constructor() {
    this.patterns = {
      temporal: {
        absolute: /\d{1,2}:\d{2}/,
        relative: /(today|yesterday|tomorrow|tonight)/i,
        date: /\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/
      },
      location: {
        city: /in ([A-Z][a-z]+(?: [A-Z][a-z]+)*)/,
        address: /at ([0-9]+(?:[A-Za-z]*)? [A-Z][a-z]+ (?:St|Ave|Rd|Blvd|Lane|Drive|Circle|Square))/i
      },
      entity: {
        person: /@([A-Za-z0-9_]+)/,
        organization: /([A-Z][a-z]+ (?:Inc|Corp|LLC|Ltd|Organization|Association))/,
        hashtag: /#([A-Za-z0-9_]+)/
      }
    };

    this.keywords = {
      [EventType.TYPES.INCIDENT]: ['happened', 'occurred', 'reported'],
      [EventType.TYPES.GATHERING]: ['protest', 'meeting', 'assembly'],
      [EventType.TYPES.ANNOUNCEMENT]: ['announced', 'declared', 'stated'],
      [EventType.TYPES.CRISIS]: ['emergency', 'crisis', 'disaster']
    };
  }
}

class EventAnalyzerService {
  registry: PatternRegistry;

  constructor() {
    this.registry = new PatternRegistry();
  }

  async analyzeTweet(tweetText: string): Promise<EventResult> {
    const event: EventResult = {
      text: tweetText,
      type: this.classifyEventType(tweetText),
      time: this.extractTime(tweetText),
      place: this.extractLocations(tweetText),
      entities: this.extractEntities(tweetText),
      relations: [], // Empty array of relations
      confidence: 0,
      severity: EventType.SEVERITY.MEDIUM
    };

    // Calculate and assign confidence score
    event.confidence = this.calculateConfidence(event);
    return event;
  }

  classifyEventType(text: string): string {
    const matches: Record<string, number> = {};
    for (const [type, keywords] of Object.entries(this.registry.keywords)) {
      matches[type] = keywords.filter(keyword => 
        text.toLowerCase().includes(keyword.toLowerCase())).length;
    }
    return _.maxBy(Object.entries(matches), '[1]')?.[0] || EventType.TYPES.INCIDENT;
  }

  extractTime(text: string): Array<{ type: string; value: string }> {
    const results = [];
    const patterns = this.registry.patterns.temporal;

    for (const [type, pattern] of Object.entries(patterns)) {
      const match = text.match(pattern);
      if (match) {
        results.push({ type, value: match[0] });
      }
    }
    return results;
  }

  extractLocations(text: string): Array<{ type: string; value: string }> {
    const results = [];
    const patterns = this.registry.patterns.location;

    for (const [type, pattern] of Object.entries(patterns)) {
      const match = text.match(pattern);
      if (match) {
        results.push({ type, value: match[1] });
      }
    }
    return results;
  }

  extractEntities(text: string): Array<{ type: string; value: string; position: number }> {
    const results = [];
    const patterns = this.registry.patterns.entity;

    for (const [type, pattern] of Object.entries(patterns)) {
      // Safely cast RegExp pattern
      const matches = Array.from(text.matchAll(new RegExp(pattern.source, 'g')));
      for (const match of matches) {
        results.push({
          type,
          value: match[1],
          position: match.index || 0
        });
      }
    }
    return results;
  }

  calculateConfidence(event: EventResult): number {
    let score = 0;
    if (event.time.length) score += 0.3;
    if (event.place.length) score += 0.3;
    if (event.entities.length) score += 0.2;
    return Math.min(score + 0.2, 1);
  }
}

function generateSummary(analysis: EventResult): string {
  const parts = [];
  
  if (analysis.type) {
    parts.push(`Type: ${analysis.type}`);
  }
  
  if (analysis.time.length > 0) {
    const times = analysis.time.map(t => t.value).join(', ');
    parts.push(`Time: ${times}`);
  }
  
  if (analysis.place.length > 0) {
    const places = analysis.place.map(p => p.value).join(', ');
    parts.push(`Location: ${places}`);
  }
  
  if (analysis.entities.length > 0) {
    const entities = analysis.entities.map(e => `${e.type}: ${e.value}`).join(', ');
    parts.push(`Entities: ${entities}`);
  }
  
  return parts.join(' | ');
}

// Main Component
const EventAnalyzer: React.FC = () => {
  const [inputText, setInputText] = useState<string>(
    'BREAKING: Major protest gathering @downtown_group in New York City at 14:30 today. #CivilRights Organization reports over 1000 participants at Times Square.'
  );
  const [analysisResult, setAnalysisResult] = useState<EventResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const analyzer = new EventAnalyzerService();
      const result = await analyzer.analyzeTweet(inputText);
      
      // Add summary and format confidence
      const formattedResult = {
        ...result,
        confidence: `${(typeof result.confidence === 'number' ? result.confidence * 100 : 0).toFixed(1)}%`,
        summary: generateSummary(result)
      };
      
      setAnalysisResult(formattedResult);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Trigger analysis on first render
  useEffect(() => {
    handleAnalyze();
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Event Analysis System</h1>
        <p className="text-gray-600 mb-8">
          An interactive system for analyzing social media events using pattern matching and ontology support.
          This demo showcases event classification, temporal analysis, and entity extraction capabilities.
        </p>

        {/* Demo Interface */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label htmlFor="tweetInput" className="block text-gray-700 font-medium mb-2">
              Enter text to analyze:
            </label>
            <textarea
              id="tweetInput"
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          <button
            onClick={handleAnalyze}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition-colors"
          >
            Analyze Text
          </button>
          
          {isAnalyzing && (
            <div className="flex justify-center my-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {/* Results Section */}
          {analysisResult && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Analysis Results:</h3>
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm font-mono text-gray-800">
                {JSON.stringify(analysisResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        {/* Technical Details */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Technical Details</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              This system implements several key features:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Event classification using keyword analysis</li>
              <li>Temporal expression extraction (absolute and relative times)</li>
              <li>Named entity recognition for organizations and people</li>
              <li>Location extraction with support for cities and specific addresses</li>
              <li>Confidence scoring based on extracted information</li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/assets/projects" className="text-blue-600 hover:text-blue-800">
            ← Back to Projects
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default EventAnalyzer;