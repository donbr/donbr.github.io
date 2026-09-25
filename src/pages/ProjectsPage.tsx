import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
  huggingFaceUrl?: string;
  detailUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  demoUrl,
  codeUrl,
  huggingFaceUrl,
  detailUrl
}) => {
  const tagColorMap: Record<string, string> = {
    'React': 'bg-blue-100 text-blue-800',
    'Next.js': 'bg-slate-100 text-slate-800',
    'Tailwind CSS': 'bg-green-100 text-green-800',
    'Leaflet': 'bg-purple-100 text-purple-800',
    'Composable Gateway': 'bg-emerald-100 text-emerald-800',
    'FastMCP Servers': 'bg-teal-100 text-teal-800',
    'FastMCP': 'bg-emerald-100 text-emerald-800',
    'Model Context Protocol': 'bg-teal-100 text-teal-800',
    'Temporal.io': 'bg-indigo-100 text-indigo-800',
    'LangGraph': 'bg-blue-100 text-blue-800',
    'LangChain': 'bg-blue-100 text-blue-800',
    'Bioinformatics': 'bg-purple-100 text-purple-800',
    'Architecture': 'bg-amber-100 text-amber-800',
    'Open Source': 'bg-emerald-100 text-emerald-800',
    'ChEMBL': 'bg-cyan-100 text-cyan-800',
    'Open Targets': 'bg-sky-100 text-sky-800',
    'Drug Discovery': 'bg-rose-100 text-rose-800',
    'AI Agents': 'bg-violet-100 text-violet-800',
    'Python': 'bg-green-100 text-green-800',
    'Prefect': 'bg-blue-100 text-blue-800',
    'Data Pipeline': 'bg-yellow-100 text-yellow-800',
    'Hugging Face': 'bg-amber-100 text-amber-800',
    'HuggingFace': 'bg-amber-100 text-amber-800',
    'Parquet': 'bg-green-100 text-green-800',
    'Data Engineering': 'bg-purple-100 text-purple-800',
    'Streamlit': 'bg-blue-100 text-blue-800',
    'DuckDB': 'bg-green-100 text-green-800',
    'NetworkX': 'bg-purple-100 text-purple-800',
    'Knowledge Graphs': 'bg-yellow-100 text-yellow-800',
    'Machine Learning': 'bg-green-100 text-green-800',
    'NLP': 'bg-red-100 text-red-800',
    'Cytoscape.js': 'bg-blue-100 text-blue-800',
    'D3.js': 'bg-blue-100 text-blue-800',
    'Network Analysis': 'bg-green-100 text-green-800',
    'Neo4j': 'bg-blue-100 text-blue-800',
    'Graph Data Science': 'bg-green-100 text-green-800',
    'Education Tech': 'bg-purple-100 text-purple-800',
    'RAG': 'bg-blue-100 text-blue-800',
    'Vector Search': 'bg-teal-100 text-teal-800',
    'Cohere': 'bg-purple-100 text-purple-800',
    'Evaluation Metrics': 'bg-yellow-100 text-yellow-800',
    'WebGPU': 'bg-purple-100 text-purple-800',
    'ONNX': 'bg-blue-100 text-blue-800',
    'Florence-2': 'bg-rose-100 text-rose-800',
    'PEFT/LoRA': 'bg-fuchsia-100 text-fuchsia-800',
    'Vercel': 'bg-zinc-100 text-zinc-800'
  };

  const cardContent = (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className={`${tagColorMap[tag] || 'bg-gray-100 text-gray-800'} text-xs px-2.5 py-1 rounded font-medium`}>
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-4 text-sm font-semibold">
        {detailUrl && (
          <Link
            to={detailUrl}
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            Deep Dive <span className="text-sm">&rarr;</span>
          </Link>
        )}
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-800 inline-flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            Live Demo <span className="text-sm">&#8599;</span>
          </a>
        )}
        {codeUrl && (
          <a
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black inline-flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            Repository <span className="text-sm">&#8599;</span>
          </a>
        )}
        {huggingFaceUrl && (
          <a
            href={huggingFaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-900 inline-flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            Hugging Face <span className="text-sm">&#8599;</span>
          </a>
        )}
      </div>
    </>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 project-card hover:shadow-lg transition-shadow border-t-2 border-gray-200">
      {cardContent}
    </div>
  );
};

