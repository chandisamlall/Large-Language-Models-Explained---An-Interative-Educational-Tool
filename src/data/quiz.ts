import type { QuizStatement } from './types'

export const quizStatements: QuizStatement[] = [
  {
    id: 'q1',
    statement: 'The AI feels guilty.',
    correct: 'Anthropomorphic',
    explanation:
      'Guilt is a felt emotional state tied to self-awareness and social consequence. A model can generate apologetic phrasing, but nothing is experienced.',
  },
  {
    id: 'q2',
    statement: 'The AI predicts the next word.',
    correct: 'Accurate',
    explanation:
      'This is a literal, mechanical description of the core training objective and inference procedure of most language models.',
  },
  {
    id: 'q3',
    statement: 'The AI remembers childhood.',
    correct: 'Anthropomorphic',
    explanation:
      'A model has no childhood, no episodic history, and no autobiographical memory \u2014 it has training data and fixed weights.',
  },
  {
    id: 'q4',
    statement: 'The AI has goals.',
    correct: 'Anthropomorphic',
    explanation:
      'Behavior can look goal-directed, but there is no persistent internal state representing a desired future outcome the way a goal implies.',
  },
  {
    id: 'q5',
    statement: 'The AI processes probabilities.',
    correct: 'Accurate',
    explanation:
      'Every output token is sampled from a computed probability distribution \u2014 this is a precise, mechanical description.',
  },
  {
    id: 'q6',
    statement: 'The AI is paying attention to the most relevant part of my message.',
    correct: 'Partially Accurate',
    explanation:
      'Attention weights genuinely do concentrate on certain tokens more than others \u2014 that part is real and measurable. But it is a mathematical weighting, not conscious focus.',
  },
  {
    id: 'q7',
    statement: 'The AI is lying to me.',
    correct: 'Anthropomorphic',
    explanation:
      'Lying requires knowing the truth and choosing to state otherwise with intent to deceive. A model producing a false statement usually reflects an error in what was statistically likely, not a deliberate deception.',
  },
  {
    id: 'q8',
    statement: 'The AI adjusts its output based on the words that came before.',
    correct: 'Accurate',
    explanation:
      'This describes how autoregressive generation and the attention mechanism actually work \u2014 each token is conditioned on everything before it.',
  },
  {
    id: 'q9',
    statement: 'The AI gets tired after a long conversation.',
    correct: 'Anthropomorphic',
    explanation:
      'There is no fatigue mechanism. Quality can degrade in very long contexts for architectural reasons, but nothing resembling tiredness is involved.',
  },
  {
    id: 'q10',
    statement: 'The AI\u2019s response depends on patterns learned from its training data.',
    correct: 'Accurate',
    explanation:
      'This is a direct, accurate description of how a trained model\u2019s weights come to shape its output.',
  },
]
