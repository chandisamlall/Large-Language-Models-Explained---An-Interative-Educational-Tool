import { useRef } from 'react'
import { Brain, Cpu } from 'lucide-react'
import { useComparison } from '../../context/ComparisonContext'
import { humanNodes, llmNodes } from '../../data/nodes'
import { comparisons } from '../../data/comparisons'
import { NodeButton } from './NodeButton'
import { ConnectionBeam } from './ConnectionBeam'
import { InfoCard } from './InfoCard'
import { SimilarityLegend } from './SimilarityLegend'
import { SectionHeading } from '../ui/SectionHeading'

/** Builds (and caches) one stable ref-callback per node id. A fresh inline
 *  closure on every render would give each ref a new identity each time,
 *  which makes React detach/reattach it every render -- harmless on its
 *  own, but worth avoiding since it's needless churn on every keystroke
 *  of app state. Caching keeps each id's callback identity constant for
 *  the life of the component. */
function useStableRefMap<T extends HTMLElement>() {
  const elements = useRef(new Map<string, T>())
  const callbacks = useRef(new Map<string, (el: T | null) => void>())

  const getRef = (id: string) => {
    let cb = callbacks.current.get(id)
    if (!cb) {
      cb = (el) => {
        if (el) elements.current.set(id, el)
        else elements.current.delete(id)
      }
      callbacks.current.set(id, cb)
    }
    return cb
  }

  return { elements, getRef }
}

export function ComparisonExplorer() {
  const { activeHumanIds, activeLlmIds, activeComparison, hoverHuman, hoverLlm, selectHuman, clearSelection } =
    useComparison()

  const containerRef = useRef<HTMLDivElement>(null)
  const { elements: humanRefs, getRef: setHumanRef } = useStableRefMap<HTMLButtonElement>()
  const { elements: llmRefs, getRef: setLlmRef } = useStableRefMap<HTMLButtonElement>()

  const beamPairs = activeHumanIds
    .map((humanId) => {
      const llmId = comparisons.find((c) => c.humanId === humanId)?.llmId
      return llmId ? { humanId, llmId } : null
    })
    .filter((p): p is { humanId: string; llmId: string } => p !== null)

  const hasActive = activeHumanIds.length > 0

  return (
    <section id="explore" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Interactive Exhibit"
        title="Explore the comparison"
        description="Hover, focus, or tap any node to see its closest analogue light up on the other side, with an honest breakdown of where the comparison holds up and where it doesn't."
      />

      <div className="mt-6">
        <SimilarityLegend />
      </div>

      <div ref={containerRef} className="relative mt-10">
        {/* Beams render above the columns, below the info card */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {beamPairs.map((pair) => (
            <ConnectionBeam
              key={pair.humanId + pair.llmId}
              containerRef={containerRef}
              fromEl={humanRefs.current.get(pair.humanId) ?? null}
              toEl={llmRefs.current.get(pair.llmId) ?? null}
              active
            />
          ))}
        </div>

        <div
          className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2"
          onMouseLeave={() => {
            hoverHuman(null)
            hoverLlm(null)
          }}
        >
          <div>
            <div className="mb-3 flex items-center gap-2 text-brain">
              <Brain className="h-4 w-4" aria-hidden="true" />
              <h3 className="font-mono-data text-xs uppercase tracking-[0.15em]">Human Brain</h3>
            </div>
            <div className="space-y-2.5">
              {humanNodes.map((node) => (
                <NodeButton
                  key={node.id}
                  ref={setHumanRef(node.id)}
                  label={node.label}
                  blurb={node.blurb}
                  side="human"
                  isActive={activeHumanIds.includes(node.id)}
                  isDimmed={hasActive}
                  onHover={() => hoverHuman(node.id)}
                  onLeave={() => hoverHuman(null)}
                  onSelect={() => selectHuman(node.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-llm">
              <Cpu className="h-4 w-4" aria-hidden="true" />
              <h3 className="font-mono-data text-xs uppercase tracking-[0.15em]">Large Language Model</h3>
            </div>
            <div className="space-y-2.5">
              {llmNodes.map((node) => (
                <NodeButton
                  key={node.id}
                  ref={setLlmRef(node.id)}
                  label={node.label}
                  blurb={node.blurb}
                  side="llm"
                  isActive={activeLlmIds.includes(node.id)}
                  isDimmed={hasActive}
                  onHover={() => hoverLlm(node.id)}
                  onLeave={() => hoverLlm(null)}
                  onSelect={() => {
                    const match = comparisons.find((c) => c.llmId === node.id)
                    if (match) selectHuman(match.humanId)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <InfoCard comparison={activeComparison} />
      </div>

      {activeComparison && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={clearSelection}
            className="text-xs font-medium text-ink-faint underline-offset-4 hover:text-ink-dim hover:underline"
          >
            Clear selection
          </button>
        </div>
      )}
    </section>
  )
}
