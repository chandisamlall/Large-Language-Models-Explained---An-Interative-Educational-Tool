import { AlertTriangle } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'

const STATEMENTS = [
  'Human brains are biological \u2014 living tissue, shaped by evolution, chemistry, and embodied experience.',
  'Large language models are statistical models \u2014 fixed weights trained to predict the next token in a sequence.',
  'Every analogy on this page is educational, offered to build intuition, not a claim of mechanistic equivalence.',
  'No comparison here implies a one-to-one mapping. A concept sharing a name with a brain region does not mean it works the same way.',
  'Where a similarity score is low, that\u2019s the point being made \u2014 not a gap to be explained away.',
]

export function LimitationsSection() {
  return (
    <section id="limitations" className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Read This Part"
        title="What this exhibit is not saying"
        align="center"
      />

      <Reveal delay={0.1} className="mt-10">
        <div className="rounded-2xl border border-warning/25 bg-warning/5 p-6 sm:p-8">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-5 w-5 text-warning" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-ink">Limitations, stated plainly</h3>
          </div>
          <ul className="mt-5 space-y-3">
            {STATEMENTS.map((s) => (
              <li key={s} className="flex gap-3 text-sm leading-relaxed text-ink-dim">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-warning" aria-hidden="true" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
