import { useState, useEffect, useRef, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FilterBar, { type FilterCategory } from './FilterBar'
import AnimationProjectCard, { type AnimationProject } from './AnimationProjectCard'
import CinematicViewer from './CinematicViewer'

const PROJECTS: AnimationProject[] = [
  {
    id: 1,
    title: 'HITB CyberWeek',
    category: 'Brand Film',
    categoryShort: 'BRAND',
    year: 2019,
    duration: '6 EPISODES',
    description: 'Overall event display graphics and social branding across 6 days for HITB CyberWeek Abu Dhabi 2019. Designed the entire 6-episode documentary player journey covering the full conference — from opening graphics to daily episode transitions and closing credits.',
    software: ['AFTER EFFECTS', 'C4D'],
    image: '/film/hitb/scene-01.jpg',
    frames: [
      '/film/hitb/scene-01.jpg',
      '/film/hitb/scene-02.jpg',
      '/film/hitb/scene-03.jpg',
      '/film/hitb/scene-04.jpg',
      '/film/hitb/scene-05.jpg',
      '/film/hitb/scene-06.jpg',
      '/film/hitb/scene-07.jpg',
    ],
  },
  {
    id: 2,
    title: 'Nocturne Titles',
    category: 'Title Sequence',
    categoryShort: 'TITLES',
    year: 2024,
    duration: '90 SEC',
    description: 'Opening title sequence for a neo-noir streaming series. Typography emerges from shadow and smoke, letterforms dissolving and reforming in sync with the theme.',
    software: ['AFTER EFFECTS', 'OCTANE'],
    image: '/film/vox-bad-boys-ii/scene-01.jpg',
  },
  {
    id: 3,
    title: 'Pulse Network',
    category: 'Data Viz',
    categoryShort: 'DATA',
    year: 2023,
    duration: '1 MIN',
    description: 'Real-time data visualization for a tech conference keynote. Abstract particle streams represent global network traffic, shifting from chaos to organized flow.',
    software: ['TOUCHDESIGNER', 'AE'],
    image: '/film/mch-lucid-car/scene-10.jpg',
  },
  {
    id: 4,
    title: 'Echo Interface',
    category: 'UI Motion',
    categoryShort: 'UI',
    year: 2023,
    duration: '45 SEC',
    description: 'Motion language for a music streaming app redesign. Micro-interactions, transitions, and ambient visualizers that respond to audio frequency in real-time.',
    software: ['FIGMA', 'AFTER EFFECTS'],
    image: '/film/music-travel-love-dubai/scene-08.jpg',
  },
  {
    id: 5,
    title: 'Kinetic Manifesto',
    category: 'Kinetic Type',
    categoryShort: 'TYPE',
    year: 2023,
    duration: '60 SEC',
    description: 'A typographic manifesto film for a creative agency. Words become architecture, collapsing and expanding in rhythm with a spoken-word voiceover.',
    software: ['AFTER EFFECTS', 'C4D'],
    image: '/film/redbull-breaking-pointe/scene-15.jpg',
  },
  {
    id: 6,
    title: 'Solstice Rebrand',
    category: 'Brand Film',
    categoryShort: 'BRAND',
    year: 2022,
    duration: '3 MIN',
    description: 'Complete brand motion system for a luxury wellness brand. Fluid simulations of botanical extracts morphing into logo forms across multiple touchpoints.',
    software: ['C4D', 'REALFLOW', 'AE'],
    image: '/film/vw-gen-gti-docu/scene-15.jpg',
  },
  {
    id: 7,
    title: 'Frequency Live',
    category: 'Mixed Media',
    categoryShort: 'MIXED',
    year: 2022,
    duration: '4 MIN',
    description: 'Live performance visuals for an electronic music tour. Real-time generative graphics responding to MIDI triggers, projected across a 270-degree stage.',
    software: ['TOUCHDESIGNER', 'RESOLUME'],
    image: '/film/travel-series/scene-18.jpg',
  },
  {
    id: 8,
    title: 'Ledger Titles',
    category: 'Title Sequence',
    categoryShort: 'TITLES',
    year: 2022,
    duration: '75 SEC',
    description: 'End credits for a documentary about the history of accounting. Numbers and ledgers cascade in an elegant Rube Goldberg-inspired sequence.',
    software: ['AFTER EFFECTS', 'BLENDER'],
    image: '/film/mch-lucid-car/scene-01.jpg',
  },
  {
    id: 9,
    title: 'Prism Dashboard',
    category: 'UI Motion',
    categoryShort: 'UI',
    year: 2021,
    duration: '30 SEC',
    description: 'Motion design system for an analytics platform. Smooth data transitions, animated charts, and contextual micro-interactions that guide user attention.',
    software: ['FIGMA', 'AFTER EFFECTS'],
    image: '/film/music-travel-love-dubai/scene-01.jpg',
  },
  {
    id: 10,
    title: 'Glyph Symphony',
    category: 'Kinetic Type',
    categoryShort: 'TYPE',
    year: 2021,
    duration: '2 MIN',
    description: 'An experimental type film exploring the relationship between letterforms and musical notation. Each character dances to its own frequency.',
    software: ['AFTER EFFECTS', 'C4D'],
    image: '/film/vox-bad-boys-ii/scene-10.jpg',
  },
]

export default function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL')
  const [viewerProject, setViewerProject] = useState<AnimationProject | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return PROJECTS
    return PROJECTS.filter((p) => {
      if (activeFilter === 'BRAND FILM') return p.category === 'Brand Film'
      if (activeFilter === 'TITLE SEQUENCE') return p.category === 'Title Sequence'
      if (activeFilter === 'KINETIC TYPE') return p.category === 'Kinetic Type'
      if (activeFilter === 'UI MOTION') return p.category === 'UI Motion'
      if (activeFilter === 'DATA VIZ') return p.category === 'Data Viz'
      if (activeFilter === 'MIXED MEDIA') return p.category === 'Mixed Media'
      return true
    })
  }, [activeFilter])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        padding: '0 var(--space-page-x) var(--space-section-y)',
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      <div className="max-w-[var(--max-content-width)] mx-auto">
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          projectCount={filteredProjects.length}
        />

        {/* Grid */}
        <motion.div
          layout
          className="grid gap-6 mt-8"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <AnimationProjectCard
                key={project.id}
                project={project}
                index={index}
                onView={(p) => setViewerProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center py-24"
            >
              <p
                className="font-mono"
                style={{
                  fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)',
                  letterSpacing: '0.12em',
                  color: 'var(--color-text-muted)',
                }}
              >
                NO PROJECTS MATCH THE SELECTED FILTER.
              </p>
              <button
                onClick={() => setActiveFilter('ALL')}
                className="mt-4 font-body font-medium uppercase transition-colors duration-300 hover:text-[#D4B87A]"
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  color: 'var(--color-accent-gold)',
                }}
              >
                SHOW ALL
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cinematic Viewer */}
      <CinematicViewer
        project={viewerProject}
        onClose={() => setViewerProject(null)}
      />

      {/* Responsive CSS override for smaller screens */}
      <style>{`
        @media (max-width: 767px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
