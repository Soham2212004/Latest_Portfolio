// ResumeQABot — Groq-powered RAG
//
// Pipeline:
//   1. Normalize question   (remap vague queries to resume-specific phrasing)
//   2. Embed question       (all-MiniLM-L6-v2, in-browser via Xenova)
//   3. Rank chunks          (cosine + keyword hybrid, precomputed embeddings)
//   4. Generate answer      (Groq API — qwen/qwen3.8-27b, FREE tier)

import { useState, useCallback, useRef } from 'react';
import PipelineSingleton from '@/lib/pipelines';
import { getResumeChunks } from '@/data/resume';
import { siteContent } from '@/data/portfolio';
import precomputedEmbeddings from '@/data/resume-embeddings.json';
import { Loader2, MessageCircleQuestion, FileSearch, AlertCircle } from 'lucide-react';

const SAMPLES      = siteContent.resumeBot.sampleQuestions;
const TOP_K        = 5;
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string;
const GROQ_MODEL   = 'qwen/qwen3.8-27b';

// ── Question normalizer ───────────────────────────────────────────────────────

const QUESTION_MAP: { pattern: RegExp; replacement: string }[] = [
  {
    pattern: /^(who are you|tell me about yourself|introduce yourself)[?.]?$/i,
    replacement: 'What is Soham Soni background and specialization?',
  },
  {
    pattern: /^what (do you do|is your job|is your role)[?.]?$/i,
    replacement: 'What does Soham Soni specialize in professionally?',
  },
  {
    pattern: /^where (do you work|are you working)[?.]?$/i,
    replacement: 'Where does Soham Soni currently work?',
  },
  {
    pattern: /^what (are your skills|can you do|technologies do you know)[?.]?$/i,
    replacement: 'What are Soham Soni programming skills and technical expertise?',
  },
  {
    pattern: /^what (projects|have you built|did you build)[?.]?$/i,
    replacement: 'What projects has Soham Soni built?',
  },
  {
    pattern: /^(where are you from|where do you live|what is your location)[?.]?$/i,
    replacement: 'Where is Soham Soni based?',
  },
  {
    pattern: /^what (certifications|certificates)[?.]?$/i,
    replacement: 'What certifications does Soham Soni hold?',
  },
  {
    pattern: /^what (is your education|did you study|degree)[?.]?$/i,
    replacement: 'What is Soham Soni educational background and degree?',
  },
  {
    pattern: /^(how can i contact|what is your email|contact info)[?.]?$/i,
    replacement: 'What is Soham Soni email and contact information?',
  },
];

function normalizeQuestion(q: string): string {
  const trimmed = q.trim();
  for (const { pattern, replacement } of QUESTION_MAP) {
    if (pattern.test(trimmed)) return replacement;
  }
  return /soham/i.test(trimmed) ? trimmed : `Soham Soni — ${trimmed}`;
}

// ── Retrieval helpers ─────────────────────────────────────────────────────────

function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

function keywordBoost(question: string, chunk: string): number {
  const stopwords = new Set([
    'the','a','an','is','are','he','his','she','her',
    'does','do','has','have','in','at','of','to','and',
    'with','what','where','when','who','how','did','was','soham','soni',
  ]);
  const qWords =
    question.toLowerCase().match(/\w+/g)?.filter((w) => !stopwords.has(w)) ?? [];
  const chunkLower = chunk.toLowerCase();
  const hits = qWords.filter((w) => chunkLower.includes(w)).length;
  return qWords.length > 0 ? hits / qWords.length : 0;
}

function buildContext(
  question: string,
  chunks: string[],
  chunkEmbeddings: Float32Array[],
  qEmbedding: Float32Array,
  topK: number,
): string {
  return chunks
    .map((chunk, i) => {
      const semantic = cosineSimilarity(qEmbedding, chunkEmbeddings[i]);
      const keyword  = keywordBoost(question, chunk);
      return { chunk, score: semantic * 0.7 + keyword * 0.3 };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .reverse()
    .map((r) => r.chunk)
    .join('\n');
}

// ── Groq API call ─────────────────────────────────────────────────────────────

async function askGroq(question: string, context: string): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('VITE_GROQ_API_KEY is not set in your .env file.');
  }

  // NOTE: Qwen3 on Groq does NOT support the `thinking` parameter.
  // Disable chain-of-thought via the system prompt instead — "/no_think"
  // is Qwen3's official instruction to skip internal reasoning.
  const systemPrompt = `You are a helpful assistant answering questions about Soham Soni's professional background. /no_think
You are given relevant excerpts from his resume as context.
Answer concisely and naturally in 1-2 sentences using ONLY the information provided in the context.
If the context does not contain enough information, say "I don't have that detail in my resume."
Never make up information. Never say "based on the context" — just answer directly.`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.2,
      max_tokens: 150,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Context:\n${context}\n\nQuestion: ${question}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const raw  = data.choices?.[0]?.message?.content?.trim() ?? '';

  // Qwen3 sometimes wraps reasoning in <think>...</think> tags even
  // without the thinking parameter. Strip them out if present.
  return raw.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
}

