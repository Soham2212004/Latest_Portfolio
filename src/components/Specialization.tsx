import { specialization, siteContent, type Skill, type Tool, type Chip } from '@/data/portfolio';
import { Activity, Network, Database, Cloud } from 'lucide-react';

const icons = [Activity, Network, Database, Cloud];

function ProgressBar({ skill }: { skill: Skill }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-steel-300">{skill.name}</span>
        <span className="text-xs font-mono text-ice-400">{skill.level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-ice-600 to-ice-400 transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%`, boxShadow: '0 0 8px rgba(56,189,248,0.4)' }}
        />
      </div>
    </div>
  );
}

function NetworkNode({ tool, index }: { tool: Tool; index: number }) {
  return (
    <div className="relative flex flex-col items-center gap-2 group">
      <div
        className="w-12 h-12 rounded-xl glass flex items-center justify-center transition-all group-hover:border-ice-400/40 group-hover:shadow-lg"
        style={{ boxShadow: '0 0 12px rgba(56,189,248,0.05)' }}
      >
        <span className="text-xs font-mono font-semibold text-steel-300">
          {tool.name.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <span className="text-xs text-steel-400 text-center">{tool.name}</span>
      {index < 4 && (
        <div className="hidden sm:block absolute top-6 left-full w-full h-px neural-line" />
      )}
    </div>
  );
}

function GridTile({ tool }: { tool: Tool }) {
  return (
    <div className="glass glass-hover rounded-lg p-3 flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-steel-300">{tool.name}</div>
        {tool.latency && (
          <div className="text-xs font-mono text-steel-500 mt-0.5">{tool.latency}</div>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
        <span className="text-xs font-mono text-success">{tool.status}</span>
      </div>
    </div>
  );
}

function ChipItem({ chip }: { chip: Chip }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
        chip.active
          ? 'glass border-ice-400/30 text-steel-200'
          : 'bg-white/[0.02] border-white/5 text-steel-500'
      }`}
      style={chip.active ? { boxShadow: '0 0 12px rgba(56,189,248,0.1)' } : undefined}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${chip.active ? 'bg-ice-400 animate-pulse-dot' : 'bg-steel-600'}`}
      />
      {chip.name}
    </span>
  );
}

function QuadrantCard({ section, index }: { section: (typeof specialization)[number]; index: number }) {
  const Icon = icons[index];

  return (
    <div className="glass glass-hover rounded-2xl p-6 lg:p-7 relative overflow-hidden group">
      {/* Top accent line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-ice-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg glass flex items-center justify-center shrink-0">
          <Icon size={18} className="text-ice-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">{section.title}</h3>
          <p className="text-xs font-mono text-steel-500 mt-0.5">{section.subtitle}</p>
        </div>
      </div>

      {/* Render based on type */}
      {section.type === 'bars' && (
        <div className="space-y-4">
          {(section.skills as Skill[]).map((skill) => (
            <ProgressBar key={skill.name} skill={skill} />
          ))}
        </div>
      )}

      {section.type === 'network' && (
        <div className="flex items-start justify-between gap-2 pt-2">
          {(section.tools as Tool[]).map((tool, i) => (
            <NetworkNode key={tool.name} tool={tool} index={i} />
          ))}
        </div>
      )}

      {section.type === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {(section.tools as Tool[]).map((tool) => (
            <GridTile key={tool.name} tool={tool} />
          ))}
        </div>
      )}

      {section.type === 'chips' && (
        <div className="flex flex-wrap gap-2.5 pt-1">
          {(section.tools as Chip[]).map((chip) => (
            <ChipItem key={chip.name} chip={chip} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Specialization() {
  return (
    <section id="specialization" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md glass mb-4">
            <span className="text-xs font-mono tracking-wider text-ice-400">
              [ {siteContent.specialization.eyebrow} ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {siteContent.specialization.title}
          </h2>
          <p className="mt-3 text-steel-400 max-w-2xl mx-auto">
            {siteContent.specialization.description}
          </p>
        </div>

        {/* 4-quadrant grid */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {specialization.map((section, i) => (
            <QuadrantCard key={section.id} section={section} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
