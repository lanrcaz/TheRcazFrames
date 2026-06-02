import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface ClientSlideData {
  number: string
  name: string
  project: string
  description: string
  metadata: string
  bgImage: string
  scene1: string
  scene2: string
  filmAnchor: string
}

// ORDER: VOX (I), Lucid (II), Red Bull (III), VW (IV) — matches film page
const CLIENTS: ClientSlideData[] = [
  {
    number: 'I',
    name: 'VOX CINEMAS',
    project: 'Bad Boys II \u2014 Theatrical Campaign',
    description: 'Worked with the team to capture Will Smith and Martin Lawrence for a 30-second theatrical promotional campaign, building a fast-paced spot around star presence, action energy, and the film\'s signature buddy-cop attitude.',
    metadata: 'CAM OP \u00B7 SOUND ENGINEER \u00B7 CINEMA',
    bgImage: '/film/vox-bad-boys-ii/scene-15.jpg',
    scene1: '/film/vox-bad-boys-ii/scene-16.jpg',
    scene2: '/film/vox-bad-boys-ii/scene-15.jpg',
    filmAnchor: 'project-vox-bad-boys-ii',
  },
  {
    number: 'II',
    name: 'LUCID MOTORS / MCH',
    project: 'MCH Lucid \u2014 Automotive Commercial',
    description: 'Camera assistant and post-production for a premium Saudi automotive brand commercial blending architectural cityscapes, car detail work, and Arabic culture.',
    metadata: 'CAM OP \u00B7 SOUND ENGINEER \u00B7 AUTOMOTIVE',
    bgImage: '/film/mch-lucid-car/scene-01.jpg',
    scene1: '/film/mch-lucid-car/scene-10.jpg',
    scene2: '/film/mch-lucid-car/scene-17.jpg',
    filmAnchor: 'project-mch-lucid',
  },
  {
    number: 'III',
    name: 'RED BULL',
    project: 'The Breaking Pointe \u2014 Documentary',
    description: 'Captured an action-driven four-day Red Bull paramotor production, following a top athlete through high-intensity preparation, practice runs, precision flight planning, and the final performance day.',
    metadata: 'CAM OP \u00B7 SOUND ENGINEER \u00B7 SPORT',
    bgImage: '/film/redbull-breaking-pointe/scene-01.jpg',
    scene1: '/film/redbull-breaking-pointe/scene-08.jpg',
    scene2: '/film/redbull-breaking-pointe/scene-15.jpg',
    filmAnchor: 'project-breaking-pointe',
  },
  {
    number: 'IV',
    name: 'VOLKSWAGEN',
    project: 'VW Gen GTI \u2014 Branded Documentary',
    description: 'Shot and edited a branded documentary that went beyond the car itself, capturing the Golf GTI culture, long-time enthusiasts, and the people who have lived with the GTI legacy for years.',
    metadata: 'CAM OP \u00B7 SOUND ENGINEER \u00B7 AUTOMOTIVE',
    bgImage: '/film/vw-gen-gti-docu/scene-01.jpg',
    scene1: '/film/vw-gen-gti-docu/scene-10.jpg',
    scene2: '/film/vw-gen-gti-docu/scene-20.jpg',
    filmAnchor: 'project-vw-gen-gti',
  },
]

