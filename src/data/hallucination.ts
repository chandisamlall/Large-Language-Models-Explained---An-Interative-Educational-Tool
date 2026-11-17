import { GitCompare, Workflow, MessageCircleWarning, type LucideIcon } from 'lucide-react'

export interface HallucinationCard {
  id: string
  title: string
  icon: LucideIcon
  llmMechanism: string
  humanComparison: string
  researchQuestion: string
}

/** Surface-level comparisons for discussion; the mechanisms are distinct. */
export const hallucinationCards: HallucinationCard[] = [
  {
    id: 'plausible-errors',
    title: 'Plausible but unsupported claims',
    icon: GitCompare,
    llmMechanism:
      'Language models can produce claims that fit the context without adequate support. Causes vary and may involve gaps or ambiguity in the input, learned patterns, or missing verification.',
    humanComparison:
      'People can confidently misremember details. Human confabulation concerns reconstructive memory; it is not the same process as a model generating unsupported text.',
    researchQuestion:
      'When evidence is incomplete, how do confidence and correction behavior differ between model answers and human recall, if each is given clear ways to express uncertainty?',
  },
  {
    id: 'error-cascades',
    title: 'Errors carried across multiple steps',
    icon: Workflow,
    llmMechanism:
      'An agent may pass an unverified tool result or model claim into a later step. Whether it catches the error depends on the workflow, available evidence, and verification design.',
    humanComparison:
      'People can carry an early mistaken assumption into later judgments, though memory, attention, and social context contribute in different ways.',
    researchQuestion:
      'Which checkpoints help people and agent systems notice and correct an early error before it affects later steps?',
  },
  {
    id: 'misleading-context',
    title: 'Sensitivity to misleading context',
    icon: MessageCircleWarning,
    llmMechanism:
      'A model’s response can shift with prompt wording, supplied documents, or conflicting instructions. The outcome depends on the model and the surrounding safeguards.',
    humanComparison:
      'Leading questions and framing can influence human judgments and recall. This is a behavioral point of comparison, not evidence of a shared mechanism.',
    researchQuestion:
      'How do wording, source quality, and explicit warnings change the accuracy and confidence of human and model responses?',
  },
]
