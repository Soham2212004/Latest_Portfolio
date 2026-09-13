import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';
import { experiences, siteContent } from '@/data/portfolio';
import { Briefcase, MapPin, CalendarDays, ChevronRight, ExternalLink, Search, Sparkles } from 'lucide-react';

const typeColor: Record<string, string> = {
  'Full-time':  'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Contract':   'text-amber-400  bg-amber-400/10  border-amber-400/20',
  'Freelance':  'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  'Internship': 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
  'Research':   'text-ice-400    bg-ice-400/10    border-ice-400/20',
};

export default function ExperiencePage() {
  const [comingSoon, setComingSoon] = useState(false);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const types = ['All', ...Array.from(new Set(experiences.map((experience) => experience.type)))];
  const visibleExperiences = experiences.filter((experience) => {
    const matchesType = filter === 'All' || experience.type === filter;
    const matchesQuery = `${experience.role} ${experience.company} ${experience.description} ${experience.stack.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    return matchesType && matchesQuery;
  });
  const currentRoles = experiences.filter((experience) => experience.current).length;
  const documentedRoles = experiences.filter((experience) => experience.certificateUrl).length;

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
                <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5"><Sparkles size={13} className="text-emerald-300" /><span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-300">{siteContent.experiencePage.eyebrow}</span></div>
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">Work that moved from <span className="text-emerald-300">idea to impact.</span></h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-400 sm:text-lg">{siteContent.experiencePage.description} A practical timeline of engineering roles, internships, and independent work.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-[360px]">
                {[['Roles', experiences.length.toString()], ['Current', currentRoles.toString()], ['Documented', documentedRoles.toString()]].map(([label, value]) => <div key={label} className="border-l border-emerald-400/30 pl-3"><p className="text-2xl font-semibold text-white">{value}</p><p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-steel-500">{label}</p></div>)}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl rounded-2xl border border-white/8 bg-white/[0.025] p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-300/70">Career index</p><p className="mt-2 text-sm text-steel-400">Filter by role type or search the technologies behind each chapter.</p></div><label className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 lg:w-72"><Search size={15} className="text-steel-500" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search experience" className="w-full bg-transparent text-xs text-white outline-none placeholder:text-steel-600" /></label></div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">{types.map((type) => <button key={type} onClick={() => setFilter(type)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] font-mono transition-colors ${filter === type ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200' : 'border-white/8 bg-white/[0.02] text-steel-500 hover:border-white/20 hover:text-white'}`}>{type}</button>)}</div>
          </section>

          <section className="relative mx-auto mt-10 max-w-6xl">
            <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-emerald-400/40 via-emerald-400/10 to-transparent sm:left-7" />
            <div className="space-y-6">{visibleExperiences.map((exp) => <article key={exp.id} className="relative grid gap-4 pl-14 sm:grid-cols-[170px_1fr] sm:gap-8 sm:pl-20">
              <div className="absolute left-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-obsidian-950 sm:left-2 sm:h-12 sm:w-12"><Briefcase size={16} className={exp.current ? 'text-emerald-300' : 'text-steel-500'} />{exp.current && <span className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full border-2 border-obsidian-950 bg-emerald-400" />}</div>
              <div className="pt-2"><p className="text-xs font-mono text-emerald-300">{exp.period}</p><p className="mt-2 flex items-center gap-1.5 text-xs text-steel-500"><MapPin size={11} /> {exp.location}</p></div>
              <div className={`rounded-2xl border bg-white/[0.03] p-5 transition-colors hover:border-emerald-400/25 sm:p-6 ${exp.current ? 'border-emerald-400/20' : 'border-white/8'}`}><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-lg font-semibold text-white">{exp.role}</h2><p className="mt-1 text-sm font-medium text-emerald-300">{exp.company}</p></div><span className={`rounded-md border px-2.5 py-1 text-[10px] font-mono ${typeColor[exp.type]}`}>{exp.type}</span></div><p className="mt-5 text-sm leading-relaxed text-steel-400">{exp.description}</p><ul className="mt-5 space-y-2">{exp.highlights.map((highlight) => <li key={highlight} className="flex items-start gap-2 text-xs leading-relaxed text-steel-300"><ChevronRight size={13} className="mt-0.5 flex-shrink-0 text-emerald-300" />{highlight}</li>)}</ul><div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/8 pt-4">{exp.stack.map((tool) => <span key={tool} className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 text-[10px] font-mono text-steel-400">{tool}</span>)}</div>{exp.certificateUrl && <a href={exp.certificateUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 hover:text-white">View internship certificate <ExternalLink size={11} /></a>}</div>
            </article>)}</div>
            {visibleExperiences.length === 0 && <p className="rounded-xl border border-dashed border-white/10 py-12 text-center text-sm text-steel-500">No experience matches this search.</p>}
          </section>
        </main>

        <Footer />
      </div>
      <ComingSoonModal open={comingSoon} onClose={() => setComingSoon(false)} />
    </div>
  );
}