// Resume content used for retrieval.
// IMPORTANT: Each independent fact/topic is separated by a line containing only "---".
// Each block becomes one retrievable chunk.
// Keep one topic per block for best retrieval accuracy.

export const RESUME_TEXT = `
Soham Soni is an AI-focused Software Engineer based in Vadodara, India, with hands-on experience integrating AI coding tools into real production workflows. He specializes in Python, TypeScript/JavaScript, prompt engineering, LLM governance, and CI/CD pipelines.
---
Soham has hands-on experience using GitHub Copilot and Claude Code for coding, inline coding help, and production engineering workflows.
---
Soham has experience building reusable AI development patterns, automating complex processes using n8n, and enabling non-traditional developers to build secure, production-ready AI solutions.
---
Soham has experience establishing governance guardrails and validation processes for AI-generated code, including defining engineering best practices and reusable prompt libraries.
---
Soham has experience integrating AI automation into legacy systems using n8n workflows.
---
Soham has experience deploying and maintaining services on AWS, including applications using PostgreSQL hosted on Amazon RDS.
---
Soham has experience coaching and enabling team members to use AI coding tools effectively and securely, with the goal of reducing onboarding time and improving code consistency.
---
Soham worked as a Software Engineer – AI Integration at AV DEVS Solutions Pvt. Ltd. in Vadodara, India (remote), from August 2025 to the present.
---
At AV DEVS Solutions Pvt. Ltd., Soham uses GitHub Copilot for coding, inline coding help, and GitHub automation, and uses Claude Code for development.
---
At AV DEVS Solutions Pvt. Ltd., Soham establishes governance guardrails and validation processes for AI-generated code and defines best practices and reusable prompt libraries for the engineering team.
---
At AV DEVS Solutions Pvt. Ltd., Soham integrates AI automation into legacy systems using n8n workflows and deploys and maintains services on AWS with PostgreSQL on Amazon RDS.
---
At AV DEVS Solutions Pvt. Ltd., Soham enables and coaches team members on the effective and secure use of AI coding tools, helping reduce onboarding time and improve code consistency.
---
At AV DEVS Solutions Pvt. Ltd., Soham built a Chrome extension using the Gemini API to capture webpage content and let users ask questions directly through a chat interface.
---
At AV DEVS Solutions Pvt. Ltd., Soham used OpenAI APIs for a booking application and for a chatbot supporting drivers.
---
At AV DEVS Solutions Pvt. Ltd., Soham used Claude API keys across multiple client projects.
At AV DEVS Solutions Pvt. Ltd., Soham used AWS Bedrock to access Claude's API within a client's existing AWS infrastructure, keeping API credentials and client data inside a controlled environment and avoiding unnecessary exposure outside the client's infrastructure.
---
At AV DEVS Solutions Pvt. Ltd., Soham used Ollama locally to test and refine prompts through trial and error before using paid API keys. This workflow reduced unnecessary token usage and helped save costs for clients.
---
Soham used Bolt and Lovable to build multiple MVPs for initial client approval, functionality validation, and demo purposes.
---
Soham previously worked as a Software Engineering Intern at Linde Engineering India Pvt. Ltd. in Vadodara, India, from December 2024 to April 2025.
---
During his internship at Linde Engineering India Pvt. Ltd., Soham built a full-stack document Q&A web application using React, FastAPI with Python, PostgreSQL, and Azure Blob Storage.
---
Soham's document Q&A application at Linde Engineering India Pvt. Ltd. used Retrieval-Augmented Generation (RAG) architecture and OpenAI APIs to answer questions from uploaded documents.
---
During his internship at Linde Engineering India Pvt. Ltd., Soham implemented an OCR automation pipeline using Tesseract.
---
Soham applied secure coding practices and ensured compliance across data flows while working on document-processing and AI applications at Linde Engineering India Pvt. Ltd.
---
Soham built an AI Agents – n8n Automation Suite using Python, n8n, Gemini API, and RAG architecture.
---
The AI Agents – n8n Automation Suite contains five production-ready AI agents: a resume screener, an inventory chatbot, a RAG documentation Q&A agent, an AI code commenter called CodeSage, and a structured PDF data extractor.
---
Soham designed reusable n8n workflow templates for the five AI agents in his AI Agents – n8n Automation Suite.
---
Soham defined prompt libraries, input validation patterns, and output guardrails for his AI agents to ensure safe and consistent AI-generated outputs.
---
Soham built an AI Multitasker App using Flutter, TypeScript, Gemini API, and Firebase.
---
The AI Multitasker App contains 19 AI-powered tools, including a chatbot, code explainer, and multiple content-generation tools, within a cross-platform Flutter application.
---
Soham integrated Firebase authentication into the AI Multitasker App.
---
Soham integrated Stability AI image generation into the AI Multitasker App.
---
Soham implemented PDF generation functionality in the AI Multitasker App.
---
Soham built a Road Accident Detection System using Python, CNN, OpenCV, and Firebase.
---
The Road Accident Detection System uses a real-time CNN and OpenCV-based accident detection pipeline.
---
Soham implemented automated Twilio alerts in the Road Accident Detection System to notify users when an accident is detected.
---
Soham used Firebase cloud storage as part of the Road Accident Detection System.
---
Soham designed the Road Accident Detection System as a production-ready machine learning pipeline.
---
Soham's programming skills include Python.
---
Soham's programming skills include TypeScript and JavaScript.
---
Soham has experience with React.
---
Soham has experience with FastAPI and Python-based backend development.
---
Soham has expertise in prompt engineering.
---
Soham has professional experience with GitHub Copilot, Claude Code, Claude APIs, Gemini API, and OpenAI APIs.
---
Soham has experience with LLM governance.
---
Soham has experience with n8n automation and workflow development.
---
Soham has experience designing and implementing Retrieval-Augmented Generation (RAG) architectures.
---
Soham has experience with CI/CD pipelines.
---
Soham has experience with AWS, Azure, and Google Cloud Platform (GCP).
---
Soham has experience with PostgreSQL and Amazon RDS.
---
Soham follows secure coding practices.
---
Soham has experience with machine learning.
---
Soham has experience with API integration.
---
Soham has experience with code review.
---
Soham has experience enabling and coaching teams on AI development practices and tools.
---
Soham holds the Oracle Cloud Infrastructure 2024 Generative AI Certified Professional certification from Oracle.
---
Soham completed the Build AI Agents and Chatbots with LangGraph course through LinkedIn Learning.
---
Soham completed Advanced Machine Learning Training through Edunet Foundation.
---
Soham participated in Google Cloud Generative AI Study Jams through GDG.
---
Soham holds the Oracle Fusion Cloud HCM Certified Foundations Associate certification from Oracle, earned in 2025.
---
Soham completed a B.Tech in Computer Science Engineering from Parul University from 2021 to 2025.
---
Soham graduated from Parul University with a CGPA of 7.63.
---
Soham's education is in Computer Science Engineering.
---
Soham is based in Vadodara, India.
---
Soham's professional focus is on AI integration, AI-assisted software engineering, AI automation, LLM applications, RAG systems, and production-ready AI solutions.
---
Soham can be reached by email at sonisoham91@gmail.com.
---
Soham's phone number is +91-9723441407.
---
Soham's LinkedIn profile is linkedin.com/in/sohamsoni220104.
---
Soham's portfolio website is soham-soni.vercel.app.
`;

export function getResumeChunks(): string[] {
  return RESUME_TEXT
    .split(/\n-{3,}\n/)
    .map((c) => c.trim())
    .filter((c) => c.length > 0 && !c.startsWith('['));
}