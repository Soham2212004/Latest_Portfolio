import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navLinks, profile } from '@/data/portfolio';
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  BrainCircuit,
  Code2,
  FolderKanban,
  House,
  Info,
  Mail,
  Menu,
  Network,
  X,
} from 'lucide-react';

const iconMap: Record<string, typeof House> = {
  Home: House,
  About: Info,
  'AI Studio': BrainCircuit,
  Skills: Code2,
  Certifications: Award,
  Projects: FolderKanban,
  Experience: BriefcaseBusiness,
  Contact: Mail,
};

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

  const activeLink = navLinks.find(isActive);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${scrolled
          ? 'bg-obsidian-950/95 border-ice-400/20'
          : 'bg-obsidian-950/70 border-white/10'
        } backdrop-blur-xl`}
      style={{ boxShadow: '0 1px 0 0 rgba(56,189,248,0.12), 0 8px 24px rgba(3,7,18,0.18)' }}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        <button onClick={() => navigate('/')} className="group flex min-w-0 items-center gap-3 text-left" aria-label="Go to homepage">
          <img
            src={profile.portraitImage}
            alt={`${profile.fullName} profile`}
            className="h-9 w-9 flex-shrink-0 rounded-xl border border-ice-400/30 object-cover transition-colors group-hover:border-ice-300/60"
          />
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-sm font-semibold tracking-tight text-white">{profile.fullName}</span>
            <span className="mt-0.5 block truncate text-[9px] font-mono uppercase tracking-[0.14em] text-steel-500">AI systems · software</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 rounded-2xl border border-white/8 bg-white/[0.03] p-1 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              aria-current={isActive(link) ? 'page' : undefined}
              className={`relative rounded-xl px-3 py-2 text-[11px] font-mono font-medium tracking-wide transition-all group ${isActive(link) ? 'bg-ice-400/10 text-ice-300' : 'text-steel-500 hover:bg-white/[0.05] hover:text-steel-200'}`}
            >
              <span>{link.label}</span>
              {link.comingSoon && (
                <span className="ml-1.5 inline-block px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                  Soon
                </span>
              )}
              {isActive(link) && (
                <span className="absolute inset-x-3 -bottom-px h-px bg-ice-400" />
              )}
            </button>
          ))}
        </div>

        <button onClick={() => navigate('/contact')} className="hidden items-center gap-1.5 rounded-lg bg-ice-400 px-3 py-2 text-[11px] font-semibold text-obsidian-950 transition-colors hover:bg-ice-300 lg:flex">
          Start a conversation <ArrowUpRight size={13} />
        </button>

        {/* Mobile toggle */}
        <button
          className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-steel-300 transition-colors hover:border-ice-400/30 hover:text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className="text-[10px] font-mono uppercase tracking-wider">{activeLink?.label ?? 'Menu'}</span>
          {mobileOpen ? <X size={17} /> : <Menu size={17} />}
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
        <div className="border-b border-ice-400/15 bg-obsidian-950/95 backdrop-blur-xl lg:hidden">
          <div className="px-4 pb-5 pt-3">
            <p className="mb-3 px-3 text-[10px] font-mono uppercase tracking-[0.18em] text-steel-600">Navigate the portfolio</p>
            <div className="grid gap-1 sm:grid-cols-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${isActive(link) ? 'border-ice-400/20 bg-ice-400/10 text-white' : 'border-transparent text-steel-300 hover:border-white/8 hover:bg-white/5 hover:text-white'}`}
              >
                {(() => { const Icon = iconMap[link.label] ?? Network; return <Icon size={15} className={isActive(link) ? 'text-ice-300' : 'text-steel-500'} />; })()}
                <span className="text-sm font-medium">{link.label}</span>
                {link.comingSoon && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                    Soon
                  </span>
                )}
              </button>
            ))}
            </div>
            <button onClick={() => handleNavClick({ label: 'Contact', href: '/contact', comingSoon: false })} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-ice-400 px-4 py-3 text-sm font-semibold text-obsidian-950 hover:bg-ice-300">Start a conversation <ArrowUpRight size={14} /></button>
          </div>
        </div>
      )}
    </header>
  );
}