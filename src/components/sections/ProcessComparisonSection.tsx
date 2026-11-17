import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, RotateCcw } from 'lucide-react'
import { humanProcess, llmProcess } from '../../data/process'
import type { ProcessStep } from '../../data/process'
import { SectionHeading } from '../ui/SectionHeading'
import { cn } from '../../utils/cn'

const STEP_INTERVAL_MS = 1100
const MAX_STEPS = Math.max(humanProcess.length, llmProcess.length)

function Track({ title, accent, steps, tick }: { title: string; accent: 'brain' | 'llm'; steps: ProcessStep[]; tick: number }) {
  return (
    <div className="flex-1">
      <h3 className={cn('font-mono-data text-xs uppercase tracking-[0.15em]', accent === 'brain' ? 'text-brain' : 'text-llm')}>
        {title}
      </h3>
      <ol className="relative mt-4 space-y-0">
        {steps.map((step, i) => {
          const state = i < tick ? 'done' : i === tick ? 'active' : 'upcoming'
          return (
            <li key={step.label + i} className="relative flex gap-3 pb-6 last:pb-0">
              {i < steps.length - 1 && (
                <span
                  className="absolute left-[11px] top-6 h-full w-px"
                  style={{ backgroundColor: 'var(--color-border)' }}
                  aria-hidden="true"
                />
              )}
              <motion.span
                animate={{
                  scale: state === 'active' ? 1.15 : 1,
                  backgroundColor:
                    state === 'upcoming'
                      ? 'var(--color-card)'
                      : accent === 'brain'
                        ? 'var(--color-brain)'
                        : 'var(--color-llm)',
                }}
                transition={{ duration: 0.25 }}
                className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: state === 'upcoming' ? 'var(--color-border)' : 'transparent' }}
              >
                {state === 'done' ? (
                  <Check className="h-3.5 w-3.5 text-bg" aria-hidden="true" />
                ) : (
                  <span className={cn('h-1.5 w-1.5 rounded-full', state === 'active' ? 'bg-bg' : 'bg-ink-faint')} />
                )}
              </motion.span>
              <div className={cn('pt-0.5 transition-opacity', state === 'upcoming' ? 'opacity-40' : 'opacity-100')}>
                <p className="text-sm font-medium text-ink">{step.label}</p>
                <p className="mt-0.5 text-xs text-ink-dim">{step.detail}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export function ProcessComparisonSection() {
  const [tick, setTick] = useState(0)
  const [playing, setPlaying] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!playing) return
    intervalRef.current = setInterval(() => {
      setTick((t) => {
        if (t >= MAX_STEPS) {
          setPlaying(false)
          return t
        }
        return t + 1
      })
    }, STEP_INTERVAL_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [playing])

  const replay = () => {
    setTick(0)
    setPlaying(true)
  }

  return (
    <section id="process" className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Play It Through"
          title="Two simplified processing sketches"
          description="The human track groups interacting processes into a teaching sketch, not a fixed brain sequence. The model track shows a common text-only autoregressive path; tools and persistent memory belong to a surrounding application or agent."
        />
        <button
          type="button"
          onClick={replay}
          className="mb-1 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-card-hover"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Replay
        </button>
      </div>

      <div className="mt-12 flex flex-col gap-10 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:p-8">
        <Track title="Human response (illustrative)" accent="brain" steps={humanProcess} tick={tick} />
        <div className="hidden w-px bg-border-soft sm:block" aria-hidden="true" />
        <Track title="Text-only autoregressive model" accent="llm" steps={llmProcess} tick={tick} />
      </div>
    </section>
  )
}
