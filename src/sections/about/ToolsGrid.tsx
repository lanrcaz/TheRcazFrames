import { useRef, useState, useEffect } from 'react'

interface ToolCategory {
  name: string
  tools: string[]
}

const CATEGORIES: ToolCategory[] = [
  {
    name: 'FILM DIRECTION',
    tools: [
      'TVC Direction',
      'Branded Content',
      'Documentary',
      'Social-First Video',
      'Drone Cinematography',
      'Automotive Filming',
    ],
  },
  {
    name: 'MOTION & POST',
    tools: [
      'After Effects',
      'Premiere Pro',
      'Cinema 4D',
      'Maya',
      'Compositing',
      'Color Grading',
    ],
  },
  {
    name: 'AI & AUTOMATION',
    tools: [
      'Seedance AI Film',
      'Kling Workflows',
      'Higgsfield UGC-to-Ads',
      'FilmaFlow Storyboarding',
      'Multi-Agent Systems',
      'AR Filter Design',
    ],
  },
  {
    name: 'CREATIVE SUITE',
    tools: [
      'Photoshop',
      'Illustrator',
      'ZBrush',
      'Concept Art',
      'Brand Visual Systems',
      'Creative Direction',
    ],
  },
]

export default function ToolsGrid() {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  // Calculate total items for stagger delay
  const getItemIndex = (catIndex: number, toolIndex: number): number => {
    let count = 0
    for (let i = 0; i < catIndex; i++) {
      count += CATEGORIES[i].tools.length
    }
    return count + toolIndex
  }

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        padding: 'var(--space-section-y) var(--space-page-x)',
      }}
    >
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-12">
        <p
          className="font-mono tracking-[0.2em] uppercase transition-all duration-1000"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.4,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          THE TOOLKIT
        </p>
        <h2
          className="font-display font-light leading-[1.05] tracking-[-0.01em] mt-4 mb-4 transition-all duration-1000"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--color-text-primary)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '100ms',
          }}
        >
          TOOLS &amp; DISCIPLINES
        </h2>
        <div className="flex justify-center">
          <span
            className="h-[1px] w-[80px] transition-transform duration-800 origin-center"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: headerVisible ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '200ms',
            }}
          />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-[var(--max-content-width)] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
        {CATEGORIES.map((category, catIndex) => (
          <div key={category.name}>
            {/* Category Header */}
            <h3
              className="font-mono tracking-[0.2em] uppercase mb-4 transition-all duration-1000"
              style={{
                fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.4,
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${catIndex * 80}ms`,
              }}
            >
              {category.name}
            </h3>

            {/* Tool Cells */}
            <div className="flex flex-col">
              {category.tools.map((tool, toolIndex) => {
                const globalIndex = getItemIndex(catIndex, toolIndex)
                return (
                  <div
                    key={tool}
                    className="group relative transition-all duration-1000"
                    style={{
                      borderTop: '1px solid var(--color-border)',
                      padding: '0.75rem 0',
                      opacity: revealed ? 1 : 0,
                      transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                      transitionDelay: `${globalIndex * 40}ms`,
                    }}
                  >
                    {/* Left gold border on hover */}
                    <span
                      className="absolute left-0 top-[0.75rem] bottom-[0.75rem] w-[2px] bg-[#C9A96E] origin-top transition-transform duration-300 scale-y-0 group-hover:scale-y-100"
                    />
                    <span
                      className="font-body transition-colors duration-300 group-hover:text-[#F5F0EB]"
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {tool}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
