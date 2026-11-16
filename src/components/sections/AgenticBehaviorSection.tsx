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
      'The core reasoning engine that interprets the goal, plans, and evaluates results. For example, Claude 3.5 Sonnet is a Claude model.',
    tooltip: 'The model supplies the agent’s learned knowledge and reasoning. It decides what to do with the goal and the information returned by tools.',
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
      'The system instructions and guardrails that define the agent’s boundaries. For example: “Never execute a database deletion without user approval.”',
    tooltip: 'The harness supplies the instructions and safeguards the model follows, including when to pause for human approval.',
  },
  {
    name: 'The Environment',
    icon: Laptop,
    description:
      'Where the agent runs and what context it can access. Claude Code on a developer’s machine may see different files and systems from Claude operating inside a corporate network.',
    tooltip: 'The environment determines where the agent runs and which files, websites, and systems are available to it.',
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
    <section id="agentic-behavior" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Agentic Behavior"
        title="Anthropic’s Claude: The Four Components of an Agent"
        description="According to Anthropic, an agent’s behavior depends on four pieces working together: its model, tools, harness, and environment."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
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
        <div className="mt-16 border-t border-border-soft pt-12 sm:mt-20 sm:pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono-data text-xs uppercase tracking-[0.2em] text-llm">Plan · Act · Observe · Adjust</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">The Agentic Reasoning Loop</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim sm:text-base">
                A Claude agent works through a self-directed loop. Hover over or focus a step to see what happens there.
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
