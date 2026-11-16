import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, FlaskConical } from 'lucide-react'
import { hallucinationCards } from '../../data/hallucination'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { cn } from '../../utils/cn'

/**
 * Five hallucination/confabulation pairs, each expanding into the LLM
 * mechanism, the human cognitive-science parallel, and a proposed exhibit
 * experiment. Unlike the Myths section, the third column is a suggestion
 * for future work, not a settled finding -- flagged with a flask icon so
 * it doesn't read as a stated fact the way the first two columns do.
 */
export function HallucinationSection() {
  const [expandedId, setExpandedId] = useState<string | null>(hallucinationCards[0]?.id ?? null)

  return (
    <section id="hallucination" className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Where It Breaks"
        title="Hallucination vs. confabulation"
        description="Neither system checks its output against the world -- only against what a plausible answer looks like. Click a mechanism to see the human parallel and an exhibit experiment it suggests."
      />

      <div className="mt-10 space-y-3">
        {hallucinationCards.map((card, i) => {
          const isOpen = expandedId === card.id
          const Icon = card.icon
          return (
            <Reveal key={card.id} delay={i * 0.04}>
              <div
                className={cn(
                  'overflow-hidden rounded-xl border transition-colors',
                  isOpen ? 'border-brain/50 bg-card' : 'border-border bg-card',
                )}
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isOpen ? null : card.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0 text-llm" aria-hidden="true" />
                    <span className="text-base font-medium text-ink">{card.title}</span>
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="grid gap-4 px-5 pb-5 sm:grid-cols-3">
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-llm">LLM mechanism</h4>
                          <p className="mt-1.5 text-sm text-ink-dim">{card.llmMechanism}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-brain">Human parallel</h4>
                          <p className="mt-1.5 text-sm text-ink-dim">{card.humanParallel}</p>
                        </div>
                        <div>
                          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-warning">
                            <FlaskConical className="h-3 w-3" aria-hidden="true" />
                            Proposed experiment
                          </h4>
                          <p className="mt-1.5 text-sm text-ink-dim">{card.proposedExperiment}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
