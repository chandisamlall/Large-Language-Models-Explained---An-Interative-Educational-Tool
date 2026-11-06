export interface ProcessStep {
  label: string
  detail: string
}

/**
 * Two parallel sequences shown as a step-by-step animated walkthrough.
 * Arrays are the same length so they can be played in lockstep.
 */
export const humanProcess: ProcessStep[] = [
  { label: 'Hear sentence', detail: 'Sound waves strike the eardrum and are converted to neural signal.' },
  { label: 'Language processing', detail: 'Auditory and language regions parse phonemes into words and syntax.' },
  { label: 'Memory retrieval', detail: 'Related knowledge and past experience are pulled from long-term memory.' },
  { label: 'Emotion', detail: 'Limbic responses color the meaning with feeling before a reply forms.' },
  { label: 'Goals', detail: 'Current intentions shape what response would actually be worth giving.' },
  { label: 'Reasoning', detail: 'Prefrontal circuits weigh options against memory, emotion, and goals.' },
  { label: 'Speech', detail: 'Motor cortex drives the vocal tract to produce spoken words.' },
]

export const llmProcess: ProcessStep[] = [
  { label: 'Receive tokens', detail: 'Input text is split into tokens and mapped to integer IDs.' },
  { label: 'Embedding', detail: 'Each token ID is converted into a learned numerical vector.' },
  { label: 'Attention', detail: 'Each token vector is weighted against every other token in context.' },
  { label: 'Transformer computation', detail: 'Stacked layers repeatedly transform the representation.' },
  { label: 'Probability distribution', detail: 'The final layer scores every possible next token.' },
  { label: 'Next token', detail: 'One token is sampled from the distribution and appended to the sequence \u2014 then the whole process repeats.' },
]

/* Note: the two tracks are intentionally different lengths (7 steps vs. 6).
   Forcing them to match would misrepresent the processes being compared,
   so ProcessComparison animates each track on its own pace rather than
   locking them to a single shared index. */
