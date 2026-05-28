import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CTABand() {
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
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        padding: '4rem var(--space-page-x)',
      }}
    >
      <div className="max-w-[var(--max-narrow-width)] mx-auto text-center">
        <span
          className="font-mono tracking-[0.2em] uppercase block mb-4 transition-all duration-1000"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            color: 'var(--color-text-muted)',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          LET&apos;S CREATE SOMETHING TOGETHER
        </span>
        <h2
          className="font-display font-light tracking-[-0.01em] leading-[1.05] transition-all duration-1000"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--color-text-primary)',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '100ms',
          }}
        >
          START A PROJECT
        </h2>

        {/* Circular CTA with decorative lines */}
        <div
          className="flex items-center justify-center gap-0 mt-8 transition-all duration-1000"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'scale(1)' : 'scale(0.9)',
            transitionDelay: '200ms',
          }}
        >
          {/* Left line */}
          <span
            className="h-[1px] w-[60px] md:w-[100px] origin-right transition-transform duration-800"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '300ms',
            }}
          />

          {/* Circle button */}
          <Link
            to="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center justify-center w-[72px] h-[72px] rounded-full border transition-all duration-300 hover:border-[#C9A96E] hover:scale-105 shrink-0 mx-4"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <span
              className="font-mono tracking-[0.15em] uppercase text-center leading-tight"
              style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)' }}
            >
              CON
              <br />
              TACT
            </span>
          </Link>

          {/* Right line */}
          <span
            className="h-[1px] w-[60px] md:w-[100px] origin-left transition-transform duration-800"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '300ms',
            }}
          />
        </div>
      </div>
    </section>
  )
}
