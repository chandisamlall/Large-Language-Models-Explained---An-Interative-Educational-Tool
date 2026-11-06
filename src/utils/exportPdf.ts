import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { comparisons } from '../data/comparisons'
import { humanNodes, llmNodes } from '../data/nodes'
import { similarityBadge } from '../data/types'

function label(id: string, source: { id: string; label: string }[]) {
  return source.find((n) => n.id === id)?.label ?? id
}

/** Builds and downloads a one-page PDF summary of the full similarity matrix. */
export function exportMatrixToPdf() {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text('The Human Brain vs. Large Language Models', 14, 18)
  doc.setFontSize(10)
  doc.setTextColor(120)
  doc.text('Similarity matrix \u2014 exported for reference. Analogies are educational simplifications.', 14, 25)

  autoTable(doc, {
    startY: 32,
    head: [['Human Function', 'LLM Analogue', 'Similarity', 'Tier', 'Confidence']],
    body: comparisons.map((c) => [
      label(c.humanId, humanNodes),
      label(c.llmId, llmNodes),
      `${c.similarity}%`,
      similarityBadge(c.similarity),
      c.confidence,
    ]),
    headStyles: { fillColor: [24, 24, 27] },
    styles: { fontSize: 9, cellPadding: 3 },
    alternateRowStyles: { fillColor: [244, 244, 245] },
  })

  doc.save('human-brain-vs-llm-similarity-matrix.pdf')
}
