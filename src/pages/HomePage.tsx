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
            <p className="text-xl text-gray-600 mb-8">AI Engineer & Solutions Architect</p>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Versatile professional with over two decades of expertise in AI engineering, solutions architecture, and business solution implementation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">About Me</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 leading-relaxed mb-4">
              Based in Southern California, I'm a solutions architect and AI engineer with comprehensive expertise spanning program management, 
              architecture, development, and business solution implementation. I specialize in delivering outcomes across diverse industries 
              including travel and transportation, public sector, life sciences, telecommunications, and insurance.
            </p>
            <p className="text-gray-600 leading-relaxed">
              I'm particularly focused on cutting-edge AI technologies including generative AI, large language models, and computer vision, 
              with a strong emphasis on responsible AI development and deployment.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Areas of Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI & ML */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">AI & Machine Learning</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Large Language Models (OpenAI, Claude, Gemini)</li>
                <li>• Vision Models (Florence, SAM, DALL-E)</li>
                <li>• RAG & Vector Stores</li>
                <li>• AI Safety and Evaluation</li>
              </ul>
            </div>

            {/* Frameworks & Tools */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Frameworks & Tools</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• LangChain, LlamaIndex, Hugging Face</li>
                <li>• PyTorch, TorchVision</li>
                <li>• FastAPI, Docker, Kubernetes</li>
                <li>• MLOps / LLMOps practices</li>
              </ul>
            </div>

            {/* Domain Knowledge */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Industry Expertise</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Travel & Transportation</li>
                <li>• Healthcare/Life Sciences</li>
                <li>• Public Sector</li>
                <li>• Telecommunications</li>
              </ul>
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