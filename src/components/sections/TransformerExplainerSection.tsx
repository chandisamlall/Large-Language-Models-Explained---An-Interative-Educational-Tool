import { SectionHeading } from '../ui/SectionHeading'
import { TransformerExplorer } from '../explainer/TransformerExplorer'

export function TransformerExplainerSection() {
  return (
    <section id="predict" className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Interactive Demo"
        title="How does it guess the next word?"
        description="Type a sentence and watch, step by step, how a language model turns it into meaning, checks which earlier words matter most, and guesses what comes next."
      />
      <div className="mt-10">
        <TransformerExplorer />
      </div>
    </section>
  )
}
