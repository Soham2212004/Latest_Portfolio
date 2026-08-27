import { useState, useCallback, useRef } from 'react';
import PipelineSingleton from '@/lib/pipelines';
import { Smile, Frown, Loader2, Zap } from 'lucide-react';

const SAMPLES = [
  'I absolutely love how this model runs entirely in my browser.',
  'This deployment pipeline keeps failing and it is frustrating.',
  'The results are okay, nothing special either way.',
];

export default function SentimentAnalyzer() {
  const [input, setInput] = useState(SAMPLES[0]);
  const [loadingModel, setLoadingModel] = useState(false);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ label: string; score: number } | null>(null);
  const ready = useRef(false);

  const analyze = useCallback(async () => {
    if (!input.trim()) return;
    setRunning(true);
    if (!ready.current) {
      setLoadingModel(true);
      await PipelineSingleton.getSentiment((s: any) => {
        if (s.status === 'progress' && s.progress) setProgress(Math.round(s.progress));
      });
      ready.current = true;
      setLoadingModel(false);
    }
    const classifier = await PipelineSingleton.getSentiment();
    const output = await classifier(input);
    const top = Array.isArray(output) ? output[0] : output;
    setResult({ label: top.label, score: top.score });
    setRunning(false);
  }, [input]);

  const isPositive = result?.label === 'POSITIVE';

  return (
    <div className="glass rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white font-mono">SENTIMENT ANALYSIS</h3>
        <span className="text-[10px] font-mono text-steel-500">DistilBERT SST-2 · ONNX · on-device</span>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
        maxLength={300}
        className="w-full bg-obsidian-900/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-steel-200 font-mono resize-none focus:outline-none focus:border-ice-400/30 transition-colors"
        placeholder="Type a sentence to classify..."
      />

      <div className="flex flex-wrap gap-2">
        {SAMPLES.map((s) => (
          <button
            key={s}
            onClick={() => setInput(s)}
            className="text-xs px-2.5 py-1.5 rounded-md bg-white/[0.03] border border-white/5 text-steel-400 hover:text-ice-400 hover:border-ice-400/20 transition-all truncate max-w-[220px]"
          >
            {s.slice(0, 34)}...
          </button>
        ))}
      </div>

      <button
        onClick={analyze}
        disabled={running}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-ice-400 text-obsidian-950 font-semibold text-sm transition-all hover:bg-ice-500 disabled:opacity-50"
      >
        {running ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
        {loadingModel ? `Downloading model… ${progress}%` : running ? 'Running inference…' : 'Analyze Sentiment'}
      </button>

      {result && (
        <div className="pt-3 border-t border-white/5 space-y-2">
          <div className="flex items-center gap-2">
            {isPositive ? <Smile size={18} className="text-success" /> : <Frown size={18} className="text-rose-400" />}
            <span className={`text-sm font-mono font-semibold ${isPositive ? 'text-success' : 'text-rose-400'}`}>
              {result.label}
            </span>
            <span className="text-xs font-mono text-steel-500 ml-auto">
              {(result.score * 100).toFixed(1)}% confidence
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isPositive ? 'bg-gradient-to-r from-green-600 to-success' : 'bg-gradient-to-r from-rose-600 to-rose-400'}`}
              style={{ width: `${result.score * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}