// ── Component ─────────────────────────────────────────────────────────────────

interface AnswerState {
  text: string;
}

export default function ResumeQABot() {
  const [question, setQuestion] = useState(SAMPLES[0]);
  const [running, setRunning]   = useState(false);
  const [stage, setStage]       = useState('');
  const [answer, setAnswer]     = useState<AnswerState | null>(null);
  const [error, setError]       = useState<string | null>(null);

  const chunksRef          = useRef<string[]>(getResumeChunks());
  const chunkEmbeddingsRef = useRef<Float32Array[] | null>(null);
  const ready              = useRef(false);

  const ask = useCallback(async () => {
    if (!question.trim()) return;

    setAnswer(null);
    setError(null);
    setRunning(true);
    setStage('Loading embedder…');

    await new Promise((r) => setTimeout(r, 50));

    try {
      // ── One-time init ────────────────────────────────────────────────────
      if (!ready.current) {
        if (precomputedEmbeddings.chunkCount !== chunksRef.current.length) {
          console.warn('[ResumeQABot] Stale embeddings — run: npx tsx scripts/precompute-embeddings.ts');
        }

        chunkEmbeddingsRef.current = (precomputedEmbeddings.embeddings as number[][]).map(
          (arr) => new Float32Array(arr),
        );

        await PipelineSingleton.getEmbedder();
        ready.current = true;
      }

      // ── Normalize + embed question ────────────────────────────────────────
      setStage('Searching resume…');
      const normalizedQ = normalizeQuestion(question);

      const embedder   = await PipelineSingleton.getEmbedder();
      const qOut       = await embedder(normalizedQ, { pooling: 'mean', normalize: true });
      const qEmbedding = qOut.data as Float32Array;

      // ── Retrieve top-K context chunks ─────────────────────────────────────
      if (!chunkEmbeddingsRef.current) throw new Error('Embeddings not loaded.');

      const context = buildContext(
        normalizedQ,
        chunksRef.current,
        chunkEmbeddingsRef.current,
        qEmbedding,
        TOP_K,
      );

      // ── Generate answer via Groq ──────────────────────────────────────────
      setStage('Generating answer…');
      const text = await askGroq(question, context);

      if (!text) throw new Error('Empty response from Groq.');
      setAnswer({ text });

    } catch (err: any) {
      console.error('[ResumeQABot]', err);
      setError(err?.message ?? 'Something went wrong. Check the console.');
    } finally {
      setRunning(false);
      setStage('');
    }
  }, [question]);

  return (
    <div className="glass rounded-2xl p-5 space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white font-mono">
          {siteContent.resumeBot.heading}
        </h3>
        <span className="text-[10px] font-mono text-steel-500">
          {siteContent.resumeBot.tagline}
        </span>
      </div>

      {/* Question input */}
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={2}
        maxLength={200}
        className="w-full bg-obsidian-900/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-steel-200 font-mono resize-none focus:outline-none focus:border-ice-400/30 transition-colors"
        placeholder="Ask something about my background…"
      />

      {/* Sample chips */}
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

      {/* Ask button */}
      <button
        onClick={ask}
        disabled={running || !question.trim()}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-ice-400 text-obsidian-950 font-semibold text-sm transition-all hover:bg-ice-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {running
          ? <Loader2 size={14} className="animate-spin" />
          : <MessageCircleQuestion size={14} />
        }
        {running ? stage : 'Ask'}
      </button>

      {/* Result panel */}
      {(running || answer || error) && (
        <div className="pt-3 border-t border-white/5">
          <div className="flex items-start gap-2">

            {running && (
              <>
                <Loader2 size={16} className="text-ice-400 mt-0.5 shrink-0 animate-spin" />
                <p className="text-sm text-steel-400 leading-relaxed">{stage}</p>
              </>
            )}

            {!running && error && (
              <>
                <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-400 leading-relaxed font-mono">{error}</p>
              </>
            )}

            {!running && !error && answer && (
              <>
                <FileSearch size={16} className="text-ice-400 mt-0.5 shrink-0" />
                <p className="text-sm text-white font-medium leading-relaxed">{answer.text}</p>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}