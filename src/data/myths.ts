import type { MythCard } from './types'

export const mythCards: MythCard[] = [
  {
    id: 'understands-me',
    myth: 'The AI understands me.',
    whyBelieved:
      'Its replies often track the context and intent of what you wrote well enough to support useful conversation.',
    whatActuallyHappens:
      'A language model processes learned representations of the supplied input and generates text conditioned on that context. Some models can handle complex tasks; this alone does not settle what kind of understanding they have.',
    supportingExplanation:
      '“Understanding” can mean successful task performance, human-like comprehension, or subjective grasp. Fluent replies provide evidence about behavior, but do not by themselves establish the latter two.',
  },
  {
    id: 'remembers-me',
    myth: 'The AI remembers me.',
    whyBelieved:
      'A model can refer to earlier details when those details are included in the current input, which can feel like personal memory.',
    whatActuallyHappens:
      'The model can use information supplied in its context. Whether details persist across chats depends on the product: it may save and retrieve selected information externally.',
    supportingExplanation:
      'A product can recall a preference without changing the base model weights. Context, retrieval, and model parameters are distinct parts of the system.',
  },
  {
    id: 'has-emotions',
    myth: 'The AI has emotions.',
    whyBelieved:
      'Text that sounds warm, apologetic, or excited can invite the same social interpretations we use in conversation with people.',
    whatActuallyHappens:
      'A model can generate emotional language based on learned patterns, instructions, and context. The wording alone cannot establish a felt emotional state.',
    supportingExplanation:
      'It is useful to distinguish the observable behavior from claims about inner experience. This exhibit does not treat conversational style as evidence that a system feels or has needs.',
  },
  {
    id: 'knows-what-saying',
    myth: 'A fluent answer means the AI knows it is true.',
    whyBelieved:
      'Well-structured explanations can sound confident and informed, making accuracy easy to infer from style.',
    whatActuallyHappens:
      'Language models generate from learned patterns and the information available in context. A plausible answer may still be unsupported or wrong.',
    supportingExplanation:
      'Some systems use tools, sources, or verification steps, but those features must be part of the deployed system. Fluency by itself is not a fact-check.',
  },
  {
    id: 'wants-to-help',
    myth: 'The AI wants to help.',
    whyBelieved:
      'Many assistants are designed to respond helpfully and may be connected to agents that carry out multi-step tasks.',
    whatActuallyHappens:
      'Training and system instructions shape helpful behavior. An agent can pursue an assigned objective through tools, but that operational goal does not establish a subjective desire.',
    supportingExplanation:
      'When describing an agent, separate its configured task and system behavior from a claim that the model personally wants an outcome.',
  },
]
