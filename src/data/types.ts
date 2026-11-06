/**
 * Shared type definitions for the exhibit's comparison data.
 *
 * Keeping these in one place means every component — the diagrams,
 * the info card, the matrix, the quiz — reads from the same shape,
 * so new comparisons can be added in `comparisons.ts` without
 * touching any component code.
 */

/** How strong the analogy is, bucketed from the 0-100 similarity score. */
export type SimilarityBadge = 'High' | 'Moderate' | 'Low'

/** How confident domain experts would be in the mapping itself (distinct
 *  from the similarity score — a mapping can be low-confidence but still
 *  the "closest available" analogue). */
export type ConfidenceLevel = 'High' | 'Medium' | 'Low'

export interface HumanNode {
  id: string
  label: string
  /** Short clause describing the region/function, shown in tooltips. */
  blurb: string
  /** Approximate position on the simplified brain SVG, in a 0-200 x 0-180 viewBox. */
  position: { x: number; y: number }
}

export interface LLMNode {
  id: string
  label: string
  blurb: string
}

export interface Comparison {
  /** Matches a HumanNode id. */
  humanId: string
  /** Matches an LLMNode id. */
  llmId: string
  similarity: number // 0-100
  confidence: ConfidenceLevel
  whySimilar: string
  keyDifferences: string[]
  misconception: string
  reality: string
  realWorldImplication: string
  example: string
}

export interface MythCard {
  id: string
  myth: string
  whyBelieved: string
  whatActuallyHappens: string
  supportingExplanation: string
}

export type QuizCategory = 'Accurate' | 'Partially Accurate' | 'Anthropomorphic'

export interface QuizStatement {
  id: string
  statement: string
  correct: QuizCategory
  explanation: string
}

export interface ResearchTopic {
  id: string
  title: string
  explanation: string
}

/** Derives the badge tier from a raw similarity score, per the exhibit's
 *  fixed legend (Green 70-100 / Yellow 40-69 / Red 0-39). */
export function similarityBadge(score: number): SimilarityBadge {
  if (score >= 70) return 'High'
  if (score >= 40) return 'Moderate'
  return 'Low'
}
