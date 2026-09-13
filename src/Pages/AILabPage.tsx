import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import ResumeQABot from '@/components/ResumeQABot';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';
import { siteContent } from '@/data/portfolio';
import { MessageCircleQuestion } from 'lucide-react';

export default function AILabPage() {
  const [comingSoon, setComingSoon] = useState(false);

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
                <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5">
                  <MessageCircleQuestion size={13} className="text-cyan-300" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300">{siteContent.aiLab.eyebrow}</span>
                </div>
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
                  Ask my personal AI chatbot.
                  <span className="block text-cyan-300 text-glow">Get to know the work.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-400 sm:text-lg">
                  Ask direct questions about my experience, projects, skills, education, and approach to building AI-powered software.
                </p>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.03] p-1">
              <div>
                <ResumeQABot />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <ComingSoonModal open={comingSoon} onClose={() => setComingSoon(false)} />
    </div>
  );
}
