import React from 'react';
import Layout from '@/components/layout/Layout';

const ConceptsPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            MCP Architecture: Concepts Before Code
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Frame the problem first. Understand the trade-offs. Then write the code.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">A student once asked me:</span> "Should I refactor my FastAPI RAG system to use FastMCP?"
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              My answer? <span className="font-semibold">"It depends. Let's talk about what problem you're actually solving."</span>
            </p>
          </div>
          <p className="text-gray-600 leading-relaxed">
            This page isn't about code syntax. It's about <span className="font-semibold">architectural decisions</span> —
            when to use MCP tools vs resources, when FastAPI still wins, and how CQRS patterns help you think clearly about these choices.
          </p>
        </div>
      </section>

      {/* MCP Decision Framework */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            The MCP Decision Framework
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* MCP Tools */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">MCP Tools 🔧</h3>
              <p className="text-gray-600 mb-4 italic">Use when you need to <span className="font-semibold">change state</span></p>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Good For:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Running searches (query changes each time)</li>
                  <li>• Creating/updating records</li>
                  <li>• Executing actions with side effects</li>
                  <li>• Real-time operations that need parameters</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">Ask yourself:</p>
                <p className="text-sm text-gray-600">"Does this operation need unique input each time it runs?"</p>
                <p className="text-sm text-gray-600 mt-2">If <span className="font-semibold">yes</span> → Tool</p>
              </div>
            </div>

            {/* MCP Resources */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">MCP Resources 📚</h3>
              <p className="text-gray-600 mb-4 italic">Use when you need to <span className="font-semibold">read state</span></p>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Good For:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Static or semi-static data</li>
                  <li>• Configuration files</li>
                  <li>• Documentation that doesn't change often</li>
                  <li>• Cacheable content</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded">
                <p className="text-sm text-gray-700 font-semibold mb-2">Ask yourself:</p>
                <p className="text-sm text-gray-600">"Can this data be cached and reused?"</p>
                <p className="text-sm text-gray-600 mt-2">If <span className="font-semibold">yes</span> → Resource</p>
              </div>
            </div>
          </div>

          {/* CQRS Connection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">The CQRS Connection</h3>
            <p className="text-gray-600 mb-4">
              If you're familiar with <span className="font-semibold">CQRS (Command Query Responsibility Segregation)</span>, this framework should feel natural:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-800">Commands (write)</p>
                <p className="text-gray-600 text-sm">Change state, have side effects</p>
                <p className="text-blue-600 text-sm mt-1">→ MCP Tools</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-gray-800">Queries (read)</p>
                <p className="text-gray-600 text-sm">Read state, no side effects</p>
                <p className="text-green-600 text-sm mt-1">→ MCP Resources</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FastAPI vs FastMCP */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            FastAPI → FastMCP: The Migration Pattern
          </h2>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold">The question isn't "Should I migrate?"</span>
            </p>
            <p className="text-gray-700 leading-relaxed">
              The question is: <span className="font-semibold">"What integration point matters most to me?"</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* FastAPI Strengths */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">FastAPI Strengths 🚀</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><span className="font-semibold">Simple setup</span> — pip install, run server, done</span>
                </li>
                <li className="flex">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><span className="font-semibold">HTTP everywhere</span> — works with any client</span>
                </li>
                <li className="flex">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><span className="font-semibold">Mature ecosystem</span> — tons of middleware, auth, etc.</span>
                </li>
                <li className="flex">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><span className="font-semibold">Flexibility</span> — full control over implementation</span>
                </li>
              </ul>

              <div className="mt-4 bg-green-50 p-4 rounded">
                <p className="text-sm font-semibold text-gray-800">Choose FastAPI when:</p>
                <p className="text-sm text-gray-600 mt-1">
                  You need a general-purpose API that non-AI clients will also use, or when you need full control over auth, rate limiting, and middleware.
                </p>
              </div>
            </div>

            {/* FastMCP Strengths */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">FastMCP Strengths ⚡</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><span className="font-semibold">Native IDE integration</span> — Claude Desktop, Cursor, Zed</span>
                </li>
                <li className="flex">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><span className="font-semibold">Resource caching</span> — built into the protocol</span>
                </li>
                <li className="flex">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><span className="font-semibold">Standard discovery</span> — servers are auto-discoverable</span>
                </li>
                <li className="flex">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><span className="font-semibold">Context-aware</span> — designed for AI workflows</span>
                </li>
              </ul>

              <div className="mt-4 bg-blue-50 p-4 rounded">
                <p className="text-sm font-semibold text-gray-800">Choose FastMCP when:</p>
                <p className="text-sm text-gray-600 mt-1">
                  Your primary users are AI applications/IDEs, you want standardized tool/resource patterns, or you're building for the MCP ecosystem.
                </p>
              </div>
            </div>
          </div>

          {/* The Hybrid Approach */}
          <div className="mt-8 bg-purple-50 border-l-4 border-purple-500 p-6">
            <h4 className="font-semibold text-gray-800 mb-2">💡 The Hybrid Approach</h4>
            <p className="text-gray-700">
              You don't have to choose! Many production systems run <span className="font-semibold">both</span>:
            </p>
            <ul className="mt-3 text-gray-600 space-y-1 ml-4">
              <li>• FastAPI for your main application and web clients</li>
              <li>• FastMCP server for IDE/AI integration</li>
              <li>• Both calling the same business logic layer</li>
            </ul>
            <p className="text-gray-600 mt-3 text-sm italic">
              This is often the right answer for production systems that need broad compatibility.
            </p>
          </div>
        </div>
      </section>

      {/* Real-World Scenarios */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Real-World Decision Scenarios
          </h2>

          <div className="space-y-6">
            {/* Scenario 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Scenario 1: RAG System with Vector Search
              </h3>
              <p className="text-gray-600 mb-3">
                "I have a RAG system where users search documentation. Should the search endpoint be FastAPI or FastMCP?"
              </p>
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm font-semibold text-gray-800 mb-1">Recommendation: FastMCP Tool</p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Why:</span> Each search query is unique (dynamic input), and if you're using Claude/IDEs,
                  MCP gives native integration. The search results aren't cacheable since the query changes.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">But consider FastAPI if:</span> You need the API for a web frontend too, or you have complex authentication needs.
                </p>
              </div>
            </div>

            {/* Scenario 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Scenario 2: LangSmith Trace Analysis
              </h3>
              <p className="text-gray-600 mb-3">
                "I want to query my LangSmith traces from Claude Desktop. Tool or Resource?"
              </p>
              <div className="bg-green-50 p-4 rounded">
                <p className="text-sm font-semibold text-gray-800 mb-1">Recommendation: MCP Resource</p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Why:</span> Traces are historical data (read-only), they don't change frequently,
                  and caching can significantly improve performance. Resources are perfect for this.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">Use a Tool for:</span> Creating new traces, updating metadata, or running analytics that need parameters.
                </p>
              </div>
            </div>

            {/* Scenario 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Scenario 3: Multi-Agent Orchestration
              </h3>
              <p className="text-gray-600 mb-3">
                "I'm building a multi-agent system with LangGraph. How do I expose agent capabilities?"
              </p>
              <div className="bg-purple-50 p-4 rounded">
                <p className="text-sm font-semibold text-gray-800 mb-1">Recommendation: Hybrid Approach</p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">MCP Tools</span> for invoking agents (dynamic, stateful operations)
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">MCP Resources</span> for agent configurations, schemas, available tools
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">Consider FastAPI</span> if you need a REST API for monitoring dashboards or external integrations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples Link */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to See the Code?
          </h2>
          <p className="text-gray-600 mb-6">
            Now that you understand the concepts and trade-offs, check out working implementations:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/donbr/langsmith-mcp-server"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LangSmith MCP Server →
            </a>
            <a
              href="https://github.com/donbr/adv-rag"
              className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              FastAPI → FastMCP Examples →
            </a>
          </div>
        </div>
      </section>

      {/* Questions Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Still Have Questions?
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-4">
              These architectural decisions depend heavily on your specific use case. If you're a student in one of my bootcamp cohorts,
              bring your scenario to office hours. If not, feel free to reach out:
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://www.linkedin.com/in/donbranson/"
                className="text-blue-600 hover:text-blue-500 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="https://github.com/donbr"
                className="text-blue-600 hover:text-blue-500 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ConceptsPage;
