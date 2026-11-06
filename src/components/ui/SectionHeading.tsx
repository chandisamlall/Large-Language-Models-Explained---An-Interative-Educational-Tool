import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: ReactNode
  align?: 'left' | 'center'
}

/** Eyebrow label doubles as the exhibit's "wall placard" numbering system —
 *  it names the section's role in the exhibit, not a decorative index. */
export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <Reveal className={align === 'center' ? 'text-center' : 'text-left'}>
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="h-px w-8 bg-brain/60" aria-hidden="true" />
        <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-brain">{eyebrow}</span>
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {description && (
        <p className={`mt-3 max-w-2xl text-ink-dim ${align === 'center' ? 'mx-auto' : ''}`}>{description}</p>
      )}
    </Reveal>
  )
}
