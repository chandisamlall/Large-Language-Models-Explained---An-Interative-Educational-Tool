import { Brain, Drama, Eye, MessagesSquare, Users } from 'lucide-react'
import { researchTopics } from '../../data/research'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'

const ICONS = [MessagesSquare, Brain, Eye, Drama, Users]

export function ResearchSection() {
  return (
    <section id="research" className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <SectionHeading
        eyebrow="The Human Side"
        title="Why we do this in the first place"
        description="People naturally interpret language and social cues using familiar mental models. These research frameworks help explain that tendency without treating every response as universal."
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
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                  {topic.sources.map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-llm underline decoration-llm/40 underline-offset-4 hover:decoration-llm"
                    >
                      {source.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
