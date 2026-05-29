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
    title: 'Fashion Television — Spec Ad',
    category: 'Mixed Media',
    categoryShort: 'MIXED',
    year: 2019,
    duration: '30 SEC',
    description: 'A spec commercial for Fashion Television exploring the tension between fragility and glamour. As Art Director and Senior Motion Designer, the concept was built around shattered glass — using Cinema 4D Voronoi Fracture to generate crystalline shards, glass reflection renders to capture prismatic light, and dual-tone texturing to create a controlled tension between surface and depth. Multiple test renders refined the approach into a sophisticated visual language anchored in just three colors and gradient shifts — restraint as the ultimate luxury.',
    software: ['CINEMA 4D', 'AFTER EFFECTS'],
    image: '/film/ft-spec-ad/scene-07.jpg',
    frames: [
      '/film/ft-spec-ad/scene-01.jpg',
      '/film/ft-spec-ad/scene-02.jpg',
      '/film/ft-spec-ad/scene-03.jpg',
      '/film/ft-spec-ad/scene-04.jpg',
      '/film/ft-spec-ad/scene-05.jpg',
      '/film/ft-spec-ad/scene-06.jpg',
      '/film/ft-spec-ad/scene-07.jpg',
      '/film/ft-spec-ad/scene-08.jpg',
    ],
  },
  {
    id: 3,
    title: 'Mercedes-Benz Fashion Week — Cape Town',
    category: 'Brand Film',
    categoryShort: 'BRAND',
    year: 2019,
    duration: '3 MIN',
    description: 'A TVC highlights package for Mercedes-Benz Fashion Week Cape Town, showcasing multiple fashion designers across the event. As Art Director and Senior Motion Designer, the approach centered on high-contrast editorial framing — tight crops, deliberate negative space, and pacing that mirrors the rhythm of a runway show. Each designer segment was treated as its own visual chapter, unified through a consistent motion language of sharp cuts, elegant type reveals, and a restrained monochrome-to-color grade shift that let the collections speak first. The result is a fashion film that feels as considered as the garments it showcases.',
    software: ['AFTER EFFECTS', 'C4D'],
    image: '/film/mb-capetown/scene-01.jpg',
    frames: [
      '/film/mb-capetown/scene-01.jpg',
      '/film/mb-capetown/scene-02.jpg',
      '/film/mb-capetown/scene-03.jpg',
      '/film/mb-capetown/scene-04.jpg',
      '/film/mb-capetown/scene-05.jpg',
      '/film/mb-capetown/scene-06.jpg',
    ],
  },
  {
    id: 4,
    title: 'Swimwear Trends — TVC',
    category: 'Brand Film',
    categoryShort: 'BRAND',
    year: 2019,
    duration: '30 SEC',
    description: 'A series of TVC ads for Swimwear Trends exploring the intersection of fashion and architectural form. As Art Director and Senior Motion Designer, the visual language was built entirely in a 3D Art Deco style — sharp geometric silhouettes, stepped forms, and radiating sunburst patterns rendered in Cinema 4D. The approach treated each swimsuit as a sculptural object: bold contours against minimal backgrounds, metallic accents catching virtual light, and a restrained palette of cream, gold, and deep ocean teal. Every frame channels the optimism and precision of Art Deco while keeping the focus squarely on the cut, drape, and presence of each piece. The result is a campaign that feels less like advertising and more like moving editorial — fashion as monument.',
    software: ['CINEMA 4D', 'AFTER EFFECTS'],
    image: '/film/sw-trends/scene-01.jpg',
    frames: [
      '/film/sw-trends/scene-01.jpg',
      '/film/sw-trends/scene-02.jpg',
      '/film/sw-trends/scene-03.jpg',
      '/film/sw-trends/scene-04.jpg',
      '/film/sw-trends/scene-05.jpg',
      '/film/sw-trends/scene-06.jpg',
      '/film/sw-trends/scene-07.jpg',
      '/film/sw-trends/scene-08.jpg',
    ],
  },
  {
    id: 5,
    title: 'VXV — Artist Collective',
    category: 'Mixed Media',
    categoryShort: 'MIXED',
    year: 2020,
    duration: '2 MIN',
    description: 'A promotional motion design piece for VXV, an artist collective bridging emerging talent, working professionals, and dedicated hobbyists across multiple creative disciplines. As Art Director and Senior Motion Designer, the challenge was to create a single visual language that honoured each artist\'s unique forte — from painters and sculptors to digital illustrators and mixed-media experimentalists — without fragmenting the brand. The solution: a dynamic modular system where each artist segment shares a common kinetic rhythm while shifting colour palettes, typography weights, and transition styles to reflect the individual medium. Bold shapes sweep across the frame as artist names and disciplines emerge with confident precision. The result is a piece that feels both collective and personal — a community of creators united by motion, not limited by it.',
    software: ['AFTER EFFECTS', 'C4D'],
    image: '/film/vxv/scene-08.jpg',
    frames: [
      '/film/vxv/scene-01.jpg',
      '/film/vxv/scene-02.jpg',
      '/film/vxv/scene-03.jpg',
      '/film/vxv/scene-04.jpg',
      '/film/vxv/scene-05.jpg',
      '/film/vxv/scene-06.jpg',
      '/film/vxv/scene-07.jpg',
      '/film/vxv/scene-08.jpg',
    ],
  },
  {
    id: 6,
    title: 'Top 10 Most Stylish Men',
    category: 'Brand Film',
    categoryShort: 'BRAND',
    year: 2019,
    duration: '3 MIN',
    description: 'A TVC campaign counting down the top 10 most stylish men — a high-energy editorial piece built around glamour, confidence, and curated presence. As Art Director and Senior Motion Designer, each rank was treated as its own visual event: bold typographic reveals, sweeping camera motion through abstract fashion spaces, and a consistent gold-and-black palette that elevated every frame into editorial territory. The countdown structure demanded precision in pacing — each reveal builds anticipation while the motion design keeps energy climbing toward number one. Glass textures, reflective surfaces, and sharp geometric framing channel luxury fashion advertising. The result is a countdown that feels less like a list and more like a runway finale — every subject arrives with gravitas.',
    software: ['CINEMA 4D', 'AFTER EFFECTS'],
    image: '/film/top10-most-stylish/scene-07.jpg',
    frames: [
      '/film/top10-most-stylish/scene-01.jpg',
      '/film/top10-most-stylish/scene-02.jpg',
      '/film/top10-most-stylish/scene-03.jpg',
      '/film/top10-most-stylish/scene-04.jpg',
      '/film/top10-most-stylish/scene-05.jpg',
      '/film/top10-most-stylish/scene-06.jpg',
      '/film/top10-most-stylish/scene-07.jpg',
      '/film/top10-most-stylish/scene-08.jpg',
      '/film/top10-most-stylish/scene-09.jpg',
      '/film/top10-most-stylish/scene-10.jpg',
    ],
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
