import { Blend, GitCompare, Puzzle, ShieldAlert, Workflow, type LucideIcon } from 'lucide-react'

export interface HallucinationCard {
  id: string
  title: string
  icon: LucideIcon
  /** What's actually happening mechanistically on the LLM side. */
  llmMechanism: string
  /** The closest human cognitive-science analogue. */
  humanParallel: string
  /** A concrete exhibit experiment this comparison suggests building. */
  proposedExperiment: string
}

/**
 * Five places where LLM "hallucination" and human "confabulation" turn
 * out to share a root cause -- neither system checks its output against
 * the world, only against what a plausible answer looks like. Each card
 * pairs the mechanism with a proposed exhibit experiment, rather than a
 * finished result -- these are testable, not yet tested.
 */
export const hallucinationCards: HallucinationCard[] = [
  {
    id: 'pattern-matching',
    title: 'Statistical pattern-matching vs. truth verification',
    icon: GitCompare,
    llmMechanism:
      'The model optimizes for statistical plausibility \u2014 predicting the next token from patterns learned in training \u2014 not for verified real-world truth.',
    humanParallel:
      'Human memory isn\u2019t a verified playback either: recollection is reconstructed from semantic schemas and bent by cognitive bias along the way.',
    proposedExperiment:
      'A benchmark pairing LLM hallucination against human confabulation \u2014 have a model stitch together a plausible but fake legal citation from case-pattern proximity, and have a person recall a schema-consistent detail that never actually happened.',
  },
  {
    id: 'cascading',
    title: 'Cascading hallucinations in multi-step workflows',
    icon: Workflow,
    llmMechanism:
      "In multi-agent or multi-hop pipelines, one agent's fabricated premise gets taken as verified input downstream, compounding into a final answer that's internally consistent but entirely false.",
    humanParallel:
      'Sequential human tasks carry the same risk: an early wrong assumption can get carried forward and reinforced rather than caught.',
    proposedExperiment:
      "Trace error propagation through an agent pipeline where Agent A's fabrication misleads Agents B and C, run alongside a task where a person carries an early false premise through several sequential steps, and compare how far the error travels before it's caught, if it is at all.",
  },
  {
    id: 'overfitting',
    title: 'Spurious correlations & overfitting',
    icon: Blend,
    llmMechanism:
      'A model can latch onto a superficial feature \u2014 say, treating a light background as evidence for "cat" and a dark one for "dog" \u2014 instead of the actual concept.',
    humanParallel:
      'Human perception makes a similar mistake, from optical illusions to context effects that quietly bias what we think we saw.',
    proposedExperiment:
      'Test visual and contextual misattribution side by side: an LLM classifying images with the background variable manipulated, against a person on a task built to trigger a known perceptual illusion or context bias.',
  },
  {
    id: 'adversarial',
    title: 'Vulnerability to adversarial inputs',
    icon: ShieldAlert,
    llmMechanism:
      'Malicious or ambiguous prompts can override a model\u2019s instructions and push it into a logic trap that produces a confident, fabricated answer.',
    humanParallel:
      'People are vulnerable to an analogous move \u2014 misleading framing, false presuppositions, and other cognitive trickery, as in the classic Loftus false-memory effect.',
    proposedExperiment:
      "Run a set of prompt-injection and logic-trap attempts against a model, alongside a Loftus-style misleading-question exercise with a human participant, and compare where each one's confidence outruns its accuracy.",
  },
  {
    id: 'data-gaps',
    title: 'Grounding & training data gaps',
    icon: Puzzle,
    llmMechanism:
      'When the available information is sparse, noisy, or ambiguous, the model fills the gap by generating content that merely fits previously observed patterns.',
    humanParallel:
      'Human memory does the same under sparse cues \u2014 constructive memory fills a gap with whatever detail is plausible, not necessarily what happened.',
    proposedExperiment:
      'Progressively strip context from a prompt to find the point where the model starts confabulating high-probability filler, then compare it to how quickly a person\u2019s recall starts filling gaps as retrieval cues are thinned out.',
  },
]
