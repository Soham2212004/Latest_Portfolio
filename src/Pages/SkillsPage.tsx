import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';
import { projects } from '@/data/portfolio';
import {
  ArrowUpRight,
  BrainCircuit,
  CloudCog,
  Code2,
  ExternalLink,
  Github,
  GitBranch,
  Layers3,
  Search,
  Sparkles,
  X,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────
interface BarSkill  { name: string; level: number; tag?: string }
interface TagSkill  { name: string; tier?: 'primary' | 'secondary' }
interface ToolSkill { name: string; label?: string }

interface SkillGroup {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  variant: 'bars' | 'tags' | 'tools';
  items: BarSkill[] | TagSkill[] | ToolSkill[];
}

// ── Skill → Related Projects map ─────────────────────────────────────────────
interface RelatedProject {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
}

const skillProjects: Record<string, RelatedProject[]> = {
  'Python': [
    { title: 'Resume Analyzer & Job Matcher', description: 'RAG pipeline built entirely in Python with Streamlit, Gemini, and Pinecone.', tags: ['Python', 'Streamlit', 'RAG'], githubUrl: 'https://github.com/Soham2212004/Resume-Analyzer-Job-Matcher' },
    { title: 'Road Accident Detection', description: 'Real-time CV system using Python, OpenCV, and Twilio for emergency alerts.', tags: ['Python', 'OpenCV', 'Twilio'], githubUrl: 'https://github.com/Soham2212004/Road-Accident-Detection-Alert-System' },
    { title: 'AI-Agents Suite', description: '6 production n8n agents built and orchestrated with Python + Gemini AI.', tags: ['Python', 'n8n', 'Gemini'], githubUrl: 'https://github.com/Soham2212004/AI-Agents' },
    { title: 'AV DEVS Client Applications', description: 'Used Python across production AI features, FastAPI backends, and automation workflows at AV DEVS.', tags: ['Python', 'FastAPI', 'AI', 'AV DEVS'], githubUrl: 'https://github.com/Soham2212004' },
    { title: 'Linde Engineering RAG Chatbot', description: 'Built the FastAPI and Python backend for a document Q&A application during the Linde Engineering internship.', tags: ['Python', 'FastAPI', 'RAG', 'Linde Engineering'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'TypeScript / JavaScript': [
    { title: 'LuxeStay', description: 'Full-stack hotel booking app — React (TypeScript) frontend with FastAPI backend.', tags: ['TypeScript', 'React', 'FastAPI'], githubUrl: 'https://github.com/Soham2212004/LuxeStay' },
    { title: 'StudyGenius AI', description: 'React + TypeScript study assistant with Gemini API and PDF export.', tags: ['React', 'TypeScript', 'Gemini API'], githubUrl: 'https://github.com/Soham2212004/StudyGenius-AI' },
    { title: 'SafaaiBuddy', description: 'JavaScript-powered static site with n8n webhook and Pinecone vector search.', tags: ['JavaScript', 'Pinecone', 'n8n'], githubUrl: 'https://github.com/Soham2212004/SafaaiBuddy' },
    { title: 'Linde Engineering RAG Chatbot', description: 'Built the React and TypeScript interface for a full-stack document Q&A application during the Linde Engineering internship.', tags: ['TypeScript', 'React', 'RAG', 'Linde Engineering'], githubUrl: 'https://github.com/Soham2212004' },
    { title: 'AV DEVS Client Applications', description: 'Delivered client-facing web applications with React and TypeScript at AV DEVS.', tags: ['TypeScript', 'React', 'Full Stack', 'AV DEVS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'SQL': [
    { title: 'LuxeStay', description: 'PostgreSQL with pgvector for RAG-based FAQ pipeline and booking data storage.', tags: ['PostgreSQL', 'pgvector', 'RAG'], githubUrl: 'https://github.com/Soham2212004/LuxeStay' },
    { title: 'TemporalRAG', description: 'PostgreSQL used alongside Redis for temporal document storage and retrieval.', tags: ['PostgreSQL', 'Redis', 'RAG'], githubUrl: 'https://github.com/Soham2212004/TemporalRAG' },
    { title: 'Linde Engineering RAG Chatbot', description: 'Used PostgreSQL and pgvector to store vector embeddings for the document Q&A application during the Linde Engineering internship.', tags: ['SQL', 'PostgreSQL', 'pgvector', 'Linde Engineering'], githubUrl: 'https://github.com/Soham2212004' },
    { title: 'AV DEVS Client Applications', description: 'Worked with SQLite and Google Cloud SQL for data storage across client applications at AV DEVS.', tags: ['SQL', 'SQLite', 'Cloud SQL', 'AV DEVS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Dart': [
    { title: 'AI Multitasker App', description: '19-tool Flutter mobile app built in Dart — powered by Gemini API and Stability AI.', tags: ['Dart', 'Flutter', 'Gemini API'], githubUrl: 'https://github.com/Soham2212004/AI-Multitasker' },
    { title: 'ML Models Collection', description: 'Used Dart and Flutter to build the mobile application interface for the machine learning models project.', tags: ['Dart', 'Flutter', 'Machine Learning'], githubUrl: 'https://github.com/Soham2212004/Ml_models' },
    { title: 'Road Accident Detection', description: 'Built the Flutter mobile app in Dart to receive accident notifications, view captured accident images, and call for assistance.', tags: ['Dart', 'Flutter', 'OpenCV', 'Emergency Alerts'], githubUrl: 'https://github.com/Soham2212004/Road-Accident-Detection-Alert-System' },
  ],
  'RAG Architecture': [
    { title: 'TemporalRAG', description: 'Time-aware RAG with LangGraph, exponential decay reranking, and conflict detection.', tags: ['RAG', 'LangGraph', 'Pinecone'], githubUrl: 'https://github.com/Soham2212004/TemporalRAG' },
    { title: 'LuxeStay', description: 'RAG-based hotel FAQ pipeline using pgvector and Gemini API.', tags: ['RAG', 'pgvector', 'Gemini'], githubUrl: 'https://github.com/Soham2212004/LuxeStay' },
    { title: 'Resume Analyzer', description: 'Vector similarity search using Pinecone embeddings for semantic job matching.', tags: ['RAG', 'Pinecone', 'Gemini'], githubUrl: 'https://github.com/Soham2212004/Resume-Analyzer-Job-Matcher' },
  ],
  'Large Language Models': [
    { title: 'TemporalRAG', description: 'LLM-powered 4-node LangGraph pipeline with temporal reasoning capabilities.', tags: ['LLM', 'LangGraph', 'Gemini'], githubUrl: 'https://github.com/Soham2212004/TemporalRAG' },
    { title: 'AI Document Analyzer', description: 'LLM-powered document Q&A — upload any file and query it in natural language.', tags: ['LLM', 'RAG', 'Gemini'], githubUrl: 'https://github.com/Soham2212004/AI-Document-Analyzer' },
    { title: 'AV DEVS Client Applications', description: 'Developed LLM workflows and production AI features across client applications at AV DEVS.', tags: ['LLM', 'Claude', 'OpenAI', 'AV DEVS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Agentic AI Development': [
    { title: 'AI-Agents Suite', description: '6 agentic n8n automation workflows — HireLens, DeskStock, CodeSage, and more.', tags: ['Agents', 'n8n', 'Gemini'], githubUrl: 'https://github.com/Soham2212004/AI-Agents' },
    { title: 'TemporalRAG', description: 'LangGraph agentic pipeline: QueryAnalyzer → Retriever → ConflictResolver → Synthesizer.', tags: ['Agents', 'LangGraph', 'RAG'], githubUrl: 'https://github.com/Soham2212004/TemporalRAG' },
  ],
  'Generative AI': [
    { title: 'Craftly.AI', description: 'Generative AI platform for creative content, copywriting, and structured text.', tags: ['Generative AI', 'Gemini', 'React'], githubUrl: 'https://github.com/Soham2212004/Craftly.AI' },
    { title: 'AI Multitasker App', description: 'Stability AI image generation + Gemini for 19 different AI tools in one Flutter app.', tags: ['Generative AI', 'Stability AI', 'Flutter'], githubUrl: 'https://github.com/Soham2212004/AI-Multitasker' },
  ],
  'Computer Vision (CNN)': [
    { title: 'Road Accident Detection', description: 'Real-time CNN and OpenCV system that captures accident images and sends notifications to a Flutter mobile app, where a person can review the incident and call for assistance.', tags: ['CV', 'CNN', 'OpenCV', 'Flutter'], githubUrl: 'https://github.com/Soham2212004/Road-Accident-Detection-Alert-System' },
    { title: 'ML Models Collection', description: 'CNN implementations for image classification and object detection tasks.', tags: ['CNN', 'PyTorch', 'TensorFlow'], githubUrl: 'https://github.com/Soham2212004/Ml_models' },
  ],
  'Prompt Engineering': [
    { title: 'AI-Agents Suite', description: 'Carefully engineered prompts for each of the 6 agents — resume screening, inventory, code commenting.', tags: ['Prompt Engineering', 'Gemini', 'n8n'], githubUrl: 'https://github.com/Soham2212004/AI-Agents' },
    { title: 'StudyGenius AI', description: 'Prompt chains for generating answers, related questions, and key-point extraction.', tags: ['Prompt Engineering', 'Gemini', 'React'], githubUrl: 'https://github.com/Soham2212004/StudyGenius-AI' },
    { title: 'AV DEVS Prompt Development', description: 'Used Ollama locally to test and refine prompts before using paid APIs, reducing unnecessary token usage and client costs.', tags: ['Prompt Engineering', 'Ollama', 'AV DEVS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Machine Learning': [
    { title: 'ML Models Collection', description: 'Classification, regression, clustering, and deep learning models with Scikit-Learn and PyTorch.', tags: ['ML', 'Scikit-Learn', 'PyTorch'], githubUrl: 'https://github.com/Soham2212004/Ml_models' },
    { title: 'Resume Analyzer', description: 'Embedding-based semantic similarity ML pipeline for job matching.', tags: ['ML', 'Embeddings', 'Pinecone'], githubUrl: 'https://github.com/Soham2212004/Resume-Analyzer-Job-Matcher' },
  ],
  'OCR (Tesseract)': [
    { title: 'AI Multitasker App', description: 'OCR text extractor tool — one of the 19 tools in the Flutter AI app using Tesseract.', tags: ['OCR', 'Tesseract', 'Flutter'], githubUrl: 'https://github.com/Soham2212004/AI-Multitasker' },
    { title: 'Linde Engineering Document Q&A', description: 'Implemented an OCR automation pipeline with Tesseract during the Linde Engineering internship.', tags: ['OCR', 'Tesseract', 'Document Processing', 'Linde Engineering'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'OpenCV': [
    { title: 'Road Accident Detection', description: 'Built a real-time OpenCV pipeline around CNN-based accident detection, captured accident images, and mobile notifications that let a person review the image and call for assistance.', tags: ['OpenCV', 'CNN', 'Python', 'Flutter'], githubUrl: 'https://github.com/Soham2212004/Road-Accident-Detection-Alert-System' },
  ],
  'Scikit-Learn': [
    { title: 'ML Models Collection', description: 'Implemented classification, regression, and clustering models with Scikit-Learn as part of a curated machine learning collection.', tags: ['Scikit-Learn', 'Classification', 'Regression', 'Clustering'], githubUrl: 'https://github.com/Soham2212004/Ml_models' },
  ],
  'PyTorch': [
    { title: 'ML Models Collection', description: 'Used PyTorch for deep learning model implementations alongside Scikit-Learn and TensorFlow.', tags: ['PyTorch', 'Deep Learning', 'Python'], githubUrl: 'https://github.com/Soham2212004/Ml_models' },
    { title: 'Road Accident Detection', description: 'Applied deep learning and CNN concepts to a real-time computer vision accident detection pipeline.', tags: ['PyTorch', 'CNN', 'Computer Vision'], githubUrl: 'https://github.com/Soham2212004/Road-Accident-Detection-Alert-System' },
  ],
  'TensorFlow': [
    { title: 'ML Models Collection', description: 'Implemented deep learning models with TensorFlow as part of a collection covering classification, regression, clustering, and neural networks.', tags: ['TensorFlow', 'Deep Learning', 'Python'], githubUrl: 'https://github.com/Soham2212004/Ml_models' },
  ],
  'n8n Automation': [
    { title: 'AI-Agents Suite', description: '6 fully automated n8n workflows — each a standalone production-ready AI agent.', tags: ['n8n', 'Automation', 'Gemini'], githubUrl: 'https://github.com/Soham2212004/AI-Agents' },
    { title: 'SafaaiBuddy', description: 'n8n webhook processes user submissions and triggers Pinecone vector search.', tags: ['n8n', 'Pinecone', 'JavaScript'], githubUrl: 'https://github.com/Soham2212004/SafaaiBuddy' },
    { title: 'AV DEVS Client Automations', description: 'Developed n8n automations and agentic systems for client workflows at AV DEVS.', tags: ['n8n', 'Agentic AI', 'Automation', 'AV DEVS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'React': [
    { title: 'Linde Engineering RAG Chatbot', description: 'Built the React UI for a RAG chatbot application during the Linde Engineering internship.', tags: ['React', 'RAG', 'Chatbot', 'Linde Engineering'], githubUrl: 'https://github.com/Soham2212004' },
    { title: 'AV DEVS Chrome Extension Website', description: 'Used React to build the website for a Chrome extension at AV DEVS.', tags: ['React', 'Chrome Extension', 'AV DEVS'], githubUrl: 'https://github.com/Soham2212004' },
    { title: 'LuxeStay', description: 'Full React + TypeScript frontend for hotel booking with role-based UI.', tags: ['React', 'TypeScript', 'FastAPI'], githubUrl: 'https://github.com/Soham2212004/LuxeStay' },
    { title: 'StudyGenius AI', description: 'React study assistant with Gemini API, image upload, and PDF export.', tags: ['React', 'Gemini API', 'jsPDF'], githubUrl: 'https://github.com/Soham2212004/StudyGenius-AI' },
    { title: 'Craftly.AI', description: 'React-based AI content generation platform.', tags: ['React', 'Gemini', 'Generative AI'], githubUrl: 'https://github.com/Soham2212004/Craftly.AI' },
  ],
  'FastAPI': [
    { title: 'Linde Engineering RAG Chatbot', description: 'Used FastAPI for the backend of the RAG chatbot application during the Linde Engineering internship.', tags: ['FastAPI', 'RAG', 'Chatbot', 'Linde Engineering'], githubUrl: 'https://github.com/Soham2212004' },
    { title: 'AV DEVS Client Applications', description: 'Used FastAPI to build backend APIs for client applications at AV DEVS.', tags: ['FastAPI', 'Backend', 'AV DEVS'], githubUrl: 'https://github.com/Soham2212004' },
    { title: 'LuxeStay', description: 'FastAPI backend with JWT auth, role-based endpoints, and pgvector RAG pipeline.', tags: ['FastAPI', 'PostgreSQL', 'JWT'], githubUrl: 'https://github.com/Soham2212004/LuxeStay' },
    { title: 'TemporalRAG', description: 'FastAPI serves the temporal RAG pipeline with LangGraph and Pinecone.', tags: ['FastAPI', 'LangGraph', 'Pinecone'], githubUrl: 'https://github.com/Soham2212004/TemporalRAG' },
  ],
  'PostgreSQL': [
    { title: 'Linde Engineering RAG Chatbot', description: 'Used PostgreSQL with pgvector to save vector embeddings for the RAG chatbot application during the Linde Engineering internship.', tags: ['PostgreSQL', 'pgvector', 'Vector Embeddings', 'Linde Engineering'], githubUrl: 'https://github.com/Soham2212004' },
    { title: 'LuxeStay', description: 'PostgreSQL with pgvector for RAG-based FAQ pipeline and booking data storage.', tags: ['PostgreSQL', 'pgvector', 'RAG'], githubUrl: 'https://github.com/Soham2212004/LuxeStay' },
    { title: 'TemporalRAG', description: 'PostgreSQL used alongside Redis for temporal document storage and retrieval.', tags: ['PostgreSQL', 'Redis', 'RAG'], githubUrl: 'https://github.com/Soham2212004/TemporalRAG' },
  ],
  'SQLite': [
    { title: 'AV DEVS Client Applications', description: 'Used SQLite for local data storage in client applications at AV DEVS.', tags: ['SQLite', 'Database', 'AV DEVS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Google Cloud SQL': [
    { title: 'AV DEVS Cloud Applications', description: 'Used Google Cloud SQL for managed relational database hosting at AV DEVS.', tags: ['Google Cloud SQL', 'PostgreSQL', 'AV DEVS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Git / GitHub': [
    { title: 'AV DEVS Client Projects', description: 'Used Git and GitHub for source control and collaboration across client projects at AV DEVS.', tags: ['Git', 'GitHub', 'AV DEVS'], githubUrl: 'https://github.com/Soham2212004' },
    { title: 'Linde Engineering RAG Chatbot', description: 'Used Git and GitHub while developing the RAG chatbot application during the Linde Engineering internship.', tags: ['Git', 'GitHub', 'Linde Engineering'], githubUrl: 'https://github.com/Soham2212004' },
    { title: 'Personal Projects', description: 'Use Git and GitHub to version, manage, and publish personal software projects.', tags: ['Git', 'GitHub', 'Personal Projects'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Bitbucket': [
    { title: 'AV DEVS Client Projects', description: 'Used Bitbucket for source control and collaboration across client projects at AV DEVS.', tags: ['Bitbucket', 'Git', 'AV DEVS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Django': [
    { title: 'AV DEVS Projects', description: 'Django used in client projects at AV DEVS Solutions — internal tools and AI-powered web apps.', tags: ['Django', 'Python', 'AWS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Flutter': [
    { title: 'AI Multitasker App', description: '19-tool Flutter mobile app — chatbot, OCR, image gen, travel planner, and more.', tags: ['Flutter', 'Dart', 'Gemini API'], githubUrl: 'https://github.com/Soham2212004/AI-Multitasker' },
  ],
  'Pinecone': [
    { title: 'TemporalRAG', description: 'Pinecone stores time-stamped document embeddings with decay-based reranking.', tags: ['Pinecone', 'RAG', 'LangGraph'], githubUrl: 'https://github.com/Soham2212004/TemporalRAG' },
    { title: 'Resume Analyzer', description: 'Pinecone vector search matches resume embeddings to job descriptions semantically.', tags: ['Pinecone', 'Gemini', 'Python'], githubUrl: 'https://github.com/Soham2212004/Resume-Analyzer-Job-Matcher' },
    { title: 'SafaaiBuddy', description: 'Pinecone powers market-relevant pricing lookup via vector similarity search.', tags: ['Pinecone', 'n8n', 'JavaScript'], githubUrl: 'https://github.com/Soham2212004/SafaaiBuddy' },
  ],
  'Firebase': [
    { title: 'AI Multitasker App', description: 'Firebase used for auth and data persistence across the 19-tool Flutter app.', tags: ['Firebase', 'Flutter', 'Dart'], githubUrl: 'https://github.com/Soham2212004/AI-Multitasker' },
  ],
  'Docker': [
    { title: 'LuxeStay', description: 'Docker Compose orchestrates React, FastAPI, PostgreSQL, and Nginx containers.', tags: ['Docker', 'Nginx', 'PostgreSQL'], githubUrl: 'https://github.com/Soham2212004/LuxeStay' },
    { title: 'AV DEVS Production Systems', description: 'Used Docker on AWS EC2 instances to package and run client applications consistently across AV DEVS deployments.', tags: ['Docker', 'EC2', 'AWS', 'Deployment'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Gemini API': [
    { title: 'LuxeStay', description: 'Gemini powers the role-aware AI chat concierge and RAG FAQ pipeline.', tags: ['Gemini', 'RAG', 'FastAPI'], githubUrl: 'https://github.com/Soham2212004/LuxeStay' },
    { title: 'AI-Agents Suite', description: 'All 6 agents powered by Gemini AI — resume screening, code commenting, MCQ generation.', tags: ['Gemini', 'n8n', 'Python'], githubUrl: 'https://github.com/Soham2212004/AI-Agents' },
    { title: 'AI Multitasker App', description: 'Gemini API drives 18 of the 19 tools in the Flutter app.', tags: ['Gemini', 'Flutter', 'Dart'], githubUrl: 'https://github.com/Soham2212004/AI-Multitasker' },
  ],
  'OpenAI API': [
    { title: 'Linde Engineering Internship', description: 'Built a RAG-based Q&A chatbot using OpenAI API, React, Azure, and FastAPI.', tags: ['OpenAI', 'RAG', 'Azure'], githubUrl: 'https://github.com/Soham2212004' },
  ],
   'Claude': [
     { title: 'AV DEVS Client Projects', description: 'Used Claude Code for development and Claude API keys across multiple client projects at AV DEVS.', tags: ['Claude', 'Claude Code', 'Anthropic API'], githubUrl: 'https://github.com/Soham2212004' },
   ],
  'Ollama': [
    { title: 'AV DEVS Prompt Development', description: 'Used Ollama locally to test and refine prompts through trial and error before switching to paid APIs, reducing unnecessary token usage and client costs.', tags: ['Ollama', 'Prompt Engineering', 'Local LLM'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'GitHub Copilot': [
    { title: 'AV DEVS Client Projects', description: 'Used GitHub Copilot for coding, inline coding assistance, and GitHub automation across client projects at AV DEVS.', tags: ['GitHub Copilot', 'AI Code', 'GitHub Automation'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Bolt': [
    { title: 'AV DEVS MVP Prototypes', description: 'Built multiple MVPs with Bolt to validate functionality and get initial client approval through working demos.', tags: ['Bolt', 'MVP', 'Rapid Prototyping'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Lovable': [
    { title: 'AV DEVS MVP Prototypes', description: 'Built multiple MVPs with Lovable to validate functionality and get initial client approval through working demos.', tags: ['Lovable', 'MVP', 'Rapid Prototyping'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Stability AI': [
    { title: 'AI Multitasker App', description: 'Stability AI powers the image generation tool — one of 19 tools in the Flutter app.', tags: ['Stability AI', 'Image Gen', 'Flutter'], githubUrl: 'https://github.com/Soham2212004/AI-Multitasker' },
  ],
  'Amazon Web Services (AWS)': [
    { title: 'AV DEVS Production Systems', description: 'Used AWS to deploy and maintain client applications at AV DEVS. The production setup used EC2 with Docker, S3 for storage and backups, RDS for PostgreSQL, SES for email delivery, and Route 53 for DNS.', tags: ['AWS', 'EC2', 'Docker', 'S3', 'RDS', 'SES', 'Route 53'], githubUrl: 'https://github.com/Soham2212004' },
  ],
   'AWS Bedrock': [
     { title: 'AV DEVS Secure AI Infrastructure', description: "Used AWS Bedrock to access Claude's API within the client's existing AWS infrastructure, keeping API credentials and client data inside a controlled environment instead of sending them outside the infrastructure.", tags: ['AWS Bedrock', 'Claude', 'AWS Security'], githubUrl: 'https://github.com/Soham2212004' },
   ],
  'Google Cloud Platform': [
    { title: 'AV DEVS Cloud Applications', description: 'Used Google Cloud at AV DEVS across client projects, including Cloud SQL, Compute Engine instances, and Vertex AI.', tags: ['Google Cloud', 'Cloud SQL', 'Compute Engine', 'Vertex AI'], githubUrl: 'https://github.com/Soham2212004' },
    { title: 'Gen AI Study Jams', description: 'Completed GCP Cloud Study Jam with hands-on practice using Google Cloud services and Vertex AI.', tags: ['GCP', 'Vertex AI', 'Cloud'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Microsoft Azure': [
    { title: 'Linde Engineering Document Q&A', description: 'Used Microsoft Azure during the Linde Engineering internship to support a document Q&A application, including Azure Blob Storage for documents and Microsoft Entra ID for identity and access.', tags: ['Azure', 'Blob Storage', 'Entra ID', 'RAG'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'EC2 / S3 / RDS': [
    { title: 'AV DEVS Production Systems', description: 'Deployed client applications on EC2 with Docker, used S3 for storage and backups, and ran PostgreSQL on Amazon RDS for managed database hosting.', tags: ['EC2', 'Docker', 'S3', 'PostgreSQL', 'RDS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'AWS SES': [
    { title: 'AV DEVS Client Applications', description: 'Used Amazon SES for transactional email delivery in client applications deployed through AV DEVS production infrastructure.', tags: ['AWS SES', 'Email Delivery', 'AWS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Amazon Route 53': [
    { title: 'AV DEVS Production Systems', description: 'Used Amazon Route 53 for DNS management and routing domains to client applications hosted on AWS.', tags: ['Route 53', 'DNS', 'AWS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Azure Blob Storage': [
    { title: 'Linde Engineering Document Q&A', description: 'Used Azure Blob Storage to store and retrieve documents for the document Q&A application built during the Linde Engineering internship.', tags: ['Azure', 'Blob Storage', 'Document Q&A'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Microsoft Entra ID': [
    { title: 'Linde Engineering Document Q&A', description: 'Used Microsoft Entra ID to support identity and access management for the Azure-hosted document Q&A application at Linde Engineering.', tags: ['Azure', 'Entra ID', 'Authentication'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'CloudWatch': [
    { title: 'AV DEVS Production Monitoring', description: 'Used Amazon CloudWatch to monitor AWS-hosted client applications and infrastructure as part of production operations at AV DEVS.', tags: ['CloudWatch', 'Monitoring', 'AWS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'CloudWatch Alarms': [
    { title: 'AV DEVS Production Monitoring', description: 'Configured CloudWatch alarms to surface important infrastructure and application conditions during AV DEVS client deployments.', tags: ['CloudWatch Alarms', 'Monitoring', 'AWS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'DNS Management': [
    { title: 'AV DEVS Production Systems', description: 'Managed application DNS with Amazon Route 53 for client deployments hosted on AWS. Also familiar with domain and DNS management through GoDaddy and Namecheap.', tags: ['DNS', 'Route 53', 'GoDaddy', 'Namecheap'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'GoDaddy': [
    { title: 'DNS and Domain Management', description: 'Familiar with using GoDaddy for domain registration and DNS management, alongside production DNS work with Amazon Route 53.', tags: ['GoDaddy', 'DNS', 'Domains'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Namecheap': [
    { title: 'DNS and Domain Management', description: 'Familiar with using Namecheap for domain registration and DNS management, alongside production DNS work with Amazon Route 53.', tags: ['Namecheap', 'DNS', 'Domains'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Cloud Infrastructure': [
    { title: 'AV DEVS Client Deployments', description: 'Worked across AWS and Google Cloud to deploy and maintain client applications, with containerized services, managed storage and databases, DNS, monitoring, and operational alerts.', tags: ['AWS', 'Google Cloud', 'Docker', 'Monitoring'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'CI/CD Pipelines': [
    { title: 'AV DEVS Delivery Workflows', description: 'Applied CI/CD practices to support repeatable delivery and maintenance of production client applications at AV DEVS.', tags: ['CI/CD', 'Deployment', 'DevOps'], githubUrl: 'https://github.com/Soham2212004' },
  ],
};

// ── Popup Component ───────────────────────────────────────────────────────────
function SkillPopup({ skillName, onClose }: { skillName: string; onClose: () => void }) {
  const related = skillProjects[skillName] ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10
                   bg-[#0a0f1a]/95 backdrop-blur-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
            <div>
              <p className="text-[10px] font-mono text-cyan-500/60 tracking-widest uppercase mb-0.5">SKILL MODULE</p>
              <h3 className="text-sm font-semibold text-white">{skillName}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center
                       text-white/40 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={13} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          {related.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xs font-mono text-white/30">NO LINKED PROJECTS YET — COMING IN v2.0</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-[10px] font-mono text-white/30 tracking-wider uppercase mb-3">
                {related.length} RELATED {related.length === 1 ? 'PROJECT' : 'PROJECTS'}
              </p>
              {related.map((proj) => (
                <div
                  key={proj.title}
                  className="rounded-xl border border-white/6 bg-white/[0.03]
                             hover:border-white/12 hover:bg-white/[0.05] transition-colors p-4"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="text-xs font-semibold text-white leading-snug">{proj.title}</h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer"
                         className="text-white/35 hover:text-cyan-400 transition-colors">
                        <Github size={13} />
                      </a>
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer"
                           className="text-white/35 hover:text-cyan-400 transition-colors">
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-white/45 leading-relaxed mb-2.5">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded
                                               bg-cyan-500/8 border border-cyan-500/15 text-cyan-400/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-5 pb-4">
          <p className="text-[9px] font-mono text-white/15 tracking-widest">CLICK ANYWHERE OUTSIDE TO CLOSE</p>
        </div>
      </div>
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────
const groups: SkillGroup[] = [
  {
    id: 'languages', icon: '⌨', title: 'Core Languages', subtitle: 'Engineering fluency', variant: 'bars',
    items: [
      { name: 'Python',                  level: 92, tag: 'ML / Backend' },
      { name: 'TypeScript / JavaScript', level: 85, tag: 'Full-Stack'  },
      { name: 'SQL',                     level: 78, tag: 'Data & DBs'  },
      { name: 'Dart',                    level: 65, tag: 'Mobile'      },
    ] as BarSkill[],
  },
  {
    id: 'ai-ml', icon: '◈', title: 'AI & ML Stack', subtitle: 'Models, inference & orchestration', variant: 'tags',
    items: [
      { name: 'RAG Architecture',       tier: 'primary'   },
      { name: 'Large Language Models',  tier: 'primary'   },
      { name: 'Agentic AI Development', tier: 'primary'   },
      { name: 'Generative AI',          tier: 'primary'   },
      { name: 'Computer Vision (CNN)',  tier: 'primary'   },
      { name: 'Prompt Engineering',     tier: 'primary'   },
      { name: 'Machine Learning',       tier: 'primary'   },
      { name: 'OCR (Tesseract)',        tier: 'secondary' },
      { name: 'OpenCV',                 tier: 'secondary' },
      { name: 'Scikit-Learn',           tier: 'secondary' },
      { name: 'PyTorch',                tier: 'secondary' },
      { name: 'TensorFlow',             tier: 'secondary' },
      { name: 'n8n Automation',         tier: 'secondary' },
    ] as TagSkill[],
  },
  {
    id: 'frameworks', icon: '▦', title: 'Frameworks & Data', subtitle: 'App layer, APIs & storage', variant: 'tools',
    items: [
      { name: 'React',            label: 'Frontend'        },
      { name: 'FastAPI',          label: 'Backend'         },
      { name: 'Django',           label: 'Backend'         },
      { name: 'Flutter',          label: 'Mobile'          },
      { name: 'PostgreSQL',       label: 'Database'        },
      { name: 'Firebase',         label: 'BaaS'            },
      { name: 'Pinecone',         label: 'Vector DB'       },
      { name: 'SQLite',           label: 'Database'        },
      { name: 'Google Cloud SQL', label: 'Database'        },
      { name: 'Docker',           label: 'DevOps'          },
      { name: 'Git / GitHub',     label: 'Version Control' },
      { name: 'Bitbucket',        label: 'Version Control' },
    ] as ToolSkill[],
  },
  {
    id: 'ai-tools', icon: '⬡', title: 'AI Tools & APIs', subtitle: 'Models and AI-assisted development', variant: 'tools',
    items: [
      { name: 'Gemini API',     label: 'Google'    },
      { name: 'OpenAI API',     label: 'OpenAI'    },
      { name: 'Claude',         label: 'Anthropic' },
      { name: 'Ollama',         label: 'Local LLM' },
      { name: 'Stability AI',   label: 'Image Gen' },
      { name: 'GitHub Copilot', label: 'AI Code'   },
      { name: 'Bolt',           label: 'AI Dev'    },
      { name: 'Lovable',        label: 'AI Dev'    },
    ] as ToolSkill[],
  },
  {
    id: 'cloud', icon: '⬢', title: 'Cloud & Infrastructure', subtitle: 'Deployment, DevOps & cloud platforms', variant: 'tags',
    items: [
      { name: 'Amazon Web Services (AWS)', tier: 'primary'   },
      { name: 'Google Cloud Platform',     tier: 'primary'   },
      { name: 'Microsoft Azure',           tier: 'primary'   },
      { name: 'EC2 / S3 / RDS',           tier: 'primary'   },
      { name: 'AWS Bedrock',               tier: 'primary'   },
      { name: 'Docker',                   tier: 'primary'   },
      { name: 'AWS SES',                   tier: 'secondary' },
      { name: 'Amazon Route 53',           tier: 'secondary' },
      { name: 'CloudWatch',                tier: 'secondary' },
      { name: 'CloudWatch Alarms',         tier: 'secondary' },
      { name: 'Azure Blob Storage',        tier: 'secondary' },
      { name: 'Microsoft Entra ID',        tier: 'secondary' },
      { name: 'Cloud Infrastructure',      tier: 'secondary' },
      { name: 'DNS Management',            tier: 'secondary' },
      { name: 'GoDaddy',                   tier: 'secondary' },
      { name: 'Namecheap',                 tier: 'secondary' },
      { name: 'CI/CD Pipelines',           tier: 'secondary' },
    ] as TagSkill[],
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function BarsCard({ items, onSkillClick }: { items: BarSkill[]; onSkillClick: (n: string) => void }) {
  return (
    <div className="space-y-5">
      {items.map((s) => (
        <div key={s.name} className="cursor-pointer group/bar" onClick={() => onSkillClick(s.name)}>
          {(() => {
            const evidenceCount = skillProjects[s.name]?.length ?? 0;
            return (
              <>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white/90 group-hover/bar:text-cyan-300 transition-colors">{s.name}</span>
              {s.tag && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{s.tag}</span>
              )}
            </div>
            <span className="text-[10px] font-mono text-white/30 group-hover/bar:text-cyan-400 transition-colors">{evidenceCount} LINKED PROJECT{evidenceCount === 1 ? '' : 'S'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((segment) => (
              <span
                key={segment}
                className={`h-1 flex-1 rounded-full ${segment < Math.min(5, evidenceCount) ? 'bg-cyan-400/70 group-hover/bar:bg-cyan-300' : 'bg-white/8'} transition-colors`}
              />
            ))}
          </div>
              </>
            );
          })()}
        </div>
      ))}
    </div>
  );
}

function TagsCard({ items, onSkillClick }: { items: TagSkill[]; onSkillClick: (n: string) => void }) {
  const primary   = items.filter((i) => i.tier !== 'secondary');
  const secondary = items.filter((i) => i.tier === 'secondary');
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {primary.map((i) => (
          <button key={i.name} onClick={() => onSkillClick(i.name)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
                       bg-cyan-500/10 text-cyan-300 border border-cyan-500/25
                       hover:bg-cyan-500/25 hover:border-cyan-400/50
                       hover:shadow-[0_0_12px_rgba(34,211,238,0.15)]
                       active:scale-95 transition-all cursor-pointer">
            <span className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
            {i.name}
          </button>
        ))}
      </div>
      {secondary.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
          {secondary.map((i) => (
            <button key={i.name} onClick={() => onSkillClick(i.name)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
                         bg-white/4 text-white/55 border border-white/8
                         hover:bg-white/10 hover:text-white/80 hover:border-white/15
                         active:scale-95 transition-all cursor-pointer">
              {i.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ToolsCard({ items, onSkillClick }: { items: ToolSkill[]; onSkillClick: (n: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((t) => (
        <button key={t.name} onClick={() => onSkillClick(t.name)}
          className="flex items-center justify-between px-3 py-2 rounded-lg text-left
                     bg-white/4 border border-white/8
                     hover:bg-cyan-500/8 hover:border-cyan-500/20
                     hover:shadow-[0_0_10px_rgba(34,211,238,0.08)]
                     active:scale-95 transition-all group">
          <span className="text-xs font-medium text-white/80 group-hover:text-cyan-300 transition-colors truncate">{t.name}</span>
          {t.label && (
            <span className="ml-2 text-[10px] font-mono text-white/35 flex-shrink-0 group-hover:text-cyan-400/70 transition-colors">{t.label}</span>
          )}
        </button>
      ))}
    </div>
  );
}

function SkillCard({ group, onSkillClick }: { group: SkillGroup; onSkillClick: (n: string) => void }) {
  return (
    <div className="relative rounded-xl border border-white/8 bg-white/[0.03] backdrop-blur-sm overflow-hidden
                    hover:border-white/14 transition-colors duration-300 group">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-start gap-3 px-5 pt-5 pb-4 border-b border-white/6">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20
                        flex items-center justify-center text-cyan-400 text-base leading-none">
          {group.icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">{group.title}</h3>
          <p className="text-[11px] font-mono text-white/35 mt-0.5">{group.subtitle}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-[9px] font-mono text-white/20 tracking-wider hidden sm:block">CLICK ANY SKILL</span>
          <span className="text-[10px] font-mono text-cyan-500/50 tracking-widest uppercase">
            {group.id.toUpperCase().replace('-', '_')}
          </span>
        </div>
      </div>
      <div className="px-5 py-4">
        {group.variant === 'bars'  && <BarsCard  items={group.items as BarSkill[]}  onSkillClick={onSkillClick} />}
        {group.variant === 'tags'  && <TagsCard  items={group.items as TagSkill[]}  onSkillClick={onSkillClick} />}
        {group.variant === 'tools' && <ToolsCard items={group.items as ToolSkill[]} onSkillClick={onSkillClick} />}
      </div>
      <div className="absolute bottom-3 right-4 text-[10px] font-mono text-white/10 select-none">
        {group.items.length} SKILLS
      </div>
    </div>
  );
}

const capabilityTracks = [
  {
    id: 'ai-systems',
    icon: BrainCircuit,
    label: 'AI systems',
    description: 'RAG, agents, LLM applications, generative tools, computer vision, and ML workflows that turn models into useful products.',
    skills: ['RAG Architecture', 'Large Language Models', 'Agentic AI Development', 'Generative AI', 'Computer Vision (CNN)', 'Prompt Engineering', 'Machine Learning', 'OCR (Tesseract)'],
    accent: 'text-cyan-300',
  },
  {
    id: 'product-engineering',
    icon: Code2,
    label: 'Product engineering',
    description: 'Python and TypeScript applications, APIs, SQL data layers, and Flutter mobile experiences built from idea through delivery.',
    skills: ['Python', 'TypeScript / JavaScript', 'SQL', 'Dart', 'React', 'FastAPI', 'Flutter'],
    accent: 'text-indigo-300',
  },
  {
    id: 'cloud-delivery',
    icon: CloudCog,
    label: 'Cloud delivery',
    description: 'Client systems delivered with AWS and Google Cloud infrastructure, Azure document services, containers, managed databases, and automation.',
    skills: ['Amazon Web Services (AWS)', 'Google Cloud Platform', 'Microsoft Azure', 'Docker', 'PostgreSQL', 'n8n Automation'],
    accent: 'text-emerald-300',
  },
];

const groupIcons = {
  languages: Code2,
  'ai-ml': BrainCircuit,
  frameworks: Layers3,
  'ai-tools': Sparkles,
  cloud: CloudCog,
};

// ── Page ─────────────────────────────────────────────────────────────────────
export default function SkillsPage() {
  const [comingSoon, setComingSoon] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [activeTrack, setActiveTrack] = useState('ai-systems');
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();
  const visibleGroups = groups.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.name.toLowerCase().includes(normalizedQuery)),
  })).filter((group) => group.items.length > 0);
  const totalSkills = groups.reduce((total, group) => total + group.items.length, 0);
  const linkedProjects = projects.length;

  const selectSkill = (skill: string) => {
    setActiveSkill(skill);
    const matchingTrack = capabilityTracks.find((track) => track.skills.includes(skill));
    if (matchingTrack) setActiveTrack(matchingTrack.id);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-obsidian-950">
      <NeuralBackground />
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern bg-grid-40 opacity-30" />
      <div className="fixed inset-0 pointer-events-none bg-radial-glow opacity-50" />

      <div className="relative z-10">
        <Navbar onComingSoon={() => setComingSoon(true)} />

        <main className="pt-24 pb-20">
          <section className="mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 lg:px-8">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl animate-fade-up">
                <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5">
                  <GitBranch size={13} className="text-cyan-300" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300">Engineering capability map</span>
                </div>
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">Skills with <span className="text-cyan-300 text-glow">receipts.</span></h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-400 sm:text-lg">A practical view of the technologies I use to design, build, and ship AI-powered software. Every highlighted capability connects to real project work.</p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:w-[380px]">
                {[
                  ['Skills indexed', totalSkills.toString()],
                  ['Projects linked', linkedProjects.toString()],
                  ['Focus tracks', capabilityTracks.length.toString()],
                ].map(([label, value]) => (
                  <div key={label} className="border-l border-cyan-400/30 pl-3 py-2">
                    <p className="text-2xl font-semibold text-white">{value}</p>
                    <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-steel-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-obsidian-900/60 shadow-[0_20px_80px_rgba(0,0,0,0.22)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-4 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                    <GitBranch size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400/70">Capability index</p>
                    <p className="mt-1 text-xs text-steel-500">Select a track to inspect its working surface</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-steel-600">03 focus tracks // live</span>
              </div>

              <div className="grid lg:grid-cols-[220px_1fr]">
                <nav className="border-b border-white/8 p-3 lg:border-b-0 lg:border-r lg:p-4" aria-label="Capability tracks">
                  <div className="space-y-2">
                    {capabilityTracks.map((track, index) => {
                      const Icon = track.icon;
                      const selected = activeTrack === track.id;
                      return (
                        <button key={track.id} onClick={() => { setActiveTrack(track.id); setActiveSkill(null); }} className={`group flex w-full items-center gap-3 border px-3 py-3 text-left transition-all ${selected ? 'border-cyan-400/40 bg-cyan-400/10' : 'border-transparent hover:border-white/10 hover:bg-white/[0.04]'}`}>
                          <span className={`font-mono text-[10px] ${selected ? 'text-cyan-300' : 'text-steel-600'}`}>0{index + 1}</span>
                          <Icon size={16} className={selected ? 'text-cyan-300' : 'text-steel-500 group-hover:text-cyan-300'} />
                          <span className={`text-xs font-semibold ${selected ? 'text-white' : 'text-steel-400 group-hover:text-white'}`}>{track.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-5 hidden border-t border-white/8 pt-4 lg:block">
                    <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-steel-600">System status</p>
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-emerald-300">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      EVIDENCE LINKED
                    </div>
                  </div>
                </nav>

                <div className="p-5 sm:p-7">
                  {capabilityTracks.filter((track) => track.id === activeTrack).map((track) => {
                    const Icon = track.icon;
                    return (
                      <div key={track.id}>
                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                          <div className="max-w-xl">
                            <div className="flex items-center gap-2 text-cyan-300">
                              <Icon size={18} />
                              <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Active capability track</span>
                            </div>
                            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{track.label}</h2>
                            <p className="mt-3 text-sm leading-relaxed text-steel-400">{track.description}</p>
                          </div>
                          <div className="border-l border-cyan-400/30 pl-3 sm:min-w-[100px]">
                            <p className="text-2xl font-semibold text-white">{track.skills.length}</p>
                            <p className="mt-1 text-[9px] font-mono uppercase tracking-wider text-steel-500">Capabilities</p>
                          </div>
                        </div>

                        <div className="mt-8 border-t border-white/8 pt-5">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-steel-500">Capability nodes</p>
                            <p className="text-[10px] font-mono text-cyan-400/60">CLICK TO TRACE</p>
                          </div>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {track.skills.map((skill, index) => {
                              const selected = activeSkill === skill;
                              return (
                                <button key={skill} onClick={() => selectSkill(skill)} className={`group flex min-h-[58px] items-center justify-between gap-3 border px-3 py-3 text-left transition-all ${selected ? 'border-cyan-400/50 bg-cyan-400/10' : 'border-white/8 bg-white/[0.02] hover:border-cyan-400/30 hover:bg-cyan-400/5'}`}>
                                  <span className="flex items-center gap-3">
                                    <span className={`font-mono text-[10px] ${selected ? 'text-cyan-300' : 'text-steel-600'}`}>{String(index + 1).padStart(2, '0')}</span>
                                    <span className={`text-xs ${selected ? 'font-semibold text-white' : 'text-steel-300 group-hover:text-white'}`}>{skill}</span>
                                  </span>
                                  <ArrowUpRight size={14} className={selected ? 'text-cyan-300' : 'text-steel-600 group-hover:text-cyan-300'} />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400/70">The stack</p>
                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Tools I can put to work.</h2>
              </div>
              <label className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 sm:w-64">
                <Search size={15} className="text-steel-500" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter skills" className="w-full bg-transparent text-xs text-white outline-none placeholder:text-steel-600" />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {visibleGroups.map((group) => {
                const Icon = groupIcons[group.id as keyof typeof groupIcons];
                return (
                  <div key={group.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-colors hover:border-cyan-400/20">
                    <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-4">
                      <div className="flex items-center gap-3">
                        <Icon size={18} className="text-cyan-300" />
                        <div>
                          <h3 className="text-sm font-semibold text-white">{group.title}</h3>
                          <p className="mt-1 text-xs text-steel-500">{group.subtitle}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-steel-600">{group.items.length} ITEMS</span>
                    </div>
                    <div className="mt-4">
                      {group.variant === 'bars' && <BarsCard items={group.items as BarSkill[]} onSkillClick={selectSkill} />}
                      {group.variant === 'tags' && <TagsCard items={group.items as TagSkill[]} onSkillClick={selectSkill} />}
                      {group.variant === 'tools' && <ToolsCard items={group.items as ToolSkill[]} onSkillClick={selectSkill} />}
                    </div>
                  </div>
                );
              })}
            </div>
            {visibleGroups.length === 0 && <p className="rounded-xl border border-dashed border-white/10 py-10 text-center text-sm text-steel-500">No matching skills found.</p>}
          </section>

          <div className="mx-auto mt-10 flex max-w-6xl items-center gap-2 px-4 text-[10px] font-mono uppercase tracking-wider text-steel-600 sm:px-6 lg:px-8">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Project evidence linked · select a capability to inspect the work behind it
          </div>
        </main>

        <Footer />
      </div>

      {activeSkill && <SkillPopup skillName={activeSkill} onClose={() => setActiveSkill(null)} />}
      <ComingSoonModal open={comingSoon} onClose={() => setComingSoon(false)} />
    </div>
  );
}