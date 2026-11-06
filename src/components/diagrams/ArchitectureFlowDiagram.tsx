import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Tooltip } from '../ui/Tooltip'
import {
  flowInsights,
  humanFlow,
  humanFlowStats,
  llmFlow,
  llmFlowStats,
  type FlowStage,
  type FlowStat,
} from '../../data/architectureFlow'

type Accent = 'brain' | 'llm'

function FlowColumn({
  title,
  description,
  accent,
  stages,
  stats,
  activeId,
  onSelect,
}: {
  title: string
  description: string
  accent: Accent
  stages: FlowStage[]
  stats: FlowStat[]
  activeId: string
  onSelect: (id: string) => void
}) {
  const active = stages.find((s) => s.id === activeId) ?? stages[0]

  return (
    <div>
      <h4 className="text-sm font-semibold text-ink">{title}</h4>
      <p className="mt-1 text-xs text-ink-dim">{description}</p>

      <ol className="mt-4 flex flex-col">
        {stages.map((stage, i) => {
          const isActive = stage.id === active.id
          const Icon = stage.icon
          return (
            <li key={stage.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors',
                    isActive
                      ? accent === 'brain'
                        ? 'border-brain bg-brain/15 text-brain'
                        : 'border-llm bg-llm/15 text-llm'
                      : 'border-border text-ink-faint',
                  )}
                  style={isActive ? { boxShadow: `0 0 10px -2px var(--color-${accent})` } : undefined}
                  aria-hidden="true"
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {i < stages.length - 1 && <span className="my-0.5 w-px flex-1 bg-border-soft" aria-hidden="true" />}
              </div>
              <button
                type="button"
                onClick={() => onSelect(stage.id)}
                aria-pressed={isActive}
                className={cn(
                  'mb-1 flex-1 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors',
                  isActive ? 'font-medium text-ink' : 'text-ink-dim hover:bg-card-hover hover:text-ink',
                )}
              >
                {stage.label}
              </button>
            </li>
          )
        })}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'mt-3 rounded-lg border-l-2 bg-bg-raised/60 px-3.5 py-3',
            accent === 'brain' ? 'border-brain' : 'border-llm',
          )}
        >
          <p className="text-xs leading-relaxed text-ink-dim">{active.detail}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {stats.map((stat) => (
          <Tooltip key={stat.label} content={stat.detail} side="top">
            <span
              tabIndex={0}
              className="cursor-default rounded-full border border-border-soft px-2.5 py-1 text-[11px] text-ink-faint focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-llm"
            >
              {stat.label}
            </span>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

function InsightCard({ id, title, humanSide, aiSide, isOpen, onToggle }: {
  id: string
  title: string
  humanSide: string
  aiSide: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border transition-colors',
        isOpen ? 'border-brain/40 bg-bg-raised' : 'border-border-soft bg-bg-raised/60',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="font-mono-data text-[11px] uppercase tracking-[0.12em] text-ink-faint">{title}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-ink-faint" aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-panel`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-2.5 px-4 pb-4">
              <p className="text-xs leading-relaxed text-ink-dim">
                <span className="font-medium text-brain">Human — </span>
                {humanSide}
              </p>
              <p className="text-xs leading-relaxed text-ink-dim">
                <span className="font-medium text-llm">LLM — </span>
                {aiSide}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Click-through process diagram: two eight-stage flows (input to output)
 * with a synced detail readout, plus two expandable "comparative insight"
 * callouts between them. Self-contained state -- doesn't touch the shared
 * ComparisonContext, since these stages aren't part of the 14/11-node
 * taxonomy the rest of the exhibit is built on.
 */
export function ArchitectureFlowDiagram() {
  const [humanActiveId, setHumanActiveId] = useState(humanFlow[0].id)
  const [llmActiveId, setLlmActiveId] = useState(llmFlow[0].id)
  const [openInsightId, setOpenInsightId] = useState<string | null>(flowInsights[0]?.id ?? null)

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h3 className="text-sm font-semibold text-ink">How it works: process flow</h3>
      <p className="mt-1 text-sm text-ink-dim">
        Click any stage to see what&rsquo;s happening at that step, and tap a callout below for the comparison behind it.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_240px_1fr] lg:gap-8">
        <FlowColumn
          title="Human brain"
          description="Input through to a grounded, revisable world-model."
          accent="brain"
          stages={humanFlow}
          stats={humanFlowStats}
          activeId={humanActiveId}
          onSelect={setHumanActiveId}
        />

        <div className="flex flex-col justify-center gap-3 lg:pt-14">
          <span className="font-mono-data text-center text-[11px] uppercase tracking-[0.15em] text-ink-faint lg:hidden">
            Comparative insights
          </span>
          {flowInsights.map((insight) => (
            <InsightCard
              key={insight.id}
              id={insight.id}
              title={insight.title}
              humanSide={insight.humanSide}
              aiSide={insight.aiSide}
              isOpen={openInsightId === insight.id}
              onToggle={() => setOpenInsightId((cur) => (cur === insight.id ? null : insight.id))}
            />
          ))}
        </div>

        <FlowColumn
          title="Large language model"
          description="Token input through to a sampled next token."
          accent="llm"
          stages={llmFlow}
          stats={llmFlowStats}
          activeId={llmActiveId}
          onSelect={setLlmActiveId}
        />
      </div>
    </div>
  )
}
