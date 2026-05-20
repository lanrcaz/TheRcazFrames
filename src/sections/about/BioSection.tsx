import { useRef, useState, useEffect } from 'react'

export default function BioSection() {
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
      { threshold: 0.2 }
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
      <div className="max-w-[var(--max-content-width)] mx-auto grid grid-cols-1 md:grid-cols-[40%_55%] gap-[5%]">
        {/* Left Column - Portrait */}
        <div
          className="transition-all duration-[1400ms] ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            clipPath: revealed ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
            transitionDelay: '0ms',
          }}
        >
          <div className="overflow-hidden rounded-[var(--border-radius-md)] group">
            <img
              src="/about-portrait.jpg"
              alt="Director in their workspace surrounded by monitors and storyboards"
              className="w-full aspect-[3/4] object-cover transition-transform duration-[600ms] group-hover:scale-[1.02]"
            />
          </div>
          <p
            className="font-mono tracking-[0.12em] uppercase mt-3"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              color: 'var(--color-text-tertiary)',
              lineHeight: 1.4,
            }}
          >
            LOS ANGELES, CA &middot; 2024
          </p>
        </div>

        {/* Right Column - Bio Text */}
        <div className="flex flex-col justify-center">
          {/* Section Label */}
          <div
            className="flex items-center gap-4 mb-6 transition-all duration-1000"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '0ms',
            }}
          >
            <span
              className="font-mono tracking-[0.2em] uppercase"
              style={{
                fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.4,
              }}
            >
              ABOUT
            </span>
            <span
              className="h-[1px] w-[60px] origin-left transition-transform duration-800"
              style={{
                backgroundColor: 'var(--color-border)',
                transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
                transitionDelay: '200ms',
              }}
            />
          </div>

          {/* Title */}
          <h2
            className="font-display font-light tracking-[-0.01em] leading-[1.2] transition-all duration-1000"
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              color: 'var(--color-text-primary)',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '100ms',
            }}
          >
            A Director Living Between Two Worlds
          </h2>

          {/* Bio Paragraphs */}
          <div className="flex flex-col gap-6 mt-6">
            <p
              className="font-body font-light leading-[1.7] tracking-[0.01em] transition-all duration-1000"
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                color: 'var(--color-text-secondary)',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: '200ms',
              }}
            >
              The Silver Frame is the creative studio of a director and animator based in Los Angeles,
              working at the intersection of live-action filmmaking and animated storytelling. With over
              a decade of experience spanning narrative shorts, branded content, music videos, and
              animation, every project is an opportunity to push the boundaries of visual storytelling.
            </p>
            <p
              className="font-body font-light leading-[1.7] tracking-[0.01em] transition-all duration-1000"
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                color: 'var(--color-text-secondary)',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: '350ms',
              }}
            >
              The approach is simple: treat every frame as a painting and every sequence as a journey.
              Whether directing actors on set or keyframing characters in Blender, the goal remains the
              same — to create work that resonates emotionally and endures visually.
            </p>
            <p
              className="font-body font-light leading-[1.7] tracking-[0.01em] transition-all duration-1000"
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                color: 'var(--color-text-secondary)',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: '500ms',
              }}
            >
              Collaboration is at the heart of the process. Working closely with clients, cinematographers,
              editors, and sound designers to ensure every project reaches its fullest potential — from
              the first storyboard to the final color grade.
            </p>
          </div>

          {/* Signature */}
          <div
            className="mt-8 flex items-center gap-3 transition-all duration-1000"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '650ms',
            }}
          >
            <span
              className="font-display"
              style={{ fontSize: '2rem', color: 'var(--color-accent-gold)' }}
            >
              SF
            </span>
            <span
              className="font-mono tracking-[0.2em] uppercase"
              style={{
                fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.4,
              }}
            >
              THE SILVER FRAME
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
