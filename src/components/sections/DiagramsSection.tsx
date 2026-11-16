import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { BrainDiagram } from '../diagrams/BrainDiagram'
import { BrainRegionIndex } from '../diagrams/BrainRegionIndex'
import { TransformerDiagram } from '../diagrams/TransformerDiagram'
import { ArchitectureFlowDiagram } from '../diagrams/ArchitectureFlowDiagram'

export function DiagramsSection() {
  return (
    <section id="diagrams" className="border-y border-border-soft bg-bg-raised/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Under the Hood"
          title="Two architectures, side by side"
          description="These diagrams share the same highlight state as everything else in the exhibit — hover a brain region or a pipeline stage and watch its counterpart light up."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-ink">Human Brain</h3>
              <p className="mt-1 text-sm text-ink-dim">A simplified, non-clinical diagram of the fourteen regions above.</p>
              <div className="mt-6 flex justify-center">
                <BrainDiagram />
              </div>
              <div className="mt-6">
                <BrainRegionIndex />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-ink">Transformer Pipeline</h3>
              <p className="mt-1 text-sm text-ink-dim">The path a prompt takes through a decoder-only transformer, stage by stage.</p>
              <div className="mt-6">
                <TransformerDiagram />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-8">
          <ArchitectureFlowDiagram />
        </Reveal>
      </div>
    </section>
  )
}
