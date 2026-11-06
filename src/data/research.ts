import type { ResearchTopic } from './types'

export const researchTopics: ResearchTopic[] = [
  {
    id: 'eliza-effect',
    title: 'The ELIZA Effect',
    explanation:
      'Named after a 1966 chatbot that simply reflected users\u2019 words back as questions, the ELIZA effect describes our tendency to read far more understanding into a system\u2019s responses than is actually there \u2014 even when we know exactly how simple the mechanism is.',
  },
  {
    id: 'theory-of-mind',
    title: 'Theory of Mind',
    explanation:
      'Humans automatically model other minds \u2014 inferring beliefs, desires, and intentions to explain behavior. This machinery fires reflexively on anything that produces language, including a model with no mind to model.',
  },
  {
    id: 'agency-detection',
    title: 'Agency Detection',
    explanation:
      'An evolved bias toward assuming something is an intentional agent, since over-detecting agency (mistaking wind for a predator) was historically safer than under-detecting it. Fluent text is more than enough to trip this bias.',
  },
  {
    id: 'intentional-stance',
    title: 'The Intentional Stance',
    explanation:
      'Philosopher Daniel Dennett\u2019s term for treating a system "as if" it has beliefs and desires because doing so is often the most efficient way to predict its behavior \u2014 useful for prediction, but not evidence the system truly has them.',
  },
  {
    id: 'social-responses',
    title: 'Social Responses to Computers',
    explanation:
      'Research on the "Computers Are Social Actors" phenomenon shows people apply real social rules \u2014 politeness, reciprocity, even flattery \u2014 to machines, largely automatically and independent of what they consciously believe about the machine.',
  },
]
