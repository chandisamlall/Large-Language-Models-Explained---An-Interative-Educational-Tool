/**
 * Shared type definitions for the exhibit's comparison data.
 *
 * Keeping these in one place means the explorer and related views
 * read from the same comparison records,
 * so new comparisons can be added in `comparisons.ts` without
 * touching any component code.
 */

/** Editorial label for functional overlap; it is not a measured score. */
export type AnalogyRating = 'Useful analogy' | 'Limited analogy' | 'No direct analogue'

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
  /** Null when a text-only LLM has no close counterpart for this function. */
  llmId: string | null
  /** Editorial description of functional overlap, not a quantitative score. */
  analogy: AnalogyRating
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

export type QuizCategory = 'Accurate' | 'Partially Accurate' | 'Misleading'

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
  sources: { label: string; url: string }[]
}
