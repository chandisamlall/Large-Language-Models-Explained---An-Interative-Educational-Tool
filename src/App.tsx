import { ThemeProvider } from './context/ThemeContext'
import { ComparisonProvider } from './context/ComparisonContext'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { ComparisonExplorer } from './components/comparison/ComparisonExplorer'
import { DiagramsSection } from './components/sections/DiagramsSection'
import { TransformerExplainerSection } from './components/sections/TransformerExplainerSection'
import { ProcessComparisonSection } from './components/sections/ProcessComparisonSection'
import { AgenticBehaviorSection } from './components/sections/AgenticBehaviorSection'
import { MemoryComparisonSection } from './components/sections/MemoryComparisonSection'
import { ResearchSection } from './components/sections/ResearchSection'
import { MythVsRealitySection } from './components/sections/MythVsRealitySection'
import { HallucinationSection } from './components/sections/HallucinationSection'
import { DetectionQuizSection } from './components/sections/DetectionQuizSection'
import { LimitationsSection } from './components/sections/LimitationsSection'
import { Footer } from './components/sections/Footer'

/**
 * Top-level composition. All shared interactive state (which node is
 * hovered/pinned, dark vs. light) lives in the two context providers so
 * every section below -- however far apart on the page -- can stay in
 * sync without prop-drilling.
 */
export default function App() {
  return (
    <ThemeProvider>
      <ComparisonProvider>
        <div id="top" className="min-h-screen bg-bg text-ink">
          <Navbar />
          <main>
            <Hero />
            <ComparisonExplorer />
            <DiagramsSection />
            <TransformerExplainerSection />
            <ProcessComparisonSection />
            <AgenticBehaviorSection />
            <MemoryComparisonSection />
            <ResearchSection />
            <MythVsRealitySection />
            <HallucinationSection />
            <DetectionQuizSection />
            <LimitationsSection />
          </main>
          <Footer />
        </div>
      </ComparisonProvider>
    </ThemeProvider>
  )
}
