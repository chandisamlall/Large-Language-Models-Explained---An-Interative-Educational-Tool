import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'
import { agentMemory, longTermMemory, shortTermMemory, type MemoryPair } from '../../data/memory'
import { ProblemSolvingBreakdown } from './ProblemSolvingBreakdown'

function MemoryCard({ pair }: { pair: MemoryPair }) {
  const [open, setOpen] = useState(false)
  const HumanIcon = pair.humanIcon
  const AiIcon = pair.aiIcon

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      className="w-full rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-border-soft hover:bg-card-hover"
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-1 flex-col items-center gap-1.5 text-center">
          <HumanIcon className="h-5 w-5 text-brain" aria-hidden="true" />
          <span className="text-sm font-medium text-ink">{pair.humanLabel}</span>
          <span className="text-[11px] text-ink-faint">{pair.humanNote}</span>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
        <div className="flex flex-1 flex-col items-center gap-1.5 text-center">
          <AiIcon className="h-5 w-5 text-llm" aria-hidden="true" />
          <span className="text-sm font-medium text-ink">{pair.aiLabel}</span>
          <span className="text-[11px] text-ink-faint">{pair.aiNote}</span>
        </div>
      </div>

      <ChevronDown
        className={cn('mx-auto mt-2 h-3.5 w-3.5 text-ink-faint transition-transform', open && 'rotate-180')}
        aria-hidden="true"
      />

      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border-soft pt-2.5 text-xs leading-relaxed text-ink-dim"
          >
            {pair.detail}
          </motion.p>
        )}
      </AnimatePresence>
    </button>
  )
}

/**
 * Toggle between short-term and long-term memory; each card expands in
 * place to a concrete example. Teal/brain-purple marks the human side,
 * blue/llm marks the AI side, consistent with the rest of the exhibit.
 */
export function MemoryExplorer() {
  const [tab, setTab] = useState<'short' | 'long' | 'agent'>('short')
  const pairs = tab === 'short' ? shortTermMemory : tab === 'long' ? longTermMemory : agentMemory

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-1.5" role="tablist" aria-label="Memory view">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'short'}
          onClick={() => setTab('short')}
          className={cn(
            'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
            tab === 'short' ? 'border-llm bg-llm/10 text-llm' : 'border-border bg-card text-ink-dim hover:text-ink',
          )}
        >
          Short-term
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'long'}
          onClick={() => setTab('long')}
          className={cn(
            'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
            tab === 'long' ? 'border-llm bg-llm/10 text-llm' : 'border-border bg-card text-ink-dim hover:text-ink',
          )}
        >
          Long-term
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'agent'}
          onClick={() => setTab('agent')}
          className={cn(
            'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
            tab === 'agent' ? 'border-llm bg-llm/10 text-llm' : 'border-border bg-card text-ink-dim hover:text-ink',
          )}
        >
          Agent retrieval
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {pairs.map((pair) => (
          <MemoryCard key={pair.id} pair={pair} />
        ))}
      </div>

      {tab === 'agent' && <ProblemSolvingBreakdown />}
    </div>
  )
}
