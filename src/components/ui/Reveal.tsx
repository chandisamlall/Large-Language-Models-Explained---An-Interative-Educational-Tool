import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  /** 'up' fades and slides up (default); 'fade' only fades, no movement. */
  variant?: 'up' | 'fade'
}

/**
 * Fades + slides content in once as it enters the viewport. Used instead
 * of scattering ad-hoc `whileInView` props across every section so the
 * timing/easing stays consistent exhibit-wide.
 */
export function Reveal({ children, delay = 0, y = 18, className, variant = 'up' }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: variant === 'up' ? y : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
