# Soham Soni — Portfolio

Personal portfolio of **Soham Soni**, a Software Engineer specializing in Applied AI and Full-Stack development. The site presents my experience, projects, technical skills, certifications, education, and an interactive resume assistant powered by retrieval-augmented generation.

**Live portfolio:** [soham-soni.vercel.app](https://soham-soni.vercel.app)

## About

I build practical AI-powered software by combining large language models, RAG systems, agentic workflows, computer vision, automation, and full-stack engineering.

- **Current role:** Software Engineer at AV DEVS Solutions Pvt. Ltd., Vadodara
- **Education:** B.Tech in Computer Science Engineering, Parul University
- **Experience:** Applied AI, full-stack development, n8n automation, cloud delivery, and computer vision
- **Location:** Vadodara, Gujarat, India

## Highlights

- 13+ published GitHub projects
- 24+ certifications and learning credentials
- Production AI features and automation workflows
- Six-agent n8n AI and automation suite
- RAG, LLM, agentic AI, OCR, and computer vision projects
- React, FastAPI, Django, Flutter, PostgreSQL, AWS, Azure, and GCP experience

## Portfolio Features

- Responsive personal portfolio with animated neural-style visuals
- Dedicated pages for experience, projects, skills, certifications, and contact
- Interactive AI Studio with a resume-aware question-answering chatbot
- Browser-side text embeddings with precomputed resume vectors
- Groq-powered natural-language answers
- Interactive MLP and attention visualizations
- Downloadable resume and external social profile links
- Mobile-friendly interface

## Featured Projects

| Project | Summary | Stack |
|---|---|---|
| [LuxeStay](https://github.com/Soham2212004/LuxeStay) | Role-aware AI hotel booking system with RAG FAQ support | React, FastAPI, PostgreSQL, pgvector, Gemini, Docker |
| [TemporalRAG](https://github.com/Soham2212004/TemporalRAG) | Time-aware RAG with conflict detection and point-in-time queries | LangGraph, Pinecone, Gemini, FastAPI, Redis |
| [AI-Agents](https://github.com/Soham2212004/AI-Agents) | Suite of six n8n automation agents for hiring, stock, docs, and learning | n8n, Gemini, Python, RAG |
| [Resume Analyzer & Job Matcher](https://github.com/Soham2212004/Resume-Analyzer-Job-Matcher) | Semantic resume analysis and ranked job matching | Python, Streamlit, Gemini, Pinecone |
| [AI Multitasker](https://github.com/Soham2212004/AI-Multitasker) | Cross-platform app with 19 AI-powered tools | Flutter, Dart, Gemini, Stability AI, Firebase |
| [Road Accident Detection](https://github.com/Soham2212004/Road-Accident-Detection-Alert-System) | Real-time accident detection with incident alerts | Python, OpenCV, Computer Vision, Flutter |
| [SafaaiBuddy](https://github.com/Soham2212004/SafaaiBuddy) | AI-powered cleaning estimates using vector search | n8n, Pinecone, JavaScript |

Additional projects include StudyGenius AI, Craftly.AI, AI Document Analyzer, Personal Assistant, Financial Advisor, and a collection of machine learning implementations.

## Tech Stack

**Frontend**

- React 18
- TypeScript
- JavaScript
- Tailwind CSS
- React Router
- Lucide React

**AI and ML**

- Python
- RAG architecture
- LangGraph
- Gemini, OpenAI, and Claude APIs
- Ollama
- AWS Bedrock
- n8n
- Xenova Transformers
- Pinecone and pgvector
- Scikit-Learn, PyTorch, TensorFlow
- OpenCV and OCR

**Backend and Data**

- FastAPI
- Django
- PostgreSQL
- SQLite
- Redis
- Firebase
- REST APIs

**Cloud and Delivery**

- AWS
- Google Cloud Platform
- Microsoft Azure
- Docker
- CI/CD
- Vercel

## Resume Assistant

The AI Studio uses resume-specific text chunks and precomputed embeddings. It converts the user's question into an embedding in the browser, retrieves the most relevant resume sections, and sends the retrieved context to the Groq API for a focused response.

The embedding model is loaded in the browser through Xenova Transformers. Precomputed chunk embeddings are stored in `src/data/resume-embeddings.json`.

## Local Development

### Prerequisites

- Node.js 18 or newer
- npm
- A Groq API key for the resume chatbot

### Installation

```bash
git clone https://github.com/Soham2212004/Latest_Portfolio.git
cd Latest_Portfolio
npm install
```

### Environment

Create a `.env` file in the project root:

```env
VITE_GROQ_API_KEY=your_groq_api_key
```

Do not commit `.env` or expose API keys in client-side code. For a public deployment, use server-side secrets or a backend proxy before using a production key.

### Run

```bash
npm run dev
```

Open the URL printed by Vite, typically `http://localhost:5173`.

### Other Commands

```bash
npm run build
npm run preview
npm run typecheck
npm run lint
```

### Regenerate Resume Embeddings

After updating `src/data/resume.ts`, run:

```bash
npx tsx scripts/precompute-embeddings.ts
```

## Project Structure

```text
src/
  Pages/       Route-level portfolio pages
  components/  Shared UI and resume chatbot components
  data/        Resume, portfolio content, and embeddings
  lib/         Transformers pipeline singleton
  assets/      Images and static visual assets
public/        Public images and icons
scripts/       Resume embedding generation
```

## Contact

- **Email:** [sonisoham91@gmail.com](mailto:sonisoham91@gmail.com)
- **Phone:** [+91 97234 41407](tel:+919723441407)
- **LinkedIn:** [linkedin.com/in/sohamsoni220104](https://www.linkedin.com/in/sohamsoni220104)
- **GitHub:** [github.com/Soham2212004](https://github.com/Soham2212004)
- **Portfolio:** [soham-soni.vercel.app](https://soham-soni.vercel.app)

## License

This repository contains a personal portfolio. Review and update licensing before reusing substantial portfolio content or assets.
