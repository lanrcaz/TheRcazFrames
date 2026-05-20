import { useState, useEffect, useRef, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FilterBar, { type FilterCategory } from './FilterBar'
import AnimationProjectCard, { type AnimationProject } from './AnimationProjectCard'

const PROJECTS: AnimationProject[] = [
  {
    id: 1,
    title: 'Lumina',
    category: '3D Animation',
    categoryShort: '3D',
    year: 2024,
    duration: '4 MIN',
    description: 'A young forest spirit journeys through a bioluminescent woodland, discovering the hidden magic that connects all living things.',
    software: ['BLENDER', 'NUKE'],
    image: '/anim-project-1-hero.jpg',
  },
  {
    id: 2,
    title: 'Concrete & Coral',
    category: '2D Animation',
    categoryShort: '2D',
    year: 2024,
    duration: '5 MIN',
    description: 'A poetic short about nature reclaiming an abandoned metropolis, told through bold graphic shapes and a limited color palette.',
    software: ['AFTER EFFECTS'],
    image: '/anim-project-2-hero.jpg',
  },
  {
    id: 3,
    title: 'Pulse',
    category: 'Motion Graphics',
    categoryShort: 'MOTION',
    year: 2023,
    duration: '1 MIN',
    description: 'Abstract flowing ribbons of light dance through a dark void, driven by an electronic soundtrack and particle-driven motion.',
    software: ['C4D', 'AE'],
    image: '/anim-project-3-hero.jpg',
  },
  {
    id: 4,
    title: 'The Little Locksmith',
    category: 'Stop Motion',
    categoryShort: 'STOP MOTION',
    year: 2023,
    duration: '8 MIN',
    description: 'A handcrafted stop-motion tale of a tiny locksmith who fixes broken hearts in a miniature world of wonder and warmth.',
    software: ['PRACTICAL'],
    image: '/anim-project-4-hero.jpg',
  },
  {
    id: 5,
    title: 'Nebula',
    category: '3D Animation',
    categoryShort: '3D',
    year: 2023,
    duration: '6 MIN',
    description: 'Two starships navigate a cosmic nebula in search of a lost signal, encountering phenomena beyond human comprehension.',
    software: ['MAYA', 'ARNOLD'],
    image: '/featured-animation.jpg',
  },
  {
    id: 6,
    title: 'Paper Planes',
    category: '2D Animation',
    categoryShort: '2D',
    year: 2022,
    duration: '3 MIN',
    description: 'A nostalgic story of friendship told through paper airplanes that travel across oceans, carrying handwritten letters.',
    software: ['TOON BOOM'],
    image: '/client-aria-scene-1.jpg',
  },
  {
    id: 7,
    title: 'Frequency',
    category: 'Motion Graphics',
    categoryShort: 'MOTION',
    year: 2022,
    duration: '45 SEC',
    description: 'A kinetic brand film exploring the rhythm and frequency of modern urban life through data-driven visual patterns.',
    software: ['C4D', 'AE'],
    image: '/client-metro-scene-2.jpg',
  },
  {
    id: 8,
    title: 'Widget',
    category: 'Character',
    categoryShort: 'CHARACTER',
    year: 2022,
    duration: '2 MIN',
    description: 'A curious mechanical robot discovers emotions one by one in a post-human world, learning what it means to feel alive.',
    software: ['BLENDER'],
    image: '/client-acme-scene-2.jpg',
  },
  {
    id: 9,
    title: 'Aurora',
    category: '3D Animation',
    categoryShort: '3D',
    year: 2021,
    duration: '5 MIN',
    description: 'A lone explorer traverses an alien arctic landscape illuminated by cascading auroras, seeking signs of ancient life.',
    software: ['BLENDER'],
    image: '/client-nova-scene-2.jpg',
  },
  {
    id: 10,
    title: 'Stitches',
    category: 'Stop Motion',
    categoryShort: 'STOP MOTION',
    year: 2021,
    duration: '7 MIN',
    description: 'A tender story about a ragdoll who patches together memories from scraps of fabric in an attic full of forgotten dreams.',
    software: ['PRACTICAL'],
    image: '/film-scene-1d.jpg',
  },
]

export default function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL')
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return PROJECTS
    return PROJECTS.filter((p) => {
      if (activeFilter === '3D ANIMATION') return p.category === '3D Animation'
      if (activeFilter === '2D ANIMATION') return p.category === '2D Animation'
      if (activeFilter === 'MOTION GRAPHICS') return p.category === 'Motion Graphics'
      if (activeFilter === 'STOP MOTION') return p.category === 'Stop Motion'
      if (activeFilter === 'CHARACTER') return p.category === 'Character'
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
