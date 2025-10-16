"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Download, AlertCircle } from "lucide-react"

type Section = {
  id: string
  title: string
  wordLimit: number
  guidelines: string[]
  placeholder: string
}

const LANCET_SECTIONS: Section[] = [
  {
    id: "title",
    title: "Title",
    wordLimit: 25,
    guidelines: ["Concise and informative", "Avoid abbreviations", "Maximum 25 words"],
    placeholder: "Enter your paper title...",
  },
  {
    id: "summary",
    title: "Summary",
    wordLimit: 300,
    guidelines: [
      "Structured format required",
      "Background: 2-3 sentences",
      "Methods: Study design and participants",
      "Findings: Key results with statistics",
      "Interpretation: Main conclusions",
      "Maximum 300 words total",
    ],
    placeholder: "Background:\n\nMethods:\n\nFindings:\n\nInterpretation:",
  },
  {
    id: "introduction",
    title: "Introduction",
    wordLimit: 500,
    guidelines: [
      "Brief background and context",
      "State the research question",
      "Explain study rationale",
      "Typically 400-500 words",
    ],
    placeholder: "Enter your introduction...",
  },
  {
    id: "methods",
    title: "Methods",
    wordLimit: 1500,
    guidelines: [
      "Study design and setting",
      "Participants and eligibility criteria",
      "Procedures and interventions",
      "Outcomes and measurements",
      "Statistical analysis",
      "Ethics approval statement",
    ],
    placeholder: "Enter your methods section...",
  },
  {
    id: "results",
    title: "Results",
    wordLimit: 1500,
    guidelines: [
      "Present findings logically",
      "Include key statistics",
      "Reference tables and figures",
      "Do not interpret results here",
    ],
    placeholder: "Enter your results...",
  },
  {
    id: "discussion",
    title: "Discussion",
    wordLimit: 1200,
    guidelines: [
      "Interpret main findings",
      "Compare with existing literature",
      "Discuss limitations",
      "State implications",
      "Provide conclusions",
    ],
    placeholder: "Enter your discussion...",
  },
  {
    id: "references",
    title: "References",
    wordLimit: 0,
    guidelines: [
      "Vancouver style required",
      "Number consecutively in order of appearance",
      "Maximum 40 references for Articles",
      "Format: Author(s). Title. Journal Year; Volume: Pages.",
    ],
    placeholder: "1. Smith J, Jones A. Title of article. Lancet 2024; 403: 123-45.\n2. ",
  },
]

export default function LancetPaperTool() {
  const [activeSection, setActiveSection] = useState("title")
  const [content, setContent] = useState<Record<string, string>>({})

  const currentSection = LANCET_SECTIONS.find((s) => s.id === activeSection)!
  const wordCount = content[activeSection]?.trim().split(/\s+/).filter(Boolean).length || 0
  const isOverLimit = currentSection.wordLimit > 0 && wordCount > currentSection.wordLimit

  const handleExport = () => {
    let exportText = "THE LANCET - FORMATTED PAPER\n\n"
    LANCET_SECTIONS.forEach((section) => {
      exportText += `${section.title.toUpperCase()}\n`
      exportText += content[section.id] || "[Not completed]"
      exportText += "\n\n---\n\n"
    })

    const blob = new Blob([exportText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "lancet-paper.txt"
    a.click()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6" />
            <div>
              <h1 className="text-xl font-semibold">The Lancet Paper Formatter</h1>
              <p className="text-sm text-muted-foreground">Standardize your manuscript sections</p>
            </div>
          </div>
          <Button onClick={handleExport} variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-border bg-card">
          <ScrollArea className="h-full">
            <div className="p-4">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3">SECTIONS</h2>
              <nav className="space-y-1">
                {LANCET_SECTIONS.map((section) => {
                  const sectionWordCount = content[section.id]?.trim().split(/\s+/).filter(Boolean).length || 0
                  const hasContent = sectionWordCount > 0

                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === section.id
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{section.title}</span>
                        {hasContent && <span className="text-xs text-accent">{sectionWordCount}</span>}
                      </div>
                    </button>
                  )
                })}
              </nav>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="container max-w-4xl mx-auto p-8">
              {/* Section Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">{currentSection.title}</h2>
                {currentSection.wordLimit > 0 && (
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${isOverLimit ? "text-red-500" : "text-muted-foreground"}`}>
                      {wordCount} / {currentSection.wordLimit} words
                    </span>
                    {isOverLimit && (
                      <div className="flex items-center gap-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>Over limit</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Guidelines Card */}
              <Card className="p-6 mb-6 bg-card border-border">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">GUIDELINES</h3>
                <ul className="space-y-2">
                  {currentSection.guidelines.map((guideline, index) => (
                    <li key={index} className="text-sm text-foreground flex gap-2">
                      <span className="text-accent">•</span>
                      <span>{guideline}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Content Editor */}
              <div>
                <label className="text-sm font-semibold text-muted-foreground mb-2 block">CONTENT</label>
                <Textarea
                  value={content[activeSection] || ""}
                  onChange={(e) => setContent({ ...content, [activeSection]: e.target.value })}
                  placeholder={currentSection.placeholder}
                  className="min-h-[400px] bg-card border-border text-foreground font-mono text-sm leading-relaxed"
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    const currentIndex = LANCET_SECTIONS.findIndex((s) => s.id === activeSection)
                    if (currentIndex > 0) {
                      setActiveSection(LANCET_SECTIONS[currentIndex - 1].id)
                    }
                  }}
                  disabled={activeSection === LANCET_SECTIONS[0].id}
                >
                  Previous Section
                </Button>
                <Button
                  onClick={() => {
                    const currentIndex = LANCET_SECTIONS.findIndex((s) => s.id === activeSection)
                    if (currentIndex < LANCET_SECTIONS.length - 1) {
                      setActiveSection(LANCET_SECTIONS[currentIndex + 1].id)
                    }
                  }}
                  disabled={activeSection === LANCET_SECTIONS[LANCET_SECTIONS.length - 1].id}
                >
                  Next Section
                </Button>
              </div>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  )
}
