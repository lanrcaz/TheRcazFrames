import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clapperboard, Sparkles } from 'lucide-react'

export default function DisciplineSplit() {
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
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="discipline-split"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        padding: 'var(--space-section-y) var(--space-page-x)',
      }}
    >
      {/* Section Header */}
      <div className="text-center max-w-[var(--max-narrow-width)] mx-auto mb-16">
        <span
          className="font-mono tracking-[0.2em] uppercase block mb-4 transition-all duration-1000"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            color: 'var(--color-text-muted)',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          THE CRAFT
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
          TWO WORLDS. ONE VISION.
        </h2>
        <span
          className="block h-[1px] w-[80px] mx-auto mt-6 origin-center transition-transform duration-800"
          style={{
            backgroundColor: 'var(--color-border)',
            transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
            transitionDelay: '200ms',
          }}
        />
      </div>

      {/* Two Columns */}
      <div className="max-w-[var(--max-content-width)] mx-auto grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Diagonal Divider — Desktop only */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-10">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <line
              x1="50"
              y1="0"
              x2="50"
              y2="100"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.2"
              style={{
                strokeDasharray: 150,
                strokeDashoffset: revealed ? 0 : 150,
                transition: 'stroke-dashoffset 1s ease-out',
                transitionDelay: '300ms',
                transform: 'rotate(15deg)',
                transformOrigin: 'center',
              }}
            />
          </svg>
        </div>

        {/* Film Column */}
        <DisciplineCard
          bgImage="/film-project-1-hero.jpg"
          icon={<Clapperboard size={32} style={{ color: 'var(--color-accent-gold)' }} />}
          title="FILM"
          subtitle="DIRECTING"
          description="Narrative shorts, branded content, music videos, and commercial work. A focus on visual storytelling that moves audiences — shot on film and digital, graded with intent."
          cta="EXPLORE FILM WORK"
          ctaLink="/film"
          revealed={revealed}
          delay={300}
          slideDir="left"
        />

        {/* Animation Column */}
        <DisciplineCard
          bgImage="/anim-project-1-hero.jpg"
          icon={<Sparkles size={32} style={{ color: 'var(--color-accent-copper)' }} />}
          title="ANIMATION"
          subtitle="MOTION & DESIGN"
          description="3D and 2D animation, motion graphics, character design, and visual effects. From concept to final render — bringing impossible worlds to life frame by frame."
          cta="EXPLORE ANIMATION"
          ctaLink="/animation"
          revealed={revealed}
          delay={500}
          slideDir="right"
        />
      </div>
    </section>
  )
}

function DisciplineCard({
  bgImage,
  icon,
  title,
  subtitle,
  description,
  cta,
  ctaLink,
  revealed,
  delay,
  slideDir,
}: {
  bgImage: string
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  cta: string
  ctaLink: string
  revealed: boolean
  delay: number
  slideDir: 'left' | 'right'
}) {
  return (
    <div
      className="relative overflow-hidden group min-h-[400px] lg:min-h-[500px] flex flex-col justify-end p-8 lg:p-12"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed
          ? 'translateX(0) translateY(0)'
          : `translateX(${slideDir === 'left' ? '-30px' : '30px'}) translateY(20px)`,
        transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4">{icon}</div>
        <h3
          className="font-display font-normal"
          style={{
            fontSize: '2.5rem',
            color: 'var(--color-text-primary)',
          }}
        >
          {title}
        </h3>
        <span
          className="font-mono tracking-[0.2em] uppercase block mt-1 mb-4"
          style={{ fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', color: 'var(--color-text-muted)' }}
        >
          {subtitle}
        </span>
        <p
          className="font-body leading-[1.7] max-w-[380px] mb-6"
          style={{
            fontSize: 'clamp(0.875rem, 1vw, 1rem)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {description}
        </p>
        <Link
          to={ctaLink}
          className="group/link inline-flex items-center gap-2 font-body text-xs font-medium tracking-[0.15em] uppercase text-[#C9A96E] transition-colors duration-300 hover:text-[#D4B87A]"
        >
          <span className="relative">
            {cta}
            <span className="absolute -bottom-0.5 left-0 h-[1px] w-full bg-[#C9A96E] origin-left transition-transform duration-300 scale-x-40 group-hover/link:scale-x-100" />
          </span>
          <span className="transition-transform duration-300 group-hover/link:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </div>
  )
}
