import PageHero from '../sections/film/PageHero'
import ProjectShowcase from '../sections/film/ProjectShowcase'
import CTABand from '../sections/CTABand'
import { PROJECTS } from '../sections/film/filmData'

// Build frame lists for each project
const TRAVEL_FRAMES = Array.from({ length: 25 }, (_, i) => ({
  src: `/film/travel-series/scene-${String(i + 1).padStart(2, '0')}.jpg`,
  index: i + 1,
}))

const LUCID_FRAMES = Array.from({ length: 20 }, (_, i) => ({
  src: `/film/mch-lucid-car/scene-${String(i + 1).padStart(2, '0')}.jpg`,
  index: i + 1,
}))

const REDBULL_FRAMES = Array.from({ length: 24 }, (_, i) => ({
  src: `/film/redbull-breaking-pointe/scene-${String(i + 1).padStart(2, '0')}.jpg`,
  index: i + 1,
}))

const PROJECT_FRAMES = [TRAVEL_FRAMES, LUCID_FRAMES, REDBULL_FRAMES]
const ROMAN_NUMERALS = ['I', 'II', 'III']

export default function Film() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <PageHero />

      {/* Section Label */}
      <section
        style={{
          padding: '4rem var(--space-page-x) 0',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <div className="max-w-[var(--max-content-width)] mx-auto">
          <span
            className="font-mono tracking-[0.2em] uppercase block mb-2"
            style={{ fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', color: 'var(--color-text-muted)' }}
          >
            SELECTED WORKS
          </span>
          <h2
            className="font-display font-light leading-[1.05] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--color-text-primary)' }}
          >
            DIRECTED WORKS
          </h2>
          <p
            className="font-body font-light mt-3 max-w-[500px]"
            style={{ fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}
          >
            A collection of film projects spanning commercial, branded content, and documentary work — each frame captured with intention.
          </p>
          <div className="h-[1px] w-full mt-8" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>
      </section>

      {/* Each project with ALL frames */}
      {PROJECTS.map((project, i) => (
        <ProjectShowcase
          key={project.id}
          project={project}
          frames={PROJECT_FRAMES[i]}
          romanNumeral={ROMAN_NUMERALS[i]}
        />
      ))}

      <CTABand />
    </main>
  )
}
