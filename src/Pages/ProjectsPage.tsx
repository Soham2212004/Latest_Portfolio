import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';
import { projects, siteContent } from '@/data/portfolio';
import { Github, ExternalLink, CheckCircle, Zap, FlaskConical } from 'lucide-react';

// ── Status config ─────────────────────────────────────────────────────────────
const statusIcon = {
  Production: <CheckCircle size={10} className="text-emerald-400" />,
  Research:   <FlaskConical size={10} className="text-indigo-400" />,
  Active:     <Zap size={10} className="text-amber-400" />,
};
const statusColor = {
  Production: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Research:   'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
  Active:     'text-amber-400 bg-amber-400/10 border-amber-400/20',
};

// ── Single unified card ───────────────────────────────────────────────────────
function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  return (
    <div className="glass rounded-2xl p-5 flex flex-col gap-3 border border-white/5 hover:border-white/10 transition-all duration-300">

      {/* Row 1: status + category */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-mono ${statusColor[p.status as keyof typeof statusColor] ?? statusColor.Production}`}>
          {statusIcon[p.status as keyof typeof statusIcon] ?? statusIcon.Production}
          {p.status}
        </span>
        <span className="text-[10px] font-mono text-steel-500 px-2 py-0.5 bg-white/[0.03] border border-white/5 rounded-md">
          {p.category}
        </span>
      </div>

      {/* Row 2: title + subtitle */}
      <div>
        <h3 className="text-sm font-semibold text-white leading-snug">{p.title}</h3>
        <p className="text-[11px] text-steel-500 mt-0.5 font-mono">{p.subtitle}</p>
      </div>

      {/* Row 3: description */}
      <p className="text-xs text-steel-400 leading-relaxed flex-1">{p.description}</p>

      {/* Row 4: tags */}
      <div className="flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-steel-400"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Row 5: links */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <a
          href={p.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-mono text-steel-400 hover:text-white transition-colors"
        >
          <Github size={12} /> Code
        </a>
        {p.demoUrl && (
          <a
            href={p.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-ice-400 hover:text-white transition-colors ml-auto"
          >
            Live Demo <ExternalLink size={10} />
          </a>
        )}
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [comingSoon, setComingSoon] = useState(false);
  const [filter, setFilter]         = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered   = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="relative min-h-screen bg-obsidian-950 overflow-x-hidden">
      <NeuralBackground />
      <div className="fixed inset-0 bg-grid-pattern bg-grid-40 pointer-events-none opacity-30" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Navbar onComingSoon={() => setComingSoon(true)} />

        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md glass mb-4">
                <FlaskConical size={12} className="text-ice-400" />
                <span className="text-xs font-mono tracking-wider text-ice-400">
                  [ {siteContent.projectsPage.eyebrow} ]
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {siteContent.projectsPage.title}
              </h1>
              <p className="mt-3 text-steel-400 max-w-xl mx-auto text-sm sm:text-base">
                {siteContent.projectsPage.description}
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-all ${
                    filter === cat
                      ? 'bg-ice-400/10 border-ice-400/30 text-ice-400'
                      : 'bg-white/[0.03] border-white/5 text-steel-500 hover:text-steel-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Unified grid — same card for every project */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>

          </div>
        </main>

        <Footer />
      </div>

      <ComingSoonModal open={comingSoon} onClose={() => setComingSoon(false)} />
    </div>
  );
}