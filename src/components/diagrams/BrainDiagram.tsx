import { motion } from 'framer-motion'
import { useComparison } from '../../context/ComparisonContext'
import { humanNodes } from '../../data/nodes'

const VIEW_W = 240
const VIEW_H = 200

/** A stylized, non-anatomical brain silhouette (left = front/frontal lobe,
 *  right = back/occipital lobe) with a small cerebellum + brainstem stub
 *  at the lower right. Simplified on purpose -- this is an orientation
 *  aid, not a medical illustration. */
const BRAIN_OUTLINE =
  'M50 33 C24 33 14 66 24 92 C13 108 24 138 54 150 C70 166 96 172 116 166 C142 174 168 170 188 150 C213 140 228 113 219 88 C230 66 215 38 188 28 C172 12 146 8 122 14 C102 6 74 10 58 20 C50 24 48 28 50 33 Z'

const CEREBELLUM = 'M188 148 C205 144 222 152 222 168 C222 182 206 188 190 182 C178 176 176 158 188 148 Z'
const BRAINSTEM = 'M196 178 C198 178 201 178 203 178 L201 200 L198 200 Z'
const SULCUS = 'M95 22 C88 55 92 95 78 130 C72 145 65 155 58 148'

export function BrainDiagram() {
  const { activeHumanIds, hoverHuman, selectHuman } = useComparison()
  const hasActive = activeHumanIds.length > 0

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="h-auto w-full max-w-xl"
      role="img"
      aria-label="Simplified diagram of the brain with fourteen labeled, interactive regions"
    >
      <defs>
        <radialGradient id="brain-fill" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="var(--color-brain)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--color-brain)" stopOpacity="0.04" />
        </radialGradient>
      </defs>

      <path d={CEREBELLUM} fill="var(--color-card)" stroke="var(--color-border)" strokeWidth={1.5} />
      <path d={BRAINSTEM} fill="var(--color-card)" stroke="var(--color-border)" strokeWidth={1.5} />
      <path d={BRAIN_OUTLINE} fill="url(#brain-fill)" stroke="var(--color-border)" strokeWidth={1.5} />
      <path d={SULCUS} fill="none" stroke="var(--color-border)" strokeWidth={1} strokeDasharray="3 4" opacity={0.7} />

      {humanNodes.map((node) => {
        const isActive = activeHumanIds.includes(node.id)
        return (
          <g key={node.id}>
            <motion.circle
              cx={node.position.x}
              cy={node.position.y}
              r={isActive ? 6.5 : 4.5}
              fill={isActive ? 'var(--color-brain)' : 'var(--color-ink-faint)'}
              stroke="var(--color-bg)"
              strokeWidth={1.5}
              className="cursor-pointer"
              animate={{ opacity: !hasActive || isActive ? 1 : 0.35 }}
              style={isActive ? { filter: 'drop-shadow(0 0 6px var(--color-brain))' } : undefined}
              tabIndex={0}
              role="button"
              aria-label={`${node.label}: ${node.blurb}`}
              onMouseEnter={() => hoverHuman(node.id)}
              onMouseLeave={() => hoverHuman(null)}
              onFocus={() => hoverHuman(node.id)}
              onBlur={() => hoverHuman(null)}
              onClick={() => selectHuman(node.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  selectHuman(node.id)
                }
              }}
            />
            {isActive && (
              <text
                x={node.position.x}
                y={node.position.y - 11}
                textAnchor="middle"
                className="font-mono-data pointer-events-none select-none"
                fontSize={8.5}
                fill="var(--color-ink)"
              >
                {node.label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
