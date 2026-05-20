import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import type { Project } from './ProjectCard'
import type { FilterCategory } from './FilterBar'

interface ProjectGridProps {
  projects: Project[]
  activeFilter: FilterCategory
}

export default function ProjectGrid({ projects, activeFilter }: ProjectGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string>('')
  const [lightboxTitle, setLightboxTitle] = useState<string>('')

  const filteredProjects =
    activeFilter === 'ALL'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const handleImageClick = useCallback((src: string, title: string) => {
    setLightboxImage(src)
    setLightboxTitle(title)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  return (
    <section
      style={{
        padding: 'var(--space-section-y) var(--space-page-x)',
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      <div
        className="max-w-[var(--max-content-width)] mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onImageClick={handleImageClick}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <h3
            className="font-display font-normal"
            style={{
              fontSize: '1.5rem',
              color: 'var(--color-text-muted)',
            }}
          >
            NO PROJECTS IN THIS CATEGORY
          </h3>
          <p
            className="font-body mt-2"
            style={{
              fontSize: 'clamp(0.875rem, 1vw, 1rem)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            Try selecting a different filter.
          </p>
        </motion.div>
      )}

      {/* Simple lightbox for project images */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(10,10,10,0.95)' }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 hover:border-[#C9A96E]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <span style={{ color: 'var(--color-text-secondary)' }}>✕</span>
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={lightboxImage}
            alt={lightboxTitle}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded"
            onClick={(e) => e.stopPropagation()}
          />
          <p
            className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono tracking-[0.12em] uppercase"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              color: 'var(--color-text-primary)',
            }}
          >
            {lightboxTitle}
          </p>
        </motion.div>
      )}
    </section>
  )
}
