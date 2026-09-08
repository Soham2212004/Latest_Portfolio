import { useState } from 'react';
import { profile, siteContent } from '@/data/portfolio';
import { ArrowDownRight, Check, Download, ExternalLink, Github, X } from 'lucide-react';

// ── Resume Modal ──────────────────────────────────────────────────────────────
function ResumeModal({ onClose }: { onClose: () => void }) {
  const embedUrl = profile.resumeUrl
    .replace('/view', '/preview')
    .replace('?usp=drive_link', '');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-obsidian-950/90 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-4xl h-[90vh] glass rounded-2xl border border-white/10 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ice-400 animate-pulse" />
            <span className="text-xs font-mono text-ice-400 tracking-wider">
              RESUME / CV — {profile.fullName}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-mono text-steel-400 hover:text-white transition-colors"
            >
              <ExternalLink size={12} /> Open in Drive
            </a>
            <a
  href={profile.resumeUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-lg
             bg-ice-400/10 border border-ice-400/20 text-ice-400
             hover:bg-ice-400/20 transition-colors"
>
  <Download size={12} /> Download
</a>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-7 h-7 rounded-lg
                         bg-white/5 border border-white/8 text-steel-400
                         hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <div className="flex-1 bg-obsidian-950 relative">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            title="Resume Preview"
            allow="autoplay"
          />
          <div className="absolute bottom-3 right-4 text-[10px] font-mono text-white/10 select-none pointer-events-none">
            DOCUMENT PREVIEW
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <section id="home" className="relative min-h-[calc(100vh-4.5rem)] flex items-center pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto w-full">

          {/* Introduction */}
          <div className="space-y-7 text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md glass">
              <span className="w-1.5 h-1.5 rounded-full bg-ice-400 animate-pulse-dot" />
              <span className="text-xs font-mono tracking-wider text-ice-400">
                [ {siteContent.hero.systemRoleLabel} ]
              </span>
            </div>

            <div>
              <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
                I turn ambitious AI ideas into
                <span className="block text-ice-400 text-glow">useful software.</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg font-medium text-steel-300">
                {profile.fullName} <span className="text-steel-500">/</span> {profile.preTitle}
              </p>
            </div>

            <p className="mx-auto max-w-2xl text-base sm:text-lg text-steel-400 leading-relaxed">
              {profile.summary}
            </p>

            <div className="flex flex-wrap justify-center gap-2.5">
              {['LLM applications', 'RAG pipelines', 'Agentic workflows', 'Full-stack delivery'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-steel-300">
                  <Check size={12} className="text-ice-400" />
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {/* Primary — opens modal */}
              <button
                onClick={() => setShowResume(true)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg
                           bg-ice-400 text-obsidian-950 font-semibold text-sm
                           transition-all hover:bg-ice-500 hover:-translate-y-0.5"
                style={{ boxShadow: '0 0 24px rgba(56,189,248,0.35)' }}
              >
                <Download size={16} />
                {siteContent.hero.resumeButtonLabel}
              </button>

              {/* Secondary — direct download */}
              <a
  href="/projects"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
             glass border border-white/10 text-steel-300 text-sm font-medium
             hover:text-white hover:border-white/20 transition-all"
>
  <ArrowDownRight size={15} />
  See selected work
</a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-mono text-steel-500">
              <a href="https://github.com/Soham2212004" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <Github size={14} /> GitHub / shipped work
              </a>
              <span className="h-1 w-1 rounded-full bg-steel-600" />
              <span>Vadodara, India</span>
            </div>
          </div>

        </div>
      </section>

      {/* Resume Modal — rendered outside section so it covers full viewport */}
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </>
  );
}