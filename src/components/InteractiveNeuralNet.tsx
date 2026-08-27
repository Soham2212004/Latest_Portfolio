import { useState, useEffect, useCallback, useRef } from 'react';
import { neuralPlayground } from '@/data/portfolio';
import { Code, Database, Cpu, Layers, Play, Pause, RotateCcw } from 'lucide-react';

type Vec = number[];

const inputIcons = [Code, Database, Cpu, Layers];

// Pre-initialized weights — a 4→5→3 multi-layer perceptron
const W1: Vec[] = [
  [0.8, -0.3, 0.5, 0.2, -0.4],
  [0.6, 0.7, -0.2, 0.4, 0.3],
  [-0.5, 0.4, 0.8, -0.3, 0.6],
  [0.3, -0.5, 0.3, 0.7, -0.2],
];
const b1: Vec = [0.1, -0.2, 0.05, 0.15, -0.1];

const W2: Vec[] = [
  [0.6, -0.4, 0.5],
  [0.3, 0.8, -0.3],
  [-0.5, 0.4, 0.6],
  [0.7, -0.2, 0.4],
  [0.2, 0.5, -0.5],
];
const b2: Vec = [0.1, -0.05, 0.12];

const sigmoid = (x: number): number => 1 / (1 + Math.exp(-x));

function forwardProp(inputs: Vec): { hidden: Vec; outputs: Vec } {
  const hidden: Vec = new Array(W1[0].length).fill(0);
  for (let j = 0; j < W1[0].length; j++) {
    let sum = b1[j];
    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * W1[i][j];
    }
    hidden[j] = sigmoid(sum);
  }

  const outputs: Vec = new Array(W2[0].length).fill(0);
  for (let j = 0; j < W2[0].length; j++) {
    let sum = b2[j];
    for (let i = 0; i < hidden.length; i++) {
      sum += hidden[i] * W2[i][j];
    }
    outputs[j] = sigmoid(sum);
  }

  return { hidden, outputs };
}

const NODE_R = 14;
const LAYER_X = [0.08, 0.5, 0.92];
const HIDDEN_COUNT = 5;

