import { useRef, useState, useEffect } from 'react'
import { Eye, Heart, Gem } from 'lucide-react'

interface PhilosophyCard {
  icon: React.ReactNode
  iconColor: string
  title: string
  body: string
  number: string
}

const CARDS: PhilosophyCard[] = [
  {
    icon: <Eye size={28} />,
    iconColor: 'var(--color-accent-gold)',
    title: 'Film-First Direction',
    body: 'The camera is the primary storytelling tool. Every frame is composed with intention — from Burj Khalifa aerials to intimate close-ups. Film captures what no other medium can: presence, light, and the human moment.',
    number: '01',
  },
  {
    icon: <Heart size={28} />,
    iconColor: 'var(--color-accent-rose)',
    title: 'Motion as Foundation',
    body: '12+ years in motion design, broadcast, and post-production built the visual grammar that now informs every film project. After Effects, Cinema 4D, and compositing are not separate disciplines — they are extensions of the same eye.',
    number: '02',
  },
  {
    icon: <Gem size={28} />,
    iconColor: 'var(--color-accent-copper)',
    title: 'Creative Systems & AI',
    body: 'Architecting AI film ecosystems using Seedance, Kling workflows, and Higgsfield-style automation to transform UGC inputs into campaign-ready creative variants. The future of production is intelligent, fast, and craft-led.',
    number: '03',
  },
]

export default function PhilosophyGrid() {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

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
          setHeaderVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
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
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-12">
        <p
          className="font-mono tracking-[0.2em] uppercase transition-all duration-1000"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.4,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          THE PHILOSOPHY
        </p>
        <h2
          className="font-display font-light leading-[1.05] tracking-[-0.01em] mt-4 mb-4 transition-all duration-1000"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--color-text-primary)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '100ms',
          }}
        >
          PRINCIPLES THAT GUIDE THE WORK
        </h2>
        <div className="flex justify-center">
          <span
            className="h-[1px] w-[80px] transition-transform duration-800 origin-center"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: headerVisible ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '200ms',
            }}
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-[var(--max-content-width)] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CARDS.map((card, i) => (
          <div
            key={card.number}
            className="group relative overflow-hidden rounded-[var(--border-radius-md)] border transition-all duration-400 hover:-translate-y-1"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(16px)',
              padding: '2rem',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: `${i * 120}ms`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
            }}
          >
            {/* Decorative number */}
            <span
              className="absolute top-3 right-3 font-display font-light pointer-events-none transition-opacity duration-1000"
              style={{
                fontSize: '4rem',
                color: 'var(--color-text-muted)',
                opacity: revealed ? 0.15 : 0,
                transitionDelay: `${i * 120 + 300}ms`,
                lineHeight: 1,
              }}
            >
              {card.number}
            </span>

            {/* Icon */}
            <div
              className="mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ color: card.iconColor }}
            >
              {card.icon}
            </div>

            {/* Title */}
            <h3
              className="font-display mb-3"
              style={{
                fontSize: '1.5rem',
                color: 'var(--color-text-primary)',
                fontWeight: 400,
                letterSpacing: '0.02em',
                lineHeight: 1.2,
              }}
            >
              {card.title}
            </h3>

            {/* Body */}
            <p
              className="font-body leading-[1.7] tracking-[0.01em]"
              style={{
                fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
