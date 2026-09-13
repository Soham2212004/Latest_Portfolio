import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';
import { projects, siteContent } from '@/data/portfolio';
import { ArrowUpRight, Code2, ExternalLink, FlaskConical, Github, Layers3, Search, X } from 'lucide-react';

// ── Single unified card ───────────────────────────────────────────────────────
function ProjectCard({ p, onOpen }: { p: (typeof projects)[number]; onOpen: () => void }) {
  return (
    <article className="group flex min-h-[300px] flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.05]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-cyan-400/70">{p.id}</span>
        <span className="text-[10px] font-mono text-steel-500 px-2 py-0.5 bg-white/[0.03] border border-white/5 rounded-md">
          {p.category}
        </span>
      </div>

      <button onClick={onOpen} className="mt-6 text-left">
        <h3 className="text-lg font-semibold leading-snug text-white group-hover:text-cyan-200">{p.title}</h3>
        <p className="mt-2 text-xs font-mono leading-relaxed text-steel-500">{p.subtitle}</p>
        <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-steel-400">{p.description}</p>
      </button>

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full border border-cyan-400/10 bg-cyan-400/5 px-2 py-1 text-[10px] font-mono text-cyan-300/75">{t}</span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-3">
          <button onClick={onOpen} className="inline-flex items-center gap-1.5 text-xs font-mono text-steel-400 hover:text-white">Explore project <ArrowUpRight size={12} /></button>
          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${p.title} source code`} className="text-steel-500 hover:text-cyan-300"><Github size={15} /></a>
        </div>
      </div>
    </article>
  );
}

function ProjectDetail({ project, onClose }: { project: (typeof projects)[number]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-obsidian-950/90 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-obsidian-900/95 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="h-1 bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400" />
        <div className="flex items-start justify-between gap-4 border-b border-white/8 px-6 py-5">
          <div><p className="text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-400/70">Project dossier · {project.category}</p><h2 className="mt-2 text-2xl font-semibold text-white">{project.title}</h2><p className="mt-1 text-xs font-mono text-steel-500">{project.subtitle}</p></div>
          <button onClick={onClose} aria-label="Close project details" className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/8 text-steel-400 hover:bg-white/5 hover:text-white"><X size={15} /></button>
        </div>
        <div className="px-6 py-6">
          <p className="text-sm leading-relaxed text-steel-300">{project.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-white/8 bg-white/[0.03] p-4"><Layers3 size={16} className="text-cyan-300" /><p className="mt-3 text-[10px] font-mono uppercase tracking-wider text-steel-600">System category</p><p className="mt-1 text-sm text-steel-300">{project.category}</p></div><div className="rounded-xl border border-white/8 bg-white/[0.03] p-4"><Code2 size={16} className="text-cyan-300" /><p className="mt-3 text-[10px] font-mono uppercase tracking-wider text-steel-600">Technologies</p><p className="mt-1 text-sm text-steel-300">{project.tags.length} connected tools</p></div></div>
          <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full border border-cyan-400/15 bg-cyan-400/5 px-2.5 py-1 text-[10px] font-mono text-cyan-300/80">{tag}</span>)}</div>
          <div className="mt-6 flex flex-wrap gap-3"><a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-obsidian-950 hover:bg-cyan-300"><Github size={15} /> View source code</a>{project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-steel-300 hover:border-cyan-400/30 hover:text-white">Open live demo <ExternalLink size={14} /></a>}</div>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [comingSoon, setComingSoon] = useState(false);
  const [filter, setFilter] = useState<string>('All');
  const [query, setQuery] = useState('');
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = projects.filter((project) => {
    const matchesCategory = filter === 'All' || project.category === filter;
    const matchesQuery = `${project.title} ${project.subtitle} ${project.description} ${project.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });
  const featured = ['road-accident-detection', 'ai-agents-suite', 'temporal-rag']
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project));
  const uniqueTools = new Set(projects.flatMap((project) => project.tags)).size;

  return (
    <div className="relative min-h-screen bg-obsidian-950 overflow-x-hidden">
      <NeuralBackground />
      <div className="fixed inset-0 bg-grid-pattern bg-grid-40 pointer-events-none opacity-30" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Navbar onComingSoon={() => setComingSoon(true)} />

        <main className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          <section className="mx-auto max-w-6xl pb-12 pt-12">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl animate-fade-up">
                <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5"><FlaskConical size={13} className="text-cyan-300" /><span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300">{siteContent.projectsPage.eyebrow}</span></div>
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">Systems I built to <span className="text-cyan-300 text-glow">solve real problems.</span></h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-400 sm:text-lg">{siteContent.projectsPage.description} Explore the architecture, tools, and decisions behind each build.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-[360px]">
                {[['Projects', projects.length.toString()], ['Categories', categories.length - 1 + ''], ['Tools used', uniqueTools.toString()]].map(([label, value]) => <div key={label} className="border-l border-cyan-400/30 pl-3"><p className="text-2xl font-semibold text-white">{value}</p><p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-steel-500">{label}</p></div>)}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl">
            <div className="mb-4 flex items-center justify-between gap-4"><div><p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400/70">Selected builds</p><h2 className="mt-2 text-2xl font-bold text-white">Where the ideas became systems.</h2></div><span className="hidden text-[10px] font-mono uppercase tracking-wider text-steel-600 sm:block">Three representative builds</span></div>
            <div className="grid gap-4 lg:grid-cols-3">{featured.map((project) => <ProjectCard key={project.id} p={project} onOpen={() => setActiveProject(project)} />)}</div>
          </section>

          <section className="mx-auto mt-16 max-w-6xl">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400/70">Project index</p><h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Browse the full build log.</h2></div><label className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 sm:w-72"><Search size={15} className="text-steel-500" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or tools" className="w-full bg-transparent text-xs text-white outline-none placeholder:text-steel-600" /></label></div>
            <div className="mb-8 flex gap-2 overflow-x-auto pb-1">{categories.map((cat) => <button key={cat} onClick={() => setFilter(cat)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] font-mono transition-colors ${filter === cat ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200' : 'border-white/8 bg-white/[0.02] text-steel-500 hover:border-white/20 hover:text-white'}`}>{cat}</button>)}</div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((project) => <ProjectCard key={project.id} p={project} onOpen={() => setActiveProject(project)} />)}</div>
            {filtered.length === 0 && <p className="rounded-xl border border-dashed border-white/10 py-12 text-center text-sm text-steel-500">No projects match this filter.</p>}
          </section>

          <p className="mx-auto mt-10 flex max-w-6xl items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-steel-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Source repositories are linked on every project card</p>
        </main>

        <Footer />
      </div>

      <ComingSoonModal open={comingSoon} onClose={() => setComingSoon(false)} />
      {activeProject && <ProjectDetail project={activeProject} onClose={() => setActiveProject(null)} />}
    </div>
  );
}