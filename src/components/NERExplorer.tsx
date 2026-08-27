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

export default function NERExplorer() {
    const [input, setInput] = useState(SAMPLES[0]);
    const [loadingModel, setLoadingModel] = useState(false);
    const [progress, setProgress] = useState(0);
    const [running, setRunning] = useState(false);
    const [entities, setEntities] = useState<Entity[] | null>(null);
    const ready = useRef(false);

    const analyze = useCallback(async () => {
        if (!input.trim()) return;
        setRunning(true);
        if (!ready.current) {
            setLoadingModel(true);
            await PipelineSingleton.getNER((s: any) => {
                if (s.status === 'progress' && s.progress) setProgress(Math.round(s.progress));
            });
            ready.current = true;
            setLoadingModel(false);
        }
        const ner = await PipelineSingleton.getNER();
        const output = await ner(input, { aggregation_strategy: 'simple' });
        setEntities(output as Entity[]);
        setRunning(false);
    }, [input]);

    const segments: { text: string; entity?: Entity }[] = [];
    if (entities) {
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
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                maxLength={300}
                className="w-full bg-obsidian-900/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-steel-200 font-mono resize-none focus:outline-none focus:border-ice-400/30 transition-colors"
                placeholder="Type a sentence containing names, places, or organizations..."
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
                {running ? <Loader2 size={14} className="animate-spin" /> : <ScanSearch size={14} />}
                {loadingModel ? `Downloading model… ${progress}%` : running ? 'Scanning entities…' : 'Extract Entities'}
            </button>

            {entities && (
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