import { useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import type { FilterCategory } from './FilterBar'

export interface Project {
  id: number
  title: string
  category: FilterCategory
  year: number
  duration: string
  client: string
  description: string
  image: string
  tags: string[]
}

interface ProjectCardProps {
  project: Project
  index: number
  onImageClick: (src: string, title: string) => void
}

export default function ProjectCard({ project, index, onImageClick }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        opacity: { duration: 0.4 },
        y: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as [number, number, number, number], delay: index * 0.08 },
      }}
      className="group cursor-pointer overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--border-radius-md)',
        transition: 'border-color 400ms ease-out, transform 400ms ease-out, box-shadow 400ms ease-out',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onImageClick(project.image, project.title)}
    >
      {/* Image Area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
          loading="lazy"
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
          style={{
            backgroundColor: 'rgba(10,10,10,0.4)',
            opacity: hovered ? 1 : 0,
          }}
        >
          <Maximize2
            size={24}
            style={{
              color: 'var(--color-text-primary)',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1)' : 'scale(0.8)',
              transition: 'opacity 400ms ease-out, transform 400ms ease-out',
            }}
          />
        </div>

        {/* Category pill */}
        <span
          className="absolute top-3 left-3 font-mono tracking-[0.12em] uppercase px-2 py-1 rounded-sm"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            backgroundColor: 'rgba(10,10,10,0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: 'var(--color-text-primary)',
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Content Area */}
      <div style={{ padding: '1.5rem' }}>
        {/* Year + Duration */}
        <p
          className="font-mono tracking-[0.12em] uppercase mb-2"
          style={{
            fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          {project.year} · {project.duration}
        </p>

        {/* Title */}
        <h3
          className="font-display font-normal leading-[1.2] mb-2"
          style={{
            fontSize: '1.5rem',
            color: 'var(--color-text-primary)',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="font-body line-clamp-2 mb-3"
          style={{
            fontSize: 'clamp(0.875rem, 1vw, 1rem)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
          }}
        >
          {project.description}
        </p>

        {/* Client tag */}
        {project.client !== 'Independent' && (
          <p
            className="font-mono tracking-[0.12em] uppercase mb-3"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              color: 'var(--color-accent-gold)',
            }}
          >
            FOR {project.client.toUpperCase()}
          </p>
        )}

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono tracking-[0.1em] uppercase px-1.5 py-0.5 rounded-sm"
                style={{
                  fontSize: 'clamp(0.55rem, 0.65vw, 0.65rem)',
                  color: 'var(--color-text-tertiary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View link */}
          <span
            className="font-mono tracking-[0.12em] uppercase transition-colors duration-300 group-hover:text-[#C9A96E] shrink-0 ml-2"
            style={{
              fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
              color: 'var(--color-text-muted)',
            }}
          >
            VIEW →
          </span>
        </div>
      </div>

      {/* Hover card lift effect via inline style transition */}
      <style>{`
        .group:hover {
          border-color: var(--color-border-hover) !important;
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
      `}</style>
    </motion.div>
  )
}
