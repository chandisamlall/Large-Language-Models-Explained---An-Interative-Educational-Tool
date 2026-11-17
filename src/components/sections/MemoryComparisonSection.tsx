import { SectionHeading } from '../ui/SectionHeading'
import { MemoryExplorer } from '../memory/MemoryExplorer'

export function MemoryComparisonSection() {
  return (
    <section id="memory" className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <SectionHeading
        eyebrow="Interactive Demo"
        title="Short-term vs. long-term memory"
        description="Short-term and long-term are useful teaching categories, but human memory is more varied. Compare them with a model's current context and optional system-level memory; tap a card for an example."
      />
      <div className="mt-10">
        <MemoryExplorer />
      </div>
    </section>
  )
}
