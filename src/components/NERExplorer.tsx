import { useState, useCallback, useRef } from 'react';
import PipelineSingleton from '@/lib/pipelines';
import { Loader2, ScanSearch } from 'lucide-react';

const SAMPLES = [
    'Soham Soni works at AV DEVS Solutions in Vadodara, India.',
    'Google and Amazon both released new LLM APIs last week.',
    'Sundar Pichai spoke about Gemini at the Cloud conference in Paris.',
];

const ENTITY_COLORS: Record<string, string> = {
    PER: 'bg-indigo-400/20 text-indigo-300 border-indigo-400/30',
    ORG: 'bg-ice-400/20 text-ice-300 border-ice-400/30',
    LOC: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30',
    MISC: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
};

type Entity = { entity_group: string; word: string; score: number; start: number; end: number };

function normalizeEntities(output: Array<Record<string, unknown>>, source: string): Entity[] {
    const normalizeText = (value: string) => value.replace(/^##/, '').replace(/\s+/g, ' ').trim().toLowerCase();
    let searchFrom = 0;
    const candidates = output.map((entity) => {
        const word = String(entity.word ?? '').replace(/^##/, '');
        const reportedStart = Number(entity.start);
        const reportedEnd = Number(entity.end);
        const reportedText = reportedStart >= 0 && reportedEnd > reportedStart ? source.slice(reportedStart, reportedEnd) : '';
        const reportedMatches = normalizeText(reportedText) === normalizeText(word);
        const fallbackStart = word ? source.toLowerCase().indexOf(word.toLowerCase(), searchFrom) : -1;
        const start = reportedMatches ? reportedStart : fallbackStart;
        const end = reportedMatches && Number.isFinite(reportedEnd) && reportedEnd > start
            ? reportedEnd
            : (start >= 0 ? start + word.length : -1);
        if (end >= 0) searchFrom = end;
        return {
            entity_group: String(entity.entity_group ?? entity.entity ?? 'MISC'),
            word,
            score: Number(entity.score ?? 0),
            start,
            end,
        };
    });
    const clean: Entity[] = [];
    for (const entity of candidates.filter((candidate) => candidate.start >= 0 && candidate.end > candidate.start).sort((a, b) => a.start - b.start || a.end - b.end)) {
        const previous = clean[clean.length - 1];
        if (previous && entity.start < previous.end) continue;
        clean.push(entity);
    }
    return clean;
}

export default function NERExplorer() {
    const [input, setInput] = useState(SAMPLES[0]);
    const [loadingModel, setLoadingModel] = useState(false);
    const [progress, setProgress] = useState(0);
    const [running, setRunning] = useState(false);
    const [entities, setEntities] = useState<Entity[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const ready = useRef(false);

    const analyze = useCallback(async () => {
        if (!input.trim()) return;
        setRunning(true);
        setError(null);
        setEntities(null);
        try {
            if (!ready.current) {
                setLoadingModel(true);
                await PipelineSingleton.getNER((s: any) => {
                    if (s.status === 'progress' && typeof s.progress === 'number') setProgress(Math.round(s.progress));
                });
                ready.current = true;
                setLoadingModel(false);
            }
            const ner = await PipelineSingleton.getNER();
            const output = await ner(input, { aggregation_strategy: 'simple' });
            setEntities(normalizeEntities(output as Array<Record<string, unknown>>, input));
        } catch (caught) {
            console.error('[NERExplorer]', caught);
            setError(caught instanceof Error ? caught.message : 'The NER model could not load. Check your network connection and try again.');
        } finally {
            setLoadingModel(false);
            setRunning(false);
        }
    }, [input]);

    const segments: { text: string; entity?: Entity }[] = [];
    if (entities && entities.every((entity) => entity.start >= 0 && entity.end >= 0)) {
        let cursor = 0;
        for (const ent of entities) {
            if (ent.start > cursor) segments.push({ text: input.slice(cursor, ent.start) });
            segments.push({ text: input.slice(ent.start, ent.end), entity: ent });
            cursor = ent.end;
        }
        if (cursor < input.length) segments.push({ text: input.slice(cursor) });
    }

    return (
        <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white font-mono">NAMED ENTITY RECOGNITION</h3>
                <span className="text-[10px] font-mono text-steel-500">BERT-NER · ONNX · on-device</span>
            </div>

            <textarea
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                    setEntities(null);
                    setError(null);
                }}
                rows={2}
                maxLength={300}
                className="w-full bg-obsidian-900/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-steel-200 font-mono resize-none focus:outline-none focus:border-ice-400/30 transition-colors"
                placeholder="Type a sentence containing names, places, or organizations..."
            />

            <div className="flex flex-wrap gap-2">
                {SAMPLES.map((s) => (
                    <button
                        key={s}
                            onClick={() => {
                                setInput(s);
                                setEntities(null);
                                setError(null);
                            }}
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
                {running ? <Loader2 size={14} className="animate-spin" /> : <ScanSearch size={14} />}
                {loadingModel ? `Downloading model… ${progress}%` : running ? 'Scanning entities…' : 'Extract Entities'}
            </button>

            {error && (
                <div className="rounded-lg border border-rose-400/20 bg-rose-400/5 px-3 py-2 text-xs leading-relaxed text-rose-300">
                    {error}
                </div>
            )}

            {entities && !error && (
                <div className="pt-3 border-t border-white/5 space-y-3">
                    <p className="text-sm leading-relaxed font-mono">
                        {segments.map((seg, i) =>
                            seg.entity ? (
                                <span
                                    key={i}
                                    className={`px-1.5 py-0.5 mx-0.5 rounded-md border text-xs ${ENTITY_COLORS[seg.entity.entity_group] ?? ENTITY_COLORS.MISC}`}
                                    title={`${seg.entity.entity_group} · ${(seg.entity.score * 100).toFixed(1)}%`}
                                >
                                    {seg.text}
                                </span>
                            ) : (
                                <span key={i} className="text-steel-300">{seg.text}</span>
                            ),
                        )}
                    </p>
                    {entities.length === 0 && <p className="text-xs text-steel-500">No named entities detected.</p>}
                </div>
            )}
        </div>
    );
}