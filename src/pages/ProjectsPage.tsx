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
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  tags, 
  demoUrl, 
  codeUrl, 
  huggingFaceUrl 
}) => {
  const tagColorMap: Record<string, string> = {
    'React': 'bg-blue-100 text-blue-800',
    'Tailwind CSS': 'bg-green-100 text-green-800',
    'Leaflet': 'bg-purple-100 text-purple-800',
    'Data Visualization': 'bg-yellow-100 text-yellow-800',
    'Prefect': 'bg-blue-100 text-blue-800',
    'Python': 'bg-green-100 text-green-800',
    'Data Pipeline': 'bg-yellow-100 text-yellow-800',
    'Hugging Face': 'bg-blue-100 text-blue-800',
    'Parquet': 'bg-green-100 text-green-800',
    'Data Engineering': 'bg-purple-100 text-purple-800',
    'Streamlit': 'bg-blue-100 text-blue-800',
    'DuckDB': 'bg-green-100 text-green-800',
    'NetworkX': 'bg-purple-100 text-purple-800',
    'Knowledge Graphs': 'bg-yellow-100 text-yellow-800',
    'HuggingFace': 'bg-blue-100 text-blue-800',
    'Machine Learning': 'bg-green-100 text-green-800',
    'NLP': 'bg-red-100 text-red-800',
    'Cytoscape.js': 'bg-blue-100 text-blue-800',
    'Network Analysis': 'bg-green-100 text-green-800',
    'Bioinformatics': 'bg-purple-100 text-purple-800',
    'Neo4j': 'bg-blue-100 text-blue-800',
    'Graph Data Science': 'bg-green-100 text-green-800',
    'Education Tech': 'bg-purple-100 text-purple-800',
    'AI': 'bg-blue-100 text-blue-800',
    'Agriculture': 'bg-green-100 text-green-800',
    'Grant Writing': 'bg-yellow-100 text-yellow-800',
    'LangChain': 'bg-blue-100 text-blue-800',
    'Open Source': 'bg-purple-100 text-purple-800',
    'LLMs': 'bg-red-100 text-red-800',
    'Healthcare': 'bg-blue-100 text-blue-800',
    'Research': 'bg-purple-100 text-purple-800',
    'JavaScript': 'bg-blue-100 text-blue-800',
    'Pattern Matching': 'bg-purple-100 text-purple-800',
    'TypeScript': 'bg-blue-100 text-blue-800',
    'Graph Visualization': 'bg-purple-100 text-purple-800',
    'Temporal Analysis': 'bg-yellow-100 text-yellow-800',
    'Interactive Visualization': 'bg-green-100 text-green-800',
    'CSS Animation': 'bg-pink-100 text-pink-800',
    'Interactive Design': 'bg-indigo-100 text-indigo-800',
    'UX': 'bg-teal-100 text-teal-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 project-card">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className={`${tagColorMap[tag] || 'bg-gray-100 text-gray-800'} text-sm px-3 py-1 rounded`}>
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {demoUrl && (
          <Link to={demoUrl} className="text-blue-600 hover:text-blue-800 block">
            View Demo →
          </Link>
        )}
        {codeUrl && (
          <a 
            href={codeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-800 block"
          >
            View Code →
          </a>
        )}
        {huggingFaceUrl && (
          <a 
            href={huggingFaceUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-800 block"
          >
            View on Hugging Face →
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectsPage: React.FC = () => {
  const projects = [
    {
      title: "Interactive 404 Experience",
      description: "Creative error page featuring dynamic typing animations, particle effects, and interactive background elements. Demonstrates modern front-end animation techniques with React and CSS.",
      tags: ["React", "CSS Animation", "Interactive Design", "UX"],
      demoUrl: "/assets/projects/placeholder-page"
    },
    {
      title: "GDELT GKG Viewer",
      description: "An interactive viewer for the GDELT Global Knowledge Graph. Built as a single-page prototype application using React, Tailwind CSS, and Leaflet for map visualizations, it offers a searchable record list, tone analysis, version toggling, and an intuitive user interface for exploring multidimensional data.",
      tags: ["React", "Tailwind CSS", "Leaflet", "Data Visualization"],
      demoUrl: "/assets/projects/gdelt"
    },
    {
      title: "GDELT ETL Pipeline",
      description: "Production-grade ETL pipeline built with Prefect for processing GDELT Global Knowledge Graph data. Features concurrent processing, error handling, and direct integration with Hugging Face Datasets.",
      tags: ["Prefect", "Python", "Data Pipeline"],
      codeUrl: "https://gist.github.com/donbr/e2af2bbe441f90b8664539a25957a6c0"
    },
    {
      title: "GDELT Knowledge Graph Dataset",
      description: "Curated GDELT Global Knowledge Graph datasets focusing on critical time periods (March 2020 COVID-19 onset, February 2025). Features optimized data structures for knowledge graph analysis, temporal patterns, and sentiment analysis.",
      tags: ["Hugging Face", "Parquet", "Data Engineering"],
      huggingFaceUrl: "https://huggingface.co/datasets/dwb2023/gdelt-gkg-march2020-v2"
    },
    {
      title: "GDELT Insight Explorer",
      description: "Interactive Streamlit application for analyzing GDELT data through knowledge graphs. Features real-time exploration of events, network analysis, and temporal visualization capabilities. Directly integrates with curated GDELT datasets on Hugging Face.",
      tags: ["Streamlit", "DuckDB", "NetworkX", "Knowledge Graphs"],
      huggingFaceUrl: "https://huggingface.co/spaces/dwb2023/insight"
    },
    {
      title: "Parsimony",
      description: "A HuggingFace Space showcasing advanced NLP capabilities. Demonstrates practical applications of large language models and text analysis.",
      tags: ["HuggingFace", "Machine Learning", "NLP"],
      huggingFaceUrl: "https://huggingface.co/spaces/dwb2023/parsimony"
    },
    {
      title: "STRING Network Viewer",
      description: "Interactive visualization of protein-protein interaction networks using Cytoscape.js. Features dynamic layouts, protein information display, and interaction details.",
      tags: ["Cytoscape.js", "Network Analysis", "Bioinformatics"],
      demoUrl: "/assets/projects/cytoscape"
    },
    {
      title: "EduScape: Graph-Based Curriculum Development",
      description: "Leveraged graph technologies for innovative curriculum development and mapping.",
      tags: ["Neo4j", "Graph Data Science", "Education Tech"]
    },
    {
      title: "Kisaan Companion: AI for Agriculture",
      description: "Key contributor to Google AI for Impact and Llama Impact grant applications, advancing to second round selection.",
      tags: ["AI", "Agriculture", "Grant Writing"]
    },
    {
      title: "OpenGPTs LangChain Enhancement",
      description: "Added support for Groq and Anthropic 3.5 to the LangChain library, expanding its capabilities.",
      tags: ["LangChain", "Open Source", "LLMs"]
    },
    {
      title: "Drug Repurposing Research",
      description: "Led development efforts in drug repurposing using industry datasets and ontologies, implementing both graph and non-graph approaches.",
      tags: ["Healthcare", "Graph Analysis", "Research"]
    },
    {
      title: "Event Analysis System",
      description: "Interactive system for analyzing social media events using pattern matching and ontology support. Features event classification, temporal analysis, and entity extraction.",
      tags: ["JavaScript", "NLP", "Pattern Matching"],
      demoUrl: "/assets/projects/event-analyzer"
    },
    {
      title: "Situational Awareness Graph",
      description: "Interactive network visualization for situational awareness scenarios. Visualizes relationships between disaster response, cybersecurity, and supply chain elements.",
      tags: ["Python", "NetworkX", "Graph Analysis"],
      demoUrl: "/assets/projects/situational-awareness"
    },
    {
      title: "Temporal Graph Explorer",
      description: "An interactive visualization tool for exploring time-based graph data. Features timeline playback controls, node filtering, and detailed property inspection for entities and relationships as they evolve over time.",
      tags: ["React", "TypeScript", "Graph Visualization", "Temporal Analysis"],
      demoUrl: "/assets/projects/temporal-graph"
    },
    {
      title: "Cytoscape Graph Explorer",
      description: "Advanced network visualization tool built with Cytoscape.js, offering rich interactive features for complex graph data. Includes timeline animation, detailed node inspection, relationship filtering, and customizable visual styling.",
      tags: ["Cytoscape.js", "React", "Network Analysis", "Interactive Visualization"],
      demoUrl: "/assets/projects/cytoscape-graph"
    }
  ];

  return (
    <Layout>
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Recent Projects</h1>
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
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;