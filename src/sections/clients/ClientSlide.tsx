import { useEffect, useRef, useState } from 'react'
import type { ClientSlideData } from './clientData'
import { ArrowRight } from 'lucide-react'

interface ClientSlideProps {
  data: ClientSlideData
  index: number
}

export default function ClientSlide({ data, index }: ClientSlideProps) {
  const slideRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const isTypeA = data.layout === 'A'

  useEffect(() => {
    const el = slideRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Stagger delay constants (ms)
  const DELAY_BG = 0
  const DELAY_PRIMARY_IMG = 100
  const DELAY_SECONDARY_IMG = 250
  const DELAY_NUMBER = 200
  const DELAY_NAME = 300
  const DELAY_META = 400
  const DELAY_DESC = 500
  const DELAY_PROJECTS = 600
  const DELAY_TAGS = 700
  const DELAY_CTA = 800

  const contentPanel = (
    <div className="relative flex flex-col justify-center" style={{ padding: '3rem' }}>
      {/* Glassmorphic card background */}
      <div
        className="absolute inset-0 rounded-[4px]"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      />

      <div className="relative z-10">
        {/* Decorative roman numeral */}
        <span
          className="absolute font-display font-light leading-none select-none pointer-events-none transition-all duration-1000"
          style={{
            fontSize: 'clamp(6rem, 12vw, 10rem)',
            color: 'var(--color-text-muted)',
            letterSpacing: '-0.03em',
            top: '-2rem',
            [isTypeA ? 'right' : 'left']: '-1rem',
            opacity: visible ? 0.3 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.9)',
            transitionDelay: `${DELAY_NUMBER}ms`,
          }}
        >
          {data.romanNumeral}
        </span>

        {/* Label */}
        <span
          className="font-mono tracking-[0.2em] uppercase block mb-3 transition-all duration-800"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            color: 'var(--color-text-muted)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: `${DELAY_NAME}ms`,
            transitionProperty: 'opacity, transform',
          }}
        >
          CLIENT
        </span>

        {/* Client Name */}
        <h2
          className="font-display font-normal leading-[1.1] overflow-hidden mb-3 transition-all duration-800"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--color-text-primary)',
            letterSpacing: '0.02em',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: `${DELAY_NAME}ms`,
            transitionProperty: 'opacity, transform',
          }}
        >
          {data.name.split(' ').map((word, i) => (
            <span key={i} className="name-word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h2>

        {/* Project count + date range */}
        <div
          className="mb-4 transition-all duration-800"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: `${DELAY_META}ms`,
            transitionProperty: 'opacity, transform',
          }}
        >
          <span
            className="font-mono tracking-[0.12em] uppercase"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            {data.projectCount} &middot; {data.dateRange}
          </span>
        </div>

        {/* Divider */}
        <div
          className="h-[1px] w-10 mb-4 transition-all duration-800"
          style={{
            backgroundColor: 'var(--color-border)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: `${DELAY_META}ms`,
            transitionProperty: 'opacity, transform',
          }}
        />

        {/* Description */}
        <p
          className="font-body font-light leading-[1.7] mb-5 transition-all duration-800"
          style={{
            fontSize: 'clamp(0.875rem, 1vw, 1rem)',
            color: 'var(--color-text-secondary)',
            maxWidth: '400px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: `${DELAY_DESC}ms`,
            transitionProperty: 'opacity, transform',
          }}
        >
          {data.description}
        </p>

        {/* Project list */}
        <ul
          className="space-y-2 mb-5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: `${DELAY_PROJECTS}ms`,
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {data.projects.map((project, i) => (
            <li
              key={project.name}
              className="font-mono tracking-[0.08em] transition-all duration-700"
              style={{
                fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                color: 'var(--color-text-tertiary)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${DELAY_PROJECTS + i * 80}ms`,
                transitionProperty: 'opacity, transform',
              }}
            >
              {project.name} ({project.year}) — {project.type}
            </li>
          ))}
        </ul>

        {/* Discipline tags */}
        <div
          className="flex flex-wrap gap-2 mb-5 transition-all duration-800"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: `${DELAY_TAGS}ms`,
            transitionProperty: 'opacity, transform',
          }}
        >
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono tracking-[0.12em] uppercase px-3 py-1 rounded-full"
              style={{
                fontSize: 'clamp(0.55rem, 0.6vw, 0.65rem)',
                color: 'var(--color-text-muted)',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#"
          className="group inline-flex items-center gap-2 font-body font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[#D4B87A]"
          style={{
            fontSize: '0.75rem',
            color: '#C9A96E',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${DELAY_CTA}ms`,
            transition: 'opacity 0.8s ease, transform 0.8s ease, color 0.3s ease',
          }}
        >
          <span className="relative">
            VIEW FULL CASE STUDY
            <span
              className="absolute -bottom-1 left-0 h-[1px] w-full origin-left transition-transform duration-300 scale-x-50 group-hover:scale-x-100"
              style={{ backgroundColor: '#C9A96E' }}
            />
          </span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </div>
  )

  const imagePanel = (
    <div className="flex flex-col gap-2 h-full">
      {/* Primary image */}
      <div
        className="flex-[7] min-h-0 rounded-[2px] overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          clipPath: visible ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
          transitionDelay: `${DELAY_PRIMARY_IMG}ms`,
        }}
      >
        <img
          src={data.images[0]}
          alt={`${data.name} — scene 1`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      {/* Secondary image */}
      <div
        className="flex-[3] min-h-0 rounded-[2px] overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          clipPath: visible ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
          transitionDelay: `${DELAY_SECONDARY_IMG}ms`,
        }}
      >
        <img
          src={data.images[1]}
          alt={`${data.name} — scene 2`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    </div>
  )

  return (
    <div
      ref={slideRef}
      className="relative min-h-[150vh] w-full overflow-hidden"
      data-slide-index={index}
    >
      {/* Background blur image for ambient color bleed */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: visible ? 0.15 : 0, transitionDelay: `${DELAY_BG}ms` }}
      >
        <img
          src={data.images[0]}
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(40px) brightness(0.3)',
            transform: 'scale(1.1)',
          }}
        />
      </div>

      {/* Slide content */}
      <div className="relative z-10 min-h-[150vh] flex items-center px-[var(--space-page-x)] py-[72px]">
        <div className="max-w-[var(--max-content-width)] mx-auto w-full" style={{ height: 'calc(100vh - 144px)' }}>
          {isTypeA ? (
            <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-4 h-full">
              <div className="h-full min-h-0">{imagePanel}</div>
              <div className="h-full min-h-0">{contentPanel}</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-4 h-full">
              <div className="h-full min-h-0 order-2 md:order-1">{contentPanel}</div>
              <div className="h-full min-h-0 order-1 md:order-2">{imagePanel}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
