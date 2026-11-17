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
 * A teaching comparison of human memory categories and features found in
 * LLM-based products. These are functional contrasts, not direct mappings
 * between human memory systems and model components.
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
    humanNote: 'limited, task-sensitive capacity',
    aiIcon: MessageCircle,
    aiLabel: 'Context window',
    aiNote: 'tokens supplied to this call',
    detail: 'The model can use the tokens supplied for this request. A chat product may include earlier turns, summaries, or retrieved details; the model does not necessarily receive the whole chat history.',

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
    aiNote: 'optional external storage',
    detail: 'A product may save selected information and retrieve it in a later session. This is application-level storage, not an episodic memory inside the base model.',

  },
  {
    id: 'semantic',
    humanIcon: Lightbulb,
    humanLabel: 'Semantic memory',
    humanNote: 'facts and knowledge',
    aiIcon: Cpu,
    aiLabel: 'Trained knowledge',
    aiNote: 'baked into the model',
    detail: 'Training shapes model parameters, which can influence later responses. This is a broad functional comparison, not a claim that facts are stored as clean, addressable records.',

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
 * how an agent application can manage context and external records. The
 * comparisons describe system behavior, not internal human-like memory.
 */
export const agentMemory: MemoryPair[] = [
  {
    id: 'agent-scratchpad',
    humanIcon: Brain,
    humanLabel: 'Working memory',
    humanNote: 'limited and task-sensitive',
    aiIcon: Layers,
    aiLabel: 'Context window',
    aiNote: 'prompt and supplied context',
    detail: 'Working memory actively maintains and manipulates task-relevant information. A model instead receives a context for each call; the surrounding system may add a plan, prior tool results, or a summary.',

  },
  {
    id: 'agent-capacity',
    humanIcon: Gauge,
    humanLabel: 'Working memory limits',
    humanNote: 'varies with task and strategy',
    aiIcon: Boxes,
    aiLabel: 'Model-specific context limit',
    aiNote: 'input and output token budget',
    detail: 'Human working memory is constrained in ways that depend on task, attention, and chunking. Model context limits are product-specific token budgets; long inputs can still make relevant information harder to use.',

  },
  {
    id: 'agent-episodic',
    humanIcon: History,
    humanLabel: 'Episodic long-term memory',
    humanNote: 'hippocampal recall',
    aiIcon: Search,
    aiLabel: 'Episodic RAG',
    aiNote: 'vector search over logs',
    detail: 'Human episodic memory supports recall of experiences. An agent can search an external record store, but retrieval quality depends on how information was saved, indexed, and queried.',

  },
  {
    id: 'agent-semantic',
    humanIcon: Lightbulb,
    humanLabel: 'Semantic long-term memory',
    humanNote: 'general knowledge and concepts',
    aiIcon: Network,
    aiLabel: 'Semantic RAG & parametric weights',
    aiNote: 'knowledge graphs + trained weights',
    detail: 'Human semantic memory contains general knowledge. An application can retrieve documents or use model parameters shaped by training; neither is a one-to-one counterpart.',

  },
  {
    id: 'agent-search',
    humanIcon: Zap,
    humanLabel: 'Associative & spreading activation',
    humanNote: 'cue-driven and context-sensitive',
    aiIcon: Calculator,
    aiLabel: 'k-NN / cosine similarity',
    aiNote: 'similarity-based retrieval',
    detail: 'Human recall is influenced by cues and context. Vector search ranks stored items by an embedding-based measure; it can miss relevant information and does not capture human association or emotional salience.',

  },
  {
    id: 'agent-update',
    humanIcon: RefreshCw,
    humanLabel: 'Reconsolidation & plasticity',
    humanNote: 'recall can reshape a memory',
    aiIcon: Lock,
    aiLabel: 'Read-heavy & static',
    aiNote: 'needs re-indexing to change',
    detail: 'Some memories can change during retrieval and reconsolidation, but this is not true of every recall. External stores change only when the application writes, edits, or removes records.',

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
    aiApproach: 'A system may place a plan or task instructions in the model context. Some systems also use summaries or structured state; private reasoning traces are not required for an agent to act.',

  },
  {
    id: 'retrieval',
    title: 'Intermediate retrieval',
    humanApproach:
      'Cue-dependent spreading activation surfaces relevant concepts or past experience automatically, with no explicit search step.',
    aiApproach: 'If configured, the system can retrieve documents or past records and add selected results to the model context. Retrieval is an application step, not an automatic property of every model.',

  },
  {
    id: 'error-correction',
    title: 'Error correction & adaptation',
    humanApproach: 'Feedback can update expectations and influence later choices, though memory and learning are not always immediate or error-free.',
    aiApproach: 'The model receives a new context on each call. A harness can append tool results, errors, or summaries and may update external state between calls.',

  },
]
