/**
 * A small, self-contained "toy" next-word predictor used purely to
 * illustrate the shape of the process (tokenize -> embed -> attend ->
 * predict) for a non-technical audience. It is NOT a real language
 * model -- there's no training, no attention math, no neural net.
 *
 * For a handful of curated example sentences it returns hand-authored,
 * plausible candidates (`SEED_GRAPH`). For anything else the person
 * types, `fallbackCandidates` derives a deterministic-but-arbitrary set
 * of common words so the demo never breaks, it just gets less
 * meaningful the further you stray from the presets.
 */

export interface CandidateWord {
  word: string
  weight: number
}

export const PRESET_SENTENCES = ['The cat sat on the', 'My favorite food is', 'Once upon a', 'The weather today is']

const SEED_GRAPH: Record<string, CandidateWord[]> = {
  'the cat sat on the': [
    { word: 'mat', weight: 0.42 },
    { word: 'floor', weight: 0.24 },
    { word: 'chair', weight: 0.16 },
    { word: 'roof', weight: 0.1 },
    { word: 'sofa', weight: 0.08 },
  ],
  'the cat sat on the mat': [
    { word: 'and', weight: 0.35 },
    { word: 'quietly', weight: 0.22 },
    { word: 'all', weight: 0.18 },
    { word: 'like', weight: 0.15 },
    { word: 'in', weight: 0.1 },
  ],
  'my favorite food is': [
    { word: 'pizza', weight: 0.3 },
    { word: 'sushi', weight: 0.22 },
    { word: 'pasta', weight: 0.18 },
    { word: 'tacos', weight: 0.16 },
    { word: 'ramen', weight: 0.14 },
  ],
  'once upon a': [
    { word: 'time', weight: 0.72 },
    { word: 'dream', weight: 0.1 },
    { word: 'hill', weight: 0.08 },
    { word: 'star', weight: 0.06 },
    { word: 'cloud', weight: 0.04 },
  ],
  'once upon a time': [
    { word: 'there', weight: 0.4 },
    { word: 'in', weight: 0.28 },
    { word: 'a', weight: 0.18 },
    { word: 'long', weight: 0.09 },
    { word: 'far', weight: 0.05 },
  ],
  'the weather today is': [
    { word: 'sunny', weight: 0.34 },
    { word: 'cloudy', weight: 0.24 },
    { word: 'cold', weight: 0.2 },
    { word: 'warm', weight: 0.14 },
    { word: 'rainy', weight: 0.08 },
  ],
}

const FALLBACK_POOL = [
  'the', 'a', 'time', 'day', 'way', 'world', 'people', 'home', 'water', 'music',
  'story', 'light', 'friend', 'place', 'moment', 'road', 'song', 'name', 'tree', 'sky',
]

/** Small, fast, deterministic string hash -- not cryptographic, just needs
 *  to be stable so the same word always gets the same "fingerprint". */
export function hash(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(h, 31) + str.charCodeAt(i)) >>> 0
  }
  return h
}

export function tokensOf(sentence: string): string[] {
  return sentence.trim().split(/\s+/).filter(Boolean)
}

function fallbackCandidates(sentence: string): CandidateWord[] {
  const words = tokensOf(sentence)
  const last = (words[words.length - 1] ?? '').toLowerCase()
  const pool = [...FALLBACK_POOL]
  const picks: string[] = []
  let seed = hash(last + words.length)
  while (picks.length < 5 && pool.length) {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0
    const idx = seed % pool.length
    picks.push(pool.splice(idx, 1)[0])
  }
  const rawWeights = [0.3, 0.24, 0.19, 0.15, 0.12]
  return picks.map((word, i) => ({ word, weight: rawWeights[i] }))
}

export function candidatesFor(sentence: string): CandidateWord[] {
  const key = sentence.trim().toLowerCase()
  return SEED_GRAPH[key] ?? fallbackCandidates(sentence)
}

/** Toy "attention": more recent tokens get more weight, with a small
 *  deterministic jitter per word so it doesn't look perfectly uniform. */
export function attentionWeights(tokens: string[]): number[] {
  const n = tokens.length
  const raw = tokens.map((t, i) => {
    const recency = Math.pow(0.72, n - 1 - i)
    const jitter = 0.85 + (hash(t) % 30) / 100
    return recency * jitter
  })
  const sum = raw.reduce((a, b) => a + b, 0) || 1
  return raw.map((w) => w / sum)
}

/** Real softmax-with-temperature over the base probabilities, so the
 *  "boldness" slider is doing genuine (if simplified) math, not a fake
 *  animation. T=1 leaves the input unchanged; T<1 sharpens it; T>1
 *  flattens it toward uniform. */
export function retemper(base: number[], temperature: number): number[] {
  const logits = base.map((p) => Math.log(Math.max(p, 1e-6)) / temperature)
  const maxLogit = Math.max(...logits)
  const exps = logits.map((l) => Math.exp(l - maxLogit))
  const sum = exps.reduce((a, b) => a + b, 0)
  return exps.map((e) => e / sum)
}

/** Colors used for the per-token placeholder bars in the
 *  Meaning step. Reuses the exhibit's existing brain/llm palette plus a
 *  couple of neutral extras so tokens are visually distinguishable. */
export const EMBED_PALETTE = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6']
