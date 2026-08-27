import { useEffect } from 'react';
import { comingSoonMessage, siteContent } from '@/data/portfolio';
import { X, Wrench } from 'lucide-react';

export default function ComingSoonModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-sm" />

      <div
        className="relative glass rounded-2xl p-8 max-w-md w-full text-center glow-border"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-steel-500 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto mb-5 animate-glow-pulse">
          <Wrench size={28} className="text-ice-400" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md glass mb-4">
          <span className="text-xs font-mono tracking-wider text-ice-400">[ {siteContent.comingSoon.eyebrow} ]</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3">{siteContent.comingSoon.title}</h3>
        <p className="text-sm text-steel-400 leading-relaxed">{comingSoonMessage}</p>

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
          <span className="text-xs font-mono text-steel-500">{siteContent.comingSoon.footerNote}</span>
        </div>
      </div>
    </div>
  );
}
