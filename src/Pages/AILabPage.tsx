import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import ResumeQABot from '@/components/ResumeQABot';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';
import { siteContent } from '@/data/portfolio';
import { Brain } from 'lucide-react';

export default function AILabPage() {
  const [comingSoon, setComingSoon] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-obsidian-950">
      <NeuralBackground />
      <div className="fixed inset-0 bg-grid-pattern bg-grid-40 pointer-events-none opacity-30" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Navbar onComingSoon={() => setComingSoon(true)} />

        <main className="pt-24">
          <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md glass px-3 py-1">
                <Brain size={12} className="text-indigo-400" />
                <span className="text-xs font-mono tracking-wider text-indigo-400">[ {siteContent.aiLab.eyebrow} ]</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{siteContent.aiLab.title}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-steel-400 sm:text-lg">{siteContent.aiLab.description}</p>
            </div>
          </section>

          <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <ResumeQABot />
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <ComingSoonModal open={comingSoon} onClose={() => setComingSoon(false)} />
    </div>
  );
}
