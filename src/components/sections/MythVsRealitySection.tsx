import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { mythCards } from '../../data/myths'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { cn } from '../../utils/cn'

export function MythVsRealitySection() {
  const [expandedId, setExpandedId] = useState<string | null>(mythCards[0]?.id ?? null)

  return (
    <section id="myths" className="border-y border-border-soft bg-bg-raised/40 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Myth vs. Reality"
          title="Five things people assume about AI"
          description="Click a claim to see why it feels true, and what's actually happening underneath it."
        />

        <div className="mt-10 space-y-3">
          {mythCards.map((card, i) => {
            const isOpen = expandedId === card.id
            return (
              <Reveal key={card.id} delay={i * 0.04}>
                <div className={cn('overflow-hidden rounded-xl border transition-colors', isOpen ? 'border-brain/50 bg-card' : 'border-border bg-card')}>
                  <button
                    type="button"
                    onClick={() => setExpandedId(isOpen ? null : card.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-base font-medium text-ink">&ldquo;{card.myth}&rdquo;</span>
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
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Why people believe it</h4>
                            <p className="mt-1.5 text-sm text-ink-dim">{card.whyBelieved}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-warning">What actually happens</h4>
                            <p className="mt-1.5 text-sm text-ink-dim">{card.whatActuallyHappens}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-llm">The explanation</h4>
                            <p className="mt-1.5 text-sm text-ink-dim">{card.supportingExplanation}</p>
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
      </div>
    </section>
  )
}
