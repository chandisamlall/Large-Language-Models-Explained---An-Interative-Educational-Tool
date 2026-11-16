import { Brain, Drama, Eye, MessagesSquare, Users } from 'lucide-react'
import { researchTopics } from '../../data/research'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'

const ICONS = [MessagesSquare, Brain, Eye, Drama, Users]

export function ResearchSection() {
  return (
    <section id="research" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="The Human Side"
        title="Why we do this in the first place"
        description="Reading minds into AI isn't a personal failing — it's a set of well-studied cognitive tendencies doing exactly what they evolved to do."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {researchTopics.map((topic, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <Reveal key={topic.id} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brain/10">
                  <Icon className="h-5 w-5 text-brain" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{topic.explanation}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
