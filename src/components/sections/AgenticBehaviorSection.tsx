import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'

const COMPARISON_ROWS = [
  {
    dimension: 'Interaction Model',
    standard: 'Single prompt → single response',
    agentic: 'High-level goal → continuous execution loop',
  },
  {
    dimension: 'Workflow',
    standard: 'Human drives every step',
    agentic: 'AI plans, executes, and verifies steps independently',
  },
  {
    dimension: 'Error Handling',
    standard: 'Halts or hallucinates when stuck',
    agentic: 'Self-corrects, retries, and adapts strategy',
  },
  {
    dimension: 'Capabilities',
    standard: 'Text/media generation',
    agentic: 'API calls, code execution, web navigation, system control',
  },
]

export function AgenticBehaviorSection() {
  return (
    <section id="agentic-behavior" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Beyond Reactive Generation"
        title="Standard AI vs. Agentic AI"
        description="Standard AI responds to each prompt in turn. Agentic AI works toward a goal through a loop of planning, action, and verification."
      />

      <Reveal delay={0.12}>
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-bg-raised">
                  <th scope="col" className="w-[22%] px-5 py-4 font-mono-data text-xs uppercase tracking-[0.12em] text-ink-faint sm:px-6">
                    Dimension
                  </th>
                  <th scope="col" className="w-[36%] px-5 py-4 font-semibold text-ink-dim sm:px-6">
                    Standard AI <span className="font-normal text-ink-faint">(Reactive)</span>
                  </th>
                  <th scope="col" className="w-[42%] px-5 py-4 font-semibold text-llm sm:px-6">
                    Agentic AI <span className="font-normal text-llm/70">(Proactive)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.dimension} className="border-b border-border-soft last:border-0">
                    <th scope="row" className="px-5 py-5 align-top font-medium text-ink sm:px-6">
                      {row.dimension}
                    </th>
                    <td className="px-5 py-5 align-top leading-relaxed text-ink-dim sm:px-6">
                      {row.standard}
                    </td>
                    <td className="px-5 py-5 align-top leading-relaxed text-ink sm:px-6">
                      {row.agentic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
