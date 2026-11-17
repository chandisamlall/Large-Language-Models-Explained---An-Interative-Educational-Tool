import type { ResearchTopic } from './types'

export const researchTopics: ResearchTopic[] = [
  {
    id: 'eliza-effect',
    title: 'The ELIZA Effect',
    explanation:
      'Joseph Weizenbaum’s 1960s ELIZA program showed how people could read understanding into a text exchange, even when the program followed a narrow script. It is a historical example of interpretation, not proof that every fluent system triggers the same response.',
    sources: [{ label: 'Weizenbaum (1966)', url: 'https://doi.org/10.1145/365153.365168' }],
  },
  {
    id: 'theory-of-mind',
    title: 'Theory of Mind',
    explanation:
      'This research framework studies how people explain behavior by reasoning about beliefs, desires, and intentions. Applying it to a chatbot can describe how a person interprets its replies; it does not show that the system has those mental states.',
    sources: [{ label: 'Premack & Woodruff (1978)', url: 'https://doi.org/10.1017/S0140525X00076512' }],
  },
  {
    id: 'agency-detection',
    title: 'Agency Detection',
    explanation:
      'People use cues to decide whether something is an agent. The proposal that people are biased toward over-detecting agency is one account in this research area, not a settled explanation for reactions to AI; context and social cues matter.',
    sources: [{ label: 'Barrett (2000)', url: 'https://pubmed.ncbi.nlm.nih.gov/10637620/' }],
  },
  {
    id: 'intentional-stance',
    title: 'The Intentional Stance',
    explanation:
      'Daniel Dennett described treating a system as if it had beliefs and desires as a strategy for predicting what it will do. The strategy can be useful without showing that the system has human-like beliefs, desires, or feelings.',
    sources: [{ label: 'Dennett, The Intentional Stance', url: 'https://mitpress.mit.edu/9780262040938/the-intentional-stance/' }],
  },
  {
    id: 'social-responses',
    title: 'Social Responses to Computers',
    explanation:
      'Studies have found people applying social rules to computers in some settings. These effects depend on the task and cues; they should not be treated as automatic or universal responses to every conversational system.',
    sources: [
      { label: 'Reeves & Nass (1996)', url: 'https://concetticontrastivi.org/wp-content/uploads/2022/12/computer_are_social_actors.pdf' },
      { label: 'Kraus et al. (2023)', url: 'https://doi.org/10.1038/s41598-023-46527-9' },
    ],
  },
]
