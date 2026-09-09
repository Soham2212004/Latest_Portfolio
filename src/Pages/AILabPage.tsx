import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import ResumeQABot from '@/components/ResumeQABot';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';
import { siteContent } from '@/data/portfolio';
import { FileSearch, LockKeyhole, MessageCircleQuestion, Sparkles } from 'lucide-react';

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
                  Ask the resume.
                  <span className="block text-cyan-300 text-glow">Get the evidence.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-400 sm:text-lg">
                  Ask direct questions about my experience, projects, skills, and education. The system retrieves relevant resume sections before generating a concise answer.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-[380px]">
                {[
                  ['Source', 'Resume data'],
                  ['Retrieval', 'Semantic + keyword'],
                  ['Answer', 'Groq / Qwen'],
                ].map(([label, value]) => (
                  <div key={label} className="border-l border-cyan-400/30 pl-3">
                    <p className="text-sm font-semibold text-white">{value}</p>
                    <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-steel-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start">
              <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.03] p-1">
                <ResumeQABot />
              </div>

              <aside className="space-y-4 lg:sticky lg:top-24">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                  <div className="flex items-center gap-2">
                    <FileSearch size={16} className="text-cyan-300" />
                    <h2 className="text-sm font-semibold text-white">How it answers</h2>
                  </div>
                  <ol className="mt-5 space-y-4">
                    {[
                      'Your question is normalized for clearer retrieval.',
                      'Relevant resume sections are ranked with embeddings and keywords.',
                      'The answer is generated only from the retrieved context.',
                    ].map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/10 text-[10px] font-mono text-cyan-300">0{index + 1}</span>
                        <span className="text-xs leading-relaxed text-steel-400">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-5">
                  <div className="flex items-center gap-2">
                    <LockKeyhole size={15} className="text-emerald-300" />
                    <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-emerald-300">Runtime note</p>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-steel-400">Embeddings run in the browser. Answer generation uses the configured Groq endpoint and only receives the retrieved resume context.</p>
                </div>

                <div className="flex items-center gap-2 px-1 text-[10px] font-mono uppercase tracking-wider text-steel-600">
                  <Sparkles size={12} className="text-cyan-300/70" /> Resume context is the source of truth
                </div>
              </aside>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <ComingSoonModal open={comingSoon} onClose={() => setComingSoon(false)} />
    </div>
  );
}
