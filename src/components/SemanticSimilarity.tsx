import { useState, useCallback, useRef } from 'react';
import PipelineSingleton from '@/lib/pipelines';
import { Loader2, GitCompare } from 'lucide-react';

function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot; // vectors already L2-normalized by the pipeline
}

export default function SemanticSimilarity() {
  const [textA, setTextA] = useState('A neural network learns patterns from data.');
  const [textB, setTextB] = useState('Deep learning models are trained on examples.');
  const [loadingModel, setLoadingModel] = useState(false);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [similarity, setSimilarity] = useState<number | null>(null);
  const ready = useRef(false);

  const compare = useCallback(async () => {
    if (!textA.trim() || !textB.trim()) return;
    setRunning(true);
    if (!ready.current) {
      setLoadingModel(true);
      await PipelineSingleton.getEmbedder((s: any) => {
        if (s.status === 'progress' && s.progress) setProgress(Math.round(s.progress));
      });
      ready.current = true;
      setLoadingModel(false);
    }
    const embedder = await PipelineSingleton.getEmbedder();
    const [outA, outB] = await Promise.all([
      embedder(textA, { pooling: 'mean', normalize: true }),
      embedder(textB, { pooling: 'mean', normalize: true }),
    ]);
    setSimilarity(cosineSimilarity(outA.data as Float32Array, outB.data as Float32Array));
    setRunning(false);
  }, [textA, textB]);

  const pct = similarity !== null ? Math.max(0, similarity) * 100 : 0;

  return (
    <div className="glass rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white font-mono">SEMANTIC SIMILARITY</h3>
        <span className="text-[10px] font-mono text-steel-500">MiniLM-L6-v2 embeddings · on-device</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <textarea
          value={textA}
          onChange={(e) => setTextA(e.target.value)}
          rows={3}
          className="w-full bg-obsidian-900/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-steel-200 font-mono resize-none focus:outline-none focus:border-ice-400/30 transition-colors"
          placeholder="Sentence A"
        />
        <textarea
          value={textB}
          onChange={(e) => setTextB(e.target.value)}
          rows={3}
          className="w-full bg-obsidian-900/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-steel-200 font-mono resize-none focus:outline-none focus:border-ice-400/30 transition-colors"
          placeholder="Sentence B"
        />
      </div>

      <button
        onClick={compare}
        disabled={running}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-ice-400 text-obsidian-950 font-semibold text-sm transition-all hover:bg-ice-500 disabled:opacity-50"
      >
        {running ? <Loader2 size={14} className="animate-spin" /> : <GitCompare size={14} />}
        {loadingModel ? `Downloading model… ${progress}%` : running ? 'Computing embeddings…' : 'Compare Meaning'}
      </button>

      {similarity !== null && (
        <div className="pt-3 border-t border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-steel-400">Cosine similarity</span>
            <span className="text-sm font-mono font-semibold text-white">{similarity.toFixed(3)}</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-ice-400 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-[10px] font-mono text-steel-600">
            384-dim sentence embeddings compared via dot product (pre-normalized vectors)
          </p>
        </div>
      )}
    </div>
  );
}