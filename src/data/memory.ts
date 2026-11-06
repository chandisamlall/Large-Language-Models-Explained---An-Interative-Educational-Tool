import {
  Bike,
  Boxes,
  Brain,
  Calculator,
  Cpu,
  Database,
  Eye,
  Gauge,
  History,
  Layers,
  Lightbulb,
  Lock,
  MessageCircle,
  Network,
  RefreshCw,
  Route,
  ScanEye,
  Search,
  Zap,
  type LucideIcon,
} from 'lucide-react'

export interface MemoryPair {
  id: string
  humanIcon: LucideIcon
  humanLabel: string
  humanNote: string
  aiIcon: LucideIcon
  aiLabel: string
  aiNote: string
  /** Shown when the card is expanded -- a concrete example or one extra
   *  sentence of context, not a restatement of the labels above it. */
  detail: string
}

/**
 * Content grounded in "Rethinking Memory in AI" (arXiv:2504.15965),
 * which maps LLM memory onto the classic short-term/long-term split
 * from human memory science. Kept to five pairs on purpose -- this is
 * meant to be a quick, legible parallel, not the full 8-quadrant
 * taxonomy the paper proposes.
 */
export const shortTermMemory: MemoryPair[] = [
  {
    id: 'sensory',
    humanIcon: Eye,
    humanLabel: 'Sensory memory',
    humanNote: 'ms to seconds',
    aiIcon: ScanEye,
    aiLabel: 'Raw input capture',
    aiNote: 'text, image, audio in',
    detail: "Held just long enough to decide what's worth passing on to working memory.",
  },
  {
    id: 'working',
    humanIcon: Brain,
    humanLabel: 'Working memory',
    humanNote: 'seconds to minutes',
    aiIcon: MessageCircle,
    aiLabel: 'Context window',
    aiNote: 'current chat only',
    detail: 'Holds the live conversation. Gone once the chat ends or scrolls out of range.',
  },
]

export const longTermMemory: MemoryPair[] = [
  {
    id: 'episodic',
    humanIcon: History,
    humanLabel: 'Episodic memory',
    humanNote: 'personal experiences',
    aiIcon: Database,
    aiLabel: 'Memory database',
    aiNote: 'remembers you, across chats',
    detail: 'Example: MemoryBank recalls past conversations, and even fades old ones over time the way human memory does.',
  },
  {
    id: 'semantic',
    humanIcon: Lightbulb,
    humanLabel: 'Semantic memory',
    humanNote: 'facts and knowledge',
    aiIcon: Cpu,
    aiLabel: 'Trained knowledge',
    aiNote: 'baked into the model',
    detail: "Everything the model learned from its training data, fixed in its weights unless it's retrained.",
  },
  {
    id: 'procedural',
    humanIcon: Bike,
    humanLabel: 'Procedural memory',
    humanNote: 'skills, muscle memory',
    aiIcon: Route,
    aiLabel: 'Learned strategies',
    aiNote: 'reusable playbooks',
    detail: 'Example: Voyager builds a library of skills from past tasks that it can reuse in similar situations later.',
  },
]

/**
 * A closer, agent-specific cut of the same short-term/long-term split above:
 * how an agentic system's context window + RAG pipeline lines up against
 * human working and long-term memory feature-by-feature, down to the
 * retrieval mechanism and how each side updates over time.
 */
export const agentMemory: MemoryPair[] = [
  {
    id: 'agent-scratchpad',
    humanIcon: Brain,
    humanLabel: 'Working memory',
    humanNote: 'prefrontal, ~4–7 chunks',
    aiIcon: Layers,
    aiLabel: 'Context window',
    aiNote: 'held in self-attention',
    detail:
      'The prefrontal cortex actively holds and manipulates a handful of task-relevant items. An agent instead keeps the current prompt, active variables, and execution history live in self-attention over its context window.',
  },
  {
    id: 'agent-capacity',
    humanIcon: Gauge,
    humanLabel: 'Severe capacity bottleneck',
    humanNote: 'overload, interference, decay',
    aiIcon: Boxes,
    aiLabel: 'Fixed token bounds',
    aiNote: '128k–1M+ tokens',
    detail:
      "Human working memory is low-capacity and decays without rehearsal. Agents get far more headroom, but long contexts still suffer \u2018lost in the middle\u2019 attention degradation and hard overflow limits.",
  },
  {
    id: 'agent-episodic',
    humanIcon: History,
    humanLabel: 'Episodic long-term memory',
    humanNote: 'hippocampal recall',
    aiIcon: Search,
    aiLabel: 'Episodic RAG',
    aiNote: 'vector search over logs',
    detail:
      'Humans recall specific past events and sequences via the hippocampus. Agents query a vector store for historical logs, tool outputs, or past execution traces by embedding similarity.',
  },
  {
    id: 'agent-semantic',
    humanIcon: Lightbulb,
    humanLabel: 'Semantic long-term memory',
    humanNote: 'neocortical, context-free facts',
    aiIcon: Network,
    aiLabel: 'Semantic RAG & parametric weights',
    aiNote: 'knowledge graphs + trained weights',
    detail:
      'Neocortical networks hold general world knowledge stripped of the events that taught it. Agents pull the equivalent from knowledge graphs and retrieval, or from facts baked directly into the trained weights.',
  },
  {
    id: 'agent-search',
    humanIcon: Zap,
    humanLabel: 'Associative & spreading activation',
    humanNote: 'cue-triggered, emotionally weighted',
    aiIcon: Calculator,
    aiLabel: 'k-NN / cosine similarity',
    aiNote: 'dense vector matching',
    detail:
      'A cue in humans triggers activation that spreads across the network, shaped by emotional salience and recency. Agents instead run exact but context-blind mathematical similarity search over embeddings.',
  },
  {
    id: 'agent-update',
    humanIcon: RefreshCw,
    humanLabel: 'Reconsolidation & plasticity',
    humanNote: 're-encoded on every recall',
    aiIcon: Lock,
    aiLabel: 'Read-heavy & static',
    aiNote: 'needs re-indexing to change',
    detail:
      'Every human recall re-encodes the memory \u2014 adaptive, but also a source of drift and false detail over time. An agent\u2019s external memory stores stay put until something explicitly rewrites or re-indexes them.',
  },
]

export interface ProblemSolvingStep {
  id: string
  title: string
  humanApproach: string
  aiApproach: string
}

/**
 * How the scratchpad/retrieval split above actually plays out across a
 * multi-step task, not just at rest.
 */
export const agentProblemSolving: ProblemSolvingStep[] = [
  {
    id: 'decomposition',
    title: 'Problem decomposition',
    humanApproach:
      'Working memory chunks the task and steers active attention, while long-term memory supplies procedural strategies for how to tackle it.',
    aiApproach:
      'An active system prompt or plan lives in the context window, with step-by-step chain-of-thought traces acting as an artificial scratchpad.',
  },
  {
    id: 'retrieval',
    title: 'Intermediate retrieval',
    humanApproach:
      'Cue-dependent spreading activation surfaces relevant concepts or past experience automatically, with no explicit search step.',
    aiApproach:
      'Hitting an unfamiliar sub-goal triggers a targeted RAG query \u2014 a vector similarity search that pulls semantic facts or past execution traces back into the context buffer.',
  },
  {
    id: 'error-correction',
    title: 'Error correction & adaptation',
    humanApproach: 'Feedback updates the mental model directly and dynamically, in place, within working memory.',
    aiApproach:
      "Agents can't edit their context directly \u2014 they append error logs to the prompt or rewrite an external state block to avoid repeating a failed branch.",
  },
]
