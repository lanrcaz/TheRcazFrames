import { useRef, useState, useEffect } from 'react'

export default function PageHeroContact() {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        height: '50vh',
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 transition-opacity duration-[1500ms] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,169,110,0.08) 0%, transparent 100%)',
          opacity: revealed ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Breadcrumb */}
        <a
          href="#/"
          className="font-mono tracking-[0.12em] uppercase transition-colors duration-300 hover:text-[#C9A96E] block mb-6"
          style={{
            fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
            color: 'var(--color-text-tertiary)',
            lineHeight: 1.4,
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 1000ms, transform 1000ms, color 300ms',
            transitionDelay: '200ms',
          }}
        >
          HOME / CONTACT
        </a>

        {/* Label */}
        <p
          className="font-mono tracking-[0.2em] uppercase mb-4 transition-all duration-1000"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            color: 'var(--color-accent-gold)',
            lineHeight: 1.4,
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '300ms',
          }}
        >
          GET IN TOUCH
        </p>

        {/* Title */}
        <h1
          className="font-display font-light leading-[0.95] tracking-[-0.02em] transition-all duration-1000"
          style={{
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            color: 'var(--color-text-primary)',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '400ms',
          }}
        >
          LET&apos;S CREATE
        </h1>

        {/* Decorative rules */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span
            className="h-[1px] w-[60px] origin-right transition-transform duration-800"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '500ms',
            }}
          />
          <span
            className="h-[1px] w-[60px] origin-left transition-transform duration-800"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '500ms',
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          className="font-display font-normal mt-6 mx-auto transition-all duration-1000"
          style={{
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            color: 'var(--color-text-secondary)',
            letterSpacing: '0.18em',
            lineHeight: 1.4,
            maxWidth: '520px',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '600ms',
          }}
        >
          TELL ME ABOUT YOUR PROJECT. LET&apos;S TALK TIMELINE, VISION, AND POSSIBILITIES.
        </p>
      </div>
    </section>
  )
}
