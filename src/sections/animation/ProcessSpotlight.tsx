import { useEffect, useRef, useState } from 'react'

interface ProcessStep {
  number: string
  title: string
  description: string
}

const STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'CONCEPT & DIRECTION',
    description: 'The brief becomes a creative vision. Moodboards, style frames, and motion tests establish the visual direction before production begins.',
  },
  {
    number: '02',
    title: 'STYLE FRAMES & STORYBOARD',
    description: 'Key frames are designed to lock the look and feel. Every transition, type treatment, and composition is planned as a still before it moves.',
  },
  {
    number: '03',
    title: 'ANIMATION & TIMING',
    description: 'The heartbeat of the piece — keyframes, easing curves, and rhythmic cuts that give the work its energy and flow. Nothing is left to default.',
  },
  {
    number: '04',
    title: 'SOUND & COMPOSITING',
    description: 'The final layer — audio-reactive elements, precise compositing, color grade, and render that transforms frames into a cohesive film.',
  },
]

function ImageReveal({
  src,
  alt,
  delay,
  aspectRatio,
  className = '',
}: {
  src: string
  alt: string
  delay: number
  aspectRatio?: string
  className?: string
}) {
  const [revealed, setRevealed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio,
        borderRadius: 'var(--border-radius-md)',
      }}
    >
      {/* Skeleton */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          opacity: loaded ? 0 : 1,
          zIndex: 2,
        }}
      />

      {/* Clip-path reveal container */}
      <div
        className="absolute inset-0 transition-all duration-[1400ms]"
        style={{
          clipPath: revealed
            ? 'inset(0% 0 0 0)'
            : 'inset(100% 0 0 0)',
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="w-full h-full object-cover transition-transform duration-[1400ms]"
          style={{
            transform: revealed ? 'scale(1)' : 'scale(1.1)',
            transitionDelay: `${delay}ms`,
            transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
          }}
        />
      </div>
    </div>
  )
}

export default function ProcessSpotlight() {
  const [headerRevealed, setHeaderRevealed] = useState(false)
  const [stepsRevealed, setStepsRevealed] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderRevealed(true)
          observer1.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (headerRef.current) observer1.observe(headerRef.current)

    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStepsRevealed(true)
          observer2.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (stepsRef.current) observer2.observe(stepsRef.current)

    return () => {
      observer1.disconnect()
      observer2.disconnect()
    }
  }, [])

  return (
    <section
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        padding: 'var(--space-section-y) var(--space-page-x)',
      }}
    >
      <div className="max-w-[var(--max-content-width)] mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          {/* Label */}
          <span
            className="font-mono uppercase block mb-4 transition-all duration-1000"
            style={{
              fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
              letterSpacing: '0.2em',
              color: 'var(--color-text-muted)',
              opacity: headerRevealed ? 1 : 0,
              transform: headerRevealed ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            THE PROCESS
          </span>

          {/* Title */}
          <h2
            className="font-display font-light transition-all duration-1000"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.01em',
              lineHeight: 1.05,
              color: 'var(--color-text-primary)',
              opacity: headerRevealed ? 1 : 0,
              transform: headerRevealed ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '100ms',
            }}
          >
            FROM CONCEPT TO RENDER
          </h2>

          {/* Decorative divider */}
          <span
            className="block h-[1px] w-[80px] mx-auto mt-6 origin-center transition-transform duration-1000"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: headerRevealed ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '300ms',
            }}
          />
        </div>

        {/* Two Column Layout */}
        <div ref={stepsRef} className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column - Process Steps */}
          <div className="lg:w-[45%] relative">
            {/* Vertical dotted line */}
            <div
              className="absolute left-[18px] top-0 bottom-0 w-[1px] hidden lg:block transition-transform duration-[2000ms] origin-top"
              style={{
                backgroundImage: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 4px, transparent 4px, transparent 8px)',
                transform: stepsRevealed ? 'scaleY(1)' : 'scaleY(0)',
                transitionDelay: '400ms',
              }}
            />

            <div className="space-y-10">
              {STEPS.map((step, index) => (
                <div
                  key={step.number}
                  className="flex gap-6 relative transition-all duration-1000"
                  style={{
                    opacity: stepsRevealed ? 1 : 0,
                    transform: stepsRevealed ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${index * 120}ms`,
                  }}
                >
                  {/* Step Number */}
                  <span
                    className="font-display shrink-0 w-[36px] text-center"
                    style={{
                      fontSize: '2rem',
                      lineHeight: 1,
                      color: 'var(--color-accent-gold)',
                    }}
                  >
                    {step.number}
                  </span>

                  {/* Step Content */}
                  <div>
                    <h3
                      className="font-body font-medium uppercase mb-2"
                      style={{
                        fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                        letterSpacing: '0.1em',
                        lineHeight: 1.3,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                        lineHeight: 1.7,
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="lg:w-[55%] space-y-3">
            {/* Large feature image */}
            <ImageReveal
              src="/animation/process/mb-capetown.jpg"
              alt="Mercedes-Benz Fashion Week Cape Town — 3D motion graphics and kinetic typography showcase"
              delay={0}
              aspectRatio="16/10"
            />

            {/* Two smaller images side by side */}
            <div className="flex gap-3">
              <ImageReveal
                src="/animation/process/ft-spec-ad.jpg"
                alt="Fashion Television Spec Ad — Cinema 4D Voronoi Fracture and glass reflection renders"
                delay={200}
                aspectRatio="16/10"
                className="flex-1"
              />
              <ImageReveal
                src="/animation/process/top10-stylish.jpg"
                alt="Top 10 Most Stylish Men — high-energy editorial countdown with gold-and-black motion design"
                delay={350}
                aspectRatio="16/10"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
