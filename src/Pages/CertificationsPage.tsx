import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';
import { certifications, siteContent } from '@/data/portfolio';
import {
  Award,
  ExternalLink,
  Filter,
  Hash,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

const colorMap: Record<string, string> = {
  amber:   'text-amber-400 border-amber-400/30 bg-amber-400/10',
  ice:     'text-ice-400 border-ice-400/30 bg-ice-400/10',
  indigo:  'text-indigo-400 border-indigo-400/30 bg-indigo-400/10',
  success: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
};

const glowMap: Record<string, string> = {
  amber:   '0 0 24px rgba(251,191,36,0.15)',
  ice:     '0 0 24px rgba(56,189,248,0.15)',
  indigo:  '0 0 24px rgba(99,102,241,0.15)',
  success: '0 0 24px rgba(34,197,94,0.15)',
};

function hasValidVerification(cert: (typeof certifications)[number]) {
  return cert.verifyUrl !== '#';
}

function statusFor(cert: (typeof certifications)[number]) {
  if (hasValidVerification(cert)) return { label: 'Verifiable', className: 'text-emerald-300 border-emerald-300/20 bg-emerald-300/10' };
  return { label: 'Record', className: 'text-steel-400 border-white/10 bg-white/[0.04]' };
}

function CertificateDetail({ cert, onClose }: { cert: (typeof certifications)[number]; onClose: () => void }) {
  const status = statusFor(cert);
  const description = 'description' in cert ? cert.description : undefined;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-obsidian-950/90 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-obsidian-900/95 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="h-1 bg-gradient-to-r from-amber-400 via-cyan-400 to-indigo-400" />
        <div className="flex items-start justify-between gap-4 border-b border-white/8 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300/25 bg-amber-300/10 font-mono font-bold text-amber-300">{cert.badge}</div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-300/70">Credential dossier</p>
              <p className="mt-1 text-xs text-steel-400">{cert.issuer}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close certificate details" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 text-steel-400 hover:bg-white/5 hover:text-white"><X size={15} /></button>
        </div>
        <div className="px-6 py-6">
          <h2 className="text-xl font-semibold leading-snug text-white">{cert.title}</h2>
          {description && <p className="mt-3 text-sm leading-relaxed text-steel-400">{description}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`rounded-full border px-2.5 py-1 text-[10px] font-mono ${status.className}`}>{status.label}</span>
            <span className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono text-steel-400">Issued {cert.date}</span>
          </div>
          <div className="mt-6">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4"><Hash size={15} className="text-cyan-300" /><p className="mt-3 text-[10px] font-mono uppercase tracking-wider text-steel-600">Credential ID</p><p className="mt-1 break-all text-sm text-steel-300">{cert.credentialId || 'Not listed'}</p></div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">{cert.skills.map((skill) => <span key={skill} className="rounded-full border border-cyan-400/15 bg-cyan-400/5 px-2.5 py-1 text-[10px] font-mono text-cyan-300/80">{skill}</span>)}</div>
          {hasValidVerification(cert) ? <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-obsidian-950 hover:bg-cyan-300">Open verification <ExternalLink size={14} /></a> : <p className="mt-6 text-xs leading-relaxed text-steel-500">A public verification URL has not been added for this record yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default function CertificationsPage() {
  const [comingSoon, setComingSoon] = useState(false);
  const [activeCert, setActiveCert] = useState<(typeof certifications)[number] | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const domains = Array.from(new Set(certifications.flatMap((cert) => cert.skills))).slice(0, 8);
  const filteredCertifications = certifications.filter((cert) => {
    const matchesQuery = `${cert.title} ${cert.issuer} ${cert.skills.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'All' || cert.skills.includes(filter);
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-obsidian-950">
      <NeuralBackground />
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern bg-grid-40 opacity-30" />
      <div className="fixed inset-0 pointer-events-none bg-radial-glow opacity-50" />
      <div className="relative z-10">
        <Navbar onComingSoon={() => setComingSoon(true)} />
        <main className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          <section className="mx-auto max-w-6xl pb-12 pt-12">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl animate-fade-up">
                <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-amber-300/20 bg-amber-300/5 px-3 py-1.5"><ShieldCheck size={13} className="text-amber-300" /><span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300">{siteContent.certificationsPage.eyebrow}</span></div>
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">Credentials that <span className="text-amber-300">compound.</span></h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-400 sm:text-lg">A curated record of learning across AI systems, cloud platforms, software engineering, and data. Explore the subjects behind each credential, not just a wall of badges.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:w-[260px]">
                {[['Credentials', certifications.length.toString()], ['Subject areas', domains.length.toString()]].map(([label, value]) => <div key={label} className="border-l border-amber-300/30 pl-3"><p className="text-2xl font-semibold text-white">{value}</p><p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-steel-500">{label}</p></div>)}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl rounded-2xl border border-white/8 bg-white/[0.025] p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-2 text-xs text-steel-400"><Filter size={14} className="text-amber-300" /><span>Filter by subject</span></div>
              <label className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 lg:w-72"><Search size={15} className="text-steel-500" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search credentials" className="w-full bg-transparent text-xs text-white outline-none placeholder:text-steel-600" /></label>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">{['All', ...domains].map((item) => <button key={item} onClick={() => setFilter(item)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] font-mono transition-colors ${filter === item ? 'border-amber-300/40 bg-amber-300/10 text-amber-200' : 'border-white/8 bg-white/[0.02] text-steel-500 hover:border-white/20 hover:text-white'}`}>{item}</button>)}</div>
          </section>

          <section className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCertifications.map((cert) => {
              const status = statusFor(cert);
              return <button key={cert.id} onClick={() => setActiveCert(cert)} className="group flex min-h-[275px] flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-left transition-all hover:-translate-y-1 hover:border-amber-300/30 hover:bg-white/[0.05]">
                <div className="flex items-start justify-between gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10 font-mono font-bold text-amber-300">{cert.badge}</div><span className={`rounded-full border px-2 py-1 text-[9px] font-mono ${status.className}`}>{status.label}</span></div>
                <p className="mt-5 text-[10px] font-mono uppercase tracking-wider text-steel-500">{cert.issuer} · {cert.date}</p>
                <h2 className="mt-2 text-sm font-semibold leading-snug text-white group-hover:text-amber-200">{cert.title}</h2>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-5">{cert.skills.slice(0, 4).map((skill) => <span key={skill} className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 text-[9px] font-mono text-steel-400">{skill}</span>)}</div>
                <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3 text-[10px] font-mono text-steel-600"><span>{cert.credentialId ? 'ID AVAILABLE' : 'NO ID LISTED'}</span><span className="flex items-center gap-1 text-amber-300/70">View details <ExternalLink size={11} /></span></div>
              </button>;
            })}
          </section>
          {filteredCertifications.length === 0 && <p className="mx-auto mt-8 max-w-6xl rounded-xl border border-dashed border-white/10 py-12 text-center text-sm text-steel-500">No credentials match this search.</p>}
          <p className="mx-auto mt-8 flex max-w-6xl items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-steel-600"><Sparkles size={12} className="text-amber-300/60" /> Learning record indexed · verify links are shown only when a public URL is present</p>
        </main>
        <Footer />
      </div>
      {activeCert && <CertificateDetail cert={activeCert} onClose={() => setActiveCert(null)} />}
      <ComingSoonModal open={comingSoon} onClose={() => setComingSoon(false)} />
    </div>
  );
}