import type { MythCard } from './types'

export const mythCards: MythCard[] = [
  {
    id: 'understands-me',
    myth: 'The AI understands me.',
    whyBelieved:
      'Its replies track the meaning of what you wrote closely enough, sentence after sentence, that "understanding" feels like the only word that fits.',
    whatActuallyHappens:
      'The model computes statistical relationships between tokens, shaped by patterns across enormous amounts of text, and produces a continuation likely to fit your input.',
    supportingExplanation:
      'Coherent output can emerge from pattern-matching at massive scale without anything resembling comprehension the way a person experiences it. Fluency is evidence of a good next-token predictor, not proof of an inner grasp of meaning.',
  },
  {
    id: 'remembers-me',
    myth: 'The AI remembers me.',
    whyBelieved:
      'Within a single conversation, it correctly refers back to things you said earlier \u2014 which feels exactly like being remembered.',
    whatActuallyHappens:
      'Everything it "recalls" is simply still present in the current context window. Once a conversation ends (or scrolls out of that window), none of it persists in the model itself.',
    supportingExplanation:
      'Any cross-session memory you experience in a product comes from an external system storing and re-inserting your data \u2014 the model\u2019s weights are unchanged by talking to it.',
  },
  {
    id: 'has-emotions',
    myth: 'The AI has emotions.',
    whyBelieved:
      'Its text can sound enthusiastic, apologetic, or empathetic, and emotional language reliably triggers social responses in us.',
    whatActuallyHappens:
      'Emotional-sounding phrasing is generated because similar phrasing appeared in comparable contexts during training \u2014 it is a learned style, not a felt state.',
    supportingExplanation:
      'There is no body, hormone system, or subjective experience behind the words. The model has no wellbeing that could be improved or harmed by the conversation.',
  },
  {
    id: 'knows-what-saying',
    myth: 'The AI knows what it is saying.',
    whyBelieved:
      'Responses are usually accurate and well-structured, which reads as evidence the system grasps the content it is producing.',
    whatActuallyHappens:
      'Each token is chosen because it was statistically likely given the preceding text \u2014 the process doesn\u2019t track truth, only plausibility.',
    supportingExplanation:
      'This is exactly why models can state falsehoods fluently and confidently: fluency and factual grounding are produced by different, only loosely related mechanisms.',
  },
  {
    id: 'wants-to-help',
    myth: 'The AI wants to help.',
    whyBelieved:
      'Responses are often framed helpfully, phrased warmly, and oriented around solving the stated problem.',
    whatActuallyHappens:
      'The model was trained \u2014 through examples and feedback \u2014 to produce responses that reliably score well against a "helpful" criterion, but it holds no persistent desire to do so.',
    supportingExplanation:
      'A want implies a stake in an outcome across time. Nothing in the architecture carries an ongoing motivation from one response to the next; each output is computed fresh.',
  },
]
