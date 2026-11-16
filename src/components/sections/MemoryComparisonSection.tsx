import { SectionHeading } from '../ui/SectionHeading'
import { MemoryExplorer } from '../memory/MemoryExplorer'

export function MemoryComparisonSection() {
  return (
    <section id="memory" className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Interactive Demo"
        title="Short-term vs. long-term memory"
        description="Human memory splits into short-term and long-term. Toggle between them to see the closest parallel in an LLM-based system, tap a card for a real example, or switch to Agent retrieval for how an agent's context window and RAG pipeline line up against working and long-term memory feature-by-feature."
      />
      <div className="mt-10">
        <MemoryExplorer />
      </div>
    </section>
  )
}
