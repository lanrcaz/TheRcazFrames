import { useRef, useEffect, useState, useCallback } from 'react'
import type { Project } from './ProjectCard'

interface Frame {
  src: string
  index: number
}

interface ProjectShowcaseProps {
  project: Project
  frames: Frame[]
  romanNumeral: string
}

export default function ProjectShowcase({ project, frames, romanNumeral }: ProjectShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])
  const goNext = useCallback(() => setLightboxIndex((i) => (i + 1) % frames.length), [frames.length])
  const goPrev = useCallback(() => setLightboxIndex((i) => (i - 1 + frames.length) % frames.length), [frames.length])

  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen, closeLightbox, goNext, goPrev])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          padding: '6rem var(--space-page-x)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div className="max-w-[var(--max-content-width)] mx-auto">
          {/* Project Header */}
          <div className="mb-10">
            {/* Roman numeral + Label */}
            <div className="flex items-baseline gap-4 mb-4">
              <span
                className="font-display font-light"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  color: 'var(--color-text-muted)',
                  opacity: 0.3,
                  lineHeight: 1,
                }}
              >
                {romanNumeral}
              </span>
              <span
                className="font-mono tracking-[0.2em] uppercase"
                style={{
                  fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-display font-light leading-[1.05] tracking-[-0.01em] mb-3 transition-all duration-1000"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                color: 'var(--color-text-primary)',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              {project.title}
            </h2>

            {/* Meta row */}
            <div
              className="flex flex-wrap items-center gap-4 mb-4 transition-all duration-1000"
              style={{
                transitionDelay: '100ms',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <span className="font-mono tracking-[0.15em] uppercase" style={{ fontSize: '0.7rem', color: 'var(--color-accent-gold)' }}>
                {project.client}
              </span>
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)' }}>
                {project.year}
              </span>
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)' }}>
                {project.duration}
              </span>
            </div>

            {/* Description */}
            <p
              className="font-body font-light max-w-[700px] transition-all duration-1000"
              style={{
                fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                transitionDelay: '200ms',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {project.description}
            </p>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-2 mt-4 transition-all duration-1000"
              style={{
                transitionDelay: '300ms',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono tracking-[0.12em] uppercase px-3 py-1"
                  style={{
                    fontSize: '0.6rem',
                    color: 'var(--color-text-tertiary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Frames Grid — ALL scenes */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            style={{ gap: '0.5rem' }}
          >
            {frames.map((frame, i) => (
              <div
                key={frame.src}
                className="group cursor-pointer relative overflow-hidden"
                style={{
                  borderRadius: '2px',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: `${Math.min(i * 40, 800)}ms`,
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                }}
                onClick={() => openLightbox(i)}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={frame.src}
                    alt={`${project.title} - Frame ${frame.index}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: 'rgba(10,10,10,0.5)' }}
                  >
                    <span
                      className="font-mono tracking-[0.2em] uppercase"
                      style={{ fontSize: '0.6rem', color: '#F5F0EB' }}
                    >
                      FRAME {String(frame.index).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Frame count */}
          <div
            className="mt-6 flex items-center gap-3 transition-all duration-1000"
            style={{
              transitionDelay: '500ms',
              opacity: revealed ? 1 : 0,
            }}
          >
            <div className="h-[1px] flex-1" style={{ backgroundColor: 'var(--color-border)' }} />
            <span className="font-mono tracking-[0.15em] uppercase" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
              {frames.length} FRAMES
            </span>
            <div className="h-[1px] flex-1" style={{ backgroundColor: 'var(--color-border)' }} />
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX with Thumbnail Navigation ===== */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{ backgroundColor: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(20px)' }}
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 md:px-8 py-4 shrink-0">
            <div
              className="font-mono tracking-[0.15em]"
              style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}
            >
              {project.title} &mdash; {String(lightboxIndex + 1).padStart(2, '0')} / {String(frames.length).padStart(2, '0')}
            </div>
            <button
              className="font-mono tracking-[0.2em] uppercase transition-colors hover:text-[#C9A96E]"
              style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}
              onClick={closeLightbox}
            >
              CLOSE
            </button>
          </div>

          {/* Main Image Area */}
          <div
            className="flex-1 flex items-center justify-center px-4 md:px-16 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Arrow */}
            <button
              className="absolute left-2 md:left-6 top-[45%] -translate-y-1/2 z-10 p-3 transition-colors hover:text-[#C9A96E]"
              style={{ color: 'var(--color-text-secondary)' }}
              onClick={goPrev}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Image */}
            <img
              src={frames[lightboxIndex].src}
              alt={`Frame ${lightboxIndex + 1}`}
              className="max-w-full max-h-[calc(100vh-200px)] object-contain"
              style={{ borderRadius: '2px' }}
            />

            {/* Next Arrow */}
            <button
              className="absolute right-2 md:right-6 top-[45%] -translate-y-1/2 z-10 p-3 transition-colors hover:text-[#C9A96E]"
              style={{ color: 'var(--color-text-secondary)' }}
              onClick={goNext}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* ===== THUMBNAIL STRIP ===== */}
          <div
            className="shrink-0 px-4 md:px-8 py-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex gap-2 overflow-x-auto pb-2"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(201,169,110,0.3) transparent',
              }}
            >
              {frames.map((frame, i) => (
                <button
                  key={frame.src}
                  className="shrink-0 relative overflow-hidden transition-all duration-300"
                  style={{
                    width: i === lightboxIndex ? '80px' : '60px',
                    height: i === lightboxIndex ? '50px' : '36px',
                    borderRadius: '2px',
                    border: i === lightboxIndex ? '2px solid #C9A96E' : '2px solid transparent',
                    opacity: i === lightboxIndex ? 1 : 0.5,
                  }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={frame.src}
                    alt={`Thumbnail ${frame.index}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
