import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

// Replace these with your real profile URLs before deploying.
const GITHUB_URL = 'https://github.com/'
const LINKEDIN_URL = 'https://www.linkedin.com/'

export function Footer() {
  return (
    <footer className="border-t border-border-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="max-w-md text-sm text-ink-dim">
          Built as an educational visualization to improve AI literacy and reduce anthropomorphism.
        </p>
        <div className="flex items-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-dim transition-colors hover:border-ink-faint hover:text-ink"
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-dim transition-colors hover:border-ink-faint hover:text-ink"
          >
            <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
