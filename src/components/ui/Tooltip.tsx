import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface TooltipProps {
  content: string
  children: ReactNode
  side?: 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  className?: string
}

/** Wraps a trigger element with a small floating tooltip that responds to
 *  both mouse hover and keyboard focus, so it doesn't rely on hover alone. */
export function Tooltip({ content, children, side = 'top', align = 'center', className }: TooltipProps) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const alignClass = align === 'start' ? 'left-0' : align === 'end' ? 'right-0' : 'left-1/2 -translate-x-1/2'

  return (
    <span
      className={cn('relative flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            id={id}
            role="tooltip"
            initial={{ opacity: 0, y: side === 'top' ? 4 : -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: side === 'top' ? 4 : -4, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className={cn(
              'pointer-events-none absolute z-50 w-56 max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-bg-raised px-3 py-2 text-xs leading-relaxed text-ink-dim shadow-xl',
              side === 'top' ? `bottom-full mb-2 ${alignClass}` : `top-full mt-2 ${alignClass}`,
            )}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
