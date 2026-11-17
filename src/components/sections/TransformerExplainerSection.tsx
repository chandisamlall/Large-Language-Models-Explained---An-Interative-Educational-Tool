import { SectionHeading } from '../ui/SectionHeading'
import { TransformerExplorer } from '../explainer/TransformerExplorer'

export function TransformerExplainerSection() {
  return (
    <section id="predict" className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <SectionHeading
        eyebrow="Interactive Demo"
        title="A toy next-token demo"
        description="Change the input and inspect a deliberately small illustration of tokenization, weighting, and candidate selection. The weights and candidates are teaching placeholders, not a live model trace."
      />
      <div className="mt-10">
        <TransformerExplorer />
      </div>
    </section>
  )
}
