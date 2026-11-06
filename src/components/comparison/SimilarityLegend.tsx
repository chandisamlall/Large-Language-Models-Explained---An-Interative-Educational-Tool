const LEGEND_ITEMS = [
  { color: 'var(--color-success)', range: '70-100', label: 'Strong Analogy' },
  { color: 'var(--color-warning)', range: '40-69', label: 'Partial Analogy' },
  { color: 'var(--color-danger)', range: '0-39', label: 'Weak Analogy' },
] as const

export function SimilarityLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2" role="list" aria-label="Similarity score legend">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.label} role="listitem" className="flex items-center gap-2 text-sm text-ink-dim">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
            aria-hidden="true"
          />
          <span className="font-mono-data text-xs text-ink-faint">{item.range}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
