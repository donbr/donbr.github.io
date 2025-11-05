import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';

const HomePage: React.FC = () => {
  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Update URL without reload
          window.history.pushState(null, '', target.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Don Branson</h1>
            <p className="text-xl text-gray-600 mb-4">AI Engineer | Production Systems Architect | Mentor to 100+ AI Engineers</p>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto italic">
              "I build production-grade AI systems and teach others to do the same—with a 90%+ student retention rate across 3 bootcamp cohorts."
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="https://github.com/donbr"
                className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/donbranson/"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://huggingface.co/dwb2023"
                className="bg-amber-300 text-amber-700 px-6 py-2 rounded-md hover:bg-amber-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hugging Face
              </a>
            </div>
            {/* Metrics Bar */}
            <div className="flex flex-wrap justify-center gap-8 text-center max-w-4xl mx-auto border-t border-gray-200 pt-6">
              <div>
                <div className="text-2xl font-bold text-blue-600">100+</div>
                <div className="text-sm text-gray-600">Students Mentored</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">90%+</div>
                <div className="text-sm text-gray-600">Retention Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">12+</div>
                <div className="text-sm text-gray-600">Production Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">20+</div>
                <div className="text-sm text-gray-600">Years in Tech</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">The Journey</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              I've spent <span className="font-semibold">20+ years</span> architecting solutions across travel, healthcare, telecom, and public sector—but my proudest work?
              Teaching 100+ engineers to build production AI systems with a <span className="font-semibold text-green-600">&lt;5% dropout rate</span>.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Why does that matter? Because <span className="font-semibold">AI engineering isn't just about knowing the tech—it's about knowing when to use it,
              when NOT to use it, and how to make it work for real users.</span>
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <h3 className="font-semibold text-gray-800 mb-3">What I Believe:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <span className="font-semibold">Production beats perfection.</span> Ship, measure, iterate.</li>
                <li>• <span className="font-semibold">Teaching is the ultimate test of understanding.</span></li>
                <li>• The best engineers embrace "I don't know" and figure it out.</li>
                <li>• <span className="font-semibold">Authentic &gt; polished</span> (especially in a world of AI-generated everything)</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold">What Makes Me Different:</span> I don't just show you the happy path.
              I show you where I failed, what I learned, and why certain architectural decisions matter more than others.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Based in Southern California, I'm focused on cutting-edge production AI: LangGraph agents, RAG evaluation at scale,
              Model Context Protocol (MCP) integration, and the kind of architectural trade-offs that separate prototypes from production systems.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Areas of Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Production AI Systems */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card border-t-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Production AI Systems</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• <span className="font-semibold">LangGraph</span> Agent Orchestration</li>
                <li>• Agentic RAG Architecture</li>
                <li>• Model Context Protocol (MCP)</li>
                <li>• LangSmith Observability & Evaluation</li>
                <li>• Production Deployment (LangGraph Server)</li>
              </ul>
            </div>

            {/* LLMs & Evaluation */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card border-t-4 border-green-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">LLMs & Evaluation</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• OpenAI, Anthropic Claude, Gemini</li>
                <li>• RAGAS Evaluation Metrics</li>
                <li>• Synthetic Data Generation</li>
                <li>• RAG Performance Optimization</li>
                <li>• Multi-Agent Systems</li>
              </ul>
            </div>

            {/* Frameworks & Infrastructure */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card border-t-4 border-purple-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Frameworks & Infrastructure</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• LangChain, OpenAI Agents SDK</li>
                <li>• Qdrant, Pinecone (Vector DBs)</li>
                <li>• Prefect, FastAPI, Docker</li>
                <li>• Hugging Face, PyTorch</li>
                <li>• Semantic Caching, Guardrails</li>
              </ul>
            </div>

            {/* Advanced Retrieval */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card border-t-4 border-orange-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Advanced Retrieval</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Hybrid Search (Dense + BM25)</li>
                <li>• Cohere Rerank Integration</li>
                <li>• Contextual Retrieval Patterns</li>
                <li>• Vector Search Optimization</li>
                <li>• Reciprocal Rank Fusion</li>
              </ul>
            </div>

            {/* Emerging Tech (2025) */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card border-t-4 border-pink-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Emerging Tech (2025)</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• <span className="font-semibold">MCP</span> Server Development</li>
                <li>• Agent2Agent (A2A) Protocol</li>
                <li>• On-Prem Agent Deployments</li>
                <li>• WebGPU/ONNX (Browser AI)</li>
                <li>• AI Guardrails & Safety</li>
              </ul>
            </div>

            {/* Domain Knowledge */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card border-t-4 border-gray-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Industry Expertise</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Travel & Transportation</li>
                <li>• Healthcare/Life Sciences</li>
                <li>• Public Sector</li>
                <li>• Telecommunications</li>
                <li>• Insurance</li>
              </ul>
            </div>
          </div>

          {/* Current Focus Badge */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300 rounded-lg px-6 py-3">
              <p className="text-gray-700">
                <span className="font-semibold">Current Focus (Nov 2025):</span> Production LangGraph agents, MCP integration, and advanced RAG evaluation at scale
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Certifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800">AI Makerspace</h3>
              <p className="text-gray-600">Certified AI Engineer (2024)</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800">Microsoft Azure</h3>
              <p className="text-gray-600">AI Engineer & Solutions Architect (2024)</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800">Neo4j</h3>
              <p className="text-gray-600">Certified Professional, Graph Data Science</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800">AWS</h3>
              <p className="text-gray-600">Generative AI Essentials, Developer, Solutions Architect</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800">IBM</h3>
              <p className="text-gray-600">watsonx.ai, Enterprise Design Thinking, Architectural Thinking</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800">Snowflake</h3>
              <p className="text-gray-600">SnowPro Core</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Projects</h2>
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">AI & Machine Learning Projects</h3>
            <p className="text-gray-600 mb-4">
              My portfolio includes a range of AI applications and research projects available on my Hugging Face profile:
            </p>
            <ul className="text-gray-600 list-disc pl-6 mb-6 space-y-2">
              <li>GDELT Knowledge Graph datasets and analysis tools</li>
              <li>Network visualization tools for complex data relationships</li>
              <li>Fine-tuned models for specialized tasks</li>
              <li>Interactive demos showcasing RAG implementations</li>
            </ul>
            <div className="flex justify-center">
              <a 
                href="https://huggingface.co/dwb2023" 
                className="bg-amber-300 text-amber-700 px-6 py-2 rounded-md hover:bg-amber-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Hugging Face Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching & Mentorship Section */}
      <section id="teaching" className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Teaching & Mentorship Impact</h2>

          {/* Introduction with Impact Stats */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">AI Makerspace Lead Mentor</h3>
              <p className="text-lg text-gray-600 mb-4">Certified AI Engineer Bootcamp | Cohorts 6, 7, 8 (2024-2025)</p>
              <div className="inline-block bg-green-100 border-2 border-green-500 rounded-lg px-6 py-3">
                <p className="text-green-800 font-bold text-xl">
                  Consistently Lowest Dropout Rate: &lt;5% (vs. 20-30% average)
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600 mb-2">100+</p>
                <p className="text-gray-700">Engineers Mentored Through Production-Grade RAG Systems</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-3xl font-bold text-purple-600 mb-2">3</p>
                <p className="text-gray-700">Key Sessions Taught: S7 (Synthetic Data), S8-9 (RAG Evaluation), S10 (Advanced Retrieval)</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-700 italic">
                <span className="font-semibold">Teaching Philosophy:</span> Make it human. Make it click. Make it production-ready.
              </p>
            </div>
          </div>

          {/* AI Engineering On-Ramp */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Engineering On-Ramp Mentor (2025)</h3>
            <p className="text-gray-600">
              Mentoring beginning students through foundational LLM concepts, setting them up for success in the intensive bootcamp.
              Focus on building confidence and practical skills from day one.
            </p>
          </div>

          {/* Sessions Taught */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Session 7: Synthetic Data Generation */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-semibold">
                  Session 7
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Synthetic Data Generation</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Data augmentation techniques</li>
                <li>• Quality evaluation metrics</li>
                <li>• Privacy-preserving approaches</li>
                <li>• Hands-on implementation</li>
              </ul>
            </div>

            {/* Sessions 8-9: RAG Evaluation */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-semibold">
                  Sessions 8-9
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">RAG Evaluation Metrics</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Retrieval accuracy assessment</li>
                <li>• Generation quality metrics</li>
                <li>• End-to-end evaluation</li>
                <li>• Benchmarking strategies</li>
              </ul>
            </div>

            {/* Session 10: Advanced Retrieval */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-semibold">
                  Session 10
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Advanced Retrieval Strategies</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Vector search optimization</li>
                <li>• Hybrid retrieval approaches</li>
                <li>• Re-ranking with Cohere</li>
                <li>• Contextual retrieval patterns</li>
              </ul>
            </div>
          </div>

          {/* Impact Statement */}
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Guided cohort through hands-on implementation of production-grade RAG systems,
              from data generation and quality evaluation to advanced retrieval strategies and performance optimization.
            </p>
            <p className="text-gray-600">
              Focus on practical, real-world applications with emphasis on understanding trade-offs and best practices for deploying AI systems at scale.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Get In Touch</h2>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
            <p className="text-gray-600 text-center mb-6">
              Interested in collaborating on AI projects or discussing solutions architecture? Connect with me on one of these platforms:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://www.linkedin.com/in/donbranson/" 
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/donbr" 
                className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a 
                href="https://huggingface.co/dwb2023" 
                className="bg-amber-300 text-amber-700 px-6 py-2 rounded-md hover:bg-yellow-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hugging Face
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;