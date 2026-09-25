import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
            <h1 className="text-4xl font-bold text-gray-800 mb-3">Don Branson</h1>
            <p className="text-xl text-blue-700 font-semibold mb-4">
              Generative AI Architect / AI Engineer
            </p>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto italic">
              "I architect durable multi-agent systems, composable MCP gateway architectures, and production AI platforms—and mentor engineers to build them."
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="https://github.com/donbr"
                className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 font-medium inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Profile
              </a>
              <a
                href="https://www.linkedin.com/in/donbranson/"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 font-medium inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/open-biosciences"
                className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-500 font-medium inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Biosciences
              </a>
              <a
                href="https://huggingface.co/dwb2023"
                className="bg-amber-300 text-amber-800 px-6 py-2 rounded-md hover:bg-amber-400 font-medium inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hugging Face
              </a>
            </div>
            {/* Metrics Bar */}
            <div className="flex flex-wrap justify-center gap-8 text-center max-w-5xl mx-auto border-t border-gray-200 pt-6">
              <div>
                <div className="text-2xl font-bold text-blue-600">13+ Repos / 12 MCPs</div>
                <div className="text-sm text-gray-600">Open Biosciences Platform</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">3 Publications</div>
                <div className="text-sm text-gray-600">1 Under Review &bull; 2 Preprints</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">150+ Engineers</div>
                <div className="text-sm text-gray-600">5 Bootcamp Cohorts Supported</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">20+ Years</div>
                <div className="text-sm text-gray-600">Enterprise Systems Architecture</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Architectural Leadership & Journey</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              I've spent <span className="font-semibold">20+ years</span> architecting enterprise-scale distributed systems and data solutions across life sciences, automotive, telecommunications, travel, and the public sector. Today, I specialize as a <span className="font-semibold text-blue-700">Generative AI Architect and Systems Engineer</span>—bridging high-velocity frontier AI capabilities with the durable execution, regulatory rigor, and data hygiene demanded by production enterprises.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              I serve as platform architect and maintainer of <a href="https://github.com/open-biosciences" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">Open Biosciences</a>—an open-source AI research substrate adopted by a non-profit Computational Biology Working Group to ground oncology research and publication workflows. The platform comprises 13+ repositories under strict agent-ownership boundaries, 12 FastMCP servers exposing 34+ life-sciences tools, a Neo4j/Graphiti knowledge-graph layer, LangGraph supervisor orchestration with PydanticAI specialists, and Temporal.io durable state machines.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Alongside architectural delivery, I have served as Grading Manager for AI Makerspace's AI Engineering Bootcamp v1.0 and peer supporter across five cohorts, training <span className="font-semibold text-green-700">150+ engineers</span> through weekly breakout groups, cohort-wide office hours, and assignment grading.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <h3 className="font-semibold text-gray-800 mb-3">Architectural Principles:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <span className="font-semibold">Durable Orchestration:</span> Resilient workflows must survive process restarts and transient failures via deterministic state machines (Temporal.io).</li>
                <li>• <span className="font-semibold">Fuzzy-to-Fact Safety Guardrails:</span> Enforce strict CURIE/ontology resolution (ADR-001) after natural-language discovery to eliminate hallucinations in regulated domains.</li>
                <li>• <span className="font-semibold">Zero Unmeasured Numbers:</span> Only reference statically verifiable outcomes and benchmarked metrics; anchor every claim in reproducible code and receipts.</li>
                <li>• <span className="font-semibold">Evaluation-Driven Delivery:</span> Measure retrieval accuracy, faithfulness, and LLM-as-a-judge alignment prior to production deployment.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Areas of Technical Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Durable Agentic Orchestration */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card border-t-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Durable Agent Orchestration</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• <span className="font-semibold">Temporal.io</span> Durable Workflows</li>
                <li>• Composable FastMCP Gateways &amp; Server Composition</li>
                <li>• Unified Tool Discovery &amp; Schema-Validated Contracts</li>
                <li>• LangGraph (Supervisor Pattern)</li>
                <li>• PydanticAI Specialized Agents</li>
              </ul>
            </div>

            {/* Hybrid Retrieval & Vector Systems */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card border-t-4 border-green-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Hybrid Retrieval & Vector Systems</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Qdrant (Primary), pgvector, FAISS</li>
                <li>• Reciprocal Rank Fusion (RRF)</li>
                <li>• Cohere Rerank & Contextual Retrieval</li>
                <li>• Neo4j Center-Node Graph Reranking</li>
                <li>• Graphiti Namespace-Isolated Agent Memory</li>
              </ul>
            </div>

            {/* Evaluation & Benchmarking Rigor */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card border-t-4 border-purple-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Evaluation & Benchmarking Rigor</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• LangSmith Trace & Observability</li>
                <li>• RAGAS Faithfulness & Relevance</li>
                <li>• LLM-as-a-Judge Calibration &amp; Scoring</li>
                <li>• Deterministic Offline Test Fixtures</li>
                <li>• Automated Rubrics & Run Provenance</li>
              </ul>
            </div>

            {/* Life Sciences & Computational Biology */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card border-t-4 border-emerald-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Life Sciences & Computational Biology</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 12 Production FastMCP Servers</li>
                <li>• ChEMBL, Open Targets, UniProt, HGNC</li>
                <li>• S′ Potency-Efficacy Response Index</li>
                <li>• SPrime Preclinical Screening Engine</li>
                <li>• ClinicalTrials.gov & Bioactivity Pipelines</li>
              </ul>
            </div>

            {/* Multi-Modal MLOps & Fine-Tuning */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card border-t-4 border-pink-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Multi-Modal MLOps & Fine-Tuning</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Florence-2 PEFT/LoRA Vision Training</li>
                <li>• Roboflow &rarr; Hugging Face Data ETL</li>
                <li>• Gradio Apps & HF Spaces Deployment</li>
                <li>• Zero-Shot vs Fine-Tuned Benchmarking</li>
                <li>• Browser AI (TransformersJS, ONNX, WebGPU)</li>
              </ul>
            </div>

            {/* Enterprise Modernization & Governance */}
            <div className="bg-white rounded-lg shadow-md p-6 skill-card border-t-4 border-amber-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Enterprise Modernization</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Enterprise GenAI Pilots (GM watsonx.ai)</li>
                <li>• Multi-Cloud: Azure, GCP Vertex, AWS</li>
                <li>• Model Risk Management (MRM) & GxP</li>
                <li>• FastMCP Protocol & Tool Sandboxing</li>
                <li>• Legacy-to-Cloud Event Streaming</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Scientific Publications & Preprints</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-purple-100 text-purple-800 rounded">
                  Precision Oncology &bull; Revision Under Review (2026)
                </span>
                <span className="text-sm font-semibold text-gray-500">Second Author</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                From Gene Pairs to Network Fragility: S&prime; Operational Indices Map Genotype-Selective Vulnerabilities in Tumor-Suppressor-Mutant Lung Cancer Cell Lines
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Zamora, P.O.; <span className="font-semibold text-gray-800">Branson, D.W.</span>; Oymak, E.G.; Ray, I.; Almosapeeh, H.; Santamaria, U.; Muchow, M.R.; Oraka, C.; McKinley-Pace, N.D.; Shin, J.H.; Zamora, M.E.
              </p>
              <p className="text-gray-700 text-sm">
                Manuscript MS 4321159 under review at <em>Precision Oncology</em>. Introduces network fragility and genotype-selective vulnerability mapping enabled by Open Biosciences agent toolchains and data infrastructure.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  Research Square Preprint &bull; April 2026
                </span>
                <a
                  href="https://doi.org/10.21203/rs.3.rs-9559070/v1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  doi:10.21203/rs.3.rs-9559070/v1 &rarr;
                </a>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Introducing S&prime; as a Potency&ndash;Efficacy Index for High-Throughput Drug Viability Screening; Reframing Drug Response as Net Regulatory Balance
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Zamora, M.E.; Muchow, M.R.; Ray, I.; McKinley-Pace, N.D.; Kaplan, E.D.; <span className="font-semibold text-gray-800">Branson, D.W.</span>; Santamaria, U.; Zamora, P.O.
              </p>
              <p className="text-gray-700 text-sm">
                Reframes high-throughput viability screening by capturing drug response as net regulatory balance, providing a mathematically robust alternative to traditional IC50 metrics.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-600">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-emerald-100 text-emerald-800 rounded">
                  Research Square Preprint &bull; April 2026
                </span>
                <a
                  href="https://doi.org/10.21203/rs.3.rs-9559152/v1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-600 hover:underline"
                >
                  doi:10.21203/rs.3.rs-9559152/v1 &rarr;
                </a>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                SPrime: A Python Module for Quantitative High-Throughput Screening Data in Preclinical Drug Discovery Studies
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Zamora, M.E.; Sopylo, P.; Muchow, M.R.; McKinley-Pace, N.D.; <span className="font-semibold text-gray-800">Branson, D.W.</span>; Santamaria, U.; Zamora, P.O.
              </p>
              <p className="text-gray-700 text-sm">
                Open-source Python module implementing the S&prime; potency-efficacy index for high-throughput screening data analysis in preclinical oncology pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Highlight */}
      <section id="projects" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured AI Architectures</h2>
            <Link
              to="/assets/projects"
              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 mt-2 md:mt-0"
            >
              View Full Projects Portfolio &rarr;
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1: Open Biosciences */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 border-t-4 border-blue-600 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  Composable Gateway &bull; Platform Architecture
                </span>
                <h3 className="text-xl font-bold text-gray-800 mt-3 mb-2">Open Biosciences: Composable MCP Gateway &amp; Life-Sciences Platform</h3>
                <p className="text-gray-600 text-sm mb-4">
                  A composable gateway unifying 12 domain-focused FastMCP servers and 34+ MCP tools across authoritative life-sciences sources—including ChEMBL, Open Targets, UniProt, and Ensembl—behind a unified interface. Provides modular server composition, consolidated tool discovery and invocation, schema-validated contracts, and strict identifier-resolution guardrails for reliable biomedical agent workflows.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded font-medium">Composable Gateway</span>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded font-medium">FastMCP Servers</span>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded font-medium">Temporal.io</span>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded font-medium">LangGraph</span>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded font-medium">Bioinformatics</span>
                </div>
              </div>
              <div className="flex gap-4 pt-2 border-t border-gray-200">
                <a
                  href="https://github.com/open-biosciences/biosciences-program"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm font-semibold inline-flex items-center gap-1"
                >
                  Architecture Program &rarr;
                </a>
                <a
                  href="https://github.com/open-biosciences/biosciences-mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline text-sm font-semibold inline-flex items-center gap-1"
                >
                  FastMCP Tools Repo &rarr;
                </a>
              </div>
            </div>

            {/* Project 2: GDELT RAG & UI */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 border-t-4 border-emerald-600 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-emerald-100 text-emerald-800 rounded">
                  Event-Driven RAG & Evaluation
                </span>
                <h3 className="text-xl font-bold text-gray-800 mt-3 mb-2">GDELT Knowledge Base & UI Dashboard</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Event-driven RAG reference architecture and offline evaluation harness for global geopolitical events. Features 5-layer retrieval with Cohere Rerank achieving 95.1% accuracy, paired with an interactive Next.js 14 evaluation dashboard with live event mapping and record inspection.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded font-medium">Next.js 14</span>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded font-medium">LangGraph</span>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded font-medium">RAG Evaluation</span>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded font-medium">Vercel</span>
                </div>
              </div>
              <div className="flex gap-4 pt-2 border-t border-gray-200">
                <a
                  href="https://gdelt-ui-demo.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline text-sm font-semibold inline-flex items-center gap-1"
                >
                  Live Next.js App &rarr;
                </a>
                <a
                  href="https://github.com/donbr/gdelt-knowledge-base"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline text-sm font-semibold inline-flex items-center gap-1"
                >
                  RAG Core Repo &rarr;
                </a>
              </div>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-2">AI Makerspace Grading Manager &amp; Peer Supporter</h3>
              <p className="text-lg text-gray-600 mb-4">
                Bootcamp v1.0 Grading Operations &bull; Peer Supporter Across 5 AI Engineering Cohorts
              </p>
              <div className="inline-block bg-green-100 border-2 border-green-600 rounded-lg px-6 py-3">
                <p className="text-green-800 font-bold text-lg">
                  Grading Operations &bull; 20-Point Certification Rubric Author &bull; 150+ Engineers Trained
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600 mb-2">150+</p>
                <p className="text-gray-700">Engineers Trained Through Production-Grade RAG &amp; Agent Systems</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-3xl font-bold text-purple-600 mb-2">5 Cohorts</p>
                <p className="text-gray-700">Bootcamp Cohorts Supported with Weekly Breakouts, Office Hours &amp; Rubric Grading</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-700 italic">
                <span className="font-semibold">Mentorship Philosophy:</span> Ground evaluation in verifiable submission evidence. Author clear rubrics, make grading judgment consistent, and prepare engineers for production reality.
              </p>
            </div>
          </div>

          {/* AI Engineering On-Ramp */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Engineering On-Ramp Mentor (2 Pre-Bootcamp Cohorts)</h3>
            <p className="text-gray-600">
              Mentored beginning practitioners through foundational LLM concepts, prompt mechanics, and initial Python/RAG workflows. Designed curriculum on-ramps to build confidence and eliminate early attrition before the intensive bootcamp.
            </p>
          </div>

          {/* Sessions Taught */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Session 7: Synthetic Data Generation */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-semibold">
                  Curriculum Module
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Synthetic Data Generation</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Seed data augmentation pipelines</li>
                <li>• Quality evaluation and distribution shifts</li>
                <li>• Domain-specific dataset synthesis</li>
                <li>• Hands-on production implementation</li>
              </ul>
            </div>

            {/* Sessions 8-9: RAG Evaluation */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-semibold">
                  Curriculum Module
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">RAG Evaluation Metrics</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Retrieval faithfulness and context recall</li>
                <li>• Generation quality &amp; hallucination checks</li>
                <li>• LangSmith and RAGAS benchmarking</li>
                <li>• Continuous evaluation test harnesses</li>
              </ul>
            </div>

            {/* Session 10: Advanced Retrieval */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-semibold">
                  Curriculum Module
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Advanced Retrieval Strategies</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Dense vector + BM25 hybrid search</li>
                <li>• Reciprocal Rank Fusion &amp; Cohere Rerank</li>
                <li>• Center-node knowledge graph reranking</li>
                <li>• Contextual retrieval chunking patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Verified Certifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg shadow-md p-4 border-l-4 border-blue-600">
              <h3 className="font-semibold text-gray-800">AI Makerspace</h3>
              <p className="text-gray-600">Certified AI Engineer (2024)</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4 border-l-4 border-blue-400">
              <h3 className="font-semibold text-gray-800">Microsoft Azure</h3>
              <p className="text-gray-600">AI Engineer Associate &amp; Solutions Architect</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4 border-l-4 border-emerald-600">
              <h3 className="font-semibold text-gray-800">Neo4j</h3>
              <p className="text-gray-600">Certified Professional, Graph Data Science</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4 border-l-4 border-amber-500">
              <h3 className="font-semibold text-gray-800">AWS</h3>
              <p className="text-gray-600">Generative AI Essentials, Developer, Solutions Architect</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4 border-l-4 border-indigo-600">
              <h3 className="font-semibold text-gray-800">IBM</h3>
              <p className="text-gray-600">watsonx.ai, Enterprise Design Thinking, Architectural Thinking</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-4 border-l-4 border-cyan-500">
              <h3 className="font-semibold text-gray-800">Snowflake</h3>
              <p className="text-gray-600">SnowPro Core &bull; TOGAF 9 Foundations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Get In Touch</h2>
          <div className="bg-white rounded-lg shadow-md p-8 max-w-xl mx-auto text-center">
            <p className="text-gray-600 mb-6">
              Interested in collaborating on enterprise AI systems architecture, durable multi-agent orchestration, or computational biology platforms? Let's connect!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/donbranson/"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile
              </a>
              <a
                href="https://github.com/donbr"
                className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;