import type { AnalogyRating } from '../../data/types'
import { cn } from '../../utils/cn'

const RATING_CLASSES: Record<AnalogyRating, string> = {
  'Useful analogy': 'border-success/30 bg-success/10 text-success',
  'Limited analogy': 'border-warning/30 bg-warning/10 text-warning',
  'No direct analogue': 'border-border bg-bg-raised text-ink-dim',
}

export function AnalogyBadge({ rating, className }: { rating: AnalogyRating; className?: string }) {
  return (
    <span className={cn('inline-flex rounded-full border px-2.5 py-1 text-xs font-medium', RATING_CLASSES[rating], className)}>
      {rating}
    </span>
  )
}
