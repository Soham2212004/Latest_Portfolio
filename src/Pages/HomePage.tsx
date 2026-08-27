import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MetricsStrip from '@/components/MetricsStrip';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';

export default function HomePage() {
  const [comingSoon, setComingSoon] = useState(false);

  return (
    <div className="relative min-h-screen bg-obsidian-950 overflow-x-hidden">
      <NeuralBackground />
      <div className="fixed inset-0 bg-grid-pattern bg-grid-40 pointer-events-none opacity-30" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Navbar onComingSoon={() => setComingSoon(true)} />
        <main>
          <Hero />
          <MetricsStrip />
        </main>
        <Footer />
      </div>

      <ComingSoonModal open={comingSoon} onClose={() => setComingSoon(false)} />
    </div>
  );
}