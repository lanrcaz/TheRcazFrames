import { useRef, useState, useEffect } from 'react'

const ROW1 = 'PUBLIC INVESTMENT FUND KSA \u00B7 DUBAI TOURISM \u00B7 ABU DHABI TOURISM \u00B7 DP WORLD \u00B7 EXPO 2020 \u00B7 EMIRATES AIRLINES \u00B7 LUCID MOTORS KSA \u00B7 RED BULL \u00B7 VOLKSWAGEN \u00B7 MERCEDES-BENZ \u00B7 VOX CINEMAS \u00B7 AHMED SEDDIQI WATCHES \u00B7 DUBAI PROPERTIES \u00B7 MERAAS \u00B7 DUBAI OPERA \u00B7 ADNOC \u00B7 '
const ROW2 = 'PUBLIC INVESTMENT FUND KSA \u00B7 DUBAI TOURISM \u00B7 ABU DHABI TOURISM \u00B7 DP WORLD \u00B7 EXPO 2020 \u00B7 EMIRATES AIRLINES \u00B7 LUCID MOTORS KSA \u00B7 RED BULL \u00B7 VOLKSWAGEN \u00B7 MERCEDES-BENZ \u00B7 VOX CINEMAS \u00B7 AHMED SEDDIQI WATCHES \u00B7 DUBAI PROPERTIES \u00B7 MERAAS \u00B7 DUBAI OPERA \u00B7 ADNOC \u00B7 '

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
