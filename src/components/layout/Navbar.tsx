import { useMemo, useState } from 'react'
import { Brain, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useComparison } from '../../context/ComparisonContext'
import { humanNodes, llmNodes } from '../../data/nodes'

const NAV_LINKS = [
  { href: '#explore', label: 'Explore' },
  { href: '#diagrams', label: 'How LLMs Work' },
  { href: '#agentic-behavior', label: 'Agents' },
  { href: '#memory', label: 'Memory' },
  { href: '#research', label: 'Human Side' },
  { href: '#quiz', label: 'Quiz' },
]

interface SearchHit {
  id: string
  label: string
  kind: 'human' | 'llm'
}

const ALL_NODES: SearchHit[] = [
  ...humanNodes.map((n) => ({ id: n.id, label: n.label, kind: 'human' as const })),
  ...llmNodes.map((n) => ({ id: n.id, label: n.label, kind: 'llm' as const })),
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { selectHuman, selectLlm } = useComparison()
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const hits = useMemo<SearchHit[]>(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return ALL_NODES.filter((n) => n.label.toLowerCase().includes(q)).slice(0, 6)
  }, [query])

  const goTo = (hit: SearchHit) => {
    if (hit.kind === 'llm') {
      selectLlm(hit.id)
    } else selectHuman(hit.id)
    setQuery('')
    setSearchOpen(false)
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Brain className="h-4 w-4 text-brain" aria-hidden="true" />
          Brain + LLMs
        </a>

        <nav className="hidden items-center gap-4 2xl:flex" aria-label="Section navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-ink-dim transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 120)}
              placeholder="Search a region or component…"
              aria-label="Search brain regions and LLM components"
              className="w-56 rounded-lg border border-border bg-card py-1.5 pl-8 pr-3 text-sm text-ink placeholder:text-ink-faint focus-visible:outline-none"
            />
            {searchOpen && hits.length > 0 && (
              <ul className="absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden rounded-lg border border-border bg-card shadow-xl">
                {hits.map((hit) => (
                  <li key={hit.id}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => goTo(hit)}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-ink hover:bg-card-hover"
                    >
                      {hit.label}
                      <span className={`font-mono-data text-[10px] uppercase ${hit.kind === 'human' ? 'text-brain' : 'text-llm'}`}>
                        {hit.kind}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-dim transition-colors hover:text-ink"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-dim 2xl:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border-soft px-6 py-4 2xl:hidden" aria-label="Section navigation (mobile)">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-ink-dim hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
