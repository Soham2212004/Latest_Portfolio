import { metrics, siteContent } from '@/data/portfolio';
import { Award, Server, Trophy, Cpu } from 'lucide-react';

const icons = [Award, Server, Trophy, Cpu];

export default function MetricsStrip() {
  const doubled = [...metrics, ...metrics];

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md glass mb-4">
            <span className="text-xs font-mono tracking-wider text-ice-400">
              [ {siteContent.metrics.eyebrow} ]
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {siteContent.metrics.title}
          </h2>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, i) => {
            const Icon = icons[i];
            return (
              <div
                key={metric.label}
                className="glass glass-hover rounded-xl p-5 lg:p-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-radial-glow opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="flex items-start justify-between mb-3">
                  <Icon size={20} className="text-ice-400" />
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl lg:text-4xl font-bold text-white font-mono">
                    {metric.value}
                  </span>
                  <span className="text-sm font-mono text-ice-400">{metric.unit}</span>
                </div>
                <p className="text-xs text-steel-400 mt-2 leading-snug">{metric.label}</p>
              </div>
            );
          })}
        </div>

        {/* Ticker strip */}
        <div className="relative overflow-hidden glass rounded-xl py-3">
          <div className="flex gap-8 animate-ticker whitespace-nowrap">
            {doubled.map((metric, i) => (
              <div key={i} className="flex items-center gap-3 px-4">
                <span className="w-1.5 h-1.5 rounded-full bg-ice-400" />
                <span className="text-sm font-mono text-steel-300">
                  {metric.label}: <span className="text-ice-400 font-semibold">{metric.value}{metric.unit}</span>
                </span>
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-obsidian-950 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-obsidian-950 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
