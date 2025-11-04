import React from 'react';
import Layout from '@/components/layout/Layout';
import { ExternalLink, Github, BookOpen } from 'lucide-react';

const AdvancedRetrieval: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <span className="inline-block bg-white bg-opacity-20 text-white text-sm px-4 py-1 rounded-full font-semibold">
              AI Makerspace Bootcamp - Session 10
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Advanced Retrieval Strategies for RAG</h1>
          <p className="text-xl mb-6">
            Comprehensive exploration of modern retrieval techniques for production RAG systems
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/don-aie-cohort8/aie8-s09-adv-retrieval"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-purple-700 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Github className="mr-2 h-5 w-5" />
              View Repository
            </a>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Course Overview</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              This session, taught as part of the AI Makerspace Certified AI Engineer bootcamp, provides an in-depth
              exploration of advanced retrieval strategies essential for building production-grade RAG systems. Students
              learn to move beyond basic vector search to implement sophisticated hybrid approaches that significantly
              improve retrieval quality.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              The curriculum emphasizes hands-on implementation, comparative analysis, and understanding trade-offs
              between different retrieval methods. Through practical exercises, students gain experience with vector
              search, sparse retrieval, hybrid strategies, and re-ranking techniques.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">4 hours</div>
              <div className="text-gray-600">Session Duration</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">20+</div>
              <div className="text-gray-600">Students Guided</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">6</div>
              <div className="text-gray-600">Retrieval Strategies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Retrieval Taxonomy Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Retrieval Strategies Taxonomy</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            A comprehensive framework for understanding and selecting retrieval approaches based on use case requirements.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Dense/Vector Retrieval */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
                  V
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Dense/Vector Retrieval</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Semantic search using dense embeddings to capture meaning beyond keywords.
              </p>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Techniques:</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Single-vector embeddings (OpenAI, Cohere)</li>
                  <li>• Multi-vector representations</li>
                  <li>• Approximate nearest neighbor (ANN) search</li>
                  <li>• Cosine similarity ranking</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-700 text-sm mb-1">Pros:</h5>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Semantic understanding</li>
                    <li>• Handles synonyms</li>
                    <li>• Cross-lingual capability</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-red-700 text-sm mb-1">Cons:</h5>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Computationally expensive</li>
                    <li>• May miss exact matches</li>
                    <li>• Embedding quality critical</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sparse/Keyword Retrieval */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
                  K
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Sparse/Keyword Retrieval</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Traditional information retrieval using term frequency and keyword matching.
              </p>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Techniques:</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• BM25 (Best Match 25)</li>
                  <li>• TF-IDF (Term Frequency-Inverse Document Frequency)</li>
                  <li>• Boolean keyword search</li>
                  <li>• Inverted index structures</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-700 text-sm mb-1">Pros:</h5>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Fast and efficient</li>
                    <li>• Exact keyword matching</li>
                    <li>• Interpretable results</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-red-700 text-sm mb-1">Cons:</h5>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• No semantic understanding</li>
                    <li>• Vocabulary mismatch issues</li>
                    <li>• Language-specific</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Hybrid Retrieval */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
                  H
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Hybrid Retrieval</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Combining dense and sparse methods for best-of-both-worlds performance.
              </p>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Techniques:</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Weighted score combination</li>
                  <li>• Reciprocal Rank Fusion (RRF)</li>
                  <li>• Linear combination of rankings</li>
                  <li>• Adaptive weighting strategies</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-700 text-sm mb-1">Pros:</h5>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Best of both approaches</li>
                    <li>• Robust across queries</li>
                    <li>• Improved recall</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-red-700 text-sm mb-1">Cons:</h5>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• More complex implementation</li>
                    <li>• Tuning required</li>
                    <li>• Higher latency</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Re-ranking */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
                  R
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Re-ranking</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Two-stage approach: fast initial retrieval followed by expensive but accurate re-ranking.
              </p>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Techniques:</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Cross-encoder models</li>
                  <li>• Cohere Rerank API</li>
                  <li>• LLM-based re-ranking</li>
                  <li>• Query-document interaction models</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-700 text-sm mb-1">Pros:</h5>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Highest accuracy</li>
                    <li>• Query-doc interactions</li>
                    <li>• Significant quality boost</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-red-700 text-sm mb-1">Cons:</h5>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Increased latency</li>
                    <li>• API costs (if external)</li>
                    <li>• Complexity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-800 mb-3">Selecting the Right Strategy</h4>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <div>
                <p className="font-medium mb-2">Use Vector Search when:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Queries are semantic or conceptual</li>
                  <li>• Cross-lingual retrieval needed</li>
                  <li>• Handling synonyms and paraphrasing</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Use Hybrid when:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Query types vary significantly</li>
                  <li>• Both precision and recall matter</li>
                  <li>• Production systems requiring robustness</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Use Keyword Search when:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Exact term matching required</li>
                  <li>• Low-latency requirement</li>
                  <li>• Resource constraints</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Use Re-ranking when:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Accuracy is paramount</li>
                  <li>• Top-k results need refinement</li>
                  <li>• Budget allows for API costs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cohere Reranker Evaluation */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Cohere Reranker Deep Dive</h2>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            The Cohere Rerank API provides state-of-the-art re-ranking capabilities, significantly improving
            retrieval quality with minimal integration effort.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Performance Impact</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">+15%</div>
                <div className="text-gray-600">Precision Improvement</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">+12%</div>
                <div className="text-gray-600">Recall Improvement</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">~200ms</div>
                <div className="text-gray-600">Added Latency</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold text-gray-800 mb-4">How It Works</h4>
              <ol className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 text-sm">1</span>
                  <span>Initial retrieval returns top-k candidates (e.g., k=100)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 text-sm">2</span>
                  <span>Candidates sent to Cohere API with query</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 text-sm">3</span>
                  <span>Cross-encoder model scores query-document pairs</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 text-sm">4</span>
                  <span>Results re-ordered by relevance scores</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 text-sm">5</span>
                  <span>Return top-n re-ranked results (e.g., n=10)</span>
                </li>
              </ol>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Best Practices</h4>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Over-retrieve initially:</strong> Get 50-100 candidates, rerank to 10</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Cache results:</strong> Store reranked results for common queries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Async processing:</strong> Use non-blocking calls to maintain UX</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Monitor costs:</strong> Track API usage and optimize k/n values</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>A/B test:</strong> Compare with baseline to validate improvement</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <h4 className="font-semibold text-gray-800 mb-2">Implementation Tip</h4>
            <p className="text-gray-600">
              Start with a simple vector search baseline, then add Cohere reranking. Measure the quality improvement
              against the added latency and cost. In most production RAG systems, the 15-20% quality boost justifies
              the ~200ms latency increase for user-facing applications.
            </p>
          </div>
        </div>
      </section>

      {/* Teaching Insights */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Teaching Insights</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Student Challenges</h3>
              <ul className="space-y-4">
                <li className="border-l-4 border-red-500 pl-4">
                  <p className="font-medium text-gray-800 mb-1">Understanding evaluation metrics</p>
                  <p className="text-gray-600 text-sm">Students initially confused by precision vs. recall trade-offs</p>
                </li>
                <li className="border-l-4 border-red-500 pl-4">
                  <p className="font-medium text-gray-800 mb-1">Hybrid retrieval implementation</p>
                  <p className="text-gray-600 text-sm">Difficulty combining vector and keyword scores correctly</p>
                </li>
                <li className="border-l-4 border-red-500 pl-4">
                  <p className="font-medium text-gray-800 mb-1">Cost vs. quality trade-offs</p>
                  <p className="text-gray-600 text-sm">Determining when re-ranking overhead is justified</p>
                </li>
                <li className="border-l-4 border-red-500 pl-4">
                  <p className="font-medium text-gray-800 mb-1">Debugging retrieval issues</p>
                  <p className="text-gray-600 text-sm">Identifying why specific queries perform poorly</p>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Teaching Solutions</h3>
              <ul className="space-y-4">
                <li className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-gray-800 mb-1">Comparison matrices</p>
                  <p className="text-gray-600 text-sm">Side-by-side tables showing when each metric matters</p>
                </li>
                <li className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-gray-800 mb-1">Step-by-step notebooks</p>
                  <p className="text-gray-600 text-sm">Jupyter notebooks with incremental implementation examples</p>
                </li>
                <li className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-gray-800 mb-1">Decision frameworks</p>
                  <p className="text-gray-600 text-sm">Flowcharts for selecting retrieval strategies by use case</p>
                </li>
                <li className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-gray-800 mb-1">Debugging checklists</p>
                  <p className="text-gray-600 text-sm">Systematic troubleshooting guides for common failure modes</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Takeaways from Teaching</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>No single retrieval strategy fits all use cases - context matters</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>Hybrid approaches often outperform single methods across diverse queries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>Re-ranking provides significant quality improvements for user-facing apps</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>Always establish a baseline before implementing complex strategies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>Measure actual performance metrics, not just theoretical improvements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>Understanding trade-offs is more valuable than memorizing best practices</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Teaching Philosophy</h3>
            <p className="text-gray-600 mb-4">
              Rather than prescribing "the best" retrieval strategy, I emphasize building intuition for when different
              approaches excel. Students learn through comparative implementation, analyzing real performance metrics,
              and understanding the architectural trade-offs of each approach.
            </p>
            <p className="text-gray-600">
              The hands-on exercises involve building a complete RAG system from scratch, implementing each retrieval
              strategy sequentially, and evaluating performance on a shared dataset. This progression helps students
              internalize why production systems often use hybrid or multi-stage retrieval pipelines.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Course Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://github.com/don-aie-cohort8/aie8-s09-adv-retrieval"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white rounded-lg p-6 hover:bg-gray-700 transition-colors flex items-start"
            >
              <Github className="h-8 w-8 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Course Repository</h3>
                <p className="text-gray-300">
                  Complete notebooks, code examples, and exercises for implementing advanced retrieval strategies
                </p>
              </div>
            </a>
            <div className="bg-purple-100 text-purple-900 rounded-lg p-6 flex items-start">
              <BookOpen className="h-8 w-8 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Session Materials</h3>
                <p className="text-purple-800">
                  Lecture slides, comparison matrices, decision frameworks, and debugging checklists
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdvancedRetrieval;
