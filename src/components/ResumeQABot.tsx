import { useState, useCallback, useRef } from 'react';
import PipelineSingleton from '@/lib/pipelines';
import { getResumeChunks } from '@/data/resume';
import { siteContent } from '@/data/portfolio';
import { Loader2, MessageCircleQuestion, FileSearch } from 'lucide-react';

const SAMPLES = siteContent.resumeBot.sampleQuestions;
const SYSTEM_PROMPT = siteContent.resumeBot.systemPrompt;
const TOP_K = 5;

function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

// Small keyword-overlap boost on top of embedding similarity — with a
// short resume corpus like this, a lightweight hybrid score noticeably
// improves retrieval over pure embeddings alone.
function keywordBoost(question: string, chunk: string): number {
  const stopwords = new Set(['the', 'a', 'an', 'is', 'are', 'he', 'his', 'does', 'do', 'has', 'have', 'in', 'at', 'of', 'to', 'and', 'with']);
  const qWords = question.toLowerCase().match(/\w+/g)?.filter((w) => !stopwords.has(w)) ?? [];
  const chunkLower = chunk.toLowerCase();
  const hits = qWords.filter((w) => chunkLower.includes(w)).length;
  return qWords.length > 0 ? hits / qWords.length : 0;
}

export default function ResumeQABot() {
  const [question, setQuestion] = useState(SAMPLES[0]);
  const [running, setRunning] = useState(false);
  const [answer, setAnswer] = useState<{ text: string } | null>(null);

  const chunksRef = useRef<string[]>(getResumeChunks());
  const chunkEmbeddingsRef = useRef<Float32Array[] | null>(null);
  const ready = useRef(false);

  const ask = useCallback(async () => {
    if (!question.trim()) return;
    setAnswer(null);
    setRunning(true);

    // Yield to the browser so it can paint the "running" state before
    // the (synchronous, main-thread-blocking) WASM inference starts.
    // Without this, cached/fast runs can freeze the tab before React
    // ever gets to render the spinner.
    await new Promise((resolve) => setTimeout(resolve, 50));

    if (!ready.current) {
      const embedder = await PipelineSingleton.getEmbedder();

      const chunkEmbeddings: Float32Array[] = [];
      for (const chunk of chunksRef.current) {
        const out = await embedder(chunk, { pooling: 'mean', normalize: true });
        chunkEmbeddings.push(out.data as Float32Array);
      }
      chunkEmbeddingsRef.current = chunkEmbeddings;

      await PipelineSingleton.getGenerator();

      ready.current = true;
    }

    const embedder = await PipelineSingleton.getEmbedder();
    const qOut = await embedder(question, { pooling: 'mean', normalize: true });
    const qEmbedding = qOut.data as Float32Array;

    const ranked = chunksRef.current
      .map((chunk, i) => {
        const semanticScore = cosineSimilarity(qEmbedding, chunkEmbeddingsRef.current![i]);
        const keywordScore = keywordBoost(question, chunk);
        return { chunk, score: semanticScore * 0.7 + keywordScore * 0.3 };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K);

    const context = ranked
      .slice()
      .reverse()
      .map((r) => r.chunk)
      .join('\n');

    const prompt = `${SYSTEM_PROMPT}\n\nContext:\n${context}\n\nQuestion: ${question}\n\nAnswer:`;

    const generator = await PipelineSingleton.getGenerator();
    const output = await generator(prompt, { max_new_tokens: 150 });
    const generatedText = Array.isArray(output) ? output[0].generated_text : output.generated_text;

    setAnswer({
      text: generatedText.trim(),
    });
    setRunning(false);
  }, [question]);

  return (
    <div className="glass rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white font-mono">{siteContent.resumeBot.heading}</h3>
        <span className="text-[10px] font-mono text-steel-500">{siteContent.resumeBot.tagline}</span>
      </div>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={2}
        maxLength={200}
        className="w-full bg-obsidian-900/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-steel-200 font-mono resize-none focus:outline-none focus:border-ice-400/30 transition-colors"
        placeholder="Ask something about my background..."
      />

      <div className="flex flex-wrap gap-2">
        {SAMPLES.map((s) => (
          <button
            key={s}
            onClick={() => setQuestion(s)}
            className="text-xs px-2.5 py-1.5 rounded-md bg-white/[0.03] border border-white/5 text-steel-400 hover:text-ice-400 hover:border-ice-400/20 transition-all"
          >
            {s}
          </button>
        ))}
      </div>

      <button
        onClick={ask}
        disabled={running}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-ice-400 text-obsidian-950 font-semibold text-sm transition-all hover:bg-ice-500 disabled:opacity-50"
      >
        {running ? <Loader2 size={14} className="animate-spin" /> : <MessageCircleQuestion size={14} />}
        {running ? 'Analyzing your question…' : 'Ask'}
      </button>

      {(running || answer) && (
        <div className="pt-3 border-t border-white/5">
          <div className="flex items-start gap-2">
            {running ? (
              <>
                <Loader2 size={16} className="text-ice-400 mt-0.5 shrink-0 animate-spin" />
                <p className="text-sm text-steel-400 leading-relaxed">Analyzing your question…</p>
              </>
            ) : (
              <>
                <FileSearch size={16} className="text-ice-400 mt-0.5 shrink-0" />
                <p className="text-sm text-white font-medium leading-relaxed">{answer!.text}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}