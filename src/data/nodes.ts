import type { HumanNode, LLMNode } from './types'

/**
 * The 14 human-cognition nodes shown on the left column and on the
 * simplified brain illustration. `position` is hand-placed on a
 * 240x200 viewBox approximating each region's real location on a
 * left-facing sagittal brain outline — close enough for orientation,
 * not a clinical atlas.
 */
export const humanNodes: HumanNode[] = [
  {
    id: 'sensory-input',
    label: 'Sensory Input',
    blurb: 'Raw signals arriving from eyes, ears, skin, and other senses.',
    position: { x: 112, y: 30 },
  },
  {
    id: 'visual-cortex',
    label: 'Visual Cortex',
    blurb: 'Occipital lobe tissue that turns light patterns into edges, shapes, and motion.',
    position: { x: 200, y: 74 },
  },
  {
    id: 'auditory-cortex',
    label: 'Auditory Cortex',
    blurb: 'Temporal lobe tissue that decomposes sound into pitch, rhythm, and speech cues.',
    position: { x: 150, y: 120 },
  },
  {
    id: 'working-memory',
    label: 'Working Memory',
    blurb: 'A limited-capacity workspace that holds and manipulates information for seconds at a time.',
    position: { x: 68, y: 55 },
  },
  {
    id: 'long-term-memory',
    label: 'Long-Term Memory',
    blurb: 'Durable storage for facts, skills, and experience, distributed across the cortex.',
    position: { x: 174, y: 142 },
  },
  {
    id: 'hippocampus',
    label: 'Hippocampus',
    blurb: 'A seahorse-shaped structure that indexes new experiences into long-term memory.',
    position: { x: 140, y: 148 },
  },
  {
    id: 'attention',
    label: 'Attention',
    blurb: 'Networks that prioritize some signals over others based on salience and goals.',
    position: { x: 100, y: 58 },
  },
  {
    id: 'prefrontal-cortex',
    label: 'Prefrontal Cortex',
    blurb: 'The seat of planning, impulse control, and abstract reasoning, behind the forehead.',
    position: { x: 38, y: 72 },
  },
  {
    id: 'prediction',
    label: 'Prediction',
    blurb: 'The brain\u2019s constant habit of forecasting what will happen next, at every level of processing.',
    position: { x: 208, y: 152 },
  },
  {
    id: 'decision-making',
    label: 'Decision Making',
    blurb: 'Weighing options against goals, memory, and emotion to select an action.',
    position: { x: 56, y: 116 },
  },
  {
    id: 'emotion',
    label: 'Emotion',
    blurb: 'Limbic-system responses \u2014 felt, embodied states that color perception and choice.',
    position: { x: 96, y: 128 },
  },
  {
    id: 'goals',
    label: 'Goals',
    blurb: 'Internally generated wants and intentions that direct attention and behavior.',
    position: { x: 36, y: 102 },
  },
  {
    id: 'learning',
    label: 'Learning',
    blurb: 'Synaptic change driven by experience \u2014 ongoing, embodied, and lifelong.',
    position: { x: 178, y: 100 },
  },
  {
    id: 'motor-output',
    label: 'Motor Output',
    blurb: 'Signals sent to muscles to produce speech, movement, and action.',
    position: { x: 80, y: 26 },
  },
]

/**
 * The 11 LLM-pipeline nodes shown on the right column and on the
 * transformer diagram, in roughly the order information flows
 * through a decoder-only transformer at inference time.
 */
export const llmNodes: LLMNode[] = [
  {
    id: 'token-input',
    label: 'Token Input',
    blurb: 'Text chopped into tokens \u2014 word pieces mapped to integer IDs.',
  },
  {
    id: 'embeddings',
    label: 'Embeddings',
    blurb: 'A lookup table that turns each token ID into a vector of learned numbers.',
  },
  {
    id: 'positional-encoding',
    label: 'Positional Encoding',
    blurb: 'Extra signal added to embeddings so the model can tell token order apart.',
  },
  {
    id: 'context-window',
    label: 'Context Window',
    blurb: 'The fixed span of tokens the model can attend to for the current request.',
  },
  {
    id: 'transformer-layers',
    label: 'Transformer Layers',
    blurb: 'Stacked blocks of attention and feed-forward math the input passes through.',
  },
  {
    id: 'attention-mechanism',
    label: 'Attention Mechanism',
    blurb: 'A weighting operation that lets each token draw information from other tokens.',
  },
  {
    id: 'model-weights',
    label: 'Model Weights',
    blurb: 'Billions of fixed numbers set during training; frozen at inference time.',
  },
  {
    id: 'hidden-representations',
    label: 'Hidden Representations',
    blurb: 'The evolving numerical vectors passed between layers as the input is transformed.',
  },
  {
    id: 'probability-distribution',
    label: 'Probability Distribution',
    blurb: 'A score over every possible next token, produced from the final hidden state.',
  },
  {
    id: 'next-token-prediction',
    label: 'Next Token Prediction',
    blurb: 'The training objective and inference step: pick the next token, one at a time.',
  },
  {
    id: 'output-tokens',
    label: 'Output Tokens',
    blurb: 'The sampled tokens streamed back out, decoded from IDs into text.',
  },
]
