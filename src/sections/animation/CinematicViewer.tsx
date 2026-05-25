import { useEffect, useCallback, useState } from 'react'
import type { AnimationProject } from './AnimationProjectCard'

interface CinematicViewerProps {
  project: AnimationProject | null
  onClose: () => void
}

export default function CinematicViewer({ project, onClose }: CinematicViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const frames = project?.frames && project.frames.length > 0
    ? project.frames
    : project?.image
      ? [project.image]
      : []

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % frames.length)
    setLoaded(false)
  }, [frames.length])

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + frames.length) % frames.length)
    setLoaded(false)
  }, [frames.length])

  // Keyboard navigation
  useEffect(() => {
    if (!project) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [project, onClose, goNext, goPrev])

  // Reset on open
  useEffect(() => {
    if (project) {
      setCurrentIndex(0)
      setLoaded(false)
    }
  }, [project])

  if (!project || frames.length === 0) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ backgroundColor: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(30px)' }}
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5 shrink-0">
        <div>
          <h2
            className="font-display font-light tracking-[-0.01em]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: '#F5F0EB' }}
          >
            {project.title}
          </h2>
          <p
            className="font-mono tracking-[0.12em] uppercase mt-1"
            style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}
          >
            {project.category} &middot; {project.year} &middot; {String(currentIndex + 1).padStart(2, '0')} / {String(frames.length).padStart(2, '0')}
          </p>
        </div>
        <button
          className="font-mono tracking-[0.2em] uppercase transition-colors hover:text-[#C9A96E]"
          style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={onClose}
        >
          CLOSE
        </button>
      </div>

      {/* Main Image */}
      <div
        className="flex-1 flex items-center justify-center px-6 md:px-20 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev */}
        <button
          className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-10 p-4 transition-all hover:scale-110"
          style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={goPrev}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative max-w-full max-h-[calc(100vh-220px)]">
          {!loaded && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-bg-secondary)', borderRadius: '4px' }}
            >
              <span className="font-mono tracking-[0.15em] uppercase" style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                LOADING
              </span>
            </div>
          )}
          <img
            src={frames[currentIndex]}
            alt={`${project.title} — Frame ${currentIndex + 1}`}
            className="max-w-full max-h-[calc(100vh-220px)] object-contain transition-opacity duration-500"
            style={{ opacity: loaded ? 1 : 0, borderRadius: '4px' }}
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Next */}
        <button
          className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-10 p-4 transition-all hover:scale-110"
          style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={goNext}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Thumbnail Strip */}
      {frames.length > 1 && (
        <div
          className="shrink-0 px-6 md:px-10 py-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="flex gap-2 overflow-x-auto pb-2 justify-center"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(201,169,110,0.2) transparent' }}
          >
            {frames.map((frame, i) => (
              <button
                key={frame}
                className="shrink-0 relative overflow-hidden transition-all duration-300"
                style={{
                  width: i === currentIndex ? '96px' : '72px',
                  height: i === currentIndex ? '56px' : '42px',
                  borderRadius: '3px',
                  border: i === currentIndex ? '2px solid #C9A96E' : '2px solid transparent',
                  opacity: i === currentIndex ? 1 : 0.45,
                }}
                onClick={() => { setCurrentIndex(i); setLoaded(false) }}
              >
                <img src={frame} alt={`Frame ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
