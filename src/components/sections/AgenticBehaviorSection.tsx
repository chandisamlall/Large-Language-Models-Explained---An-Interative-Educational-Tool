import { Brain, Laptop, RotateCw, ShieldCheck, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Tooltip } from '../ui/Tooltip'

const COMPONENTS: {
  name: string
  icon: LucideIcon
  description: string
  tooltip: string
}[] = [
  {
    name: 'The Model',
    icon: Brain,
    description:
      'The language model that interprets the goal and proposes or evaluates next steps. The specific model depends on the product.',
    tooltip: 'The model supplies learned capabilities; the surrounding system provides the tools, state, and runtime that make an agent.',
  },
  {
    name: 'The Tools',
    icon: Wrench,
    description:
      'External services the model can use to affect the world, such as APIs, file systems, and internal databases. Anthropic emphasizes a clear Agent-Computer Interface (ACI): tools should be obvious to use and well documented, like instructions for a junior developer.',
    tooltip: 'Tools connect the model to services and data. Their names, inputs, outputs, and documentation shape how reliably an agent can use them.',
  },
  {
    name: 'The Harness',
    icon: ShieldCheck,
    description:
      'The runtime that coordinates model calls, tools, state, and safeguards. For example, it can require approval before a database deletion.',
    tooltip: 'Instructions are one part of a harness. Tool permissions, validation, and approval checks can also be enforced by the surrounding code.',
  },
  {
    name: 'The Environment',
    icon: Laptop,
    description:
      'Where the agent runs and what context it can access. Claude Code on a developer’s machine may see different files and systems from Claude operating inside a corporate network.',
    tooltip: 'The environment determines where the agent runs and which files, websites, and systems are available to it.',
  },
]

const COMPARISON_ROWS = [
  {
    dimension: 'Interaction model',
    standard: 'A prompt leads to a response.',
    agentic: 'A goal can lead to a repeated plan, action, and feedback cycle.',
  },
  {
    dimension: 'Workflow',
    standard: 'A person directs each step.',
    agentic: 'The system can plan and carry out steps within its configured scope.',
  },
  {
    dimension: 'Error handling',
    standard: 'A person may need to correct or redirect it.',
    agentic: 'It can inspect results and retry or adapt; success depends on the model and safeguards.',
  },
  {
    dimension: 'Capabilities',
    standard: 'Generates text or other model outputs.',
    agentic: 'May call tools such as APIs or file systems when the application grants access.',
  },
]

const LOOP_STEPS = [
  {
    name: 'Understand',
    detail: 'Receives a high-level goal from the user and works out what success should look like.',
    position: 'left-1/2 top-[12%]',
    side: 'bottom' as const,
    align: 'center' as const,
  },
  {
    name: 'Plan',
    detail: 'Breaks the goal into a sequence of actionable steps, adjusting the plan as new information arrives.',
    position: 'left-[84%] top-[31%]',
    side: 'bottom' as const,
    align: 'end' as const,
  },
  {
    name: 'Act',
    detail: 'Chooses and uses a tool, such as reading a file, searching the web, or running a terminal command.',
    position: 'left-[84%] top-[69%]',
    side: 'top' as const,
    align: 'end' as const,
  },
  {
    name: 'Observe',
    detail: 'Checks the tool result or other feedback from the environment to see what happened.',
    position: 'left-1/2 top-[88%]',
    side: 'top' as const,
    align: 'center' as const,
  },
  {
    name: 'Correct',
    detail: 'If the result is an error or unexpected, decides whether to retry, use another tool, skip the step, or ask the user for input.',
    position: 'left-[16%] top-[69%]',
    side: 'top' as const,
    align: 'start' as const,
  },
  {
    name: 'Complete',
    detail: 'Reports back when the overarching task is done, or checks in with the human if it reaches a decision it cannot safely make alone.',
    position: 'left-[16%] top-[31%]',
    side: 'bottom' as const,
    align: 'start' as const,
  },
]

