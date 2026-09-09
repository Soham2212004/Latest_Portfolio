import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';
import { contact, siteContent } from '@/data/portfolio';
import { Mail, Linkedin, Github, Award, MapPin, Clock, Send, ChevronDown, ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  mail:     Mail,
  linkedin: Linkedin,
  github:   Github,
  award:    Award,
};

export default function ContactPage() {
  const [comingSoon, setComingSoon] = useState(false);
  const [openFaq, setOpenFaq]       = useState<number | null>(null);
  const [form, setForm]             = useState({ name: '', email: '', type: 'Full-time', message: '' });
  const [sent, setSent]             = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `${form.type} inquiry from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\nEngagement type: ${form.type}\n\n${form.message}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="relative min-h-screen bg-obsidian-950 overflow-x-hidden">
      <NeuralBackground />
      <div className="fixed inset-0 bg-grid-pattern bg-grid-40 pointer-events-none opacity-30" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Navbar onComingSoon={() => setComingSoon(true)} />

        <main className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <section className="grid items-end gap-8 pb-12 pt-12 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl animate-fade-up">
                <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5"><MessageSquare size={13} className="text-cyan-300" /><span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300">Open channel</span></div>
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">Let&apos;s make the next <span className="text-cyan-300 text-glow">useful thing.</span></h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-400 sm:text-lg">Bring a product idea, an AI workflow, or a hard engineering problem. I&apos;ll read the context and reply with a practical next step.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-[360px]">
                {[['Response', contact.responseTime], ['Location', 'Vadodara'], ['Availability', 'Open']].map(([label, value]) => <div key={label} className="border-l border-cyan-400/30 pl-3"><p className="text-base font-semibold text-white">{value}</p><p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-steel-500">{label}</p></div>)}
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">

              <div className="space-y-5">

                <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-5">
                  <div className="flex items-center gap-2"><Sparkles size={15} className="text-cyan-300" /><h3 className="text-sm font-semibold text-white">Good fit for</h3></div>
                  <p className="mt-3 text-sm leading-relaxed text-steel-400">{contact.availability}. I&apos;m especially interested in AI product engineering, RAG systems, automation, and full-stack delivery.</p>
                </div>

                <div className="glass space-y-4 rounded-2xl p-5">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-300/80">{siteContent.contactPage.contactInfoLabel}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-steel-400">
                      <MapPin size={13} className="text-ice-400 flex-shrink-0" />
                      <span>{contact.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-steel-400">
                      <Clock size={13} className="text-ice-400 flex-shrink-0" />
                      <span>Response time: <span className="text-white font-mono">{contact.responseTime}</span></span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-steel-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                      <span>{contact.availability}</span>
                    </div>
                  </div>
                </div>

                <div className="glass space-y-3 rounded-2xl p-5">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-300/80">{siteContent.contactPage.channelsLabel}</h3>
                  {contact.channels.map((ch) => {
                    const Icon = iconMap[ch.icon] ?? Mail;
                    return (
                      <a
                        key={ch.label}
                        href={ch.href}
                        target={ch.href.startsWith('http') ? '_blank' : undefined}
                        rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all hover:border-cyan-400/20 hover:bg-white/[0.04]"
                      >
                        <div className="w-8 h-8 rounded-lg glass flex items-center justify-center flex-shrink-0">
                          <Icon size={14} className="text-ice-400" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-white">{ch.label}</div>
                          <div className="text-[10px] font-mono text-steel-500 truncate">{ch.value}</div>
                        </div>
                        <ArrowUpRight size={13} className="ml-auto text-steel-600 group-hover:text-cyan-300" />
                      </a>
                    );
                  })}
                </div>

                <div className="glass space-y-2 rounded-2xl p-5">
                  <h3 className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-300/80">{siteContent.contactPage.faqLabel}</h3>
                  {contact.faqs.map((faq, i) => (
                    <div key={i} className="border border-white/5 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left text-xs font-medium text-steel-300 hover:text-white transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={12}
                          className={`flex-shrink-0 transition-transform text-steel-500 ${openFaq === i ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {openFaq === i && (
                        <div className="px-4 pb-3 pt-2 text-xs text-steel-400 leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl border-white/10 p-6 sm:p-8">
                {sent ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl glass flex items-center justify-center border border-emerald-400/30"
                      style={{ boxShadow: '0 0 24px rgba(34,197,94,0.15)' }}
                    >
                      <Send size={24} className="text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{siteContent.contactPage.successTitle}</h3>
                    <p className="text-sm text-steel-400 max-w-xs">
                      I'll be in touch within {contact.responseTime}. {siteContent.contactPage.successBody}
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm({ name: '', email: '', type: 'Full-time', message: '' });
                      }}
                      className="mt-2 px-5 py-2 rounded-lg glass border border-white/10 text-sm font-medium text-steel-300 hover:text-white transition-colors"
                    >
                      {siteContent.contactPage.sendAnotherLabel}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-300/80">Inquiry workspace</p><h3 className="mt-2 text-xl font-semibold text-white">Tell me what you&apos;re building.</h3></div><Mail size={20} className="text-cyan-300/60" /></div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-steel-400">Name</label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Soham Soni"
                          className="w-full bg-obsidian-900/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-steel-200 font-mono placeholder:text-steel-600 focus:outline-none focus:border-ice-400/30 transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-steel-400">Email</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@company.com"
                          className="w-full bg-obsidian-900/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-steel-200 font-mono placeholder:text-steel-600 focus:outline-none focus:border-ice-400/30 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-steel-400">Engagement Type</label>
                      <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="w-full bg-obsidian-900/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-steel-200 font-mono focus:outline-none focus:border-ice-400/30 transition-colors"
                      >
                        {siteContent.contactPage.engagementTypes.map((t) => (
                          <option key={t} value={t} className="bg-obsidian-900">{t}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-steel-400">Message</label>
                      <textarea
                        required
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell me about your project, timeline, and what you're looking for..."
                        className="w-full bg-obsidian-900/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-steel-200 font-mono placeholder:text-steel-600 resize-none focus:outline-none focus:border-ice-400/30 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-ice-400 text-obsidian-950 font-semibold text-sm transition-all hover:bg-ice-500"
                      style={{ boxShadow: '0 0 24px rgba(56,189,248,0.3)' }}
                    >
                      <Send size={15} />
                      <span>Send Message</span>
                    </button>

                    <p className="text-center text-[10px] font-mono text-steel-600">
                      {siteContent.contactPage.disclaimerLine}
                    </p>
                  </form>
                )}
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