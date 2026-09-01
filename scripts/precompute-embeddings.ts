// Precomputes embeddings for all resume chunks offline so visitors don't
// pay the embedding cost on their first question.
//
// Run this script whenever resume.ts changes:
//   npx tsx scripts/precompute-embeddings.ts
//
// Output: src/data/resume-embeddings.json

import { pipeline } from '@xenova/transformers';
import { getResumeChunks } from '../src/data/resume';
import fs from 'fs';
import path from 'path';

const OUTPUT_PATH   = path.resolve('src/data/resume-embeddings.json');
const EMBEDDER_MODEL = 'Xenova/all-MiniLM-L6-v2';

async function main() {
  const chunks = getResumeChunks();
  console.log(`\n📄 Found ${chunks.length} resume chunks`);
  console.log(`🤖 Loading embedder: ${EMBEDDER_MODEL}...\n`);

  const embedder = await pipeline('feature-extraction', EMBEDDER_MODEL);

  const embeddings: number[][] = [];

  for (let i = 0; i < chunks.length; i++) {
    process.stdout.write(`  Embedding chunk ${i + 1}/${chunks.length}...`);
    const out = await embedder(chunks[i], { pooling: 'mean', normalize: true });
    embeddings.push(Array.from(out.data as Float32Array));
    process.stdout.write(' ✓\n');
  }

  // Validate all dimensions match
  const dim = embeddings[0].length;
  if (!embeddings.every((e) => e.length === dim)) {
    console.error('❌ Dimension mismatch — aborting.');
    process.exit(1);
  }

  // chunkCount is used by ResumeQABot to detect stale embeddings
  const output = {
    model:      EMBEDDER_MODEL,
    dim,
    chunkCount: chunks.length,
    embeddings,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output));

  console.log(`\n✅ Saved ${chunks.length} embeddings (dim=${dim}) to:`);
  console.log(`   ${OUTPUT_PATH}`);
  console.log(`\n⚠️  If you update resume.ts, re-run this script.\n`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});