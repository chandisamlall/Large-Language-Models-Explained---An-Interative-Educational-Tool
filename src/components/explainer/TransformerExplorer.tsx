import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { cn } from '../../utils/cn'
import {
  EMBED_PALETTE,
  PRESET_SENTENCES,
  attentionWeights,
  candidatesFor,
  hash,
  retemper,
  tokensOf,
} from '../../data/transformerDemo'

const STEPS = ['Meaning', 'Attention', 'Guess'] as const
const MAX_TOKENS = 16

/**
 * A simplified, three-step stand-in for how a language model turns text
 * into a guess at the next word. This is a hand-built simulation (see
 * `data/transformerDemo.ts`), not a real running model -- that trade-off
 * is what keeps it fast, dependency-free, and legible to a non-technical
 * audience. The honesty note at the bottom is load-bearing, not
 * decorative: don't remove it.
 */
export function TransformerExplorer() {
  const [sentence, setSentence] = useState(PRESET_SENTENCES[0])
  const [draft, setDraft] = useState(PRESET_SENTENCES[0])
  const [step, setStep] = useState(0)
  const [temperature, setTemperature] = useState(0.8)

  const tokens = useMemo(() => tokensOf(sentence), [sentence])
  const baseCandidates = useMemo(() => candidatesFor(sentence), [sentence])
  const weights = useMemo(() => attentionWeights(tokens), [tokens])
  const adjusted = useMemo(
    () => retemper(baseCandidates.map((c) => c.weight), temperature),
    [baseCandidates, temperature],
  )

  const rankedAttention = useMemo(
    () =>
      tokens
        .map((token, index) => ({ token, index, weight: weights[index] ?? 0 }))
        .sort((a, b) => b.weight - a.weight),
    [tokens, weights],
  )
  const topAttentionIndices = useMemo(
    () => new Set(rankedAttention.slice(0, 3).map((r) => r.index)),
    [rankedAttention],
  )
  const topWord = rankedAttention[0]?.token ?? ''
  const atTokenLimit = tokens.length >= MAX_TOKENS

  function reset(text: string) {
    const clean = text.trim() || PRESET_SENTENCES[0]
    setSentence(clean)
    setDraft(clean)
    setStep(0)
  }

  function pickWord(word: string) {
    if (atTokenLimit) return
    const next = `${sentence.trim()} ${word}`
    setSentence(next)
    setDraft(next)
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {PRESET_SENTENCES.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => reset(preset)}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-ink-dim transition-colors hover:border-border-soft hover:bg-card-hover hover:text-ink"
          >
            {preset}
          </button>
        ))}
      </div>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && reset(draft)}
          placeholder="Type a short sentence"
          aria-label="Sentence to feed the demo"
          className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus-visible:outline-none"
        />
        <button
          type="button"
          onClick={() => reset(draft)}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-llm bg-llm/10 px-4 py-2 text-sm font-medium text-llm transition-colors hover:bg-llm/20"
        >
          <Play className="h-3.5 w-3.5" aria-hidden="true" />
          Watch it think
        </button>
      </div>

      <div className="mb-2 flex flex-wrap gap-1.5" aria-label="Current sentence, tokenized">
        {tokens.map((token, i) => (
          <span key={i} className="rounded-lg border border-border bg-card px-2.5 py-1 text-sm text-ink">
            {token}
          </span>
        ))}
      </div>
      <p className="mb-6 text-xs text-ink-faint">Your sentence, cut into pieces called tokens.</p>

      <div className="mb-5 flex gap-1.5" role="tablist" aria-label="Explainer steps">
        {STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={step === i}
            onClick={() => setStep(i)}
            className={cn(
              'flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors',
              step === i ? 'border-llm bg-llm/10 text-llm' : 'border-border bg-card text-ink-dim hover:text-ink',
            )}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="meaning"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-3 flex flex-wrap gap-4">
              {tokens.map((token, i) => {
                const h = hash(token.toLowerCase())
                const color = EMBED_PALETTE[h % EMBED_PALETTE.length]
                return (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className="flex h-7 items-end gap-0.5">
                      {Array.from({ length: 5 }).map((_, barIndex) => (
                        <div
                          key={barIndex}
                          style={{ height: 6 + ((h >> (barIndex * 3)) % 20), width: 4, background: color, borderRadius: 2 }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-ink-dim">{token}</span>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-ink-faint">Each token becomes a fingerprint of numbers that captures what it means.</p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="attention"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-3 flex flex-wrap gap-1.5">
              {tokens.map((token, i) => {
                const isTop = topAttentionIndices.has(i)
                return (
                  <span
                    key={i}
                    className={cn(
                      'rounded-lg border px-2.5 py-1 text-sm',
                      isTop ? 'border-brain bg-brain/10 text-ink' : 'border-border bg-card text-ink-faint',
                    )}
                  >
                    {token}
                    {isTop && (
                      <span className="ml-1.5 font-mono-data text-[10px] text-brain">
                        {Math.round((weights[i] ?? 0) * 100)}%
                      </span>
                    )}
                  </span>
                )
              })}
            </div>
            <p className="text-xs text-ink-faint">Before guessing the next word, it leans most on &ldquo;{topWord}&rdquo;.</p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="guess"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <label htmlFor="boldness-slider" className="whitespace-nowrap text-xs text-ink-dim">
                Boldness
              </label>
              <input
                id="boldness-slider"
                type="range"
                min={0.3}
                max={1.8}
                step={0.1}
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="flex-1 accent-llm"
              />
              <span className="font-mono-data w-8 text-xs text-ink">{temperature.toFixed(1)}</span>
            </div>

            <div className="mb-3 space-y-1.5">
              {baseCandidates.map((candidate, i) => {
                const pct = Math.round((adjusted[i] ?? 0) * 100)
                return (
                  <button
                    key={candidate.word}
                    type="button"
                    onClick={() => pickWord(candidate.word)}
                    disabled={atTokenLimit}
                    className="relative w-full overflow-hidden rounded-lg border border-border bg-card px-3 py-2 text-left transition-colors hover:border-border-soft disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span
                      className="absolute inset-y-0 left-0 bg-llm/15"
                      style={{ width: `${Math.max(pct, 3)}%` }}
                      aria-hidden="true"
                    />
                    <span className="relative flex items-center justify-between text-sm">
                      <span className="text-ink">{candidate.word}</span>
                      <span className="font-mono-data text-xs text-ink-dim">{pct}%</span>
                    </span>
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-ink-faint">
              {atTokenLimit
                ? 'Sentence is getting long — try a preset or type a new one to keep going.'
                : 'Click a word to add it and keep going. Low boldness plays it safe, high boldness takes more chances.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-6 border-t border-border-soft pt-4 text-xs text-ink-faint">
        Simplified simulation for teaching, not a real running model.
      </p>
    </div>
  )
}
