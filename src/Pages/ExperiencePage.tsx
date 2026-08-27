import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';
import { experiences, siteContent } from '@/data/portfolio';
import { Briefcase, MapPin, CalendarDays, ChevronRight } from 'lucide-react';

const typeColor: Record<string, string> = {
  'Full-time':  'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Contract':   'text-amber-400  bg-amber-400/10  border-amber-400/20',
  'Internship': 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
  'Research':   'text-ice-400    bg-ice-400/10    border-ice-400/20',
};

export default function ExperiencePage() {
  const [comingSoon, setComingSoon] = useState(false);

  return (
    <div className="relative min-h-screen bg-obsidian-950 overflow-x-hidden">
      <NeuralBackground />
      <div className="fixed inset-0 bg-grid-pattern bg-grid-40 pointer-events-none opacity-30" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Navbar onComingSoon={() => setComingSoon(true)} />

        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {/* Header */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md glass mb-4">
                <Briefcase size={12} className="text-ice-400" />
                <span className="text-xs font-mono tracking-wider text-ice-400">
                  [ {siteContent.experiencePage.eyebrow} ]
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">{siteContent.experiencePage.title}</h1>
              <p className="mt-3 text-steel-400 max-w-xl mx-auto text-sm sm:text-base">
                {siteContent.experiencePage.description}
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical spine */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-ice-400/30 via-ice-400/10 to-transparent" />

              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <div key={exp.id} className="relative flex gap-8">
                    {/* Node */}
                    <div className="relative flex-shrink-0 flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-xl glass flex items-center justify-center z-10 border ${
                          exp.current ? 'border-ice-400/40' : 'border-white/10'
                        }`}
                        style={exp.current ? { boxShadow: '0 0 16px rgba(56,189,248,0.2)' } : undefined}
                      >
                        <Briefcase size={16} className={exp.current ? 'text-ice-400' : 'text-steel-500'} />
                      </div>
                      {exp.current && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-obsidian-950 animate-pulse" />
                      )}
                    </div>

                    {/* Card */}
                    <div className={`flex-1 glass rounded-2xl p-6 mb-2 transition-all duration-300 hover:border-white/10 ${
                      exp.current ? 'border-ice-400/15' : ''
                    }`}>
                      {/* Top row */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                          <p className="text-sm text-ice-400 font-medium mt-0.5">{exp.company}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[10px] font-mono ${typeColor[exp.type]}`}>
                          {exp.type}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 mb-4 text-xs font-mono text-steel-500">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={10} /> {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={10} /> {exp.location}
                        </span>
                      </div>

                      <p className="text-xs text-steel-400 leading-relaxed mb-4">{exp.description}</p>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-xs text-steel-300">
                            <ChevronRight size={12} className="text-ice-400 mt-0.5 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* Stack */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                        {exp.stack.map((s) => (
                          <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-steel-400">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
      <ComingSoonModal open={comingSoon} onClose={() => setComingSoon(false)} />
    </div>
  );
}