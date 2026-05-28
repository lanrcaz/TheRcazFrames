import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

type FilterMode = 'film' | 'both' | 'motion'

const FEATURED_DATA = {
  film: {
    image: '/film/travel-series/scene-05.jpg',
    meta: '2024 \u00B7 COMMERCIAL \u00B7 3 MIN',
    title: 'TRAVEL SERIES \u2014 MUSIC PRODUCER',
    desc: 'A cinematic travel series filmed across Dubai \u2014 from the soaring heights of the Burj Khalifa to golden hour yacht moments. Capturing the intersection of culture, luxury, and sound.',
    cta: 'VIEW PROJECT',
    ctaLink: '/film',
  },
  motion: {
    image: '/film/hitb/scene-01.jpg',
    meta: '2019 \u00B7 BRAND FILM \u00B7 6 EPISODES',
    title: 'HITB CYBERWEEK \u2014 ABU DHABI',
    desc: 'Overall event display graphics and social branding across 6 days for HITB CyberWeek Abu Dhabi 2019. Designed the entire 6-episode documentary player journey covering the full conference.',
    cta: 'VIEW PROJECT',
    ctaLink: '/animation',
  },
}

export default function FeaturedWork() {
  const [filter, setFilter] = useState<FilterMode>('both')
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
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        padding: 'var(--space-section-y) var(--space-page-x)',
      }}
    >
      <div className="max-w-[var(--max-content-width)] mx-auto">
        {/* Section Label */}
        <div
          className="mb-8 transition-all duration-1000"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          <span
            className="font-mono tracking-[0.2em] uppercase"
            style={{ fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', color: 'var(--color-text-muted)' }}
          >
            FEATURED PROJECT
          </span>
          <span
            className="block h-[1px] w-[60px] md:w-[80px] mt-2 origin-left transition-transform duration-800"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '200ms',
            }}
          />
        </div>

        {/* Discipline Toggle */}
        <div
          className="mb-10 transition-all duration-1000"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '100ms',
          }}
        >
          <div
            className="inline-flex items-center rounded-full p-1 gap-1"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {(['film', 'both', 'motion'] as FilterMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className="relative px-4 py-2 rounded-full font-body text-xs tracking-[0.1em] uppercase transition-colors duration-300"
                style={{
                  color: filter === mode ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                }}
              >
                {filter === mode && (
                  <motion.div
                    layoutId="filterPill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">
                  {mode === 'film' ? 'FILM' : mode === 'motion' ? 'MOTION' : 'BOTH'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_40%] gap-[5%]">
          {/* Left: Image */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '200ms',
            }}
          >
            <AnimatePresence mode="wait">
              {filter === 'both' ? (
                <BothImages key="both" />
              ) : (
                <SingleImage
                  key={filter}
                  image={FEATURED_DATA[filter].image}
                  alt={FEATURED_DATA[filter].title}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center mt-8 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {filter === 'both' ? (
                  <BothContent />
                ) : (
                  <ProjectContent {...FEATURED_DATA[filter]} revealed={revealed} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function SingleImage({ image, alt }: { image: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="overflow-hidden rounded-[var(--border-radius-md)] group cursor-pointer"
    >
      <img
        src={image}
        alt={alt}
        className="w-full aspect-video object-cover transition-transform duration-600 group-hover:scale-[1.03]"
      />
    </motion.div>
  )
}

function BothImages() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <div className="overflow-hidden rounded-[var(--border-radius-md)] group cursor-pointer">
        <img
          src={FEATURED_DATA.film.image}
          alt={FEATURED_DATA.film.title}
          className="w-full aspect-video object-cover transition-transform duration-600 group-hover:scale-[1.03]"
        />
      </div>
      <div className="overflow-hidden rounded-[var(--border-radius-md)] group cursor-pointer">
        <img
          src={FEATURED_DATA.motion.image}
          alt={FEATURED_DATA.motion.title}
          className="w-full aspect-video object-cover transition-transform duration-600 group-hover:scale-[1.03]"
        />
      </div>
    </motion.div>
  )
}

function BothContent() {
  return (
    <div>
      <p
        className="font-mono tracking-[0.12em] mb-4"
        style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)', color: 'var(--color-text-tertiary)' }}
      >
        SELECTED WORKS FROM BOTH DISCIPLINES
      </p>
      <h2
        className="font-display font-light tracking-[-0.01em] leading-[1.05]"
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          color: 'var(--color-text-primary)',
        }}
      >
        FEATURED
        <br />
        PROJECTS
      </h2>
      <p
        className="mt-4 font-body font-light leading-[1.7] max-w-[440px]"
        style={{
          fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
          color: 'var(--color-text-secondary)',
        }}
      >
        Film is the focus — motion is the foundation. Explore work across directing, branded content, and motion graphics systems.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Link
          to="/film"
          onClick={() => window.scrollTo(0, 0)}
          className="group inline-flex items-center gap-2 font-body text-xs font-medium tracking-[0.15em] uppercase text-[#C9A96E] transition-colors duration-300 hover:text-[#D4B87A]"
        >
          <span className="relative">
            VIEW FILM WORK
            <span className="absolute -bottom-0.5 left-0 h-[1px] w-full bg-[#C9A96E] origin-left scale-x-100 group-hover:scale-x-100 transition-transform duration-300" />
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </Link>
        <Link
          to="/animation"
          onClick={() => window.scrollTo(0, 0)}
          className="group inline-flex items-center gap-2 font-body text-xs font-medium tracking-[0.15em] uppercase text-[#C9A96E] transition-colors duration-300 hover:text-[#D4B87A]"
        >
          <span className="relative">
            VIEW MOTION WORK
            <span className="absolute -bottom-0.5 left-0 h-[1px] w-full bg-[#C9A96E] origin-left scale-x-100 group-hover:scale-x-100 transition-transform duration-300" />
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </div>
  )
}

function ProjectContent({
  meta,
  title,
  desc,
  cta,
  ctaLink,
  revealed,
}: {
  meta: string
  title: string
  desc: string
  cta: string
  ctaLink: string
  revealed: boolean
}) {
  return (
    <div>
      <p
        className="font-mono tracking-[0.12em] mb-3 transition-all duration-1000"
        style={{
          fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
          color: 'var(--color-text-tertiary)',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(40px)',
          transitionDelay: '300ms',
        }}
      >
        {meta}
      </p>
      <h2
        className="font-display font-light tracking-[-0.01em] leading-[1.05] transition-all duration-1000"
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          color: 'var(--color-text-primary)',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(40px)',
          transitionDelay: '400ms',
        }}
      >
        {title}
      </h2>
      <p
        className="mt-4 font-body font-light leading-[1.7] max-w-[440px] transition-all duration-1000"
        style={{
          fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
          color: 'var(--color-text-secondary)',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(40px)',
          transitionDelay: '500ms',
        }}
      >
        {desc}
      </p>
      <div className="mt-6 flex flex-col gap-4 transition-all duration-1000"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(40px)',
          transitionDelay: '600ms',
        }}
      >
        <Link
          to={ctaLink}
          className="group inline-flex items-center gap-2 font-body text-xs font-medium tracking-[0.15em] uppercase text-[#C9A96E] transition-colors duration-300 hover:text-[#D4B87A]"
        >
          <span className="relative">
            {cta}
            <span className="absolute -bottom-0.5 left-0 h-[1px] w-full bg-[#C9A96E] origin-left transition-transform duration-300 scale-x-40 group-hover:scale-x-100" />
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </Link>
        <Link
          to="#discipline-split"
          className="font-mono tracking-[0.12em] transition-colors duration-300 hover:text-[#C9A96E]"
          style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)', color: 'var(--color-text-muted)' }}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('discipline-split')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          OR EXPLORE MOTION &darr;
        </Link>
      </div>
    </div>
  )
}
