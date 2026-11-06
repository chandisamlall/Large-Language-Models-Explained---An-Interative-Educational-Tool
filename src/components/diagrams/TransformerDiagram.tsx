import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useComparison } from '../../context/ComparisonContext'

interface Stage {
  label: string
  llmId: string
  detail: string
}

/** The six-stage flow named in the brief, each mapped to the closest
 *  existing LLM node id so hovering here highlights the same node
 *  everywhere else in the exhibit (columns, matrix). "Feed Forward
 *  Layers" has no separate node of its own, so it shares
 *  `transformer-layers` with the rest of the stacked block. */
const STAGES: Stage[] = [
  { label: 'Input Tokens', llmId: 'token-input', detail: 'Text is split into tokens and mapped to IDs.' },
  { label: 'Embeddings', llmId: 'embeddings', detail: 'Each ID becomes a learned numerical vector.' },
  { label: 'Attention Layers', llmId: 'attention-mechanism', detail: 'Tokens exchange information, weighted by relevance.' },
  { label: 'Feed Forward Layers', llmId: 'transformer-layers', detail: 'Each position is further transformed, layer after layer.' },
  { label: 'Probability Distribution', llmId: 'probability-distribution', detail: 'A score is computed for every possible next token.' },
  { label: 'Next Token', llmId: 'next-token-prediction', detail: 'One token is sampled, and the loop repeats.' },
]

export function TransformerDiagram() {
  const { activeLlmIds, hoverLlm } = useComparison()
  const hasActive = activeLlmIds.length > 0

  return (
    <div className="flex flex-col items-stretch gap-1.5" role="list" aria-label="Simplified transformer processing pipeline">
      {STAGES.map((stage, i) => {
        const isActive = activeLlmIds.includes(stage.llmId)
        return (
          <div key={stage.label} role="listitem">
            <motion.button
              type="button"
              onMouseEnter={() => hoverLlm(stage.llmId)}
              onMouseLeave={() => hoverLlm(null)}
              onFocus={() => hoverLlm(stage.llmId)}
              onBlur={() => hoverLlm(null)}
              animate={{ opacity: !hasActive || isActive ? 1 : 0.4, scale: isActive ? 1.02 : 1 }}
              transition={{ duration: 0.18 }}
              className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                isActive ? 'border-llm bg-llm/10 shadow-[0_0_20px_-6px_var(--color-llm)]' : 'border-border bg-card'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono-data text-sm font-medium text-ink">{stage.label}</span>
                <span className="font-mono-data text-xs text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="mt-1 text-xs text-ink-dim">{stage.detail}</p>
            </motion.button>
            {i < STAGES.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowDown className="h-3.5 w-3.5 text-ink-faint" aria-hidden="true" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
