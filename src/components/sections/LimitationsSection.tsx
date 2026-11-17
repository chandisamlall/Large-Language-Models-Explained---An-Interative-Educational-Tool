import { AlertTriangle } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'

const STATEMENTS = [
  'Brains are biological systems with many interacting processes; language models are computational systems whose behavior depends on training and deployment.',
  'The comparisons point to selected functional overlaps. They do not establish shared mechanisms or one-to-one mappings.',
  'The analogy labels are editorial judgments about usefulness, not measured similarity scores.',
  'A text-only model receives supplied tokens. Tools, retrieval, and cross-session memory may come from the surrounding application or agent.',
  'Fluent or emotional wording alone is not evidence of subjective experience; this exhibit does not claim to settle the broader question of machine experience.',
]

export function LimitationsSection() {
  return (
    <section id="limitations" className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
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
