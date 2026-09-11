// Resume content used by the retrieval-augmented resume assistant.
// Keep one independent fact or topic per block so each block becomes a focused
// embedding chunk. Regenerate resume-embeddings.json after changing this file.

export const RESUME_TEXT = `
Soham Soni is a Software Engineer and AI Systems Developer based in Vadodara, Gujarat, India.
---
Soham's professional focus is practical AI integration, LLM applications, retrieval-augmented generation (RAG), agentic systems, AI automation, computer vision, and full-stack product engineering.
---
Soham's core programming languages are Python, TypeScript, JavaScript, SQL, and Dart.
---
Soham earned a B.Tech in Computer Science Engineering from Parul University from 2021 to 2025, graduating with a CGPA of 7.63.
---
Soham currently works as a Software Engineer at AV DEVS Solutions Pvt. Ltd. in Vadodara, India, from August 2025 to the present.
---
At AV DEVS, Soham develops production AI features, LLM workflows, agentic systems, and n8n automations for client applications.
---
At AV DEVS, Soham built a Chrome extension with the Gemini API that captures webpage content and lets users ask questions through chat.
---
At AV DEVS, Soham used OpenAI APIs for a booking application and a chatbot supporting drivers.
---
At AV DEVS, Soham used Claude APIs across multiple client projects and used Claude Code for software development.
---
At AV DEVS, Soham used AWS Bedrock to access Claude's API inside a client's existing AWS infrastructure, keeping credentials and client data within a controlled environment.
---
At AV DEVS, Soham used Ollama locally to test and refine prompts before using paid APIs, helping reduce unnecessary token usage and client costs.
---
At AV DEVS, Soham used Bolt and Lovable to build MVPs for early client approval and functionality demonstrations.
---
At AV DEVS, Soham delivered full-stack applications using React, FastAPI, Django, AWS, Docker, and cloud databases.
---
Soham works with Python for AI applications, backend APIs, RAG pipelines, automation workflows, and machine learning projects.
---
Soham works with TypeScript and JavaScript for React interfaces, web applications, browser experiences, and frontend integrations.
---
Soham works with SQL, PostgreSQL, SQLite, Google Cloud SQL, and pgvector for application data and vector retrieval.
---
Soham works with Dart and Flutter for cross-platform mobile applications, including AI Multitasker and the Road Accident Detection mobile app.
---
Soham previously worked as an Artificial Intelligence Intern at Linde Engineering India Pvt. Ltd. in Vadodara from December 2024 to April 2025.
---
At Linde Engineering, Soham built a full-stack document question-answering application with React, FastAPI, Python, PostgreSQL, and Azure Blob Storage.
---
The Linde Engineering document question-answering application used RAG architecture and OpenAI APIs to answer questions about uploaded documents.
---
At Linde Engineering, Soham implemented an OCR automation pipeline using Tesseract.
---
At Linde Engineering, Soham applied secure coding practices to document processing and AI application data flows.
---
Soham worked as a Freelance Web Developer for independent and local businesses from January 2024 to the present.
---
As a freelance web developer, Soham builds and deploys responsive websites, manages updates and performance, and handles domain setup, hosting, and basic SEO.
---
Soham completed a Summer Internship at byteXL in Vadodara from May 2024 to June 2024, focused on data structures, algorithms, and cloud fundamentals.
---
Soham completed a Cloud Computing Internship with UniConverge Technologies remotely from April 25, 2024 to June 15, 2024, focused on cloud architecture and Microsoft Azure.
---
Soham completed a Web Development and Designing Internship with Oasis Infobyte remotely in September 2023.
---
Soham completed a Data Science and Machine Learning Internship with YBI Foundation remotely in January 2024.
---
Soham built LuxeStay, a full-stack hotel booking system with a role-aware AI chat concierge.
---
LuxeStay uses React, FastAPI, PostgreSQL with pgvector, Gemini API, JWT authentication, Nginx, and Docker Compose.
---
LuxeStay includes a RAG-based hotel FAQ pipeline and lets guests book through a dashboard or natural-language chat.
---
Soham built TemporalRAG, a time-aware RAG system with LangGraph, Pinecone, Gemini API, FastAPI, Redis, exponential decay reranking, contradiction detection, and point-in-time queries.
---
Soham built AI-Agents, a suite of six production n8n automation agents using Python, Gemini AI, and RAG architecture.
---
The six AI-Agents are HireLens_AI for resume screening, DeskStock_AI for inventory management, PyDrift_AI for Python documentation, CodeSage_AI for code commenting, InsightBoard_AI for document-to-CSV extraction, and AutoTutor_AI for PDF-based MCQ generation.
---
Soham designed reusable n8n workflow templates, prompt libraries, input validation patterns, and output guardrails for the AI-Agents suite.
---
Soham built Resume Analyzer and Job Matcher, a Streamlit application that generates Gemini embeddings and uses Pinecone vector similarity to rank jobs against uploaded resumes.
---
Resume Analyzer and Job Matcher produces ranked job matches, cover letters, interview questions, and skill gap analysis.
---
Soham built AI Multitasker, a cross-platform Flutter mobile application with 19 AI-powered tools using Dart, Gemini API, Firebase, and Stability AI.
---
AI Multitasker includes a chatbot, code explainer, study buddy, interview coach, travel planner, content generation tools, image generation, resume builder, OCR extractor, and PDF generation.
---
Soham built Road Accident Detection, a real-time computer vision system using Python, CNN concepts, OpenCV, Firebase, and Flutter.
---
Road Accident Detection captures an accident image and sends an alert notification to the Flutter mobile app so a person can review the image and call for assistance.
---
Road Accident Detection uses automated alerts and mobile incident handling to help connect an identified accident with an assistance response.
---
Soham built SafaaiBuddy, an AI-powered deep-cleaning estimation application using JavaScript, n8n webhooks, Pinecone vector search, and market-relevant pricing data.
---
Soham built StudyGenius AI, a React and TypeScript study assistant using Gemini API, image input, session history, and PDF export.
---
Soham built Craftly.AI, a React and Python generative AI platform using Gemini API for creative content, copywriting, and structured text.
---
Soham built AI Document Analyzer, a Python and Gemini application that uses LLM-powered extraction, summarization, and document question answering.
---
Soham built Personal Assistant, a Python conversational assistant using Gemini API for task management, reminders, and general questions.
---
Soham built Financial Advisor, a Gemini-powered application that provides AI-generated financial guidance, budgeting plans, and investment suggestions.
---
Soham built ML Models Collection, which covers classification, regression, clustering, and deep learning implementations using Scikit-Learn, TensorFlow, and PyTorch.
---
Soham used Dart and Flutter for the ML Models mobile application and for the Road Accident Detection mobile application.
---
Soham's AI and machine learning skills include RAG Architecture, Large Language Models, Agentic AI Development, Generative AI, Prompt Engineering, Machine Learning, Computer Vision, CNNs, OCR, and model integration.
---
Soham's AI tooling experience includes Gemini API, OpenAI API, Claude, AWS Bedrock, Ollama, Stability AI, GitHub Copilot, and Claude Code.
---
Soham's computer vision experience includes CNN-based accident detection, real-time OpenCV processing, captured incident images, mobile notifications, and assistance workflows.
---
Soham's OCR experience includes implementing a Tesseract automation pipeline during the Linde Engineering internship and building an OCR extractor in AI Multitasker.
---
Soham's machine learning tools include Scikit-Learn, PyTorch, TensorFlow, Python, embeddings, vector search, and model deployment workflows.
---
Soham's cloud and delivery experience includes AWS, EC2, S3, RDS, SES, Route 53, Google Cloud Platform, Cloud SQL, Vertex AI, Microsoft Azure, Azure Blob Storage, Docker, and CI/CD practices.
---
Soham's backend and data experience includes FastAPI, Django, PostgreSQL, pgvector, Redis, SQLite, Firebase, Pinecone, REST APIs, and API integration.
---
Soham's certifications and learning records include Oracle Cloud Infrastructure 2024 Generative AI Certified Professional.
---
Soham completed the Build AI Agents and Chatbots with LangGraph course through LinkedIn Learning.
---
Soham completed Advanced Machine Learning Training through Edunet Foundation.
---
Soham participated in Google Cloud Generative AI Study Jams through GDG.
---
Soham holds the Oracle Fusion Cloud HCM Certified Foundations Associate certification, earned in 2025.
---
Soham also holds learning and participation records in Google Cloud, machine learning, data analytics, cybersecurity, software engineering, web development, cloud computing, programming, hackathons, innovation, and technical events.
---
Soham has published 13 portfolio projects on GitHub, including AI, RAG, automation, mobile, computer vision, web, and machine learning projects.
---
Soham has shipped a six-agent AI and n8n automation suite.
---
Soham can be contacted at sonisoham91@gmail.com or +91 97234 41407.
---
Soham's LinkedIn profile is linkedin.com/in/sohamsoni220104.
---
Soham's GitHub profile is github.com/Soham2212004.
---
Soham's portfolio website is soham-soni.vercel.app.
`;

export function getResumeChunks(): string[] {
  return RESUME_TEXT
    .split(/\n-{3,}\n/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0 && !chunk.startsWith('['));
}
