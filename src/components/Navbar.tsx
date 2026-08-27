import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navLinks, profile } from '@/data/portfolio';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onComingSoon }: { onComingSoon: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (link: (typeof navLinks)[number]) => {
    if (link.comingSoon) {
      onComingSoon();
    } else if (link.href.startsWith('/')) {
      navigate(link.href);
    } else if (link.href.startsWith('#')) {
      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const isActive = (link: (typeof navLinks)[number]) => {
    if (link.href.startsWith('/')) return location.pathname === link.href;
    return false;
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-obsidian-950/80 backdrop-blur-xl border-b border-ice-400/20'
          : 'bg-transparent border-b border-transparent'
        }`}
      style={
        scrolled
          ? { boxShadow: '0 1px 0 0 rgba(56,189,248,0.15), 0 0 24px rgba(56,189,248,0.04)' }
          : undefined
      }
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Node-graph mark — nods to the RAG/pipeline graphs Soham builds */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="transition-transform group-hover:scale-110">
            {/* Connecting edges */}
            <line x1="10" y1="26" x2="18" y2="10" stroke="#38BDF8" strokeWidth="1.5" opacity="0.4" />
            <line x1="18" y1="10" x2="26" y2="26" stroke="#38BDF8" strokeWidth="1.5" opacity="0.4" />
            <line x1="10" y1="26" x2="26" y2="26" stroke="#38BDF8" strokeWidth="1.5" opacity="0.25" />
            {/* Nodes */}
            <circle cx="18" cy="10" r="3" fill="#00E5FF" />
            <circle cx="10" cy="26" r="2.5" fill="#38BDF8" opacity="0.85" />
            <circle cx="26" cy="26" r="2.5" fill="#38BDF8" opacity="0.85" />
            {/* Live pulse on the top node */}
            <circle cx="18" cy="10" r="5" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.5" className="animate-ping origin-center" />
          </svg>
          <span className="font-mono text-sm font-semibold text-white tracking-tight">
            {profile.monogram}
            <span className="text-ice-400">.ai</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="relative px-3 py-2 text-sm font-mono font-medium transition-colors group"
            >
              <span className={isActive(link) ? 'text-ice-400' : 'text-steel-400 group-hover:text-steel-200'}>
                <span className="opacity-0 group-hover:opacity-100 -mr-1 transition-opacity text-ice-400/60">[</span>
                {link.label}
                <span className="opacity-0 group-hover:opacity-100 -ml-1 transition-opacity text-ice-400/60">]</span>
              </span>
              {link.comingSoon && (
                <span className="ml-1.5 inline-block px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                  Soon
                </span>
              )}
              {isActive(link) && (
                <span className="absolute -bottom-px left-3 right-3 h-px bg-gradient-to-r from-transparent via-ice-400 to-transparent" />
              )}
            </button>
          ))}
        </div>

        {/* Status indicator */}
        <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-full glass">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          <span className="text-xs font-mono text-steel-400">{profile.status.label}</span>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-steel-300 p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Real scroll-progress indicator, not decorative */}
      <div className="h-[2px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-ice-600 to-ice-400 transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-obsidian-950/95 backdrop-blur-xl border-b border-ice-400/15">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-steel-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                <span className={isActive(link) ? 'text-ice-400' : ''}>{link.label}</span>
                {link.comingSoon && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                    Soon
                  </span>
                )}
              </button>
            ))}
            <div className="flex items-center gap-2.5 px-3 py-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="text-xs font-mono text-steel-400">{profile.status.label}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}