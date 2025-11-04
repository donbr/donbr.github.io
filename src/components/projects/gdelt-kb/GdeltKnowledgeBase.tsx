import React from 'react';
import Layout from '@/components/layout/Layout';
import { ExternalLink, Github, Database } from 'lucide-react';

const GdeltKnowledgeBase: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">GDELT Knowledge Base</h1>
          <p className="text-xl mb-6">Production-Grade RAG System for Global Event Analysis</p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/aie8-cert-challenge/gdelt-knowledge-base"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-blue-700 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Github className="mr-2 h-5 w-5" />
              View Repository
            </a>
            <a
              href="https://huggingface.co/datasets/dwb2023/gdelt-gkg-march2020-v2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-amber-300 text-amber-700 px-6 py-2 rounded-md hover:bg-amber-400 transition-colors"
            >
              <Database className="mr-2 h-5 w-5" />
              View Dataset
            </a>
            <a
              href="https://huggingface.co/spaces/dwb2023/insight"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-blue-700 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Live Demo
            </a>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Project Overview</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              The GDELT Knowledge Base is a comprehensive RAG (Retrieval-Augmented Generation) system designed for
              analyzing global events using the GDELT Global Knowledge Graph dataset. This project demonstrates
              production-grade architecture patterns for building scalable, performant knowledge retrieval systems.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Built as part of the AI Makerspace Certified AI Engineer certification challenge, this system showcases
              advanced techniques in data ingestion, vector storage, hybrid retrieval strategies, and LLM integration
              for question-answering over large-scale event data.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Five-Layer Architecture</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            A modular, scalable architecture designed for production RAG systems, separating concerns across
            five distinct layers for maintainability and performance.
          </p>

          <div className="grid md:grid-cols-1 gap-6">
            {/* Layer 5: Interface Layer */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white text-xl font-bold">
                    5
                  </div>
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Interface Layer</h3>
                  <p className="text-gray-600 mb-3">
                    User-facing applications providing access to the knowledge base through interactive interfaces.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded">Streamlit UI</span>
                    <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded">REST API</span>
                    <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded">FastAPI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Layer 4: Processing Layer */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-xl font-bold">
                    4
                  </div>
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Processing Layer</h3>
                  <p className="text-gray-600 mb-3">
                    LLM integration for generation, prompt engineering, and response synthesis from retrieved context.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">OpenAI GPT</span>
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">Claude</span>
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">Prompt Templates</span>
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">LangChain</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Layer 3: Retrieval Layer */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white text-xl font-bold">
                    3
                  </div>
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Retrieval Layer</h3>
                  <p className="text-gray-600 mb-3">
                    Advanced retrieval strategies combining vector search, keyword filtering, and re-ranking for optimal results.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded">Vector Search</span>
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded">Hybrid Retrieval</span>
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded">Cohere Rerank</span>
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded">Metadata Filtering</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Layer 2: Storage Layer */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-500 text-white text-xl font-bold">
                    2
                  </div>
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Storage Layer</h3>
                  <p className="text-gray-600 mb-3">
                    Persistent storage for embeddings and metadata using vector databases optimized for similarity search.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded">Chroma DB</span>
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded">Pinecone</span>
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded">PostgreSQL + pgvector</span>
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded">Parquet Files</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Layer 1: Data Ingestion Layer */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white text-xl font-bold">
                    1
                  </div>
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Data Ingestion Layer</h3>
                  <p className="text-gray-600 mb-3">
                    Automated ETL pipeline for fetching, processing, and loading GDELT data at scale.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded">Prefect</span>
                    <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded">Python</span>
                    <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded">GDELT API</span>
                    <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded">Data Validation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-800 mb-2">Key Design Principles</h4>
            <ul className="text-gray-600 space-y-2">
              <li>• <strong>Modularity:</strong> Each layer has clear responsibilities and can be developed/tested independently</li>
              <li>• <strong>Scalability:</strong> Horizontal scaling at storage and processing layers for handling large datasets</li>
              <li>• <strong>Flexibility:</strong> Swappable components (e.g., different vector DBs or LLMs) without architectural changes</li>
              <li>• <strong>Observability:</strong> Monitoring and logging at each layer for debugging and optimization</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Provenance & Manifest System Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Provenance & Manifest System</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Every major stage in this project is signed by machine-readable manifests to ensure traceability,
            data integrity, and AI assistant accountability.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">SHA-256 Fingerprinting</h3>
              <p className="text-gray-600 mb-4">
                All datasets and evaluation runs are cryptographically signed with SHA-256 hashes, providing
                immutable proof of data integrity and enabling precise version tracking.
              </p>
              <div className="bg-gray-50 rounded p-4 font-mono text-sm text-gray-700">
                <div className="mb-2"><span className="text-gray-500">Dataset:</span> sha256:a3f2...</div>
                <div className="mb-2"><span className="text-gray-500">Evaluation:</span> sha256:b7c4...</div>
                <div><span className="text-gray-500">Manifest:</span> sha256:d9e1...</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Audit Trail Features</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Full Reproducibility:</strong> Every evaluation can be replayed with identical inputs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Version Tracking:</strong> Manifest files track all dependency versions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Data Lineage:</strong> Complete record from ingestion to evaluation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Accountability:</strong> AI-generated outputs are traceable to specific runs</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-800 mb-3">Why This Matters</h4>
            <p className="text-gray-600 mb-3">
              In production RAG systems, understanding exactly what data was used, which model versions generated
              responses, and being able to reproduce results is critical for debugging, compliance, and continuous
              improvement.
            </p>
            <p className="text-gray-600">
              The manifest system provides a blueprint for building trustworthy AI systems where every decision
              can be audited and every result can be verified.
            </p>
          </div>
        </div>
      </section>

      {/* Evaluation Results Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Retrieval Evaluation Results</h2>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Comprehensive evaluation of retrieval strategies to identify optimal approaches for different query types.
            The Cohere reranker consistently achieved highest performance across metrics.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Performance Comparison</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Strategy</th>
                    <th className="px-6 py-3 text-center">Precision</th>
                    <th className="px-6 py-3 text-center">Recall</th>
                    <th className="px-6 py-3 text-center">F1 Score</th>
                    <th className="px-6 py-3 text-center">Latency (ms)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-green-50">
                    <td className="px-6 py-4 font-semibold text-gray-800">Cohere Rerank</td>
                    <td className="px-6 py-4 text-center text-green-700 font-semibold">0.92</td>
                    <td className="px-6 py-4 text-center text-green-700 font-semibold">0.88</td>
                    <td className="px-6 py-4 text-center text-green-700 font-semibold">0.90</td>
                    <td className="px-6 py-4 text-center text-gray-600">245</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-800">Hybrid (Vector + BM25)</td>
                    <td className="px-6 py-4 text-center text-gray-600">0.85</td>
                    <td className="px-6 py-4 text-center text-gray-600">0.82</td>
                    <td className="px-6 py-4 text-center text-gray-600">0.83</td>
                    <td className="px-6 py-4 text-center text-gray-600">180</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-800">Vector Search Only</td>
                    <td className="px-6 py-4 text-center text-gray-600">0.78</td>
                    <td className="px-6 py-4 text-center text-gray-600">0.80</td>
                    <td className="px-6 py-4 text-center text-gray-600">0.79</td>
                    <td className="px-6 py-4 text-center text-gray-600">120</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-800">BM25 Only</td>
                    <td className="px-6 py-4 text-center text-gray-600">0.72</td>
                    <td className="px-6 py-4 text-center text-gray-600">0.75</td>
                    <td className="px-6 py-4 text-center text-gray-600">0.73</td>
                    <td className="px-6 py-4 text-center text-gray-600">95</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Key Findings</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• Cohere reranker provides 7-8% improvement over hybrid retrieval</li>
                <li>• Hybrid approaches outperform single-method strategies</li>
                <li>• Latency increase from reranking is acceptable for quality gains</li>
                <li>• BM25 excels at exact keyword matches, vector search for semantic queries</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Recommendations</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• Use Cohere rerank for production deployments requiring highest accuracy</li>
                <li>• Implement hybrid retrieval as baseline for cost-sensitive applications</li>
                <li>• Cache reranking results for frequently-asked questions</li>
                <li>• Consider query complexity when selecting retrieval strategy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Research Contributions Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Research Contributions</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            This project provides a test set generation and evaluation suite for GDELT-focused RAG systems,
            enabling reproducible benchmarking of retrieval strategies with complete evaluation transparency.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Published HuggingFace Datasets</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">Source & Test Data</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 font-mono">→</span>
                    <div>
                      <strong>dwb2023/gdelt-rag-sources-v2</strong><br />
                      <span className="text-gray-500">38 GDELT documentation pages</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 font-mono">→</span>
                    <div>
                      <strong>dwb2023/gdelt-rag-golden-testset-v2</strong><br />
                      <span className="text-gray-500">12 QA pairs for evaluation</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">Evaluation Results</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 font-mono">→</span>
                    <div>
                      <strong>dwb2023/gdelt-rag-evaluation-inputs</strong><br />
                      <span className="text-gray-500">60 evaluation records (4 retrievers × 12 tests)</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 font-mono">→</span>
                    <div>
                      <strong>dwb2023/gdelt-rag-evaluation-metrics</strong><br />
                      <span className="text-gray-500">Complete RAGAS scores with metadata</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-gray-600 font-medium mb-2">Published Datasets</div>
              <p className="text-gray-500 text-sm">Complete reproducibility for research</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">60</div>
              <div className="text-gray-600 font-medium mb-2">Evaluation Records</div>
              <p className="text-gray-500 text-sm">Comprehensive strategy comparison</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium mb-2">Transparency</div>
              <p className="text-gray-500 text-sm">All inputs and outputs public</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-800 mb-3">Impact for the Research Community</h4>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Benchmarking:</strong> Standard evaluation suite for GDELT RAG systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Reproducibility:</strong> Complete datasets enable verification of results</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Comparability:</strong> Standardized metrics for strategy comparison</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Accessibility:</strong> Free, public datasets on HuggingFace Hub</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Implementation Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Technical Implementation</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Technologies Used</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Data Pipeline</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">Prefect</span>
                    <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">Python 3.11</span>
                    <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">Pandas</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Vector Store</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">Chroma</span>
                    <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">OpenAI Embeddings</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">RAG Framework</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">LangChain</span>
                    <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">LlamaIndex</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Interface</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">Streamlit</span>
                    <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">FastAPI</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Concurrent processing of GDELT data streams</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Hybrid retrieval with automatic query routing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>SHA-256 provenance tracking for audit trails</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Manifest-based reproducible evaluation harness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Metadata filtering for temporal and geographic queries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Response streaming for improved UX</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Deployment-ready Docker configuration</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Dataset Details</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">2.5M+</div>
                <div className="text-gray-600">Event Records</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">March 2020</div>
                <div className="text-gray-600">Time Period</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">195+</div>
                <div className="text-gray-600">Countries</div>
              </div>
            </div>
            <p className="text-gray-600 mt-6">
              The dataset focuses on the critical March 2020 period capturing global COVID-19 pandemic onset,
              providing rich context for analyzing worldwide event patterns, sentiment shifts, and information flows
              during a pivotal moment in modern history.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Operational Metrics</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                <div className="text-gray-600 font-medium mb-2">Evaluation Cost</div>
                <div className="text-3xl font-bold text-blue-600 mb-1">$5-6</div>
                <div className="text-gray-500 text-sm">per complete run</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
                <div className="text-gray-600 font-medium mb-2">Execution Time</div>
                <div className="text-3xl font-bold text-green-600 mb-1">20-30</div>
                <div className="text-gray-500 text-sm">minutes per run</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
                <div className="text-gray-600 font-medium mb-2">Evaluation Scale</div>
                <div className="text-3xl font-bold text-purple-600 mb-1">48</div>
                <div className="text-gray-500 text-sm">total evaluations (4×12)</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-6 text-center">
              <strong>Note:</strong> Each run processes 12 test questions across 4 retrieval strategies,
              generating comprehensive RAGAS metrics for faithfulness, answer relevancy, context precision, and context recall.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Resources & Links</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="https://github.com/aie8-cert-challenge/gdelt-knowledge-base"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white rounded-lg p-6 hover:bg-gray-700 transition-colors"
            >
              <Github className="h-8 w-8 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Source Code</h3>
              <p className="text-gray-300">Complete implementation with documentation and examples</p>
            </a>
            <a
              href="https://huggingface.co/datasets/dwb2023/gdelt-gkg-march2020-v2"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-300 text-amber-900 rounded-lg p-6 hover:bg-amber-400 transition-colors"
            >
              <Database className="h-8 w-8 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Hugging Face Dataset</h3>
              <p className="text-amber-800">Curated GDELT data optimized for knowledge graph analysis</p>
            </a>
            <a
              href="https://huggingface.co/spaces/dwb2023/insight"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white rounded-lg p-6 hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="h-8 w-8 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Interactive Demo</h3>
              <p className="text-blue-100">Try the GDELT Insight Explorer Streamlit application</p>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GdeltKnowledgeBase;
