import NeuralBackground from '@/components/NeuralBackground';
import ResumeQABot from '@/components/ResumeQABot';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import ComingSoonModal from '@/components/ComingSoonModal';
import { Brain, Cpu } from 'lucide-react';
import { siteContent } from '@/data/portfolio';

export default function AILabPage() {
    const [comingSoon, setComingSoon] = useState(false);

    return (
        <div className="relative min-h-screen bg-obsidian-950 overflow-x-hidden">
            <NeuralBackground />
            <div className="fixed inset-0 bg-grid-pattern bg-grid-40 pointer-events-none opacity-30" />
            <div className="fixed inset-0 bg-radial-glow pointer-events-none opacity-50" />

            <div className="relative z-10">
                <Navbar onComingSoon={() => setComingSoon(true)} />

                <main className="pt-24">
                    {/* Hero banner */}
                    <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
                        <div className="max-w-3xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md glass mb-4">
                                <Brain size={12} className="text-indigo-400" />
                                <span className="text-xs font-mono tracking-wider text-indigo-400">
                                    [ {siteContent.aiLab.eyebrow} ]
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
                                {siteContent.aiLab.title}
                            </h1>
                            <p className="text-steel-400 text-base sm:text-lg leading-relaxed">
                                {siteContent.aiLab.description}
                            </p>
                        </div>
                    </section>

                    {/* Divider */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="h-px bg-gradient-to-r from-transparent via-ice-400/20 to-transparent" />
                    </div>

                    <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto space-y-6">
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