export default function InteractiveNeuralNet() {
  const [inputs, setInputs] = useState<number[]>(
    neuralPlayground.inputs.map((i) => i.default / 100),
  );
  const [animating, setAnimating] = useState(true);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [outputs, setOutputs] = useState<Vec>([0.5, 0.5, 0.5]);
  const [hidden, setHidden] = useState<Vec>(new Array(HIDDEN_COUNT).fill(0.5));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Forward propagation
  useEffect(() => {
    const result = forwardProp(inputs);
    setHidden(result.hidden);
    setOutputs(result.outputs);
  }, [inputs]);

  // Pulse animation
  useEffect(() => {
    if (!animating) return;
    let raf = 0;
    const tick = () => {
      setPulsePhase((p) => (p + 0.015) % 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animating]);

  // Draw network on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width;
    const H = rect.height;

    ctx.clearRect(0, 0, W, H);

    const inputCount = inputs.length;
    const layers = [
      { count: inputCount, x: W * LAYER_X[0], values: inputs },
      { count: HIDDEN_COUNT, x: W * LAYER_X[1], values: hidden },
      { count: outputs.length, x: W * LAYER_X[2], values: outputs },
    ];

    const getY = (idx: number, count: number): number => {
      const spacing = H / (count + 1);
      return spacing * (idx + 1);
    };

    // Draw connections
    for (let l = 0; l < layers.length - 1; l++) {
      const from = layers[l];
      const to = layers[l + 1];
      for (let i = 0; i < from.count; i++) {
        for (let j = 0; j < to.count; j++) {
          const x1 = from.x;
          const y1 = getY(i, from.count);
          const x2 = to.x;
          const y2 = getY(j, to.count);
          const weight = Math.abs(from.values[i] * to.values[j]);
          const alpha = 0.06 + weight * 0.35;
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.5 + weight * 1.5;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          // Pulse particle traveling along the connection
          if (animating) {
            const t = (pulsePhase + (i * 0.13 + j * 0.07)) % 1;
            const px = x1 + (x2 - x1) * t;
            const py = y1 + (y2 - y1) * t;
            const pAlpha = Math.sin(t * Math.PI) * (0.3 + weight * 0.5);
            ctx.fillStyle = `rgba(0, 229, 255, ${pAlpha})`;
            ctx.beginPath();
            ctx.arc(px, py, 1.5 + weight * 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    // Draw nodes
    for (let l = 0; l < layers.length; l++) {
      const layer = layers[l];
      for (let i = 0; i < layer.count; i++) {
        const x = layer.x;
        const y = getY(i, layer.count);
        const val = layer.values[i];
        const glow = 0.2 + val * 0.6;

        // Glow
        const grad = ctx.createRadialGradient(x, y, 0, x, y, NODE_R * 2.5);
        grad.addColorStop(0, `rgba(56, 189, 248, ${glow * 0.5})`);
        grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, NODE_R * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Node body
        ctx.fillStyle = `rgba(15, 23, 42, 0.95)`;
        ctx.beginPath();
        ctx.arc(x, y, NODE_R, 0, Math.PI * 2);
        ctx.fill();

        // Node border with activation color
        const borderColor = l === 0 ? 'rgba(129, 140, 248, ' : l === layers.length - 1 ? 'rgba(34, 197, 94, ' : 'rgba(56, 189, 248, ';
        ctx.strokeStyle = borderColor + (0.3 + val * 0.6) + ')';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, NODE_R, 0, Math.PI * 2);
        ctx.stroke();

        // Inner fill based on activation
        ctx.fillStyle = `rgba(56, 189, 248, ${val * 0.4})`;
        ctx.beginPath();
        ctx.arc(x, y, NODE_R - 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [inputs, hidden, outputs, pulsePhase, animating]);

  const reset = useCallback(() => {
    setInputs(neuralPlayground.inputs.map((i) => i.default / 100));
  }, []);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md glass mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-ice-400 animate-pulse-dot" />
            <span className="text-xs font-mono tracking-wider text-ice-400">
              [ LIVE MODEL INFERENCE ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Interactive Neural Network
          </h2>
          <p className="mt-3 text-steel-400 max-w-2xl mx-auto text-sm sm:text-base">
            {neuralPlayground.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Controls panel */}
          <div className="lg:col-span-1 glass rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white font-mono">INPUT LAYER</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="text-xs font-mono text-steel-500">4 nodes</span>
              </div>
            </div>

            {neuralPlayground.inputs.map((input, i) => {
              const Icon = inputIcons[i];
              return (
                <div key={input.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon size={14} className="text-indigo-400" />
                      <span className="text-xs font-medium text-steel-300">{input.label}</span>
                    </div>
                    <span className="text-xs font-mono text-ice-400">
                      {Math.round(inputs[i] * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={Math.round(inputs[i] * 100)}
                    onChange={(e) => {
                      const newInputs = [...inputs];
                      newInputs[i] = Number(e.target.value) / 100;
                      setInputs(newInputs);
                    }}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/5 accent-ice-400"
                    style={{
                      background: `linear-gradient(to right, rgba(56,189,248,0.5) ${inputs[i] * 100}%, rgba(255,255,255,0.06) ${inputs[i] * 100}%)`,
                    }}
                  />
                </div>
              );
            })}

            <div className="pt-3 border-t border-white/5 space-y-2">
              <button
                onClick={() => setAnimating((v) => !v)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg glass glass-hover text-sm font-medium text-steel-200"
              >
                {animating ? <Pause size={14} /> : <Play size={14} />}
                {animating ? 'Pause Signal Flow' : 'Resume Signal Flow'}
              </button>
              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-sm font-medium text-steel-400 hover:text-steel-200 hover:border-white/10 transition-all"
              >
                <RotateCcw size={14} />
                Reset Weights
              </button>
            </div>
          </div>

          {/* Network visualization */}
          <div className="lg:col-span-3 glass rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
              <span className="text-xs font-mono text-steel-500">mlp_4-5-3 / forward_pass</span>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
              <span className="text-xs font-mono text-success">LIVE</span>
            </div>
            <canvas
              ref={canvasRef}
              className="w-full h-[360px] sm:h-[420px] lg:h-[460px]"
            />
            {/* Layer labels */}
            <div className="flex justify-between px-[8%] pb-1">
              <span className="text-xs font-mono text-indigo-400/70">INPUT</span>
              <span className="text-xs font-mono text-ice-400/70">HIDDEN</span>
              <span className="text-xs font-mono text-success/70">OUTPUT</span>
            </div>
          </div>

          {/* Output predictions */}
          <div className="lg:col-span-1 glass rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white font-mono">OUTPUT LAYER</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="text-xs font-mono text-steel-500">3 nodes</span>
              </div>
            </div>

            {neuralPlayground.outputs.map((output, i) => {
              const raw = outputs[i] ?? 0;
              const display = output.inverted
                ? (5 + (1 - raw) * 45).toFixed(1)
                : (raw * 100).toFixed(1);
              const pct = output.inverted ? (1 - raw) * 100 : raw * 100;
              const barColor =
                output.color === 'ice'
                  ? 'from-ice-600 to-ice-400'
                  : output.color === 'success'
                    ? 'from-green-600 to-success'
                    : 'from-indigo-600 to-indigo-400';
              return (
                <div key={output.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-steel-300">{output.label}</span>
                    <span className="text-sm font-mono font-semibold text-white">
                      {display}<span className="text-steel-500 text-xs ml-0.5">{output.unit}</span>
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-500 ease-out`}
                      style={{ width: `${pct}%`, boxShadow: '0 0 8px rgba(56,189,248,0.3)' }}
                    />
                  </div>
                </div>
              );
            })}

            <div className="pt-3 border-t border-white/5">
              <div className="text-xs font-mono text-steel-500 leading-relaxed">
                <span className="text-ice-400">σ</span>(W·x + b) — sigmoid activation
                <br />
                <span className="text-steel-600">2-layer MLP · 35 synaptic weights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
