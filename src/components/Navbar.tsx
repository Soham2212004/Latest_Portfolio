import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navLinks } from '@/data/portfolio';
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
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${scrolled
          ? 'bg-obsidian-950/95 border-ice-400/20'
          : 'bg-obsidian-950/70 border-white/10'
        } backdrop-blur-xl`}
      style={{ boxShadow: '0 1px 0 0 rgba(56,189,248,0.12), 0 8px 24px rgba(3,7,18,0.18)' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.5rem] flex items-center justify-center">

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center justify-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="relative px-3 py-2 text-xs font-mono font-medium tracking-wide transition-colors group"
            >
              <span className={isActive(link) ? 'text-ice-400' : 'text-steel-400 group-hover:text-steel-200'}>
                {link.label}
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

        {/* Mobile toggle */}
        <button
          className="lg:hidden justify-self-end text-steel-300 p-2"
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
          </div>
        </div>
      )}
    </header>
  );
}