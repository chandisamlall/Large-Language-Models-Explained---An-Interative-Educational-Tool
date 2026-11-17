import type { Comparison } from './types'

/**
 * Editorial comparison notes for the exhibit. Some human functions have
 * no close counterpart in a text-only LLM; shared names or broad roles
 * do not imply shared mechanisms. Ratings describe functional overlap,
 * not a measured similarity score.
 *
 * Add a new comparison by adding a HumanNode + LLMNode (in nodes.ts)
 * and an entry here — no component code needs to change.
 */
export const comparisons: Comparison[] = [
  {
    humanId: 'sensory-input',
    llmId: 'token-input',
    analogy: 'Useful analogy',
    whySimilar:
      'Both sit at an input boundary: sensory systems receive physical signals, while a text-only model receives a token sequence prepared by software.',
    keyDifferences: [
      'Human senses transduce continuous signals across multiple channels; a text model receives discrete token IDs after an application has processed the text.',
      'The shared role is broad input, not shared sensory experience or processing.',
    ],
    misconception: '"The AI sees and hears the way I do."',
    reality:
      'A text-only model receives token IDs and learned representations, not a human-like sensory stream. Multimodal systems can process image or audio representations through additional components.',
    realWorldImplication:
      'Because tokenization splits text mechanically, models can stumble on tasks that seem trivial to us, like counting letters in a word split across multiple tokens.',
    example:
      'Tokenizers can split written text into model-specific pieces; the exact split depends on the tokenizer, not on how a person sees letters.',
  },
  {
    humanId: 'visual-cortex',
    llmId: null,
    analogy: 'No direct analogue',
    whySimilar:
      'A text-only LLM has no visual-cortex counterpart. This is a useful place to show a missing capability rather than force a match.',
    keyDifferences: [
      'Visual cortex is biological tissue involved in processing visual input within a larger visual system.',
      'Text embeddings represent token IDs; they do not process scenes, depth, or motion. Multimodal models may add vision components, which are still not equivalent to a visual cortex.',
    ],
    misconception: '"Text embeddings are the model\u2019s visual cortex."',
    reality:
      'Embeddings map token IDs to learned vectors. Their geometry can encode useful statistical relationships, but it is not visual perception.',
    realWorldImplication:
      'A text-only model can describe an image if the description is in its input, but it has no visual input channel in this comparison.',
    example:
      'A multimodal model may use image encoders; that is a separate system component, not a direct analogue for biological visual experience.',
  },
  {
    humanId: 'auditory-cortex',
    llmId: null,
    analogy: 'No direct analogue',
    whySimilar:
      'A text-only LLM has no auditory-cortex counterpart. Token position is not a stand-in for hearing.',
    keyDifferences: [
      'Auditory pathways process acoustic signals such as pitch, timing, and timbre as part of a wider perceptual system.',
      'Positional information helps a text model represent sequence order; it carries no acoustic signal.',
    ],
    misconception: '"Token positions are the model\u2019s version of hearing."',
    reality:
      'A text-only model can process written descriptions of sound, but it does not hear them. Audio-capable systems add separate audio processing.',
    realWorldImplication:
      'This is a deliberate non-match: sequence order and auditory perception solve different problems.',
    example:
      'Changing token order changes the sequence the model processes; it does not create a sound for the model to hear.',
  },
  {
    humanId: 'working-memory',
    llmId: 'context-window',
    analogy: 'Limited analogy',
    whySimilar:
      'Both concern information currently available for a task. This is a functional analogy only: a context window is text supplied to a model, not an active mental workspace.',
    keyDifferences: [
      'Working memory involves active maintenance and manipulation; capacity and duration depend on task, attention, rehearsal, and interference.',
      'A context window is a model-specific token budget that can include instructions, conversation, retrieved text, and tool results.',
    ],
    misconception: '"The AI remembers everything I\u2019ve said."',
    reality:
      'The model can use only the context supplied to that call. An application may summarize earlier text or retrieve it again; a context limit is not the same as human forgetting.',
    realWorldImplication:
      'Long conversations can exceed a model’s context budget or make relevant details harder to use; products may handle this with summarization or retrieval.',
    example:
      'A chat product may summarize or retrieve a detail from earlier turns; that system behavior is different from a person rehearsing a memory.',
  },
  {
    humanId: 'long-term-memory',
    llmId: 'model-weights',
    analogy: 'Limited analogy',
    whySimilar:
      'Both can influence later behavior based on past learning, but model weights are not a human-like store of autobiographical memories.',
    keyDifferences: [
      'Human long-term memory includes different forms of knowledge and experience and can be updated by later learning and retrieval.',
      'A trained model’s weights typically stay fixed during inference and encode learned patterns in distributed parameters, not addressable episodes.',
    ],
    misconception: '"If I tell the AI something, it will remember it from now on."',
    reality:
      'A conversation usually does not update the base model’s weights. A product can still store user information externally and supply it in a later interaction.',
    realWorldImplication:
      'When a product recalls a preference across chats, check whether its application stores and retrieves that information; it need not have changed model weights.',
    example:
      'A model may answer from patterns encoded during training, while a product may separately save a new preference for future use.',
  },
  {
    humanId: 'hippocampus',
    llmId: null,
    analogy: 'No direct analogue',
    whySimilar:
      'Hidden representations are not a memory-consolidation system. A text-only LLM has no close counterpart to the hippocampus’s role in episodic memory.',
    keyDifferences: [
      'The hippocampus contributes to forming and retrieving episodic and relational memories within broader memory networks.',
      'Hidden representations are intermediate model activations during computation; they are not a mechanism that stores new episodes in the weights.',
    ],
    misconception: '"Hidden representations are where the AI stores this conversation."',
    reality:
      'A deployed text model does not consolidate a conversation into its weights during an ordinary response. External memory features belong to the surrounding application.',
    realWorldImplication:
      'Cross-session recall may use an external store and retrieval step; that is system-level memory, not a hippocampal process inside the language model.',
    example:
      'A chat app that recalls your birthday next week most likely saved it to a note and fed it back to the model, rather than the model having "consolidated" it.',
  },
  {
    humanId: 'attention',
    llmId: 'attention-mechanism',
    analogy: 'Limited analogy',
    whySimilar:
      'Both use selective weighting, but the shared word “attention” refers to different biological and computational processes.',
    keyDifferences: [
      'Human attention includes multiple processes; some are deliberate, while others can operate without conscious awareness.',
      'Transformer attention mixes information across token positions. Its weights are not human focus and do not, by themselves, explain a model’s answer.',
    ],
    misconception: '"The AI is focusing on the important part of my question, the way I would."',
    reality:
      'Attention weights are part of a computation, but interpreting them as a reliable account of feature importance or reasoning requires care.',
    realWorldImplication:
      'A shared label can invite a misleading mental picture; the comparison is about selective information processing, not subjective focus.',
    example:
      'A heatmap can display model attention values, but it should not be read as a complete explanation of why a token was generated.',
  },
  {
    humanId: 'prefrontal-cortex',
    llmId: null,
    analogy: 'No direct analogue',
    whySimilar:
      'Planning and cognitive control are associated with prefrontal and wider brain networks. A text-only transformer has no single component that maps neatly to those functions.',
    keyDifferences: [
      'Prefrontal regions contribute to planning and cognitive control as part of wider, interacting brain networks.',
      'Transformer layers compute representations from the supplied context. Planning and tool use, when present, can arise from the surrounding agent loop rather than a dedicated executive layer.',
    ],
    misconception: '"Deeper layers are where the AI does its \u2018real thinking.\u2019"',
    reality:
      'Transformer depth is a computational design feature; it does not by itself establish deliberation, self-control, or a human-like plan.',
    realWorldImplication:
      'Describing transformer depth as "thinking harder" invites people to expect judgment and self-control that the architecture doesn\u2019t provide.',
    example:
      'A model can produce an incorrect answer despite many layers; depth alone is not a check on truth or judgment.',

  },
  {
    humanId: 'prediction',
    llmId: 'next-token-prediction',
    analogy: 'Useful analogy',
    whySimilar:
      'Both involve prediction, but predictive processing is one influential family of theories about brain function, while next-token prediction is a common language-model objective.',
    keyDifferences: [
      'Predictive-processing accounts concern perception and action across biological systems; their scope and interpretation remain debated.',
      'Many autoregressive language models estimate a distribution over the next token from their context. They may also be fine-tuned, connected to tools, or wrapped in systems that check outputs.',
    ],
    misconception: '"The AI is thinking ahead about how to answer me."',
    reality:
      'Autoregressive decoding produces a sequence step by step. Some systems can also plan, revise, or use tools around that generation loop.',
    realWorldImplication:
      'A fluent continuation is not a guarantee that later claims were checked against reliable evidence.',
    example:
      'In ordinary autoregressive decoding, text is emitted token by token; an agent may still create or revise an outline before or during that process.',

  },
  {
    humanId: 'decision-making',
    llmId: 'probability-distribution',
    analogy: 'Limited analogy',
    whySimilar:
      'Both involve weighing multiple candidates before one is selected \u2014 options with different "scores" competing for a single outcome.',
    keyDifferences: [
      'Human decisions can involve memory, emotion, social context, and goals, across multiple interacting processes.',
      'A next-token distribution is a computational score over possible continuations; it is not itself a human-like deliberative choice.',
    ],
    misconception: '"The AI decided this was the best answer."',
    reality:
      'A decoding rule selects from the distribution. Depending on configuration, it may choose the highest-scoring token or sample among candidates.',
    realWorldImplication:
      'Sampling can introduce variation between runs; deterministic decoding may instead return the same continuation for the same inputs and settings.',
    example:
      'Higher temperature generally flattens the distribution before sampling, which can increase variation; exact behavior depends on the decoding setup.',

  },
  {
    humanId: 'emotion',
    llmId: null,
    analogy: 'No direct analogue',
    whySimilar:
      'Both can influence behavior, but emotion and model parameters are different kinds of things; the comparison is useful mainly for marking that boundary.',
    keyDifferences: [
      'Human emotion involves bodily and neural processes and is commonly associated with felt experience.',
      'Model weights are computational parameters. Emotional language from a model is not evidence that it has a felt emotional state.',
    ],
    misconception: '"The AI seemed sad, so it must feel something."',
    reality:
      'Emotional-sounding text can be generated from learned language patterns and instructions. The text alone cannot establish a subjective feeling.',
    realWorldImplication:
      'Treat emotional language as a social cue in the interaction, not as evidence of a model’s needs or inner experience.',
    example:
      'A model can produce an apology and then a cheerful greeting because the wording fits each context; that shift does not tell us whether a feeling occurred.',

  },
  {
    humanId: 'goals',
    llmId: null,
    analogy: 'No direct analogue',
    whySimilar:
      'Both can shape behavior at different levels: people pursue goals, while an application may direct a model through a task using prompts and tools.',
    keyDifferences: [
      'Human goals can be persistent, revisited intentions; an agent can also pursue an assigned objective operationally across steps.',
      'A base model’s next-token distribution is a computational state, not evidence of a subjective want. Persistent task behavior can be implemented by the surrounding system.',
    ],
    misconception: '"The AI wants to give me a good answer."',
    reality:
      'A model can be configured to help with a task, but helpful behavior does not by itself establish a felt desire to help.',
    realWorldImplication:
      'Distinguish an operational objective set by a person or agent harness from a claim about the model’s subjective intentions.',
    example:
      'A model can be prompted to argue different sides; that flexibility does not settle whether it has any subjective intentions.',

  },
  {
    humanId: 'learning',
    llmId: 'model-weights',
    analogy: 'Limited analogy',
    whySimilar:
      'Both describe a process where exposure to information changes future behavior in a lasting way.',
    keyDifferences: [
      'Human learning can occur through experience and changes in behavior or knowledge over time.',
      'A deployed model’s parameters usually do not update during ordinary inference, though an application can store conversation details or adapt later system inputs.',
    ],
    misconception: '"The more I chat with it, the more it learns about me."',
    reality:
      'A deployed model usually keeps the same weights during a conversation. A product may still remember information through context, retrieval, or external storage.',
    realWorldImplication:
      'Changing the base model’s parameters requires an update process; improving a product’s behavior can also involve retrieval, prompt changes, or other system updates.',
    example:
      'A correction in the current context can affect the next reply. Whether it is available in a later session depends on the product’s memory features.',

  },
  {
    humanId: 'motor-output',
    llmId: 'output-tokens',
    analogy: 'Useful analogy',
    whySimilar:
      'Both are the final, externally visible product of everything upstream \u2014 the only part the outside world actually sees.',
    keyDifferences: [
      'Motor output drives muscles in a physical body embedded in the world, with real-time sensory feedback loops.',
      'Output tokens are decoded text with no physical embodiment and no feedback from the world unless a person reads and responds.',
    ],
    misconception: '"The words are the AI \u2018speaking its mind.\u2019"',
    reality:
      'Output tokens are simply the sampled result of the probability distribution, streamed out and decoded back into readable text.',
    realWorldImplication:
      'Because output looks like considered speech, it\u2019s easy to forget it is the visible tip of a purely statistical process with no inner monologue behind it.',
    example:
      'A model can produce fluent, confident text about a fact it has no reliable basis for \u2014 fluency and accuracy are generated independently.',
  },
]
