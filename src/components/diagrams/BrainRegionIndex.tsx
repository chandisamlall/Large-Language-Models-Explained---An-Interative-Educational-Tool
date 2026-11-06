import { useComparison } from '../../context/ComparisonContext'
import { humanNodes } from '../../data/nodes'
import { cn } from '../../utils/cn'

export function BrainRegionIndex() {
  const { activeHumanIds, hoverHuman, selectHuman } = useComparison()

  return (
    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-2" role="list" aria-label="List of brain regions">
      {humanNodes.map((node) => {
        const isActive = activeHumanIds.includes(node.id)
        return (
          <button
            key={node.id}
            type="button"
            role="listitem"
            onMouseEnter={() => hoverHuman(node.id)}
            onMouseLeave={() => hoverHuman(null)}
            onFocus={() => hoverHuman(node.id)}
            onBlur={() => hoverHuman(null)}
            onClick={() => selectHuman(node.id)}
            className={cn(
              'rounded-lg border px-2.5 py-1.5 text-left text-xs transition-colors',
              isActive ? 'border-brain bg-brain/10 text-ink' : 'border-transparent bg-bg-raised text-ink-dim hover:text-ink',
            )}
          >
            {node.label}
          </button>
        )
      })}
    </div>
  )
}
