# The Human Brain &  Large Language Models

> **Research question:** How can people learn where analogies between
> brains and LLMs hold, and where they mislead?

An interactive, museum-exhibit-style web app that maps human cognitive
functions to their closest analogues in large language models, and is
just as deliberate about showing where each analogy breaks down. Built to
improve AI literacy and reduce anthropomorphism, not to make the
comparison look neater than it is.

[▶ Live demo]([your GitHub Pages URL]) · [Report]([report URL, optional])
· **Cohort:** [Fall 2026] · **Theme:** Research · **License:** [MIT]

**Topics:** #AIliteracy #Anthropomorphism #Pedagogy #Opendata

*Part of the [NYU Ethical Tech CoLab](https://ethical-tech-colab.github.io/website/portfolio/) portfolio.


Two smaller standalone demos extend the core exhibit:

- **Predict** — a simplified, three-step stand-in for how a model turns
  a sentence into a guess at the next word (meaning → attention →
  guess), loosely inspired by
  [the Transformer Explainer](https://poloclub.github.io/transformer-explainer/)
  but with a hand-built toy predictor instead of a real running model.
- **Memory** — short-term vs. long-term memory in humans, mapped to its
  closest LLM-system parallel, grounded in
  ["Rethinking Memory in AI"](https://arxiv.org/html/2504.15965v1)
  (arXiv:2504.15965). A third "Agent retrieval" view goes one level deeper:
  a feature-by-feature comparison of an agent's context window + RAG
  pipeline against human working and long-term memory (capacity, retrieval
  mechanism, update dynamics), plus a breakdown of how each side actually
  works through a multi-step task.

## Tech stack

- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, config-free — tokens live in `src/index.css`)
- **Framer Motion** for all animation/transitions
- **lucide-react** for iconography
- **jsPDF + jspdf-autotable** for the similarity-matrix PDF export (lazy-loaded)

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build locally
npm run lint       # oxlint
```

## How the exhibit is organized

```
src/
├── data/               # Single source of truth — no comparison content lives in a component
│   ├── types.ts         # Shared TypeScript types + the similarity→badge helper
│   ├── nodes.ts          # The 14 human nodes (+ brain-diagram coordinates) and 11 LLM nodes
│   ├── comparisons.ts    # The 14 human↔LLM comparisons: score, differences, myths, examples
│   ├── myths.ts           # "Myth vs. Reality" card content
│   ├── quiz.ts             # Detection-exercise statements + correct classification
│   ├── research.ts         # Why-we-anthropomorphize topic explanations
│   ├── process.ts           # Step lists for the animated process walkthrough
│   ├── transformerDemo.ts    # Toy next-word predictor for the Predict demo
│   ├── memory.ts               # Short-term/long-term/agent-retrieval human↔LLM memory pairs
│   └── hallucination.ts         # Hallucination↔confabulation pairs + proposed exhibit experiments
│
├── context/             # App-wide state, shared across every section
│   ├── ComparisonContext.tsx   # Which node(s) are hovered/pinned — drives every highlight
│   └── ThemeContext.tsx         # Dark/light mode
│
├── components/
│   ├── ui/                # Generic, content-agnostic primitives (Reveal, Tooltip, badges…)
│   ├── comparison/         # The main two-column explorer: NodeButton, ConnectionBeam, InfoCard
│   ├── diagrams/            # The SVG brain illustration and transformer pipeline diagram
│   ├── explainer/             # TransformerExplorer (the Predict demo)
│   ├── memory/                  # MemoryExplorer (the Memory demo, expandable cards)
│   ├── layout/                    # Navbar (nav links, search, theme toggle)
│   └── sections/                   # Page sections that compose the above into the full page
│
├── utils/                # cn(), similarity→color/badge helpers, PDF export
└── App.tsx                # Composition root — wraps everything in the two context providers
```

### Adding a new comparison

Everything downstream (columns, brain diagram, transformer diagram, matrix,
info card) reads from `src/data/`. To add a fifteenth comparison:

1. Add a `HumanNode` to `humanNodes` in `data/nodes.ts` (pick an `{x, y}` on
   the 240×200 brain-diagram viewBox — see the comment there for the
   orientation convention).
2. If it needs a new LLM-side concept, add an `LLMNode` to `llmNodes`.
3. Add a `Comparison` entry to `data/comparisons.ts` linking the two ids,
   with a score, differences, misconception, etc.

No component needs to change — the new node will appear in the columns,
the brain diagram, the region index, and the similarity matrix
automatically.

### How synchronization works

A single `ComparisonProvider` (in `App.tsx`) tracks which human/LLM node
ids are currently active, from hover, keyboard focus, or a pinned
click/tap. Every interactive view — the two columns, the brain SVG, the
transformer diagram, and the similarity matrix — reads from this same
context, so hovering a node anywhere highlights its analogue everywhere
else on the page without any direct coupling between those components.

## Notes

- Replace the placeholder GitHub/LinkedIn URLs in
  `src/components/sections/Footer.tsx` with your own.
- `lucide-react` no longer ships brand marks, so the footer's GitHub/LinkedIn
  glyphs are small hand-written SVGs in `src/components/ui/BrandIcons.tsx`.
- The PDF export is dynamically imported on click so its dependencies
  (jsPDF + a canvas library) don't add weight to the initial page load.
