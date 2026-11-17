export interface ProcessStep {
  label: string
  detail: string
}

/** A pair of teaching sketches, not a one-to-one process map. */
export const humanProcess: ProcessStep[] = [
  { label: 'Hear sentence', detail: 'Sound waves are converted into neural signals by the auditory system.' },
  { label: 'Language processing', detail: 'Interacting auditory and language networks help process speech and meaning.' },
  { label: 'Memory and context', detail: 'Cues can bring related knowledge and past experience to bear; recall is not a perfect recording.' },
  { label: 'Emotion and attention', detail: 'Emotion and attention can shape interpretation and response; neither is a required serial step.' },
  { label: 'Goals and control', detail: 'Goals and cognitive control can guide choices through interacting brain networks.' },
  { label: 'Response', detail: 'Language planning and motor systems contribute to spoken words.' },
]

export const llmProcess: ProcessStep[] = [
  { label: 'Receive tokens', detail: 'Input text is split into model-specific tokens and mapped to integer IDs.' },
  { label: 'Embedding', detail: 'Each token ID maps to a learned numerical vector.' },
  { label: 'Attention', detail: 'Each position mixes information from allowed earlier positions using learned weights.' },
  { label: 'Transformer computation', detail: 'Stacked layers repeatedly transform the representation.' },
  { label: 'Probability distribution', detail: 'The model scores possible next tokens from its current context.' },
  { label: 'Next token', detail: 'A decoding rule selects a token and appends it; generation then repeats with the expanded context.' },
]
