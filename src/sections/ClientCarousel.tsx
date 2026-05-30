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
}

const CLIENTS: ClientSlideData[] = [
  {
    number: 'II',
    name: 'LUCID MOTORS / MCH',
    project: 'MCH Lucid \u2014 Automotive Commercial',
    description: 'Camera assistant and post-production for a premium Saudi automotive brand commercial blending architectural cityscapes, car detail work, and Arabic culture.',
    metadata: 'CAM OP \u00B7 SOUND ENGINEER \u00B7 AUTOMOTIVE',
    bgImage: '/film/mch-lucid-car/scene-01.jpg',
    scene1: '/film/mch-lucid-car/scene-10.jpg',
    scene2: '/film/mch-lucid-car/scene-17.jpg',
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
  },
  {
    number: 'IV',
    name: 'VOX CINEMAS',
    project: 'Bad Boys II \u2014 Theatrical Campaign',
    description: 'Worked with the team to capture Will Smith and Martin Lawrence for a 30-second theatrical promotional campaign, building a fast-paced spot around star presence, action energy, and the film\'s signature buddy-cop attitude.',
    metadata: 'CAM OP \u00B7 SOUND ENGINEER \u00B7 CINEMA',
    bgImage: '/film/vox-bad-boys-ii/scene-01.jpg',
    scene1: '/film/vox-bad-boys-ii/scene-10.jpg',
    scene2: '/film/vox-bad-boys-ii/scene-16.jpg',
  },
  {
    number: 'V',
    name: 'VOLKSWAGEN',
    project: 'VW Gen GTI \u2014 Branded Documentary',
    description: 'Shot and edited a branded documentary that went beyond the car itself, capturing the Golf GTI culture, long-time enthusiasts, and the people who have lived with the GTI legacy for years.',
    metadata: 'CAM OP \u00B7 SOUND ENGINEER \u00B7 AUTOMOTIVE',
    bgImage: '/film/vw-gen-gti-docu/scene-01.jpg',
    scene1: '/film/vw-gen-gti-docu/scene-10.jpg',
    scene2: '/film/vw-gen-gti-docu/scene-20.jpg',
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

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        className="text-center max-w-[var(--max-narrow-width)] mx-auto"
        style={{ padding: 'var(--space-section-y) var(--space-page-x) var(--space-component)' }}
      >
        <span
          className="font-mono tracking-[0.2em] uppercase block mb-4 transition-all duration-1000"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            color: 'var(--color-text-muted)',
            opacity: headerRevealed ? 1 : 0,
            transform: headerRevealed ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          CLIENT PORTFOLIO
        </span>
        <h2
          className="font-display font-light tracking-[-0.01em] leading-[1.05] transition-all duration-1000"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--color-text-primary)',
            opacity: headerRevealed ? 1 : 0,
            transform: headerRevealed ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '100ms',
          }}
        >
          SELECTED WORKS
        </h2>
        <p
          className="font-body font-light leading-[1.7] mt-4 transition-all duration-1000"
          style={{
            fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
            color: 'var(--color-text-secondary)',
            opacity: headerRevealed ? 1 : 0,
            transform: headerRevealed ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '200ms',
          }}
        >
          A curated archive of collaborations with studios, brands, and production houses. Each frame crafted with intention.
        </p>
        <span
          className="block h-[1px] w-[80px] md:w-[120px] mx-auto mt-6 origin-center transition-transform duration-800"
          style={{
            backgroundColor: 'var(--color-border)',
            transform: headerRevealed ? 'scaleX(1)' : 'scaleX(0)',
            transitionDelay: '300ms',
          }}
        />
      </div>

      {/* Slides */}
      <div className="relative" style={{ minHeight: '100dvh' }}>
        {CLIENTS.map((client, index) => (
          <div
            key={client.name}
            className="transition-all duration-700"
            style={{
              opacity: activeSlide === index ? 1 : 0,
              position: activeSlide === index ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              right: 0,
              pointerEvents: activeSlide === index ? 'auto' : 'none',
              transform: activeSlide === index ? 'translateX(0)' : (activeSlide > index ? 'translateX(-60px)' : 'translateX(60px)'),
            }}
          >
            <ClientSlide
              client={client}
              isActive={activeSlide === index}
            />
          </div>
        ))}

        {/* Slide Navigation Dots */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
          {CLIENTS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: activeSlide === index ? 'var(--color-accent-gold)' : 'var(--color-text-muted)',
                transform: activeSlide === index ? 'scale(1.3)' : 'scale(1)',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          <span
            className="font-mono tracking-[0.12em] mt-2"
            style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)', color: 'var(--color-text-muted)' }}
          >
            0{activeSlide + 1} / 0{CLIENTS.length}
          </span>
        </div>
      </div>

      {/* Stats Bar */}
      <div
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          padding: 'var(--space-section-y) var(--space-page-x)',
        }}
      >
        <div className="max-w-[900px] mx-auto grid grid-cols-3 gap-8">
          {[
            { number: '12+', label: 'PROJECTS' },
            { number: '12', label: 'CLIENTS' },
            { number: '10', label: 'YEARS' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="text-center relative"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${600 + i * 100}ms`,
              }}
            >
              {i > 0 && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[40px] w-[1px] hidden sm:block"
                  style={{ backgroundColor: 'var(--color-border)' }}
                />
              )}
              <span
                className="font-display font-light block"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {stat.number}
              </span>
              <span
                className="font-mono tracking-[0.12em]"
                style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)', color: 'var(--color-text-tertiary)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClientSlide({
  client,
  isActive,
}: {
  client: ClientSlideData
  isActive: boolean
}) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={client.bgImage}
          alt={client.name}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.4)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 grid grid-cols-1 lg:grid-cols-[45%_55%] min-h-[100dvh] items-center"
        style={{ padding: 'var(--space-section-y) var(--space-page-x)' }}
      >
        {/* Left: Text Content */}
        <div className="relative">
          {/* Decorative Number */}
          <span
            className="absolute -top-16 -left-4 font-display font-light select-none pointer-events-none hidden lg:block"
            style={{
              fontSize: 'clamp(6rem, 12vw, 10rem)',
              color: 'var(--color-text-muted)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              opacity: 0.15,
            }}
          >
            {client.number}
          </span>

          <div className="relative z-10">
            <span
              className="font-mono tracking-[0.2em] uppercase block mb-3 transition-all duration-1000"
              style={{
                fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                color: 'var(--color-text-muted)',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: '0ms',
              }}
            >
              CLIENT
            </span>
            <h3
              className="font-display font-normal leading-[1.1] transition-all duration-1000"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '0.02em',
                color: 'var(--color-text-primary)',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: '100ms',
              }}
            >
              {client.name}
            </h3>
            <p
              className="font-body font-medium tracking-[0.08em] mt-3 transition-all duration-1000"
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                color: 'var(--color-text-secondary)',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: '200ms',
              }}
            >
              {client.project}
            </p>
            <p
              className="font-body leading-[1.7] mt-4 max-w-[380px] transition-all duration-1000"
              style={{
                fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                color: 'var(--color-text-secondary)',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: '300ms',
              }}
            >
              {client.description}
            </p>
            <span
              className="font-mono tracking-[0.12em] block mt-4 transition-all duration-1000"
              style={{
                fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                color: 'var(--color-text-tertiary)',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: '400ms',
              }}
            >
              {client.metadata}
            </span>
            <div
              className="mt-6 transition-all duration-1000"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: '500ms',
              }}
            >
              <Link
                to="/clients"
                onClick={() => window.scrollTo(0, 0)}
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
        </div>

        {/* Right: Screenshot Grid */}
        <div className="hidden lg:grid grid-cols-2 gap-4 mt-8 lg:mt-0 lg:pl-12">
          {[client.scene1, client.scene2].map((scene, i) => (
            <div
              key={scene}
              className="overflow-hidden rounded-[var(--border-radius-md)] group cursor-pointer"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${600 + i * 150}ms`,
                clipPath: isActive ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={scene}
                  alt={`${client.name} scene ${i + 1}`}
                  className="w-full aspect-video object-cover transition-transform duration-600 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span
                    className="font-mono tracking-[0.2em] uppercase"
                    style={{ fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', color: 'var(--color-text-primary)' }}
                  >
                    EXPAND
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
