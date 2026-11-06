import { badgeClasses, badgeLabel, similarityBadge } from '../../utils/similarity'
import { cn } from '../../utils/cn'

interface SimilarityBadgeProps {
  score: number
  showLabel?: boolean
  className?: string
}

export function SimilarityBadgePill({ score, showLabel = true, className }: SimilarityBadgeProps) {
  const tier = similarityBadge(score)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        badgeClasses(tier),
        className,
      )}
    >
      <span className="font-mono-data font-semibold">{score}%</span>
      {showLabel && <span>{badgeLabel(tier)}</span>}
    </span>
  )
}
