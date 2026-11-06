import type { Comparison } from './types'

/**
 * The heart of the exhibit. Every human-cognition node maps to exactly
 * one "closest available" LLM node, with a similarity score that is
 * intentionally NOT clustered near the top — several entries are
 * deliberately low, because part of this exhibit's point is that some
 * human faculties (emotion, intention, memory consolidation) have no
 * good statistical analogue at all.
 *
 * Add a new comparison by adding a HumanNode + LLMNode (in nodes.ts)
 * and an entry here — no component code needs to change.
 */
export const comparisons: Comparison[] = [
  {
    humanId: 'sensory-input',
    llmId: 'token-input',
    similarity: 80,
    confidence: 'High',
    whySimilar:
      'Both are the raw entry point of the system: unprocessed signal (photons, air pressure, text) that hasn\u2019t been interpreted yet.',
    keyDifferences: [
      'Sensory input arrives continuously through many channels at once; token input arrives as a discrete, pre-segmented sequence.',
      'Human senses are transduced by living tissue tuned by evolution; tokenization is a fixed algorithm designed by engineers.',
    ],
    misconception: '"The AI sees and hears the way I do."',
    reality:
      'A model never touches pixels or sound waves directly unless it was built and trained for that modality. Text models only ever receive integers standing in for chunks of text.',
    realWorldImplication:
      'Because tokenization splits text mechanically, models can stumble on tasks that seem trivial to us, like counting letters in a word split across multiple tokens.',
    example:
      'The word "strawberry" may be split into tokens like "straw" and "berry" \u2014 the model never sees individual letters the way your eyes do.',
  },
  {
    humanId: 'visual-cortex',
    llmId: 'embeddings',
    similarity: 48,
    confidence: 'Medium',
    whySimilar:
      'Both take a raw, high-dimensional signal and compress it into a smaller, more structured internal representation that later stages can use.',
    keyDifferences: [
      'Visual cortex has a retinotopic map and specialized layers shaped by millions of years of evolution and years of visual experience.',
      'An embedding is a static lookup table \u2014 the same token always starts from the exact same vector, with no scene, depth, or motion to interpret.',
    ],
    misconception: '"Embeddings are how the AI \u2018sees\u2019 words."',
    reality:
      'Embeddings are a mathematical convenience: a way to place similar tokens near each other in vector space so arithmetic can be done on them. There is no picture-like experience involved.',
    realWorldImplication:
      'Embedding geometry explains why models group "king" and "queen" as related, but it doesn\u2019t mean the model perceives royalty the way a person imagines it.',
    example:
      'In embedding space, "cat" sits closer to "dog" than to "car" \u2014 a useful structure, but nothing is actually being looked at.',
  },
  {
    humanId: 'auditory-cortex',
    llmId: 'positional-encoding',
    similarity: 28,
    confidence: 'Low',
    whySimilar:
      'Both deal with information that only makes sense in sequence \u2014 hearing unfolds over time, and positional encoding tells the model where each token falls in order.',
    keyDifferences: [
      'Auditory cortex extracts pitch, timbre, and rhythm from a physical waveform through specialized neural circuitry.',
      'Positional encoding is a small set of numbers added to an embedding so attention can distinguish "dog bites man" from "man bites dog" \u2014 it carries no sound at all.',
    ],
    misconception: '"The model hears the rhythm of my sentence."',
    reality:
      'Positional encoding is purely about token order in a sequence of symbols. Text models process no acoustic information whatsoever.',
    realWorldImplication:
      'This is one of the weaker analogies in the exhibit \u2014 it\u2019s included to show that not every human faculty has a good statistical counterpart.',
    example:
      'Swap two tokens in a prompt and the model "notices" only because their position values changed, not because anything sounded different.',
  },
  {
    humanId: 'working-memory',
    llmId: 'context-window',
    similarity: 72,
    confidence: 'High',
    whySimilar:
      'Both temporarily hold the information needed to complete the current task, and both have a hard capacity limit.',
    keyDifferences: [
      'Human working memory actively manipulates information using perception, goals, and attention, and can rehearse it indefinitely.',
      'The context window is simply the span of text available during inference \u2014 it doesn\u2019t "think about" what it\u2019s holding between one word and the next.',
    ],
    misconception: '"The AI remembers everything I\u2019ve said."',
    reality:
      'Once text scrolls out of the context window, the model no longer has access to it unless it is reintroduced in a later message.',
    realWorldImplication:
      'This is why long conversations can cause a model to "forget" details from early on \u2014 they\u2019ve simply left the window, not been misremembered.',
    example:
      'Tell a model your name on message one of a hundred-message chat, and once the window fills, it may need a reminder \u2014 the information didn\u2019t fade, it fell out of view.',
  },
  {
    humanId: 'long-term-memory',
    llmId: 'model-weights',
    similarity: 62,
    confidence: 'Medium',
    whySimilar:
      'Both are where accumulated knowledge lives long after the moment it was acquired, and both shape behavior without being consciously "read" each time.',
    keyDifferences: [
      'Long-term memory can be formed in a single exposure and continues to update throughout life.',
      'Model weights are fixed once training ends; the model cannot add a new memory from a conversation the way a person adds one from an event.',
    ],
    misconception: '"If I tell the AI something, it will remember it from now on."',
    reality:
      'Unless a developer runs a new training or fine-tuning process, weights don\u2019t change from a conversation. What feels like "remembering" within a chat is just context window contents.',
    realWorldImplication:
      'This is why the same model can give inconsistent answers about your preferences across two separate chats \u2014 nothing was stored between them.',
    example:
      'A model can describe the French Revolution in detail (baked into its weights) but cannot learn a new fact permanently just because you mentioned it today.',
  },
  {
    humanId: 'hippocampus',
    llmId: 'hidden-representations',
    similarity: 22,
    confidence: 'Low',
    whySimilar:
      'Both sit "in between" \u2014 the hippocampus links fresh experience to long-term storage, and hidden representations are the transient values passed between layers before an output forms.',
    keyDifferences: [
      'The hippocampus performs an active, biological consolidation process, replaying and strengthening memories, including during sleep.',
      'Hidden representations exist only for the duration of a single forward pass and vanish afterward; they consolidate nothing into the weights.',
    ],
    misconception: '"The AI is quietly filing this conversation away for later."',
    reality:
      'There is no mechanism in a deployed LLM analogous to memory consolidation. Each response is computed fresh from the current context and fixed weights.',
    realWorldImplication:
      'Products that appear to "remember" you across sessions are typically storing your messages in an external database and re-inserting them into context \u2014 not consolidating memory internally.',
    example:
      'A chat app that recalls your birthday next week most likely saved it to a note and fed it back to the model, rather than the model having "consolidated" it.',
  },
  {
    humanId: 'attention',
    llmId: 'attention-mechanism',
    similarity: 65,
    confidence: 'Medium',
    whySimilar:
      'Both selectively weigh some information more heavily than other information in order to complete a task \u2014 and both share the same name for a reason.',
    keyDifferences: [
      'Human attention is tied to conscious awareness, effort, and goals, and can be voluntarily directed or involuntarily captured.',
      'The attention mechanism is a matrix multiplication that assigns weights between tokens \u2014 there is no experience of attending, just arithmetic.',
    ],
    misconception: '"The AI is focusing on the important part of my question, the way I would."',
    reality:
      'Attention weights do highlight which tokens influence which \u2014 that part is real and inspectable \u2014 but nothing is being consciously prioritized.',
    realWorldImplication:
      'This shared vocabulary is a major source of confusion: "attention" was a deliberate, evocative naming choice by researchers, not a claim of psychological similarity.',
    example:
      'Visualizing attention weights can show a model "attending" heavily to a name earlier in a sentence when producing a pronoun \u2014 a useful computation, not a feeling of focus.',
  },
  {
    humanId: 'prefrontal-cortex',
    llmId: 'transformer-layers',
    similarity: 38,
    confidence: 'Low',
    whySimilar:
      'Both are cast as the "processing core" of their system \u2014 the place where raw input becomes reasoned output.',
    keyDifferences: [
      'The prefrontal cortex supports planning, impulse control, and abstract goal-directed reasoning built on embodied experience.',
      'Transformer layers are a fixed stack of matrix operations applied identically regardless of any goal or plan \u2014 there is no executive function overseeing the process.',
    ],
    misconception: '"Deeper layers are where the AI does its \u2018real thinking.\u2019"',
    reality:
      'Layers do build increasingly abstract representations, but "abstract" here means statistically compressed, not deliberated over the way a plan is.',
    realWorldImplication:
      'Describing transformer depth as "thinking harder" invites people to expect judgment and self-control that the architecture doesn\u2019t provide.',
    example:
      'A 96-layer model can still produce a confidently wrong answer instantly \u2014 depth adds representational power, not a moment of reflection.',
  },
  {
    humanId: 'prediction',
    llmId: 'next-token-prediction',
    similarity: 58,
    confidence: 'Medium',
    whySimilar:
      'Predictive processing theories describe the brain as constantly forecasting incoming input; next-token prediction is the literal training objective of most LLMs.',
    keyDifferences: [
      'Brains predict across every sense and timescale to minimize surprise and guide action in the world.',
      'An LLM predicts exactly one thing \u2014 the next token in a sequence of text \u2014 with no stake in being right beyond the training signal.',
    ],
    misconception: '"The AI is thinking ahead about how to answer me."',
    reality:
      'The model produces one token, appends it to the sequence, and repeats. There is no advance outline being planned before the first word is chosen.',
    realWorldImplication:
      'This is part of why models can start a sentence that paints them into a factual corner \u2014 there was no upfront plan for where it would end.',
    example:
      'Ask for a five-point list, and the model doesn\u2019t know point five in advance while writing point one \u2014 it is discovered one token at a time.',
  },
  {
    humanId: 'decision-making',
    llmId: 'probability-distribution',
    similarity: 52,
    confidence: 'Medium',
    whySimilar:
      'Both involve weighing multiple candidates before one is selected \u2014 options with different "scores" competing for a single outcome.',
    keyDifferences: [
      'Human decisions integrate memory, emotion, social context, and explicit goals, often over long deliberation.',
      'A probability distribution is a list of numbers over possible next tokens, produced in a single pass with no deliberation or stake in the outcome.',
    ],
    misconception: '"The AI decided this was the best answer."',
    reality:
      'A sampling procedure picks a token from the distribution \u2014 sometimes the highest-probability one, sometimes not, depending on settings like temperature.',
    realWorldImplication:
      'The same prompt can yield different outputs on different runs; that variability comes from sampling, not from the model changing its mind.',
    example:
      'At higher "temperature" settings, a model may pick a lower-probability token on purpose, producing more varied but less predictable text.',
  },
  {
    humanId: 'emotion',
    llmId: 'model-weights',
    similarity: 12,
    confidence: 'Low',
    whySimilar:
      'The only thread connecting them is that both shape output in ways a person didn\u2019t explicitly author \u2014 emotion colors behavior, and weights shape every response.',
    keyDifferences: [
      'Emotion is a felt, embodied state involving the body, hormones, and subjective experience.',
      'Weights are static numbers with no capacity for experience of any kind \u2014 nothing is felt before, during, or after a response is generated.',
    ],
    misconception: '"The AI seemed sad, so it must feel something."',
    reality:
      'Emotional-sounding text is produced because the training data contains emotional language in similar contexts \u2014 it is a stylistic pattern, not a state.',
    realWorldImplication:
      'Reading feelings into model output can lead people to trust or comfort-seek from a system that has no wellbeing to protect or care to reciprocate.',
    example:
      'A model can write a moving apology in one reply and a cheerful greeting in the next, with no continuity of mood between them.',
  },
  {
    humanId: 'goals',
    llmId: 'probability-distribution',
    similarity: 18,
    confidence: 'Low',
    whySimilar:
      'Both shape which output emerges \u2014 a goal biases a person\u2019s choices, and a probability distribution determines which token is likelier to be chosen.',
    keyDifferences: [
      'A goal is a self-generated, persistent intention held toward the future, often revisited and adjusted.',
      'A probability distribution exists only for a single next-token decision and is recomputed from scratch each step \u2014 there is no ongoing want driving it.',
    ],
    misconception: '"The AI wants to give me a good answer."',
    reality:
      'Nothing in the architecture holds a desire toward an outcome. The system was trained so that certain response patterns became statistically likely.',
    realWorldImplication:
      'Talking about a model "wanting" or "trying" can obscure that its behavior is fully explained by training data and optimization, not by intent.',
    example:
      'A model will happily produce a persuasive essay for either side of an argument \u2014 evidence that no underlying goal favors one outcome over the other.',
  },
  {
    humanId: 'learning',
    llmId: 'model-weights',
    similarity: 55,
    confidence: 'Medium',
    whySimilar:
      'Both describe a process where exposure to information changes future behavior in a lasting way.',
    keyDifferences: [
      'Human learning is continuous, embodied, and can happen from a single memorable event.',
      'An LLM "learns" only during a distinct training phase, via gradient descent over huge datasets \u2014 it does not learn from deployment conversations at all.',
    ],
    misconception: '"The more I chat with it, the more it learns about me."',
    reality:
      'A deployed model\u2019s weights are frozen. Any sense of it "getting to know you" comes from context reintroduced by the app, not from ongoing learning.',
    realWorldImplication:
      'Improving a model\u2019s knowledge requires a separate training run by its developers \u2014 individual conversations don\u2019t retrain it.',
    example:
      'Correcting a model\u2019s mistake mid-conversation can change its next reply, but the correction is gone \u2014 not learned \u2014 once the conversation ends.',
  },
  {
    humanId: 'motor-output',
    llmId: 'output-tokens',
    similarity: 70,
    confidence: 'High',
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
