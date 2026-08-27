import { useState, useEffect, useRef, useCallback } from 'react';
import { attentionLab } from '@/data/portfolio';
import { Sparkles, Thermometer, Layers, Send, Zap, Brain } from 'lucide-react';

type Token = { text: string; attention: number[]; pos: number };

const softmax = (arr: number[], temperature: number): number[] => {
  const t = Math.max(0.05, temperature);
  const scaled = arr.map((v) => v / t);
  const max = Math.max(...scaled);
  const exps = scaled.map((v) => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
};

function tokenize(text: string): string[] {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function computeAttention(
  tokens: string[],
  contextLen: number,
  temperature: number,
  heads: number,
): Token[] {
  const vocab: Record<string, number> = {};
  tokens.forEach((t) => {
    if (!(t in vocab)) vocab[t] = Object.keys(vocab).length;
  });

  return tokens.map((token, i) => {
    const windowStart = Math.max(0, i - contextLen);
    const window = tokens.slice(windowStart, i + 1);
    const headAttentions: number[] = [];

    for (let h = 0; h < heads; h++) {
      const scores = window.map((w, j) => {
        const posWeight = 1 / (Math.abs(i - (windowStart + j)) + 1);
        const simWeight = w === token ? 1.5 : w[0] === token[0] ? 0.6 : 0.3;
        const headBias = Math.sin((h + 1) * 0.7 + i * 0.3) * 0.4 + 0.5;
        return posWeight * simWeight * headBias;
      });
      const sm = softmax(scores, temperature);
      headAttentions.push(sm[sm.length - 1] ?? 0);
    }

    return { text: token, attention: headAttentions, pos: i };
  });
}

const HEAD_COLORS = [
  { stroke: 'rgba(56, 189, 248, ', fill: 'rgba(56, 189, 248, ', label: 'Cyan' },
  { stroke: 'rgba(99, 102, 241, ', fill: 'rgba(99, 102, 241, ', label: 'Indigo' },
  { stroke: 'rgba(34, 197, 94, ', fill: 'rgba(34, 197, 94, ', label: 'Green' },
  { stroke: 'rgba(245, 158, 11, ', fill: 'rgba(245, 158, 11, ', label: 'Amber' },
];

export default function InteractiveAttentionLab() {
  const [input, setInput] = useState(attentionLab.samplePrompts[0]);
  const [contextLen, setContextLen] = useState(6);
  const [temperature, setTemperature] = useState(0.8);
  const [activeHead, setActiveHead] = useState(0);
  const [hoveredToken, setHoveredToken] = useState<number | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [animating, setAnimating] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);

  const recompute = useCallback(() => {
    const toks = tokenize(input);
    if (toks.length === 0) {
      setTokens([]);
      return;
    }
    setTokens(computeAttention(toks, contextLen, temperature, attentionLab.heads));
  }, [input, contextLen, temperature]);

  useEffect(() => {
    recompute();
  }, [recompute]);

  useEffect(() => {
    if (!animating) return;
    let raf = 0;
    const tick = () => {
      setPulsePhase((p) => (p + 0.02) % 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animating]);

  const nextTokenPredictions =
    tokens.length > 0
      ? (() => {
          const lastToken = tokens[tokens.length - 1];
          const cats = attentionLab.tokenCategories;
          const baseScores = cats.map((_, ci) => {
            const headSum = lastToken.attention.reduce((a, h) => a + h, 0);
            return Math.sin(ci * 1.3 + lastToken.pos * 0.5) * 0.5 + headSum * 0.3 + 0.3;
          });
          const probs = softmax(baseScores, temperature);
          return cats.map((cat, i) => ({ category: cat, prob: probs[i] }));
        })()
      : attentionLab.tokenCategories.map((cat) => ({ category: cat, prob: 0.25 }));

  const maxTokenCount = 12;
  const displayTokens = tokens.slice(0, maxTokenCount);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md glass mb-4">
            <Brain size={12} className="text-indigo-400" />
            <span className="text-xs font-mono tracking-wider text-indigo-400">
              [ TRANSFORMER ATTENTION LAB ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Self-Attention Visualizer
          </h2>
          <p className="mt-3 text-steel-400 max-w-2xl mx-auto text-sm sm:text-base">
            {attentionLab.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Input + Controls */}
          <div className="lg:col-span-2 space-y-4">
            {/* Prompt input */}
            <div className="glass rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white font-mono">PROMPT INPUT</h3>
                <Sparkles size={14} className="text-ice-400" />
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={3}
                maxLength={120}
                className="w-full bg-obsidian-900/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-steel-200 font-mono resize-none focus:outline-none focus:border-ice-400/30 transition-colors"
                placeholder="Type a sentence for the model to attend to..."
              />
              <div className="flex flex-wrap gap-2">
                {attentionLab.samplePrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(prompt)}
                    className="text-xs px-2.5 py-1.5 rounded-md bg-white/[0.03] border border-white/5 text-steel-400 hover:text-ice-400 hover:border-ice-400/20 transition-all truncate max-w-[180px]"
                  >
                    {prompt.slice(0, 28)}
                    {prompt.length > 28 ? '...' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="glass rounded-2xl p-5 space-y-5">
              <h3 className="text-sm font-semibold text-white font-mono">HYPERPARAMETERS</h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers size={14} className="text-ice-400" />
                    <span className="text-xs font-medium text-steel-300">Context Length</span>
                  </div>
                  <span className="text-xs font-mono text-ice-400">{contextLen} tokens</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={contextLen}
                  onChange={(e) => setContextLen(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgba(56,189,248,0.5) ${((contextLen - 1) / 11) * 100}%, rgba(255,255,255,0.06) ${((contextLen - 1) / 11) * 100}%)`,
                  }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer size={14} className="text-indigo-400" />
                    <span className="text-xs font-medium text-steel-300">Temperature</span>
                  </div>
                  <span className="text-xs font-mono text-indigo-400">{temperature.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  value={Math.round(temperature * 100)}
                  onChange={(e) => setTemperature(Number(e.target.value) / 100)}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgba(99,102,241,0.5) ${((temperature - 0.05) / 1.95) * 100}%, rgba(255,255,255,0.06) ${((temperature - 0.05) / 1.95) * 100}%)`,
                  }}
                />
              </div>

              {/* Head selector */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-steel-300">Attention Head</span>
                <div className="flex gap-2">
                  {Array.from({ length: attentionLab.heads }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveHead(i)}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-mono border transition-all ${
                        activeHead === i
                          ? 'border-white/15 text-white bg-white/[0.05]'
                          : 'border-white/5 text-steel-500 hover:text-steel-300'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                      >
                        <span
                          className="block w-2 h-2 rounded-full"
                          style={{ backgroundColor: HEAD_COLORS[i].stroke + '0.8)' }}
                        />
                      </span>
                      H{i}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Next-token predictions */}
            <div className="glass rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white font-mono">NEXT-TOKEN LOGITS</h3>
                <Zap size={14} className="text-success" />
              </div>
              {nextTokenPredictions.map((pred) => {
                const pct = pred.prob * 100;
                return (
                  <div key={pred.category} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-steel-400 uppercase">{pred.category}</span>
                      <span className="text-xs font-mono text-white">{pct.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-ice-400 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Attention visualization */}
          <div className="lg:col-span-3 glass rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-steel-500">transformer / self_attention</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
                <span className="text-xs font-mono text-success">LIVE</span>
              </div>
            </div>

            {displayTokens.length === 0 ? (
              <div className="flex items-center justify-center h-[400px] text-steel-500 text-sm">
                Type a prompt to compute attention...
              </div>
            ) : (
              <div className="relative">
                {/* Token grid */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {displayTokens.map((token, i) => {
                    const att = token.attention[activeHead] ?? 0;
                    const isHovered = hoveredToken === i;
                    const isLast = i === displayTokens.length - 1;
                    return (
                      <button
                        key={i}
                        onMouseEnter={() => setHoveredToken(i)}
                        onMouseLeave={() => setHoveredToken(null)}
                        className="relative px-3 py-2 rounded-lg text-sm font-mono transition-all duration-300"
                        style={{
                          background: isLast
                            ? HEAD_COLORS[activeHead].fill + (0.15 + att * 0.25) + ')'
                            : `rgba(255,255,255,${0.02 + att * 0.08})`,
                          border: `1px solid ${HEAD_COLORS[activeHead].stroke + (0.15 + att * 0.5) + ')'}`,
                          boxShadow: isHovered
                            ? `0 0 16px ${HEAD_COLORS[activeHead].stroke + '0.3)'}`
                            : 'none',
                          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                        }}
                      >
                        {token.text}
                        <span
                          className="ml-1.5 text-[10px] text-steel-500"
                        >
                          {att.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Attention weight bar chart */}
                <div className="space-y-1.5 pt-4 border-t border-white/5">
                  <div className="text-xs font-mono text-steel-500 mb-2">
                    Attention weights — Head {activeHead}
                  </div>
                  <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-2">
                    {displayTokens.map((token, i) => {
                      const att = token.attention[activeHead] ?? 0;
                      const isHovered = hoveredToken === i;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-3 group cursor-pointer"
                          onMouseEnter={() => setHoveredToken(i)}
                          onMouseLeave={() => setHoveredToken(null)}
                        >
                          <span className="text-xs font-mono text-steel-400 w-20 truncate text-right">
                            {token.text}
                          </span>
                          <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${att * 100}%`,
                                background: HEAD_COLORS[activeHead].stroke + (isHovered ? '0.9' : '0.6)') + ')',
                                boxShadow: isHovered
                                  ? `0 0 8px ${HEAD_COLORS[activeHead].stroke + '0.4)'}`
                                  : 'none',
                              }}
                            />
                          </div>
                          <span className="text-xs font-mono text-steel-500 w-12 text-right">
                            {(att * 100).toFixed(1)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Animated signal flow SVG */}
                <svg
                  ref={svgRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{ opacity: 0.3 }}
                >
                  {displayTokens.length > 1 && animating &&
                    displayTokens.slice(0, -1).map((_, i) => {
                      const t = (pulsePhase + i * 0.1) % 1;
                      return (
                        <circle
                          key={i}
                          r={2}
                          fill={HEAD_COLORS[activeHead].stroke + '0.6)'}
                          cx={10 + t * 90}
                          cy={20 + i * 8}
                        />
                      );
                    })}
                </svg>
              </div>
            )}

            {/* Footer telemetry */}
            <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center gap-4 text-xs font-mono text-steel-600">
              <span className="flex items-center gap-1.5">
                <Send size={10} className="text-ice-400" />
                {tokens.length} tokens
              </span>
              <span>|</span>
              <span>{attentionLab.heads} heads</span>
              <span>|</span>
              <span>ctx: {contextLen}</span>
              <span>|</span>
              <span>temp: {temperature.toFixed(2)}</span>
              <span>|</span>
              <span className="text-ice-400">softmax(QKᵀ/√d)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
