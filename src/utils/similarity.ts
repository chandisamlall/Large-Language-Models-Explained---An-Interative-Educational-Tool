import type { SimilarityBadge } from '../data/types'
import { similarityBadge } from '../data/types'

export { similarityBadge }

/** Hex color for a given similarity score, matching the exhibit's fixed legend. */
export function similarityColor(score: number): string {
  const badge = similarityBadge(score)
  if (badge === 'High') return 'var(--color-success)'
  if (badge === 'Moderate') return 'var(--color-warning)'
  return 'var(--color-danger)'
}

/** Tailwind utility classes for a badge pill, keyed by tier. */
export function badgeClasses(badge: SimilarityBadge): string {
  switch (badge) {
    case 'High':
      return 'bg-success/15 text-success border-success/30'
    case 'Moderate':
      return 'bg-warning/15 text-warning border-warning/30'
    case 'Low':
      return 'bg-danger/15 text-danger border-danger/30'
  }
}

export function badgeLabel(badge: SimilarityBadge): string {
  switch (badge) {
    case 'High':
      return 'Strong Analogy'
    case 'Moderate':
      return 'Partial Analogy'
    case 'Low':
      return 'Weak Analogy'
  }
}
