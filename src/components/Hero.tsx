import { useState } from 'react';
import { profile, siteContent } from '@/data/portfolio';
import { Download, X, ExternalLink } from 'lucide-react';

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
      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Holographic Profile */}
          <div className="relative flex justify-center lg:justify-start order-1 lg:order-1 animate-fade-in">
            <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px]">

              {/* Outer rotating ring */}
              <div className="absolute inset-0 animate-spin-slow">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <path
                    d="M200 8 L249 51 L314 51 L349 86 L392 86 L392 151 L435 200 L392 249 L392 314 L349 349 L314 349 L249 392 L200 435 L151 392 L86 349 L51 349 L8 314 L8 249 L-35 200 L8 151 L8 86 L51 86 L86 51 L151 51 Z"
                    fill="none"
                    stroke="rgba(56,189,248,0.15)"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                  />
                </svg>
              </div>

              {/* Inner counter-rotating ring */}
              <div className="absolute inset-6 animate-spin-reverse-slow">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <polygon
                    points="200,20 346,120 346,280 200,380 54,280 54,120"
                    fill="none"
                    stroke="rgba(0,229,255,0.2)"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* Corner brackets */}
              {[
                'top-0 left-0 border-t border-l',
                'top-0 right-0 border-t border-r',
                'bottom-0 left-0 border-b border-l',
                'bottom-0 right-0 border-b border-r',
              ].map((cls) => (
                <span
                  key={cls}
                  className={`absolute ${cls} w-8 h-8 border-ice-400/50`}
                  style={{ filter: 'drop-shadow(0 0 4px rgba(56,189,248,0.4))' }}
                />
              ))}

              {/* Portrait container */}
              <div className="absolute inset-10 rounded-2xl overflow-hidden glass glow-border">
                <img
                  src={profile.portraitImage}
                  alt={profile.fullName}
                  className="w-full h-full object-cover opacity-90"
                  style={{ filter: 'contrast(1.05) saturate(0.85) brightness(0.95)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
                {/* Scan line */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute inset-x-0 h-px bg-ice-400/30 animate-scan" />
                </div>
              </div>

            </div>
          </div>

          {/* Right — Introduction */}
          <div className="order-2 lg:order-2 space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md glass">
              <span className="w-1.5 h-1.5 rounded-full bg-ice-400 animate-pulse-dot" />
              <span className="text-xs font-mono tracking-wider text-ice-400">
                [ {siteContent.hero.systemRoleLabel} : {profile.preTitle} ]
              </span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                {profile.fullName}
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-medium text-steel-300">
                {profile.subtitle}
              </p>
            </div>

            <p className="text-base text-steel-400 leading-relaxed max-w-xl">
              {profile.summary}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {/* Primary — opens modal */}
              <button
                onClick={() => setShowResume(true)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg
                           bg-ice-400 text-obsidian-950 font-semibold text-sm
                           transition-all hover:bg-ice-500"
                style={{ boxShadow: '0 0 24px rgba(56,189,248,0.35)' }}
              >
                <Download size={16} />
                {siteContent.hero.resumeButtonLabel}
              </button>

              {/* Secondary — direct download */}
              <a
  href={profile.resumeUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
             glass border border-white/10 text-steel-300 text-sm font-medium
             hover:text-white hover:border-white/20 transition-all"
>
  <ExternalLink size={15} />
  Download CV
</a>
            </div>
          </div>

        </div>
      </section>

      {/* Resume Modal — rendered outside section so it covers full viewport */}
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </>
  );
}