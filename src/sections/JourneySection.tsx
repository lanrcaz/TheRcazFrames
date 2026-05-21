import { useRef, useState, useEffect } from 'react'

const STATS = [
  { value: '12+', label: 'YEARS OF CRAFT' },
  { value: '3', label: 'FEATURED FILMS' },
  { value: 'DUBAI', label: 'BASED IN UAE' },
  { value: '2017', label: 'AT CREATE PROD DXB' },
]

export default function JourneySection() {
  const [revealed, setRevealed] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        padding: 'var(--space-section-y) var(--space-page-x)',
      }}
    >
      <div className="max-w-[900px] mx-auto">
        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center relative"
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
              }}
            >
              {i > 0 && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[30px] w-[1px] hidden md:block"
                  style={{ backgroundColor: 'var(--color-border)' }}
                />
              )}
              <span
                className="font-display font-light block"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 4rem)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                className="font-mono tracking-[0.12em] block mt-2"
                style={{
                  fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 mb-16">
          <span
            className="block h-[1px] max-w-[200px] mx-auto origin-center transition-transform duration-800"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '500ms',
            }}
          />
        </div>

        {/* Quote */}
        <div
          className="text-center max-w-[var(--max-narrow-width)] mx-auto transition-all duration-1200"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '600ms',
          }}
        >
          <span
            className="font-display font-light block mb-4"
            style={{
              fontSize: '6rem',
              lineHeight: 0.5,
              color: 'var(--color-text-muted)',
            }}
          >
            &ldquo;
          </span>
          <blockquote
            className="font-display italic leading-[1.6]"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Cinema is a matter of what&apos;s in the frame and what&apos;s out. Animation is the art of making the impossible feel inevitable. I live in the space between both.
          </blockquote>
          <cite
            className="font-body not-italic block mt-6"
            style={{
              fontSize: 'clamp(0.875rem, 1vw, 1rem)',
              color: 'var(--color-text-muted)',
            }}
          >
            &mdash; FERLAN RACAZA / THE R'CAZ FRAMES
          </cite>
        </div>
      </div>
    </section>
  )
}
