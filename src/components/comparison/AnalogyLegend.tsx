const RATINGS = [
  { label: 'Useful analogy', tone: 'bg-success' },
  { label: 'Limited analogy', tone: 'bg-warning' },
  { label: 'No direct analogue', tone: 'bg-ink-faint' },
] as const

export function AnalogyLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-dim" aria-label="Analogy rating guide">
      {RATINGS.map((rating) => (
        <span key={rating.label} className="inline-flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${rating.tone}`} aria-hidden="true" />
          {rating.label}
        </span>
      ))}
      <span className="basis-full text-xs text-ink-faint">
        Editorial judgments about functional overlap, not measured similarity or shared mechanisms.
      </span>
    </div>
  )
}