export default function ClientCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [headerRevealed, setHeaderRevealed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

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

  const totalSlides = CLIENTS.length

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        className="px-[var(--space-page-x)] pt-24 pb-12"
      >
        <div className="max-w-[var(--max-content-width)] mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <span
              className="font-mono tracking-[0.2em] uppercase block mb-3 transition-all duration-700"
              style={{
                fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                color: 'var(--color-text-muted)',
                opacity: headerRevealed ? 1 : 0,
                transform: headerRevealed ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              SELECTED WORKS
            </span>
            <h2
              className="font-display font-light leading-[1.05] tracking-[-0.01em] transition-all duration-700"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                color: 'var(--color-text-primary)',
                opacity: headerRevealed ? 1 : 0,
                transform: headerRevealed ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: '100ms',
              }}
            >
              SELECTED<br />WORKS
            </h2>
          </div>
          <p
            className="font-body font-light max-w-[380px] transition-all duration-700"
            style={{
              fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              opacity: headerRevealed ? 1 : 0,
              transform: headerRevealed ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '200ms',
            }}
          >
            A curated archive of TVC collaborations and nationwide government campaigns across the UAE and GCC. Each frame captured with intention.
          </p>
        </div>
      </div>

      {/* Slide Content */}
      <div className="px-[var(--space-page-x)] pb-24">
        <div className="max-w-[var(--max-content-width)] mx-auto">
          {/* Slide Display */}
          <div className="relative">
            {CLIENTS.map((client, index) => (
              <ClientSlide
                key={client.name}
                client={client}
                isActive={index === activeSlide}
              />
            ))}
          </div>

          {/* Navigation */}
          <div
            className="flex items-center justify-between mt-12 transition-all duration-700"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '600ms',
            }}
          >
            {/* Slide Counter */}
            <div className="flex items-center gap-4">
              <span
                className="font-mono tracking-[0.12em]"
                style={{
                  fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
                  color: 'var(--color-text-muted)',
                }}
              >
                0{activeSlide + 1} / 0{totalSlides}
              </span>
            </div>

            {/* Arrows + Indicators */}
            <div className="flex items-center gap-6">
              {/* Dot indicators */}
              <div className="flex gap-2">
                {CLIENTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className="transition-all duration-300"
                    style={{
                      width: activeSlide === i ? '32px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: activeSlide === i ? '#C9A96E' : 'var(--color-text-muted)',
                      opacity: activeSlide === i ? 1 : 0.4,
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Arrow buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))}
                  className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                  }}
                  aria-label="Previous slide"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))}
                  className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                  }}
                  aria-label="Next slide"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Slide Sub-Component ─── */

function ClientSlide({
  client,
  isActive,
}: {
  client: ClientSlideData
  isActive: boolean
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setVisible(true), 50)
      return () => clearTimeout(timer)
    } else {
      setVisible(false)
    }
  }, [isActive])

  if (!isActive) return null

  const DELAY_NUMBER = 100
  const DELAY_NAME = 200
  const DELAY_PROJECT = 300
  const DELAY_DESC = 400
  const DELAY_META = 500

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
      {/* Left: Text Content */}
      <div className="flex flex-col justify-center lg:pr-12">
        {/* Roman numeral */}
        <span
          className="font-display leading-none mb-4 transition-all duration-700"
          style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            color: 'var(--color-text-muted)',
            opacity: 0.15,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: `${DELAY_NUMBER}ms`,
          }}
        >
          {client.number}
        </span>

        {/* Client name */}
        <h3
          className="font-display font-light leading-[1.05] mb-2 transition-all duration-700"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.01em',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: `${DELAY_NAME}ms`,
          }}
        >
          {client.name}
        </h3>

        {/* Project name */}
        <p
          className="font-mono tracking-[0.1em] uppercase mb-4 transition-all duration-700"
          style={{
            fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)',
            color: 'var(--color-text-tertiary)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: `${DELAY_PROJECT}ms`,
          }}
        >
          {client.project}
        </p>

        {/* Description */}
        <p
          className="font-body font-light max-w-[480px] mb-5 transition-all duration-700"
          style={{
            fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: `${DELAY_DESC}ms`,
          }}
        >
          {client.description}
        </p>

        {/* Metadata */}
        <span
          className="font-mono tracking-[0.12em] uppercase mb-6 transition-all duration-700"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            color: 'var(--color-text-muted)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${DELAY_META}ms`,
          }}
        >
          {client.metadata}
        </span>

        {/* VIEW FULL PROJECT — links directly to the project on film page */}
        <div
          className="mt-2 transition-all duration-1000"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '500ms',
          }}
        >
          <Link
            to={`/film#${client.filmAnchor}`}
            className="group inline-flex items-center gap-2 font-body text-xs font-medium tracking-[0.15em] uppercase text-[#C9A96E] transition-colors duration-300 hover:text-[#D4B87A]"
          >
            <span className="relative">
              VIEW FULL PROJECT
              <span className="absolute -bottom-0.5 left-0 h-[1px] w-full bg-[#C9A96E] origin-left transition-transform duration-300 scale-x-40 group-hover:scale-x-100" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Right: Screenshot Grid */}
      <div className="hidden lg:grid grid-cols-2 gap-4 mt-8 lg:mt-0 lg:pl-12">
        {[client.scene1, client.scene2].map((scene, i) => (
          <div
            key={scene}
            className="overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              clipPath: visible ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
              transitionDelay: `${400 + i * 150}ms`,
            }}
          >
            <div
              className="aspect-[16/10] overflow-hidden"
              style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            >
              <img
                src={scene}
                alt={`${client.name} — ${client.project}`}
                className="w-full h-full object-cover transition-transform duration-[800ms] hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
