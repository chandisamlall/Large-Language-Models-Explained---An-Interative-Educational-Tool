import {
  BarChart3,
  Boxes,
  Cloud,
  Compass,
  Ear,
  Eye,
  Footprints,
  Hand,
  Layers,
  Layers3,
  Network,
  Repeat,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

export interface FlowStage {
  id: string
  icon: LucideIcon
  label: string
  detail: string
}

/**
 * Two parallel eight-stage flows -- input through to output -- for the
 * click-through process diagram. Order matters: rendered top-to-bottom
 * as a connected sequence, same length on both sides on purpose so the
 * two tracks read as directly comparable steps.
 */
export const humanFlow: FlowStage[] = [
  {
    id: 'auditory-language',
    icon: Ear,
    label: 'Auditory / language',
    detail: 'Sound waves striking the eardrum become a neural signal, parsed into words and syntax by auditory and language regions.',
  },
  {
    id: 'visual-world-model',
    icon: Eye,
    label: 'Visual / world model',
    detail: 'Visual input feeds a running model of the physical scene \u2014 objects, depth, and what they afford, not just raw pixels.',
  },
  {
    id: 'tactile-embodied',
    icon: Hand,
    label: 'Tactile / embodied',
    detail: 'Touch and proprioception ground abstract concepts in a physical body \u2014 there\u2019s no equivalent input channel in a text-only model.',
  },
  {
    id: 'emotion-metacognition',
    icon: Cloud,
    label: 'Emotion / metacognition',
    detail: 'Limbic responses color incoming information with feeling, while metacognition tracks the brain\u2019s own confidence and state.',
  },
  {
    id: 'child-exploring',
    icon: Footprints,
    label: 'Active exploring',
    detail: 'A child (or adult) pokes at the world and observes what happens \u2014 learning driven by action, not just passive exposure.',
  },
  {
    id: 'active-inference',
    icon: Repeat,
    label: 'Continuous active inference',
    detail: 'The brain constantly predicts what it expects to sense next and updates on the difference \u2014 an always-on loop, not a single forward pass.',
  },
  {
    id: 'causal-looping',
    icon: Network,
    label: 'Causal looping',
    detail: 'Action and perception feed back into each other continuously, letting cause-and-effect relationships get revised in real time.',
  },
  {
    id: 'grounded-reality',
    icon: Compass,
    label: 'Grounded reality construct',
    detail: 'The resulting world-model is grounded in lived, embodied experience \u2014 not just statistical exposure to descriptions of the world.',
  },
]

export const llmFlow: FlowStage[] = [
  {
    id: 'token-input',
    icon: Layers,
    label: 'Token input',
    detail: 'Text is split into tokens (e.g. "I", "can", "build") and mapped to integer IDs before anything else happens.',
  },
  {
    id: 'context-window',
    icon: Boxes,
    label: 'Context window',
    detail: 'Tokens sit in a fixed-size buffer \u2014 the model\u2019s entire view of "now," bounded by a hard token limit.',
  },
  {
    id: 'encoder',
    icon: Layers3,
    label: 'Encoder',
    detail: 'Each token ID is converted into a learned numerical vector before entering the transformer stack.',
  },
  {
    id: 'multi-head-attention',
    icon: Network,
    label: 'Multi-head attention',
    detail: 'Every token vector is weighted against every other token in context, in parallel, across multiple attention heads.',
  },
  {
    id: 'feed-forward',
    icon: Boxes,
    label: 'Feed forward',
    detail: 'A per-token neural network layer further transforms each representation before passing it to the next block.',
  },
  {
    id: 'transformer-stack',
    icon: Layers3,
    label: 'Stacked transformer blocks',
    detail: 'Attention and feed-forward layers repeat many times, each pass refining the representation a little further.',
  },
  {
    id: 'probability-distribution',
    icon: BarChart3,
    label: 'Probability distribution output',
    detail: 'The final layer scores every possible next token, and one is sampled to continue the sequence \u2014 then the process repeats.',
  },
  {
    id: 'tool-call',
    icon: Wrench,
    label: 'Tool call branch',
    detail: 'Instead of a token, the model can emit a structured call to an external tool and splice the result back into context.',
  },
]

export interface FlowInsight {
  id: string
  title: string
  humanSide: string
  aiSide: string
}

/** The two "comparative insight" callouts from the source infographic,
 *  shown between the two flow tracks. */
export const flowInsights: FlowInsight[] = [
  {
    id: 'memory-mechanics',
    title: 'Memory mechanics',
    humanSide:
      'The hippocampus indexes and consolidates memories dynamically, strengthening or fading them over time based on use and relevance.',
    aiSide:
      'A context window is a fixed-size buffer: once it\u2019s full, the oldest tokens are displaced to make room for new ones \u2014 there\u2019s no consolidation, just eviction.',
  },
  {
    id: 'world-model',
    title: 'World model construction',
    humanSide: 'Grasping a real coffee cup binds sight, touch, weight, and temperature into one grounded, embodied concept.',
    aiSide:
      'The token "coffee" is a point in a high-dimensional vector space, positioned near related words purely from co-occurrence statistics.',
  },
]

export interface FlowStat {
  label: string
  detail: string
}

export const humanFlowStats: FlowStat[] = [
  { label: 'Dynamic plasticity', detail: '~100 trillion synapses, continuously rewired by experience.' },
  { label: 'Multi-modal learning', detail: 'Sight, sound, touch, and language are learned as one integrated system.' },
  { label: 'Real-time adaptation', detail: 'Behavior updates within a single interaction, no separate training step required.' },
]

export const llmFlowStats: FlowStat[] = [
  { label: 'Static parameters', detail: 'Trillions of fixed weights, unchanged between training runs.' },
  { label: 'Statistical pattern learning', detail: 'Behavior comes entirely from patterns absorbed during training.' },
  { label: 'Re-training / RAG required', detail: 'New knowledge needs fine-tuning, retraining, or an external retrieval system.' },
]
