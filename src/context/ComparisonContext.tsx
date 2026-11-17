import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { comparisons } from '../data/comparisons'
import type { Comparison } from '../data/types'

interface ComparisonContextValue {
  /** The comparison currently shown in the info card, or null if none active. */
  activeComparison: Comparison | null
  /** Every human node id that should be visually highlighted right now.
   *  Usually one, but hovering an LLM node that several human regions map
   *  to (e.g. "Model Weights") highlights all of them at once. */
  activeHumanIds: string[]
  /** Every LLM node id that should be visually highlighted right now. */
  activeLlmIds: string[]
  /** True once a selection has been "pinned" by click/tap, as opposed to a
   *  transient hover -- pinned selections survive mouseleave, which matters
   *  for touch devices with no hover state. */
  isPinned: boolean
  hoverHuman: (id: string | null) => void
  hoverLlm: (id: string | null) => void
  /** Click/tap/Enter a human node: pins the selection so it survives hover-out. */
  selectHuman: (id: string) => void
  /** Click/tap/Enter an LLM node, including components with no human match. */
  selectLlm: (id: string) => void
  clearSelection: () => void
}

const ComparisonContext = createContext<ComparisonContextValue | null>(null)

function llmIdsFor(humanId: string): string[] {
  const c = comparisons.find((cmp) => cmp.humanId === humanId)
  return c?.llmId ? [c.llmId] : []
}

function humanIdsFor(llmId: string): string[] {
  return comparisons.filter((cmp) => cmp.llmId === llmId).map((cmp) => cmp.humanId)
}

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [pinnedHumanId, setPinnedHumanId] = useState<string | null>(null)
  const [pinnedLlmId, setPinnedLlmId] = useState<string | null>(null)
  const [hoveredHumanId, setHoveredHumanId] = useState<string | null>(null)
  const [hoveredLlmId, setHoveredLlmId] = useState<string | null>(null)

  const { activeHumanIds, activeLlmIds, activeComparison } = useMemo(() => {
    if (hoveredHumanId) {
      const comparison = comparisons.find((c) => c.humanId === hoveredHumanId) ?? null
      return {
        activeHumanIds: [hoveredHumanId],
        activeLlmIds: llmIdsFor(hoveredHumanId),
        activeComparison: comparison,
      }
    }
    if (hoveredLlmId) {
      const humanIds = humanIdsFor(hoveredLlmId)
      const comparison = comparisons.find((c) => c.llmId === hoveredLlmId && c.humanId === humanIds[0]) ?? null
      return { activeHumanIds: humanIds, activeLlmIds: [hoveredLlmId], activeComparison: comparison }
    }
    if (pinnedHumanId) {
      const comparison = comparisons.find((c) => c.humanId === pinnedHumanId) ?? null
      return {
        activeHumanIds: [pinnedHumanId],
        activeLlmIds: llmIdsFor(pinnedHumanId),
        activeComparison: comparison,
      }
    }
    if (pinnedLlmId) {
      const humanIds = humanIdsFor(pinnedLlmId)
      const comparison = comparisons.find((c) => c.llmId === pinnedLlmId) ?? null
      return { activeHumanIds: humanIds, activeLlmIds: [pinnedLlmId], activeComparison: comparison }
    }
    return { activeHumanIds: [] as string[], activeLlmIds: [] as string[], activeComparison: null }
  }, [hoveredHumanId, hoveredLlmId, pinnedHumanId, pinnedLlmId])

  const hoverHuman = useCallback((id: string | null) => {
    setHoveredHumanId(id)
    if (id) setHoveredLlmId(null)
  }, [])

  const hoverLlm = useCallback((id: string | null) => {
    setHoveredLlmId(id)
    if (id) setHoveredHumanId(null)
  }, [])

  const selectHuman = useCallback((id: string) => {
    setPinnedLlmId(null)
    setPinnedHumanId((current) => (current === id ? null : id))
  }, [])

  const selectLlm = useCallback((id: string) => {
    setPinnedHumanId(null)
    setPinnedLlmId((current) => (current === id ? null : id))
  }, [])

  const clearSelection = useCallback(() => {
    setPinnedHumanId(null)
    setPinnedLlmId(null)
    setHoveredHumanId(null)
    setHoveredLlmId(null)
  }, [])

  const value: ComparisonContextValue = {
    activeComparison,
    activeHumanIds,
    activeLlmIds,
    isPinned: (pinnedHumanId !== null || pinnedLlmId !== null) && hoveredHumanId === null && hoveredLlmId === null,
    hoverHuman,
    hoverLlm,
    selectHuman,
    selectLlm,
    clearSelection,
  }

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>
}

export function useComparison() {
  const ctx = useContext(ComparisonContext)
  if (!ctx) throw new Error('useComparison must be used within a ComparisonProvider')
  return ctx
}
