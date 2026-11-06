import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { Tooltip } from '../ui/Tooltip'

interface NodeButtonProps {
  label: string
  blurb: string
  side: 'human' | 'llm'
  isActive: boolean
  /** True while *something* is active elsewhere, so inactive nodes know to fade. */
  isDimmed: boolean
  onHover: () => void
  onLeave: () => void
  onSelect: () => void
}

/**
 * A single labeled node in either column. Hover/focus previews a
 * comparison; click/Enter pins it. Ref is forwarded so the parent
 * ComparisonExplorer can measure each node's position for the beam.
 */
export const NodeButton = forwardRef<HTMLButtonElement, NodeButtonProps>(function NodeButton(
  { label, blurb, side, isActive, isDimmed, onHover, onLeave, onSelect },
  ref,
) {
  const accent = side === 'human' ? 'brain' : 'llm'

  return (
    <Tooltip content={blurb} side="top">
      <motion.button
        ref={ref}
        type="button"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onFocus={onHover}
        onBlur={onLeave}
        onClick={onSelect}
        animate={{
          opacity: isDimmed && !isActive ? 0.35 : 1,
          scale: isActive ? 1.03 : 1,
        }}
        transition={{ duration: 0.2 }}
        aria-pressed={isActive}
        className={cn(
          'w-full rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none',
          isActive
            ? side === 'human'
              ? 'border-brain bg-brain/10 shadow-[0_0_24px_-4px_var(--color-brain)]'
              : 'border-llm bg-llm/10 shadow-[0_0_24px_-4px_var(--color-llm)]'
            : 'border-border bg-card hover:border-border hover:bg-card-hover',
        )}
      >
        <span className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-ink">{label}</span>
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-border transition-colors"
            style={
              isActive
                ? { backgroundColor: `var(--color-${accent})`, boxShadow: `0 0 8px var(--color-${accent})` }
                : undefined
            }
            aria-hidden="true"
          />
        </span>
      </motion.button>
    </Tooltip>
  )
})
