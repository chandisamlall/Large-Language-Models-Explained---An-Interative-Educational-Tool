import { agentProblemSolving } from '../../data/memory'

/**
 * Three-row breakdown of how a multi-step task actually gets worked
 * through, shown only under the "Agent retrieval" tab -- the card-grid
 * above covers memory at rest, this covers it in use.
 */
export function ProblemSolvingBreakdown() {
  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-4 sm:p-5">
      <h3 className="font-mono-data text-xs uppercase tracking-[0.15em] text-ink-faint">
        Multi-step problem solving
      </h3>
      <div className="mt-4 space-y-5">
        {agentProblemSolving.map((step, i) => (
          <div key={step.id} className={i > 0 ? 'border-t border-border-soft pt-5' : ''}>
            <p className="text-sm font-medium text-ink">{step.title}</p>
            <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
              <div>
                <span className="font-mono-data text-[10px] uppercase tracking-[0.15em] text-brain">Human</span>
                <p className="mt-1 text-xs leading-relaxed text-ink-dim">{step.humanApproach}</p>
              </div>
              <div>
                <span className="font-mono-data text-[10px] uppercase tracking-[0.15em] text-llm">AI agent</span>
                <p className="mt-1 text-xs leading-relaxed text-ink-dim">{step.aiApproach}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
