import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpDown, ChevronRight, Download } from 'lucide-react'
import { comparisons } from '../../data/comparisons'
import { humanNodes, llmNodes } from '../../data/nodes'
import { SectionHeading } from '../ui/SectionHeading'
import { SimilarityBadgePill } from '../ui/SimilarityBadge'
import { InfoCard } from '../comparison/InfoCard'
import { useComparison } from '../../context/ComparisonContext'
import { cn } from '../../utils/cn'

type SortKey = 'default' | 'similarity-desc' | 'similarity-asc'

function label(id: string, source: { id: string; label: string }[]) {
  return source.find((n) => n.id === id)?.label ?? id
}

export function SimilarityMatrixSection() {
  const [sort, setSort] = useState<SortKey>('default')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [exporting, setExporting] = useState(false)
  const { hoverHuman, activeHumanIds } = useComparison()

  // jsPDF pulls in a heavy canvas dependency, so it's only fetched on demand
  // instead of sitting in the main bundle every visitor downloads.
  const handleExport = async () => {
    setExporting(true)
    try {
      const { exportMatrixToPdf } = await import('../../utils/exportPdf')
      exportMatrixToPdf()
    } finally {
      setExporting(false)
    }
  }

  const rows = useMemo(() => {
    const copy = [...comparisons]
    if (sort === 'similarity-desc') copy.sort((a, b) => b.similarity - a.similarity)
    if (sort === 'similarity-asc') copy.sort((a, b) => a.similarity - b.similarity)
    return copy
  }, [sort])

  const toggleSort = () => {
    setSort((s) => (s === 'similarity-desc' ? 'similarity-asc' : 'similarity-desc'))
  }

  return (
    <section id="matrix" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="All Fourteen, At Once"
          title="The similarity matrix"
          description="Every comparison in one table. Click a row to expand the full breakdown; click the header to sort by score."
        />
        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="mb-1 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-card-hover disabled:opacity-60"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          {exporting ? 'Preparing PDF\u2026' : 'Export as PDF'}
        </button>
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-raised text-xs uppercase tracking-wide text-ink-faint">
              <th className="px-5 py-3.5 font-medium">Human Function</th>
              <th className="px-5 py-3.5 font-medium">LLM Analogue</th>
              <th className="px-5 py-3.5 font-medium">
                <button type="button" onClick={toggleSort} className="inline-flex items-center gap-1.5 hover:text-ink">
                  Similarity
                  <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                </button>
              </th>
              <th className="px-5 py-3.5 font-medium">Confidence</th>
              <th className="px-5 py-3.5 font-medium" aria-hidden="true" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isOpen = expandedId === row.humanId
              const isHighlighted = activeHumanIds.includes(row.humanId)
              return (
                <FragmentRow key={row.humanId}>
                  <tr
                    onMouseEnter={() => hoverHuman(row.humanId)}
                    onMouseLeave={() => hoverHuman(null)}
                    onClick={() => setExpandedId(isOpen ? null : row.humanId)}
                    className={cn(
                      'cursor-pointer border-b border-border-soft transition-colors last:border-b-0',
                      isHighlighted ? 'bg-brain/5' : 'hover:bg-card-hover',
                    )}
                  >
                    <td className="px-5 py-3.5 font-medium text-ink">{label(row.humanId, humanNodes)}</td>
                    <td className="px-5 py-3.5 text-ink-dim">{label(row.llmId, llmNodes)}</td>
                    <td className="px-5 py-3.5">
                      <SimilarityBadgePill score={row.similarity} showLabel={false} />
                    </td>
                    <td className="px-5 py-3.5 text-ink-dim">{row.confidence}</td>
                    <td className="px-5 py-3.5 text-right">
                      <motion.span animate={{ rotate: isOpen ? 90 : 0 }} className="inline-block">
                        <ChevronRight className="h-4 w-4 text-ink-faint" aria-hidden="true" />
                      </motion.span>
                    </td>
                  </tr>
                  <AnimatePresence>
                    {isOpen && (
                      <tr key={`${row.humanId}-detail`}>
                        <td colSpan={5} className="border-b border-border-soft bg-bg-raised/60 p-0">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5">
                              <InfoCard comparison={row} />
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </FragmentRow>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// A tiny helper so we can return two <tr> siblings from a .map() without
// React complaining about a missing wrapping element (tables can't take
// a wrapping <div>, and React.Fragment doesn't accept a `key` inline here
// cleanly alongside conditional rendering, so this keeps the call sites tidy).
function FragmentRow({ children }: { children: ReactNode }) {
  return <>{children}</>
}
