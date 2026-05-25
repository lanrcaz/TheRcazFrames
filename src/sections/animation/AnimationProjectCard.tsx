import { useState } from 'react'
import { motion } from 'framer-motion'

export interface AnimationProject {
  id: number
  title: string
  category: string
  categoryShort: string
  year: number
  duration: string
  description: string
  software: string[]
  image: string
  frames?: string[]
}

interface AnimationProjectCardProps {
  project: AnimationProject
  index: number
  onView?: (project: AnimationProject) => void
}

export default function AnimationProjectCard({ project, index, onView }: AnimationProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{
        layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        opacity: { duration: 0.5, delay: index * 0.08 },
        y: { duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      }}
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid',
        borderColor: hovered ? 'rgba(201,169,110,0.25)' : 'var(--color-border)',
        borderRadius: 'var(--border-radius-md)',
        overflow: 'hidden',
        transition: 'border-color 400ms, box-shadow 400ms, transform 400ms',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(201,169,110,0.1)'
          : 'none',
      }}
    >
      {/* Image Area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {/* Skeleton/placeholder */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            opacity: imageLoaded ? 0 : 1,
          }}
        />

        <img
          src={project.image}
          alt={`${project.title} — ${project.category}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 700ms, transform 700ms',
          }}
        />

        {/* Category Pill */}
        <div
          className="absolute top-3 left-3 font-mono uppercase"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            padding: '0.35rem 0.75rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(10,10,10,0.75)',
            backdropFilter: 'blur(8px)',
            color: 'var(--color-text-secondary)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {project.categoryShort}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5">
        {/* Year + Duration */}
        <span
          className="font-mono block mb-2"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            letterSpacing: '0.12em',
            color: 'var(--color-text-muted)',
          }}
        >
          {project.year} · {project.duration}
        </span>

        {/* Project Title */}
        <h3
          className="font-body font-medium mb-2 transition-colors duration-300 group-hover:text-[#D4B87A]"
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            letterSpacing: '0.08em',
            lineHeight: 1.3,
            color: 'var(--color-text-primary)',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="mb-4"
          style={{
            fontSize: 'clamp(0.875rem, 1vw, 1rem)',
            lineHeight: 1.7,
            letterSpacing: '0.01em',
            color: 'var(--color-text-secondary)',
          }}
        >
          {project.description}
        </p>

        {/* Software Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.software.map((sw) => (
            <span
              key={sw}
              className="font-mono uppercase"
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.12em',
                padding: '0.3rem 0.6rem',
                borderRadius: '2px',
                border: '1px solid rgba(201,169,110,0.35)',
                color: 'var(--color-accent-gold)',
              }}
            >
              {sw}
            </span>
          ))}
        </div>

        {/* View Link */}
        <button
          onClick={() => onView?.(project)}
          className="inline-flex items-center gap-2 font-body font-medium uppercase transition-all duration-300 hover:gap-3"
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: 'var(--color-accent-gold)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          VIEW
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </motion.article>
  )
}
