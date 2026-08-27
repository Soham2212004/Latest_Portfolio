import { socials, profile, siteContent } from '@/data/portfolio';
import { Github, Linkedin, Award, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  credly: Award,
  email: Mail,
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <path d="M6 6 L18 18 L6 30 M30 6 L18 18 L30 30 M6 6 L30 6 M6 30 L30 30"
                stroke="#38BDF8" strokeWidth="1" opacity="0.5" />
              <circle cx="18" cy="18" r="2.5" fill="#38BDF8" />
            </svg>
            <span className="font-mono text-sm text-steel-400">
              {profile.monogram}<span className="text-ice-400">.ai</span> / {siteContent.footer.roleLine}
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = iconMap[social.icon] ?? FileText;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg glass glass-hover flex items-center justify-center text-steel-400 hover:text-ice-400 transition-colors"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-xs font-mono text-steel-500">
            © {new Date().getFullYear()} — {siteContent.footer.copyrightLine}
          </p>
        </div>

        {/* Bottom telemetry line */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-steel-600">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
            {siteContent.footer.telemetry.status}
          </span>
          <span>|</span>
          <span>{siteContent.footer.telemetry.build}</span>
          <span>|</span>
          <span>{siteContent.footer.telemetry.uptime}</span>
          <span>|</span>
          <span>{siteContent.footer.telemetry.latency}</span>
        </div>
      </div>
    </footer>
  );
}
