import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';
import { certifications, siteContent } from '@/data/portfolio';
import { Award, ExternalLink, CheckCircle, Calendar, Hash } from 'lucide-react';

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

export default function CertificationsPage() {
  const [comingSoon, setComingSoon] = useState(false);

  return (
    <div className="relative min-h-screen bg-obsidian-950 overflow-x-hidden">
      <NeuralBackground />
      <div className="fixed inset-0 bg-grid-pattern bg-grid-40 pointer-events-none opacity-30" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Navbar onComingSoon={() => setComingSoon(true)} />

        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md glass mb-4">
                <Award size={12} className="text-amber-400" />
                <span className="text-xs font-mono tracking-wider text-amber-400">
                  [ {siteContent.certificationsPage.eyebrow} ]
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {siteContent.certificationsPage.title}
              </h1>
              <p className="mt-3 text-steel-400 max-w-xl mx-auto text-sm sm:text-base">
                {siteContent.certificationsPage.description}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs font-mono text-steel-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{certifications.length} {siteContent.certificationsPage.activeLabel}</span>
                </span>
                <span>|</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={10} className="text-ice-400" />
                  <span>{siteContent.certificationsPage.verifiedLabel}</span>
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {certifications.map((cert) => {
                const cls = colorMap[cert.color] ?? colorMap.ice;
                return (
                  <div
                    key={cert.id}
                    className="glass rounded-2xl p-6 flex flex-col gap-4 group transition-all duration-300 hover:border-white/10"
                    style={{ boxShadow: glowMap[cert.color] }}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`w-14 h-14 rounded-xl border flex items-center justify-center font-mono font-bold text-lg ${cls}`}>
                        {cert.badge}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 text-steel-400 border border-white/5">
                        {cert.date}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white leading-snug">{cert.title}</h3>
                      <p className="text-xs text-steel-400 mt-1">{cert.issuer}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-steel-400"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-steel-500">
                          <Calendar size={9} />
                          <span>Expires: {cert.expiry}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-steel-600">
                          <Hash size={9} />
                          <span>{cert.credentialId}</span>
                        </div>
                      </div>
                      <a
                        href={cert.verifyUrl}
                        className="flex items-center gap-1 text-[10px] font-mono text-ice-400 hover:text-white transition-colors"
                      >
                        <span>Verify</span>
                        <ExternalLink size={9} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </main>

        <Footer />
      </div>
      <ComingSoonModal open={comingSoon} onClose={() => setComingSoon(false)} />
    </div>
  );
}