const ProjectsPage: React.FC = () => {
  const projects = [
    {
      title: "Open Biosciences: Composable MCP Gateway & Life-Sciences Platform",
      description: "A composable gateway unifying 12 domain-focused FastMCP servers and 34+ MCP tools across authoritative life-sciences sources—including ChEMBL, Open Targets, UniProt, and Ensembl—behind a unified interface. Provides modular server composition, consolidated tool discovery and invocation, schema-validated contracts, and strict identifier-resolution guardrails for reliable biomedical agent workflows.",
      tags: ["Composable Gateway", "FastMCP Servers", "Temporal.io", "LangGraph", "Bioinformatics"],
      codeUrl: "https://github.com/open-biosciences/biosciences-program",
      demoUrl: "https://github.com/open-biosciences"
    },
    {
      title: "Open Biosciences FastMCP Tool Harnesses",
      description: "12 production FastMCP servers exposing 34+ life-sciences tools across HGNC, UniProt, ChEMBL, Open Targets, STRING, BioGRID, Ensembl, Entrez, PubChem, IUPHAR, WikiPathways, and ClinicalTrials.gov. Implements the Fuzzy-to-Fact safety protocol (ADR-001) enforcing CURIE-resolved strict lookups after natural-language discovery.",
      tags: ["FastMCP", "Distributed Systems", "ChEMBL", "Open Targets", "Bioinformatics", "Python"],
      codeUrl: "https://github.com/open-biosciences/biosciences-mcp"
    },
    {
      title: "Life Sciences Research & Agentic Discovery",
      description: "AI Agent wrappers for Life Sciences APIs (Open Targets, ChEMBL, UniProt). Accelerating drug discovery, target-disease associations, and bioactivity exploration using Model Context Protocol (MCP) and FastMCP toolchains with automated evaluation.",
      tags: ["Model Context Protocol", "Drug Discovery", "ChEMBL", "Open Targets", "AI Agents"],
      codeUrl: "https://github.com/donbr/lifesciences-research"
    },
    {
      title: "GDELT Knowledge Base: Event-Driven RAG",
      description: "Production-grade RAG reference architecture and offline evaluation harness for global geopolitical event analysis. Features a 5-layer architecture with comparative evaluation showing Cohere Rerank achieving 95.1% accuracy. Published 4 datasets to Hugging Face Hub with SHA-256 provenance tracking.",
      tags: ["LangGraph", "RAG", "Vector Search", "Cohere", "Evaluation Metrics", "Python"],
      codeUrl: "https://github.com/donbr/gdelt-knowledge-base",
      demoUrl: "https://gdelt-ui-demo.vercel.app",
      detailUrl: "/assets/projects/gdelt-knowledge-base"
    },
    {
      title: "GDELT Production Intelligence Dashboard",
      description: "Production Next.js 14 frontend and interactive evaluation dashboard for GDELT Knowledge Base RAG pipelines. Features live geographic event mapping with Leaflet, record inspection, tone analysis, and real-time query evaluation.",
      tags: ["Next.js", "React", "Tailwind CSS", "Data Visualization", "Vercel"],
      codeUrl: "https://github.com/donbr/gdelt-ui-demo",
      demoUrl: "https://gdelt-ui-demo.vercel.app"
    },
    {
      title: "Multi-Modal Florence-2 Vision Fine-Tuning & MLOps",
      description: "End-to-end MLOps pipeline for Florence-2 vision model fine-tuning. Includes Roboflow to Hugging Face ETL, parameter-efficient PEFT/LoRA adaptation across 40 epochs, zero-shot vs fine-tuned benchmarking, and deployment via Gradio and Hugging Face Spaces.",
      tags: ["Florence-2", "PEFT/LoRA", "Machine Learning", "Hugging Face", "Data Pipeline"],
      huggingFaceUrl: "https://huggingface.co/dwb2023"
    },
    {
      title: "AI in Your Browser: TransformersJS ONNX Showcase",
      description: "Client-side browser AI models (LLaMA 3.2, Phi 3.5, Janus, Florence 2) powered by TransformersJS and ONNX Runtime with WebGPU acceleration, delivering near-native inference speeds directly in the browser with zero server dependencies.",
      tags: ["JavaScript", "React", "WebGPU", "ONNX", "HuggingFace", "Machine Learning"],
      demoUrl: "https://transformersjs-examples.vercel.app",
      codeUrl: "https://github.com/donbr/transformersjs-examples"
    },
    {
      title: "Advanced Retrieval Strategies for RAG",
      description: "Comprehensive exploration of modern retrieval techniques including dense vector search, BM25 keyword search, hybrid approaches, and re-ranking strategies. Developed as part of AI Makerspace bootcamp curriculum comparing 6 retrieval strategies.",
      tags: ["Python", "RAG", "Vector Search", "Cohere", "LangChain", "Evaluation Metrics"],
      detailUrl: "/assets/projects/advanced-retrieval"
    },
    {
      title: "Graph Network Visualizations (Cytoscape.js & D3)",
      description: "Interactive network visualization tool built with Cytoscape.js and D3.js for complex biological and relational graph data. Includes dynamic layouts, protein interaction inspection, relationship filtering, and visual styling.",
      tags: ["Cytoscape.js", "D3.js", "React", "Network Analysis", "Bioinformatics"],
      demoUrl: "https://graph-viz-next.vercel.app/",
      detailUrl: "/assets/projects/cytoscape"
    },
    {
      title: "GDELT ETL Pipeline",
      description: "Production-grade ETL pipeline built with Prefect for processing GDELT Global Knowledge Graph data. Features concurrent processing, error handling, and direct integration with Hugging Face Datasets.",
      tags: ["Prefect", "Python", "Data Pipeline"],
      codeUrl: "https://gist.github.com/donbr/e2af2bbe441f90b8664539a25957a6c0"
    },
    {
      title: "GDELT Knowledge Graph Dataset",
      description: "Curated GDELT Global Knowledge Graph datasets focusing on critical historical intervals. Features optimized Parquet structures for knowledge graph analysis, temporal patterns, and sentiment evaluation.",
      tags: ["Hugging Face", "Parquet", "Data Engineering"],
      huggingFaceUrl: "https://huggingface.co/datasets/dwb2023/gdelt-gkg-march2020-v2"
    },
    {
      title: "GDELT Insight Explorer",
      description: "Interactive Streamlit application for analyzing GDELT data through knowledge graphs. Features real-time exploration of events, network analysis, and temporal visualization capabilities.",
      tags: ["Streamlit", "DuckDB", "NetworkX", "Knowledge Graphs"],
      huggingFaceUrl: "https://huggingface.co/spaces/dwb2023/insight"
    },
    {
      title: "Event Analyzer",
      description: "Event analysis system for processing and understanding complex temporal event sequences. Includes pattern detection, correlation analysis, and predictive modeling capabilities.",
      tags: ["TypeScript", "Data Visualization", "NLP"],
      detailUrl: "/assets/projects/event-analyzer"
    },
    {
      title: "Situational Awareness Dashboard",
      description: "Real-time situational awareness visualization using graph algorithms. Displays interconnected events, entities, and relationships for rapid operational understanding.",
      tags: ["React", "Data Visualization", "Network Analysis"],
      detailUrl: "/assets/projects/situational-awareness"
    }
  ];

  return (
    <Layout>
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Systems Architecture &amp; Engineering Projects</h1>
            <p className="text-gray-600">
              A curated portfolio of production AI systems, durable multi-agent orchestration, FastMCP toolchains, and computational biology platforms.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                demoUrl={project.demoUrl}
                codeUrl={project.codeUrl}
                huggingFaceUrl={project.huggingFaceUrl}
                detailUrl={project.detailUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;