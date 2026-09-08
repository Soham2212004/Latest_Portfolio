import { socials } from '@/data/portfolio';
import { Github, Linkedin, Award, Mail, FileText } from 'lucide-react';
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
        <div className="flex flex-col items-center gap-6">
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

          <p className="text-xs font-mono text-steel-500">
            © 2026 Soham Soni. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
