import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';
import { experiences, metrics, profile, specialization } from '@/data/portfolio';
import aboutPortrait from '@/assets/images/profile2.jpg';
import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';

const focusAreas = [
  {
    icon: BrainCircuit,
    title: 'Applied AI systems',
    description: 'LLMs, RAG pipelines, computer vision, and agentic workflows shaped around useful products.',
  },
  {
    icon: Code2,
    title: 'Product engineering',
    description: 'Full-stack web and mobile experiences that connect thoughtful interfaces to dependable APIs.',
  },
  {
    icon: Cloud,
    title: 'Cloud delivery',
    description: 'Deployable software with practical infrastructure across AWS, Google Cloud, and Azure.',
  },
];

const journey = [
  { label: 'Building now', value: experiences[0]?.role ?? 'Software Engineer', detail: experiences[0]?.company ?? 'AV DEVS Solutions' },
  { label: 'Projects shipped', value: metrics[0].value, detail: metrics[0].unit },
  { label: 'Credentials earned', value: metrics[1].value, detail: metrics[1].unit },
  { label: 'Published work', value: metrics[3].value, detail: 'GitHub projects' },
];

export default function AboutPage() {
  const [comingSoon, setComingSoon] = useState(false);
  const primarySkills = specialization
    .flatMap((area) => (area.skills ?? area.tools ?? []) as Array<{ name: string }>)
    .slice(0, 10)
    .map((item) => item.name);

  return (
    <div className="relative min-h-screen bg-obsidian-950 overflow-x-hidden">
      <NeuralBackground />
      <div className="fixed inset-0 bg-grid-pattern bg-grid-40 pointer-events-none opacity-30" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Navbar onComingSoon={() => setComingSoon(true)} />

        <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center mb-24">
              <div className="animate-fade-up">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md glass mb-5">
                  <Sparkles size={13} className="text-ice-400" />
                  <span className="text-xs font-mono tracking-wider text-ice-400">[ THE PERSON BEHIND THE SYSTEMS ]</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                  More than the stack.
                  <span className="block text-ice-400 text-glow">Here is the why.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base sm:text-lg text-steel-300 leading-relaxed">
                  I&apos;m {profile.fullName}, a {profile.preTitle.toLowerCase()} focused on turning ambitious AI ideas into software people can actually use.
                </p>
                <p className="mt-4 max-w-2xl text-sm text-steel-400 leading-relaxed">
                  {profile.summary}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3 text-xs font-mono text-steel-400">
                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg glass">
                    <MapPin size={13} className="text-ice-400" /> Vadodara, Gujarat, India
                  </span>
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-ice-400/25 text-ice-400 hover:bg-ice-400/10 transition-colors"
                  >
                    View resume <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="mailto:sonisoham91@gmail.com?subject=Let%27s%20work%20together"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-ice-400 text-obsidian-950 font-semibold hover:bg-ice-500 transition-colors"
                  >
                    <Mail size={13} /> Hire me
                  </a>
                </div>
              </div>

              <div className="relative animate-fade-in">
                <div className="absolute -inset-4 rounded-3xl bg-ice-400/5 blur-2xl" />
                <div className="relative glass rounded-2xl p-3 border border-white/10">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
                    <img
                      src={aboutPortrait}
                      alt={profile.fullName}
                      className="w-full h-full object-cover"
                      style={{ filter: 'contrast(1.05) saturate(0.85) brightness(0.9)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-[10px] font-mono tracking-[0.2em] text-ice-400 uppercase">Current chapter</p>
                      <p className="mt-1 text-lg font-semibold text-white">Building useful intelligence.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-24">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-mono tracking-wider text-ice-400">[ THE JOURNEY SO FAR ]</p>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">A career measured in shipped work.</h2>
                </div>
                <BriefcaseBusiness className="hidden sm:block text-ice-400/60" size={28} />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {journey.map((item) => (
                  <div key={item.label} className="glass rounded-xl p-5 border border-white/8">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-steel-500">{item.label}</p>
                    <p className="mt-3 text-2xl font-bold text-white">{item.value}</p>
                    <p className="mt-1 text-xs text-ice-400 font-mono">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-24">
              <div className="max-w-2xl mb-8">
                <p className="text-xs font-mono tracking-wider text-ice-400">[ WHAT I CARE ABOUT ]</p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">Curiosity is only useful when it ships.</h2>
                <p className="mt-3 text-sm text-steel-400 leading-relaxed">
                  My work sits at the intersection of experimentation and execution: learn the technology deeply, make the interface feel obvious, and deliver something that earns its place in the real world.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {focusAreas.map((area) => {
                  const Icon = area.icon;
                  return (
                    <div key={area.title} className="glass glass-hover rounded-xl p-6">
                      <Icon size={22} className="text-ice-400" />
                      <h3 className="mt-5 text-base font-semibold text-white">{area.title}</h3>
                      <p className="mt-2 text-sm text-steel-400 leading-relaxed">{area.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
              <div>
                <p className="text-xs font-mono tracking-wider text-ice-400">[ HOW I WORK ]</p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">A practical builder&apos;s mindset.</h2>
                <p className="mt-4 text-sm text-steel-400 leading-relaxed">
                  From internships and freelance work to my current engineering role, each chapter has reinforced the same belief: strong systems are built with equal parts technical rigor, empathy, and iteration.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {['Start with the user problem', 'Prototype with intent', 'Make complexity legible', 'Measure what matters'].map((principle, index) => (
                  <div key={principle} className="flex items-center gap-3 glass rounded-lg px-4 py-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ice-400/10 text-xs font-mono text-ice-400">0{index + 1}</span>
                    <span className="text-sm text-steel-300">{principle}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-24 pt-8 border-t border-white/8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-mono tracking-wider text-ice-400">[ WORKING TOOLKIT ]</p>
                  <p className="mt-2 text-sm text-steel-400">A constantly evolving set of tools for turning ideas into outcomes.</p>
                </div>
                <div className="flex flex-wrap justify-end gap-2 max-w-xl">
                  {primarySkills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/8 text-[10px] font-mono text-steel-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
      <ComingSoonModal open={comingSoon} onClose={() => setComingSoon(false)} />
    </div>
  );
}
