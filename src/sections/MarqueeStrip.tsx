import { useRef, useState, useEffect } from 'react'

const ROW1 = 'SUNDANCE \u00B7 CANNES \u00B7 TRIBECA \u00B7 SXSW \u00B7 ANNECY \u00B7 OTTAWA \u00B7 CLERMONT-FERRAND \u00B7 BERLINALE \u00B7 TORONTO \u00B7 '
const ROW2 = 'BEST DIRECTOR \u00B7 OFFICIAL SELECTION \u00B7 GRAND PRIX \u00B7 AUDIENCE AWARD \u00B7 SPECIAL MENTION \u00B7 HONOREE \u00B7 '

export default function MarqueeStrip() {
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
      className="overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        padding: '2rem 0',
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Row 1: scrolls left */}
      <div className="group">
        <div className="flex whitespace-nowrap animate-marquee-left group-hover:[animation-play-state:paused]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="font-display shrink-0 select-none"
              style={{
                fontSize: '1.5rem',
                letterSpacing: '0.1em',
                color: 'var(--color-text-muted)',
                paddingRight: '0.5em',
              }}
            >
              {ROW1}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2: scrolls right */}
      <div className="group mt-4">
        <div className="flex whitespace-nowrap animate-marquee-right group-hover:[animation-play-state:paused]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="font-mono shrink-0 select-none"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: 'var(--color-text-tertiary)',
                paddingRight: '0.5em',
              }}
            >
              {ROW2}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
