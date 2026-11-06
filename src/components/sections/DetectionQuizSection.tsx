import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, RotateCcw, X } from 'lucide-react'
import { quizStatements } from '../../data/quiz'
import type { QuizCategory } from '../../data/types'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { cn } from '../../utils/cn'

const CATEGORIES: QuizCategory[] = ['Accurate', 'Partially Accurate', 'Anthropomorphic']

export function DetectionQuizSection() {
  const [answers, setAnswers] = useState<Record<string, QuizCategory>>({})

  const score = useMemo(
    () => Object.entries(answers).filter(([id, val]) => quizStatements.find((q) => q.id === id)?.correct === val).length,
    [answers],
  )
  const answeredCount = Object.keys(answers).length

  const reset = () => setAnswers({})

  return (
    <section id="quiz" className="border-y border-border-soft bg-bg-raised/40 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Test Yourself"
            title="Accurate, partial, or anthropomorphic?"
            description="Classify each statement. There's no penalty for a wrong guess — the explanation is where the learning happens."
          />
          <div className="mb-1 flex items-center gap-3">
            <span className="font-mono-data rounded-lg border border-border bg-card px-3 py-2 text-sm text-ink">
              {score} / {answeredCount || 0} correct
            </span>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-card-hover"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {quizStatements.map((q, i) => {
            const selected = answers[q.id]
            const isAnswered = Boolean(selected)
            const isCorrect = selected === q.correct

            return (
              <Reveal key={q.id} delay={i * 0.03}>
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-base font-medium text-ink">&ldquo;{q.statement}&rdquo;</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => {
                      const isPicked = selected === cat
                      const showAsCorrect = isAnswered && cat === q.correct
                      const showAsWrongPick = isAnswered && isPicked && cat !== q.correct
                      return (
                        <button
                          key={cat}
                          type="button"
                          disabled={isAnswered}
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: cat }))}
                          className={cn(
                            'rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors disabled:cursor-default',
                            showAsCorrect && 'border-success bg-success/15 text-success',
                            showAsWrongPick && 'border-danger bg-danger/15 text-danger',
                            !isAnswered && 'border-border bg-bg-raised text-ink hover:border-ink-faint',
                            isAnswered && !showAsCorrect && !showAsWrongPick && 'border-border-soft text-ink-faint opacity-60',
                          )}
                        >
                          {cat}
                        </button>
                      )
                    })}
                  </div>

                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'mt-4 flex gap-2.5 rounded-lg border px-4 py-3 text-sm',
                        isCorrect ? 'border-success/30 bg-success/10 text-ink' : 'border-warning/30 bg-warning/10 text-ink',
                      )}
                    >
                      {isCorrect ? (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                      ) : (
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                      )}
                      <p className="text-ink-dim">
                        <span className="font-medium text-ink">
                          {isCorrect ? 'Correct. ' : `Actually: ${q.correct}. `}
                        </span>
                        {q.explanation}
                      </p>
                    </motion.div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
