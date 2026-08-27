import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';

// ── Types ────────────────────────────────────────────────────────────────────
interface BarSkill    { name: string; level: number; tag?: string }
interface TagSkill    { name: string; tier?: 'primary' | 'secondary' }
interface ToolSkill   { name: string; label?: string }

interface SkillGroup {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  variant: 'bars' | 'tags' | 'tools';
  items: BarSkill[] | TagSkill[] | ToolSkill[];
}

// ── Data ─────────────────────────────────────────────────────────────────────
const groups: SkillGroup[] = [
  {
    id: 'languages',
    icon: '⌨',
    title: 'Core Languages',
    subtitle: 'Engineering fluency',
    variant: 'bars',
    items: [
      { name: 'Python',                  level: 92, tag: 'ML / Backend'   },
      { name: 'TypeScript / JavaScript', level: 85, tag: 'Full-Stack'     },
      { name: 'SQL',                     level: 78, tag: 'Data & DBs'     },
      { name: 'Dart',                    level: 65, tag: 'Mobile'         },
    ] as BarSkill[],
  },
  {
    id: 'ai-ml',
    icon: '◈',
    title: 'AI & ML Stack',
    subtitle: 'Models, inference & orchestration',
    variant: 'tags',
    items: [
      { name: 'RAG Architecture',            tier: 'primary'   },
      { name: 'Large Language Models',       tier: 'primary'   },
      { name: 'Agentic AI Development',      tier: 'primary'   },
      { name: 'Generative AI',               tier: 'primary'   },
      { name: 'Computer Vision (CNN)',        tier: 'primary'   },
      { name: 'Prompt Engineering',          tier: 'primary'   },
      { name: 'Machine Learning',            tier: 'primary'   },
      { name: 'OCR (Tesseract)',             tier: 'secondary' },
      { name: 'OpenCV',                      tier: 'secondary' },
      { name: 'Scikit-Learn',               tier: 'secondary' },
      { name: 'PyTorch',                     tier: 'secondary' },
      { name: 'TensorFlow',                  tier: 'secondary' },
      { name: 'n8n Automation',              tier: 'secondary' },
    ] as TagSkill[],
  },
  {
    id: 'frameworks',
    icon: '▦',
    title: 'Frameworks & Data',
    subtitle: 'App layer, APIs & storage',
    variant: 'tools',
    items: [
      { name: 'React',        label: 'Frontend'  },
      { name: 'FastAPI',      label: 'Backend'   },
      { name: 'Django',       label: 'Backend'   },
      { name: 'Flutter',      label: 'Mobile'    },
      { name: 'PostgreSQL',   label: 'Database'  },
      { name: 'Firebase',     label: 'BaaS'      },
      { name: 'Pinecone',     label: 'Vector DB' },
      { name: 'SQLite',       label: 'Database'  },
      { name: 'Google Cloud SQL', label: 'Database' },
      { name: 'Docker',       label: 'DevOps'    },
      { name: 'Git / GitHub', label: 'Version Control' },
      { name: 'Bitbucket',    label: 'Version Control' },
    ] as ToolSkill[],
  },
  {
    id: 'ai-tools',
    icon: '⬡',
    title: 'AI Tools & APIs',
    subtitle: 'Models and AI-assisted development',
    variant: 'tools',
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
    id: 'cloud',
    icon: '⬢',
    title: 'Cloud & Infrastructure',
    subtitle: 'Deployment, DevOps & cloud platforms',
    variant: 'tags',
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
function BarsCard({ items }: { items: BarSkill[] }) {
  return (
    <div className="space-y-5">
      {items.map((s) => (
        <div key={s.name}>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white/90">{s.name}</span>
              {s.tag && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {s.tag}
                </span>
              )}
            </div>
            <span className="text-xs font-mono text-cyan-400">{s.level}%</span>
          </div>
          <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400"
              style={{ width: `${s.level}%` }}
            />
            {/* subtle shimmer */}
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
              style={{ width: `${s.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TagsCard({ items }: { items: TagSkill[] }) {
  const primary   = items.filter((i) => i.tier !== 'secondary');
  const secondary = items.filter((i) => i.tier === 'secondary');
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {primary.map((i) => (
          <span
            key={i.name}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
                       bg-cyan-500/10 text-cyan-300 border border-cyan-500/25
                       hover:bg-cyan-500/20 hover:border-cyan-400/40 transition-colors cursor-default"
          >
            <span className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
            {i.name}
          </span>
        ))}
      </div>
      {secondary.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
          {secondary.map((i) => (
            <span
              key={i.name}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
                         bg-white/4 text-white/55 border border-white/8
                         hover:bg-white/8 hover:text-white/75 transition-colors cursor-default"
            >
              {i.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ToolsCard({ items }: { items: ToolSkill[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((t) => (
        <div
          key={t.name}
          className="flex items-center justify-between px-3 py-2 rounded-lg
                     bg-white/4 border border-white/8
                     hover:bg-white/7 hover:border-white/14 transition-colors group"
        >
          <span className="text-xs font-medium text-white/80 group-hover:text-white/95 transition-colors truncate">
            {t.name}
          </span>
          {t.label && (
            <span className="ml-2 text-[10px] font-mono text-white/35 flex-shrink-0 group-hover:text-cyan-400/60 transition-colors">
              {t.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function SkillCard({ group }: { group: SkillGroup }) {
  return (
    <div className="relative rounded-xl border border-white/8 bg-white/[0.03] backdrop-blur-sm overflow-hidden
                    hover:border-white/14 transition-colors duration-300 group">
      {/* top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* header */}
      <div className="flex items-start gap-3 px-5 pt-5 pb-4 border-b border-white/6">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20
                        flex items-center justify-center text-cyan-400 text-base leading-none">
          {group.icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">{group.title}</h3>
          <p className="text-[11px] font-mono text-white/35 mt-0.5">{group.subtitle}</p>
        </div>
        {/* scan line label */}
        <div className="ml-auto">
          <span className="text-[10px] font-mono text-cyan-500/50 tracking-widest uppercase">
            {group.id.toUpperCase().replace('-', '_')}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="px-5 py-4">
        {group.variant === 'bars'  && <BarsCard  items={group.items as BarSkill[]}  />}
        {group.variant === 'tags'  && <TagsCard  items={group.items as TagSkill[]}  />}
        {group.variant === 'tools' && <ToolsCard items={group.items as ToolSkill[]} />}
      </div>

      {/* corner decoration */}
      <div className="absolute bottom-3 right-4 text-[10px] font-mono text-white/10 select-none">
        {group.items.length} SKILLS
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function SkillsPage() {
  const [comingSoon, setComingSoon] = useState(false);

  // Layout: 2-col grid, but cards span differently by content size
  // languages (bars) + ai-ml (tags) → row 1
  // frameworks (tools) + ai-tools (tools) → row 2
  // cloud (tags) → row 3 full width

  return (
    <div className="relative min-h-screen bg-obsidian-950 overflow-x-hidden">
      <NeuralBackground />
      <div className="fixed inset-0 bg-grid-pattern bg-grid-40 pointer-events-none opacity-30" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Navbar onComingSoon={() => setComingSoon(true)} />

        <main className="pt-24 pb-20">
          {/* ── Header ─────────────────────────────────────────── */}
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
          </div>

          {/* ── Grid ───────────────────────────────────────────── */}
          <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-4">

            {/* Row 1: bars + ai/ml tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SkillCard group={groups[0]} /> {/* Core Languages */}
              <SkillCard group={groups[1]} /> {/* AI & ML Stack  */}
            </div>

            {/* Row 2: frameworks tools + ai-tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SkillCard group={groups[2]} /> {/* Frameworks & Data */}
              <SkillCard group={groups[3]} /> {/* AI Tools & APIs  */}
            </div>

            {/* Row 3: cloud — full width */}
            <div>
              <SkillCard group={groups[4]} /> {/* Cloud & Infrastructure */}
            </div>

          </div>

          {/* ── Footer strip ───────────────────────────────────── */}
          <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8">
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 animate-pulse" />
              SYSTEM SCAN COMPLETE — {groups.reduce((a, g) => a + g.items.length, 0)} SKILLS INDEXED
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <ComingSoonModal open={comingSoon} onClose={() => setComingSoon(false)} />
    </div>
  );
}