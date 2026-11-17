import type { QuizStatement } from './types'

export const quizStatements: QuizStatement[] = [
  {
    id: 'q1',
    statement: 'A context window plays a role somewhat like working memory.',
    correct: 'Partially Accurate',
    explanation:
      'Both make information available for a current task. A context window is supplied text with a token limit; working memory is an active, task-sensitive human cognitive system.',
  },
  {
    id: 'q2',
    statement: 'An attention heatmap tells me why a model produced its answer.',
    correct: 'Misleading',
    explanation:
      'Attention weights describe part of a computation, but they are not a complete or necessarily faithful explanation of a model output.',
  },
  {
    id: 'q3',
    statement: 'A product can recall a preference across chats without changing the base model weights.',
    correct: 'Accurate',
    explanation:
      'An application can save information externally and provide it again in a later model call. That is product-level memory, not necessarily model training.',
  },
  {
    id: 'q4',
    statement: 'Tool use and persistent memory belong to the base model alone.',
    correct: 'Misleading',
    explanation:
      'Tools, retrieval, and persistent storage are usually provided by the agent or application around the model, even though the model may help decide when to use them.',
  },
  {
    id: 'q5',
    statement: 'LLM hallucinations and human confabulations can look similar while arising from different processes.',
    correct: 'Accurate',
    explanation:
      'The terms describe different systems and causes. A surface resemblance is useful to discuss, but it does not establish a shared mechanism.',
  },
]
