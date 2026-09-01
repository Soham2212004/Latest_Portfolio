import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';
import { X, Github, ExternalLink } from 'lucide-react';

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
  ],
  'TypeScript / JavaScript': [
    { title: 'LuxeStay', description: 'Full-stack hotel booking app — React (TypeScript) frontend with FastAPI backend.', tags: ['TypeScript', 'React', 'FastAPI'], githubUrl: 'https://github.com/Soham2212004/LuxeStay' },
    { title: 'StudyGenius AI', description: 'React + TypeScript study assistant with Gemini API and PDF export.', tags: ['React', 'TypeScript', 'Gemini API'], githubUrl: 'https://github.com/Soham2212004/StudyGenius-AI' },
    { title: 'SafaaiBuddy', description: 'JavaScript-powered static site with n8n webhook and Pinecone vector search.', tags: ['JavaScript', 'Pinecone', 'n8n'], githubUrl: 'https://github.com/Soham2212004/SafaaiBuddy' },
  ],
  'SQL': [
    { title: 'LuxeStay', description: 'PostgreSQL with pgvector for RAG-based FAQ pipeline and booking data storage.', tags: ['PostgreSQL', 'pgvector', 'RAG'], githubUrl: 'https://github.com/Soham2212004/LuxeStay' },
    { title: 'TemporalRAG', description: 'PostgreSQL used alongside Redis for temporal document storage and retrieval.', tags: ['PostgreSQL', 'Redis', 'RAG'], githubUrl: 'https://github.com/Soham2212004/TemporalRAG' },
  ],
  'Dart': [
    { title: 'AI Multitasker App', description: '19-tool Flutter mobile app built in Dart — powered by Gemini API and Stability AI.', tags: ['Dart', 'Flutter', 'Gemini API'], githubUrl: 'https://github.com/Soham2212004/AI-Multitasker' },
  ],
  'RAG Architecture': [
    { title: 'TemporalRAG', description: 'Time-aware RAG with LangGraph, exponential decay reranking, and conflict detection.', tags: ['RAG', 'LangGraph', 'Pinecone'], githubUrl: 'https://github.com/Soham2212004/TemporalRAG' },
    { title: 'LuxeStay', description: 'RAG-based hotel FAQ pipeline using pgvector and Gemini API.', tags: ['RAG', 'pgvector', 'Gemini'], githubUrl: 'https://github.com/Soham2212004/LuxeStay' },
    { title: 'Resume Analyzer', description: 'Vector similarity search using Pinecone embeddings for semantic job matching.', tags: ['RAG', 'Pinecone', 'Gemini'], githubUrl: 'https://github.com/Soham2212004/Resume-Analyzer-Job-Matcher' },
  ],
  'Large Language Models': [
    { title: 'TemporalRAG', description: 'LLM-powered 4-node LangGraph pipeline with temporal reasoning capabilities.', tags: ['LLM', 'LangGraph', 'Gemini'], githubUrl: 'https://github.com/Soham2212004/TemporalRAG' },
    { title: 'AI Document Analyzer', description: 'LLM-powered document Q&A — upload any file and query it in natural language.', tags: ['LLM', 'RAG', 'Gemini'], githubUrl: 'https://github.com/Soham2212004/AI-Document-Analyzer' },
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
    { title: 'Road Accident Detection', description: 'Real-time computer vision system detecting accidents with OpenCV and Python.', tags: ['CV', 'OpenCV', 'Python'], githubUrl: 'https://github.com/Soham2212004/Road-Accident-Detection-Alert-System' },
    { title: 'ML Models Collection', description: 'CNN implementations for image classification and object detection tasks.', tags: ['CNN', 'PyTorch', 'TensorFlow'], githubUrl: 'https://github.com/Soham2212004/Ml_models' },
  ],
  'Prompt Engineering': [
    { title: 'AI-Agents Suite', description: 'Carefully engineered prompts for each of the 6 agents — resume screening, inventory, code commenting.', tags: ['Prompt Engineering', 'Gemini', 'n8n'], githubUrl: 'https://github.com/Soham2212004/AI-Agents' },
    { title: 'StudyGenius AI', description: 'Prompt chains for generating answers, related questions, and key-point extraction.', tags: ['Prompt Engineering', 'Gemini', 'React'], githubUrl: 'https://github.com/Soham2212004/StudyGenius-AI' },
  ],
  'Machine Learning': [
    { title: 'ML Models Collection', description: 'Classification, regression, clustering, and deep learning models with Scikit-Learn and PyTorch.', tags: ['ML', 'Scikit-Learn', 'PyTorch'], githubUrl: 'https://github.com/Soham2212004/Ml_models' },
    { title: 'Resume Analyzer', description: 'Embedding-based semantic similarity ML pipeline for job matching.', tags: ['ML', 'Embeddings', 'Pinecone'], githubUrl: 'https://github.com/Soham2212004/Resume-Analyzer-Job-Matcher' },
  ],
  'OCR (Tesseract)': [
    { title: 'AI Multitasker App', description: 'OCR text extractor tool — one of the 19 tools in the Flutter AI app using Tesseract.', tags: ['OCR', 'Tesseract', 'Flutter'], githubUrl: 'https://github.com/Soham2212004/AI-Multitasker' },
  ],
  'n8n Automation': [
    { title: 'AI-Agents Suite', description: '6 fully automated n8n workflows — each a standalone production-ready AI agent.', tags: ['n8n', 'Automation', 'Gemini'], githubUrl: 'https://github.com/Soham2212004/AI-Agents' },
    { title: 'SafaaiBuddy', description: 'n8n webhook processes user submissions and triggers Pinecone vector search.', tags: ['n8n', 'Pinecone', 'JavaScript'], githubUrl: 'https://github.com/Soham2212004/SafaaiBuddy' },
  ],
  'React': [
    { title: 'LuxeStay', description: 'Full React + TypeScript frontend for hotel booking with role-based UI.', tags: ['React', 'TypeScript', 'FastAPI'], githubUrl: 'https://github.com/Soham2212004/LuxeStay' },
    { title: 'StudyGenius AI', description: 'React study assistant with Gemini API, image upload, and PDF export.', tags: ['React', 'Gemini API', 'jsPDF'], githubUrl: 'https://github.com/Soham2212004/StudyGenius-AI' },
    { title: 'Craftly.AI', description: 'React-based AI content generation platform.', tags: ['React', 'Gemini', 'Generative AI'], githubUrl: 'https://github.com/Soham2212004/Craftly.AI' },
  ],
  'FastAPI': [
    { title: 'LuxeStay', description: 'FastAPI backend with JWT auth, role-based endpoints, and pgvector RAG pipeline.', tags: ['FastAPI', 'PostgreSQL', 'JWT'], githubUrl: 'https://github.com/Soham2212004/LuxeStay' },
    { title: 'TemporalRAG', description: 'FastAPI serves the temporal RAG pipeline with LangGraph and Pinecone.', tags: ['FastAPI', 'LangGraph', 'Pinecone'], githubUrl: 'https://github.com/Soham2212004/TemporalRAG' },
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
  ],
  'Gemini API': [
    { title: 'LuxeStay', description: 'Gemini powers the role-aware AI chat concierge and RAG FAQ pipeline.', tags: ['Gemini', 'RAG', 'FastAPI'], githubUrl: 'https://github.com/Soham2212004/LuxeStay' },
    { title: 'AI-Agents Suite', description: 'All 6 agents powered by Gemini AI — resume screening, code commenting, MCQ generation.', tags: ['Gemini', 'n8n', 'Python'], githubUrl: 'https://github.com/Soham2212004/AI-Agents' },
    { title: 'AI Multitasker App', description: 'Gemini API drives 18 of the 19 tools in the Flutter app.', tags: ['Gemini', 'Flutter', 'Dart'], githubUrl: 'https://github.com/Soham2212004/AI-Multitasker' },
  ],
  'OpenAI API': [
    { title: 'Linde Engineering Internship', description: 'Built a RAG-based Q&A chatbot using OpenAI API, React, Azure, and FastAPI.', tags: ['OpenAI', 'RAG', 'Azure'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Stability AI': [
    { title: 'AI Multitasker App', description: 'Stability AI powers the image generation tool — one of 19 tools in the Flutter app.', tags: ['Stability AI', 'Image Gen', 'Flutter'], githubUrl: 'https://github.com/Soham2212004/AI-Multitasker' },
  ],
  'Amazon Web Services (AWS)': [
    { title: 'AV DEVS Production Systems', description: 'AWS used in production at AV DEVS — EC2, S3, RDS, SES, and Route 53 across client deployments.', tags: ['AWS', 'EC2', 'S3', 'RDS'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Google Cloud Platform': [
    { title: 'Gen AI Study Jams', description: 'Completed GCP Cloud Study Jam — hands-on with GCP services, Qwiklabs, and Vertex AI.', tags: ['GCP', 'Vertex AI', 'Cloud'], githubUrl: 'https://github.com/Soham2212004' },
  ],
  'Microsoft Azure': [
    { title: 'Linde Engineering Internship', description: 'Azure used for hosting, Blob Storage, and Entra ID auth in the RAG chatbot project.', tags: ['Azure', 'Blob Storage', 'Entra ID'], githubUrl: 'https://github.com/Soham2212004' },
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
      { name: 'Cursor',         label: 'AI IDE'    },
      { name: 'GitHub Copilot', label: 'AI Code'   },
      { name: 'Bolt',           label: 'AI Dev'    },
    ] as ToolSkill[],
  },
  {
    id: 'cloud', icon: '⬢', title: 'Cloud & Infrastructure', subtitle: 'Deployment, DevOps & cloud platforms', variant: 'tags',
    items: [
      { name: 'Amazon Web Services (AWS)', tier: 'primary'   },
      { name: 'Google Cloud Platform',     tier: 'primary'   },
      { name: 'Microsoft Azure',           tier: 'primary'   },
      { name: 'EC2 / S3 / RDS',           tier: 'primary'   },
      { name: 'AWS SES',                   tier: 'secondary' },
      { name: 'Amazon Route 53',           tier: 'secondary' },
      { name: 'Azure Blob Storage',        tier: 'secondary' },
      { name: 'Microsoft Entra ID',        tier: 'secondary' },
      { name: 'Cloud Infrastructure',      tier: 'secondary' },
      { name: 'DNS Management',            tier: 'secondary' },
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
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white/90 group-hover/bar:text-cyan-300 transition-colors">{s.name}</span>
              {s.tag && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{s.tag}</span>
              )}
            </div>
            <span className="text-xs font-mono text-cyan-400">{s.level}%</span>
          </div>
          <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400
                            group-hover/bar:from-cyan-400 group-hover/bar:to-cyan-300 transition-colors"
                 style={{ width: `${s.level}%` }} />
          </div>
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

// ── Page ─────────────────────────────────────────────────────────────────────
export default function SkillsPage() {
  const [comingSoon,  setComingSoon]  = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-obsidian-950 overflow-x-hidden">
      <NeuralBackground />
      <div className="fixed inset-0 bg-grid-pattern bg-grid-40 pointer-events-none opacity-30" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Navbar onComingSoon={() => setComingSoon(true)} />

        <main className="pt-24 pb-20">
          <div className="text-center mb-14 px-4">
            <p className="text-[11px] font-mono tracking-[0.25em] text-cyan-500/70 uppercase mb-3">
              [ TECHNICAL TELEMETRY DASHBOARD ]
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Technical Specialization &amp; Toolset
            </h1>
            <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
              A diagnostic readout of core engineering fluency, framework mastery,
              data infrastructure, and deployment orchestration across the full ML lifecycle.
            </p>
            <p className="text-[11px] font-mono text-cyan-500/40 mt-3 tracking-wide">
              ↓ CLICK ANY SKILL TO SEE RELATED PROJECTS
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SkillCard group={groups[0]} onSkillClick={setActiveSkill} />
              <SkillCard group={groups[1]} onSkillClick={setActiveSkill} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SkillCard group={groups[2]} onSkillClick={setActiveSkill} />
              <SkillCard group={groups[3]} onSkillClick={setActiveSkill} />
            </div>
            <div>
              <SkillCard group={groups[4]} onSkillClick={setActiveSkill} />
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8">
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 animate-pulse" />
              SYSTEM SCAN COMPLETE — {groups.reduce((a, g) => a + g.items.length, 0)} SKILLS INDEXED
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {activeSkill && <SkillPopup skillName={activeSkill} onClose={() => setActiveSkill(null)} />}
      <ComingSoonModal open={comingSoon} onClose={() => setComingSoon(false)} />
    </div>
  );
}