import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Lightbulb, ShieldAlert, Sparkles, MessageCircleWarning, Compass } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Comparison } from '../../data/types'
import { humanNodes, llmNodes } from '../../data/nodes'
import { SimilarityBadgePill } from '../ui/SimilarityBadge'

interface InfoCardProps {
  comparison: Comparison | null
}

function findLabel(id: string, source: { id: string; label: string }[]) {
  return source.find((n) => n.id === id)?.label ?? id
}

export function InfoCard({ comparison }: InfoCardProps) {
  return (
    <div className="relative min-h-[220px]">
      <AnimatePresence mode="wait">
        {comparison ? (
          <motion.div
            key={comparison.humanId + comparison.llmId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-lg font-semibold">
                <span className="text-brain">{findLabel(comparison.humanId, humanNodes)}</span>
                <ArrowRight className="h-4 w-4 text-ink-faint" aria-hidden="true" />
                <span className="text-llm">{findLabel(comparison.llmId, llmNodes)}</span>
              </div>
              <SimilarityBadgePill score={comparison.similarity} />
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <InfoBlock icon={Sparkles} tone="text-success" title="Why they seem similar">
                {comparison.whySimilar}
              </InfoBlock>
              <InfoBlock icon={ShieldAlert} tone="text-warning" title="Major differences">
                <ul className="space-y-1.5">
                  {comparison.keyDifferences.map((diff) => (
                    <li key={diff} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-faint" aria-hidden="true" />
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </InfoBlock>
              <InfoBlock icon={MessageCircleWarning} tone="text-danger" title="Common misconception">
                <span className="italic text-ink">{comparison.misconception}</span>
                <p className="mt-2">{comparison.reality}</p>
              </InfoBlock>
              <InfoBlock icon={Compass} tone="text-llm" title="Real-world implication">
                {comparison.realWorldImplication}
              </InfoBlock>
            </div>

            <div className="mt-6 flex items-start gap-2 rounded-xl border border-border-soft bg-bg-raised px-4 py-3 text-sm text-ink-dim">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brain" aria-hidden="true" />
              <p>
                <span className="font-medium text-ink">Example: </span>
                {comparison.example}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-10 text-center"
          >
            <p className="text-sm text-ink-dim">
              Hover, focus, or tap a node in either column to compare it side by side.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function InfoBlock({
  icon: Icon,
  tone,
  title,
  children,
}: {
  icon: typeof Sparkles
  tone: string
  title: string
  children: ReactNode
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${tone}`} aria-hidden="true" />
        <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-dim">{title}</h4>
      </div>
      <div className="mt-2 text-sm leading-relaxed text-ink">{children}</div>
    </div>
  )
}
