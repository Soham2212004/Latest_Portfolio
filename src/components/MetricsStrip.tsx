import { metrics, siteContent } from '@/data/portfolio';
import { Award, Server, Trophy, Cpu } from 'lucide-react';

const icons = [Award, Server, Trophy, Cpu];

export default function MetricsStrip() {
  return (
    <section className="relative border-y border-white/5 bg-white/[0.015] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md glass mb-5">
              <span className="text-xs font-mono tracking-wider text-ice-400">
                [ {siteContent.metrics.eyebrow} ]
              </span>
            </div>
            <h2 className="max-w-md text-3xl sm:text-4xl font-bold text-white tracking-tight">
              The proof is in the shipping.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-steel-400">
              A practical record of the systems, products, and learning loops behind the work.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {metrics.map((metric, i) => {
            const Icon = icons[i];
            return (
              <div
                key={metric.label}
                className="group relative min-h-40 bg-obsidian-950/90 p-5 transition-colors hover:bg-obsidian-900/90 lg:p-6"
              >
                <div className="flex items-start justify-between">
                  <Icon size={18} className="text-ice-400 transition-transform group-hover:-translate-y-0.5" />
                  <span className="text-[9px] font-mono text-steel-600">0{i + 1}</span>
                </div>
                <div className="mt-8 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white font-mono">
                    {metric.value}
                  </span>
                  <span className="text-sm font-mono text-ice-400">{metric.unit}</span>
                </div>
                <p className="mt-2 text-[11px] leading-snug text-steel-400">{metric.label}</p>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
