import { motion } from 'framer-motion'
import { ChevronDown, Brain, Cpu } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Ambient background: soft twin glows echoing the brain/LLM accent split, plus a faint dot grid for the "exhibit hall" texture. */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]" aria-hidden="true" />
      <div
        className="animate-float pointer-events-none absolute left-[15%] top-1/3 h-72 w-72 rounded-full bg-brain/20 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="animate-float pointer-events-none absolute right-[15%] top-1/2 h-72 w-72 rounded-full bg-llm/20 blur-[100px]"
        style={{ animationDelay: '1.5s' }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8 flex items-center gap-3 rounded-full border border-border bg-card/60 px-4 py-1.5 backdrop-blur"
      >
        <Brain className="h-3.5 w-3.5 text-brain" aria-hidden="true" />
        <span className="font-mono-data text-xs text-ink-dim">An interactive exhibit</span>
        <Cpu className="h-3.5 w-3.5 text-llm" aria-hidden="true" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl text-balance text-4xl font-bold tracking-tight text-ink sm:text-6xl"
      >
        The <span className="text-brain">Human Brain</span> and{' '}
        <span className="text-llm">Large Language Models</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-6 max-w-xl text-balance text-lg text-ink-dim"
      >
        Understanding where the comparisons help - and where they mislead.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-10"
      >
        <a
          href="#explore"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Explore the Comparison
        </a>
      </motion.div>

      <motion.a
        href="#explore"
        aria-label="Scroll to the comparison"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 0.8, duration: 0.6 }, y: { delay: 1.2, duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-10 text-ink-faint hover:text-ink-dim"
      >
        <ChevronDown className="h-5 w-5" aria-hidden="true" />
      </motion.a>
    </section>
  )
}
