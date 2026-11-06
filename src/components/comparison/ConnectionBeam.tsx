import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

interface ConnectionBeamProps {
  containerRef: RefObject<HTMLElement | null>
  fromEl: HTMLElement | null
  toEl: HTMLElement | null
  active: boolean
}

interface Path {
  d: string
  x1: number
  y1: number
  x2: number
  y2: number
}

/**
 * Draws a single glowing cubic-bezier path between two node elements that
 * live in different columns of the same relatively-positioned container.
 * Desktop-only (see the `hidden md:block` wrapper in ComparisonExplorer) --
 * on narrow layouts the columns stack, so a literal beam stops making sense.
 */
export function ConnectionBeam({ containerRef, fromEl, toEl, active }: ConnectionBeamProps) {
  const [path, setPath] = useState<Path | null>(null)

  useEffect(() => {
    function measure() {
      const container = containerRef.current
      if (!container || !fromEl || !toEl) {
        setPath(null)
        return
      }
      const containerRect = container.getBoundingClientRect()
      const a = fromEl.getBoundingClientRect()
      const b = toEl.getBoundingClientRect()

      const x1 = a.right - containerRect.left
      const y1 = a.top + a.height / 2 - containerRect.top
      const x2 = b.left - containerRect.left
      const y2 = b.top + b.height / 2 - containerRect.top

      const midX = (x1 + x2) / 2
      const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`
      setPath({ d, x1, y1, x2, y2 })
    }

    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    const observer = new ResizeObserver(measure)
    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromEl, toEl, containerRef])

  if (!path || !active) return null

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-brain)" />
          <stop offset="100%" stopColor="var(--color-llm)" />
        </linearGradient>
      </defs>
      {/* Soft glow underlay */}
      <path d={path.d} fill="none" stroke="url(#beam-gradient)" strokeWidth={8} strokeOpacity={0.18} strokeLinecap="round" />
      {/* Crisp animated core line */}
      <path
        d={path.d}
        fill="none"
        stroke="url(#beam-gradient)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="6 6"
        className="animate-dash"
      />
      <circle cx={path.x1} cy={path.y1} r={3.5} fill="var(--color-brain)" className="animate-pulse-slow" />
      <circle cx={path.x2} cy={path.y2} r={3.5} fill="var(--color-llm)" className="animate-pulse-slow" />
    </svg>
  )
}