export function AgenticBehaviorSection() {
  return (
    <section id="agentic-behavior" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-12 sm:py-16">
      <SectionHeading
        eyebrow="Agentic Behavior"
        title="Standard AI vs. Agentic AI"
        description="A standard model responds to a prompt. An agentic system can use a model in a goal-directed loop with tools and feedback."
      />

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead className="bg-bg-raised text-ink">
            <tr>
              <th scope="col" className="px-5 py-4 font-semibold">Dimension</th>
              <th scope="col" className="px-5 py-4 font-semibold text-brain">Standard AI (Reactive)</th>
              <th scope="col" className="px-5 py-4 font-semibold text-llm">Agentic AI (Proactive)</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.dimension} className="border-t border-border-soft align-top">
                <th scope="row" className="whitespace-nowrap px-5 py-4 font-medium text-ink">{row.dimension}</th>
                <td className="px-5 py-4 leading-relaxed text-ink-dim">{row.standard}</td>
                <td className="px-5 py-4 leading-relaxed text-ink-dim">{row.agentic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12">
        <p className="font-mono-data text-xs uppercase tracking-[0.18em] text-llm">Anthropic’s Claude</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">The Four Components of an Agent</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-dim">
          An agent’s behavior depends on the model, tools, harness, and environment working together.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {COMPONENTS.map((component, index) => {
          const Icon = component.icon
          return (
            <Reveal key={component.name} delay={index * 0.06}>
              <article className="h-full rounded-2xl border border-border bg-card p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-llm/25 bg-llm/10 text-llm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <Tooltip content={component.tooltip} side="top">
                    <span tabIndex={0} className="cursor-help text-base font-semibold text-ink focus-visible:text-llm">
                      {component.name}
                    </span>
                  </Tooltip>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-dim">{component.description}</p>
                {component.name === 'The Tools' && (
                  <a
                    href="https://www.anthropic.com/engineering/building-effective-agents"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex text-xs font-medium text-llm underline decoration-llm/40 underline-offset-4 hover:decoration-llm"
                  >
                    Anthropic’s guidance on agent-computer interfaces
                  </a>
                )}
              </article>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.12}>
        <div className="mt-12 border-t border-border-soft pt-10 sm:mt-16 sm:pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono-data text-xs uppercase tracking-[0.2em] text-llm">Plan · Act · Observe · Adjust</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">The Agentic Reasoning Loop</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim sm:text-base">
                This simplified loop shows how an agent can work through a task. Products differ; hover over or focus a step to see an example.
              </p>
            </div>
            <a
              href="https://www.anthropic.com/research/trustworthy-agents"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-llm underline decoration-llm/40 underline-offset-4 hover:decoration-llm"
            >
              Source: Anthropic, “Trustworthy agents in practice”
            </a>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="relative aspect-square w-full max-w-[34rem]">
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 500 500"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <marker id="agentic-loop-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M0 0L9 4.5L0 9Z" fill="var(--color-llm)" />
                  </marker>
                </defs>
                <g stroke="var(--color-llm)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" markerEnd="url(#agentic-loop-arrow)">
                  <path d="M312 82C329 91 344 105 356 122" />
                  <path d="M420 194V306" />
                  <path d="M362 375C343 391 326 403 307 416" />
                  <path d="M193 416C174 403 157 391 138 375" />
                  <path d="M80 306V194" />
                  <path d="M144 122C160 104 178 91 196 82" />
                </g>
              </svg>

              {LOOP_STEPS.map((step, index) => (
                <div
                  key={step.name}
                  className={`absolute ${step.position} h-[14.4%] w-[22.4%] -translate-x-1/2 -translate-y-1/2`}
                >
                  <Tooltip content={step.detail} side={step.side} align={step.align} className="h-full w-full">
                    <button
                      type="button"
                      aria-label={`Step ${index + 1}: ${step.name}. ${step.detail}`}
                      className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-card px-0.5 text-ink shadow-lg shadow-bg/30 transition-colors hover:border-llm/60 hover:bg-card-hover focus-visible:border-llm focus-visible:text-llm"
                    >
                      <span className="font-mono-data text-[9px] leading-none text-llm/80 sm:text-[10px]">0{index + 1}</span>
                      <span className="whitespace-nowrap text-[9px] font-semibold leading-none sm:text-xs">{step.name}</span>
                    </button>
                  </Tooltip>
                </div>
              ))}

              <div className="absolute left-1/2 top-1/2 flex h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-llm/35 bg-bg-raised text-center shadow-[0_0_48px_-22px_var(--color-llm)]">
                <RotateCw className="mb-1.5 h-4 w-4 text-llm sm:h-5 sm:w-5" aria-hidden="true" />
                <span className="text-[9px] font-semibold text-ink sm:text-xs">Claude agent</span>
                <span className="font-mono-data text-[8px] uppercase tracking-[0.08em] text-ink-faint sm:text-[9px]">reasoning loop</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
