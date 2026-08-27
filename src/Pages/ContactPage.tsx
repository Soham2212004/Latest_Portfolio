import { useState } from 'react';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComingSoonModal from '@/components/ComingSoonModal';
import { contact, siteContent } from '@/data/portfolio';
import { Mail, Linkedin, Github, Award, MapPin, Clock, Send, ChevronDown } from 'lucide-react';

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
    setSent(true);
  };

  return (
    <div className="relative min-h-screen bg-obsidian-950 overflow-x-hidden">
      <NeuralBackground />
      <div className="fixed inset-0 bg-grid-pattern bg-grid-40 pointer-events-none opacity-30" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Navbar onComingSoon={() => setComingSoon(true)} />

        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-14">

              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {siteContent.contactPage.title}
              </h1>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">

              <div className="lg:col-span-2 space-y-5">

                <div className="glass rounded-2xl p-5 space-y-4">
                                    <h3 className="text-sm font-semibold text-white font-mono">{siteContent.contactPage.contactInfoLabel}</h3>
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

                <div className="glass rounded-2xl p-5 space-y-3">
                                    <h3 className="text-sm font-semibold text-white font-mono">{siteContent.contactPage.channelsLabel}</h3>
                  {contact.channels.map((ch) => {
                    const Icon = iconMap[ch.icon] ?? Mail;
                    return (
                      <a
                        key={ch.label}
                        href={ch.href}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-ice-400/20 hover:bg-white/[0.04] transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg glass flex items-center justify-center flex-shrink-0">
                          <Icon size={14} className="text-ice-400" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-white">{ch.label}</div>
                          <div className="text-[10px] font-mono text-steel-500 truncate">{ch.value}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="glass rounded-2xl p-5 space-y-2">
                                   <h3 className="text-sm font-semibold text-white font-mono mb-3">{siteContent.contactPage.faqLabel}</h3>
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

              <div className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8">
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
                                        <h3 className="text-sm font-semibold text-white font-mono mb-6">{siteContent.contactPage.formLabel}</h3>

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